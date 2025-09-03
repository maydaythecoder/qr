'use client';

import { useEffect, useState } from 'react';
import QRCodeShare from '@/components/QRInstagramShare';

interface UniversalQRProps {
  size?: number;
  title?: string;
  text?: string;
  className?: string;
}

export default function UniversalQR({
  size = 220,
  title = 'QR Code',
  text = 'Scan this QR code',
  className = ''
}: UniversalQRProps) {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div className={className}>
      <QRCodeShare url={url || 'about:blank'} title={title} text={text} size={size} />
    </div>
  );
}


