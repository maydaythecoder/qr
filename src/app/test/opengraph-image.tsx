export const dynamic = 'force-static';
import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 627,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          color: '#ffffff',
          position: 'relative',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '2px solid rgba(255,255,255,0.12)',
            borderRadius: 24,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 88,
              height: 88,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(236,72,153,0.35)',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 20 20" fill="#fff">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -0.5 }}>QR Code Sharing</div>
            <div style={{ fontSize: 28, opacity: 0.9 }}>Test Page</div>
          </div>
        </div>

        <div style={{ marginTop: 28, opacity: 0.9, fontSize: 26 }}>
          Share across LinkedIn, Twitter, Instagram, Snapchat
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


