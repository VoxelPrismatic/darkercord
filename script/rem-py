import argparse
parser = argparse.ArgumentParser()
parser.add_argument('directory', help = 'The root directory of the module')
args = parser.parse_args()
folder = args.directory
file = open(folder + "index.js").read()
if 'require("../../../../../new.js")' in file:
    file = file.replace('\nrequire("../../../../../new.js")', '')
    open(folder + "index.js", "w").write(file)
    print("DARKERcord removed")
else:
    print("DARKERcord already removed")
