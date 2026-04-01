#!/usr/bin/env python3
from __future__ import annotations

import json
import os
from dataclasses import dataclass
from datetime import datetime
from hashlib import sha256
from pathlib import Path

import paramiko


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
REMOTE_HOST = os.environ.get("PRIMEUS_MONITOR_SSH_HOST", "")
REMOTE_USER = os.environ.get("PRIMEUS_MONITOR_SSH_USER", "operator")
REMOTE_SSH_KEY = os.environ.get("PRIMEUS_MONITOR_SSH_KEY", "")
WORKSPACE_ROOT = os.environ.get("PRIMEUS_MONITOR_WORKSPACE_ROOT", "/home/operator/.openclaw/workspace")
OPENCLAW_ROOT = os.environ.get("PRIMEUS_MONITOR_OPENCLAW_ROOT", "/home/operator/.openclaw")
RUNTIME_ROOT = os.environ.get("PRIMEUS_MONITOR_RUNTIME_ROOT", "/home/operator/.local/share/kol-runtime")
ROOM_FILE = f"{WORKSPACE_ROOT}/PRIMEUS_CODEX_ROOM.jsonl"
ROOM_STATE_FILE = f"{WORKSPACE_ROOT}/PRIMEUS_CODEX_ROOM_STATE.md"
BUILD_STATUS_FILE = f"{WORKSPACE_ROOT}/BUILD_STATUS.md"
CODEX_HANDOFF_FILE = f"{WORKSPACE_ROOT}/CODEX_HANDOFF.md"
PRIMEUS_CODEX_PROTOCOL_FILE = f"{WORKSPACE_ROOT}/PRIMEUS_CODEX_PROTOCOL.md"
AGENT_CONTROL_FILE = f"{WORKSPACE_ROOT}/AGENT_CONTROL.json"
AGENTS_FILE = f"{WORKSPACE_ROOT}/AGENTS.md"
SOUL_FILE = f"{WORKSPACE_ROOT}/SOUL.md"
IDENTITY_FILE = f"{WORKSPACE_ROOT}/IDENTITY.md"
USER_FILE = f"{WORKSPACE_ROOT}/USER.md"
MEMORY_FILE = f"{WORKSPACE_ROOT}/MEMORY.md"
ROOM_HELPER_DIR = f"{WORKSPACE_ROOT}/scripts/primeus_codex_room"
KOL_RUNTIME_ROOT = f"{WORKSPACE_ROOT}/kol-runtime"
OPENCLAW_CONFIG_FILE = f"{OPENCLAW_ROOT}/openclaw.json"
REPORTS_ROOT = f"{RUNTIME_ROOT}/reports"
DAILY_REPORT_FILE = f"{REPORTS_ROOT}/daily/latest.json"
RUNTIME_HEALTH_FILE = f"{RUNTIME_ROOT}/health/latest.json"
RUNTIME_MONITORING_FILE = f"{RUNTIME_ROOT}/reports/monitoring/latest.json"
RUNTIME_SHADOW_REVIEW_FILE = f"{RUNTIME_ROOT}/reports/shadow-review/latest.json"
RUNTIME_DB_FILE = os.environ.get("PRIMEUS_MONITOR_DB_FILE", f"{RUNTIME_ROOT}/data/kol.sqlite")
IDENTITY_FILE_OPTIONS = ("SOUL.md", "IDENTITY.md", "USER.md", "MEMORY.md", "AGENTS.md")


@dataclass
class CommandResult:
    stdout: str
    stderr: str
    returncode: int


_SSH_CLIENT: paramiko.SSHClient | None = None
_SFTP_CLIENT: paramiko.SFTPClient | None = None


def get_ssh_client() -> paramiko.SSHClient:
    global _SSH_CLIENT
    if _SSH_CLIENT is None:
        if not REMOTE_HOST:
            raise RuntimeError("Set PRIMEUS_MONITOR_SSH_HOST to enable live VPS sync.")
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        kwargs = {
            "hostname": REMOTE_HOST,
            "username": REMOTE_USER,
            "timeout": 10,
            "banner_timeout": 10,
            "auth_timeout": 10,
            "look_for_keys": not bool(REMOTE_SSH_KEY),
        }
        if REMOTE_SSH_KEY:
            kwargs["key_filename"] = REMOTE_SSH_KEY
        client.connect(**kwargs)
        _SSH_CLIENT = client
    return _SSH_CLIENT


def get_sftp_client() -> paramiko.SFTPClient:
    global _SFTP_CLIENT
    if _SFTP_CLIENT is None:
        _SFTP_CLIENT = get_ssh_client().open_sftp()
    return _SFTP_CLIENT


def run_remote(command: str) -> CommandResult:
    stdin, stdout, stderr = get_ssh_client().exec_command(command)
    return CommandResult(
        stdout=stdout.read().decode("utf-8"),
        stderr=stderr.read().decode("utf-8"),
        returncode=stdout.channel.recv_exit_status(),
    )


def run_remote_primeus(command: str) -> CommandResult:
    return run_remote(f"bash -lc {shell_quote(command)}")


def read_remote_file(path: str) -> str:
    try:
        with get_sftp_client().open(path, "r") as handle:
            return handle.read().decode("utf-8")
    except FileNotFoundError:
        return ""


def write_remote_file(path: str, content: str) -> None:
    with get_sftp_client().open(path, "w") as handle:
        handle.write(content)


def read_remote_json(path: str) -> dict:
    raw = read_remote_file(path)
    if not raw.strip():
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {}


def get_service_statuses() -> list[dict[str, str]]:
    result = run_remote(
        "sudo -n systemctl is-active "
        "openclaw-gateway.service kol-manager.service tg-worker-john.service tg-worker-sora.service"
    )
    names = [
        "openclaw-gateway.service",
        "kol-manager.service",
        "tg-worker-john.service",
        "tg-worker-sora.service",
    ]
    lines = [line.strip() for line in result.stdout.splitlines() if line.strip()]
    statuses = []
    for index, name in enumerate(names):
        status = lines[index] if index < len(lines) else "unknown"
        statuses.append({"name": name, "status": status})
    return statuses


def get_codex_login_status() -> str:
    result = run_remote_primeus("if codex login status >/dev/null 2>&1; then printf ready; else printf blocked; fi")
    return result.stdout.strip() or "unknown"


