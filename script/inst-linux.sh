cp newcss.css ~/snap/discord/current/
cp newjs.css ~/snap/discord/current/
{
    python inst-py3.py "/home/$(whoami)/"
} || {
    python inst-py2.py "/home/$(whomai)/"
}
