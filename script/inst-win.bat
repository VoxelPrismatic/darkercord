@ECHO off
COLOR 0B
CLS

ECHO Installing DARKERcord...

SET "DISCORD=%APPDATA%\discord\"
SET "INDEXJS=%APPDATA%\discord\0.0.306\modules\discord_utils\index.js"

ECHO ^> Copying files
COPY ..\darker_js.js %DISCORD%
COPY ..\darker_css.css %DISCORD%
COPY ..\darker_settings.html %DISCORD%
COPY ..\darker_update.html %DISCORD%

ECHO ^> Copying dependencies
COPY ..\node_stuff\package-lock.json %DISCORD%
MKDIR %APPDATA%\discord\node_modules
XCOPY ..\node_stuff\node_modules\* %DISCORD%node_modules /E

ECHO ^> Setting up
COPY ..\index-backup.js %INDEXJS%
COPY %INDEXJS% %INDEXJS%.000
ECHO. >> %INDEXJS%
ECHO require^("../../../darker_js.js"^); >> %INDEXJS%

ECHO DARKERcord installed
PAUSE
