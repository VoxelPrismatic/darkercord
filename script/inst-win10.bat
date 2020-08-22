@ECHO off
TITLE PRIZcord
CLS

CALL :BLUEBOLD & ECHO Installing PRIZcord... & CALL :CLR

SET "DISCORD=%APPDATA%\discord\"
SET "INDEXJS=%APPDATA%\discord\0.0.307\modules\discord_utils\index.js"

CALL :GREY & ECHO ^> Copying files & CALL :CLR
COPY ..\darker_js.js %DISCORD% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 GOTO ERR
MKDIR %DISCORD%darker_themes > NUL 2> NUL
XCOPY ..\darker_themes\* %DISCORD%darker_themes /E /Y > NUL 2> NUL
MKDIR %DISCORD%darker_html > NUL 2> NUL
XCOPY ..\darker_html\* %DISCORD%darker_html /E /Y > NUL 2> NUL
MKDIR %DISCORD%darker_tray > NUL 2> NUL
XCOPY ..\darker_tray\* %DISCORD%darker_tray /E /Y > NUL 2> NUL

CALL :GREY & ECHO ^> Copying dependencies & CALL :CLR
COPY ..\node_stuff\package-lock.json %DISCORD% > NUL 2> NUL
MKDIR %DISCORD%node_modules > NUL 2> NUL
XCOPY ..\node_stuff\node_modules\* %DISCORD%node_modules /E /Y > NUL 2> NUL

CALL :GREY & ECHO ^> Setting up & CALL :CLR
COPY ..\index-backup.js %INDEXJS% > NUL 2> NUL
COPY %INDEXJS% %INDEXJS%.000 > NUL 2> NUL
ECHO. >> %INDEXJS%
ECHO require^("../../../darker_js.js"^); >> %INDEXJS%

TYPE %DISCORD%darker_js.js | FINDSTR /c:"__version_number = " > __DARKER_VERSION__.TXT
SET /P __DARKER_VERSION__=<__DARKER_VERSION__.TXT
SET "VNUM=%__DARKER_VERSION__:~24,-2%"
DEL __DARKER_VERSION__.TXT

CALL :BLUEBOLD & ECHO PRIZcord v%VNUM% installed & CALL :CLR
PAUSE
EXIT

:ERR
CALL :REDINVBOLD & ECHO You aren't in the right folder, please run this script ./script folder & CALL :CLR
EXIT


REM -- COLOR ESCAPING CODE --

:BLUEBOLD
TYPE ESC.TXT & ECHO [94;1m & CALL :MOVE
EXIT /B

:GREY
TYPE ESC.TXT & ECHO [90m & CALL :MOVE
EXIT /B

:CLR
TYPE ESC.TXT & ECHO [0m & CALL :MOVE
EXIT /B

:REDINVBOLD
TYPE ESC.TXT & ECHO [41;30;1m & CALL :MOVE
EXIT /B

:MOVE
TYPE ESC.TXT & ECHO [4A
EXIT /B
