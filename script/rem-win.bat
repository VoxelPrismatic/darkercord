@ECHO off
TITLE PRIZcord

REM Get windows version, NT=10 means WIN10
FOR /F "tokens=4 delims=[]. " %%G IN ('ver') DO (
    SET NT_BUILD=%%G
)

CLS

CALL :BLUEBOLD & ECHO Uninstalling PRIZcord... & CALL :CLR

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
            IF %ERRORLEVEL% 1 (
                COPY %APPDATA%\discord\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discord\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
            ) ELSE IF %ERRORLEVEL% 2 (
                COPY %APPDATA%\discordcanary\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discordcanary\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
            ) ELSE IF %ERRORLEVEL% 3 (
                COPY %APPDATA%\discordptb\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discordptb\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
            )
        ) ELSE (
            ECHO 1] Stable
            ECHO 2] Canary
            ECHO.
            CHOICE /C 12 /M Where do you want to install?
            IF %ERRORLEVEL% 1 (
                COPY %APPDATA%\discord\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discord\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
            ) ELSE IF %ERRORLEVEL% 2 (
                COPY %APPDATA%\discordcanary\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discordcanary\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
            )
        )
    ) ELSE IF %DISCORDPTB% EQU 1 (
        ECHO 1] Stable
        ECHO 2] PTB
        ECHO.
        CHOICE /C 12 /M Where do you want to install?
        IF %ERRORLEVEL% 1 (
            COPY %APPDATA%\discord\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discord\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
        ) ELSE IF %ERRORLEVEL% 2 (
            COPY %APPDATA%\discordptb\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discordptb\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
        )
    ) ELSE (
        COPY %APPDATA%\discord\0.0.*\modules\discord_utils\index.js.000 %APPDATA%\discord\0.0.*\modules\discord_utils\index.js > NUL 2> NUL
    )
)

CALL :BLUEBOLD & ECHO PRIZcord uninstalled ^;^[ & CALL :CLR
PAUSE
EXIT

REM -- COLOR ESCAPING CODE --

:BLUEBOLD
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [94;1m & CALL :MOVE
) ELSE (
    COLOR 0B
)
EXIT /B

:GREENBOLD
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [92;1m & CALL :MOVE
) ELSE (
    COLOR 0a
)
EXIT /B

:GREY
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [90m & CALL :MOVE
) ELSE (
    COLOR 08
)
EXIT /B

:CLR
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [0m & CALL :MOVE
)
EXIT /B

:REDINVBOLD
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [41;30;1m & CALL :MOVE
) ELSE (
    COLOR 04
)
EXIT /B

:MOVE
IF %NT_BUILD% EQU 10 (
    TYPE ESC.TXT & ECHO [4A
)
EXIT /B
