@echo off
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 (
  echo Python launcher not found. Ask someone to start a local HTTP server for this folder.
  pause
  exit /b 1
)
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5500/"
echo Your aaj. kitchen app is being served at http://localhost:5500/
echo Keep this window open while using aaj.
py -m http.server 5500
pause
