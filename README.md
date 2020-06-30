# DARKERcord ;]
Making the discord dark theme even darker.

**NOTE:** This does fuck with the light theme. If you intend to use light theme, you must uninstall it first

**NOTE:** This only works for the desktop app. I did not [and will not] make an extension due to ToS and security issues.

# FEATURES ;]
- A darker Discord!
- You can now collapse channels
- Removes most of the green/blurple and puts turqiose/cyan instead [nitro colors remain unchanged on purpose]
  - *Some elements are colored directly, I am working on a way to detect these elements.
- Tripple tapping an emoji will open the emoji source

# INSTALLATION ;]
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.
*Check if your version is up to date: [Releases](/VoxelPrismatic/darkercord/releases/)
### Windows
*You may also run `script/inst-win.bat`
1. Copy these files into `%APPDATA\discord\`
2. Go into `%APPDATA%\discord\0.0.306\modules\discord_utils\`
3. Append the following line to the file `index.js`:
```js
require("../../../newjs.js");
```
4. Restart Discord

### Linux
*You may also run `script/inst-linux.sh`
1. Copy these files into `~/snap/discord/current/`
2. Go into `~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/`
3. Append the following line to the file `index.js`:
```js
require("../../../../../newjs.js");
```
4. Restart Discord

### macOS
*Unknown as of yet.

# UNINSTALLATION ;\[
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.
### Windows
*You may also run `script/rem-win.bat`
1. Go into `%APPDATA%\discord\0.0.306\modules\discord_utils\`
2. Remove the following line from the file `index.js`:
```js
require("../../../newjs.js");
```
3. Restart Discord

### Linux
*You may also run `script/rem-linux.sh`
1. Go into `~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/`
2. Remove the following line from `index.js`:
```js
require("../../../../../newjs.js");
```
3. Restart Discord

### macOS
*Unknown as of yet.
