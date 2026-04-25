import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Change emerald to blue
    new_content = content.replace('emerald', 'blue')
    
    # Change amber to white/blue for the blue and white theme
    new_content = new_content.replace('amber-500', 'white')
    new_content = new_content.replace('amber-400', 'white')
    new_content = new_content.replace('amber-300', 'blue-200')
    new_content = new_content.replace('amber-700', 'blue-700')
    new_content = new_content.replace('amber-600', 'blue-600')
    new_content = new_content.replace('amber-100', 'blue-100')
    new_content = new_content.replace('amber-50', 'blue-50')
    new_content = new_content.replace('bg-amber-', 'bg-blue-')
    new_content = new_content.replace('text-amber-', 'text-blue-')
    new_content = new_content.replace('border-amber-', 'border-blue-')
    new_content = new_content.replace('ring-amber-', 'ring-blue-')
    new_content = new_content.replace('to-amber-', 'to-white')
    new_content = new_content.replace('via-amber-', 'via-blue-200')
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for filepath in glob.glob('src/**/*.tsx', recursive=True):
    replace_in_file(filepath)

for filepath in glob.glob('src/**/*.css', recursive=True):
    replace_in_file(filepath)
