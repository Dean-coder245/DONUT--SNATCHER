#!/usr/bin/env bash
set -euo pipefail

# Cross-platform local server for this project
# Usage:
#   PORT=9000 bash scripts/serve.sh   # optional port override

PORT="${PORT:-8000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "Serving ${ROOT_DIR} at http://localhost:${PORT}"
echo "Press Ctrl+C to stop."

serve_with_python3() { python3 -m http.server "${PORT}" --directory "${ROOT_DIR}"; }
serve_with_python()  { python  -m http.server "${PORT}" -d "${ROOT_DIR}"; }
serve_with_npx()     { npx --yes serve -n -l "${PORT}" "${ROOT_DIR}"; }

if command -v python3 >/dev/null 2>&1; then
  serve_with_python3 &
  PID=$!
elif command -v python >/dev/null 2>&1; then
  serve_with_python &
  PID=$!
elif command -v npx >/dev/null 2>&1; then
  serve_with_npx &
  PID=$!
else
  echo "No python3/python or Node (npx) found. Install Python 3 or Node.js to serve the site."
  exit 1
fi

trap 'kill $PID 2>/dev/null || true' INT TERM EXIT

# give the server a moment to start, then try opening the browser on Linux
sleep 1
if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "http://localhost:${PORT}/" >/dev/null 2>&1 || true
fi

wait $PID
