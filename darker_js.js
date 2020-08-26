/* ---------- DARKERcord ---------- *
 * By PRIZ ;]#9244                  *
 * View source on GitHub:           *
 *   VoxelPrismatic/darkercord      *
 *                                  *
 * No license, feel free to do      *
 * whatever you like with this code *
 * -------------------------------- */

console.log("PRIZcord - Loading");
___timer___ = new Date();
console.time("PRIZcord - Finished in");

/* -Set up vars- */
var __channels_hidden = false;
var __channel_button = null;
var __messages_length = 0;
var __emoji_timeout = 0;
var __emoji_clicked = null;
var __last_count = 0;
var __stop_guild_listen = false;
var __version_number = "2.4";

var __darker_modules = {
    __process__: process,
    __require__: required
}

__epilepsy_timer = 0

var __darker_conf = {
    "load": true,
    "square": false,
    "square_status": true,
    "square_vc": true,
    "square_toggle": true,
    "full_embed": false,
    "clyde": true,
    "emoji": true,
    "collapse": true,
    "light": false,
    "hidden": false,
    "override_light": false,
    "ext_theme_file": "No file provided",
    "ext_theme_enabled": false,
    "ext_theme_override": false,
    "ext_theme_refresh": false,
    "darker_color": "cyan",
    "tray": true
};

_$ = {
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
    },

    html: (file) => { return (new DOMParser()).parseFromString(fs.readFileSync(file), "text/html"); },

    tok: {
        tog: (ls, ...toks) => { for(var tok of toks) { ls.toggle(tok); } },
        have: (ls, tok, cond) => { if(cond) { ls.add(tok); } else { ls.remove(tok); } },
        have_multi: (ls, cond, tok_add, tok_rem) => {
            for(var tok of tok_add) { _$.tok.have(ls, tok, cond); }
            for(var tok of tok_rem) { _$.tok.have(ls, tok, !cond); }
        }
    },

    nth: {
        child: (root, ...nths) => {
            elem = root;
            for(var nth of nths) {
                if(nth < 0)
                    elem = _$.nth.parent(elem, Math.abs(nth));
                else
                    elem = elem.children[nth];
            };
            return elem;
        },
        parent: (root, nths) => { elem = root; for(nth of Array(nths)) { elem = elem.parentElement; }; return elem; },
        list: (root, ...nths) => { return _$.nth.child(root, ...nths).children; },

        dn: (...args) => { return _$.nth.child(...args); },
        up: (...args) => { return _$.nth.parent(...args); },
        ls: (...args) => { return _$.nth.list(...args); },
    },
    mod: __darker_modules,
    conf: __darker_conf,
}

module.exports._$ = _$;

/* -INIT- */

function required(mod_name) {
    __darker_modules[mod_name] = require(mod_name);
    return __darker_modules[mod_name];
}

function __add_masks() {
    e = _$.q("div#app-mount > svg");
    if(!e) {
        _$.tmr.s.o(__add_masks, 100);
        return;
    }
    e.after(_$.html(dir + "darker_html/darker_masks.html").body.children[0]);
}

var fs = required("fs");
var requests = required("request");

var cwd = process.cwd();
console.log(cwd)
if(cwd.startsWith("C:\\"))
    var dir = cwd + "\\..\\..\\..\\Roaming\\discord\\";
else if(cwd.startsWith("/usr/bin"))
    var dir = process.env.PWD + "/.config/discord/"
else
    var dir = cwd.split("/", 3).join("/") + "/snap/discord/current/";


function __write_settings() {
    fs.writeFileSync(dir + "darker_conf.json", JSON.stringify(__darker_conf, null, "    "), {flag: "w+"});
}

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

function __new_rng_theme() {
    require(dir + "darker_themes/color/random_color.js").generate(dir);
    __clear_css("__darker_theme");
    style = __add_css(
        dir + "darker_themes/color/priz_" + __darker_conf["darker_color"] + ".css",
        "__darker_theme"
    )
    style.setAttribute("data-theme", __darker_conf["darker_color"]);
}

