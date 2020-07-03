# #] DARKERcord ;]
Making the discord dark theme even darker.

**NOTE:** This does fuck with the light theme. If you intend to use light theme, you must uninstall it first

**NOTE:** This only works for the desktop app. I did not [and will not] make an extension due to ToS and security issues.

<details>
  <summary>Screen shots [6]</summary>
  <img src="https://media.discordapp.net/attachments/569698278271090728/727590717009952908/unknown.png">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727590845817290773/unknown.png">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727591933517496452/unknown.png">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727592116011794522/unknown.png">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727593120664911902/unknown.png">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727593369789792346/unknown.png">
</details>

# #] Wait, isn't this against Discord's ToS?
Contrary to popular belief, it isn't. Discord states that the user is not allowed to mody the Service.
Service, in their terms, refers to the website and the app. That is why I cannot make any extension,
I am modifying the website. However, the app is the executable, I am modifying some assets that is used
by it. Really, only one file. On Linux, I am changing some settings because the file I'm changing is
under the `.config/` folder, aka configuration. 

# #] Is this BetterDiscord compatible?
Not at all. I made this theme by hand, and you can see that my code will look nothing like other BD themes.
Also, I'd say my theme works even better because it supports Linux, whereas BD doesn't. If you try this with
BD, you will have to modify the CSS first, and possible the JS.

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

# #] DARKERcord for macOS
I do not own a mac, and I will not pay an exorbitant amount for a machine I will use once and never again.
If you know how to run macOS on a VM, please let me know and provide a copy of macOS at [prizmdev@outlook.com](mailto:prizmdev@outlook.com).
