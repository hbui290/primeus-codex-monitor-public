#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import sys
import threading
from datetime import datetime, timedelta
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
DATA_DIR = ROOT / "data"
DATA_FILE = ROOT / "data" / "dashboard.json"
SAMPLE_DATA_FILE = ROOT / "data" / "dashboard.sample.json"
AUDIT_LOG_FILE = ROOT / "data" / "action_audit.jsonl"
SAMPLE_AUDIT_LOG_FILE = ROOT / "data" / "action_audit.sample.jsonl"
PORT = int(os.environ.get("PRIMEUS_MONITOR_PORT", "4017"))
API_LOCK = threading.Lock()
WORKSPACE_ROOT = os.environ.get("PRIMEUS_MONITOR_WORKSPACE_ROOT", "/home/operator/.openclaw/workspace")

sys.path.insert(0, str(SCRIPT_DIR))
import sync_vps_snapshot as snapshot_sync  # noqa: E402


ALLOWED_IDENTITY_FILES = {
    "SOUL.md": f"{WORKSPACE_ROOT}/SOUL.md",
    "IDENTITY.md": f"{WORKSPACE_ROOT}/IDENTITY.md",
    "USER.md": f"{WORKSPACE_ROOT}/USER.md",
    "MEMORY.md": f"{WORKSPACE_ROOT}/MEMORY.md",
    "AGENTS.md": f"{WORKSPACE_ROOT}/AGENTS.md",
}
ALLOWED_AGENT_FIELDS = {
    "display_name",
    "provider",
    "lane",
    "mode_target",
    "approval_policy",
    "soul_file",
    "identity_file",
    "memory_file",
    "notes",
}


class MonitorError(RuntimeError):
    status = HTTPStatus.INTERNAL_SERVER_ERROR


class ValidationError(MonitorError):
    status = HTTPStatus.BAD_REQUEST


class ConflictError(MonitorError):
    status = HTTPStatus.CONFLICT


class RemoteFailureError(MonitorError):
    status = HTTPStatus.BAD_GATEWAY


def load_snapshot() -> dict:
    snapshot_path = DATA_FILE if DATA_FILE.exists() else SAMPLE_DATA_FILE
    if not snapshot_path.exists():
        snapshot_sync.main()
        snapshot_path = DATA_FILE if DATA_FILE.exists() else SAMPLE_DATA_FILE
    if not snapshot_path.exists():
        raise RemoteFailureError(
            "No dashboard snapshot is available. Add data/dashboard.sample.json or run a live sync."
        )

    snapshot = json.loads(snapshot_path.read_text(encoding="utf-8"))
    generated_at = str(snapshot.get("generated_at", "")).strip()
    try:
        generated_dt = datetime.fromisoformat(generated_at)
        stale = datetime.now(generated_dt.tzinfo) - generated_dt > timedelta(minutes=5)
    except Exception:
        stale = False
    snapshot["stale"] = stale
    snapshot["snapshot_status"] = "stale" if stale else str(snapshot.get("snapshot_status", "ready") or "ready")
    if snapshot_path == SAMPLE_DATA_FILE and not snapshot.get("source"):
        snapshot["source"] = "Sample dashboard snapshot"
    return snapshot


def sync_snapshot() -> dict:
    snapshot_sync.main()
    return load_snapshot()


def json_response(handler: "ControlHandler", status: int, payload: dict) -> None:
    body = json.dumps(payload, ensure_ascii=True).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def parse_json_body(handler: "ControlHandler") -> dict:
    raw_length = handler.headers.get("Content-Length", "0")
    length = int(raw_length or "0")
    raw = handler.rfile.read(length) if length > 0 else b"{}"
    if not raw:
        return {}
    try:
        return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError as exc:
        raise ValidationError(f"Invalid JSON body: {exc}") from exc


