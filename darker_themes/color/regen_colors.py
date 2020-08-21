import os

colors = {
    "red":      "#ff0000",
    "orange":   "#ff8800",
    "yellow":   "#ffff00",
    "nuclear":  "#88ff00",
    "green":    "#00ff00",
    "seafoam":  "#00ff88",
    "cyan":     "#00ffff",
    "seawater": "#0088ff",
    "blue":     "#0000ff",
    "purple":   "#8800ff",
    "magenta":  "#ff00ff",
    "pink":     "#ff0088",
    "black":    "#888888",
    "grey":     "#ffffff"
}

for color in colors:
    os.system(f"python3 new_color.py '{colors[color]}' '{color}'")
