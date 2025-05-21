// Gallery view handling
import { formatFileSize } from './utils.js';

export class Gallery {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.images = [];
        this.currentIndex = 0;
    }

    // Add a new image to the gallery
    addImage(imageData, metadata) {
        const imageInfo = {
            id: `img_${Date.now()}`,
            src: imageData,
            metadata: metadata
        };

        this.images.push(imageInfo);
        this.renderImage(imageInfo);
    }

    // Render a single image in the gallery
    renderImage(imageInfo) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'result-image-container fade-in';
        imgContainer.dataset.imageId = imageInfo.id;

        const img = document.createElement('img');
        img.src = imageInfo.src;
        img.className = 'result-image';
        img.onclick = () => this.showModal(imageInfo);

        const controls = document.createElement('div');
        controls.className = 'image-controls';

        // Download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-primary btn-sm';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadBtn.onclick = () => this.downloadImage(imageInfo);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ms-2';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => this.deleteImage(imageInfo.id);

        // Image info
        const info = document.createElement('div');
        info.className = 'image-info mt-2';
        info.innerHTML = `
            <small class="text-muted">
                ${imageInfo.metadata.dimensions.width} × ${imageInfo.metadata.dimensions.height}
                (${formatFileSize(imageInfo.metadata.size)})
            </small>
        `;

        controls.appendChild(downloadBtn);
        controls.appendChild(deleteBtn);
        imgContainer.appendChild(img);
        imgContainer.appendChild(controls);
        imgContainer.appendChild(info);

        this.container.appendChild(imgContainer);
    }

    // Show image in modal
    showModal(imageInfo) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        modal.style.display = 'flex';
        modalImg.src = imageInfo.src;
        
        this.currentIndex = this.images.findIndex(img => img.id === imageInfo.id);
        this.updateModalNavigation();
    }

    // Update modal navigation
    updateModalNavigation() {
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        
        prevBtn.style.display = this.currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = this.currentIndex < this.images.length - 1 ? 'block' : 'none';
    }

    // Navigate to previous/next image
    navigate(direction) {
        this.currentIndex += direction;
        if (this.currentIndex >= 0 && this.currentIndex < this.images.length) {
            const imageInfo = this.images[this.currentIndex];
            document.getElementById('modalImage').src = imageInfo.src;
            this.updateModalNavigation();
        }
    }

    // Download image
    downloadImage(imageInfo) {
        const link = document.createElement('a');
        link.href = imageInfo.src;
        link.download = `RH_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Delete image
    deleteImage(imageId) {
        const index = this.images.findIndex(img => img.id === imageId);
        if (index !== -1) {
            this.images.splice(index, 1);
            const element = this.container.querySelector(`[data-image-id="${imageId}"]`);
            if (element) {
                element.classList.add('fade-out');
                setTimeout(() => element.remove(), 500);
            }
        }
    }

    // Clear all images
    clear() {
        this.images = [];
        this.container.innerHTML = '';
    }
} 