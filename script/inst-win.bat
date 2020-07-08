COPY ..\darker_js.js %APPDATA%\discord\
COPY ..\darker_css.css %APPDATA%\discord\
COPY ..\darker_settings.html %APPDATA%\discord\
COPY %APPDATA%\discord\0.0.306\modules\discord_utils\index.js %APPDATA%\discord\0.0.306\modules\discord_utils\index.js.000
ECHO. >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
ECHO require^("../../../newjs.js"^); >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
ECHO DARKERcord installed