def get_coding_agent_status() -> str:
    result = run_remote_primeus("openclaw skills list | grep -m 1 'coding-agent' || true")
    line = result.stdout.lower()
    if "needs setup" in line:
        return "needs_setup"
    if "ready" in line:
        return "ready"
    return "unknown"


def get_worker_health_snapshot() -> dict:
    script = """
import json
from dataclasses import asdict
from kol_runtime.config import load_config
from kol_runtime.db import connect
from kol_runtime.health import build_health_report

config = load_config()
conn = connect(config.db_path)
report = build_health_report(conn, config=config)
accounts = {account.account_id: account for account in config.accounts}
payload = {
    "release_version": report.release_version,
    "recommended_mode": report.recommended_mode,
    "codex_required_for_daily_ops": report.codex_required_for_daily_ops,
    "total_active_threads": report.total_active_threads,
    "scorecards": [
        {
            **asdict(card),
            "username": accounts[card.account_id].username,
            "enabled": accounts[card.account_id].enabled,
        }
        for card in report.scorecards
    ],
}
print(json.dumps(payload))
"""
    command = f"cd {shell_quote(KOL_RUNTIME_ROOT)} && . .venv/bin/activate && python - <<'PY'\n{script}\nPY"
    result = run_remote_primeus(command)
    try:
        return json.loads(result.stdout.strip() or "{}")
    except json.JSONDecodeError:
        return {
            "release_version": "unknown",
            "recommended_mode": "unknown",
            "codex_required_for_daily_ops": True,
            "total_active_threads": 0,
            "scorecards": [],
        }


def default_agent_control_config() -> dict:
    return {
        "version": 1,
        "agents": {
            "primeus": {
                "display_name": "Primeus",
                "provider": "OpenClaw Control",
                "lane": "Room + canonical docs",
                "mode_target": "Orchestrate",
                "approval_policy": "Escalate only for approvals, OTP, access, or real business decisions.",
                "soul_file": "SOUL.md",
                "identity_file": "IDENTITY.md",
                "memory_file": "MEMORY.md",
                "notes": "Owns boss intake, approval flow, and Codex delegation.",
                "updated_at": "",
            },
            "codex": {
                "display_name": "Codex",
                "provider": "Codex CLI",
                "lane": "Bundled coding-agent bash-first",
                "mode_target": "Build and verify",
                "approval_policy": "No high-risk external action without Primeus review.",
                "soul_file": "SOUL.md",
                "identity_file": "AGENTS.md",
                "memory_file": "MEMORY.md",
                "notes": "Handles build, patch, deploy, and verification work on the VPS.",
                "updated_at": "",
            },
            "john": {
                "display_name": "John",
                "provider": "Telegram execution worker",
                "lane": "Outreach execution lane",
                "mode_target": "Execute in shadow-first mode",
                "approval_policy": "Cash and high-risk outbound stay behind approval.",
                "soul_file": "SOUL.md",
                "identity_file": "AGENTS.md",
                "memory_file": "MEMORY.md",
                "notes": "Owns outreach and reply execution on the John account.",
                "updated_at": "",
            },
            "sora": {
                "display_name": "Sora",
                "provider": "Telegram execution worker",
                "lane": "Outreach execution lane",
                "mode_target": "Execute in shadow-first mode",
                "approval_policy": "Cash and high-risk outbound stay behind approval.",
                "soul_file": "SOUL.md",
                "identity_file": "AGENTS.md",
                "memory_file": "MEMORY.md",
                "notes": "Owns outreach and reply execution on the Sora account.",
                "updated_at": "",
            },
        },
    }


def agent_control_base_hash(config: dict) -> str:
    return sha256_text(json.dumps(config, ensure_ascii=True, sort_keys=True))


def get_agent_control_config() -> dict:
    config = default_agent_control_config()
    raw = read_remote_json(AGENT_CONTROL_FILE)
    remote_agents = raw.get("agents", {}) if isinstance(raw, dict) else {}
    for agent_id, defaults in config["agents"].items():
        remote = remote_agents.get(agent_id, {})
        if not isinstance(remote, dict):
            continue
        merged = defaults.copy()
        for key in defaults:
            if key in remote and remote[key] is not None:
                merged[key] = str(remote[key])
        config["agents"][agent_id] = merged
    return config


