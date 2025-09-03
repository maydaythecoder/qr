# QR Code Generator & Instagram Share

A Next.js application that generates QR codes from URLs and allows users to share them directly to Instagram using the Web Share API.

## Features

- **QR Code Generation**: Generate high-quality QR codes from any URL using the `next-qrcode` library
- **Instagram Sharing**: Share QR codes directly to Instagram using the native Web Share API
- **Smart Fallback**: Automatic download functionality for desktop browsers where Web Share API isn't available
- **Mobile-First Design**: Optimized for mobile devices with responsive UI
- **Error Handling**: Comprehensive error handling with user-friendly feedback
- **Loading States**: Visual feedback during sharing operations

## Technical Implementation

### Architecture

- **Frontend**: Next.js 14+ with App Router
- **QR Code Library**: `next-qrcode` for client-side QR code generation
- **Sharing Method**: Web Share API with fallback to download
- **Styling**: Tailwind CSS for responsive design

### Security Considerations

- All QR code generation happens client-side
- No server dependencies or API keys required
- Uses secure Web Share API with user consent
- No data persistence or tracking

## Installation

 Clone the repository:

```bash
git clone <repository-url>
cd qr
```

 Install dependencies:

```bash
npm install
```

 Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Component Usage

```tsx
import QRInstagramShare from '@/components/QRInstagramShare';

function MyPage() {
  return (
    <QRInstagramShare
      url="https://example.com"
      title="My Website"
      text="Check out my website!"
      size={200}
    />
  );
}
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | **required** | The URL to encode into the QR code |
| `title` | `string` | `'QR Code'` | Title for the share dialog |
| `text` | `string` | `'Scan this QR code'` | Text description for the share dialog |
| `size` | `number` | `200` | QR code size in pixels |
| `className` | `string` | `''` | Optional CSS classes for styling |

## How It Works

### QR Code Generation

1. Uses the `next-qrcode` library to generate QR codes on a canvas element
2. Configurable error correction level (Medium by default)
3. Optimized for mobile scanning with appropriate margins and scaling

### Instagram Sharing Process

1. **Canvas to Image**: Converts the QR code canvas to a PNG blob
2. **File Creation**: Creates a File object with `.igo` extension (hint for iOS Instagram)
3. **Web Share API**: Uses `navigator.share()` to open native share sheet
4. **User Selection**: User can choose Instagram from available sharing options
5. **Fallback**: Downloads image if Web Share API is unavailable

### Browser Compatibility

| Browser | Web Share API | Fallback |
|---------|---------------|----------|
| iOS Safari | ✅ | Download |
| Android Chrome | ✅ | Download |
| Desktop Chrome | ❌ | Download |
| Desktop Firefox | ❌ | Download |
| Desktop Safari | ❌ | Download |

## Testing

### Mobile Testing

1. **iOS Safari**:
   - Open the app on iPhone/iPad
   - Tap "Share to Instagram"
   - Verify Instagram appears in share sheet
   - Test sharing functionality

2. **Android Chrome**:
   - Open the app on Android device
   - Tap "Share to Instagram"
   - Verify Instagram appears in share sheet
   - Test sharing functionality

### Desktop Testing

1. **Download Fallback**:
   - Open the app in desktop browser
   - Tap "Share to Instagram"
   - Verify image downloads automatically
   - Check downloaded file quality

### Error Scenarios

1. **Network Issues**: Test with poor connectivity
2. **Browser Limitations**: Test on older browsers
3. **User Cancellation**: Cancel share dialog and verify error handling

## Development

### Project Structure

``` txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── QRInstagramShare.tsx
└── ...
```

### Key Files

- `src/components/QRInstagramShare.tsx`: Main component with sharing logic
- `src/app/page.tsx`: Demo page showcasing the component
- `package.json`: Dependencies including `next-qrcode`

### Adding New Features

1. **Custom QR Code Styles**: Modify the `options` object in the Canvas component
2. **Additional Sharing Options**: Extend the share dialog with more platforms
3. **Analytics**: Add tracking for share events (with user consent)
4. **QR Code History**: Implement local storage for recently generated codes

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Configure custom domain if needed

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## Troubleshooting

### Common Issues

1. **Web Share API Not Working**
   - Ensure you're testing on HTTPS (required for Web Share API)
   - Check browser compatibility
   - Verify user interaction (must be triggered by user action)

2. **QR Code Not Generating**
   - Check console for JavaScript errors
   - Verify URL format is valid
   - Ensure `next-qrcode` is properly installed

3. **Instagram Not Appearing in Share Sheet**
   - Verify Instagram app is installed on device
   - Check if device supports file sharing
   - Try sharing to other apps to verify Web Share API works

### Debug Mode

Add `console.log` statements in the `handleShare` function to debug:

```tsx
console.log('Web Share API available:', !!navigator.share);
console.log('Can share files:', navigator.canShare?.({ files: [file] }));
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Resources

- [Web Share API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [next-qrcode Library](https://www.npmjs.com/package/next-qrcode)
- [Next.js Documentation](https://nextjs.org/docs)
- [Instagram Sharing Guidelines](https://developers.facebook.com/docs/instagram-api/)
