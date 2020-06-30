var fs = require("fs");

console.log("PRIZ ;] - Loading");
console.time("PRIZ ;] - Finished in");
var cwd = process.cwd();
var loadcss = "true";
if(cwd.startsWith("C:\\")) {
    var newcss = fs.readFileSync(cwd + "\\..\\..\\..\\Roaming\\discord\\newcss.css");
    try {
        var loadcss = fs.readFileSync(cwd + "\\..\\..\\..\\Roaming\\discord\\loadcss.bool");
    } catch(err) {
    }
} else {
    var newcss = fs.readFileSync("./snap/discord/current/newcss.css");
    try {
        loadcss = fs.readFileSync("./snap/discord/current/loadcss.bool");
    } catch(err) {
    }
}
if(loadcss.includes("true"))
    document.head.innerHTML += "<style type='text/css'>" + newcss + "</style>";

__channels_hidden = false;
__channel_button = null;
__messages_length = 0;
__emoji_timeout = 0;
__emoji_clicked = null;
function __toggle_channels(doit = true) {
    if(doit)
        __channels_hidden = !__channels_hidden;
    if(__channels_hidden) {
        document.getElementsByClassName("sidebar-2K8pFh")[0].classList.add("invis");
        __channel_button.classList.remove("selected-1GqIat");
    } else {
        document.getElementsByClassName("sidebar-2K8pFh")[0].classList.remove("invis");
        __channel_button.classList.add("selected-1GqIat");
    }
}
function __listen_to_emoji_click(evt = null) {
    if(evt)
        target = evt.target
    else {
        target = document.getElementById("messages").parentElement;
        target.onmousemove = __listen_to_emoji_click;
    }
    if(__messages_length == target.children[0].children.length)
        return
    for(var emoji of target.getElementsByClassName("emoji")) {
        if(!emoji.onclick || emoji.onclick.toString() == "function Kn(){}")
            emoji.onclick = function () {__listen_emoji(this)};
    }
    __messages_length = target.children[0].children.length;
}
function __listen_emoji(elem) {
    if(__emoji_timeout < 0)
        __emoji_timeout = 0
    if(__emoji_clicked != elem) {
        __emoji_clicked = elem;
        __emoji_timeout = 0;
    }
    __emoji_timeout += 1
    if(__emoji_timeout == 3)
        window.open(elem.src);
    window.setTimeout(() => globalThis.__emoji_timeout -= 1, 1000)
}
function __listen_to_channel_change() {
    for(var button of document.getElementsByClassName("iconWrapper-2OrFZ1 focusable-1YV_-H")) {
        if(button.className == "iconWrapper-2OrFZ1 focusable-1YV_-H" && button.getAttribute("aria-label") != "Help") {
            break
        }
    }
    if(button.getAttribute("aria-label") == "Help")
        return
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
        var innerHTML =
        `<div id="thething" class="layer-v9HyYc disabledPointerEvents-1ptgTB" style="position: absolute; left: ${x}px; top: ${y}px;">` +
        `<div class="tooltip-2QfLtc tooltipBottom-3ARrEK tooltipBlack-PPG47z tooltipDisablePointerEvents-3eaBGN" style="opacity: 1; transform: none;">` +
        `<div class="tooltipPointer-3ZfirK"></div><div class="tooltipContent-bqVLWK">Channel List</div></div></div>`;
        if(!document.getElementsByClassName("customContainer_NEW").length) {
            document.getElementById("app-mount").children[0].outerHTML += `<div class="customContainer_NEW"></div>`;
        }
        document.getElementsByClassName("customContainer_NEW")[0].innerHTML = innerHTML;
        window.setTimeout(() => {
            try {
                style = document.getElementById("thething").style;
                style.transform = "scale(1)";
                style.filter = "opacity(1)";
            } catch(err) {
                console.error(err);
            }
        }, 50);
    }
    button.onmouseleave = () => {
        try {
            style = document.getElementById("thething").style;
            style.transform = "scale(0.9)";
            style.filter = "opacity(0)";
            window.setTimeout(
                () => document.getElementById("thething").outerHTML = "",
                50
            )
        } catch(err) {
            console.error(err);
        }
    }
    button.onclick = __toggle_channels;
    __toggle_channels(false);
    try {
        document.getElementById("messages").parentElement.onscroll = __listen_to_emoji_click;
        __listen_to_emoji_click();
    } catch(err) {
        console.error(err);
    }
}
var __last_count = 0;
function __channel_listen() {
//     console.log("__channel_listen");
    __listen_to_channel_change();
    var count = 0;
    var ls;
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
    for(var channel of ls) {
        channel.onclick = () => {
            for(var x = 0; x <= 250; x += 50) {
                window.setTimeout(__listen_to_channel_change, x);
            }
        }
//         console.log(channel);
        count += 1;
    }
    if(count == 0 || count != __last_count) {
        window.setTimeout(__channel_listen, 500);
        __last_count = count;
    } else {
        __listen_to_channel_change();
        __last_count = 0;
    }
}

function __listen_to_guild_change() {
    __channel_listen();
    __toggle_channels(false);
}

function __fix_radio_colors(evt) {
    for(var button of document.getElementsByClassName("item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx")) {
        if(button.style.borderColor == "rgb(114, 137, 218)") {
            button.style.borderColor = "#4aa";
            button.style.backgroundColor = "#4aa";
        }
    }
    for(var button of document.getElementsByClassName("checked-3_4uQ9")) {
        if(button.className.includes("round-")) {
            button.style.backgroundColor = "#44aaaa26";
            button.style.borderColor = "#44aaaa26";
            button.getElementsByTagName("polyline")[0].setAttribute("stroke", "#4aa");
        } else {
            if(window.getComputedStyle(button).backgroundColor == "rgb(255, 255, 255)") {
                button.style.borderColor =
                    window.getComputedStyle(button.parentElement.parentElement).borderColor;
            } else {
                button.style.backgroundColor = "#4aa";
            }
        }
    }
    for(var toggle of document.getElementsByClassName("valueChecked-m-4IJZ")) {
        if(toggle.style.backgroundColor == "rgb(67, 181, 129)") {
            toggle.style.backgroundColor = "#4aa";
        }
    }
    if(evt)
        window.setTimeout(__fix_radio_colors, 100);
}

window.onclick = __fix_radio_colors;
__stop_guild_listen = false;
function __guild_listen() {
    if(__stop_guild_listen)
        return;
//     console.log("__guild_listen");
    var count = 0;
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
if(loadcss.includes("true"))
    window.setTimeout(__guild_listen, 1000);
console.timeEnd("PRIZ ;] - Finished in");