def build_agents_snapshot(
    *,
    services: list[dict[str, str]],
    room_meta: dict,
) -> dict:
    worker_health = get_worker_health_snapshot()
    codex_status = get_codex_login_status()
    coding_agent_status = get_coding_agent_status()
    protocol_ready = read_remote_file(PRIMEUS_CODEX_PROTOCOL_FILE).strip() != ""
    agent_controls = get_agent_control_config()
    service_map = {item["name"]: item["status"] for item in services}

    items = [
        {
            "id": "primeus",
            "label": "Primeus",
            "kind": "Orchestrator",
            "handle": "OpenClaw / Telegram",
            "status": "active" if service_map.get("openclaw-gateway.service") == "active" and protocol_ready else "blocked",
            "summary": "Owns boss intake, approval flow, and Codex delegation.",
            "live": {
                "service": service_map.get("openclaw-gateway.service", "unknown"),
                "protocol": "ready" if protocol_ready else "missing",
                "privilege": "sudo -n",
                "threads": "",
                "approvals": "",
                "score": "",
                "route": "room + canonical docs",
            },
            "metrics": [
                {"label": "Lane", "value": "room + canonical docs"},
                {"label": "Privilege", "value": "sudo -n"},
                {"label": "Service", "value": service_map.get("openclaw-gateway.service", "unknown")},
            ],
        },
        {
            "id": "codex",
            "label": "Codex",
            "kind": "Technical Worker",
            "handle": "bundled coding-agent",
            "status": "ready" if codex_status == "ready" and coding_agent_status == "ready" else "blocked",
            "summary": "Handles build, patch, and verification work on the VPS.",
            "live": {
                "service": "n/a",
                "protocol": coding_agent_status,
                "privilege": "sudo -n via primeus",
                "threads": "",
                "approvals": "",
                "score": "",
                "route": "bash-first",
                "login": codex_status,
                "skill": coding_agent_status,
            },
            "metrics": [
                {"label": "Login", "value": codex_status},
                {"label": "Skill", "value": coding_agent_status},
                {"label": "Route", "value": "bash-first"},
            ],
        },
    ]

    for scorecard in worker_health.get("scorecards", []):
        service_name = f"tg-worker-{scorecard['account_id']}.service"
        service_status = service_map.get(service_name, "unknown")
        status = "active"
        if (
            service_status != "active"
            or not scorecard.get("session_ready")
            or scorecard.get("heartbeat_stale")
            or scorecard.get("inbox_stale")
        ):
            status = "blocked"
        elif scorecard.get("recommended_mode") == "assisted":
            status = "pending"
        items.append(
            {
                "id": scorecard["account_id"],
                "label": title_case(scorecard["account_id"]),
                "kind": "Execution Worker",
                "handle": scorecard.get("username", ""),
                "status": status,
                "summary": "Owns outreach and reply execution on its Telegram account.",
                "metrics": [
                    {"label": "Threads", "value": str(scorecard.get("assigned_threads", 0))},
                    {"label": "Approvals", "value": str(scorecard.get("approval_blocked", 0))},
                    {"label": "Score", "value": str(scorecard.get("score", 0))},
                ],
                "live": {
                    "service": service_status,
                    "protocol": "session ready" if scorecard.get("session_ready") else "session missing",
                    "privilege": "runtime worker",
                    "threads": str(scorecard.get("assigned_threads", 0)),
                    "approvals": str(scorecard.get("approval_blocked", 0)),
                    "score": str(scorecard.get("score", 0)),
                    "route": scorecard.get("recommended_mode", "unknown"),
                },
                "service": service_status,
                "session_ready": bool(scorecard.get("session_ready")),
                "heartbeat_stale": bool(scorecard.get("heartbeat_stale")),
                "inbox_stale": bool(scorecard.get("inbox_stale")),
            }
        )

    for item in items:
        controls = agent_controls["agents"].get(item["id"], {})
        item["controls"] = controls
        if controls.get("display_name"):
            item["label"] = controls["display_name"]

    ready_count = sum(1 for item in items if item["status"] in {"active", "ready"})
    attention_count = len(items) - ready_count
    return {
        "summary": {
            "release_version": worker_health.get("release_version", "unknown"),
            "recommended_mode": worker_health.get("recommended_mode", "unknown"),
            "codex_required_for_daily_ops": bool(worker_health.get("codex_required_for_daily_ops", True)),
            "total_active_threads": int(worker_health.get("total_active_threads", 0)),
            "ready_count": ready_count,
            "attention_count": attention_count,
            "room_helper_status": room_meta.get("helper_status", {}).get("status", "unknown"),
        },
        "items": items,
        "editor": {
            "base_hash": agent_control_base_hash(agent_controls),
            "file": AGENT_CONTROL_FILE,
            "identity_files": list(IDENTITY_FILE_OPTIONS),
        },
    }


def build_runtime_snapshot(
    *,
    services: list[dict[str, str]],
) -> dict:
    health = read_remote_json(RUNTIME_HEALTH_FILE)
    monitoring = read_remote_json(RUNTIME_MONITORING_FILE)
    shadow = read_remote_json(RUNTIME_SHADOW_REVIEW_FILE)
    service_map = {item["name"]: item["status"] for item in services}

    worker_health = []
    for card in health.get("scorecards", []):
        worker_health.append(
            {
                "account_id": card.get("account_id", ""),
                "status": "healthy"
                if card.get("session_ready") and not card.get("heartbeat_stale") and not card.get("inbox_stale")
                else "degraded",
                "score": int(card.get("score", 0)),
                "assigned_threads": int(card.get("assigned_threads", 0)),
                "approval_blocked": int(card.get("approval_blocked", 0)),
                "session_ready": bool(card.get("session_ready")),
                "heartbeat_stale": bool(card.get("heartbeat_stale")),
                "inbox_stale": bool(card.get("inbox_stale")),
                "recommended_mode": str(card.get("recommended_mode", "unknown")),
                "service": service_map.get(f"tg-worker-{card.get('account_id', '')}.service", "unknown"),
            }
        )

    drift_rows = []
    for row in shadow.get("rows", [])[:4]:
        drift_rows.append(
            {
                "kol_username": str(row.get("kol_username", "")),
                "owner_account": str(row.get("owner_account", "")),
                "review_reason": str(row.get("review_reason", "")),
                "review_priority": int(row.get("review_priority", 0)),
                "status": str(row.get("status", "")),
                "decision_lane": str(row.get("decision_lane", "")),
            }
        )

    return {
        "health": {
            "generated_at": str(health.get("generated_at", "")),
            "overall_status": str(health.get("overall_status", "unknown")),
            "release_version": str(health.get("release_version", "unknown")),
            "send_mode": str(health.get("send_mode", "unknown")),
            "recommended_mode": str(health.get("recommended_mode", "unknown")),
            "manager_heartbeat_stale": bool(health.get("manager_heartbeat_stale", True)),
            "total_active_threads": int(health.get("total_active_threads", 0)),
            "codex_required_for_daily_ops": bool(health.get("codex_required_for_daily_ops", True)),
        },
        "monitoring": {
            "generated_at": str(monitoring.get("generated_at", "")),
            "summary": monitoring.get("summary", {}),
        },
        "shadow_review": {
            "generated_at": str(shadow.get("generated_at", "")),
            "summary": shadow.get("summary", {}),
            "top_rows": drift_rows,
        },
        "workers": worker_health,
    }


def get_report_inventory() -> dict:
    script = f"""
import json
from pathlib import Path

root = Path({shell_quote(REPORTS_ROOT)})
payload = {{}}
for name in ("daily", "monitoring", "shadow-review"):
    directory = root / name
    json_files = sorted(p.name for p in directory.glob("*.json"))
    html_files = sorted(p.name for p in directory.glob("*.html"))
    payload[name] = {{
        "json_count": len(json_files),
        "html_count": len(html_files),
        "latest_json": json_files[-1] if json_files else "",
        "latest_html": html_files[-1] if html_files else "",
    }}
print(json.dumps(payload))
"""
    result = run_remote(f"python3 - <<'PY'\n{script}\nPY")
    try:
        return json.loads(result.stdout.strip() or "{}")
    except json.JSONDecodeError:
        return {}


