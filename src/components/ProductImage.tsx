import React, { useState, useEffect } from 'react';

interface ProductImageProps {
  productId: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackSvg?: string;
  src?: string;
}

export function ProductImage({ productId, alt, className = '', loading = 'lazy', fallbackSvg, src }: ProductImageProps) {
  const initialSrc = src || fallbackSvg || '';
  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSvg || '');
  }, [src, fallbackSvg]);

  const handleError = () => {
    // If the primary image path fails to load, gracefully fall back to the beautifully generated SVG
    if (fallbackSvg && imgSrc !== fallbackSvg) {
      setImgSrc(fallbackSvg);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
}
