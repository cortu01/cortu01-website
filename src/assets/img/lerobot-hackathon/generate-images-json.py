#!/usr/bin/env python3
"""
Script to generate images.json file listing all images in the current directory.
Run this script from the lerobot-hackathon folder to automatically create the JSON file.
"""

import os
import json
from pathlib import Path

def generate_images_json():
    """Generate images.json file with all image files in current directory."""
    
    # Get current directory
    current_dir = Path('.')
    
    # Image extensions to look for
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'}
    
    # Find all image files
    image_files = []
    for file_path in current_dir.iterdir():
        if file_path.is_file() and file_path.suffix in image_extensions:
            # Skip the images.json file itself and this script
            if file_path.name not in ['images.json', 'generate-images-json.py']:
                image_files.append(file_path.name)
    
    # Sort files for consistent ordering
    image_files.sort()
    
    # Create the JSON data
    json_data = image_files
    
    # Write to images.json
    with open('images.json', 'w') as f:
        json.dump(json_data, f, indent=2)
    
    print(f"✅ Generated images.json with {len(image_files)} images:")
    for img in image_files:
        print(f"   - {img}")
    
    if not image_files:
        print("⚠️  No images found in current directory!")
        print("   Place your images here and run this script again.")

if __name__ == "__main__":
    generate_images_json() 