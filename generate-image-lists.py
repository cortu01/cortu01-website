#!/usr/bin/env python3
"""
Generate image lists for gallery pages.
This script scans image directories and creates JSON files with image lists,
and updates HTML files with embedded image lists.
"""

import os
import json
import re
from pathlib import Path

def generate_image_list(directory_path, output_file):
    """Generate a list of images in the given directory."""
    directory = Path(directory_path)
    
    # Create directory if it doesn't exist
    directory.mkdir(parents=True, exist_ok=True)
    
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
    
    # Get all image files
    images = []
    if directory.exists():
        for file_path in directory.iterdir():
            if file_path.is_file() and file_path.suffix.lower() in image_extensions:
                images.append(file_path.name)
    
    # Sort images alphabetically
    images.sort()
    
    # Write to JSON file
    with open(output_file, 'w') as f:
        json.dump(images, f, indent=2)
    
    print(f"Generated {output_file} with {len(images)} images")
    
    return images

def update_html_file(html_file, image_list, folder_name):
    """Update HTML file with embedded image list."""
    if not html_file.exists():
        print(f"HTML file {html_file} not found, skipping...")
        return
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create the JavaScript array string
    image_array = ',\n                '.join([f'"{img}"' for img in image_list])
    js_code = f'''            // Image list generated automatically by Python script
            const imageFiles = [
                {image_array}
            ];'''
    
    # Pattern to match the existing image list section
    pattern = r'// Image list generated automatically by Python script\s+const imageFiles = \[\s+.*?\s+\];'
    
    if re.search(pattern, content, re.DOTALL):
        # Replace existing section
        new_content = re.sub(pattern, js_code, content, flags=re.DOTALL)
    else:
        # Find the loadAllImages function and insert the image list
        pattern = r'(async function loadAllImages\(\) \{)'
        replacement = r'\1\n' + js_code + '\n            '
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Write back to file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {html_file} with {len(image_list)} images")

def main():
    """Main function to generate image lists for both galleries."""
    # Get the script directory
    script_dir = Path(__file__).parent
    
    # Generate list for AI Art Exhibition
    ai_art_dir = script_dir / "src" / "assets" / "img" / "ai-art-exhibition"
    ai_art_output = ai_art_dir / "images.json"
    ai_art_images = generate_image_list(ai_art_dir, ai_art_output)
    
    # Update AI Art Exhibition HTML
    ai_art_html = script_dir / "ai-art-exhibition.html"
    update_html_file(ai_art_html, ai_art_images, "ai-art-exhibition")
    
    # Generate list for LeRobot Hackathon
    lerobot_dir = script_dir / "src" / "assets" / "img" / "lerobot-hackathon"
    lerobot_output = lerobot_dir / "images.json"
    lerobot_images = generate_image_list(lerobot_dir, lerobot_output)
    
    # Update LeRobot Hackathon HTML
    lerobot_html = script_dir / "lerobot-hackathon.html"
    update_html_file(lerobot_html, lerobot_images, "lerobot-hackathon")

if __name__ == "__main__":
    main() 