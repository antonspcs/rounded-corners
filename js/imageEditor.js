// Image editor functionality
import { processImage, socialMediaPresets } from './utils.js';

export class ImageEditor {
    constructor() {
        this.cropper = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Corner style selection
        document.getElementById('cornerStyle').addEventListener('change', () => {
            if (this.cropper) {
                this.updatePreview();
            }
        });

        // Radius slider
        document.getElementById('radiusSlider').addEventListener('input', () => {
            document.getElementById('radius').value = this.getRadius();
            this.updatePreview();
        });

        // Preset selection
        document.getElementById('presetSize').addEventListener('change', (e) => {
            const preset = socialMediaPresets[e.target.value];
            if (preset) {
                document.getElementById('width').value = preset.width;
                document.getElementById('height').value = preset.height;
                if (this.cropper) {
                    this.cropper.setAspectRatio(preset.width / preset.height);
                }
            }
        });
    }

    // Initialize cropper
    initCropper(imageSrc) {
        const cropperImage = document.getElementById('cropperImage');
        cropperImage.src = imageSrc;
        
        if (this.cropper) {
            this.cropper.destroy();
        }

        // Get dimensions
        const width = parseInt(document.getElementById('width').value);
        const height = parseInt(document.getElementById('height').value);

        this.cropper = new Cropper(cropperImage, {
            aspectRatio: width / height,
            viewMode: 1,
            responsive: true,
            restore: true,
            checkCrossOrigin: false,
            autoCropArea: 1,
            background: false,
            ready: () => {
                document.getElementById('processBtn').disabled = false;
                this.updatePreview();
            }
        });
    }

    // Get current radius value
    getRadius() {
        return parseInt(document.getElementById('radiusSlider').value);
    }

    // Process the image with current settings
    processImage() {
        if (!this.cropper) return null;

        const width = parseInt(document.getElementById('width').value);
        const height = parseInt(document.getElementById('height').value);
        
        const canvas = this.cropper.getCroppedCanvas({
            width: width,
            height: height
        });

        const options = {
            cornerStyle: document.getElementById('cornerStyle').value,
            radius: this.getRadius(),
            format: document.getElementById('format').value
        };

        return processImage(canvas, width, height, options);
    }

    // Update preview image
    updatePreview() {
        const preview = document.getElementById('previewImage');
        if (!preview) return;
        
        if (this.cropper) {
            const processed = this.processImage();
            if (processed) {
                preview.src = processed;
                preview.style.display = 'block';
            }
        }
    }

    // Get image metadata
    getImageMetadata() {
        return {
            dimensions: {
                width: parseInt(document.getElementById('width').value),
                height: parseInt(document.getElementById('height').value)
            },
            cornerStyle: document.getElementById('cornerStyle').value,
            radius: this.getRadius(),
            format: document.getElementById('format').value
        };
    }

    // Reset all settings to default
    reset() {
        document.getElementById('radiusSlider').value = 30;
        document.getElementById('radius').value = 30;
        document.getElementById('cornerStyle').value = 'rounded';
        document.getElementById('format').value = 'image/png';
        this.updatePreview();
    }
} 