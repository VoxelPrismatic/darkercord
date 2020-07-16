/* ---------- DARKERcord ---------- *
 * By PRIZ ;]#9244                  *
 * View source on GitHub:           *
 *   VoxelPrismatic/darkercord      *
 *                                  *
 * No license, feel free to do      *
 * whatever you like with this code *
 * -------------------------------- */

/* -Set up vars- */
var __channels_hidden = false;
var __channel_button = null;
var __messages_length = 0;
var __emoji_timeout = 0;
var __emoji_clicked = null;
var __last_count = 0;
var __stop_guild_listen = false;
var __version_number = "0.7.1";

function $id(...a) {
    return document.getElementById(...a);
} function $cls(...a) {
    return document.getElementsByClassName(...a);
}

/* -INIT- */
var fs = require("fs");
try {
    var requests = require("request");
} catch(err) {
    console.warn("NODE.js doesn't have the `request' module. Loading via included copy");
    var requests = require("./request");
}

console.log("PRIZ ;] - Loading");
console.time("PRIZ ;] - Finished in");
var cwd = process.cwd();
var __darker_conf = {
    "load": true,
    "round": true,
    "clyde": true,
    "emoji": true,
    "collapse": true
};
if(cwd.startsWith("C:\\"))
    var dir = cwd + "\\..\\..\\..\\Roaming\\discord\\";
else
    var dir = "./snap/discord/current/";
try {
    __darker_conf = JSON.parse(fs.readFileSync(dir + "darker_conf.json"));
} catch(err) {
    try {
        var loadcss = fs.readFileSync(dir + "loadcss.bool").trim() == "true";
    } catch(err) {
        var loadcss = true
    }
    fs.writeFileSync(dir + "darker_conf.json", JSON.stringify(__darker_conf), {flag: "w+"})
}

console.log(__darker_conf);
function __apply_settings() {
    __darker_conf = JSON.parse(fs.readFileSync(dir + "darker_conf.json"));
    if(__darker_conf["load"]) {
        if(!$id("__darker_theme")) {
            var newcss = fs.readFileSync(dir + "darker_css.css");
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = "__darker_theme";
            style.innerHTML = newcss;
            document.head.appendChild(style);
        }
    } else {
        try {
            while($id("__darker_theme"))
                $id("__darker_theme").remove();
        } catch(err) {
        }
    }

    if(__darker_conf["clyde"]) {
        try {
            while($id("__hide_clyde"))
                $id("__hide_clyde").remove();
        } catch(err) {
        }
    } else {
        if($id("__hide_clyde")) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = "__hide_clyde";
            style.innerHTML = `.localBot-GrCgVt { display: none !important }`;
            document.head.appendChild(style);
        }
    }
    __toggle_channels(false);
}

__apply_settings();

/* -Emoji stuff- */
function __listen_to_emoji_click(evt = null, force = false) {
    /* Finds all emojis and allows them to be clicked */

    // Get messages wrapper
    try {
        if(evt)
            target = evt.target;
        else
            target = $id("messages").parentElement;
    } catch(err) {
        return;
    }

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
    if(!__darker_conf["emoji"])
        return
    // Count
    if(__emoji_timeout < 0 || __emoji_timeout >= 3)
        __emoji_timeout = 0
    if(__emoji_clicked != elem) {
        __emoji_clicked = elem;
        __emoji_timeout = 0;
    }
    __emoji_timeout += 1

    // Open
    if(__emoji_timeout == 3)
        window.open(elem.src);
    window.setTimeout(() => __emoji_timeout -= 1, 1000)
}

