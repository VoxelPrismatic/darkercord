@ECHO off
TITLE PRIZcord
CLS

TYPE ESC.TXT & ECHO [94;1mInstalling PRIZcord... & TYPE ESC.TXT & ECHO [0m

SET "DISCORD=%APPDATA%\discord\"
SET "INDEXJS=%APPDATA%\discord\0.0.307\modules\discord_utils\index.js"

TYPE ESC.TXT & ECHO [90m^> Copying files & TYPE ESC.TXT & ECHO [0m
COPY ..\darker_js.js %DISCORD% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 GOTO ERR
MKDIR %DISCORD%darker_themes > NUL 2> NUL
XCOPY ..\darker_themes\* %DISCORD%darker_themes /E /Y > NUL 2> NUL
MKDIR %DISCORD%darker_html > NUL 2> NUL
XCOPY ..\darker_html\* %DISCORD%darker_html /E /Y > NUL 2> NUL
MKDIR %DISCORD%darker_tray > NUL 2> NUL
XCOPY ..\darker_tray\* %DISCORD%darker_tray /E /Y > NUL 2> NUL

TYPE ESC.TXT & ECHO [90m^> Copying dependencies & TYPE ESC.TXT & ECHO [0m
COPY ..\node_stuff\package-lock.json %DISCORD% > NUL 2> NUL
MKDIR %DISCORD%node_modules > NUL 2> NUL
XCOPY ..\node_stuff\node_modules\* %DISCORD%node_modules /E /Y > NUL 2> NUL
TYPE ESC.TXT & ECHO [90m^> Setting up & TYPE ESC.TXT & ECHO [0m
COPY ..\index-backup.js %INDEXJS% > NUL 2> NUL
COPY %INDEXJS% %INDEXJS%.000 > NUL 2> NUL
ECHO. >> %INDEXJS%
ECHO require^("../../../darker_js.js"^); >> %INDEXJS%

TYPE %DISCORD%darker_js.js | FINDSTR /c:"__version_number = " > __DARKER_VERSION__.TXT
SET /P __DARKER_VERSION__=<__DARKER_VERSION__.TXT
SET "VNUM=%__DARKER_VERSION__:~24,-2%"
DEL __DARKER_VERSION__.TXT

TYPE ESC.TXT & ECHO [94;1mPRIZcord v%VNUM% installed & TYPE ESC.TXT & ECHO [0m
PAUSE
EXIT

:ERR
ECHO %ESC%[41;30;1mYou aren't in the right folder, please run this script ./script folder%ESC%[0m
EXIT
