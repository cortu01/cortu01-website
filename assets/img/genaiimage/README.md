# GenAI Art Gallery

This folder contains AI-generated artwork that will be displayed on the GenAI Art page.

## How to Add Images

1. **Place your images** in this folder (`src/assets/img/genaiimage/`)
2. **Supported formats**: JPG, JPEG, PNG, GIF, WebP
3. **Recommended size**: 800x600 pixels or larger for good quality
4. **File naming**: Use descriptive names (e.g., `ai-landscape-2024.jpg`)

## Adding Images to the Gallery

To display your images on the GenAI Art page, you need to update the `gallery.js` file:

1. Open `src/assets/js/gallery.js`
2. Find the section with example code (around line 85-90)
3. Uncomment and modify the example lines:

```javascript
// Example of how to add images (uncomment and modify as needed):
gallery.addImage('your-image.jpg', 'Your Image Title', 'Description of your AI-generated artwork.');
gallery.addImage('another-image.png', 'Another Title', 'Another description.');
```

## Image Guidelines

- **Quality**: Use high-resolution images for best display
- **Content**: Only include AI-generated artwork that you have permission to share
- **Descriptions**: Write clear, descriptive titles and descriptions
- **Attribution**: If the AI tool used is relevant, mention it in the description

## Gallery Features

- **Responsive grid layout**: Automatically adjusts to screen size
- **Lightbox viewing**: Click any image to view it in full size
- **Lazy loading**: Images load as needed for better performance
- **Hover effects**: Subtle animations on image cards

## Example Entry

```javascript
gallery.addImage(
    'neural-landscape.jpg', 
    'Neural Network Landscape', 
    'A dreamlike landscape generated using a neural network trained on classical landscape paintings. Created with StyleGAN2.'
);
```

## Troubleshooting

- **Images not showing**: Check that the file path in `gallery.js` matches your actual filename
- **Broken images**: Ensure the image file exists in the correct folder
- **Layout issues**: Make sure images are in a supported format and have reasonable dimensions 