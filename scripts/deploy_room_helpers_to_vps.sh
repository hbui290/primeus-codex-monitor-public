#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_TARGET="${PRIMEUS_MONITOR_REMOTE:-your-vps-host}"
REMOTE_DIR="${PRIMEUS_MONITOR_REMOTE_DIR:-/home/operator/.openclaw/workspace/scripts/primeus_codex_room}"

ssh "${REMOTE_TARGET}" "mkdir -p ${REMOTE_DIR}"
scp "${SCRIPT_DIR}/append_room_event.py" "${REMOTE_TARGET}:${REMOTE_DIR}/append_room_event.py"
scp "${SCRIPT_DIR}/update_room_state.py" "${REMOTE_TARGET}:${REMOTE_DIR}/update_room_state.py"
ssh "${REMOTE_TARGET}" "chmod +x ${REMOTE_DIR}/append_room_event.py ${REMOTE_DIR}/update_room_state.py"

echo "Deployed room helpers to ${REMOTE_TARGET}:${REMOTE_DIR}"
