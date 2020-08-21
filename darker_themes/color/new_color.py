import argparse
import random
parser = argparse.ArgumentParser()
parser.add_argument('color', help = 'The base color')
parser.add_argument('name', help = 'Color name')

args = parser.parse_args()

color, f = args.color, args.name

def replace(_ff, _00, _88):
    global color
    st = "#"
    for x in range(1, 7, 2):
        s = color[x:x+2]
        s_ = s
        for y in [["ff", _ff], ["00", _00], ["88", _88]]:
            s = s.replace(y[0], y[1])
            if s != s_:
                break
        st += s
    return st


neon_color_damn_near_black = replace("05", "03", "04")

bg_color = replace("22", "11", "15")
bg_color_dark = replace("18", "08", "10")
bg_color_semi_dark = replace("1b", "08", "15")
bg_color_ultra_dark = replace("15", "04", "08")
bg_color_damn_near_black = replace("11", "00", "0a")
bg_color_bright = replace("33", "22", "25")
bg_color_halved = replace("11", "08", "0a")
bg_color_halved_halved = replace("08", "04", "06")

turquoise_bright = replace("aa", "44", "88")
turquoise = replace("88", "44", "66")
turquoise_semidark = replace("55", "44", "47")
turquoise_dark = replace("99", "33", "66")
turquoise_very_dark = replace("99", "00", "44")
turquoise_ultra_dark = replace("88", "00", "33")
turquoise_hella_dark = replace("77", "00", "33")
turquoise_mega_dark = replace("44", "00", "22")

button_normal = replace("44", "33", "38")
button_clicky = replace("55", "44", "49")
button_select = replace("77", "66", "6b")
button_hover = replace("66", "55", "5a")
button_hover_bright = replace("bb", "55", "88")
button_bright = replace("dd", "66", "aa")

mod = replace("44", "33", "38")

bg_dark = "#0a0a0a"
neon_yellow = "#ffff00"
white = "#ffffff"
black = "#000000"

base = f"""
    /* -- Colors -- */
    --neon-cyan: {color}; /*#00b0f4*/
    --neon-cyan-invis: {color}11;
    --neon-cyan-damn-near-black: {neon_color_damn_near_black};
    --neon-cyan-damn-near-black-invis: {neon_color_damn_near_black}12;

    --bg-cyan: {bg_color}; /*#36393f*/
    --bg-cyan-ultra-lucent: {bg_color}bf;
    --bg-cyan-dark: {bg_color_dark}; /*#2f3136*/
    --bg-cyan-dark-lucent: {bg_color_dark}99;
    --bg-cyan-semi-dark: {bg_color_semi_dark};
    --bg-cyan-ultra-dark: {bg_color_semi_dark}; /*#2e3338*/
    --bg-cyan-damn-near-black: {bg_color_damn_near_black};
    --bg-cyan-bright: {bg_color_bright}; /*#40444b*/
    --bg-cyan-halved: {bg_color_halved}; /*#292b2f*/
    --bg-cyan-halved-halved: {bg_color_halved_halved};

    --turquoise-bright: {turquoise_bright};
    --turquoise-bright-invis-slight: {turquoise_bright}26;
    --turquoise-bright-invis: {turquoise_bright}2a;
    --turquoise-bright-semi: {turquoise_bright}4d;
    --turquoise-invis: {turquoise}1a;
    --turquoise-semidark: {turquoise_semidark};
    --turquoise-semidark-invis: {turquoise_semidark}1a;
    --turquoise-dark: {turquoise_dark};
    --turquoise-dark-invis: {turquoise_dark}1a;
    --turquoise-very-dark: {turquoise_very_dark};
    --turquoise-ultra-dark: {turquoise_ultra_dark};
    --turquoise-ultra-dark-semi: {turquoise_ultra_dark}4d;
    --turquoise-ultra-dark-lucent: {turquoise_ultra_dark}99;
    --turquoise-hella-dark: {turquoise_hella_dark};
    --turquoise-mega-dark: {turquoise_mega_dark};
    --turquoise-mega-dark-semi: {turquoise_mega_dark}4c;

    --bg-dark: {bg_dark}; /*#202225*/
    --bg-dark-invis: {bg_dark}34;
    --bg-dark-semi: {bg_dark}4d;
    --bg-dark-kinda: {bg_dark}88;
    --bg-dark-lucent: {bg_dark}99;

    --button-normal: {button_normal}; /*#4f545c*/
    --button-normal-invis: {button_normal}4d;
    --button-clicky: {button_clicky}; /*#72767d*/
    --button-select: {button_select};
    --button-hover: {button_hover};
    --button-hover-bright: {button_hover_bright};
    --button-bright: {button_bright};

    --mod-hover: {mod}29; /*#4f545c29*/
    --mod-active: {mod}3d; /*#4f545c3d*/
    --mod-selected: {mod}52; /*#4f545c52*/

    /* -- Static -- */

    --neon-yellow: {neon_yellow};
    --neon-yellow-invis: {neon_yellow}10;
    --neon-yellow-ultra-invis: {neon_yellow}08;

    --black: {black};
    --black-invis: {black};

    --invis: #0000;

    --white: {white};
    --white-invis: {white}22;
    --white-semi: {white}4d;
    --white-trans: {white}0f;

    --practically-white: #dddddd;
    --some-grey: #bbbbbb;

    --nitro-level-one: #cc40c7;
    --nitro-level-two: #dd51d8;
    --nitro-level-three: #ee62e9;
    --nitro-dark: #6178c9;
    --nitro-bright: #7289da;

    --standard: #dcddde;
    --other-standard: #b9bbbe;
    --standard-half: #8e9297;
    --std-red: #e03636;
    --std-red-bright: #f04747;

    --color-streaming: #6600aa;

    /* -- Swap -- */

    --swap-green-to-blue: ;
    --hue-green-to-blue: ;
    --swap-blurple-to-blue: ;
"""

base = ":root {" + base + "};"
print(base)

n = -1
while True:
    try:
        open(f"priz_{f}{'-' + str(n) if n >= 0 else ''}.css")
        n += 1
    except:
        break

open(f"priz_{f}{'-' + str(n) if n >= 0 else ''}.css", "w+").write(base)
