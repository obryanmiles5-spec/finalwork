import { Product } from '../types';
import { products as csvProducts } from './csv_products';

// Helper to generate a modern scientific SVG vial representation
export function getPeptideSvg(color: string, capColor: string, label: string, mg: string): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23f4f8f8" />
        <stop offset="100%" stop-color="%23e3eded" />
      </linearGradient>
      <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.8"/>
        <stop offset="20%" stop-color="%23ffffff" stop-opacity="0.3"/>
        <stop offset="60%" stop-color="%23e0f2f1" stop-opacity="0.2"/>
        <stop offset="90%" stop-color="%23ffffff" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="%23ffffff" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${capColor.replace('#', '%23')}" />
        <stop offset="50%" stop-color="%23ffffff" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${capColor.replace('#', '%23')}" />
      </linearGradient>
      <linearGradient id="liquid" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="${color.replace('#', '%23')}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${color.replace('#', '%23')}" stop-opacity="0.2" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="%230f1a1c" flood-opacity="0.08" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(%23bg)" rx="24"/>
    
    <!-- Grid lines (scientific accent) -->
    <g stroke="%232e5b62" stroke-opacity="0.04" stroke-width="1">
      <line x1="40" y1="0" x2="40" y2="400" />
      <line x1="120" y1="0" x2="120" y2="400" />
      <line x1="200" y1="0" x2="200" y2="400" />
      <line x1="280" y1="0" x2="280" y2="400" />
      <line x1="360" y1="0" x2="360" y2="400" />
      <line x1="0" y1="80" x2="400" y2="80" />
      <line x1="0" y1="160" x2="400" y2="160" />
      <line x1="0" y1="240" x2="400" y2="240" />
      <line x1="0" y1="320" x2="400" y2="320" />
    </g>

    <!-- Lab shadow -->
    <ellipse cx="200" cy="355" rx="55" ry="10" fill="%23132c30" opacity="0.1" />

    <!-- Vial Body Group -->
    <g filter="url(%23shadow)">
      <!-- Liquid inside (freeze-dried powder cake) -->
      <path d="M 160,260 L 240,260 L 240,335 C 240,345 230,350 220,350 L 180,350 C 170,350 160,345 160,335 Z" fill="url(%23liquid)" opacity="0.85" />
      <path d="M 160,285 Q 200,280 240,285 L 240,335 Q 200,342 160,335 Z" fill="${color.replace('#', '%23')}" opacity="0.9" />
      
      <!-- Glass Vial container -->
      <!-- Neck & Lip -->
      <rect x="180" y="115" width="40" height="15" fill="url(%23glass)" rx="2"/>
      <path d="M 175,100 L 225,100 C 228,100 230,102 230,105 L 230,115 C 230,118 228,120 225,120 L 175,120 C 172,120 170,118 170,115 L 170,105 C 170,102 172,100 175,100 Z" fill="url(%23glass)" stroke="%23b0bec5" stroke-width="1"/>
      
      <!-- Main body -->
      <path d="M 175,130 L 225,130 C 235,130 245,140 245,155 L 245,335 C 245,348 235,353 222,353 L 178,353 C 165,353 155,348 155,335 L 155,155 C 155,140 165,130 175,130 Z" fill="url(%23glass)" stroke="%23ffffff" stroke-width="1.5"/>
      
      <!-- Colored Cap -->
      <path d="M 173,85 L 227,85 C 230,85 232,87 232,90 L 232,98 C 232,100 230,101 227,101 L 173,101 C 170,101 168,100 168,98 L 168,90 C 168,87 170,85 173,85 Z" fill="url(%23capGrad)" stroke="%23132c30" stroke-width="0.5"/>
      <rect x="175" y="78" width="50" height="7" fill="${capColor.replace('#', '%23')}" rx="2" />
      
      <!-- Lab Label on Vial -->
      <rect x="162" y="170" width="76" height="85" fill="%23ffffff" rx="4" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.06))"/>
      
      <!-- Label Details -->
      <!-- Top Accent Bar -->
      <rect x="162" y="170" width="76" height="10" fill="${color.replace('#', '%23')}" rx="1"/>
      
      <!-- Brand Name -->
      <text x="200" y="193" font-family="'Inter', sans-serif" font-weight="900" font-size="10" fill="%23132c30" text-anchor="middle">ALLUVI</text>
      
      <!-- Peptide Code -->
      <text x="200" y="210" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="8" fill="%232e5b62" text-anchor="middle" letter-spacing="1">${label}</text>
      
      <!-- Dose / Purity -->
      <text x="200" y="228" font-family="'Inter', sans-serif" font-weight="800" font-size="11" fill="%23111827" text-anchor="middle">${mg}</text>
      <text x="200" y="238" font-family="'Inter', sans-serif" font-weight="600" font-size="6" fill="%2310b981" text-anchor="middle">99.8% PURITY</text>
      
      <!-- Bottom warning bar -->
      <rect x="162" y="247" width="76" height="8" fill="%23132c30" rx="1"/>
      <text x="200" y="253" font-family="'Inter', sans-serif" font-weight="bold" font-size="4.5" fill="%23ffffff" text-anchor="middle" letter-spacing="0.2">RESEARCH ONLY</text>

      <!-- Liquid Highlight reflection -->
      <path d="M 158,180 Q 163,220 158,320" stroke="%23ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.4" fill="none"/>
    </g>

    <!-- Lab stamp badge on background -->
    <g transform="translate(320, 50)" opacity="0.8">
      <circle cx="15" cy="15" r="22" fill="none" stroke="${color.replace('#', '%23')}" stroke-dasharray="2,2" stroke-width="1"/>
      <text x="15" y="12" font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="%23132c30" text-anchor="middle">UK LAB</text>
      <text x="15" y="21" font-family="'Inter', sans-serif" font-weight="bold" font-size="6.5" fill="%2310b981" text-anchor="middle">TESTED</text>
    </g>
  </svg>`;
}

export function getCaseSvg(): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%231e293b" />
        <stop offset="100%" stop-color="%230f172a" />
      </linearGradient>
      <linearGradient id="caseMetal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%23475569" />
        <stop offset="50%" stop-color="%2364748b" />
        <stop offset="100%" stop-color="%23334155" />
      </linearGradient>
      <linearGradient id="foam" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="%230f172a" />
        <stop offset="100%" stop-color="%231e293b" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="%23020617" flood-opacity="0.4" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="url(%23bg)" rx="24"/>
    
    <!-- Technical Grid Accent -->
    <g stroke="%2338bdf8" stroke-opacity="0.05" stroke-width="1">
      <line x1="40" y1="0" x2="40" y2="400" />
      <line x1="120" y1="0" x2="120" y2="400" />
      <line x1="200" y1="0" x2="200" y2="400" />
      <line x1="280" y1="0" x2="280" y2="400" />
      <line x1="360" y1="0" x2="360" y2="400" />
      <line x1="0" y1="80" x2="400" y2="80" />
      <line x1="0" y1="160" x2="400" y2="160" />
      <line x1="0" y1="240" x2="400" y2="240" />
      <line x1="0" y1="320" x2="400" y2="320" />
    </g>

    <!-- Lab Shadow -->
    <ellipse cx="200" cy="355" rx="100" ry="12" fill="%23020617" opacity="0.6" />

    <!-- Case Body -->
    <g filter="url(%23shadow)">
      <!-- Main Outer Shell -->
      <rect x="70" y="80" width="260" height="240" fill="url(%23caseMetal)" rx="16" stroke="%2394a3b8" stroke-width="2"/>
      
      <!-- Inner Foam Layer -->
      <rect x="85" y="95" width="230" height="210" fill="url(%23foam)" rx="8" stroke="%23334155" stroke-width="1.5"/>
      
      <!-- Aluminium Trim / Border Highlights -->
      <path d="M 70,160 L 330,160" stroke="%231e293b" stroke-width="4" />
      <path d="M 70,160 L 330,160" stroke="%23cbd5e1" stroke-width="1.5" />
      
      <!-- Heavy Duty latches -->
      <rect x="110" y="145" width="30" height="30" fill="%231e293b" rx="4" stroke="%2364748b" stroke-width="1" />
      <rect x="117" y="152" width="16" height="16" fill="%2394a3b8" rx="2" />
      
      <rect x="260" y="145" width="30" height="30" fill="%231e293b" rx="4" stroke="%2364748b" stroke-width="1" />
      <rect x="267" y="152" width="16" height="16" fill="%2394a3b8" rx="2" />
      
      <!-- Carrying Handle -->
      <path d="M 150,80 L 150,60 C 150,54 154,50 160,50 L 240,50 C 246,50 250,54 250,60 L 250,80" fill="none" stroke="%23334155" stroke-width="12" stroke-linecap="round"/>
      <path d="M 150,80 L 150,60 C 150,54 154,50 160,50 L 240,50 C 246,50 250,54 250,60 L 250,80" fill="none" stroke="%2364748b" stroke-width="6" stroke-linecap="round"/>

      <!-- Reinforced Corners -->
      <path d="M 70,105 C 70,90 85,80 100,80" fill="none" stroke="%231e293b" stroke-width="6" />
      <path d="M 300,80 C 315,80 330,90 330,105" fill="none" stroke="%231e293b" stroke-width="6" />
      <path d="M 70,295 C 70,310 85,320 100,320" fill="none" stroke="%231e293b" stroke-width="6" />
      <path d="M 300,320 C 315,320 330,310 330,295" fill="none" stroke="%231e293b" stroke-width="6" />

      <!-- High Tech Laser Engraved Badge on Lid -->
      <rect x="140" y="225" width="120" height="50" fill="%230f172a" rx="6" stroke="%2338bdf8" stroke-width="1" stroke-opacity="0.3"/>
      <text x="200" y="245" font-family="'Inter', sans-serif" font-weight="900" font-size="10" fill="%23f8fafc" text-anchor="middle" letter-spacing="1">ALLUVI LABS</text>
      <text x="200" y="260" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="6.5" fill="%2338bdf8" text-anchor="middle" letter-spacing="2">VIAL ORGANISER</text>
      <text x="200" y="268" font-family="'Inter', sans-serif" font-weight="bold" font-size="5" fill="%2310b981" text-anchor="middle">10 VIAL SLOTS</text>
    </g>

    <!-- Lab Stamp Badge on top right -->
    <g transform="translate(320, 50)" opacity="0.8">
      <circle cx="15" cy="15" r="22" fill="none" stroke="%2338bdf8" stroke-dasharray="2,2" stroke-width="1"/>
      <text x="15" y="12" font-family="'Inter', sans-serif" font-weight="900" font-size="6.5" fill="%23f8fafc" text-anchor="middle">SECURE</text>
      <text x="15" y="21" font-family="'Inter', sans-serif" font-weight="bold" font-size="7" fill="%2310b981" text-anchor="middle">CASE</text>
    </g>
  </svg>`;
}

export const products: Product[] = csvProducts;
