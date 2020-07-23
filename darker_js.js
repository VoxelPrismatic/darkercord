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
var __version_number = "1.0";

window._$ = {
    c: (st, elem = document) => { return elem.getElementsByClassName(st); },
    i: (st, elem = document) => { return elem.getElementById(st); },
    n: (st, elem = document) => { return elem.getElementsByName(st); },

    t: (st, elem = document) => { return elem.getElementsByTagName(st); },
    tNS: (st, elem = document) => {return elem.getElementsByTagNameNS(st); },

    q: (st, elem = document) => { return elem.querySelector(st); },
    qALL: (st, elem = document) => { return elem.querySelectorAll(st); },

    tmr: {
        s: {
            o: (...args) => { return window.setTimeout(...args); },
            i: (...args) => { return window.setInterval(...args); },
            n: (...args) => { return window.setImmediate(...args); },
        },
        c: {
            o: (...args) => { return window.clearTimeout(...args); },
            i: (...args) => { return window.clearInterval(...args); },
            n: (...args) => { return window.clearImmediate(...args); },
        }
    }
}

/* -INIT- */

function required(mod_name) {
    __darker_modules[mod_name] = require(mod_name);
    return __darker_modules[mod_name];
}

window.__darker_modules = {
    __process__: process,
    __require__: required
}

var fs = required("fs");
var requests = required("request");

console.log("PRIZcord - Loading");
console.time("PRIZcord - Finished in");
var cwd = process.cwd();
var __darker_conf = {
    "load": true,
    "round": true,
    "clyde": true,
    "emoji": true,
    "collapse": true,
    "light": false,
    "hidden": false,
    "override_light": false,
    "ext_theme_file": "No file provided",
    "ext_theme_enabled": false,
    "ext_theme_override": false,
    "darker_color": "cyan",
};

function __write_settings() {
    fs.writeFileSync(dir + "darker_conf.json", JSON.stringify(__darker_conf), {flag: "w+"});
}

if(cwd.startsWith("C:\\"))
    var dir = cwd + "\\..\\..\\..\\Roaming\\discord\\";
else
    var dir = "./snap/discord/current/";
try {
    Object.assign(__darker_conf, JSON.parse(fs.readFileSync(dir + "darker_conf.json")));
} catch(err) {
    try {
        var loadcss = fs.readFileSync(dir + "loadcss.bool").trim() == "true";
    } catch(err) {
        var loadcss = true;
    }
    __darker_conf["load"] = loadcss;
}
__write_settings();
console.log(__darker_conf);

__channels_hidden = __darker_conf["hidden"];

function __clear_css(...ids) {
    for(var css of ids) {
        try {
            while(_$.i(css))
                _$.i(css).remove();
        } catch(err) {
        }
    }
}

function __add_css(file, id) {
    try {
        var newcss = fs.readFileSync(file);
    } catch(err) {
        var newcss = file;
    }
    var style = document.createElement("style");
    style.id = id;
    style.type = "text/css";
    style.innerHTML = newcss;
    document.head.appendChild(style);
    return style;
}

__add_css(dir + "darker_emotion.css", "__darker_emotion")

function __apply_settings() {
    __darker_conf = JSON.parse(fs.readFileSync(dir + "darker_conf.json"));
    if(__darker_conf["load"] && !(__darker_conf["light"] && !__darker_conf["override_light"])) {
        if(!_$.i("__darker_global"))
            __add_css(dir + "darker_css.css", "__darker_global");
        if(_$.i("__darker_theme"))
            if(_$.i("__darker_theme").getAttribute("data-theme") != __darker_conf)
                __clear_css("__darker_theme")
        if(!_$.i("__darker_theme")) {
            style = __add_css(
                dir + "darker_themes/darker_" + __darker_conf["darker_color"] + ".css",
                "__darker_theme"
            )
            style.setAttribute("data-theme", __darker_conf["darker_color"]);
        }
    } else {
        __clear_css("__darker_global", "__darker_theme");
    }

    if(!__darker_conf["round"]) {
        if(!_$.i("__darker_square")) {
            __add_css(dir + "darker_themes/darker_square.css", "__darker_square");
        }
    } else {
        __clear_css("__darker_square");
    }

    if(__darker_conf["ext_theme_enabled"]) {
        if(!_$.i("__darker_custom"))
            __add_css(__darker_conf["ext_theme_file"], "__darker_custom")
        if(__darker_conf["ext_theme_override"])
            __clear_css("__darker_global", "__darker_theme");
    } else {
        __clear_css("__darker_custom");
    }

    if(__darker_conf["clyde"])
        __clear_css("__hide_clyde");
    else if(!_$.i("__hide_clyde"))
        __add_css(`.localBot-GrCgVt { display: none !important }`, "__hide_clyde")
    __toggle_channels(false);
}


