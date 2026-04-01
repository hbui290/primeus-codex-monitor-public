#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SESSION_NAME="primeus-codex-monitor"

if (screen -list 2>/dev/null || true) | grep -q "[.]${SESSION_NAME}[[:space:]]"; then
  screen -S "${SESSION_NAME}" -X quit
  sleep 1
  pkill -f "${ROOT_DIR}/scripts/control_server.py" || true
  echo "Agent Control stopped."
else
  echo "Agent Control is not running."
fi
