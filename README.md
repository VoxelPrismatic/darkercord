# #] PRIZcord ;]
Making the discord dark theme even darker, with some cool colors too.

**NOTE:** This only works for the desktop app. I did not [and will not] make an extension due to ToS and security issues.

**NOTE:** The Linux version of PRIZcord is ***NOT*** compatible with APT/RPM/DNF/etc. Only SNAP.

*Also check out [Skeuocord](https://github.com/marda33/skeuocord), it works with PRIZcord too!*

<details>
  <summary>Screenshots [13]</summary>
  <h2><i>Normal icons:</i></h2>
  <img src="https://media.discordapp.net/attachments/569698278271090728/727590717009952908/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727590845817290773/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727591933517496452/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727592116011794522/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727593120664911902/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/727593369789792346/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/735951917418807436/unknown.png" width="32%">
  <h2><i>Square icons:</i></h2>
  <img src="https://media.discordapp.net/attachments/569698278271090728/735846902477881454/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/735951186989154426/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/615530864830578688/735845849254461480/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/735952050726371348/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/615530864830578688/735939104176341022/unknown.png" width="32%">
  <img src="https://media.discordapp.net/attachments/569698278271090728/735953307927052299/unknown.png" width="32%">
</details>

# #] Wait, isn't this against Discord's ToS?
Yes, but Discord doesn't actively hunt or ban people using BD and similar. Just don't do anything illegal
or do anything to get yourself reported, and you should be fine with this mod.

# #] Is this BetterDiscord/BandagedBD/etc compatible?
Not at all. I made this theme by hand, and you can see that my code will look nothing like other BD themes.
Also, I'd say my theme works even better because it supports Linux, whereas BD doesn't. However, you can use
most BD CSS files with PRIZcord, no scripts allowed [security risks ofc]. Feel free to take the CSS from here,
but I guarentee nothing. Do not complain to me about it.

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
  - Scroll down to "PRIZcord Settings" in the Discord settings panel!
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
- Square icons
  - These look great, try them

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
Just go to your app settings, and click on "Theming" under the "PRIZcord Settings" section.
All the theme options you need are there.

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
