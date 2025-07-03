#!/usr/bin/env python3
"""
Generate image lists for gallery pages.
This script scans image directories and creates JSON files with image lists.
"""

import os
import json
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

def main():
    """Main function to generate image lists for both galleries."""
    # Get the script directory
    script_dir = Path(__file__).parent
    
    # Generate list for AI Art Exhibition
    ai_art_dir = script_dir / "src" / "assets" / "img" / "ai-art-exhibition"
    ai_art_output = ai_art_dir / "images.json"
    generate_image_list(ai_art_dir, ai_art_output)
    
    # Generate list for LeRobot Hackathon
    lerobot_dir = script_dir / "src" / "assets" / "img" / "lerobot-hackathon"
    lerobot_output = lerobot_dir / "images.json"
    generate_image_list(lerobot_dir, lerobot_output)

if __name__ == "__main__":
    main() 