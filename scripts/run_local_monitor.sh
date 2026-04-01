#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SESSION_NAME="primeus-codex-monitor"
LOG_FILE="${ROOT_DIR}/.monitor.log"
URL="http://localhost:4017/"

http_ok() {
  python3 - <<'PY' >/dev/null 2>&1
import urllib.request
try:
    with urllib.request.urlopen("http://localhost:4017/", timeout=5) as response:
        raise SystemExit(0 if response.status == 200 else 1)
except Exception:
    raise SystemExit(1)
PY
}

if (screen -list 2>/dev/null || true) | grep -q "[.]${SESSION_NAME}[[:space:]]"; then
  if http_ok; then
    echo "Agent Control is already running at ${URL}"
    echo "Screen session: ${SESSION_NAME}"
    echo "Log: ${LOG_FILE}"
    exit 0
  fi
  screen -S "${SESSION_NAME}" -X quit || true
  sleep 1
fi

rm -f "${LOG_FILE}"
screen -dmS "${SESSION_NAME}" /bin/zsh -lc "cd ${ROOT_DIR:q} && exec python3 ${ROOT_DIR:q}/scripts/control_server.py >> ${LOG_FILE:q} 2>&1"

sleep 2

if ! (screen -list 2>/dev/null || true) | grep -q "[.]${SESSION_NAME}[[:space:]]" || ! http_ok; then
  echo "Agent Control failed to start."
  tail -n 40 "${LOG_FILE}" 2>/dev/null || true
  exit 1
fi

echo "Agent Control is running at ${URL}"
echo "Screen session: ${SESSION_NAME}"
echo "Log: ${LOG_FILE}"
