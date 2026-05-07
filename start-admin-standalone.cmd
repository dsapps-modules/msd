@echo off
cd /d "%~dp0admin"
set PORT=3000
set HOSTNAME=127.0.0.1
"C:\Program Files\nodejs\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3000
