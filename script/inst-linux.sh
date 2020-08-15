echo -e "\e[94;1mInstalling PRIZcord...\e[0m"

discord=~/.config/discord/
indexjs=~/.config/discord/0.0.11/modules/discord_utils/index.js
echo -e "\e[90m> Copying files\e[0m"

#Detect whether or not discord is SNAP
{
    cp ../darker_css.css $discord > /dev/null 2> /dev/null
    echo -e "\e[90m  > Detected install as APT/RPM\e[0m"
    snap="false"
} || {
    echo -e "\e[90m  > Detected install as SNAP\e[0m"
    discord=~/snap/discord/current/
    indexjs=~/snap/discord/current/.config/discord/0.0.11/modules/discord_utils/index.js
    snap="true"
}

{
    cp ../darker_js.js $discord > /dev/null 2> /dev/null
    cp ../darker_themes $discord -r > /dev/null 2> /dev/null
    cp ../darker_html $discord -r > /dev/null 2> /dev/null
    cp ../darker_tray $discord -r > /dev/null 2> /dev/null
    echo -e "\e[90m> Copying dependencies\e[0m"
    cp ../node_stuff/node_modules $discord -r > /dev/null 2> /dev/null
    cp ../node_stuff/package-lock.json $discord > /dev/null 2> /dev/null
} || {
    echo -e "\e[41;30;1mYou aren't in the right folder, please run this script ./script folder\e[0m"
    exit
}

echo -e "\e[90m> Setting up\e[0m"
cp ../index-backup.js $indexjs -T > /dev/null 2> /dev/null
mkdir $discord\darker_themes > /dev/null 2> /dev/null
cp $indexjs $indexjs\~ -T > /dev/null 2> /dev/null
echo "" >> $indexjs
if [ "$snap" == "true" ];
then
    echo "require(\"../../../../../darker_js.js\");" >> $indexjs;
else
    echo "require(\"../../../darker_js.js\");" >> $indexjs;
fi

vnum=$(cat $discord\darker_js.js | grep "__version_number = ");
vnum=$(echo $vnum | head -c -3 | tail -c +25);

echo -e "\e[94;1mPRIZcord v$vnum installed\e[0m"
