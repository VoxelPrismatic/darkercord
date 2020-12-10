echo -e "\e[94;1mInstalling PRIZcord...\e[0m"

if [ -f ../darker_js.js ]; then
    cp ../darker_js.js $discord > /dev/null 2> /dev/null
    cp ../darker_themes $discord -r > /dev/null 2> /dev/null
    cp ../darker_html $discord -r > /dev/null 2> /dev/null
    cp ../darker_tray $discord -r > /dev/null 2> /dev/null
    echo -e "\e[90m> Copying dependencies\e[0m"
    cp ../node_stuff/node_modules $discord -r > /dev/null 2> /dev/null
    cp ../node_stuff/package-lock.json $discord > /dev/null 2> /dev/null
else
    echo -e "\e[41;29;1mYou aren't in the right folder, please run this script ./script folder\e[0m"
    exit
fi

declare -a choose

if [ -d ~/.config/discord ]; then
    v=$(ls ~/.config/discord -w 1 | grep 0.0 | tail -n 1)
    if [ $(cat ~/.config/discord/$v/modules/discord_utils/index.js | grep darker) ]; then
        choose+=("Stable v$v [APT/RPM] [installed]")
    else
        choose+=("Stable v$v [APT/RPM]")
    fi
fi
if [ -d ~/.config/discordcanary ]; then
    v=$(ls ~/.config/discordcanary -w 1 | grep 0.0 | tail -n 1)
    if [ $(cat ~/.config/discordcanary/$v/modules/discord_utils/index.js | grep darker) ]; then
        choose+=("Canary v$v [APT/RPM] [installed]")
    else
        choose+=("Canary v$v [APT/RPM]")
    fi
fi
if [ -d ~/.config/discordptb ]; then
    v=$(ls ~/.config/discordptb -w 1 | grep 0.0 | tail -n 1)
    if [ $(cat ~/.config/discordptb/$v/modules/discord_utils/index.js | grep darker) ]; then
        choose+=("PTB v$v [APT/RPM] [installed]")
    else
        choose+=("PTB v$v [APT/RPM]")
    fi
fi
if [ -d ~/snap/discord/current ]; then
    v=$(ls ~/snap/discord/current/.config/discord/ -w 1 | grep 0.0 | tail -n 1)
    if [ $(cat ~/snap/discord/current/.config/discord/$v/modules/discord_utils/index.js | grep darker) ]; then
        choose+=("Stable v$v [SNAP] [installed]")
    else
        choose+=("Stable v$v [SNAP]")
    fi
fi
if [ ${#choose[@]} -ne 1 ]; then
    echo -e "\e[92;1mMultiple installations found\e[0m"
    for i in $(seq 0 ${#choose[@]}); do
        if [ $i -lt ${#choose[@]} ]; then
            echo $(($i + 1))] ${choose[$i]}
        fi
    done
    echo -e "\n"
    n=0
    while [ $n -gt ${#choose[@]} ] || [ $n -lt 1 ]; do
        echo -ne "\e[1AWhere do you want to install? [1-$i] \e[J"
        read n
        if [[ "$n" =~ ^[0-9]+$ ]]; then true; else
            n=0
        fi
    done
    n=$(($n - 1))
    install=${choose[$n]}
else
    install=${choose[0]}
fi

echo -e "\e[90m> Copying files\e[0m"

snap="false"
if [ "$install" == *"[SNAP]"* ]; then
    snap="true"
    discord=~/snap/discord/current/
    v=$(ls $discord/.config/discord -w 1 | grep 0.0 | tail -n 1)
    indexjs=$discord/.config/discord/$v/modules/discord_utils/index.js
else
    if [[ $install == *"Canary"* ]]; then
        discord=~/.config/discordcanary/
    elif [[ $install == *"Stable"* ]]; then
        discord=~/.config/discord/
    elif [[ $install == *"PTB"* ]]; then
        discord=~/.config/discordptb/
    fi
    v=$(ls $discord -w 1 | grep 0.0 | tail -n 1)
    indexjs=$discord/$v/modules/discord_utils/index.js
fi
echo -e "\e[90m  > Installing to $install\e[0m"


echo -e "\e[90m> Setting up\e[0m"
cp ../index-backup.js $indexjs -T > /dev/null 2> /dev/null
mkdir $discord\darker_themes > /dev/null 2> /dev/null
cp $indexjs $indexjs\~ -T > /dev/null 2> /dev/null
echo "" >> $indexjs
if [ "$snap" == "true" ]; then
    echo "require(\"../../../../../darker_js.js\");" >> $indexjs;
else
    echo "require(\"../../../darker_js.js\");" >> $indexjs;
fi

vnum=$(cat $discord\darker_js.js | grep "__version_number = ");
vnum=$(echo $vnum | head -c -3 | tail -c +25);

echo -e "\e[94;1mPRIZcord v$vnum installed\e[0m"