def append_action_audit(action: str, *, target: str = "", outcome: str, message: str) -> None:
    AUDIT_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "ts": snapshot_sync.datetime.now().astimezone().replace(microsecond=0).isoformat(),
        "action": action,
        "target": target,
        "outcome": outcome,
        "message": message,
    }
    with AUDIT_LOG_FILE.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=True) + "\n")


def run_remote_shell(command: str) -> str:
    completed = snapshot_sync.run_remote(command)
    if completed.returncode != 0:
        raise RemoteFailureError((completed.stderr or completed.stdout or "Remote command failed").strip())
    return completed.stdout


def allowed_services(snapshot: dict) -> set[str]:
    return {item["name"] for item in snapshot.get("runtime", {}).get("services", []) if item.get("name")}


def save_integrations(payload: dict) -> dict:
    snapshot = load_snapshot()
    editor = snapshot.get("integrations", {}).get("editor", {})
    if payload.get("base_hash") != editor.get("base_hash"):
        raise ConflictError("Config changed on the VPS. Refresh and try again.")

    gateway_port = str(payload.get("gateway_port", "")).strip()
    if not gateway_port.isdigit():
        raise ValidationError("Gateway port must be numeric.")

    fields = {
        "primary_model": str(payload.get("primary_model", "")).strip(),
        "search_provider": str(payload.get("search_provider", "")).strip(),
        "dm_policy": str(payload.get("dm_policy", "")).strip(),
        "group_policy": str(payload.get("group_policy", "")).strip(),
        "gateway_port": gateway_port,
        "gateway_token": str(payload.get("gateway_token", "")).strip(),
        "brave_api_key": str(payload.get("brave_api_key", "")).strip(),
        "telegram_bot_token": str(payload.get("telegram_bot_token", "")).strip(),
        "base_hash": str(payload.get("base_hash", "")).strip(),
    }
    required = ("primary_model", "search_provider", "dm_policy", "group_policy")
    if any(not fields[name] for name in required):
        raise ValidationError("Primary model, search provider, DM policy, and group policy are required.")

    config = snapshot_sync.get_openclaw_config()
    live_editor = snapshot_sync.extract_integrations_editor(config)
    if str(payload.get("base_hash", "")).strip() != str(live_editor.get("base_hash", "")):
        raise ConflictError("Config changed on the VPS. Refresh and try again.")

    config.setdefault("agents", {}).setdefault("defaults", {}).setdefault("model", {})["primary"] = fields["primary_model"]
    config.setdefault("tools", {}).setdefault("web", {}).setdefault("search", {})["provider"] = fields["search_provider"]

    telegram = config.setdefault("channels", {}).setdefault("telegram", {})
    telegram["dmPolicy"] = fields["dm_policy"]
    telegram["groupPolicy"] = fields["group_policy"]

    gateway = config.setdefault("gateway", {})
    gateway["port"] = int(fields["gateway_port"])
    gateway.setdefault("auth", {})

    if fields["gateway_token"]:
        gateway["auth"]["token"] = fields["gateway_token"]

    brave = (
        config.setdefault("plugins", {})
        .setdefault("entries", {})
        .setdefault("brave", {})
        .setdefault("config", {})
        .setdefault("webSearch", {})
    )
    if fields["brave_api_key"]:
        brave["apiKey"] = fields["brave_api_key"]

    if fields["telegram_bot_token"]:
        telegram["botToken"] = fields["telegram_bot_token"]

    snapshot_sync.write_remote_file(
        snapshot_sync.OPENCLAW_CONFIG_FILE,
        json.dumps(config, ensure_ascii=True, indent=2) + "\n",
    )
    return sync_snapshot()


def bootstrap_snapshot() -> None:
    if DATA_FILE.exists() or SAMPLE_DATA_FILE.exists():
        return
    try:
        snapshot_sync.main()
    except Exception as exc:  # pragma: no cover - startup fallback
        sys.stdout.write(f"[monitor] startup snapshot failed: {exc}\n")


