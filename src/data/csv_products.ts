import { Product } from '../types';

// Compact representation of all products from the CSV
// Simple schema: [sku, name, type, category, color, capColor, label, variations_array_or_spec, price_if_simple]
const rawProducts: any[] = [
  ['VAR-RT5', 'Retatrutide', 'variable', 'Retatrutide', '#2d5a27', '#10b981', 'RETAT', [['RT5', '5mg*10vials', 54], ['RT10', '10mg*10vials', 88], ['RT15', '15mg*10vials', 118], ['RT20', '20mg*10vials', 138], ['RT30', '30mg*10vials', 168], ['RT40', '40mg*10vials', 213], ['RT50', '50mg*10vials', 260], ['RT60', '60mg*10vials', 330]]],
  ['VAR-SM5', 'Semaglutide', 'variable', 'Semaglutide', '#047857', '#059669', 'SEMA', [['SM5', '5mg*10vials', 30], ['SM10', '10mg*10vials', 46], ['SM15', '15mg*10vials', 55], ['SM20', '20mg*10vials', 85], ['SM30', '30mg*10vials', 91]]],
  ['VAR-TR5', 'Tirzepatide', 'variable', 'Tirzepatide', '#1e3a8a', '#3b82f6', 'TIRZE', [['TR5', '5mg*10vials', 35], ['TR10', '10mg*10vials', 49], ['TR15', '15mg*10vials', 63], ['TR20', '20mg*10vials', 79], ['TR30', '30mg*10vials', 109], ['TR40', '40mg*10vials', 140], ['TR50', '50mg*10vials', 165], ['TR60', '60mg*10vials', 201]]],
  ['VAR-MS15', 'MOTS-c', 'variable', 'Recovery', '#7c3aed', '#8b5cf6', 'MOTSC', [['MS15', '15mg*10vials', 99], ['MS20', '20mg*10vials', 118], ['MS40', '40mg*10vials', 210]]],
  ['VAR-NJ100', 'NAD+', 'variable', 'Vitamins', '#0284c7', '#0ea5e9', 'NAD+', [['NJ100', '100mg*10vials', 36], ['NJ500', '500mg*10vials', 51], ['NJ1000', '1000mg*10vials', 95]]],
  ['VAR-CU50', 'GHK-Cu', 'variable', 'Recovery', '#0891b2', '#06b6d4', 'GHKCU', [['CU50', '50mg*10vials', 30], ['CU100', '100mg*10vials', 40]]],
  ['VAR-AHK50', 'AHK-CU', 'variable', 'Recovery', '#0369a1', '#38bdf8', 'AHKCU', [['AHK50', '50mg*10vials', 50], ['AHK100', '100mg*10vials', 66]]],
  ['VAR-GTT1500', 'Glutathione', 'variable', 'Vitamins', '#ec4899', '#f472b6', 'GTT', [['GTT1500', '1500mg*10vials', 66], ['GTT600', '600mg*10vials', 41]]],
  ['VAR-2AD', 'AOD9604', 'variable', 'Recovery', '#ea580c', '#f97316', 'AOD', [['2AD', '2mg*10vials', 42], ['5AD', '5mg*10vials', 81], ['10AD', '10mg*10vials', 147]]],
  ['VAR-KS5', 'Kisspeptin-10', 'variable', 'Cognitive', '#db2777', '#ec4899', 'KISS', [['KS5', '5mg*10vials', 42], ['KS10', '10mg*10vials', 68]]],
  ['VAR-ADMAX5', 'ADMAX', 'variable', 'Cognitive', '#2563eb', '#60a5fa', 'ADMAX', [['ADMAX5', '5mg*10vials', 74], ['ADMAX10', '10mg*10vials', 102]]],
  ['VAR-AP5', 'Adipotide/FTTP', 'variable', 'Recovery', '#dc2626', '#ef4444', 'ADIPO', [['AP5', '5mg*10vials', 135], ['AP10', '10mg*10vials', 199]]],
  ['VAR-AR50', 'Aicar', 'variable', 'Recovery', '#059669', '#34d399', 'AICAR', [['AR50', '50mg*10vials', 71], ['AR100', '100mg*10vials', 128]]],
  ['VAR-RA10', 'ARA290 (Cibinetide)', 'variable', 'Recovery', '#4f46e5', '#818cf8', 'ARA', [['RA10', '10mg*10vials', 68], ['RA16', '16mg*10vials', 92]]],
  ['AC1', 'ACE 031', 'simple', 'Growth Factor', '#84cc16', '#a3e635', 'ACE', '1mg*10vials', 38],
  ['B12-1', 'B12', 'simple', 'Vitamins', '#e11d48', '#f43f5e', 'B12', '1mg*10vials/ml', 52],
  ['XT100', 'Botulinum toxin', 'simple', 'Cognitive', '#475569', '#94a3b8', 'BOTOX', '100iu*10vials', 119],
  ['VAR-CGL5', 'Cagrilintide', 'variable', 'Semaglutide', '#0891b2', '#22d3ee', 'CAGRI', [['CGL5', '5mg*10vials', 112], ['CGL10', '10mg*10vials', 193]]],
  ['CTL20', 'Cartalax', 'simple', 'Recovery', '#7c2d12', '#ca8a04', 'CARTA', '20mg*10vials', 85],
  ['VAR-DS2', 'DSIP', 'variable', 'Recovery', '#1e1b4b', '#4338ca', 'DSIP', [['DS2', '2mg*10vials', 27], ['DS5', '5mg*10vials', 40], ['DS10', '10mg*10vials', 64]]],
  ['VAR-ET10', 'Epithalon', 'variable', 'Recovery', '#047857', '#34d399', 'EPITH', [['ET10', '10mg*10vials', 40], ['ET50', '50mg*10vials', 126]]],
  ['E3K', 'EPO', 'simple', 'Recovery', '#991b1b', '#f87171', 'EPO', '3000iu*10vials', 90],
  ['VAR-G65', 'GHRP-6', 'variable', 'Growth Factor', '#1e3a8a', '#3b82f6', 'GHRP6', [['G65', '5mg*10vials', 33], ['G610', '10mg*10vials', 42]]],
  ['VAR-G5K', 'HCG', 'variable', 'Recovery', '#111827', '#4b5563', 'HCG', [['G5K', '5000iu*10vials', 75], ['G10K', '10000iu*10vials', 133]]],
  ['VAR-H10', 'HGH', 'variable', 'Growth Factor', '#155e75', '#06b6d4', 'HGH', [['H10', '10iu*10vials', 54], ['H15', '15iu*10vials', 80], ['H24', '24iu*10vials', 115]]],
  ['VAR-BC2', 'BPC 157', 'variable', 'Recovery', '#7c2d12', '#d97706', 'BPC', [['BC2', '2mg*10vials', 24], ['BC5', '5mg*10vials', 36], ['BC10', '10mg*10vials', 51]]],
  ['BB10', 'BPC 5mg+TB5mg', 'simple', 'Recovery', '#a21caf', '#f0abfc', 'BPCTB', '10mg*10vials', 94],
  ['BB20', 'BPC 10mg+TB10mg', 'simple', 'Recovery', '#701a75', '#e879f9', 'BPCTB', '20mg*10vials', 161],
  ['VAR-CD2', 'CJC1295 with DAC', 'variable', 'Growth Factor', '#0f172a', '#475569', 'CJCDAC', [['CD2', '2mg*10vials', 74], ['CD5', '5mg*10vials', 156]]],
  ['VAR-CND2', 'CJC 1295 (without DAC)', 'variable', 'Growth Factor', '#312e81', '#6366f1', 'CJCNOD', [['CND2', '2mg*10vials', 38], ['CND5', '5mg*10vials', 62], ['CND10', '10mg*10vials', 118]]],
  ['CP10', 'CJC 1295 (without DAC) 5mg+IPA', 'simple', 'Growth Factor', '#4c1d95', '#a78bfa', 'CJCIPA', '10mg*10vials', 80],
  ['CP20', 'CJC 1295 (without DAC) 10mg+IPA', 'simple', 'Growth Factor', '#2e1065', '#c084fc', 'CJCIPA', '20mg*10vials', 180],
  ['VAR-IP2', 'Ipamorelin', 'variable', 'Growth Factor', '#064e3b', '#10b981', 'IPAM', [['IP2', '2mg*10vials', 24], ['IP5', '5mg*10vials', 36], ['IP10', '10mg*10vials', 55]]],
  ['MT1', 'MT-1 (Melanotan I)', 'simple', 'Cognitive', '#b45309', '#f59e0b', 'MT1', '10mg*10vials', 48],
  ['ML10', 'Melanotan II MT-2 (Melanotan 2 Acetate)', 'simple', 'Cognitive', '#78350f', '#d97706', 'MT2', '10mg*10vials', 48],
  ['MT10-MEL', 'Melatonin', 'simple', 'Cognitive', '#020617', '#38bdf8', 'MELAT', '10mg*10vials', 52],
  ['MS10', 'Other MS10', 'simple', 'Recovery', '#334155', '#64748b', 'MS10', '10mg*10vials', 65],
  ['VAR-2S10', 'SS-31', 'variable', 'Recovery', '#1d4ed8', '#60a5fa', 'SS31', [['2S10', '10mg*10vials', 74], ['2S50', '50mg*10vials', 296]]],
  ['VAR-BT2', 'TB500', 'variable', 'Recovery', '#be185d', '#f43f5e', 'TB500', [['BT2', '2mg*10vials', 42], ['BT5', '5mg*10vials', 74], ['BT10', '10mg*10vials', 135]]],
  ['VAR-TSM2', 'Tesamorelin', 'variable', 'Growth Factor', '#101827', '#4f46e5', 'TESA', [['TSM2', '2mg*10vials', 51], ['TSM5', '5mg*10vials', 91], ['TSM10', '10mg*10vials', 173], ['TSM20', '20mg*10vials', 299]]],
  ['TI', 'Tesa10+ip5', 'simple', 'Growth Factor', '#1e1b4b', '#818cf8', 'TESAIP', '15mg*10vials', 203],
  ['TY10', 'Thymalin/Thymulin', 'simple', 'Recovery', '#14532d', '#22c55e', 'THYMA', '10mg*10vials', 59],
  ['VAR-TA5', 'Thymosin alpha 1', 'variable', 'Recovery', '#065f46', '#059669', 'THYMA1', [['TA5', '5mg*10vials', 87], ['TA10', '10mg*10vials', 144]]],
  ['VAR-IG01', 'IGF-1 LR3', 'variable', 'Growth Factor', '#831843', '#ec4899', 'IGF1', [['IG01', '100mcg*10vials', 35], ['IG1', '1mg*10vials', 185]]],
  ['LC120', 'Lipo-c Compound', 'simple', 'Vitamins', '#ca8a04', '#facc15', 'LIPOC', '10ml*10vials', 51],
  ['LC216', 'MIC (Lipo C with B12)', 'simple', 'Vitamins', '#e11d48', '#fb7185', 'MIC', '10mg*10vials', 60],
  ['VP10', 'VIP', 'simple', 'Recovery', '#1e40af', '#60a5fa', 'VIP', '10mg*10vials', 134],
  ['MDT10', 'Mazdutide', 'simple', 'Semaglutide', '#0d9488', '#14b8a6', 'MAZDU', '10mg*10vials', 208],
  ['BBG70', 'GLOW (BPC157 10mg+GHK-CU 50mg+TB500 10mg)', 'simple', 'Recovery', '#7c3aed', '#a78bfa', 'GLOW', '70mg*10vials', 174],
  ['BBG50', 'GLOW (BPC157 5mg+GHK-CU 35mg+TB500 10mg)', 'simple', 'Recovery', '#6d28d9', '#c084fc', 'GLOW', '50mg*10vials', 150],
  ['KLOW80', 'KLOW (BPC157 10mg+GHK-CU 50mg+TB500 10mg+KPV 10mg)', 'simple', 'Recovery', '#5b21b6', '#d8b4fe', 'KLOW', '80mg*10vials', 198],
  ['MX10', 'Matrixyl', 'simple', 'Cognitive', '#475569', '#cbd5e1', 'MATRI', '10mg*10vials', 33],
  ['VAR-PI10', 'Pinealon', 'variable', 'Recovery', '#b45309', '#fbbf24', 'PINEA', [['PI10', '10mg*10vials', 83], ['PI20', '20mg*10vials', 100]]],
  ['VAR-5AM', '5-AMINO-1MQ', 'variable', 'Recovery', '#be123c', '#fda4af', '5AM', [['5AM', '5mg*10vials', 40], ['10AM', '10mg*10vials', 69], ['50AM', '50mg*10vials', 109]]],
  ['VAR-SUR5', 'Survodutide', 'variable', 'Semaglutide', '#0d9488', '#2dd4bf', 'SURVO', [['SUR5', '5mg*10vials', 165], ['SUR10', '10mg*10vials', 234], ['SUR15', '15mg*10vials', 354]]],
  ['VAR-LC600', 'L-carnitine', 'variable', 'Vitamins', '#eab308', '#fef08a', 'LCARN', [['LC600', '600mg*10vials/ml', 48], ['LC1200', '1200mg*10vials/ml', 52]]],
  ['VAR-AA3', 'Acetic acid water', 'variable', 'Vitamins', '#64748b', '#e2e8f0', 'ACETIC', [['AA3', '3ml*10vials', 11], ['AA5', '5ml*10vials', 15], ['AA10', '10ml*10vials', 17]]],
  ['VAR-WA3', 'bac.water', 'variable', 'Vitamins', '#38bdf8', '#bae6fd', 'BACWAT', [['WA3', '3ml*10vials', 10], ['WA10', '10ml*10vials', 15]]],
  ['VAR-BA3', 'Antibacterial water', 'variable', 'Vitamins', '#0ea5e9', '#7dd3fc', 'ABWAT', [['BA3', '3ml*10vials', 10], ['BA10', '10ml*10vials', 15]]],
  ['LB10', 'Lemon Bottle', 'simple', 'Vitamins', '#eab308', '#fef08a', 'LEMON', '10ml*10vials/ml', 40],
  ['VAR-H36', 'HGH Fragment 176-191', 'variable', 'Growth Factor', '#1e3a8a', '#3b82f6', 'HGHFRG', [['H36', '36iu*10vials', 163], ['H40', '40iu*10vials', 175], ['M5', '5mg*10vials', 80], ['M10', '10mg*10vials', 140], ['M15', '15mg*10vials', 194]]],
  ['LL37-5', 'LL37', 'simple', 'Recovery', '#15803d', '#4ade80', 'LL37', '5mg*10vials', 94],
  ['VAR-OT5', 'Oxytocin Acetate', 'variable', 'Recovery', '#c084fc', '#e9d5ff', 'OXYT', [['OT5', '5mg*10vials', 46], ['OT10', '10mg*10vials', 79]]],
  ['PT10', 'PT141', 'simple', 'Cognitive', '#db2777', '#fbcfe8', 'PT141', '10mg*10vials', 59],
  ['VAR-SMO5', 'Sermorelin Acetate', 'variable', 'Growth Factor', '#0284c7', '#bae6fd', 'SERMO', [['SMO5', '5mg*10vials', 68], ['SMO10', '10mg*10vials', 116]]],
  ['VAR-NP8-10', 'Snap8', 'variable', 'Recovery', '#475569', '#94a3b8', 'SNAP8', [['NP8-10', '10mg*10vials', 36], ['NP8', '100mg*10vials', 178]]],
  ['VAR-KP5', 'KPV', 'variable', 'Recovery', '#16a34a', '#86efac', 'KPV', [['KP5', '5mg*10vials', 40], ['KP10', '10mg*10vials', 50]]],
  ['VAR-SK5', 'Selank', 'variable', 'Recovery', '#4f46e5', '#c7d2fe', 'SELANK', [['SK5', '5mg*10vials', 35], ['SK10', '10mg*10vials', 59]]],
  ['VAR-XA5', 'Semax', 'variable', 'Recovery', '#0891b2', '#a5f3fc', 'SEMAX', [['XA5', '5mg*10vials', 36], ['XA10', '10mg*10vials', 49], ['XA30', '30mg*10vials', 142]]],
  ['332', 'slupp332', 'simple', 'Recovery', '#0f172a', '#64748b', 'SLUPP', '5mg*10vials', 77],
  ['2S5', 'Other 2S5', 'simple', 'Recovery', '#475569', '#94a3b8', '2S5', '5mg*10vials', 52]
];