/* -Channel stuff-*/
function __toggle_channels(doit = true) {
    /* Toggles channel list visibilty */
    __channel_button = $id("channelButton");

    // In case of channel change
    if(doit)
        __channels_hidden = !__channels_hidden;
    try {
        if(!__darker_conf["collapse"]) {
            __channels_hidden = false
            __channel_button.classList.remove("clickable-3rdHwn")
        } else {
            __channel_button.classList.add("clickable-3rdHwn")
        }
    } catch(err) {
        console.error(err);
    }

    // Toggle visibilty
    try {
        if(__channels_hidden) {
            $cls("sidebar-2K8pFh")[0].classList.add("invis");
            __channel_button.classList.remove("selected-1GqIat");
        } else {
            $cls("sidebar-2K8pFh")[0].classList.remove("invis");
            __channel_button.classList.add("selected-1GqIat");
        }
    } catch(err) {
        if(!__darker_conf["collapse"])
            window.setTimeout(() => {
                __guild_listen();
                __channel_listen();
                __toggle_channels(false);
            }, 500);
    }
}
function __listen_to_channel_change() {
    /* Finds all channels and allows them to fix the button */

    // Find channel icon
    for(var button of $cls("iconWrapper-2OrFZ1 focusable-1YV_-H")) {
        if(button.className == "iconWrapper-2OrFZ1 focusable-1YV_-H" && button.getAttribute("aria-label") != "Help")
            break
    }
    if(button.getAttribute("aria-label") == "Help")
        return

    // Update the button to actually be a button
    globalThis.__channel_button = button;
    if(__darker_conf["collapse"])
        button.classList.add("clickable-3rdHwn");
    else
        button.classList.remove("clickable-3rdHwn")
    button.id = "channelButton";
    button.onmouseenter = () => {
        if(!__darker_conf["collapse"])
            return
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
        if(!$cls("customContainer_NEW").length)
            $id("app-mount").children[0].outerHTML += `<div class="customContainer_NEW"></div>`; // Prevent crash
        $cls("customContainer_NEW")[0].innerHTML = innerHTML;

        // Show the text
        window.setTimeout(() => {
            try {
                style = $id("thething").style;
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
            style = $id("thething").style;
            style.transform = "scale(0.9)";
            style.filter = "opacity(0)";
            window.setTimeout(
                () => $id("thething").outerHTML = "",
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
        $id("messages").parentElement.onscroll = __listen_to_emoji_click;
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
        ls = $id("channels").children;
    } catch(err) {
        try {
            ls = $id("private-channels").children;
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
    for(var guild of $cls("listItem-2P_4kh")) {
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

function __add_info(evt) {
    // Add info in settings
    var info = $cls("info-1VyQPT");
    if(!info.length)
        return;

    if(info[0].children.length == 3) {
        info[0].innerHTML += `<div class="colorMuted-HdFt4q size12-3cLvbJ">DARKERcord v${__version_number} by PRIZ ;]</div>`;
        var social = $cls("socialLinks-3jqNFy")[0];
        social.appendChild(document.createElement("br"));
        var my_twitter = social.children[0].cloneNode();
        my_twitter.innerHTML = social.children[0].innerHTML;
        my_twitter.title = "@VoxelPrismatic's Twitter"
        my_twitter.href = "https://twitter.com/voxelprismatic";
        social.appendChild(my_twitter);
        my_github = my_twitter.cloneNode();
        my_github.innerHTML = social.children[0].innerHTML;
        my_github.title = "PRIZ ;]'s GitHub"
        my_github.style.paddingTop = "8px"
        my_github.style.display = "inline-block";
        my_github.children[0].style.height = "20px";
        my_github.href = "https://github.com/voxelprismatic"
        social.appendChild(my_github);
        my_github.getElementsByTagName("path")[0].outerHTML = `<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" class="foreground-26ym5y" style="transform:scale(1.2);"></path>`
    }
    var buttons = $cls("item-PXvHYJ selected-3s45Ha themed-OHr7kt");
    var button = buttons.item(buttons.length - 1);
    var btn = button.parentElement.children.item(button.parentElement.childElementCount - 8);
    if(button != btn)
        return;
    var main = $cls("contentColumn-2hrIYH contentColumnDefault-1VQkGM")[0].children[0];
    if(!main.textContent.includes("DARKERcord Settings")) {
        var html = fs.readFileSync(dir + "darker_settings.html");
        html = (new DOMParser()).parseFromString(html, "text/html");
        for(var e of html.body.children)
            main.appendChild(e);
        var toggles = [
            "uid_DARKER_theme",
            "uid_DARKER_round",
            "uid_DARKER_emoji",
            "uid_DARKER_collapse",
            "uid_DARKER_clyde",
        ];
        for(var toggle of toggles) {
            toggle_elem = $id(toggle);
            toggle_elem.onclick = function() {__update_settings(this)};
            toggle_elem.checked = __darker_conf[toggle_elem.getAttribute("data-conf")];
            __update_settings(toggle_elem);
        }
        $id("__check_for_darker_updates").onclick = __check_for_darker_updates;
        $id("restart_app__").onclick = () => {window.location = "discord.com"};
    }
}

function __update_settings(elem) {
    if(elem.checked) {
        elem.parentElement.classList.remove("valueUnchecked-2lU_20");
        elem.parentElement.classList.add("valueChecked-m-4IJZ");
    } else {
        elem.parentElement.classList.remove("valueChecked-m-4IJZ");
        elem.parentElement.classList.add("valueUnchecked-2lU_20");
    }
    __darker_conf[elem.getAttribute("data-conf")] = elem.checked;
    fs.writeFileSync(dir + "darker_conf.json", JSON.stringify(__darker_conf), {flag: "w+"});
    window.setTimeout(__apply_settings, 100);
}

function __fix_ui(evt) {
    /* Fixes more UI elements */
    __add_info(evt);
    if(!__darker_conf["load"])
        return;
    // Fix wide toggles || [(o) Option                ]
    for(var button of $cls("item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx")) {
        if(button.style.borderColor == "rgb(114, 137, 218)") {
            button.style.borderColor = "#4aa";
            button.style.backgroundColor = "#4aa";
        }
    }

    // Radio and multiselect buttons || (o) or [√]
    for(var button of $cls("checked-3_4uQ9")) {
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

    __toggle_channels(false);

    // Double check
    if(evt)
        window.setTimeout(__fix_ui, 100);
}


/* Check for updates */
function __check_for_darker_updates() {
    var main = $id("app-mount");
    var html = fs.readFileSync(dir + "darker_update.html");
    html = (new DOMParser()).parseFromString(html, "text/html");
    html.getElementById("current_version__").innerHTML = __version_number;
    var resp = requests.get("https://github.com/VoxelPrismatic/darkercord/releases/latest", (e , resp , b) => {
        var version = resp.req.path.split("/tag/")[1];
        $id("latest_version__").innerHTML = version;
    });
    for(var e of html.body.children)
        main.appendChild(e);
    $id("releases_button__").onclick = () => {
        window.open('https://github.com/voxelprismatic/darkercord/releases/latest');
        __close_updates();
    }
    $id("__close_updates").onclick = __close_updates;
    window.setTimeout(() => {
        $id("__update_bg").style.opacity = "0.85";
        $id("__update_alert").style.opacity = "1";
        $id("__update_alert").style.transform = "scale(1.05)";
        window.setTimeout(() => $id("__update_alert").style.transform = "scale(1)", 100);
    }, 50);
}
function __close_updates() {
    $id("__update_bg").style.opacity = "0";
    $id("__update_alert").style.transform = "scale(0.7)";
    $id("__update_alert").style.opacity = "0";
    window.setTimeout(() => {$id("update_screen__").remove()}, 100);
}



// Run script

if(__darker_conf["load"]) {
    window.setTimeout(__guild_listen, 1000);
    window.setTimeout(__fix_ui, 1000);
}
window.onclick = __fix_ui;
console.timeEnd("PRIZ ;] - Finished in");
