# Firebase Deployment Guide

## Overview

This guide explains how to deploy the QR Code Generator & Instagram Share application to Firebase Hosting.

## Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created and configured
- Firebase project ID: `qrcode-d276d`

## Configuration Files

### firebase.json

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

## Deployment Steps

### 1. Build the Application

```bash
npm run build
```

This creates a static export in the `out` directory.

### 2. Deploy to Firebase

```bash
firebase deploy
```

### 3. One-Command Deployment

```bash
npm run deploy
```

This runs both build and deploy in sequence.

## Deployment URLs

- **Main Site**: <https://qrcode-d276d.web.app>
- **Test Page**: <https://qrcode-d276d.web.app/test/>
- **Firebase Console**: <https://console.firebase.google.com/project/qrcode-d276d/overview>

## Static Export Configuration

The application is configured for static export to work with Firebase Hosting:

- **Output Directory**: `out/` (specified in firebase.json)
- **Trailing Slash**: Enabled for better routing
- **Image Optimization**: Disabled for static export
- **Client-Side Routing**: Handled by Firebase rewrites

## Features After Deployment

✅ **QR Code Generation**: Works on all deployed pages
✅ **Instagram Sharing**: Web Share API works on mobile devices
✅ **Download Fallback**: Works on desktop browsers
✅ **Responsive Design**: Optimized for all screen sizes
✅ **Error Handling**: Comprehensive error messages
✅ **Loading States**: Visual feedback during operations

## Testing the Deployed Application

### Mobile Testing

1. Open <https://qrcode-d276d.web.app> on your mobile device
2. Tap "Share to Instagram" on any QR code
3. Verify Instagram appears in the native share sheet
4. Test the sharing functionality

### Desktop Testing

1. Open <https://qrcode-d276d.web.app> in a desktop browser
2. Tap "Share to Instagram" on any QR code
3. Verify the image downloads automatically
4. Check the downloaded file quality

## Troubleshooting

### Build Issues

- Ensure all dependencies are installed: `npm install`
- Clear cache if needed: `rm -rf .next out`
- Check TypeScript errors: `npm run build`

### Deployment Issues

- Verify Firebase CLI is installed: `firebase --version`
- Check Firebase project configuration: `firebase projects:list`
- Ensure you're logged in: `firebase login`

### Performance Optimization

- The static export is optimized for fast loading
- All assets are minified and compressed
- CDN distribution via Firebase Hosting

## Continuous Deployment

For automatic deployments, consider setting up:

- GitHub Actions with Firebase deployment
- Vercel deployment (alternative to Firebase)
- Netlify deployment (alternative to Firebase)

## Security Considerations

- All processing happens client-side
- No server dependencies or API keys required
- Uses secure Web Share API with user consent
- No data persistence or tracking
- HTTPS enforced by Firebase Hosting
