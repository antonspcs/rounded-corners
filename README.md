# Modern Image Corner Rounder

A static website for image manipulation with modern features. Upload images and customize their corners with various styles and effects.

## Features
- Modern UI with Tailwind CSS
- Multiple corner styles (rounded, beveled, scalloped)
- Drag and drop image upload
- Image gallery view
- Social media preset sizes
- Advanced image cropping
- Download in multiple formats
- Mobile responsive design

## Project Structure
```
/
├── index.html          # Main HTML file
├── css/               
│   ├── style.css      # Custom styles
│   └── tailwind.css   # Generated Tailwind CSS
├── js/
│   ├── app.js         # Main application logic
│   ├── imageEditor.js  # Image editing features
│   ├── gallery.js     # Gallery view handling
│   └── utils.js       # Utility functions
└── assets/
    └── icons/         # UI icons and images
```

## Setup
1. Install dependencies:
```bash
npm install
```

2. Build CSS:
```bash
npm run build:css
```

3. Deploy:
Just push to GitHub - it's all static!