import React from 'react';

interface ProductImageProps {
  productId: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackSvg?: string;
}

export function ProductImage({ productId, alt, className = '', loading = 'lazy', fallbackSvg }: ProductImageProps) {
  // Use the beautifully generated SVG data URI as the primary clean-slate source
  const src = fallbackSvg || '';

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
    />
  );
}
