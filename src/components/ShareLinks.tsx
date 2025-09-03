'use client';

import { useEffect, useState } from 'react';

interface ShareLinksProps {
  text?: string;
  hashtags?: string[];
  className?: string;
}

export default function ShareLinks({
  text = 'Check this out',
  hashtags = [],
  className = ''
}: ShareLinksProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const linkedInHref = currentUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    : '#';

  const twitterParams = new URLSearchParams();
  if (currentUrl) twitterParams.set('url', currentUrl);
  if (text) twitterParams.set('text', text);
  if (hashtags.length > 0) twitterParams.set('hashtags', hashtags.join(','));
  const twitterHref = currentUrl ? `https://twitter.com/intent/tweet?${twitterParams.toString()}` : '#';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
        </svg>
        LinkedIn
      </a>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors text-sm"
        aria-label="Share on Twitter"
      >
        <svg className="h-4 w-4" viewBox="0 0 1200 1227" aria-hidden="true">
          <path d="M361.215 148.635h284.124L600.936 423.41l201.42-274.775h305.11L808.57 579.832l309.316 498.318H829.203L600.936 779.352 365.31 1078.15H60.2l320.83-504.14L82.973 148.636h278.242Zm-48.14 87.22 702.498 844.548h77.764L396.06 235.855h-83.0Z" fill="currentColor"/>
        </svg>
        Twitter
      </a>
    </div>
  );
}