// Helper to clean and format product labels, keeping them readable and elegant on the physical vial
function getCleanLabel(fullName: string): string {
  let clean = fullName.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  clean = clean.replace(/Reference Standard/gi, '').trim();
  clean = clean.replace(/\s+/g, ' ').trim();
  
  const upper = clean.toUpperCase();
  if (upper.includes('MELANOTAN II') || upper.includes('MELANOTAN 2')) return 'MT-2';
  if (upper.includes('MELANOTAN I') || upper.includes('MELANOTAN 1')) return 'MT-1';
  if (upper.includes('CJC 1295 (WITHOUT DAC)') || upper.includes('CJC 1295 WITHOUT DAC')) return 'CJC-1295 NODAC';
  if (upper.includes('CJC1295 WITH DAC') || upper.includes('CJC-1295 WITH DAC')) return 'CJC-1295 DAC';
  if (upper.includes('CJC 1295 WITHOUT DAC 5MG+IPA')) return 'CJC+IPA';
  if (upper.includes('CJC 1295 WITHOUT DAC 10MG+IPA')) return 'CJC+IPA';
  if (upper.includes('GLOW (BPC157')) return 'GLOW MIX';
  if (upper.includes('KLOW (BPC157')) return 'KLOW MIX';
  if (upper.includes('THYMASIN') || upper.includes('THYMOSIN ALPHA')) return 'THYMOSIN α1';
  if (upper.includes('LIPO-C')) return 'LIPO-C';
  if (upper.includes('MIC (LIPO C WITH B12)')) return 'MIC LIPO-C';
  if (upper.includes('HGH FRAGMENT')) return 'HGH FRAG 176';
  
  return clean;
}

