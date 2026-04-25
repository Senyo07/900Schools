import codecs
import mod_modal

with codecs.open('src/pages/WebsiteDesign.tsx', 'r', 'utf-8') as f:
    text = f.read()

# Find the start of the modal (the first instance)
marker = '            {/* Edit Modules Modal */}'
idx = text.find(marker)

if idx != -1:
    # Truncate everything from the marker onwards
    new_text = text[:idx]
    
    # Append the pristine modal code and the closing tags
    new_text += mod_modal.modal_code
    new_text += '\n        </DashboardLayout>\n    );\n};\n\nexport default WebsiteDesign;\n'
    
    with codecs.open('src/pages/WebsiteDesign.tsx', 'w', 'utf-8') as f:
        f.write(new_text)
    print("Successfully rebuilt WebsiteDesign.tsx end of file!")
else:
    print("Could not find the modal marker.")