function __apply_settings() {
    __darker_conf = JSON.parse(fs.readFileSync(dir + "darker_conf.json"));
    if(__darker_conf["load"] && !(__darker_conf["light"] && !__darker_conf["override_light"])) {
        if(!_$.i("__darker_global"))
            __add_css(dir + "darker_themes/darker_css.css", "__darker_global");
        if(_$.i("__darker_theme"))
            if(_$.i("__darker_theme").getAttribute("data-theme") != __darker_conf["darker_color"])
                __clear_css("__darker_theme")
        if(!_$.i("__darker_theme")) {
            window.clearInterval(__epilepsy_timer);
            if(__darker_conf["darker_color"] == "epilepsy")
                __epilepsy_timer = window.setInterval(__new_rng_theme, 1000);
            style = __add_css(
                dir + "darker_themes/color/priz_" + __darker_conf["darker_color"] + ".css",
                "__darker_theme"
            )
            style.setAttribute("data-theme", __darker_conf["darker_color"]);
        }
    } else {
        __clear_css("__darker_global", "__darker_theme");
    }

    __square_styles = [
        "square",
        "square_status",
        "square_toggle",
        "square_vc"
    ];
    for(var style of __square_styles) {
        if(!__darker_conf["square"] || !__darker_conf[style])
            __clear_css("__darker_" + style);
        else if(!_$.i("__darker_" + style))
            __add_css(dir + "darker_themes/" + "darker_" + style + ".css", "__darker_" + style)
    }

    if(__darker_conf["ext_theme_enabled"]) {
        if(__darker_conf["ext_theme_refresh"]) {
            __clear_css("__darker_custom");
            __darker_conf["ext_theme_refresh"] = false;
        } if(!_$.i("__darker_custom"))
            __add_css(__darker_conf["ext_theme_file"], "__darker_custom")
        if(__darker_conf["ext_theme_override"])
            __clear_css(
                "__darker_global", "__darker_theme", "__darker_square",
                "__darker_square_status", "__darker_square_toggle",
                "__darker_square_vc"
           );
    } else {
        __clear_css("__darker_custom");
    }

    if(__darker_conf["clyde"])
        __clear_css("__hide_clyde");
    else if(!_$.i("__hide_clyde"))
        __add_css(`.localBot-GrCgVt { display: none !important }`, "__hide_clyde")
    if(!__darker_conf["full_embed"])
        __clear_css("__full_embed");
    else if(!_$.i("__full_embed"))
        __add_css(`.embedWrapper-lXpS3L { max-width: 100% !important; width: 100% !important; }`, "__full_embed");

    images = [
        "tray-connected.png",
        "tray-deafened.png",
        "tray-muted.png",
        "tray-speaking.png",
        "tray-unread.png",
        "tray.png"
    ];
    win_images = [
        "badge-1.ico",
        "badge-2.ico",
        "badge-3.ico",
        "badge-4.ico",
        "badge-5.ico",
        "badge-6.ico",
        "badge-7.ico",
        "badge-8.ico",
        "badge-9.ico",
        "badge-10.ico",
        "badge-11.ico"
    ];
    //yanderedev would approve, case/switch wouldnt work here anyway
    if(dir.startsWith("/home")) {
        fol = ["apt", "snap"];
        if(dir.includes("/snap/"))
            loc = dir + ".config/discord/";
        else
            loc = dir
    } else {
        fol = ["win", "win_blue"];
        images.push(...win_images);
        loc = dir;
    }

    fol = "darker_tray/" + fol[Number(__darker_conf["tray"])] + "/";
    for(var img of images) {
        fs.copyFileSync(dir + fol + img, dir + img);
    }
    __toggle_channels(false);
}


/* -Emoji stuff- */