// Helper from the original products.ts to draw the awesome SVG vial (with perfect URL encoding for clarity)
function generateVialSvg(color: string, capColor: string, label: string, mg: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <!-- Premium background card -->
    <rect width="400" height="400" rx="24" fill="#0b1517" />
    <defs>
      <!-- Premium metallic glass gradients -->
      <linearGradient id="vialBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.15" />
        <stop offset="20%" stop-color="#ffffff" stop-opacity="0.3" />
        <stop offset="40%" stop-color="#ffffff" stop-opacity="0.1" />
        <stop offset="60%" stop-color="#e2e8f0" stop-opacity="0.05" />
        <stop offset="80%" stop-color="#ffffff" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${capColor}" />
        <stop offset="30%" stop-color="#ffffff" stop-opacity="0.4" />
        <stop offset="70%" stop-color="${capColor}" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.1" />
        <stop offset="70%" stop-color="${color}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.8" />
      </linearGradient>
    </defs>

    <!-- Lab ambient glow grid -->
    <path d="M 50,0 L 50,400 M 100,0 L 100,400 M 150,0 L 150,400 M 200,0 L 200,400 M 250,0 L 250,400 M 300,0 L 300,400 M 350,0 L 350,400" fill="none" stroke="#1e293b" stroke-width="0.5" opacity="0.15" />
    <path d="M 0,50 L 400,50 M 0,100 L 400,100 M 0,150 L 400,150 M 0,200 L 400,200 M 0,250 L 400,250 M 0,300 L 400,300 M 0,350 L 400,350" fill="none" stroke="#1e293b" stroke-width="0.5" opacity="0.15" />

    <!-- Scientific circular radar backdrop -->
    <circle cx="200" cy="200" r="140" fill="none" stroke="#0f2d30" stroke-width="1.5" stroke-dasharray="3,6" opacity="0.5" />
    <circle cx="200" cy="200" r="160" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="2,15" opacity="0.3" />
    <circle cx="200" cy="200" r="90" fill="none" stroke="#0f2d30" stroke-width="1" opacity="0.2" />

    <!-- Liquid reflection floor shadow -->
    <ellipse cx="200" cy="335" rx="55" ry="12" fill="${color}" opacity="0.18" />
    <ellipse cx="200" cy="335" rx="35" ry="7" fill="#000000" opacity="0.4" />

    <!-- 1. VIAL BASE GLOW -->
    <rect x="155" y="115" width="90" height="210" rx="10" fill="${color}" opacity="0.08" />

    <!-- 2. VIAL CONTENTS (LYOPHILIZED POWDER CAKE) -->
    <path d="M 157,285 Q 170,280 200,283 Q 230,280 243,285 L 243,315 Q 200,323 157,315 Z" fill="url(#liquidGrad)" />
    <path d="M 165,295 L 180,290 L 175,305 Z" fill="#ffffff" opacity="0.3" />
    <path d="M 210,292 L 225,288 L 220,302 Z" fill="#ffffff" opacity="0.25" />
    <path d="M 190,305 L 200,300 L 195,310 Z" fill="#ffffff" opacity="0.4" />

    <!-- 3. GLASS VIAL BODY -->
    <rect x="155" y="115" width="90" height="200" rx="12" fill="url(#vialBody)" stroke="#94a3b8" stroke-width="1.5" stroke-opacity="0.35" />

    <!-- 4. INNER CHAMBER REFLECTION -->
    <rect x="159" y="119" width="82" height="192" rx="8" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.15" />

    <!-- 5. VIAL NECK & CRIMP COLLAR -->
    <rect x="175" y="90" width="50" height="25" fill="url(#vialBody)" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.25" />
    <rect x="170" y="80" width="60" height="16" rx="3" fill="url(#capGradient)" stroke="#475569" stroke-width="0.5" />
    <line x1="176" y1="80" x2="176" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />
    <line x1="182" y1="80" x2="182" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />
    <line x1="188" y1="80" x2="188" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />
    <line x1="212" y1="80" x2="212" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />
    <line x1="218" y1="80" x2="218" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />
    <line x1="224" y1="80" x2="224" y2="96" stroke="#000000" stroke-width="0.5" opacity="0.3" />

    <!-- 6. FLIP-OFF PLASTIC CAP -->
    <path d="M 172,80 Q 200,75 228,80 L 225,67 Q 200,64 175,67 Z" fill="url(#capGradient)" stroke="#1e293b" stroke-width="0.5" />
    <path d="M 176,68 Q 200,66 224,68" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.5" />

    <!-- 7. LABELS & SCIENTIFIC TEXT (With crisp unblurred font rendering) -->
    <g transform="translate(192, 140) scale(0.6)">
      <rect x="4" y="0" width="8" height="16" fill="${color}" rx="1" />
      <rect x="0" y="4" width="16" height="8" fill="${color}" rx="1" />
    </g>
    <text x="200" y="172" font-family="monospace" font-size="7.5" font-weight="bold" fill="#10b981" letter-spacing="1" text-anchor="middle">HPLC &gt; 99%</text>

    <!-- Lab Code / Label Box -->
    <rect x="165" y="185" width="70" height="42" rx="4" fill="#111d20" stroke="#132c30" stroke-width="1" />
    <text x="200" y="200" font-family="sans-serif" font-weight="900" font-size="11" fill="#f8fafc" letter-spacing="1" text-anchor="middle">${label}</text>
    <text x="200" y="213" font-family="monospace" font-weight="bold" font-size="7" fill="#94a3b8" letter-spacing="0.5" text-anchor="middle">${mg.toUpperCase()}</text>
    <line x1="172" y1="219" x2="228" y2="219" stroke="#1e293b" stroke-width="0.5" />

    <!-- Warning standard notation -->
    <text x="200" y="250" font-family="sans-serif" font-weight="bold" font-size="5.5" fill="#ef4444" letter-spacing="0.5" text-anchor="middle">IN VITRO RESEARCH ONLY</text>
    <text x="200" y="260" font-family="monospace" font-weight="bold" font-size="5.5" fill="#64748b" text-anchor="middle">UK LAB CERTIFIED</text>

    <!-- Professional gloss highlight across the glass -->
    <path d="M 160,123 Q 185,120 185,250 T 160,307" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.12" />
    <path d="M 240,123 Q 235,120 235,220" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.08" />

    <!-- Lab stamp badge on background -->
    <g transform="translate(320, 50)" opacity="0.8">
      <circle cx="15" cy="15" r="22" fill="none" stroke="${color}" stroke-dasharray="2,2" stroke-width="1"/>
      <text x="15" y="12" font-family="sans-serif" font-weight="900" font-size="6" fill="#f8fafc" text-anchor="middle">UK LAB</text>
      <text x="15" y="21" font-family="sans-serif" font-weight="bold" font-size="6.5" fill="#10b981" text-anchor="middle">TESTED</text>
    </g>
  </svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Helper to extract numeric value with unit (mg, mcg, iu, ml, etc.)
function extractMgValue(specStr: string): string {
  if (!specStr) return '10 MG';
  const match = specStr.match(/^(\d+)(mg|mcg|iu|ml)/i);
  if (match) {
    return `${match[1]} ${match[2].toUpperCase()}`;
  }
  const clean = specStr.split('*')[0].split('/')[0].trim();
  return clean.toUpperCase();
}

// Helper to determine the highest concentration for variable or simple products
function getHighestMg(variationsOrSpec: any, name: string): string {
  if (!Array.isArray(variationsOrSpec)) {
    return extractMgValue(variationsOrSpec);
  }
  if (variationsOrSpec.length === 0) return '10 MG';
  const lastVar = variationsOrSpec[variationsOrSpec.length - 1];
  return extractMgValue(lastVar[1]);
}

// Realistic design matching the uploaded reference image ("Retat UK LABS")
function generateNewWaveVialSvg(name: string, highestMg: string, color: string, capColor: string): string {
  const cleanName = getCleanLabel(name).toUpperCase();
  
  // Dynamically calculate font-size and spacing to guarantee it never overflows and is perfectly readable
  let fontSize = 13;
  let letterSpacing = '0.5';
  if (cleanName.length > 15) {
    fontSize = 8.5;
    letterSpacing = '0.2';
  } else if (cleanName.length > 11) {
    fontSize = 10;
    letterSpacing = '0.3';
  } else if (cleanName.length > 8) {
    fontSize = 11.5;
    letterSpacing = '0.4';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <!-- Premium metallic glass gradients -->
      <linearGradient id="vialGlass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
        <stop offset="15%" stop-color="#f8fafc" stop-opacity="0.7" />
        <stop offset="45%" stop-color="#e2e8f0" stop-opacity="0.2" />
        <stop offset="65%" stop-color="#cbd5e1" stop-opacity="0.15" />
        <stop offset="85%" stop-color="#ffffff" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.9" />
      </linearGradient>
      <!-- Premium Cap Gradient -->
      <linearGradient id="blueCap" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1d4ed8" />
        <stop offset="35%" stop-color="#3b82f6" />
        <stop offset="70%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1e40af" />
      </linearGradient>
      <!-- Silver Collar Gradient -->
      <linearGradient id="silverCollar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94a3b8" />
        <stop offset="25%" stop-color="#cbd5e1" />
        <stop offset="50%" stop-color="#f8fafc" />
        <stop offset="75%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#64748b" />
      </linearGradient>
      <linearGradient id="vCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${capColor}" />
        <stop offset="35%" stop-color="#ffffff" stop-opacity="0.35" />
        <stop offset="70%" stop-color="${capColor}" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
    </defs>

    <!-- Lab ambient clean background -->
    <rect width="400" height="400" rx="24" fill="#f8fafc" />
    <g stroke="#38bdf8" stroke-opacity="0.04" stroke-width="0.75">
      <line x1="50" y1="0" x2="50" y2="400" />
      <line x1="150" y1="0" x2="150" y2="400" />
      <line x1="250" y1="0" x2="250" y2="400" />
      <line x1="350" y1="0" x2="350" y2="400" />
      <line x1="0" y1="50" x2="400" y2="50" />
      <line x1="0" y1="150" x2="400" y2="150" />
      <line x1="0" y1="250" x2="400" y2="250" />
      <line x1="0" y1="350" x2="400" y2="350" />
    </g>

    <!-- Studio Floor Contact Shadow (Using vector shapes with low opacity, avoiding heavy blur filters) -->
    <ellipse cx="200" cy="355" rx="60" ry="8" fill="#020617" opacity="0.04" />
    <ellipse cx="200" cy="353" rx="45" ry="5" fill="#020617" opacity="0.06" />

    <!-- 1. POWDER CAKE (Lyophilized Peptide Crystalline Matrix) -->
    <path d="M 136,290 C 136,290 150,285 200,285 C 250,285 264,290 264,290 L 264,332 C 264,338 254,342 240,342 L 160,342 C 146,342 136,338 136,332 Z" fill="#fcfcfc" />
    <path d="M 136,290 Q 200,282 264,290 Q 200,296 136,290 Z" fill="#e2e8f0" opacity="0.6" />
    <path d="M 136,290 Q 200,282 264,290 Q 200,286 136,290 Z" fill="#ffffff" opacity="0.9" />

    <!-- 2. CLEAR GLASS VIAL OUTER CONTAINER -->
    <path d="M 158,102 Q 200,102 242,102 L 242,112 C 242,122 264,126 264,136 L 264,332 C 264,341 254,344 242,344 L 158,344 C 146,344 136,341 136,332 L 136,136 C 136,126 158,122 158,112 Z" fill="url(#vialGlass)" stroke="#cbd5e1" stroke-width="1.2" />

    <!-- 3. METALLIC COLLAR (CRIMP SEAL) -->
    <rect x="156" y="81" width="88" height="16" rx="2" fill="url(#silverCollar)" stroke="#94a3b8" stroke-width="0.5" />
    <rect x="158" y="97" width="84" height="5" fill="#64748b" opacity="0.15" />

    <!-- 4. FLIP-OFF PLASTIC CAP (Using standard capColor with beautiful 3D feel) -->
    <path d="M 152,81 L 248,81 C 251,81 253,79 253,76 L 253,68 C 253,64 247,62 238,62 L 162,62 C 153,62 147,64 147,68 L 147,76 C 147,79 149,81 152,81 Z" fill="url(#vCapGrad)" stroke="#1e293b" stroke-width="0.5" />
    <path d="M 153,64 C 170,62.5 230,62.5 247,64" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.4" />

    <!-- 5. WHITE LABEL (Clean with perfect high contrast bounds) -->
    <rect x="139" y="140" width="122" height="135" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.75" />

    <!-- Premium Molecular Double Helix Wave Brand Logo (Fully crisp Vector instead of fuzzy external image) -->
    <circle cx="200" cy="164" r="18" fill="none" stroke="#2e5b62" stroke-width="1" stroke-dasharray="1.5,1.5" opacity="0.3" />
    <!-- Blue-Teal wave -->
    <path d="M 188,164 Q 200,152 212,164" fill="none" stroke="#2e5b62" stroke-width="2.5" stroke-linecap="round" />
    <!-- Gold wave -->
    <path d="M 188,164 Q 200,176 212,164" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="188" cy="164" r="3.2" fill="#2e5b62" />
    <circle cx="200" cy="158" r="3.2" fill="#d97706" />
    <circle cx="200" cy="170" r="3.2" fill="#2e5b62" />
    <circle cx="212" cy="164" r="3.2" fill="#d97706" />

    <!-- Brand text below logo (crisp, bold, centered) -->
    <text x="200" y="194" font-family="sans-serif" font-weight="800" font-size="10.5" fill="#132c30" letter-spacing="0.4" text-anchor="middle">Retat UK LABS</text>

    <!-- PRODUCT NAME BOX (Vibrant Crimson Red Banner) -->
    <rect x="146" y="201" width="108" height="25" rx="4" fill="#dc2626" />
    <text x="200" y="218" font-family="sans-serif" font-weight="900" font-size="${fontSize}" fill="#ffffff" letter-spacing="${letterSpacing}" text-anchor="middle">${cleanName}</text>

    <!-- MILLIGRAM BOX (Sky Blue Outlined Badge with clean font) -->
    <rect x="162" y="232" width="76" height="17" rx="3.5" fill="none" stroke="#2563eb" stroke-width="1.5" />
    <text x="200" y="244" font-family="monospace, Courier" font-weight="900" font-size="9.5" fill="#2563eb" letter-spacing="0.5" text-anchor="middle">${highestMg}</text>

    <!-- "RESEARCH USE ONLY" Warn note -->
    <text x="200" y="263" font-family="sans-serif" font-weight="800" font-size="6" fill="#475569" letter-spacing="0.8" text-anchor="middle">RESEARCH USE ONLY</text>

    <!-- 6. GLASS HIGHLIGHT REFLECTIONS (Drawn on top of everything for realistic premium look) -->
    <path d="M 140,145 Q 146,240 141,330" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.35" />
    <path d="M 260,145 Q 254,240 259,330" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.2" />
  </svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Generate full Product object from compact raw format
const RETAIL_MULTIPLIER = 3.9;

export const products: Product[] = rawProducts.map((row) => {
  const [sku, name, type, category, color, capColor, label, variationsOrSpec, priceIfSimple] = row;
  const isVar = type === 'variable';
  
  const specValue = isVar ? variationsOrSpec[0][1] : variationsOrSpec;
  const basePrice = isVar ? variationsOrSpec[0][2] : priceIfSimple;
  const price = Math.round(basePrice * RETAIL_MULTIPLIER);
  const purity = category === 'Vitamins' ? '99.9%' : '99.8%';
  
  const shortDesc = `Ultra-pure ${name} reference standard for in vitro laboratory research. Formulated with exceptional stability and refined to a minimum purity of ${purity} for reproducible results in Great Britain.`;
  
  const longDesc = `${name} is prepared to the highest standard for academic, chemical, and diagnostic research applications. Synthesized in state-of-the-art facilities and freeze-dried to form a highly dense lyophilized crystalline matrix, this material contains zero synthetic impurities or biological contaminants. Evaluated rigorously with High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) to secure reliable testing parameters.`;
  
  const benefits = [
    `Simulates target cell-level interactions with high specificity`,
    `Refined to >${purity} purity, eliminating sequence-level variances`,
    `Shipped inside vacuum-sealed Type I glass vials to prevent degradation`
  ];
  
  const specifications: Record<string, string> = {
    'Chemical Name': name,
    'Format': 'Lyophilized crystalline powder',
    'Purity Index': `${purity} by HPLC/MS`,
    'Country of Origin': 'UK Verified Quality Sourcing'
  };

  // Check exceptions: Retatrutide, Tirzepatide, BPC 157
  const isException = name === 'Retatrutide' || name === 'Tirzepatide' || name === 'BPC 157';
  
  let imageSvg = '';
  if (isException) {
    imageSvg = generateVialSvg(color, capColor, label, specValue);
  } else {
    const highestMg = getHighestMg(variationsOrSpec, name);
    imageSvg = generateNewWaveVialSvg(name, highestMg, color, capColor);
  }

  return {
    id: sku,
    name,
    chemicalName: name + ' Reference Standard',
    category,
    purity,
    concentration: specValue,
    price,
    image: imageSvg,
    fallbackSvg: imageSvg,
    badge: sku.includes('RT') || sku.includes('TR') || sku.includes('SM') ? 'Best Seller' : null,
    shortDesc,
    longDesc,
    benefits,
    usageInfo: 'Reconstitute slowly by dropping sterile diluent onto the inner vial walls. Gently swirl to achieve a fully clear solution. Avoid violent shaking to preserve molecular structures.',
    storageInfo: 'Store freeze-dried vials at temperatures under -20°C for up to 24 months. Protect from direct light. Once reconstituted, refrigerate at 2-8°C and use within 14 days.',
    specifications,
    faqs: [
      { question: `What is the chemical purity of ${name}?`, answer: `Every batch of ${name} is verified at or above ${purity} purity via analytical HPLC and Mass Spectrometry.` },
      { question: `Is ${name} suitable for diagnostic purposes?`, answer: `All products featured are strictly limited to scientific in vitro research and laboratory assays. They are not approved for human or clinical usage.` }
    ],
    seoTitle: `Buy ${name} UK | High-Purity Reference Standard - Alluvi`,
    seoMetaDesc: `Purchase verified high-purity ${name} peptide in the UK. Next-day cold chain delivery natively from Great Britain. HPLC reports available.`,
    schemaMarkup: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': name,
      'description': shortDesc,
      'offers': {
        '@type': 'Offer',
        'price': price.toString(),
        'priceCurrency': 'GBP',
        'availability': 'https://schema.org/InStock'
      }
    }),
    type,
    variations: isVar ? variationsOrSpec.map((v: any) => ({
      id: v[0],
      name: `${name} - ${v[1]}`,
      spec: v[1],
      price: Math.round(v[2] * RETAIL_MULTIPLIER)
    })) : undefined
  };
});
