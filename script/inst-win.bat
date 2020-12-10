@ECHO off
TITLE PRIZcord

REM Get windows version, NT=10 means WIN10
FOR /F "tokens=4 delims=[]. " %%G IN ('ver') DO (
    SET NT_BUILD=%%G
)

CLS

CALL :BLUEBOLD & ECHO Installing PRIZcord... & CALL :CLR

IF EXIST "..\darker_js.js" (
    CALL :GREY & ECHO ^> Copying files & CALL :CLR
    COPY ..\darker_js.js %DISCORD% > NUL 2> NUL
    MKDIR %DISCORD%darker_themes > NUL 2> NUL
    XCOPY ..\darker_themes\* %DISCORD%darker_themes /E /Y > NUL 2> NUL
    MKDIR %DISCORD%darker_html > NUL 2> NUL
    XCOPY ..\darker_html\* %DISCORD%darker_html /E /Y > NUL 2> NUL
    MKDIR %DISCORD%darker_tray > NUL 2> NUL
    XCOPY ..\darker_tray\* %DISCORD%darker_tray /E /Y > NUL 2> NUL
) ELSE (
    CALL :REDINVBOLD & ECHO You aren't in the right folder, please run this script ./script folder & CALL :CLR
    PAUSE
    EXIT /B
)

SET "PWD=%CD%"

SET "DISCORDSTABLE=0"
SET "DISCORDCANARY=0"
SET "DISCORDPTB=0"

IF EXIST %APPDATA%\discord (
    SET "DISCORDSTABLE=1"
)
IF EXIST %APPDATA%\discordcanary (
    SET "DISCORDCANARY=1"
)
IF EXIST %APPDATA%\discordptb (
    SET "DISCORDPTB=1"
)

IF %DISCORDSTABLE% EQU 1 (
    IF %DISCORDCANARY% EQU 1 (
        COLOR 0B
        CALL :GREENGOLD & ECHO Multiple installations found & CALL :CLR
        IF %DISCORDPTB% EQU 1 (
            ECHO 1] Stable
            ECHO 2] Canary
            ECHO 3] PTB
            ECHO.
            CHOICE /C 123 /M Where do you want to install?
            IF %ERRORLEVEL% EQU 1 (
                SET "DISCORD=%APPDATA%\discord\"
                CALL :GREY & ECHO   ^> Installing to Stable & CALL :CLR
            ) ELSE IF %ERRORLEVEL% EQU 2 (
                SET "DISCORD=%APPDATA%\discordcanary\"
                CALL :GREY & ECHO   ^> Installing to Canary & CALL :CLR
            ) ELSE IF %ERRORLEVEL% EQU 3 (
                SET "DISCORD=%APPDATA%\discordptb\"
                CALL :GREY & ECHO   ^> Installing to PTB & CALL :CLR
            )
        ) ELSE (
            ECHO 1] Stable
            ECHO 2] Canary
            ECHO.
            CHOICE /C 12 /M Where do you want to install?
            IF %ERRORLEVEL% EQU 1 (
                SET "DISCORD=%APPDATA%\discord\"
                CALL :GREY & ECHO   ^> Installing to Stable & CALL :CLR
            ) ELSE IF %ERRORLEVEL% EQU 2 (
                SET "DISCORD=%APPDATA%\discordcanary\"
                CALL :GREY & ECHO   ^> Installing to Canary & CALL :CLR
            )
        )
    ) ELSE IF %DISCORDPTB% EQU 1 (
        ECHO 1] Stable
        ECHO 2] PTB
        ECHO.
        CHOICE /C 12 /M Where do you want to install?
        IF %ERRORLEVEL% EQU 1 (
            SET "DISCORD=%APPDATA%\discord\"
            CALL :GREY & ECHO   ^> Installing to Stable & CALL :CLR
        ) ELSE IF %ERRORLEVEL% EQU 2 (
            SET "DISCORD=%APPDATA%\discordptb\"
            CALL :GREY & ECHO   ^> Installing to PTB & CALL :CLR
        )
    ) ELSE (
        SET "DISCORD=%APPDATA%\discord\"
        CALL :GREY & ECHO   ^> Installing to Stable & CALL :CLR
    )
) ELSE (
    CALL :REDINVBOLD & ECHO Discord isn't installed & CALL :CLR
    EXIT /B
)

CD %DISCORD%\0.0.*
SET "INDEXJS=%CD%\modules\discord_utils\index.js"
CD %PWD%

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
IF %NT_BUILD% NEQ 10 (
    COLOR
)
EXIT /B

REM -- COLOR ESCAPING CODE --

:BLUEBOLD
IF %NT_BUILD% EQU 10 (
    ECHO [96;1m & CALL :MOVE
) ELSE (
    COLOR 0B
)
EXIT /B

:GREENBOLD
IF %NT_BUILD% EQU 10 (
    ECHO [92;1m & CALL :MOVE
) ELSE (
    COLOR 0a
)
EXIT /B

:GREY
IF %NT_BUILD% EQU 10 (
    ECHO [90m & CALL :MOVE
) ELSE (
    COLOR 08
)
EXIT /B

:CLR
IF %NT_BUILD% EQU 10 (
    ECHO [0m & CALL :MOVE
)
EXIT /B

:REDINVBOLD
IF %NT_BUILD% EQU 10 (
    ECHO [41;29;1m & CALL :MOVE
) ELSE (
    COLOR 04
)
EXIT /B

:MOVE
IF %NT_BUILD% EQU 10 (
    ECHO [2A
)
EXIT /B
