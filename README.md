# #] DARKERcord ;]
Making the discord dark theme even darker.

**NOTE:** This does fuck with the light theme. If you intend to use light theme, you must uninstall it first

**NOTE:** This only works for the desktop app. I did not [and will not] make an extension due to ToS and security issues.

<details><summary>Screen shots [6]</summary>
<img src="https://media.discordapp.net/attachments/569698278271090728/727590717009952908/unknown.png">
<img src="https://media.discordapp.net/attachments/569698278271090728/727590845817290773/unknown.png">
<img src="https://media.discordapp.net/attachments/569698278271090728/727591933517496452/unknown.png">
<img src="https://media.discordapp.net/attachments/569698278271090728/727592116011794522/unknown.png">
<img src="https://media.discordapp.net/attachments/569698278271090728/727593120664911902/unknown.png">
<img src="https://media.discordapp.net/attachments/569698278271090728/727593369789792346/unknown.png">
</details>

# #] FEATURES ;]
- A darker Discord!
- You can now collapse channels
- Removes most of the green/blurple and puts turqiose/cyan instead [nitro colors remain unchanged on purpose]
  - *Some elements are colored directly, I am working on a way to detect these elements.
- Triple tapping an emoji will open the emoji source

# #] INSTALLATION ;]
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.
### Check version
Hit settings and scroll the left panel to the bottom. You should see `DARKERcord V# by PRIZ ;]`, where `#` is the version number.
Check if your version is up to date: [Releases](https://github.com/VoxelPrismatic/darkercord/releases/)

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
*I don't have a mac

# #] UNINSTALLATION ;\[
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.

*These scripts do not uninstall DARKERcord, but instead prevents the theme from loading.
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
*I don't have a mac
