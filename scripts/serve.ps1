param(
  [int]$Port = 8000
)

if ($env:PORT) {
  try { $Port = [int]$env:PORT } catch {}
}

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Write-Host "Serving $Root at http://localhost:$Port"

function Start-Server($cmd) {
  Start-Process powershell -ArgumentList "-NoExit","-Command",$cmd | Out-Null
  Start-Sleep -Seconds 2
  Start-Process "http://localhost:$Port/" | Out-Null
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  Start-Server "python -m http.server $Port -d `"$Root`""
}
elseif (Get-Command py -ErrorAction SilentlyContinue) {
  Start-Server "py -m http.server $Port -d `"$Root`""
}
elseif (Get-Command npx -ErrorAction SilentlyContinue) {
  Start-Server "npx --yes serve -n -l $Port `"$Root`""
}
else {
  Write-Error "No Python or Node (npx) found. Install Python 3 or Node.js."
  exit 1
}