function __open_link(url) {
    a = document.createElement("A");
    a.href = url;
    a.rel = "noreferrer noopener";
    a.target = "_blank";
    a.click();
    a.remove();
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
    if(__emoji_timeout == 3) {
        var url = ""
        if(elem.className.includes("emoji"))
            url = elem.src;
        else if(elem.className.includes("avatar-3EQepX wrapper-3t9DeA"))
            url = _$.q("img.avatar-VxgULZ", elem).src.split("?")[0];
        else if(elem.className.includes("wrapper-1BJsBx") && _$.q("img.icon-27yU2q", elem))
            url = _$.q("img.icon-27yU2q", elem).src.split("?")[0];
        __open_link(url);
    }
    _$.tmr.s.o(() => __emoji_timeout -= 1, 1000)
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
        if(!__darker_conf["collapse"])
            __channels_hidden = false
        _$.tok.have(__channel_button.classList, "clickable-3rdHwn", __channels_hidden);
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
            _$.tmr.s.o(() => {
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
    _$.tok.have(button.classList, "clickable-3rdHwn", __darker_conf["collapse"]);
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
        _$.tmr.s.o(() => {
            try {
                style = _$.i("thething").style;
                style.transform = "scale(1.01)";
                window.setTimeout(() => style.transform = "scale(1)", 50);
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
            style.transform = "scale(0.7)";
            style.filter = "opacity(0)";
            _$.tmr.s.o(
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
    __fix_ui();
}

function __channel_listen() {
    /* Fixes said button */
//     console.log("__channel_listen");
    __listen_to_channel_change();
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
            for(var x = 0; x <= 250; x += 50)
                _$.tmr.s.o(__listen_to_channel_change, x);
        }
//         console.log(channel);
        count += 1;
    }

    // Make sure no channel is missed
    if(count == 0 || count != __last_count) {
        _$.tmr.s.o(__channel_listen, 500);
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
                _$.tmr.s.o(__listen_to_guild_change, x);
                _$.tmr.s.o(__listen_to_channel_change, x);
            }
        }
//         console.log(guild);
        count += 1;
    }

    // Make sure no guild is missed
    if(count <= 3 || count != __last_count) {
        _$.tmr.s.o(__guild_listen, 1000);
        __last_count = count;
    } else {
        __last_count = 0;
        __listen_to_guild_change();
        _$.tmr.s.o(__listen_to_channel_change, 1000);
        __stop_guild_listen = true;
    }
}

/* -More UI fixing- */

function __relay_settings_html() {
    var toggles = [
        "uid_DARKER_theme",
        "uid_DARKER_light",
        "uid_DARKER_round",
        "uid_DARKER_emoji",
        "uid_DARKER_collapse",
        "uid_DARKER_tray",
        "uid_DARKER_clyde",
        "uid_FULL_embed",
        "uid_theme_enable",
        "uid_theme_override",
        "uid_SQUARE_vc",
        "uid_SQUARE_status",
        "uid_SQUARE_toggle",
    ];
    for(var toggle of toggles) {
        try {
            toggle_elem = _$.i(toggle);
            if(toggle_elem) {
                toggle_elem.onclick = function() { __update_settings(this) };
                toggle_elem.checked = __darker_conf[toggle_elem.getAttribute("data-conf")];
                __update_settings(toggle_elem, false, false);
            }
        } catch(err) {
            console.error(err);
        }
    }

    // yanderedev would approve of this...

    elem = _$.i("value_theme_file");
    if(elem)
        elem.innerHTML = __darker_conf["ext_theme_file"].split("/").slice(-1)[0];
    elem = _$.i("uid_theme_file");
    if(elem)
        elem.onclick = function() { __check_css_file(this); }
    elem = _$.i("__check_for_darker_updates");
    if(elem)
        elem.onclick = __check_for_darker_updates;
    elem = _$.i("restart_app__");
    if(elem)
        elem.onclick = () => {window.location = "discord.com"};
    elem = _$.i("__nav_square");
    if(elem)
        elem.onclick = () => {_$.q("div#darker_panel div[data-html='square']").click()};
    elem = _$.i("_DARKER_rng_make");
    if(elem)
        elem.onclick = __new_rng_theme;

    // sanity has been brought back kinda

    if(_$.i("theme_select")) {
        for(var clicky of _$.i("theme_select").children) {
            clicky.onclick = function() {
                for(var e of _$.c("css-12o7ek3-option custom-select"))
                    _$.tok.have_multi(e.classList, 1, ["css-1aymab5-option"], ["css-12o7ek3-option"]);
                _$.tok.have_multi(this.classList, 0, ["css-1aymab5-option"], ["css-12o7ek3-option"]);
                __darker_conf["darker_color"] = this.id.split("theme-select-")[1];
                if(__darker_conf["darker_color"].endsWith("rng")) {
                    _$.i("_DARKER_rng_desc").style.display = "";
                    _$.i("_DARKER_og_desc").style.display = "none";
                } else if(__darker_conf["darker_color"].endsWith("epilepsy")) {
                    _$.i("_DARKER_rng_desc").style.display = "";
                    _$.i("_DARKER_og_desc").style.display = "none";
                } else {
                    _$.i("_DARKER_rng_desc").style.display = "none";
                    _$.i("_DARKER_og_desc").style.display = "";
                }
                __write_settings();
                _$.i("theme-reflect").innerHTML = this.innerHTML;
                __apply_settings();
            }
        }
        _$.i("theme-select-" + __darker_conf["darker_color"]).click();
    }
}

function __add_info(evt) {
    // Add info in settings
    var info = _$.c("info-1VyQPT");
    if(!info.length)
        return;

    if(info[0].children.length == 3) {
        var main = _$.c("contentColumn-2hrIYH contentColumnDefault-1VQkGM");
        main = main[main.length - 1].children[0];
        var buttons = _$.q("div[aria-label=\"USER_SETTINGS\"]");
        buttons = _$.c("item-PXvHYJ selected-3s45Ha themed-OHr7kt");
        var button = buttons.item(buttons.length - 1);
        var sep = button.parentElement.children.item(button.parentElement.childElementCount - 7);

        info[0].innerHTML += `<div class="colorMuted-HdFt4q size12-3cLvbJ">PRIZcord v${__version_number} by PRIZ ;]</div>`;
        info[0].innerHTML +=
            `<div class="colorMuted-HdFt4q size12-3cLvbJ">Last startup time: ${___startup_time___}ms</div>`
        var social = _$.c("socialLinks-3jqNFy")[0];
        var personal = _$.html(dir + "darker_html/darker_social.html");
        for(var lnk of personal.body.children)
            social.appendChild(lnk);
        sep.after(
            _$.html(dir + "darker_html/darker_settings_panel.html").body.children[0]
        );
        for(var b of _$.c("prizcord-settings_button")) {
            b.onclick = function() {
                panel = _$.q("main.contentColumn-2hrIYH.contentColumnDefault-1VQkGM");
                for(var p of panel.children) {
                    p.innerHTML = "";
                    if(p.id == "__darker_window")
                        p.remove();
                }
                e = document.createElement("DIV");
                e.id = "__darker_window"
                e.innerHTML = _$.html(
                    dir + "darker_html/darker_settings_" + this.getAttribute("data-html") + ".html"
                ).body.children[0].innerHTML;
                panel.appendChild(e);
                __relay_settings_html();
            }
        }
        for(var b of _$.c("item-PXvHYJ themed-OHr7kt")) {
            b.addEventListener("mouseup", function() {
                if(this.textContent.includes("Change Log"))
                    return
                _$.q(".selected-3s45Ha").classList.remove("selected-3s45Ha");
                this.classList.add("selected-3s45Ha");
                if(this.parentElement.id != "darker_panel" && _$.i("__darker_window")) {
                   _$.i("__darker_window").remove();
                    _$.tmr.s.o(() => this.previousElementSibling.click(), 5);
                    _$.tmr.s.o(() => this.nextElementSibling.click(), 7);
                    _$.tmr.s.o(() => this.click(), 10);
                }
            });
        }
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
        __darker_conf["ext_theme_refresh"] = true; // Intentionally not written
        _$.tmr.s.o(__apply_settings, 100);
        return;
    }
    _$.tmr.s.o(() => _$.i("value_theme_file").innerHTML = __darker_conf["ext_theme_file"].split("/").slice(-1)[0], 2000);

}

function __maybe_disable_switches(ids, condition) {
    for(var id of Object.keys(ids)) {
        e = _$.i(id);
        if(!e)
            continue;
        _$.tok.have_multi(e.parentElement.classList, ids[id], ["valueChecked-m-4IJZ"], ["valueUnchecked-2lU_20"]);
        if(condition) {
            e.parentElement.classList.add("switchDisabled-3HsXAJ");
            e.parentElement.classList.remove("switchEnabled-V2WDBB");
            e.classList.add("checkboxDisabled-1MA81A");
            e.disabled = true;
            _$.nth.up(e, 3).classList.add("disabled-2HSEFa");
        } else {
            e.parentElement.classList.remove("switchDisabled-3HsXAJ");
            e.parentElement.classList.add("switchEnabled-V2WDBB");
            e.classList.remove("checkboxDisabled-1MA81A");
            e.disabled = false;
            _$.nth.up(e, 3).classList.remove("disabled-2HSEFa");
            __update_settings(e, true, false);
        }
    }
}

function __update_settings(elem, dont = false, write = true) {
    _$.tok.have_multi(elem.parentElement.classList, elem.checked, ["valueChecked-m-4IJZ"], ["valueUnchecked-2lU_20"]);
    if(write) {
        __darker_conf[elem.getAttribute("data-conf")] = elem.checked;
        __write_settings();
    }
    if(!dont && (
        elem.id == "uid_theme_enable" ||
        elem.id == "uid_theme_override" ||
        elem.id == "uid_DARKER_round"
    )) {
        ids = {
            "uid_DARKER_theme": false,
            "uid_DARKER_light": true,
            "uid_DARKER_round": false
        }
        condition = __darker_conf["ext_theme_enabled"] && __darker_conf["ext_theme_override"];
        __maybe_disable_switches(ids, condition);
        ids = {
            "uid_SQUARE_vc": false,
            "uid_SQUARE_toggle": false,
            "uid_SQUARE_status": false
        }
        condition = !__darker_conf["square"] || condition;
        __maybe_disable_switches(ids, condition);
    }
    _$.tmr.s.n(__apply_settings);
}

function __fix_ui(evt) {
    if(__darker_conf["emoji"] && evt) {
        window.setTimeout(() => {
            add_timer = 0;
            for(var group of ["div.avatar-3EQepX.wrapper-3t9DeA", "img.emoji", "a.wrapper-1BJsBx"]) {
                for(var elem of _$.qALL(group)) {
                    if(!elem.onclick || elem.onclick.toString() == "function Kn(){}") {
                        elem.onclick = function () { __listen_emoji(this) };
                        add_timer = 1;
                    }
                }
            }
            __emoji_timeout += add_timer;
        }, 100)
    }


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
        _$.tmr.s.o(__apply_settings, 100);
    }
    __toggle_channels(false);

    // Double check
    if(evt)
        _$.tmr.s.o(__fix_ui, 100);
}

/* Check for updates */
function __check_for_darker_updates() {
    var main = _$.i("app-mount");
    var html = fs.readFileSync(dir + "darker_html/darker_update.html");
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
        __open_link('https://github.com/voxelprismatic/prizcord/releases/latest');
    }
    _$.i("__close_updates").onclick = __close_updates;
    _$.tmr.s.o(() => {
        _$.i("__update_bg").style.opacity = "0.85";
        _$.i("__update_alert").style.opacity = "1";
        _$.i("__update_alert").style.transform = "scale(1.05)";
        _$.tmr.s.o(() => _$.i("__update_alert").style.transform = "scale(1)", 100);
    }, 50);
}
function __close_updates() {
    _$.i("__update_bg").style.opacity = "0";
    _$.i("__update_alert").style.transform = "scale(0.7)";
    _$.i("__update_alert").style.opacity = "0";
    _$.tmr.s.o(() => {_$.i("update_screen__").remove()}, 100);
}