def get_runtime_db_snapshot() -> dict:
    script = f"""
import json
import sqlite3

conn = sqlite3.connect({json.dumps(RUNTIME_DB_FILE)})
conn.row_factory = sqlite3.Row
cur = conn.cursor()
queries = {
    "thread_statuses": "select status, count(*) as count from kol_threads group by status order by count desc",
    "escalation_statuses": "select status, count(*) as count from escalations group by status order by count desc",
    "send_attempts": "select status, count(*) as count from send_attempts group by status order by count desc",
    "ownership": "select owner_account, count(*) as count from ownership_locks where status = 'active' group by owner_account order by count desc",
    "recent_events": \"\"\"
        select event_type, actor_type, actor_id, thread_id, created_at
        from events
        order by created_at desc
        limit 10
    \"\"\",
}
payload = {name: [dict(row) for row in cur.execute(query).fetchall()] for name, query in queries.items()}
print(json.dumps(payload))
"""
    result = run_remote(f"python3 - <<'PY'\n{script}\nPY")
    try:
        return json.loads(result.stdout.strip() or "{}")
    except json.JSONDecodeError:
        return {}


def get_openclaw_config() -> dict:
    return read_remote_json(OPENCLAW_CONFIG_FILE)


def extract_integrations_editor(config: dict) -> dict:
    auth_profiles = config.get("auth", {}).get("profiles", {})
    _profile_name, profile_payload = next(iter(auth_profiles.items()), ("Unknown", {}))
    primary_model = config.get("agents", {}).get("defaults", {}).get("model", {}).get("primary", "unknown")
    telegram = config.get("channels", {}).get("telegram", {})
    gateway = config.get("gateway", {})
    web_search = config.get("tools", {}).get("web", {}).get("search", {})

    editable_fields = {
        "primary_model": primary_model,
        "search_provider": web_search.get("provider", "unknown"),
        "dm_policy": telegram.get("dmPolicy", "unknown"),
        "group_policy": telegram.get("groupPolicy", "unknown"),
        "gateway_port": str(gateway.get("port", "18789")),
    }
    return {
        "fields": editable_fields,
        "presence": {
            "gateway_token": bool(gateway.get("auth", {}).get("token")),
            "telegram_bot_token": bool(telegram.get("botToken")),
            "brave_api_key": bool(
                config.get("plugins", {})
                .get("entries", {})
                .get("brave", {})
                .get("config", {})
                .get("webSearch", {})
                .get("apiKey")
            ),
        },
        "oauth": {
            "provider": profile_payload.get("provider", "unknown"),
            "mode": profile_payload.get("mode", "unknown"),
            "email": mask_email(profile_payload.get("email", "unknown")),
        },
        "base_hash": sha256_text(json.dumps(editable_fields, sort_keys=True)),
    }


def get_skills_inventory() -> dict:
    result = run_remote_primeus(
        f"cd {shell_quote(WORKSPACE_ROOT)} && openclaw skills list --json"
    )
    raw = result.stdout.strip() or result.stderr.strip()
    if result.returncode != 0 or not raw:
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {}


def extract_section_bullets(raw: str, heading: str, limit: int = 4) -> list[str]:
    target = heading.strip().lower()
    lines = raw.splitlines()
    inside = False
    items: list[str] = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("#"):
            current = stripped.lstrip("#").strip().lower()
            if inside and current != target:
                break
            inside = current == target
            continue
        if not inside:
            continue
        if stripped.startswith("- "):
            items.append(stripped[2:].strip())
        elif stripped and not items:
            items.append(stripped.strip("*_"))
        if len(items) >= limit:
            break
    return items


def first_meaningful_line(raw: str) -> str:
    for line in raw.splitlines():
        stripped = line.strip().strip("*_")
        if stripped and not stripped.startswith("#"):
            return stripped
    return "No summary available."


def recent_log_lines(raw: str, limit: int = 5) -> list[str]:
    lines = [line.strip() for line in raw.splitlines() if line.strip()]
    return lines[-limit:]


def count_phrase(count: int, noun: str) -> str:
    return f"{count} {noun}" + ("" if count == 1 else "s")


def mask_email(value: str) -> str:
    raw = str(value or "").strip()
    if "@" not in raw:
        return raw or "unknown"
    local, domain = raw.split("@", 1)
    if len(local) <= 2:
        local_masked = local[:1] + "*"
    else:
        local_masked = local[:2] + "***"
    return f"{local_masked}@{domain}"


def summarize_count_rows(rows: list[dict], *, key: str = "status", limit: int = 3) -> str:
    if not rows:
        return "No data yet."
    parts = []
    for row in rows[:limit]:
        label = str(row.get(key, "unknown")).replace("_", " ")
        parts.append(f"{row.get('count', 0)} {label}")
    return ", ".join(parts)


def humanize_token(value: str, fallback: str = "Unknown") -> str:
    raw = str(value or "").strip()
    if not raw:
        return fallback
    return raw.replace("_", " ").replace("-", " ").title()


def normalize_owner_label(value: str) -> str:
    raw = str(value or "").strip().lower()
    if not raw:
        return "Unassigned"
    if raw == "manager":
        return "Manager"
    if raw == "human":
        return "Human"
    return humanize_token(raw, fallback="Unassigned")


def build_offer_summary(row: dict) -> str:
    offer_summary = str(row.get("offer_summary") or "").strip()
    if offer_summary:
        return offer_summary
    current_offer = str(row.get("current_offer") or "").strip()
    cash_status = str(row.get("cash_status") or "").strip()
    if current_offer and cash_status:
        return f"{current_offer} ({humanize_token(cash_status)})"
    if current_offer:
        return current_offer
    if cash_status and cash_status != "none":
        return humanize_token(cash_status)
    return "No offer context"


def build_escalation_summary(row: dict) -> str:
    escalation_status = str(
        row.get("latest_escalation_record_status")
        or row.get("latest_escalation_status")
        or row.get("escalation_status")
        or ""
    ).strip()
    escalation_type = str(row.get("latest_escalation_type") or "").strip()
    escalation_reason = str(row.get("latest_escalation_reason") or "").strip()
    if not any((escalation_status, escalation_type, escalation_reason)):
        return "None"
    parts = []
    if escalation_status and escalation_status != "none":
        parts.append(humanize_token(escalation_status))
    if escalation_type:
        parts.append(humanize_token(escalation_type))
    if escalation_reason:
        parts.append(escalation_reason)
    return " - ".join(parts)


def build_blocker_summary(row: dict) -> str:
    primary_objection = str(row.get("primary_objection") or "").strip()
    escalation_reason = str(row.get("latest_escalation_reason") or "").strip()
    short_note = str(row.get("short_note") or "").strip()
    if primary_objection:
        return humanize_token(primary_objection)
    if escalation_reason:
        return escalation_reason
    if short_note:
        return short_note
    return "No blocker recorded"


