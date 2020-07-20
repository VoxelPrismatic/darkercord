@ECHO off
TITLE PRIZcord
CALL :ESCAPE
CLS

ECHO %ESC%[94;1mInstalling PRIZcord...%ESC%[0m

SET "DISCORD=%APPDATA%\discord\"
SET "INDEXJS=%APPDATA%\discord\0.0.306\modules\discord_utils\index.js"

ECHO %ESC%[90m^> Copying files%ESC%[0m
COPY ..\darker_js.js %DISCORD% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 GOTO ERR
COPY ..\darker_css.css %DISCORD% > NUL 2> NUL
COPY ..\darker_settings.html %DISCORD% > NUL 2> NUL
COPY ..\darker_update.html %DISCORD% > NUL 2> NUL
COPY ..\darker_emotion.css %DISCORD% > NUL 2> NUL
MKDIR %DISCORD%darker_themes > NUL 2> NUL
XCOPY ..\darker_themes\* %DISCORD%darker_themes /E /Y > NUL 2> NUL

ECHO %ESC%[90m> Copying dependencies%ESC%[0m
COPY ..\node_stuff\package-lock.json %DISCORD% > NUL 2> NUL
MKDIR %DISCORD%node_modules > NUL 2> NUL
XCOPY ..\node_stuff\node_modules\* %DISCORD%node_modules /E /Y > NUL 2> NUL

ECHO %ESC%[90m> Setting up%ESC%[0m
COPY ..\index-backup.js %INDEXJS% > NUL 2> NUL
COPY %INDEXJS% %INDEXJS%.000 > NUL 2> NUL
ECHO. >> %INDEXJS%
ECHO require^("../../../darker_js.js"^); >> %INDEXJS%

TYPE %DISCORD%darker_js.js | FINDSTR /c:"__version_number = " > __DARKER_VERSION__.TXT
SET /P __DARKER_VERSION__=<__DARKER_VERSION__.TXT
SET "VNUM=%__DARKER_VERSION__:~24,-2%"
DEL __DARKER_VERSION__.TXT

ECHO %ESC%[94;1mPRIZcord v%VNUM% installed%ESC%[0m
PAUSE
EXIT

:ERR
ECHO %ESC%[41;30;1mYou aren't in the right folder, please run this script ./script folder%ESC%[0m
EXIT

:ESCAPE
FOR /F "tokens=1,2 delims=#" %%T IN ('"PROMPT #$H#$E# & @ECHO on & FOR %%E IN (1) DO REM"') DO (
  SET ESC=%%E
  EXIT /B 0
)
@ECHO off
