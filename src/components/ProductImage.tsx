import React, { useState, useEffect } from 'react';

const originalMapping: Record<string, string> = {
  'retatrutide-2mg': 'Retatrutide Peptide.webp',
  'retatrutide-5mg': 'Retatrutide Peptide.webp',
  'retatrutide-10mg': 'Alluvi Analytical.webp',
  'retatrutide-15mg': 'Retatrutide Peptide.webp',
  'tirzepatide-5mg': 'Tirzepatide Peptide.webp',
  'tirzepatide-10mg': 'Tirzepatide Peptide.webp',
  'tirzepatide-15mg': 'Tirzepatide 15mg (Lyophilized Peptide).webp',
  'tirzepatide-20mg': 'Tirzepatide Peptide.webp',
  'semaglutide-2mg': 'Semaglutide Peptide.png',
  'semaglutide-5mg': 'Semaglutide Peptide.png',
  'semaglutide-10mg': 'Semaglutide 10mg (Lyophilized Peptide).webp',
  'bpc-157-5mg': 'BPC-157 Peptide.jpg',
  'bpc-157-10mg': 'BPC-157 10mg (Lyophilized Peptide).webp',
  'bpc-157-15mg': 'BPC-157 Peptide.jpg',
  'tb-500-2mg': 'TB-500 Peptide (Thymosin Beta-4).jpg',
  'tb-500-5mg': 'TB-500 Peptide (Thymosin Beta-4).jpg',
  'tb-500-10mg': 'TB-500 10mg (Lyophilized Peptide).webp',
  'cjc-1295-nodac-5mg': 'CJC-1295 Peptide (No DAC).jpg',
  'cjc-1295-wdac-5mg': 'CJC-1295 Peptide (No DAC).jpg',
  'ipamorelin-5mg': 'Ipamorelin 5mg (Lyophilized Peptide).avif',
  'ipamorelin-10mg': 'Ipamorelin Peptide.jpg',
  'ghk-cu-50mg': 'GHK-Cu Peptide.webp',
  'ghk-cu-100mg': 'GHK-Cu Peptide.webp',
  'melanotan-2-10mg': 'Melanotan II Peptide.webp',
  'pt-141-10mg': 'PT-141 Peptide (Bremelanotide).webp',
  'epitalon-10mg': 'Epitalon Peptide.jpg',
  'nad-plus-500mg': 'NAD+ 500mg (Lyophilized Vial).webp',
  'igf-1-lr3-1mg': 'Multi-Peptide + Copper Peptides.webp',
  'hgh-fragment-176-191-5mg': 'HGH Frag 176-191 5mg.webp',
  'tesamorelin-5mg': 'Tesamorelin.webp'
};

const kebabMapping: Record<string, string> = {
  'retatrutide-2mg': 'retatrutide-peptide.webp',
  'retatrutide-5mg': 'retatrutide-peptide.webp',
  'retatrutide-10mg': 'alluvi-analytical.webp',
  'retatrutide-15mg': 'retatrutide-peptide.webp',
  'tirzepatide-5mg': 'tirzepatide-peptide.webp',
  'tirzepatide-10mg': 'tirzepatide-peptide.webp',
  'tirzepatide-15mg': 'tirzepatide-15mg-lyophilized-peptide.webp',
  'tirzepatide-20mg': 'tirzepatide-peptide.webp',
  'semaglutide-2mg': 'semaglutide-peptide.png',
  'semaglutide-5mg': 'semaglutide-peptide.png',
  'semaglutide-10mg': 'semaglutide-10mg-lyophilized-peptide.webp',
  'bpc-157-5mg': 'bpc-157-peptide.jpg',
  'bpc-157-10mg': 'bpc-157-10mg-lyophilized-peptide.webp',
  'bpc-157-15mg': 'bpc-157-peptide.jpg',
  'tb-500-2mg': 'tb-500-peptide-thymosin-beta-4.jpg',
  'tb-500-5mg': 'tb-500-peptide-thymosin-beta-4.jpg',
  'tb-500-10mg': 'tb-500-10mg-lyophilized-peptide.webp',
  'cjc-1295-nodac-5mg': 'cjc-1295-peptide-no-dac.jpg',
  'cjc-1295-wdac-5mg': 'cjc-1295-peptide-no-dac.jpg',
  'ipamorelin-5mg': 'ipamorelin-5mg-lyophilized-peptide.avif',
  'ipamorelin-10mg': 'ipamorelin-peptide.jpg',
  'ghk-cu-50mg': 'ghk-cu-peptide.webp',
  'ghk-cu-100mg': 'ghk-cu-peptide.webp',
  'melanotan-2-10mg': 'melanotan-ii-peptide.webp',
  'pt-141-10mg': 'pt-141-peptide-bremelanotide.webp',
  'epitalon-10mg': 'epitalon-peptide.jpg',
  'nad-plus-500mg': 'nad-500mg-lyophilized-vial.webp',
  'igf-1-lr3-1mg': 'multi-peptide-copper-peptides.webp',
  'hgh-fragment-176-191-5mg': 'hgh-frag-176-191-5mg.webp',
  'tesamorelin-5mg': 'tesamorelin.webp'
};