/* -Emoji stuff- */
function __listen_to_emoji_click(evt = null, force = false) {
    /* Finds all emojis and allows them to be clicked */

    // Get messages wrapper
    try {
        if(evt)
            target = evt.target;
        else
            target = _$.i("messages").parentElement;
    } catch(err) {
        return;
    }

    // Ignore dupes
    if(!force && __messages_length == target.children[0].children.length)
        return;
    __messages_length = target.children[0].children.length;

    // Update emojis
    var count = 0;
    for(var emoji of _$.c("emoji", target)) {
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
    __channel_button = _$.i("channelButton");

    // In case of channel change
    if(doit) {
        __channels_hidden = !__channels_hidden;
        __darker_conf["hidden"] = __channels_hidden;
        __write_settings();
    }
    try {
        if(!__darker_conf["collapse"]) {
            __channels_hidden = false
            __channel_button.classList.remove("clickable-3rdHwn")
        } else {
            __channel_button.classList.add("clickable-3rdHwn")
        }
    } catch(err) {
    }

    // Toggle visibilty
    try {
        if(__channels_hidden) {
            _$.c("sidebar-2K8pFh")[0].classList.add("invis");
            __channel_button.classList.remove("selected-1GqIat");
        } else {
            _$.c("sidebar-2K8pFh")[0].classList.remove("invis");
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
    for(var button of _$.c("iconWrapper-2OrFZ1 focusable-1YV_-H")) {
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
        button.classList.remove("clickable-3rdHwn");
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
        if(!_$.c("customContainer_NEW").length)
            _$.i("app-mount").children[0].outerHTML += `<div class="customContainer_NEW"></div>`; // Prevent crash
        _$.c("customContainer_NEW")[0].innerHTML = innerHTML;

        // Show the text
        window.setTimeout(() => {
            try {
                style = _$.i("thething").style;
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
            style = _$.i("thething").style;
            style.transform = "scale(0.9)";
            style.filter = "opacity(0)";
            window.setTimeout(
                () => _$.i("thething").outerHTML = "",
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
        _$.i("messages").parentElement.onscroll = __listen_to_emoji_click;
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
        ls = _$.i("channels").children;
    } catch(err) {
        try {
            ls = _$.i("private-channels").children;
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
    for(var guild of _$.c("listItem-2P_4kh")) {
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
    var info = _$.c("info-1VyQPT");
    if(!info.length)
        return;

    if(info[0].children.length == 3) {
        info[0].innerHTML += `<div class="colorMuted-HdFt4q size12-3cLvbJ">PRIZcord v${__version_number} by PRIZ ;]</div>`;
        var social = _$.c("socialLinks-3jqNFy")[0];
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
        _$.t("path", my_github)[0].outerHTML = `<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" class="foreground-26ym5y" style="transform:scale(1.2);"></path>`
    }
    var main = _$.c("contentColumn-2hrIYH contentColumnDefault-1VQkGM");
    main = main[main.length - 1].children[0];
    var buttons = _$.q("div[aria-label=\"USER_SETTINGS\"]");
    buttons = _$.c("item-PXvHYJ selected-3s45Ha themed-OHr7kt");
    var button = buttons.item(buttons.length - 1);
    var btn = button.parentElement.children.item(button.parentElement.childElementCount - 8);
    if(button != btn)
        return;
    if(!main.textContent.includes("PRIZcord Settings")) {
        var html = fs.readFileSync(dir + "darker_settings.html");
        html = (new DOMParser()).parseFromString(html, "text/html");
        for(var e of html.body.children)
            main.appendChild(e);
        var toggles = [
            "uid_DARKER_theme",
            "uid_DARKER_light",
            "uid_DARKER_round",
            "uid_DARKER_emoji",
            "uid_DARKER_collapse",
            "uid_DARKER_clyde",
            "uid_theme_enable",
            "uid_theme_override"
        ];
        for(var toggle of toggles) {
            toggle_elem = _$.i(toggle);
            toggle_elem.onclick = function() {__update_settings(this)};
            toggle_elem.checked = __darker_conf[toggle_elem.getAttribute("data-conf")];
            __update_settings(toggle_elem);
        }
        _$.i("value_theme_file").innerHTML = __darker_conf["ext_theme_file"].split("/").slice(-1)[0];
        _$.i("uid_theme_file").onclick = function() { __check_css_file(this); }
        _$.i("__check_for_darker_updates").onclick = __check_for_darker_updates;
        _$.i("restart_app__").onclick = () => {window.location = "discord.com"};
        for(var clicky of _$.i("theme_select").children) {
            clicky.onclick = function() {
                for(var e of _$.c("css-12o7ek3-option custom-select")) {
                    e.classList.remove("css-12o7ek3-option");
                    e.classList.add("css-1aymab5-option");
                }
                this.classList.remove("css-1aymab5-option");
                this.classList.add("css-12o7ek3-option");
                __darker_conf["darker_color"] = this.innerHTML.toLowerCase();
                __write_settings();
                _$.i("theme-reflect").innerHTML = this.innerHTML;
                __apply_settings();
            }
        }
        _$.i("theme-select-" + __darker_conf["darker_color"]).click();
    }
}

async function __check_css_file(elem) {
    var file = await globalThis.DiscordNative.fileManager.showOpenDialog();
    file = file[0];
    console.log(file)
    if(file == undefined) {
        _$.i("value_theme_file").innerHTML = "No file provided";
    } else if(!file.toLowerCase().endsWith(".css")) {
        _$.i("value_theme_file").innerHTML = "That wasn't a CSS file";
    } else {
        __darker_conf["ext_theme_file"] = file;
        _$.i("value_theme_file").innerHTML = file.split("/").slice(-1)[0];
        __write_settings();
        window.setTimeout(__apply_settings, 100);
        return;
    }
    window.setTimeout(() => _$.i("value_theme_file").innerHTML = __darker_conf["ext_theme_file"].split("/").slice(-1)[0], 2000);

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
    __write_settings();
    window.setTimeout(__apply_settings, 100);
}

function __fix_ui(evt) {
    /* Fixes more UI elements */
    __add_info(evt);
    if(!__darker_conf["load"])
        return;

    __details_ui();

    // Radio and multiselect buttons || (o) or [√]
    for(var button of _$.c("checked-3_4uQ9")) {
        if(button.className.includes("round-")) {
        } else {
            if(window.getComputedStyle(button).backgroundColor == "rgb(255, 255, 255)") {
                button.style.borderColor =
                    window.getComputedStyle(button.parentElement.parentElement).borderColor;
            }
        }
    }
    og_light = __darker_conf["light"];
    __darker_conf["light"] = document.documentElement.className.includes("theme-light");
    if(og_light != __darker_conf["light"]) {
        __write_settings();
        window.setTimeout(__apply_settings, 100);
    }
    __toggle_channels(false);

    // Double check
    if(evt)
        window.setTimeout(__fix_ui, 100);
}


/* Check for updates */
function __check_for_darker_updates() {
    var main = _$.i("app-mount");
    var html = fs.readFileSync(dir + "darker_update.html");
    html = (new DOMParser()).parseFromString(html, "text/html");
    _$.i("current_version__", html).innerHTML = __version_number;
    var resp = requests.get("https://github.com/VoxelPrismatic/prizcord/releases/latest", (e , resp , b) => {
        var version = resp.req.path.split("/tag/")[1];
        try {
            if(globalThis.view_spinner)
                return
        } catch(err) {
        }
        _$.i("latest_version__").innerHTML = version;
    });
    for(var e of html.body.children)
        main.appendChild(e);
    _$.i("releases_button__").onclick = () => {
        window.open('https://github.com/voxelprismatic/prizcord/releases/latest');
        __close_updates();
    }
    _$.i("__close_updates").onclick = __close_updates;
    window.setTimeout(() => {
        _$.i("__update_bg").style.opacity = "0.85";
        _$.i("__update_alert").style.opacity = "1";
        _$.i("__update_alert").style.transform = "scale(1.05)";
        window.setTimeout(() => _$.i("__update_alert").style.transform = "scale(1)", 100);
    }, 50);
}
function __close_updates() {
    _$.i("__update_bg").style.opacity = "0";
    _$.i("__update_alert").style.transform = "scale(0.7)";
    _$.i("__update_alert").style.opacity = "0";
    window.setTimeout(() => {_$.i("update_screen__").remove()}, 100);
}

function __details(elem) {
    elem.classList.toggle("css-2yldzf-control");
    elem.classList.toggle("css-1a8reka-control");
    elem.classList.toggle("wait");
    elem.classList.toggle("wait2");
    elem.nextElementSibling.classList.toggle("invis");
    elem.children[1].children[0].classList.toggle("css-1flfamv-indicatorContainer");
    elem.children[1].children[0].classList.toggle("css-12qlrak-indicatorContainer");
}

function __details_ui() {
    for(var elem of _$.c("css-1aymab5-option custom-select")) {
        elem.onmouseenter = function() {
            this.classList.toggle("css-1aymab5-option");
            this.classList.toggle("css-1gnr91b-option");
        }
        elem.onmouseleave = elem.onmouseenter;
    }
    for(var elem of _$.c("css-1a8reka-control custom-select")) {
        elem.onclick = function() {
            __details(this)
        }
    }
    for(var elem of _$.c("css-2yldzf-control custom-select")) {
        if(!elem.className.includes("wait")) {
            __details(elem);
            console.log(elem);
        }
    }
    for(var elem of _$.c("wait")) {
        if(elem.className.includes("wait2")) {
            elem.classList.remove("wait2");
        } else {
            elem.classList.remove("wait");
        }
    }
}

function maybe_hide_thing(elem) {
    message_id = elem.parentElement.parentElement.id;
    console.log(message_id);
    _$.q("span[role=\"button\"]", elem).click();
    elems = _$.qALL("#" + message_id);
    author = elems[elems.length - 1].__reactEventHandlers$.children[1].props.message.author.tag;
    _$.q("span[role=\"button\"]", elem).click();
    if(author == "")
        elem.parentElement.parentElement.classList.add("invis")
}

// Run script

if(__darker_conf["load"]) {
    window.setTimeout(__guild_listen, 1000);
    window.setTimeout(__fix_ui, 1000);
}

__apply_settings();

window.onclick = __fix_ui;
console.timeEnd("PRIZcord - Finished in");
