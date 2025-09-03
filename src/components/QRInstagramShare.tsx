'use client';

import { useRef, useState } from 'react';
import { useQRCode } from 'next-qrcode';

/**
 * QRInstagramShare Component
 * 
 * Generates a QR code from a URL and provides functionality to share it to Instagram
 * using the Web Share API with fallback to download.
 * 
 * @param {Object} props
 * @param {string} props.url - The URL to encode into the QR code
 * @param {string} [props.title] - Optional title for the share dialog
 * @param {string} [props.text] - Optional text description for the share dialog
 * @param {number} [props.size] - QR code size in pixels (default: 200)
 * @param {string} [props.className] - Optional CSS classes for styling
 */
interface QRInstagramShareProps {
  url: string;
  title?: string;
  text?: string;
  size?: number;
  className?: string;
}

export default function QRInstagramShare({
  url,
  title = 'QR Code',
  text = 'Scan this QR code',
  size = 200,
  className = ''
}: QRInstagramShareProps) {
  const { Canvas } = useQRCode();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles sharing the QR code to Instagram or other apps
   * Uses Web Share API with fallback to download
   */
  const handleShare = async () => {
    setIsSharing(true);
    setError(null);

    try {
      // Get canvas element
      const canvasElement = canvasRef.current?.querySelector('canvas');
      if (!canvasElement) {
        throw new Error('QR code canvas not found');
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasElement.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, 'image/png', 0.9);
      });

      // Create file with .igo extension (hint for iOS Instagram)
      const file = new File([blob], 'qrcode.igo', { type: 'image/png' });

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        // Use Web Share API
        await navigator.share({
          files: [file],
          title,
          text,
        });
      } else {
        // Fallback: Download the image
        await downloadQRCode(canvasElement);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Share error:', err);
    } finally {
      setIsSharing(false);
    }
  };

  /**
   * Downloads the QR code as a PNG file
   * @param canvas - The canvas element containing the QR code
   */
  const downloadQRCode = async (canvas: HTMLCanvasElement) => {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      throw new Error('Failed to download QR code');
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg ${className}`}>
      {/* QR Code Display */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">QR Code</h3>
        <div 
          ref={canvasRef}
          className="border-2 border-gray-200 rounded-lg p-4 bg-white"
        >
          <Canvas
            text={url}
            options={{
              errorCorrectionLevel: 'M',
              margin: 2,
              scale: 4,
              width: size,
              color: {
                dark: '#000000',
                light: '#FFFFFF',
              },
            }}
          />
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`
          px-6 py-3 rounded-full font-medium text-white transition-all duration-200
          ${isSharing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg active:scale-95'
          }
        `}
      >
        {isSharing ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sharing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share to Instagram
          </span>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="text-red-600 text-sm text-center max-w-xs">
          {error}
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-600 text-center max-w-xs">
        {typeof window !== 'undefined' && 'share' in navigator ? (
          <p>Tap to share directly to Instagram or other apps</p>
        ) : (
          <p>Tap to download the QR code image</p>
        )}
      </div>
    </div>
  );
}
