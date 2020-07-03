cp ../newcss.css ~/snap/discord/current/
cp ../newjs.js ~/snap/discord/current/
echo "true" > ~/snap/discord/current/loadcss.bool
python inst-py.py "/home/$(whoami)/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/"
