# Primeus x Codex Monitor

This repo contains a snapshot-driven browser monitor with guarded admin actions for a Primeus x Codex workflow. The public version ships with sanitized sample data by default so the UI can be explored safely without a live VPS.

## What is included

- `index.html`, `styles.css`, `app.js`
  - the local control surface UI
- `data/dashboard.sample.json`
  - sanitized sample snapshot used by the public demo
- `data/action_audit.sample.jsonl`
  - sample audit trail for local actions
- `scripts/control_server.py`
  - serves the local dashboard and handles guarded write actions
- `scripts/sync_vps_snapshot.py`
  - optional live sync script for pulling a real VPS snapshot into `data/dashboard.json`
- `scripts/append_room_event.py`
  - appends a short event into a room JSONL file
- `scripts/update_room_state.py`
  - updates a room state markdown file
- `scripts/deploy_room_helpers_to_vps.sh`
  - optionally copies the helper scripts to a configured remote host

## What this app can do

- read the latest snapshot for room, runtime, reports, skills, identity, and audit
- refresh the snapshot on demand
- save config fields back to a configured VPS
- save identity files back to a configured VPS
- save agent control profiles back to a configured VPS
- restart supported runtime services
- install skills by slug on the VPS

This is not a full OpenClaw Control clone. It is a local snapshot-driven control surface with explicit write actions.

## Run the public-safe demo

Start the local monitor:

```bash
./scripts/run_local_monitor.sh
```

Stop the local monitor:

```bash
./scripts/stop_local_monitor.sh
```

Then open [http://localhost:4017/](http://localhost:4017/).

The public repo boots from `data/dashboard.sample.json` when no live `data/dashboard.json` exists.

## Connect a live VPS

The live sync script is opt-in. Set your own environment variables before running it:

```bash
export PRIMEUS_MONITOR_SSH_HOST="your-vps-host"
export PRIMEUS_MONITOR_SSH_USER="operator"
export PRIMEUS_MONITOR_SSH_KEY="$HOME/.ssh/id_ed25519"
python3 scripts/sync_vps_snapshot.py
```

Useful optional path overrides:

- `PRIMEUS_MONITOR_WORKSPACE_ROOT`
- `PRIMEUS_MONITOR_OPENCLAW_ROOT`
- `PRIMEUS_MONITOR_RUNTIME_ROOT`
- `PRIMEUS_MONITOR_DB_FILE`

If a live snapshot is written to `data/dashboard.json`, the UI will use that file instead of the sample file.

## Room helper scripts

Local demo usage:

```bash
python3 scripts/append_room_event.py \
  --from primeus \
  --to codex \
  --type task \
  --topic sample-review \
  --status open \
  --text "Review the sample workflow and summarize the next action."
```

```bash
python3 scripts/update_room_state.py \
  --topic sample-review \
  --owner codex \
  --status in_progress \
  --last-action "sample room update written" \
  --needs-boss none
```

Optional remote deployment:

```bash
export PRIMEUS_MONITOR_REMOTE="your-vps-host"
./scripts/deploy_room_helpers_to_vps.sh
```

You can also override:

- `PRIMEUS_MONITOR_REMOTE_DIR`
- `PRIMEUS_MONITOR_ROOM_FILE`
- `PRIMEUS_MONITOR_ROOM_STATE_FILE`

## V2 direction

The next architecture is documented in `CONTROL_PLANE_V2_ARCHITECTURE_SPEC.md`.

That spec defines how this project can evolve into a department-aware control plane with:

- Department Workspace
- Agent Workbench
- task, thread, and assignment objects
- first-class attachments
- collaboration, execution, and admin layers
