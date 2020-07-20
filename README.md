# #] PRIZcord ;]
Making the discord dark theme even darker, with some cool colors too.

**NOTE:** This only works for the desktop app. I did not [and will not] make an extension due to ToS and security issues.

*Also check out [Skeuocord](https://github.com/marda33/skeuocord), it works with PRIZcord too!*

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
Yes, but Discord doesn't actively hunt or ban people using BD and similar. Just don't do anything illegal
or do anything to get yourself reported, and you should be fine with this mod.

# #] Is this BetterDiscord compatible?
Not at all. I made this theme by hand, and you can see that my code will look nothing like other BD themes.
Also, I'd say my theme works even better because it supports Linux, whereas BD doesn't. However, you can use
most BD CSS files with PRIZcord, no scripts allowed [security risks ofc].

# #] FEATURES ;]
- Darker theme
  - Ofc, you want one brighter! /s
- Collapse channels
- More cyan
  - Green and blurple aren't doing it for me, lets switch it to cyan/turquoise!
- Triple tap emoji
  - Ever wanted to download the emoji source? Just triple click on any emoji!
- Hide Clyde
- Check for updates
- Intuitive settings
  - Discord Settings > OS Settings
- Not intensive
  - This theme doesn't need too much power to run, but keep in mind that it is more
  intensive than Discord itself
- Not intrusive
  - You can easily turn this theme off and other parts of it, and if you want to try
  the light theme, it'll automatically disable the darker theme [and it'll turn it back
  on once you leave light theme]
- Stand alone
  - Unlike BD, this works without any application. Just run the install script and it'll
  install the files. All necessary modules are included just in case your PC doesn't have
  them [no, discord doesnt come with this addon]
- Seamless
  - I try my best to make sure all the animations are as close as possible to what Discord
  already has, making the experience seamless
- Customizable
  - You can upload your own themes

# #] INSTALLATION ;]
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.

### Update PRIZcord
You can use the update checker in the PRIZcord settings panel. To update, download the
release provided and run the corrosponding script. Alternatively, you may just update the
files as specified below.

### Windows
*You may also run `script/inst-win.bat`
1. Copy these files into `%APPDATA\discord\`
2. Go into `%APPDATA%\discord\0.0.306\modules\discord_utils\`
3. Append the following line to the file `index.js`:
```js
require("../../../darker_js.js");
```
4. Restart Discord

### Linux
*You may also run `script/inst-linux.sh`
1. Copy these files into `~/snap/discord/current/`
2. Go into `~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/`
3. Append the following line to the file `index.js`:
```js
require("../../../../../darker_js.js");
```
4. Restart Discord

### macOS
*I don't have a mac

# #] TURN IT OFF ;|
Just go to your app settings, and click on the corrosponding button to change PRIZcord's settings

"**Linux** Settings", "**Windows** Settings", "**Mac** Settings"

*I don't have a mac, don't quote me on that last one.

# #] UNINSTALLATION ;\[
*Any scripts require you to download the ZIP archive of the repo. Please extract it too.

### Windows
*You may also run `script/rem-win.bat`
1. Go into `%APPDATA%\discord\0.0.306\modules\discord_utils\`
2. Remove the following line from the file `index.js`:
```js
require("../../../darker_js.js");
```
3. Restart Discord

### Linux
*You may also run `script/rem-linux.sh`
1. Go into `~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/`
2. Remove the following line from `index.js`:
```js
require("../../../../../darker_js.js");
```
3. Restart Discord

### macOS
*I don't have a mac

# #] DARKERcord for macOS
I do not own a mac, and I will not pay an exorbitant amount for a machine I will use once and never again.
If you know how to run macOS on a VM, please let me know how at [prizmdev@outlook.com](mailto:prizmdev@outlook.com).