interface ProductImageProps {
  productId: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackSvg?: string;
}

export function ProductImage({ productId, alt, className = '', loading = 'lazy', fallbackSvg }: ProductImageProps) {
  const origName = originalMapping[productId] || '';
  const kebabName = kebabMapping[productId] || '';

  // Candidates list
  const getCandidates = () => {
    const list: string[] = [];
    
    // 1. Lowercase shop-page folder + kebab name - CLEANEST, CASE-SAFE, SPACE-SAFE, RELATIVE (Instant 1st-try load on Cloudflare)
    if (kebabName) {
      list.push(`shop-page/${kebabName}`);
      list.push(`/shop-page/${kebabName}`);
    }
    
    // 2. Capitalized Shop%20Page folder + original name (encoded) - Legacy fallback (Relative first)
    if (origName) {
      const encodedOrig = origName.replace(/ /g, '%20').replace(/\+/g, '%2B');
      list.push(`Shop%20Page/${encodedOrig}`);
      list.push(`Shop Page/${encodedOrig}`);
      list.push(`/Shop%20Page/${encodedOrig}`);
      list.push(`/Shop Page/${encodedOrig}`);
      
      // Unencoded / space-fallback (Relative first)
      list.push(`Shop%20Page/${origName}`);
      list.push(`Shop Page/${origName}`);
      list.push(`/Shop%20Page/${origName}`);
      list.push(`/Shop Page/${origName}`);
    }
    
    // 3. Capitalized Shop%20Page folder + kebab name (Relative first)
    if (kebabName) {
      list.push(`Shop%20Page/${kebabName}`);
      list.push(`Shop Page/${kebabName}`);
      list.push(`/Shop%20Page/${kebabName}`);
      list.push(`/Shop Page/${kebabName}`);
    }
    
    // 4. Lowercase shop-page folder + original name (encoded) (Relative first)
    if (origName) {
      const encodedOrig = origName.replace(/ /g, '%20').replace(/\+/g, '%2B');
      list.push(`shop-page/${encodedOrig}`);
      list.push(`/shop-page/${encodedOrig}`);
    }

    // 5. If there is a fallback SVG provided from the products database
    if (fallbackSvg) {
      list.push(fallbackSvg);
    }
    
    return list;
  };

  const candidates = getCandidates();
  const [candidateIndex, setCandidateIndex] = useState(0);

  // If productId changes, reset index to 0
  useEffect(() => {
    setCandidateIndex(0);
  }, [productId]);

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex(prev => prev + 1);
    }
  };

  const currentSrc = candidates[candidateIndex] || fallbackSvg;

  if (currentSrc && currentSrc.startsWith('data:image/svg+xml')) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={loading}
      referrerPolicy="no-referrer"
    />
  );
}
