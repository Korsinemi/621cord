@echo off
title "Registering slash..."
call npm run register
cls
title "Running!"
echo NOTE: Slash commands registered using autorun
call npm start