echo -e "\e[94;1mInstalling DARKERcord...\e[0m"

discord=~/snap/discord/current/
indexjs=~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js

{
    echo -e "\e[90m> Copying files\e[0m"
    cp ../darker_css.css $discord
    cp ../darker_js.js $discord
    cp ../darker_settings.html $discord
    cp ../darker_update.html $discord
    echo -e "\e[90m> Copying dependencies\e[0m"
    cp ../node_stuff/node_modules $discord -r
    cp ../node_stuff/package-lock.json $discord
} || {
    echo -e "\e[41;30mYou aren't in the right folder, please run this script ./script folder\e[0m"
    exit
}

echo -e "\e[90m> Setting up\e[0m"
cp ../index-backup.js $indexjs -T
cp $indexjs $indexjs\~ -T
echo "" >> $indexjs
echo "require(\"../../../../../darker_js.js\");" >> $indexjs

vnum=$(cat $discord\darker_js.js | grep "__version_number" | head -n 1);
vnum=$(echo $vnum | head -c -3 | tail -c +25);

echo -e "\e[94;1mDARKERcord v$vnum installed\e[0m"