def build_report_board_row(row: dict) -> dict:
    issue_label = str(row.get("issue_label") or humanize_token(str(row.get("review_reason") or ""), fallback="Review"))
    status_label = str(row.get("status_label") or humanize_token(str(row.get("status") or ""), fallback="Unknown"))
    lane_label = str(row.get("lane_label") or humanize_token(str(row.get("decision_lane") or ""), fallback="Unknown"))
    priority_score = int(row.get("priority_score", row.get("review_priority", 0)) or 0)
    recommended_action = str(row.get("recommended_action") or humanize_token(str(row.get("next_action") or ""), fallback="Review next step"))
    next_action_owner = normalize_owner_label(str(row.get("next_action_owner") or row.get("owner_account") or ""))
    next_action_due_at = str(row.get("next_action_due_at") or "")
    latest_inbound_message = str(row.get("latest_inbound_message") or "").strip()
    latest_inbound_request = str(row.get("latest_inbound_request") or row.get("intent_level") or row.get("inbound_class") or "").strip()
    operator_note = str(row.get("short_note") or row.get("rolling_summary") or "").strip()
    board_row = {
        "thread_id": str(row.get("thread_id") or ""),
        "label": str(row.get("kol_username") or "Unknown thread"),
        "kol_username": str(row.get("kol_username") or "Unknown thread"),
        "owner": str(row.get("owner_account") or "unknown"),
        "owner_label": humanize_token(str(row.get("owner_account") or ""), fallback="Unknown"),
        "issue": issue_label.lower(),
        "issue_label": issue_label,
        "status": str(row.get("status") or ""),
        "status_label": status_label,
        "lane": str(row.get("decision_lane") or ""),
        "lane_label": lane_label,
        "priority": priority_score,
        "priority_score": priority_score,
        "recommended_action": recommended_action,
        "next_action_owner": next_action_owner,
        "next_action_due_at": next_action_due_at,
        "latest_inbound_message": latest_inbound_message,
        "latest_inbound_request": humanize_token(latest_inbound_request, fallback="Unknown"),
        "offer_summary": build_offer_summary(row),
        "blocker_summary": build_blocker_summary(row),
        "escalation_summary": build_escalation_summary(row),
        "operator_note": operator_note or "No operator note recorded.",
        "urgency": str(row.get("urgency") or "unknown"),
        "approval_pressure": str(row.get("approval_pressure") or ""),
        "source": "Monitoring report",
    }
    board_row["manual_review"] = any(
        (
            "approval" in board_row["issue"],
            "review" in board_row["lane"],
            "hold" in board_row["lane"],
            "guarded" in board_row["lane"],
            "human approval" in board_row["status_label"].lower(),
        )
    )
    board_row["waiting_on_kol"] = "kol" in board_row["status_label"].lower() and (
        "awaiting" in board_row["status_label"].lower() or "waiting" in board_row["status_label"].lower()
    )
    board_row["green_lane"] = "green" in board_row["lane_label"].lower()
    return board_row


def build_reports_snapshot(
    *,
    runtime_detail: dict,
) -> dict:
    daily = read_remote_json(DAILY_REPORT_FILE)
    monitoring = read_remote_json(RUNTIME_MONITORING_FILE)
    shadow = read_remote_json(RUNTIME_SHADOW_REVIEW_FILE)
    inventory = get_report_inventory()
    db = get_runtime_db_snapshot()
    monitoring_summary = monitoring.get("summary", {})
    shadow_rows = shadow.get("rows", [])
    monitoring_rows = monitoring.get("rows", [])

    report_defs = [
        ("daily", "Daily", daily),
        ("monitoring", "Monitoring", monitoring),
        ("shadow-review", "Shadow review", shadow),
    ]
    runs = []
    for key, label, payload in report_defs:
        counts = inventory.get(key, {})
        summary = payload.get("summary", {}) if isinstance(payload, dict) else {}
        runs.append(
            {
                "id": key,
                "label": label,
                "generated_at": str(payload.get("generated_at", "")) if isinstance(payload, dict) else "",
                "row_count": len(payload.get("rows", [])) if isinstance(payload, dict) else 0,
                "json_count": int(counts.get("json_count", 0)),
                "html_count": int(counts.get("html_count", 0)),
                "latest_json": str(counts.get("latest_json", "")),
                "latest_html": str(counts.get("latest_html", "")),
                "summary": (
                    f"{count_phrase(int(summary.get('total_threads', 0)), 'thread')}, "
                    f"{count_phrase(int(summary.get('pending_approval_count', 0)), 'approval')}, "
                    f"{count_phrase(int(summary.get('escalation_count', 0)), 'escalation')}"
                ),
            }
        )

    board_rows = [build_report_board_row(row) for row in monitoring_rows]
    board_rows.sort(
        key=lambda row: (
            -int(row.get("priority_score", 0)),
            str(row.get("next_action_due_at") or ""),
            str(row.get("kol_username") or ""),
        )
    )

    watchlist = []
    for row in board_rows[:12]:
        watchlist.append(
            {
                "label": row.get("label", "Unknown thread"),
                "kol_username": row.get("kol_username", "Unknown thread"),
                "issue": row.get("issue_label", "Review"),
                "issue_label": row.get("issue_label", "Review"),
                "owner": row.get("owner", "unknown"),
                "owner_label": row.get("owner_label", "Unknown"),
                "lane": row.get("lane_label", "Unknown"),
                "lane_label": row.get("lane_label", "Unknown"),
                "status": row.get("status_label", "Unknown"),
                "status_label": row.get("status_label", "Unknown"),
                "priority": int(row.get("priority_score", 0)),
                "priority_score": int(row.get("priority_score", 0)),
                "recommended_action": row.get("recommended_action", ""),
                "next_action_owner": row.get("next_action_owner", ""),
                "next_action_due_at": row.get("next_action_due_at", ""),
                "offer_summary": row.get("offer_summary", ""),
                "blocker_summary": row.get("blocker_summary", ""),
                "escalation_summary": row.get("escalation_summary", ""),
                "operator_note": row.get("operator_note", ""),
                "latest_inbound_message": row.get("latest_inbound_message", ""),
                "latest_inbound_request": row.get("latest_inbound_request", ""),
                "manual_review": bool(row.get("manual_review")),
                "waiting_on_kol": bool(row.get("waiting_on_kol")),
                "green_lane": bool(row.get("green_lane")),
            }
        )

    summary_rows = [
        {"label": "Threads", "value": str(monitoring_summary.get("total_threads", 0))},
        {"label": "Pending approvals", "value": str(monitoring_summary.get("pending_approval_count", 0))},
        {"label": "Escalations", "value": str(monitoring_summary.get("escalation_count", 0))},
        {"label": "Negotiating", "value": str(monitoring_summary.get("negotiating", 0))},
    ]

    file_rows = []
    for key, label, _payload in report_defs:
        counts = inventory.get(key, {})
        file_rows.append(
            {
                "label": label,
                "value": f"{counts.get('json_count', 0)} json · {counts.get('html_count', 0)} html",
                "latest_json": str(counts.get("latest_json", "")),
                "latest_html": str(counts.get("latest_html", "")),
            }
        )

    breakdown_rows = []
    for group, rows in (
        ("Thread state", db.get("thread_statuses", [])),
        ("Escalation", db.get("escalation_statuses", [])),
        ("Send attempt", db.get("send_attempts", [])),
        ("Owner", db.get("ownership", [])),
    ):
        label_key = "owner_account" if group == "Owner" else "status"
        for row in rows:
            breakdown_rows.append(
                {
                    "group": group,
                    "label": str(row.get(label_key, "unknown")).replace("_", " "),
                    "value": str(row.get("count", 0)),
                }
            )

    return {
        "runs": runs,
        "watchlist": watchlist,
        "board_rows": board_rows,
        "summary_rows": summary_rows,
        "file_rows": file_rows,
        "breakdown_rows": breakdown_rows,
    }


