import os
import glob

def replace_in_file(filepath):
    # Exclude onboarding and landing
    excluded = ['Admissions.tsx', 'AdmissionsForm.tsx', 'TeacherOnboarding.tsx', 'Landing.tsx']
    if any(excl in filepath for excl in excluded):
        print(f"Skipping {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Change blue to slate
    new_content = content.replace('bg-blue-', 'bg-slate-')
    new_content = new_content.replace('text-blue-', 'text-slate-')
    new_content = new_content.replace('border-blue-', 'border-slate-')
    new_content = new_content.replace('ring-blue-', 'ring-slate-')
    new_content = new_content.replace('to-blue-', 'to-slate-')
    new_content = new_content.replace('from-blue-', 'from-slate-')
    new_content = new_content.replace('via-blue-', 'via-slate-')
    new_content = new_content.replace('shadow-blue-', 'shadow-slate-')
    
    # Let's also do a blanket replace for blue- since there might be hover:bg-blue-
    new_content = new_content.replace('blue-50', 'slate-50')
    new_content = new_content.replace('blue-100', 'slate-100')
    new_content = new_content.replace('blue-200', 'slate-200')
    new_content = new_content.replace('blue-300', 'slate-300')
    new_content = new_content.replace('blue-400', 'slate-400')
    new_content = new_content.replace('blue-500', 'slate-500')
    new_content = new_content.replace('blue-600', 'slate-600')
    new_content = new_content.replace('blue-700', 'slate-700')
    new_content = new_content.replace('blue-800', 'slate-800')
    new_content = new_content.replace('blue-900', 'slate-900')
    new_content = new_content.replace('blue-950', 'slate-950')
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for filepath in glob.glob('src/**/*.tsx', recursive=True):
    replace_in_file(filepath)

for filepath in glob.glob('src/**/*.css', recursive=True):
    replace_in_file(filepath)
