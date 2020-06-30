cp newcss.css ~/snap/discord/current/
cp newjs.css ~/snap/discord/current/
{
    python inst-py3.py "/home/$(whoami)/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/"
} || {
    python inst-py2.py "/home/$(whomai)/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/"
}