def build_integrations_snapshot(
    *,
    services: list[dict[str, str]],
) -> dict:
    config = get_openclaw_config()
    auth_profiles = config.get("auth", {}).get("profiles", {})
    profile_name, profile_payload = next(iter(auth_profiles.items()), ("Unknown", {}))
    primary_model = config.get("agents", {}).get("defaults", {}).get("model", {}).get("primary", "unknown")
    workspace = config.get("agents", {}).get("defaults", {}).get("workspace", "unknown")
    telegram = config.get("channels", {}).get("telegram", {})
    gateway = config.get("gateway", {})
    web_search = config.get("tools", {}).get("web", {}).get("search", {})
    services_map = {item["name"]: item["status"] for item in services}
    codex_login_status = get_codex_login_status()
    coding_agent_status = get_coding_agent_status()
    gateway_bind = str(gateway.get("bind", "unknown"))
    gateway_port = str(gateway.get("port", "unknown"))
    gateway_auth_mode = str(gateway.get("auth", {}).get("mode", "unknown"))
    brave_present = bool(
        config.get("plugins", {})
        .get("entries", {})
        .get("brave", {})
        .get("config", {})
        .get("webSearch", {})
        .get("apiKey")
    )
    telegram_bot_present = bool(telegram.get("botToken"))
    gateway_token_present = bool(gateway.get("auth", {}).get("token"))
    secret_count = sum(1 for present in (gateway_token_present, telegram_bot_present, brave_present) if present)
    exposure = "Loopback only" if gateway_bind in {"127.0.0.1", "localhost", "::1"} else f"{gateway_bind}:{gateway_port}"
    channel_status = "enabled" if telegram.get("enabled") else "disabled"
    search_status = "enabled" if web_search.get("enabled") else "disabled"

    items = [
        {
            "label": "OpenClaw",
            "status": "active" if services_map.get("openclaw-gateway.service") == "active" else "blocked",
            "summary": f"Workspace {workspace} on model {primary_model}. Tools profile {config.get('tools', {}).get('profile', 'unknown')}.",
            "metrics": [
                {"label": "Workspace", "value": workspace},
                {"label": "Primary model", "value": primary_model},
                {"label": "Tools", "value": config.get("tools", {}).get("profile", "unknown")},
            ],
        },
        {
            "label": "Telegram",
            "status": "active" if telegram.get("enabled") else "blocked",
            "summary": f"Telegram is {channel_status}. DM policy {telegram.get('dmPolicy', 'unknown')} and group policy {telegram.get('groupPolicy', 'unknown')}.",
            "metrics": [
                {"label": "DM policy", "value": telegram.get("dmPolicy", "unknown")},
                {"label": "Groups", "value": telegram.get("groupPolicy", "unknown")},
                {"label": "Streaming", "value": telegram.get("streaming", "unknown")},
            ],
        },
        {
            "label": "Codex lane",
            "status": "ready" if codex_login_status == "ready" and coding_agent_status == "ready" else "blocked",
            "summary": f"CLI login is {codex_login_status}. coding-agent skill is {coding_agent_status}.",
            "metrics": [
                {"label": "CLI login", "value": codex_login_status},
                {"label": "Skill", "value": coding_agent_status},
                {"label": "Route", "value": "bash-first"},
            ],
        },
        {
            "label": "Gateway",
            "status": "active" if services_map.get("openclaw-gateway.service") == "active" else "blocked",
            "summary": f"Gateway listens on {gateway_bind}:{gateway_port} with auth mode {gateway_auth_mode}.",
            "metrics": [
                {"label": "Mode", "value": gateway.get("mode", "unknown")},
                {"label": "Bind", "value": gateway_bind},
                {"label": "Port", "value": gateway_port},
            ],
        },
        {
            "label": "Web search",
            "status": "active" if web_search.get("enabled") else "blocked",
            "summary": f"Web search is {search_status} with provider {web_search.get('provider', 'unknown')}.",
            "metrics": [
                {"label": "Provider", "value": web_search.get("provider", "unknown")},
                {"label": "Enabled", "value": "yes" if web_search.get("enabled") else "no"},
                {"label": "Auth mode", "value": gateway_auth_mode},
            ],
        },
    ]

    summary_rows = [
        {"label": "Provider", "value": profile_payload.get("provider", "unknown")},
        {"label": "Login mode", "value": profile_payload.get("mode", "unknown")},
        {"label": "Telegram DM", "value": telegram.get("dmPolicy", "unknown")},
        {"label": "Search", "value": web_search.get("provider", "unknown")},
    ]
    security_rows = [
        {"label": "Gateway auth", "value": gateway_auth_mode},
        {"label": "OAuth email", "value": mask_email(profile_payload.get("email", "unknown"))},
        {"label": "Channel exposure", "value": exposure},
        {"label": "Secrets", "value": f"{secret_count} configured · {3 - secret_count} not set"},
    ]
    editor_payload = extract_integrations_editor(config)
    return {
        "items": items,
        "summary_rows": summary_rows,
        "security_rows": security_rows,
        "editor": editor_payload,
    }