function __details(elem) {
    _$.tok.tog(elem.classList, "css-2yldzf-control", "css-1a8reka-control", "wait", "wait2");
    elem.nextElementSibling.classList.toggle("invis");
    _$.tok.tog(_$.nth.child(elem, 1, 0).classList, "css-1flfamv-indicatorContainer", "css-12qlrak-indicatorContainer");
}

function __details_ui() {
    for(var elem of _$.c("css-1aymab5-option custom-select")) {
        elem.onmouseenter = function() {
            _$.tok.tog(this.classList, "css-1aymab5-option", "css-1gnr91b-option");
        }
        elem.onmouseleave = elem.onmouseenter;
    } for(var elem of _$.c("css-1a8reka-control custom-select")) {
        elem.onclick = function() {
            __details(this)
        }
    } for(var elem of _$.c("css-2yldzf-control custom-select")) {
        if(!elem.className.includes("wait")) {
            __details(elem);
            console.log(elem);
        }
    } for(var elem of _$.c("wait")) {
        elem.classList.remove(elem.className.includes("wait2") ? "wait2" : "wait");
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
        _$.nth.up(elem, 2).classList.add("invis");
}

// Run script

if(__darker_conf["load"]) {
    _$.tmr.s.o(__guild_listen, 1000);
    _$.tmr.s.o(__fix_ui, 1000);
}

__add_css(dir + "darker_themes/darker_emotion.css", "__darker_emotion")
__add_masks();
__apply_settings();

window.onclick = __fix_ui;
___startup_time___ = new Date() - ___timer___;
console.timeEnd("PRIZcord - Finished in");
