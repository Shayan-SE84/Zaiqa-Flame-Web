import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function FoodImage({ src, alt, className = '', loading = 'lazy' }: FoodImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#3B0A0D] text-white/80 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#FEA619] mb-2" aria-hidden="true" />
        <span className="text-xs font-medium text-white/90 line-clamp-2 max-w-[180px]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
