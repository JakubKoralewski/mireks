from pathlib import Path
import argparse
import re
from os import path
from shutil import copyfile
from pprint import pprint

parser = argparse.ArgumentParser(description="Auto export all variables")
parser.add_argument("file", type=str, nargs=1,
                    help="File to export all variables from")

file = parser.parse_args().file[0].strip()
file_content = ""

# create backup
copyfile(file, file + ".bak")

# Read given (.scss) file
with open(file, "r", encoding='UTF-8') as f:
    file_content = f.read()

# Delete previous export segment
delete_old_export = re.sub(r'\s*:export\s+{(.|\n|\r)*}\s*', '', file_content)

# Find pairs of variables and values
all_matches = re.findall(
    r'^\$([^:]+):\s*([^;]+(;")?);', delete_old_export, re.MULTILINE)

export_fragment = "\n\n:export {\n"
decl = ""
ts_cont = "export default {\n"

cache = {}

for match in all_matches:
    var = match[0]
    val: str = match[1]
    if val.startswith('"') and val.endswith('"'):
        cache[var] = val[1:-2]
    else:
        cache[var] = val

    def replfunc(matchobj):
        try:
            # skip the $ character
            return cache[matchobj.group(2)[1:]]
        except IndexError as e:
            print(f"Index error , because: `{e}`")
            pprint(matchobj)

    match = re.search(r'#{([^}]+)}', val)
    while match:
        # print(f"val from: `{val}`")
        val = re.sub(r'(#{(\$[^}]+)})', replfunc, val)
        # print(f"to: `{val}`")
        match = re.search(r'#{([^}]+)}', val)
    

    val = val.replace('\n', '').replace('\t', '')
    new_var = ""
    was_dash = False
    for char in var:
        char: str
        if char == "-":
            was_dash = True
            continue
        if was_dash:
            new_var += char.upper()
        else:
            new_var += char
        was_dash = False

    line = f"\t{new_var}: {val};\n"
    print(f"line: {line}")
    decl_line = f"\t{new_var}: '{val}';\n"
    ts_line = f"\t{new_var}: '{val}',\n"
    export_fragment += line
    decl += decl_line
    ts_cont += ts_line

export_fragment += "}"
ts_cont += "};"

# Save new .scss with export of all variables inside
with open(file, "w", encoding="UTF-8") as f:
    f.write(delete_old_export + export_fragment)


# TypeScript declarations
# ts_decl = file + ".d.ts"
# copyfile(ts_decl, ts_decl + ".bak")

# declaration = f"""interface Variables {{
# {decl}
# }}

# export const variables: Variables;
# export default variables;"""

# with open(ts_decl, "w+", encoding="UTF-8") as f:
# 	f.write(declaration)

# TypeScript file
ts_file = file.split(".")[0] + ".ts"
if path.isfile(ts_file):
    copyfile(ts_file, ts_file + ".bak")
with open(ts_file, "w+", encoding="UTF-8") as f:
    f.write(ts_cont)
