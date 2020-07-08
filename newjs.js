/* ---------- DARKERcord ---------- *
 * By PRIZ ;]#9244                  *
 * View source on GitHub:           *
 *   VoxelPrismatic/darkercord      *
 *                                  *
 * No license, feel free to do      *
 * whatever you like with this code *
 * -------------------------------- */

/* -INIT- */
var fs = require("fs");

console.log("PRIZ ;] - Loading");
console.time("PRIZ ;] - Finished in");
var cwd = process.cwd();
var loadcss = "true";
if(cwd.startsWith("C:\\"))
    var dir = cwd + "\\..\\..\\..\\Roaming\\discord\\";
else
    var dir = "./snap/discord/current/";
var newcss = fs.readFileSync(dir + "newcss.css");
try {
    var loadcss = fs.readFileSync(dir + "loadcss.bool");
} catch(err) {
    fs.writeFileSync(dir + "loadcss.bool", "true", {flag: "w+"})
}

if(loadcss.includes("true"))
    document.head.innerHTML += "<style type='text/css'>" + newcss + "</style>";

/* -Set up vars- */
var __channels_hidden = false;
var __channel_button = null;
var __messages_length = 0;
var __emoji_timeout = 0;
var __emoji_clicked = null;
var __last_count = 0;
var __stop_guild_listen = false;
var __version_number = "0.4.1";

/* -Emoji stuff- */
function __listen_to_emoji_click(evt = null, force = false) {
    /* Finds all emojis and allows them to be clicked */

    // Get messages wrapper
    if(evt)
        target = evt.target;
    else
        target = document.getElementById("messages").parentElement;

    // Ignore dupes
    if(!force && __messages_length == target.children[0].children.length)
        return;
    __messages_length = target.children[0].children.length;

    // Update emojis
    var count = 0;
    for(var emoji of target.getElementsByClassName("emoji")) {
        if(!emoji.onclick || emoji.onclick.toString() == "function Kn(){}")
            emoji.onclick = function () {__listen_emoji(this)};
        count += 1;
    }

    // Make sure no emojis were missed
    if(count == 0 || count != __last_count) {
        window.setTimeout(__listen_to_emoji_click, 100);
        __last_count = count;
    } else {
        __last_count = 0;
    }
}
function __listen_emoji(elem) {
    /* Called when said emoji was clicked */

    // Count
    if(__emoji_timeout < 0)
        __emoji_timeout = 0
    if(__emoji_clicked != elem) {
        __emoji_clicked = elem;
        __emoji_timeout = 0;
    }
    __emoji_timeout += 1

    // Open
    if(__emoji_timeout == 3)
        window.open(elem.src);
    window.setTimeout(() => globalThis.__emoji_timeout -= 1, 1000)
}

/* -Channel stuff-*/
function __toggle_channels(doit = true) {
    /* Toggles channel list visibilty */

    // In case of channel change
    if(doit)
        __channels_hidden = !__channels_hidden;

    __channel_button = document.getElementById("channelButton");

    // Toggle visibilty
    if(__channels_hidden) {
        document.getElementsByClassName("sidebar-2K8pFh")[0].classList.add("invis");
        __channel_button.classList.remove("selected-1GqIat");
    } else {
        document.getElementsByClassName("sidebar-2K8pFh")[0].classList.remove("invis");
        __channel_button.classList.add("selected-1GqIat");
    }
}
function __listen_to_channel_change() {
    /* Finds all channels and allows them to fix the button */

    // Find channel icon
    for(var button of document.getElementsByClassName("iconWrapper-2OrFZ1 focusable-1YV_-H")) {
        if(button.className == "iconWrapper-2OrFZ1 focusable-1YV_-H" && button.getAttribute("aria-label") != "Help")
            break
    }
    if(button.getAttribute("aria-label") == "Help")
        return

    // Update the button to actually be a button
    globalThis.__channel_button = button;
    button.classList.add("clickable-3rdHwn");
    button.id = "channelButton";
    button.onmouseenter = () => {
        var pos = button.getClientRects()[0];
        var x = pos["x"];
        x += pos["width"] / 2;
        x -= 50;
        var y = pos["bottom"];
        y += 8;
        // Make sure hover text is visible
        var innerHTML =
        `<div id="thething" class="layer-v9HyYc disabledPointerEvents-1ptgTB" style="position: absolute; left: ${x}px; top: ${y}px;">` +
        `<div class="tooltip-2QfLtc tooltipBottom-3ARrEK tooltipBlack-PPG47z tooltipDisablePointerEvents-3eaBGN" style="opacity: 1; transform: none;">` +
        `<div class="tooltipPointer-3ZfirK"></div><div class="tooltipContent-bqVLWK">Channel List</div></div></div>`;
        if(!document.getElementsByClassName("customContainer_NEW").length)
            document.getElementById("app-mount").children[0].outerHTML += `<div class="customContainer_NEW"></div>`; // Prevent crash
        document.getElementsByClassName("customContainer_NEW")[0].innerHTML = innerHTML;

        // Show the text
        window.setTimeout(() => {
            try {
                style = document.getElementById("thething").style;
                style.transform = "scale(1)";
                style.filter = "opacity(1)";
            } catch(err) {
                // Prevent crash
                console.error(err);
            }
        }, 50);
    }
    button.onmouseleave = () => {
        // Hide the text
        try {
            style = document.getElementById("thething").style;
            style.transform = "scale(0.9)";
            style.filter = "opacity(0)";
            window.setTimeout(
                () => document.getElementById("thething").outerHTML = "",
                50
            )
        } catch(err) {
            // Prevent crash
            console.error(err);
        }
    }
    button.onclick = __toggle_channels;
    __toggle_channels(false);
    try {
        __listen_to_emoji_click(null, true);
        document.getElementById("messages").parentElement.onscroll = __listen_to_emoji_click;
    } catch(err) {
        console.error(err);
    }
    __fix_ui();
}

