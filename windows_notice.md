# #] NOTICE FOR WINDOWS USERS
**This only applies for users updating from version 0.5 or earlier.**

**If you are running v0.6 or later, ignore this page**

As a Linux user, I cannot check if the installer works properly. If Discord fails to start up, don't worry, just read here.

1. You must navigate to `%APPDATA%\discord\0.0.306\modules\discord_utils\` and open the file called `index.js`.
2. Scroll to the bottom of the document
3. Delete the line `require("../../../newjs.js")`
4. Restart Discord.
    - If you are still experiencing issues, please install version 0.4.1 and let me know at [prizmdev@outlook.com](mailto:prizmdev@outlook.com)
