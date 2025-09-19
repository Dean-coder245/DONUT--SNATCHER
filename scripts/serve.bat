@echo off
setlocal enabledelayedexpansion

rem Cross-platform local server for this project (Windows .bat)
rem Usage:
rem   set PORT=9000 && scripts\serve.bat    (optional port override)

set "PORT=%PORT%"
if "%PORT%"=="" set "PORT=8000"
set "ROOT_DIR=%~dp0.."
for %%I in ("%ROOT_DIR%") do set "ROOT_DIR=%%~fI"

echo Serving "%ROOT_DIR%" at http://localhost:%PORT%
echo Press Ctrl+C in the server window to stop.

where python >nul 2>nul
if %ERRORLEVEL%==0 goto :use_python

where py >nul 2>nul
if %ERRORLEVEL%==0 goto :use_py

where npx >nul 2>nul
if %ERRORLEVEL%==0 goto :use_npx

echo No Python or Node (npx) found. Please install Python 3 or Node.js.
exit /b 1

:use_python
start "" cmd /c python -m http.server %PORT% -d "%ROOT_DIR%"
timeout /t 2 >nul
start "" "http://localhost:%PORT%/"
goto :eof

:use_py
start "" cmd /c py -m http.server %PORT% -d "%ROOT_DIR%"
timeout /t 2 >nul
start "" "http://localhost:%PORT%/"
goto :eof

:use_npx
start "" cmd /c npx --yes serve -n -l %PORT% "%ROOT_DIR%"
timeout /t 2 >nul
start "" "http://localhost:%PORT%/"
goto :eof
