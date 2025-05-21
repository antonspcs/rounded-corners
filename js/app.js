// Main application logic
import { ImageEditor } from './imageEditor.js';
import { Gallery } from './gallery.js';
import { generateUniqueFileName } from './utils.js';

class App {
    constructor() {
        this.imageEditor = new ImageEditor();
        this.gallery = new Gallery('results');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // File input handling
        const fileInput = document.getElementById('imageInput');
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

        // Drag and drop handling
        const dropArea = document.getElementById('drop-area');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'));
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'));
        });

        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFileSelect(files);
        });

        // Process button
        document.getElementById('processBtn').addEventListener('click', () => this.processImage());

        // Modal close button
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('imageModal').style.display = 'none';
        });

        // Modal navigation
        document.getElementById('prevImage').addEventListener('click', () => this.gallery.navigate(-1));
        document.getElementById('nextImage').addEventListener('click', () => this.gallery.navigate(1));

        // Clear gallery button
        document.getElementById('clearGallery').addEventListener('click', () => this.gallery.clear());

        // Reset settings button
        document.getElementById('resetSettings').addEventListener('click', () => this.imageEditor.reset());
    }

    handleFileSelect(files) {
        if (files.length === 0) return;

        const file = files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.imageEditor.initCropper(e.target.result);
            document.getElementById('cropperContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    processImage() {
        const processedImage = this.imageEditor.processImage();
        if (processedImage) {
            this.gallery.addImage(processedImage, this.imageEditor.getImageMetadata());
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 