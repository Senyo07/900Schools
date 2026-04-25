import codecs

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

# First, find the start of the first modal
modal_comment = "{/* Edit Modules Modal */}"
first_modal_idx = text.find(modal_comment)
second_modal_idx = text.find(modal_comment, first_modal_idx + 1)

if second_modal_idx != -1:
    # There is a second modal. Let's find the </DashboardLayout> after it
    # We want to keep everything up to second_modal_idx, and then add </DashboardLayout> ...
    new_text = text[:second_modal_idx] + "        </DashboardLayout>\n    );\n};\n\nexport default WebsiteDesign;\n"
else:
    new_text = text

# Now remove the dangling )}
# The dangling )} is between the end of the grid and the first modal.
# It looks like:
#             </div>
#             )}
# 
#             {/* Edit Modules Modal */}

new_text = new_text.replace("            </div>\n            )}\n\n            {/* Edit Modules Modal */}", "            </div>\n\n            {/* Edit Modules Modal */}")
new_text = new_text.replace("            </div>\r\n            )}\r\n\r\n            {/* Edit Modules Modal */}", "            </div>\r\n\r\n            {/* Edit Modules Modal */}")

with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
    f.write(new_text)

print("Fixed syntax errors by removing duplicate modal and dangling brace")
