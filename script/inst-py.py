import argparse
parser = argparse.ArgumentParser()
parser.add_argument('directory', help = 'The root directory of the module')
args = parser.parse_args()
folder = args.directory
file = open(folder + "index.js").read()
if 'require("../../../../../newjs.js")' not in file:
    file += '\nrequire("../../../../../newjs.js");\n'
    open(folder + "index.js", "w").write(file)
print("DARKERcord installed")