function __channel_listen() {
    /* Fixes said button */
//     console.log("__channel_listen");
    __listen_to_channel_change();
    __listen_to_emoji_click(null, true);
    var count = 0;
    var ls;

    // Get messages or private messages
    try {
        ls = document.getElementById("channels").children;
    } catch(err) {
        try {
            ls = document.getElementById("private-channels").children;
        } catch(err) {
            console.error(err);
            return;
        }
    }

    // Update channels
    for(var channel of ls) {
        channel.onclick = () => {
            for(var x = 0; x <= 250; x += 50) {
                window.setTimeout(__listen_to_channel_change, x);
            }
        }
//         console.log(channel);
        count += 1;
    }

    // Make sure no channel is missed
    if(count == 0 || count != __last_count) {
        window.setTimeout(__channel_listen, 500);
        __last_count = count;
    } else {
        __listen_to_channel_change();
        __last_count = 0;
    }
}

/* -Guild stuff- */
function __listen_to_guild_change() {
    /* Fixes said button */

    __channel_listen();
    __toggle_channels(false);
}
function __guild_listen() {
    /* Find all guilds and allows them to fix the button */
    if(__stop_guild_listen)
        return;
//     console.log("__guild_listen");
    var count = 0;

    // Update guilds
    for(var guild of document.getElementsByClassName("listItem-2P_4kh")) {
        guild.onclick = () => {
            for(var x = 0; x <= 250; x += 50) {
                window.setTimeout(__listen_to_guild_change, x);
                window.setTimeout(__listen_to_channel_change, x);
            }
        }
//         console.log(guild);
        count += 1;
    }

    // Make sure no guild is missed
    if(count <= 3 || count != __last_count) {
        window.setTimeout(__guild_listen, 1000);
        __last_count = count;
    } else {
        __last_count = 0;
        __listen_to_guild_change();
        window.setTimeout(__listen_to_channel_change, 1000);
        __stop_guild_listen = true;
    }
}

/* -More UI fixing- */
function __fix_ui(evt) {
    /* Fixes more UI elements */

    // Fix wide toggles || [(o) Option                ]
    for(var button of document.getElementsByClassName("item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx")) {
        if(button.style.borderColor == "rgb(114, 137, 218)") {
            button.style.borderColor = "#4aa";
            button.style.backgroundColor = "#4aa";
        }
    }

    // Radio and multiselect buttons || (o) or [√]
    for(var button of document.getElementsByClassName("checked-3_4uQ9")) {
        if(button.className.includes("round-")) {
            button.style.backgroundColor = "#4aa";
            button.style.borderColor = "#4aa";
            button.getElementsByTagName("polyline")[0].setAttribute("stroke", "#aff");
        } else {
            if(window.getComputedStyle(button).backgroundColor == "rgb(255, 255, 255)") {
                button.style.borderColor =
                    window.getComputedStyle(button.parentElement.parentElement).borderColor;
            } else {
                button.style.backgroundColor = "#4aa";
                button.style.borderColor = "#4aa";
            }
        }
    }

    // Add info in settings
    var info = document.getElementsByClassName("info-1VyQPT");
    if(info.length == 1 && info[0].children.length == 3) {
        info[0].innerHTML += `<div class="colorMuted-HdFt4q size12-3cLvbJ">DARKERcord v${__version_number} by PRIZ ;]</div>`;
    }

    __toggle_channels(false);

    // Double check
    if(evt)
        window.setTimeout(__fix_ui, 100);
}


// Run script

if(loadcss.includes("true")) {
    window.onclick = __fix_ui;
    window.setTimeout(__guild_listen, 1000);
    window.setTimeout(__fix_ui, 1000);
}
console.timeEnd("PRIZ ;] - Finished in");
