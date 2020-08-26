@ECHO off
TITLE PRIZcord

FOR /F "tokens=4 delims=[]. " %%G IN ('ver') DO (
    SET NT_BUILD=%%G
)
IF %NT_BUILD% EQU 10 (
    INST-WIN10.BAT
    EXIT
)
COLOR 0B
CLS

ECHO Installing PRIZcord...

SET "DISCORD=%APPDATA%\discord\"
SET "INDEXJS=%APPDATA%\discord\0.0.307\modules\discord_utils\index.js"

COLOR 08
IF EXIST "..\darker_js.js" (
    ECHO ^> Copying files
    COPY ..\darker_js.js %DISCORD% > NUL 2> NUL
    MKDIR %DISCORD%darker_themes > NUL 2> NUL
    XCOPY ..\darker_themes\* %DISCORD%darker_themes /E /Y > NUL 2> NUL
    MKDIR %DISCORD%darker_html > NUL 2> NUL
    XCOPY ..\darker_html\* %DISCORD%darker_html /E /Y > NUL 2> NUL
    MKDIR %DISCORD%darker_tray > NUL 2> NUL
    XCOPY ..\darker_tray\* %DISCORD%darker_tray /E /Y > NUL 2> NUL
) ELSE (
    COLOR 04
    ECHO You aren't in the right folder, please run this script ./script folder
    EXIT
)

ECHO ^> Copying dependencies
COPY ..\node_stuff\package-lock.json %DISCORD% > NUL 2> NUL
MKDIR %DISCORD%node_modules > NUL 2> NUL
XCOPY ..\node_stuff\node_modules\* %DISCORD%node_modules /E /Y > NUL 2> NUL

ECHO ^> Setting up
COPY ..\index-backup.js %INDEXJS% > NUL 2> NUL
COPY %INDEXJS% %INDEXJS%.000 > NUL 2> NUL
ECHO. >> %INDEXJS%
ECHO require^("../../../darker_js.js"^); >> %INDEXJS%

TYPE %DISCORD%darker_js.js | FINDSTR /c:"__version_number = " > __DARKER_VERSION__.TXT
SET /P __DARKER_VERSION__=<__DARKER_VERSION__.TXT
SET "VNUM=%__DARKER_VERSION__:~24,-2%"
DEL __DARKER_VERSION__.TXT

COLOR 0B
ECHO PRIZcord v%VNUM% installed
PAUSE
EXIT
