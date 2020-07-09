COPY ..\darker_js.js %APPDATA%\discord\
COPY ..\darker_css.css %APPDATA%\discord\
COPY ..\darker_settings.html %APPDATA%\discord\

IF (FIND "require(\"../../../newjs.js\")" %APPDATA%\discord\0.0.306\modules\discord_utils\index.js) GTR "" (
    ECHO Cleaning up after DARKERcord prior to v0.5
    FINDSTR /R /I /V "^$require(^"^.^./^.^./^.^./newjs^.js^")" %APPDATA%\discord\0.0.306\modules\discord_utils\index.js >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
)

COPY %APPDATA%\discord\0.0.306\modules\discord_utils\index.js %APPDATA%\discord\0.0.306\modules\discord_utils\index.js.000

IF (FIND "require(\"../../../darker_js.js\")" %APPDATA%\discord\0.0.306\modules\discord_utils\index.js) GTR "" (
    ECHO DARKERcord already installed
    ECHO NOTE: This installer cannot check for updates,
    ECHO To check for updates, please go to Discord Settings ^> OS Settings ^> Check for DARKERcord updates
) ELSE (
    ECHO. >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
    ECHO require^("../../../newjs.js"^); >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
    ECHO DARKERcord installed
)
PAUSE > NUL
