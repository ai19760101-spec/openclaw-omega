
import os
import re

ROOT_DIR = r"c:\Antigravity\dev_artifacts\openclaw_analysis_clone\src"
MODEL_SELECTION_REGEX = re.compile(r'from\s+["\']([^"\']*)model-selection(\.js)?["\'];?')

def resolve_provider_utils_path(original_path):
    # original_path is generic/relative like "../model-selection.js"
    # We just want to replace "model-selection" with "provider-utils"
    return original_path.replace("model-selection", "provider-utils")

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    modified = False

    for line in lines:
        if "normalizeProviderId" in line and "model-selection" in line and "import" in line:
            # Check if it has other imports
            # Case 1: Only normalizeProviderId
            # import { normalizeProviderId } from ...
            if re.search(r'import\s+{\s*normalizeProviderId\s*}\s+from', line):
                new_line = line.replace("model-selection", "provider-utils")
                new_lines.append(new_line)
                modified = True
                continue
            
            # Case 2: Mixed imports
            # import { normalizeProviderId, other } from ...
            # We need to parse this somewhat robustly
            match = re.search(r'import\s+{(.*)}\s+from\s+["\']([^"\']+)["\']', line)
            if match:
                imports_str = match.group(1)
                path_str = match.group(2)
                
                imports = [i.strip() for i in imports_str.split(',')]
                
                if "normalizeProviderId" in imports:
                    imports.remove("normalizeProviderId")
                    
                    # Add new import line for normalizeProviderId
                    provider_utils_path = resolve_provider_utils_path(path_str)
                    new_lines.append(f'import {{ normalizeProviderId }} from "{provider_utils_path}";\n')
                    
                    # If other imports remain, keep the original line but modified
                    if imports:
                        # Clean up trailing/leading commas if we removed something
                        new_imports_str = ", ".join(imports)
                        new_lines.append(f'import {{ {new_imports_str} }} from "{path_str}";\n')
                    
                    modified = True
                    continue
        
        new_lines.append(line)

    if modified:
        print(f"Patching {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(".ts"):
            process_file(os.path.join(root, file))
