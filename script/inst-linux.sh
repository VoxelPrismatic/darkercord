discord=~/snap/discord/current/
cp ../darker_css.css $discord
cp ../darker_js.js $discord
cp ../darker_settings.html $discord
cp ../darker_update.html $discord
cp ../request $discord -r
indexjs=~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js
case $(cat $indexjs) in
    *require\(\"\.\./\.\./\.\./\.\./\.\./newjs.js\"\)* ) {
        echo "Cleaning up after DARKERcord prior to v0.5"
        head -n -3 $indexjs > $indexjs;
    }
esac;

vnum=$(cat $discord\darker_js.js | grep "__version_number" | head -n 1);
vnum=$(echo $vnum | head -c -3 | tail -c +25);

case $(cat $indexjs) in
    *require\(\"\.\./\.\./\.\./\.\./\.\./darker_js.js\"\)* ) {
        echo "DARKERcord v$vnum already installed";
        html=$(curl -s https://github.com/voxelprismatic/darkercord/releases | grep -E "/VoxelPrismatic/darkercord/tree/v[[:digit:]]+\.[[:digit:]]+" | head -n 1)
        html=$(echo $html | head -c -3 | tail -c +89)
        echo "DARKERcord $html is the latest stable version";
        echo "https://github.com/voxelprismatic/darkercord/releases/latest"
    };
esac;

cp $indexjs $indexjs\~ -T
echo "" >> $indexjs
echo "require(\"../../../../../darker_js.js\");" >> $indexjs
echo
echo "DARKERcord installed"
