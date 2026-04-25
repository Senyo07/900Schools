import codecs

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i, line in enumerate(lines):
    # Remove the dangling )\} around line 716
    if ")} " in line or ")}\n" in line or ")}\r\n" in line:
        # Check if it's the one right after the grid
        if i > 700 and i < 730 and ")}" in line.strip() and len(line.strip()) == 2:
            continue # skip this line
    
    # Check where the first modal ends
    if "export default WebsiteDesign;" in line:
        pass # Handle at end

    new_lines.append(line)

# Now, wait, a safer way is just to regex or string replace.
# Let's read the whole file text
with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

# Fix 1: delete the trailing )\}
text = text.replace("""            </div>
            )}

            {/* Edit Modules Modal */}""", """            </div>

            {/* Edit Modules Modal */}""")

# Fix 2: Delete the duplicate modal at the end
# find the first </DashboardLayout> which was where I appended.
# Actually, I had appended after what I thought was </DashboardLayout>. 
# Let's cleanly split at the first </DashboardLayout>

parts = text.split("</DashboardLayout>")
if len(parts) > 1:
    # Everything after the first </DashboardLayout> EXCEPT export default WebsiteDesign 
    # should be thrown out, or actually, the file should just be:
    # part[0] + "</DashboardLayout>\n    );\n};\n\nexport default WebsiteDesign;\n"
    pass

text = parts[0] + "</DashboardLayout>\n    );\n};\n\nexport default WebsiteDesign;\n"

with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
    f.write(text)

print("Fixed syntax errors!")
