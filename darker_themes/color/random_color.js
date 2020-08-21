function generate(dir) {
    function rng() {
        var st = "#";
        let ch = "0123456789abcdef";
        for(var x = 0; x < 6; x += 1)
            st += ch[Math.floor(Math.random() * 16)];
        return st;
    }

    let color = rng();

    let neon_color_damn_near_black = rng();

    let bg_color = rng();
    let bg_color_dark = rng();
    let bg_color_semi_dark = rng();
    let bg_color_ultra_dark = rng();
    let bg_color_damn_near_black = rng();
    let bg_color_bright = rng();
    let bg_color_halved = rng();
    let bg_color_halved_halved = rng();

    let turquoise_bright = rng();
    let turquoise = rng();
    let turquoise_semidark = rng();
    let turquoise_dark = rng();
    let turquoise_very_dark = rng();
    let turquoise_ultra_dark = rng();
    let turquoise_hella_dark = rng();
    let turquoise_mega_dark = rng();

    let button_normal = rng();
    let button_clicky = rng();
    let button_select = rng();
    let button_hover = rng();
    let button_hover_bright = rng();
    let button_bright = rng();

    let mod = rng();

    let bg_dark = rng();
    let neon_yellow = rng();
    let white = rng();
    let black = rng();

    let base = `:root {
    /* -- Colors -- */
    --neon-cyan: ${color}; /*#00b0f4*/
    --neon-cyan-invis: ${color}11;
    --neon-cyan-damn-near-black: ${neon_color_damn_near_black};
    --neon-cyan-damn-near-black-invis: ${neon_color_damn_near_black}12;

    --bg-cyan: ${bg_color}; /*#36393f*/
    --bg-cyan-ultra-lucent: ${bg_color}bf;
    --bg-cyan-dark: ${bg_color_dark}; /*#2f3136*/
    --bg-cyan-dark-lucent: ${bg_color_dark}99;
    --bg-cyan-semi-dark: ${bg_color_semi_dark};
    --bg-cyan-ultra-dark: ${bg_color_semi_dark}; /*#2e3338*/
    --bg-cyan-damn-near-black: ${bg_color_damn_near_black};
    --bg-cyan-bright: ${bg_color_bright}; /*#40444b*/
    --bg-cyan-halved: ${bg_color_halved}; /*#292b2f*/
    --bg-cyan-halved-halved: ${bg_color_halved_halved};

    --turquoise-bright: ${turquoise_bright};
    --turquoise-bright-invis-slight: ${turquoise_bright}26;
    --turquoise-bright-invis: ${turquoise_bright}2a;
    --turquoise-bright-semi: ${turquoise_bright}4d;
    --turquoise-invis: ${turquoise}1a;
    --turquoise-semidark: ${turquoise_semidark};
    --turquoise-semidark-invis: ${turquoise_semidark}1a;
    --turquoise-dark: ${turquoise_dark};
    --turquoise-dark-invis: ${turquoise_dark}1a;
    --turquoise-very-dark: ${turquoise_very_dark};
    --turquoise-ultra-dark: ${turquoise_ultra_dark};
    --turquoise-ultra-dark-semi: ${turquoise_ultra_dark}4d;
    --turquoise-ultra-dark-lucent: ${turquoise_ultra_dark}99;
    --turquoise-hella-dark: ${turquoise_hella_dark};
    --turquoise-mega-dark: ${turquoise_mega_dark};
    --turquoise-mega-dark-semi: ${turquoise_mega_dark}4c;

    --bg-dark: ${bg_dark}; /*#202225*/
    --bg-dark-invis: ${bg_dark}34;
    --bg-dark-semi: ${bg_dark}4d;
    --bg-dark-kinda: ${bg_dark}88;
    --bg-dark-lucent: ${bg_dark}99;

    --button-normal: ${button_normal}; /*#4f545c*/
    --button-normal-invis: ${button_normal}4d;
    --button-clicky: ${button_clicky}; /*#72767d*/
    --button-select: ${button_select};
    --button-hover: ${button_hover};
    --button-hover-bright: ${button_hover_bright};
    --button-bright: ${button_bright};

    --mod-hover: ${mod}29; /*#4f545c29*/
    --mod-active: ${mod}3d; /*#4f545c3d*/
    --mod-selected: ${mod}52; /*#4f545c52*/

    /* -- Static -- */

    --neon-yellow: ${neon_yellow};
    --neon-yellow-invis: ${neon_yellow}10;
    --neon-yellow-ultra-invis: ${neon_yellow}08;

    --black: ${black};
    --black-invis: ${black};

    --invis: #0000;

    --white: ${white};
    --white-invis: ${white}22;
    --white-semi: ${white}4d;
    --white-trans: ${white}0f;

    --practically-white: ${rng()};
    --some-grey: ${rng()};

    --nitro-level-one: ${rng()};
    --nitro-level-two: ${rng()};
    --nitro-level-three: ${rng()};
    --nitro-dark: ${rng()};
    --nitro-bright: ${rng()};

    --standard: ${rng()};
    --other-standard: ${rng()};
    --standard-half: ${rng()};
    --std-red: ${rng()};
    --std-red-bright: ${rng()};

    --color-streaming: ${rng()};

    /* -- Swap -- */

    --swap-green-to-blue: ;
    --hue-green-to-blue: ;
    --swap-blurple-to-blue: ;
}`;
    fs = require("fs");
    fs.writeFileSync(dir + "darker_themes/color/priz_rng.css", base, {flag: "w+"});
    fs.writeFileSync(dir + "darker_themes/color/priz_epilepsy.css", base, {flag: "w+"});
}

module.exports["generate"] = generate;
