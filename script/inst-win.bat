COPY ../newjs.js %APPDATA%\discord
COPY ../newcss.css %APPDATA%\discord
ECHO. >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
ECHO require^("../../../newjs.js"^); >> %APPDATA%\discord\0.0.306\modules\discord_utils\index.js
ECHO true > %APPDATA%\discord\loadcss.bool
ECHO DARKERcord installed