def save_identity(payload: dict) -> dict:
    name = str(payload.get("name", "")).strip()
    if name not in ALLOWED_IDENTITY_FILES:
        raise ValidationError("Unsupported identity file.")

    content = str(payload.get("content", ""))
    if not content.strip():
        raise ValidationError("Identity content cannot be empty.")

    snapshot = load_snapshot()
    editors = {item.get("name"): item for item in snapshot.get("identity", {}).get("editors", [])}
    current = editors.get(name)
    if not current:
        raise ConflictError("Identity editor data is missing. Refresh and try again.")
    if str(payload.get("base_hash", "")).strip() != str(current.get("base_hash", "")):
        raise ConflictError("Identity file changed on the VPS. Refresh and try again.")

    remote_path = ALLOWED_IDENTITY_FILES[name]
    live_content = snapshot_sync.read_remote_file(remote_path)
    if snapshot_sync.sha256_text(live_content) != str(current.get("base_hash", "")):
        raise ConflictError("Identity file changed on the VPS. Refresh and try again.")
    if not content.endswith("\n"):
        content += "\n"
    snapshot_sync.write_remote_file(remote_path, content)
    return sync_snapshot()


def save_agent_controls(payload: dict) -> dict:
    agent_id = str(payload.get("agent_id", "")).strip()
    if not agent_id:
        raise ValidationError("Agent id is required.")

    snapshot = load_snapshot()
    editor = snapshot.get("agents", {}).get("editor", {})
    if str(payload.get("base_hash", "")).strip() != str(editor.get("base_hash", "")):
        raise ConflictError("Agent controls changed on the VPS. Refresh and try again.")

    config = snapshot_sync.get_agent_control_config()
    if snapshot_sync.agent_control_base_hash(config) != str(editor.get("base_hash", "")):
        raise ConflictError("Agent controls changed on the VPS. Refresh and try again.")
    if agent_id not in config.get("agents", {}):
        raise ValidationError("Unsupported agent.")

    values = {}
    for field in ALLOWED_AGENT_FIELDS:
        values[field] = str(payload.get(field, "")).strip()

    required = ("display_name", "provider", "lane", "mode_target", "approval_policy")
    if any(not values[name] for name in required):
        raise ValidationError("Display name, provider, lane, mode target, and approval policy are required.")

    for file_field in ("soul_file", "identity_file", "memory_file"):
        if values[file_field] not in ALLOWED_IDENTITY_FILES:
            raise ValidationError(f"{file_field} must reference a supported identity file.")

    config["agents"][agent_id].update(values)
    config["agents"][agent_id]["updated_at"] = snapshot_sync.datetime.now().astimezone().replace(microsecond=0).isoformat()
    snapshot_sync.write_remote_file(
        snapshot_sync.AGENT_CONTROL_FILE,
        json.dumps(config, ensure_ascii=True, indent=2) + "\n",
    )
    return sync_snapshot()


def restart_runtime_service(payload: dict) -> dict:
    service = str(payload.get("service", "")).strip()
    snapshot = load_snapshot()
    if service not in allowed_services(snapshot):
        raise ValidationError("Unsupported service.")

    command = (
        f"sudo -n systemctl restart {snapshot_sync.shell_quote(service)} "
        f"&& sudo -n systemctl is-active {snapshot_sync.shell_quote(service)}"
    )
    run_remote_shell(command)
    return sync_snapshot()


def install_skill(payload: dict) -> dict:
    slug = str(payload.get("slug", "")).strip()
    version = str(payload.get("version", "")).strip()
    force = bool(payload.get("force"))
    if not slug:
        raise ValidationError("Skill slug is required.")

    command = f"cd {snapshot_sync.shell_quote(snapshot_sync.WORKSPACE_ROOT)} && openclaw skills install {snapshot_sync.shell_quote(slug)}"
    if version:
        command += f" --version {snapshot_sync.shell_quote(version)}"
    if force:
        command += " --force"

    result = snapshot_sync.run_remote_primeus(command)
    if result.returncode != 0:
        raise RemoteFailureError((result.stderr or result.stdout or "Skill install failed.").strip())
    return sync_snapshot()


class ControlHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        sys.stdout.write("[monitor] " + (fmt % args) + "\n")

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/dashboard":
            json_response(self, HTTPStatus.OK, {"ok": True, "snapshot": load_snapshot()})
            return
        return super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        action_name = parsed.path.replace("/api/", "", 1).strip("/") or "unknown"
        action_target = ""
        try:
            payload = parse_json_body(self)
            with API_LOCK:
                if parsed.path == "/api/refresh":
                    snapshot = sync_snapshot()
                    append_action_audit(action_name, outcome="success", message="Snapshot refreshed.")
                    json_response(self, HTTPStatus.OK, {"ok": True, "message": "Snapshot refreshed.", "snapshot": snapshot})
                    return
                if parsed.path == "/api/runtime/restart":
                    action_target = str(payload.get("service", "")).strip()
                    snapshot = restart_runtime_service(payload)
                    append_action_audit(action_name, target=action_target, outcome="success", message="Service restarted.")
                    json_response(self, HTTPStatus.OK, {"ok": True, "message": "Service restarted.", "snapshot": snapshot})
                    return
                if parsed.path == "/api/integrations/save":
                    snapshot = save_integrations(payload)
                    append_action_audit(action_name, outcome="success", message="OpenClaw configuration saved on the VPS.")
                    json_response(
                        self,
                        HTTPStatus.OK,
                        {"ok": True, "message": "OpenClaw configuration saved on the VPS.", "snapshot": snapshot},
                    )
                    return
                if parsed.path == "/api/identity/save":
                    action_target = str(payload.get("name", "")).strip()
                    snapshot = save_identity(payload)
                    append_action_audit(action_name, target=action_target, outcome="success", message=f"{payload.get('name', 'Identity file')} saved on the VPS.")
                    json_response(
                        self,
                        HTTPStatus.OK,
                        {"ok": True, "message": f"{payload.get('name', 'Identity file')} saved on the VPS.", "snapshot": snapshot},
                    )
                    return
                if parsed.path == "/api/agents/save":
                    action_target = str(payload.get("agent_id", "")).strip()
                    snapshot = save_agent_controls(payload)
                    append_action_audit(action_name, target=action_target, outcome="success", message=f"{payload.get('agent_id', 'Agent')} controls saved on the VPS.")
                    json_response(
                        self,
                        HTTPStatus.OK,
                        {"ok": True, "message": f"{payload.get('agent_id', 'Agent')} controls saved on the VPS.", "snapshot": snapshot},
                    )
                    return
                if parsed.path == "/api/skills/install":
                    action_target = str(payload.get("slug", "")).strip()
                    snapshot = install_skill(payload)
                    append_action_audit(action_name, target=action_target, outcome="success", message=f"{payload.get('slug', 'Skill')} installed on the VPS.")
                    json_response(
                        self,
                        HTTPStatus.OK,
                        {"ok": True, "message": f"{payload.get('slug', 'Skill')} installed on the VPS.", "snapshot": snapshot},
                    )
                    return
            json_response(self, HTTPStatus.NOT_FOUND, {"ok": False, "message": "Unknown API route."})
        except MonitorError as exc:
            append_action_audit(action_name, target=action_target, outcome="error", message=str(exc))
            json_response(self, exc.status, {"ok": False, "message": str(exc)})
        except Exception as exc:  # pragma: no cover - defensive
            append_action_audit(action_name, target=action_target, outcome="error", message=str(exc))
            json_response(self, HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "message": str(exc)})


def main() -> int:
    bootstrap_snapshot()
    server = ThreadingHTTPServer(("127.0.0.1", PORT), ControlHandler)
    print(f"Agent Control running at http://localhost:{PORT}/")
    server.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
