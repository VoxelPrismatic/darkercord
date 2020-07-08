cp ../darker_css.css ~/snap/discord/current/
cp ../darker_js.js ~/snap/discord/current/
cp ../darker_settings.html ~/snap/discord/current/
cp ~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js ~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js~ -T
echo "" >> ~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js
echo "require(\"../../../../../darker_js.js\");" >> ~/snap/discord/current/.config/discord/0.0.10/modules/discord_utils/index.js
echo "DARKERcord installed"
