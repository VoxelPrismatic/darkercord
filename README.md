# DARKERcord ;]
Making the discord dark theme even darker.
**NOTE:** This does fuck with the light theme. If you intend to use light theme, you must uninstall it first

- [INSTALLATION ;\]](#INSTALLATION---)

# INSTALLATION ;]
### Windows
*Unknown as of yet.

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
### Windows
*Unknown as of yet.

### Linux
*You may also run `script/rem-linux.sh`
1. Go into `~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/`
2. Remove the following line from `index.js`:
```js
require("../../../../../newjs.js");
```
3. Restart Discord

###