def summarize_skill_missing(missing: dict) -> str:
    parts: list[str] = []
    if missing.get("bins"):
        parts.append(f"bins: {', '.join(missing['bins'][:2])}")
    if missing.get("env"):
        parts.append(f"env: {', '.join(missing['env'][:2])}")
    if missing.get("config"):
        parts.append(f"config: {', '.join(missing['config'][:2])}")
    if missing.get("os"):
        parts.append(f"os: {', '.join(missing['os'][:2])}")
    return "; ".join(parts) if parts else "No missing requirements."


def derive_skill_status(item: dict) -> str:
    if item.get("disabled"):
        return "disabled"
    if item.get("blockedByAllowlist"):
        return "blocked"
    if item.get("eligible"):
        return "ready"
    return "needs setup"


def build_skills_snapshot() -> dict:
    inventory = get_skills_inventory()
    skills = inventory.get("skills", []) if isinstance(inventory, dict) else []
    items = []
    for skill in skills:
        missing = skill.get("missing", {}) if isinstance(skill.get("missing"), dict) else {}
        items.append(
            {
                "name": str(skill.get("name", "")),
                "label": f"{skill.get('emoji', '').strip()} {skill.get('name', '')}".strip(),
                "status": derive_skill_status(skill),
                "source": str(skill.get("source", "unknown")),
                "bundled": bool(skill.get("bundled")),
                "description": str(skill.get("description", "")),
                "homepage": str(skill.get("homepage", "")),
                "primary_env": str(skill.get("primaryEnv", "")),
                "missing_summary": summarize_skill_missing(missing),
            }
        )

    ready_count = sum(1 for item in items if item["status"] == "ready")
    setup_count = sum(1 for item in items if item["status"] == "needs setup")
    blocked_count = sum(1 for item in items if item["status"] in {"blocked", "disabled"})
    workspace_count = sum(1 for item in items if item["source"] == "openclaw-workspace")
    bundled_count = sum(1 for item in items if item["bundled"])

    summary_rows = [
        {"label": "Ready", "value": str(ready_count)},
        {"label": "Needs setup", "value": str(setup_count)},
        {"label": "Blocked or disabled", "value": str(blocked_count)},
        {"label": "Workspace skills", "value": str(workspace_count)},
        {"label": "Bundled skills", "value": str(bundled_count)},
    ]
    install_rows = [
        {"label": "Install command", "value": "openclaw skills install <slug>"},
        {
            "label": "Workspace",
            "value": inventory.get("workspaceDir", WORKSPACE_ROOT) if isinstance(inventory, dict) else WORKSPACE_ROOT,
        },
        {
            "label": "Managed dir",
            "value": inventory.get("managedSkillsDir", f"{OPENCLAW_ROOT}/skills") if isinstance(inventory, dict) else f"{OPENCLAW_ROOT}/skills",
        },
        {"label": "Install flow", "value": "This surface installs by slug, then refreshes the latest snapshot."},
    ]

    return {
        "summary": {
            "total": len(items),
            "ready": ready_count,
            "needs_setup": setup_count,
            "blocked": blocked_count,
        },
        "items": items,
        "summary_rows": summary_rows,
        "install_rows": install_rows,
    }


def build_identity_snapshot() -> dict:
    soul_raw = read_remote_file(SOUL_FILE)
    identity_raw = read_remote_file(IDENTITY_FILE)
    user_raw = read_remote_file(USER_FILE)
    memory_raw = read_remote_file(MEMORY_FILE)
    agents_raw = read_remote_file(AGENTS_FILE)

    items = [
        {
            "label": "Primeus identity",
            "summary": "Primeus is the executive support layer for this workspace.",
            "highlights": extract_section_bullets(identity_raw, "Role", limit=3),
        },
        {
            "label": "Andrew profile",
            "summary": "Andrew runs the VPS control plane and prefers concise, business-first updates.",
            "highlights": extract_section_bullets(user_raw, "Context", limit=3),
        },
        {
            "label": "Soul",
            "summary": first_meaningful_line(soul_raw),
            "highlights": extract_section_bullets(soul_raw, "Boundaries", limit=3),
        },
        {
            "label": "Operating memory",
            "summary": "Locked operating model and runtime topology for the shared VPS control plane.",
            "highlights": extract_section_bullets(memory_raw, "Locked Operating Model", limit=3)
            + extract_section_bullets(memory_raw, "Runtime Topology", limit=2),
        },
    ]

    doc_rows = [
        {"label": "SOUL.md", "value": "Voice and boundaries"},
        {"label": "IDENTITY.md", "value": "Primeus role split"},
        {"label": "USER.md", "value": "Andrew profile"},
        {"label": "MEMORY.md", "value": "Long-term operating model"},
        {"label": "AGENTS.md", "value": "Workspace startup rules"},
    ]

    rules = extract_section_bullets(memory_raw, "Communication Style", limit=3)
    if not rules:
        rules = extract_section_bullets(agents_raw, "Red Lines", limit=3)

    editors = [
        {
            "name": "SOUL.md",
            "label": "Soul",
            "summary": "Voice, boundaries, and non-negotiables.",
            "path": SOUL_FILE,
            "content": soul_raw,
            "base_hash": sha256_text(soul_raw),
        },
        {
            "name": "IDENTITY.md",
            "label": "Identity",
            "summary": "Primeus role split and operating stance.",
            "path": IDENTITY_FILE,
            "content": identity_raw,
            "base_hash": sha256_text(identity_raw),
        },
        {
            "name": "USER.md",
            "label": "User",
            "summary": "Andrew profile and operator context.",
            "path": USER_FILE,
            "content": user_raw,
            "base_hash": sha256_text(user_raw),
        },
        {
            "name": "MEMORY.md",
            "label": "Memory",
            "summary": "Locked operating model and long-term memory.",
            "path": MEMORY_FILE,
            "content": memory_raw,
            "base_hash": sha256_text(memory_raw),
        },
        {
            "name": "AGENTS.md",
            "label": "Agents",
            "summary": "Workspace startup rules and agent expectations.",
            "path": AGENTS_FILE,
            "content": agents_raw,
            "base_hash": sha256_text(agents_raw),
        },
    ]

    return {
        "items": items,
        "doc_rows": doc_rows,
        "rules": rules,
        "editors": editors,
    }


