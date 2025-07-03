// Gallery functionality for GenAI Art page
class ImageGallery {
    constructor(containerId, imageFolder) {
        console.log('ImageGallery constructor called with:', containerId, imageFolder);
        this.container = document.getElementById(containerId);
        console.log('Container found:', this.container);
        this.imageFolder = imageFolder;
        this.images = [];
    }

    // Add an image to the gallery
    addImage(filename, title, description) {
        console.log('Adding image:', filename, title, description);
        const imageData = {
            src: `${this.imageFolder}/${filename}`,
            title: title,
            description: description
        };
        this.images.push(imageData);
        this.renderImage(imageData);
    }

    // Render a single image
    renderImage(imageData) {
        console.log('Rendering image:', imageData);
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.title}" loading="lazy">
            <div class="caption">
                <h3>${imageData.title}</h3>
                <p>${imageData.description}</p>
            </div>
        `;
        
        // Add click handler for lightbox functionality
        item.addEventListener('click', () => this.openLightbox(imageData));
        
        this.container.appendChild(item);
        console.log('Image added to container');
    }

    // Open lightbox for image viewing
    openLightbox(imageData) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="${imageData.src}" alt="${imageData.title}">
                <div class="lightbox-caption">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox functionality
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('close')) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }
        });
    }

    // Clear the gallery
    clear() {
        this.container.innerHTML = '';
        this.images = [];
    }

    // Show placeholder message
    showPlaceholder() {
        this.clear();
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-message';
        placeholder.innerHTML = `
            <h3>GenAI Art Gallery</h3>
            <p>This gallery will display your AI-generated artwork.</p>
            <p><strong>To add images:</strong></p>
            <ol style="text-align: left; max-width: 400px; margin: 1rem auto;">
                <li>Place your images in the <code>src/assets/img/genaiimage/</code> folder</li>
                <li>Uncomment and modify the lines in gallery.js</li>
                <li>Add your image filename, title, and description</li>
            </ol>
        `;
        this.container.appendChild(placeholder);
    }
}

// Initialize gallery when DOM is loaded
console.log('Gallery.js is loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded!');
    
    const container = document.getElementById('galleryGrid');
    console.log('Container:', container);
    
    if (container) {
        container.innerHTML = '<div style="background: red; color: white; padding: 20px;">JavaScript is working! Your images should appear here.</div>';
        
        // Add the images
        const image1 = document.createElement('div');
        image1.className = 'gallery-item';
        image1.innerHTML = `
            <img src="../assets/img/genaiimage/CastingShadows.png" alt="Casting Shadows" style="width: 100%; height: 250px; object-fit: cover;">
            <div class="caption">
                <h3>Casting Shadows</h3>
                <p>AI-generated artwork exploring light and shadow patterns.</p>
            </div>
        `;
        container.appendChild(image1);
        
        const image2 = document.createElement('div');
        image2.className = 'gallery-item';
        image2.innerHTML = `
            <img src="../assets/img/genaiimage/Image 42.jpg" alt="AI Generated Image 42" style="width: 100%; height: 250px; object-fit: cover;">
            <div class="caption">
                <h3>AI Generated Image 42</h3>
                <p>A creative piece generated using artificial intelligence techniques.</p>
            </div>
        `;
        container.appendChild(image2);
        
        console.log('Images added!');
    } else {
        console.log('Container not found!');
    }
}); 