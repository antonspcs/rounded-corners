// Utility functions for image processing

// Process image with various corner styles
export function processImage(img, width, height, options) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Apply corner style based on options
    switch(options.cornerStyle) {
        case 'rounded':
            drawRoundedCorners(ctx, width, height, options.radius);
            break;
        case 'beveled':
            drawBeveledCorners(ctx, width, height, options.radius);
            break;
        case 'scalloped':
            drawScallopedCorners(ctx, width, height, options.radius);
            break;
        default:
            drawRoundedCorners(ctx, width, height, options.radius);
    }

    ctx.clip();
    ctx.drawImage(img, 0, 0, width, height);

    // Apply any additional effects
    if (options.effects) {
        applyEffects(ctx, options.effects);
    }

    return canvas.toDataURL(options.format || 'image/png');
}

// Draw rounded corners
function drawRoundedCorners(ctx, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
}

// Draw beveled corners
function drawBeveledCorners(ctx, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.lineTo(width, radius);
    ctx.lineTo(width, height - radius);
    ctx.lineTo(width - radius, height);
    ctx.lineTo(radius, height);
    ctx.lineTo(0, height - radius);
    ctx.lineTo(0, radius);
    ctx.closePath();
}

// Draw scalloped corners
function drawScallopedCorners(ctx, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.arc(width - radius, radius, radius, -Math.PI/2, 0);
    ctx.lineTo(width, height - radius);
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI/2);
    ctx.lineTo(radius, height);
    ctx.arc(radius, height - radius, radius, Math.PI/2, Math.PI);
    ctx.lineTo(0, radius);
    ctx.arc(radius, radius, radius, Math.PI, -Math.PI/2);
    ctx.closePath();
}

// Apply additional effects to the image
function applyEffects(ctx, effects) {
    if (effects.brightness) {
        applyBrightness(ctx, effects.brightness);
    }
    if (effects.contrast) {
        applyContrast(ctx, effects.contrast);
    }
    if (effects.saturation) {
        applySaturation(ctx, effects.saturation);
    }
}

// Get common social media image sizes
export const socialMediaPresets = {
    'Instagram Square': { width: 1080, height: 1080 },
    'Instagram Story': { width: 1080, height: 1920 },
    'Facebook Post': { width: 1200, height: 630 },
    'Twitter Post': { width: 1200, height: 675 },
    'LinkedIn Post': { width: 1200, height: 627 },
    'YouTube Thumbnail': { width: 1280, height: 720 }
};

// Format file size
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate unique filename
export function generateUniqueFileName(originalName) {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `RH_${timestamp}_${random}.${extension}`;
} 