def build_audit_snapshot(
    *,
    room_events: list[dict[str, str]],
    room_event_total: int,
    build_raw: str,
    handoff_raw: str,
) -> dict:
    db = get_runtime_db_snapshot()
    summary_rows = [
        {"label": "Room events", "value": str(room_event_total)},
        {"label": "Thread states", "value": summarize_count_rows(db.get("thread_statuses", []))},
        {"label": "Escalations", "value": summarize_count_rows(db.get("escalation_statuses", []))},
        {"label": "Send attempts", "value": summarize_count_rows(db.get("send_attempts", []))},
    ]

    doc_rows = [
        {"label": "BUILD_STATUS.md", "value": line}
        for line in recent_log_lines(build_raw, limit=3)
    ] + [
        {"label": "CODEX_HANDOFF.md", "value": line}
        for line in recent_log_lines(handoff_raw, limit=3)
    ]

    return {
        "room_events": room_events[-10:],
        "runtime_events": db.get("recent_events", []),
        "summary_rows": summary_rows,
        "doc_rows": doc_rows,
    }


def parse_room_events(raw: str) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            payload = json.loads(line)
        except json.JSONDecodeError:
            continue
        items.append(
            {
                "ts": str(payload.get("ts", "")),
                "from": str(payload.get("from", "")),
                "to": str(payload.get("to", "")),
                "type": str(payload.get("type", "")),
                "topic": str(payload.get("topic", "")),
                "status": str(payload.get("status", "")),
                "text": str(payload.get("text", "")),
            }
        )
    return items[-12:]


def count_room_events(raw: str) -> int:
    count = 0
    for line in raw.splitlines():
        if line.strip():
            count += 1
    return count


def parse_room_state(raw: str) -> dict[str, str]:
    mapping = {
        "current topic": "current_topic",
        "current owner": "current_owner",
        "status": "status",
        "last action": "last_action",
        "needs boss": "needs_boss",
    }
    state = {
        "current_topic": "unknown",
        "current_owner": "unknown",
        "status": "unknown",
        "last_action": "No room state found.",
        "needs_boss": "No explicit boss action requested.",
    }
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        normalized = key.strip().lower().lstrip("-# ").strip()
        target = mapping.get(normalized)
        if target:
            state[target] = value.strip() or state[target]
    return state


def summarize_markdown(raw: str) -> str:
    for stop_heading in ("## Executive summary", "## Boss-approved operating model"):
        if stop_heading in raw:
            raw = raw.split(stop_heading, 1)[0]
            break

    sections: list[tuple[str, list[str]]] = []
    current_heading = ""
    current_lines: list[str] = []
    for line in raw.splitlines():
        stripped = line.strip()
        if stripped.startswith("## "):
            if current_heading or current_lines:
                sections.append((current_heading, current_lines))
            current_heading = stripped[3:].strip()
            current_lines = []
            continue
        current_lines.append(stripped)
    if current_heading or current_lines:
        sections.append((current_heading, current_lines))

    for heading, lines in reversed(sections):
        bullets = [line[2:].strip() for line in lines if line.startswith("- ")]
        if heading and bullets:
            return f"{heading}: {bullets[0]}"
        if heading:
            prose = [line for line in lines if line and not line.startswith("#")]
            if prose:
                return f"{heading}: {prose[0]}"

    for line in raw.splitlines():
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            return stripped
    return "No summary available."


def get_helper_status() -> dict[str, str]:
    result = run_remote(
        f"test -x {shell_quote(ROOM_HELPER_DIR + '/append_room_event.py')} "
        f"&& test -x {shell_quote(ROOM_HELPER_DIR + '/update_room_state.py')} "
        "&& printf 'ready' || printf 'missing'"
    )
    return {
        "dir": ROOM_HELPER_DIR,
        "status": result.stdout.strip() or "unknown",
    }


def shell_quote(value: str) -> str:
    return "'" + value.replace("'", "'\"'\"'") + "'"


def sha256_text(value: str) -> str:
    return sha256(value.encode("utf-8")).hexdigest()


def title_case(value: str) -> str:
    return " ".join(
        part[:1].upper() + part[1:]
        for part in str(value or "").split()
        if part
    )


def main() -> int:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    generated_at = datetime.now().astimezone().replace(microsecond=0).isoformat()

    room_raw = read_remote_file(ROOM_FILE)
    room_state_raw = read_remote_file(ROOM_STATE_FILE)
    build_raw = read_remote_file(BUILD_STATUS_FILE)
    handoff_raw = read_remote_file(CODEX_HANDOFF_FILE)

    room_events = parse_room_events(room_raw)
    room_meta = {
        "event_count": count_room_events(room_raw),
        "latest_event_ts": room_events[-1]["ts"] if room_events else "",
        "helper_status": get_helper_status(),
    }
    services = get_service_statuses()
    runtime_detail = build_runtime_snapshot(services=services)
    snapshot = {
        "generated_at": generated_at,
        "snapshot_status": "ready",
        "source": "vps",
        "sync_error": "",
        "stale": False,
        "room_state": parse_room_state(room_state_raw),
        "room_meta": room_meta,
        "runtime": {
            "recommended_mode": str((((runtime_detail or {}).get("health") or {}).get("recommended_mode")) or "unknown"),
            "services": services,
            "detail": runtime_detail,
        },
        "agents": build_agents_snapshot(services=services, room_meta=room_meta),
        "reports": build_reports_snapshot(runtime_detail=runtime_detail),
        "integrations": build_integrations_snapshot(services=services),
        "skills": build_skills_snapshot(),
        "identity": build_identity_snapshot(),
        "audit": build_audit_snapshot(
            room_events=room_events,
            room_event_total=room_meta["event_count"],
            build_raw=build_raw,
            handoff_raw=handoff_raw,
        ),
        "room_events": room_events,
        "docs": {
            "build_status_summary": summarize_markdown(build_raw),
            "codex_handoff_summary": summarize_markdown(handoff_raw),
        },
    }

    (DATA_DIR / "dashboard.json").write_text(
        json.dumps(snapshot, ensure_ascii=True, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {(DATA_DIR / 'dashboard.json')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
