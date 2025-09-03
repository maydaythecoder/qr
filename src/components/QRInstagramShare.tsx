'use client';

import { useRef, useState, useEffect } from 'react';
import { useQRCode } from 'next-qrcode';

/**
 * QRCodeShare Component
 * 
 * Generates a QR code from a URL and provides functionality to share it to multiple platforms
 * including Instagram, LinkedIn, Snapchat, and download functionality.
 * 
 * @param {Object} props
 * @param {string} props.url - The URL to encode into the QR code
 * @param {string} [props.title] - Optional title for the share dialog
 * @param {string} [props.text] - Optional text description for the share dialog
 * @param {number} [props.size] - QR code size in pixels (default: 200)
 * @param {string} [props.className] - Optional CSS classes for styling
 */
interface QRCodeShareProps {
  url: string;
  title?: string;
  text?: string;
  size?: number;
  className?: string;
}

export default function QRCodeShare({
  url,
  title = 'QR Code',
  text = 'Scan this QR code',
  size = 200,
  className = ''
}: QRCodeShareProps) {
  const { Canvas } = useQRCode();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWebShareAPI, setHasWebShareAPI] = useState<boolean | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Check for Web Share API support on client-side only
  useEffect(() => {
    setHasWebShareAPI('share' in navigator);
  }, []);

  /**
   * Handles sharing the QR code using Web Share API
   */
  const handleWebShare = async () => {
    setIsSharing(true);
    setError(null);

    try {
      const canvasElement = canvasRef.current?.querySelector('canvas');
      if (!canvasElement) {
        throw new Error('QR code canvas not found');
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasElement.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, 'image/png', 0.9);
      });

      const file = new File([blob], 'qrcode.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text,
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        setError('Sharing was cancelled or not allowed. Try again or use the download option.');
      } else if (errorMessage.includes('AbortError')) {
        setError('Sharing was cancelled by the user.');
      } else if (errorMessage.includes('Web Share API not supported')) {
        setError('Sharing not supported on this device. Use download option instead.');
      } else {
        setError(errorMessage);
      }
      
      console.error('Share error:', err);
    } finally {
      setIsSharing(false);
    }
  };

  /**
   * Downloads the QR code as a PNG file
   */
  const downloadQRCode = async () => {
    try {
      const canvasElement = canvasRef.current?.querySelector('canvas');
      if (!canvasElement) {
        throw new Error('QR code canvas not found');
      }

      const dataUrl = canvasElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download QR code');
      console.error('Download error:', err);
    }
  };

  /**
   * Opens LinkedIn sharing dialog
   */
  const shareToLinkedIn = () => {
    try {
      // LinkedIn only reliably supports the 'url' param for offsite sharing
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      window.open(linkedInUrl, '_blank');

      // Try to copy suggested text (like Twitter template) to clipboard
      const composedText = `${text || title || ''}${text || title ? ' ' : ''}${url}`.trim();
      const tryClipboard = async () => {
        try {
          if (navigator.clipboard && composedText.length > 0) {
            await navigator.clipboard.writeText(composedText);
            return true;
          }
        } catch (e) {
          // ignore clipboard errors
        }
        return false;
      };

      void tryClipboard().then((copied) => {
        // Also download the QR PNG so the user can attach it to the post
        const canvasElement = canvasRef.current?.querySelector('canvas');
        if (canvasElement) {
          const dataUrl = canvasElement.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `qrcode-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setError(
            copied
              ? 'LinkedIn opened. Text copied to clipboard and QR image downloaded.'
              : 'LinkedIn opened. QR image downloaded. Paste your text manually if needed.'
          );
        } else {
          setError(
            copied
              ? 'LinkedIn opened. Text copied to clipboard. Click Download to save the QR image.'
              : 'LinkedIn opened. Click Download to save the QR image and paste your text.'
          );
        }
      });
    } catch (err) {
      setError('Failed to open LinkedIn');
      console.error('LinkedIn share error:', err);
    }
  };

  /**
   * Opens Twitter share intent
   */
  const shareToTwitter = () => {
    try {
      const params = new URLSearchParams();
      params.set('url', url);
      if (text || title) params.set('text', text || title);
      const twitterUrl = `https://twitter.com/intent/tweet?${params.toString()}`;
      window.open(twitterUrl, '_blank');
    } catch (err) {
      setError('Failed to open Twitter');
      console.error('Twitter share error:', err);
    }
  };

  /**
   * Opens Snapchat sharing (mobile only)
   */
  const shareToSnapchat = () => {
    try {
      // Snapchat sharing works best with Web Share API on mobile
      if (hasWebShareAPI) {
        handleWebShare();
      } else {
        // Fallback: download and suggest manual sharing
        downloadQRCode();
        setError('Snapchat sharing requires mobile device. QR code downloaded for manual sharing.');
      }
    } catch (err) {
      setError('Failed to share to Snapchat');
      console.error('Snapchat share error:', err);
    }
  };

  /**
   * Toggles the share options menu
   */
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
    setError(null);
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

      {/* Main Share Button */}
      <button
        onClick={toggleShareOptions}
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
            Share QR Code
          </span>
        )}
      </button>

      {/* Share Options Menu */}
      {showShareOptions && !isSharing && (
        <div className="flex flex-wrap gap-2 justify-center">
          {/* Instagram/General Share */}
          {hasWebShareAPI && (
            <button
              onClick={handleWebShare}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
            >
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Instagram & More
              </span>
            </button>
          )}

          {/* LinkedIn */}
          <button
            onClick={shareToLinkedIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
              LinkedIn
            </span>
          </button>

          {/* Twitter */}
          <button
            onClick={shareToTwitter}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 1200 1227" aria-hidden="true">
                <path d="M361.215 148.635h284.124L600.936 423.41l201.42-274.775h305.11L808.57 579.832l309.316 498.318H829.203L600.936 779.352 365.31 1078.15H60.2l320.83-504.14L82.973 148.636h278.242Zm-48.14 87.22 702.498 844.548h77.764L396.06 235.855h-83.0Z" fill="currentColor"/>
              </svg>
              Twitter
            </span>
          </button>

          {/* Snapchat */}
          <button
            onClick={shareToSnapchat}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm"
          >
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Snapchat
            </span>
          </button>

          {/* Download */}
          <button
            onClick={downloadQRCode}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Download
            </span>
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-600 text-sm text-center max-w-xs">
          {error}
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-600 text-center max-w-xs">
        {hasWebShareAPI === null ? (
          <p>Loading...</p>
        ) : hasWebShareAPI ? (
          <p>Tap to share to Instagram, LinkedIn, Twitter, Snapchat, or download</p>
        ) : (
          <p>Tap to share to LinkedIn, Twitter or download the QR code image</p>
        )}
      </div>
    </div>
  );
}
