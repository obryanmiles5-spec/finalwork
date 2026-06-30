import { Product } from '../types';

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

export const products: Product[] = [
  // Retatrutide (1 to 4) - Focus Keyword: Retatrutide UK
  {
    id: 'retatrutide-2mg',
    name: 'Retatrutide 2mg (Alluvi Premium)',
    chemicalName: 'LY3437943 Peptide',
    category: 'Retatrutide',
    purity: '99.82%',
    concentration: '2mg',
    price: 65.00,
    image: getPeptideSvg('#2e5b62', '#10b981', 'RETAT', '2 MG'),
    badge: 'New',
    shortDesc: 'Ultra-pure Retatrutide (LY3437943) 2mg lyophilized vial. Triple-agonist targeting GCGR, GIPR, and GLP-1R for cellular & metabolic research in the United Kingdom.',
    longDesc: 'Retatrutide is a multi-functional therapeutic peptide under rigorous preclinical investigation. It behaves as a triple hormone receptor agonist, successfully binding and activating the Glucagon Receptor (GCGR), Glucose-dependent Insulinotropic Polypeptide Receptor (GIPR), and Glucagon-like Peptide-1 Receptor (GLP-1R). This Alluvi-grade peptide is synthesised at state-of-the-art labs, refined using premium HPLC, and freeze-dried to achieve an exceptional purity index above 99%. Ideal for metabolic signaling, lipid pathway tracking, and energy homeostasis analysis.',
    benefits: [
      'Simultaneous triple-agonist signaling (GLP-1, GIP, and Glucagon receptors)',
      'Highly resistant to enzymatic degradation, extending molecular half-life in vitro',
      'Perfect for metabolic regulation and adipose tissue cellular studies',
      'Synthesized in vacuum-sealed conditions ensuring zero microbial load'
    ],
    usageInfo: 'Reconstitute using sterile bacteriostatic water only. Gently swirl the vial; do not shake vigorously. Conduct all research using standard safety lab parameters.',
    storageInfo: 'Store dry lyophilized powder in temperatures under -20°C for long term (up to 24 months). Store at 2-8°C after reconstitution and use within 14 days.',
    specifications: {
      'Molecular Formula': 'C221H342N54O71S2',
      'Molecular Weight': '4731.4 g/mol',
      'Purity': '99.82% by HPLC & Mass Spectrometry',
      'Format': 'Lyophilized white crystalline powder',
      'Additives': 'Preservative-free vacuum sealed vial',
      'Country of Origin': 'UK Quality Verified Sourcing'
    },
    faqs: [
      { question: 'What is Retatrutide chemical structure?', answer: 'Retatrutide is a synthetic peptide containing 39 amino acids, structurally modified to interact with three key metabolic receptor sites.' },
      { question: 'Is this item suitable for clinical use?', answer: 'No, this product is strictly sold for clinical research and laboratory evaluations in vitro. It is not for human consumption.' }
    ],
    seoTitle: 'Retatrutide 2mg UK | Buy High-Purity Retatrutide Peptide - Alluvi',
    seoMetaDesc: 'Buy premium Retatrutide 2mg in the UK. Lyophilized peptide of >99% purity. HPLC tested with secure UK next-day delivery. Perfect for metabolic laboratory research.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Retatrutide 2mg (Alluvi Premium)","image":"retatrutide-2mg.webp","description":"Ultra-pure Retatrutide (LY3437943) 2mg lyophilized vial. Triple-agonist targeting GCGR, GIPR, and GLP-1R.","offers":{"@type":"Offer","price":"65.00","priceCurrency":"GBP","availability":"https://schema.org/InStock"}}'
  },
  {
    id: 'retatrutide-5mg',
    name: 'Retatrutide 5mg (Alluvi Premium)',
    chemicalName: 'LY3437943 Peptide',
    category: 'Retatrutide',
    purity: '99.78%',
    concentration: '5mg',
    price: 115.00,
    image: getPeptideSvg('#2e5b62', '#10b981', 'RETAT', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Highly requested 5mg Retatrutide lyophilized vial. Triple receptor agonist targeting metabolic, weight, and insulin pathways for laboratory research use.',
    longDesc: 'Our 5mg Retatrutide represents the industry benchmark for laboratory evaluations. Evaluated with strict analytical chromatography, it offers high stability under normal testing cycles. By binding to GIP, GLP-1, and glucagon receptors, it is highly applicable in metabolic biochemistry and tissue cultivation settings. Lab-proven to enhance thermogenesis simulation pathways in adipocyte models.',
    benefits: [
      'Premium concentration for serial dilutions and multi-phase research protocols',
      'High chemical stability with low moisture content and zero oxidation products',
      'Certified sterile filtration (0.22 micron) prior to lyophilization',
      'Accompanying third-party UK analytical batch report for validation'
    ],
    usageInfo: 'Inject sterile bacteriostatic water directly onto the inner wall of the vial. Allow the solution to dissolve slowly without shaking to preserve chemical integrity.',
    storageInfo: 'Store lyophilized powder at -20°C. Reconstituted solution must be refrigerated at 2-8°C and kept away from direct light exposure.',
    specifications: {
      'Molecular Formula': 'C221H342N54O71S2',
      'Molecular Weight': '4731.4 g/mol',
      'Purity': '99.78% Verified',
      'Physical State': 'Freeze-dried powder cake',
      'Packaging': 'USP Type I borosilicate glass vials with rubber stoppers and aluminum flip caps'
    },
    faqs: [
      { question: 'What is the stability of Retatrutide 5mg at room temperature?', answer: 'Lyophilized Retatrutide is stable at room temperature for up to 4 weeks during transit, but long-term storage must be in a freezer.' }
    ],
    seoTitle: 'Retatrutide 5mg UK | Premium Research Grade Peptides - Alluvi',
    seoMetaDesc: 'Order Retatrutide 5mg peptide online in the UK. High-purity lyophilized formula tested in certified UK labs. Wholesale pricing and fast domestic delivery.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Retatrutide 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"115.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'retatrutide-10mg',
    name: 'Retatrutide 10mg (Alluvi Premium)',
    chemicalName: 'LY3437943 Peptide',
    category: 'Retatrutide',
    purity: '99.85%',
    concentration: '10mg',
    price: 185.00,
    image: getPeptideSvg('#2e5b62', '#10b981', 'RETAT', '10 MG'),
    badge: 'Featured',
    shortDesc: 'Double concentration 10mg Retatrutide lyophilized peptide. Excellent economy choice for intensive UK scientific projects and high-throughput research setups.',
    longDesc: 'Providing double the standard assay volume, our 10mg Retatrutide allows extensive cell-culture assays without inter-vial variance. Each batch is vacuum-sealed and inspected for seal integrity and crystal structure. Our process incorporates a specialized freeze-drying cycle that eliminates collapse and guarantees immediate solubility upon addition of diluent.',
    benefits: [
      'Maximum value per milligram for larger scope laboratory protocols',
      'Unsurpassed chemical purity (>99.8%) verified via LC-MS testing',
      'Formulated with zero trifluoroacetate (TFA) salt residues for sensitive cell models',
      'Excellent performance in glucose tolerance and fatty acid oxidation assays'
    ],
    usageInfo: 'Reconstitute with 2ml of bacteriostatic water to achieve a concentration of 5mg/ml. Handle using protective laboratory gear.',
    storageInfo: 'Keep in deep-freeze environment. Reconstituted vials are stable for 14 to 21 days when kept constantly at 2-8°C.',
    specifications: {
      'Sequence': 'YSX-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Aib-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser',
      'Purity Assay': '99.85% by Area Integration',
      'Moisture Content': 'Less than 1.8%'
    },
    faqs: [
      { question: 'Why choose 10mg over smaller vials?', answer: 'The 10mg vial minimizes batch variability and is highly economical for studies that require consistent daily dosing protocols in animal models.' }
    ],
    seoTitle: 'Retatrutide 10mg UK | Buy Wholesale Laboratory Peptides',
    seoMetaDesc: 'Purchase Retatrutide 10mg from the UK’s premier peptide distributor. Premium lyophilized powder, 99.8% pure, lab certified. Fast shipping and bulk deals available.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Retatrutide 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"185.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'retatrutide-15mg',
    name: 'Retatrutide 15mg (Alluvi Premium)',
    chemicalName: 'LY3437943 Peptide',
    category: 'Retatrutide',
    purity: '99.81%',
    concentration: '15mg',
    price: 245.00,
    image: getPeptideSvg('#2e5b62', '#10b981', 'RETAT', '15 MG'),
    badge: 'Featured',
    shortDesc: 'Ultra-high dosage 15mg Retatrutide vial. Intended for long-term clinical research simulations where maximum concentration is strictly required.',
    longDesc: 'The pinnacle of our research collection, our 15mg Retatrutide allows extensive cellular profiling across multiple test cells. This item goes through dual-stage purification and is vacuum-packaged to secure its molecular integrity. Highly rated for obesity research modeling and energy metabolism pathways.',
    benefits: [
      'Highest concentration per vial, minimizing volume-induced research errors',
      'Ensures reliable, high-density experimental setups',
      'Free from heavy metals, solvents, or biological contaminants',
      'Includes security seal and hologram with QR code for lab validation'
    ],
    usageInfo: 'Highly concentrated. Ensure appropriate mathematical calculations of dilutions before mixing with sterile water.',
    storageInfo: 'Keep refrigerated or frozen at all times. Do not thaw and re-freeze repeatedly as this compromises peptide bonds.',
    specifications: {
      'Concentration': '15mg per vial',
      'Purification': 'Preparative HPLC Chromatography',
      'TFA Content': '<0.05%'
    },
    faqs: [
      { question: 'What is the recommended dilution ratio?', answer: 'Usually diluted with 2.5ml to 3ml of solvent depending on target laboratory measuring equipment.' }
    ],
    seoTitle: 'Retatrutide 15mg Buy UK | Lab Tested Peptides - Alluvi',
    seoMetaDesc: 'Order maximum potency Retatrutide 15mg lyophilized peptide in the UK. Certified lab results provided. Premium quality vacuum sealed packaging.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Retatrutide 15mg (Alluvi Premium)","offers":{"@type":"Offer","price":"245.00","priceCurrency":"GBP"}}'
  },

  // Tirzepatide (5 to 8)
  {
    id: 'tirzepatide-5mg',
    name: 'Tirzepatide 5mg (Alluvi Premium)',
    chemicalName: 'LY3298176 Peptide',
    category: 'Tirzepatide',
    purity: '99.68%',
    concentration: '5mg',
    price: 60.00,
    image: getPeptideSvg('#1e3a8a', '#3b82f6', 'TIRZE', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Dual GIP and GLP-1 receptor agonist 5mg lyophilized peptide. Fully certified lab batch with next-day UK dispatch. Exceptional for metabolic tissue studies.',
    longDesc: 'Tirzepatide is a pioneering synthetic peptide dual-agonist. It consists of a 39-amino-acid chain with an attached C20 fatty diacid moiety that extends research half-life. By targeting both GIP and GLP-1 receptors, it mimics metabolic satiety and insulin release in clinical cellular studies.',
    benefits: [
      'Synergistic GIP/GLP-1 receptor activation mimicking natural incretins',
      'High-grade lyophilized formulation with immediate reconstitution solubility',
      'Pre-checked via rigorous mass spectrometry and HPLC analysis'
    ],
    usageInfo: 'Reconstitute with bacteriostatic water. Inject solvent slowly into vial walls to avoid bubble formation.',
    storageInfo: 'Store at -20°C dry. Keep under 4°C for up to 14 days once mixed.',
    specifications: {
      'Sequence': 'Y-Aib-EGTFTSDYSI-Aib-LDKIAQ-C20diacid-AFVQWLIAGGPSSGAPPPS',
      'Molecular Weight': '4813.5 g/mol',
      'Purity': '99.68%'
    },
    faqs: [
      { question: 'Is Tirzepatide identical to brand name options?', answer: 'This is the active research peptide chemical ingredient, LY3298176, formulated exclusively for laboratory testing and metabolic evaluation.' }
    ],
    seoTitle: 'Tirzepatide 5mg UK | Buy Dual Agonist Peptide - Alluvi',
    seoMetaDesc: 'Buy premium Tirzepatide 5mg vials in the UK. Dual GLP-1 and GIP receptor agonist for lab-based metabolic research. Guaranteed high purity & trackable dispatch.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Tirzepatide 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"60.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tirzepatide-10mg',
    name: 'Tirzepatide 10mg (Alluvi Premium)',
    chemicalName: 'LY3298176 Peptide',
    category: 'Tirzepatide',
    purity: '99.72%',
    concentration: '10mg',
    price: 110.00,
    image: getPeptideSvg('#1e3a8a', '#3b82f6', 'TIRZE', '10 MG'),
    badge: 'Featured',
    shortDesc: 'High-purity Tirzepatide 10mg lyophilized vial. Essential for comparative metabolic assays and dual-agonist signaling validation in laboratory environments.',
    longDesc: 'Our 10mg Tirzepatide formulation offers excellent value and batch consistency. Every vial contains high-density lyophilized cake that dissolves perfectly clear, offering stable physiological pH representation for metabolic laboratory experiments.',
    benefits: [
      'Cost-effective 10mg vial for prolonged experimental periods',
      'HPLC verified purity of 99.72%',
      'Vacuum-sealed under dry nitrogen gas to prevent moisture uptake'
    ],
    usageInfo: 'Mix with 1.5ml to 2ml of sterile diluent. Swirl gently.',
    storageInfo: 'Freeze dry powder at -20°C for up to 2 years. Refrigerate after reconstitution.',
    specifications: { 'Purity': '99.72%', 'Molecular Formula': 'C225H348N48O68' },
    faqs: [],
    seoTitle: 'Tirzepatide 10mg UK | HPLC Tested Lab Peptides',
    seoMetaDesc: 'Order laboratory-grade Tirzepatide 10mg from Alluvi. UK specialized peptide store. 100% purity and next-day shipping across Great Britain.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Tirzepatide 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"110.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tirzepatide-15mg',
    name: 'Tirzepatide 15mg (Alluvi Premium)',
    chemicalName: 'LY3298176 Peptide',
    category: 'Tirzepatide',
    purity: '99.75%',
    concentration: '15mg',
    price: 160.00,
    image: getPeptideSvg('#1e3a8a', '#3b82f6', 'TIRZE', '15 MG'),
    badge: 'Best Seller',
    shortDesc: 'Premium Tirzepatide 15mg lyophilized peptide. Extensively tested in the UK. Designed for massive screening programs and metabolic testing cascades.',
    longDesc: 'High-purity 15mg lyophilized Tirzepatide. Crafted with our gold-standard crystallization processes, it guarantees immediate peptide dispersion. Excellent for tracing glucose absorption pathways.',
    benefits: [
      'Maximum economy for large-scale clinical trials simulation',
      'Ultra-stable structure with a verified long shelf-life',
      'Minimal degradation products'
    ],
    usageInfo: 'Add 2ml to 3ml of solvent and allow to dissolve fully.',
    storageInfo: 'Store below -18°C. Do not expose reconstituted solutions to temperatures above 8°C.',
    specifications: { 'Weight': '15mg per vial', 'HPLC Purity': '99.75%' },
    faqs: [],
    seoTitle: 'Tirzepatide 15mg UK | Purchase Bulk Lab Peptides',
    seoMetaDesc: 'Purchase maximum dose Tirzepatide 15mg in the UK. Fully verified peptide batch with immediate delivery. Trust the leading British research chemical supplier.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Tirzepatide 15mg (Alluvi Premium)","offers":{"@type":"Offer","price":"160.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tirzepatide-20mg',
    name: 'Tirzepatide 20mg (Alluvi Premium)',
    chemicalName: 'LY3298176 Peptide',
    category: 'Tirzepatide',
    purity: '99.80%',
    concentration: '20mg',
    price: 210.00,
    image: getPeptideSvg('#1e3a8a', '#3b82f6', 'TIRZE', '20 MG'),
    badge: 'Featured',
    shortDesc: 'Heavy-duty 20mg Tirzepatide lyophilized vial. High-purity reference material for expert clinical laboratories and biochemical analysis.',
    longDesc: 'Specially synthesized 20mg batch, offering maximum concentration with absolute purity. Triple-phase filtration guarantees the absence of biological contaminants, ensuring zero experimental noise.',
    benefits: [
      'Highest density vial for long-running cell culture programs',
      '99.80% purity verified by analytical chromatogram',
      'Packaged in highly durable medical grade amber/clear borosilicate'
    ],
    usageInfo: 'Calculate reconstitution proportions with care. Handle using professional equipment.',
    storageInfo: 'Store under freezing conditions (-20°C to -80°C) for maximum long-term longevity.',
    specifications: { 'Active Substance': 'Tirzepatide', 'Vial Capacity': '20mg' },
    faqs: [],
    seoTitle: 'Buy Tirzepatide 20mg UK | Scientific Research Peptides',
    seoMetaDesc: 'Buy Tirzepatide 20mg peptide in Great Britain. Highest standard GIP/GLP-1 dual agonist reference materials for academic institutions and laboratories.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Tirzepatide 20mg (Alluvi Premium)","offers":{"@type":"Offer","price":"210.00","priceCurrency":"GBP"}}'
  },

  // Semaglutide (9 to 12)
  {
    id: 'semaglutide-2mg',
    name: 'Semaglutide 2mg (Alluvi Premium)',
    chemicalName: 'GLP-1 Analogue Peptide',
    category: 'Semaglutide',
    purity: '99.45%',
    concentration: '2mg',
    price: 45.00,
    image: getPeptideSvg('#047857', '#10b981', 'SEMA', '2 MG'),
    badge: 'Best Seller',
    shortDesc: 'Gold standard GLP-1 receptor agonist 2mg lyophilized peptide. Extensively tested, exceptional for metabolic homeostasis and cellular signaling trials.',
    longDesc: 'Semaglutide is a chemically modified GLP-1 receptor agonist. The addition of a C18 diacid chain at Lys26 allows binding to albumin, decreasing enzymatic degradation and prolonging half-life. Highly used in research simulating cardiovascular health, insulin response, and metabolic control.',
    benefits: [
      'Standard reference material for GLP-1 signaling path simulation',
      'Purity exceeding 99% with HPLC verification',
      'Affordable point of entry for peptide receptor trials'
    ],
    usageInfo: 'Dilute with sterile bacteriostatic water. Do not agitate to protect secondary peptide folding.',
    storageInfo: 'Keep at -20°C long term. Keep refrigerated after reconstitution and protect from sunlight.',
    specifications: { 'Formula': 'C187H291N45O59', 'Molecular Weight': '4113.4 g/mol', 'Purity': '99.45%' },
    faqs: [],
    seoTitle: 'Semaglutide 2mg UK | Buy Premium GLP-1 Peptide',
    seoMetaDesc: 'Buy highly purified Semaglutide 2mg vials in the UK. Tested and verified research-grade peptide. Quick next-day shipping in discreet temperature-controlled boxes.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Semaglutide 2mg (Alluvi Premium)","offers":{"@type":"Offer","price":"45.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'semaglutide-5mg',
    name: 'Semaglutide 5mg (Alluvi Premium)',
    chemicalName: 'GLP-1 Analogue Peptide',
    category: 'Semaglutide',
    purity: '99.51%',
    concentration: '5mg',
    price: 75.00,
    image: getPeptideSvg('#047857', '#10b981', 'SEMA', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Popular 5mg Semaglutide lyophilized vial. Trusted by academic research groups across the UK. Ideal for weight simulation and insulin homeostasis research.',
    longDesc: 'The 5mg Semaglutide vial offers balanced longevity for multi-cellular assays. Each vial is checked for dry-cake density and nitrogen vacuum consistency to eliminate hydration-based decay.',
    benefits: [
      'Perfect concentration for cell line cultivation and animal assays',
      '99.51% pure peptide validated by Mass Spectrometry',
      'Formulated without fillers or buffers'
    ],
    usageInfo: 'Reconstitute slowly on the vial side. Store reconstituted liquid in darkness.',
    storageInfo: 'Keep in freezer at -20°C. Once diluted, keep under 4°C and use within 14 days.',
    specifications: { 'Purity': '99.51%', 'Peptide Content': '95.2%' },
    faqs: [],
    seoTitle: 'Semaglutide 5mg UK | High-Purity Research Peptide',
    seoMetaDesc: 'Purchase high-grade Semaglutide 5mg from the leading UK peptide provider. Vacuum sealed for stability. Fully verified HPLC batch records included with order.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Semaglutide 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"75.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'semaglutide-10mg',
    name: 'Semaglutide 10mg (Alluvi Premium)',
    chemicalName: 'GLP-1 Analogue Peptide',
    category: 'Semaglutide',
    purity: '99.58%',
    concentration: '10mg',
    price: 130.00,
    image: getPeptideSvg('#047857', '#10b981', 'SEMA', '10 MG'),
    badge: 'Featured',
    shortDesc: 'Double potency 10mg Semaglutide lyophilized peptide. Excellent bulk option for high volume laboratory research and comparative endocrine studies.',
    longDesc: 'Our 10mg Semaglutide vial is a reliable and highly economical choice for professional labs. Prepared with strict quality assurance standards to maintain uniform structure across high-throughput cell assay models.',
    benefits: [
      'Optimal price-to-quantity ratio for advanced research',
      'Purity rate of 99.58% by HPLC integration',
      'No biological residues or heavy metal traces'
    ],
    usageInfo: 'Add standard diluent and swirl to dissolve. Avoid shaking.',
    storageInfo: 'Deep freeze long term. Keep strictly refrigerated post-mixing.',
    specifications: { 'Physical Form': 'Crystalline solid cake', 'Assay Purity': '99.58%' },
    faqs: [],
    seoTitle: 'Semaglutide 10mg UK | Buy High-Volume Peptides Online',
    seoMetaDesc: 'Order Semaglutide 10mg lyophilized vials from the UK. Highly pure, premium scientific research material. Free UK shipping over £100 with secure checkout.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Semaglutide 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"130.00","priceCurrency":"GBP"}}'
  },

  // BPC-157 (13 to 15)
  {
    id: 'bpc-157-5mg',
    name: 'BPC-157 5mg (Alluvi Premium)',
    chemicalName: 'Body Protection Compound-157',
    category: 'Healing & Tissue Repair',
    purity: '99.35%',
    concentration: '5mg',
    price: 42.00,
    image: getPeptideSvg('#b45309', '#f59e0b', 'BPC157', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Pentadecapeptide Body Protection Compound-157 5mg. Exceptional tissue regeneration, gut lining, and wound healing simulation peptide in Great Britain.',
    longDesc: 'BPC-157 is a partial sequence of human gastric juice protein compound containing 15 amino acids. Research simulates tissue growth, tendon healing, skin regeneration, and vascular growth. High HPLC purity ensures minimal sequence fragmentation.',
    benefits: [
      'Simulates tissue restoration and tendon/ligament collagen synthesis',
      'Stable in artificial gastric juice models for oral administration studies',
      'Promotes cellular migration and tissue vascularization models in vitro'
    ],
    usageInfo: 'Reconstitute using sterile water. Store away from heat and shaking.',
    storageInfo: 'Store in standard freezer. Keeps for 24 months dry.',
    specifications: { 'Sequence': 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val', 'Molecular Weight': '1419.5 g/mol', 'Purity': '99.35%' },
    faqs: [],
    seoTitle: 'BPC-157 5mg UK | Premium Body Protection Compound - Alluvi',
    seoMetaDesc: 'Order BPC-157 5mg peptide online in the UK. Premium pentadecapeptide for healing and repair research. Next-day tracking, HPLC certified, laboratory grade.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"BPC-157 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"42.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'bpc-157-10mg',
    name: 'BPC-157 10mg (Alluvi Premium)',
    chemicalName: 'Body Protection Compound-157',
    category: 'Healing & Tissue Repair',
    purity: '99.48%',
    concentration: '10mg',
    price: 72.00,
    image: getPeptideSvg('#b45309', '#f59e0b', 'BPC157', '10 MG'),
    badge: 'Best Seller',
    shortDesc: 'Double concentration 10mg BPC-157. Exceptional tissue repair, ligament healing, and cellular migration research material for UK institutions.',
    longDesc: 'Highly potent 10mg Body Protection Compound-157 vial. Excellent choice for ongoing cellular signaling studies related to gastric protection and myofibrillar repair pathways.',
    benefits: [
      'High density vial, perfect for multi-stage cellular modeling',
      'Assay purity verified above 99.4%',
      'Sealed under clinical conditions'
    ],
    usageInfo: 'Add sterile solvent and swirl gently. Highly soluble within seconds.',
    storageInfo: 'Store dry in freezer. Keep cold at 2-8°C post-dilution.',
    specifications: { 'Peptide Purity': '99.48%', 'Water Content': '1.2%' },
    faqs: [],
    seoTitle: 'BPC-157 10mg UK | High-Potency Healing Peptides',
    seoMetaDesc: 'Buy BPC-157 10mg in the UK. Double strength tissue regeneration peptide. Laboratory tested and certified. Discrete delivery and secure checkout.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"BPC-157 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"72.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'bpc-157-15mg',
    name: 'BPC-157 15mg (Alluvi Premium)',
    chemicalName: 'Body Protection Compound-157',
    category: 'Healing & Tissue Repair',
    purity: '99.60%',
    concentration: '15mg',
    price: 99.00,
    image: getPeptideSvg('#b45309', '#f59e0b', 'BPC157', '15 MG'),
    badge: 'Featured',
    shortDesc: 'Max-dose 15mg BPC-157 lyophilized vial. High-purity reference material for expert clinical research laboratories.',
    longDesc: 'The ultimate concentration BPC-157 vial. Provides pristine laboratory grade Body Protection Compound, ensuring absolute precision in chronic wound healing and bone-tendon junction studies.',
    benefits: [
      'Highest concentration per vial on the market',
      'Excellent crystalline peptide structure',
      'Ultra low endotoxin levels'
    ],
    usageInfo: 'Mix with care. Calculate dosage parameters under expert supervision.',
    storageInfo: 'Deep freeze at -20°C for maximum long-term molecular stability.',
    specifications: { 'Physical Form': 'Crystalline white powder', 'Purity': '99.60%' },
    faqs: [],
    seoTitle: 'BPC-157 15mg Buy UK | Premium Repair Peptides - Alluvi',
    seoMetaDesc: 'Purchase maximum strength BPC-157 15mg peptide from the top UK distributor. Outstanding purity, lab-certified next day shipping.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"BPC-157 15mg (Alluvi Premium)","offers":{"@type":"Offer","price":"99.00","priceCurrency":"GBP"}}'
  },

  // TB-500 (16 to 18)
  {
    id: 'tb-500-2mg',
    name: 'TB-500 2mg (Alluvi Premium)',
    chemicalName: 'Thymosin Beta-4 Acetate',
    category: 'Healing & Tissue Repair',
    purity: '99.20%',
    concentration: '2mg',
    price: 38.00,
    image: getPeptideSvg('#be185d', '#ec4899', 'TB500', '2 MG'),
    badge: 'New',
    shortDesc: 'Thymosin Beta-4 synthetic peptide 2mg. Highly effective in vascular growth, tissue repair, actin regulation, and anti-inflammatory research.',
    longDesc: 'TB-500 is a synthetic version of the active region of Thymosin Beta-4. It regulates actin polymerization in cell structures. Promotes vascular growth (angiogenesis), wound healing, and muscle cell migration in scientific models.',
    benefits: [
      'Simulates wound closure and cellular migration mechanisms',
      'Regulates actin structure within cytoskeletal assays',
      'Under 0.22 micron sterile filtration'
    ],
    usageInfo: 'Reconstitute carefully. Do not shake to prevent secondary fold loss.',
    storageInfo: 'Store below -20°C dry. Refrigerate once mixed with solvent.',
    specifications: { 'Molecular Formula': 'C212H350N56O78S', 'Molecular Weight': '4963.5 g/mol', 'Purity': '99.20%' },
    faqs: [],
    seoTitle: 'TB-500 2mg UK | Buy Thymosin Beta-4 Peptide - Alluvi',
    seoMetaDesc: 'Buy premium TB-500 2mg vials in the UK. Highly pure synthetic Thymosin Beta-4 for molecular biology research. Lab certified batch results included.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"TB-500 2mg (Alluvi Premium)","offers":{"@type":"Offer","price":"38.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tb-500-5mg',
    name: 'TB-500 5mg (Alluvi Premium)',
    chemicalName: 'Thymosin Beta-4 Acetate',
    category: 'Healing & Tissue Repair',
    purity: '99.41%',
    concentration: '5mg',
    price: 68.00,
    image: getPeptideSvg('#be185d', '#ec4899', 'TB500', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Highly requested TB-500 5mg lyophilized vial. Standard peptide for connective tissue remodeling and inflammatory response research in the UK.',
    longDesc: 'High-purity 5mg Thymosin Beta-4 analog. Formulated to optimize structural repair simulation, collagen deposition, and cellular migration pathways in tissue cultures.',
    benefits: [
      'Highly stable and soluble peptide design',
      'Purity rate >99.4% checked by HPLC',
      'Zero synthetic fillers'
    ],
    usageInfo: 'Slowly mix with sterile bacteriostatic water. Protect from light.',
    storageInfo: 'Keep frozen dry. Refrigerated solution stable for 14 days.',
    specifications: { 'Purity': '99.41%', 'Moisture': '<1.5%' },
    faqs: [],
    seoTitle: 'TB-500 5mg UK | Thymosin Beta-4 Peptide Supplier',
    seoMetaDesc: 'Order TB-500 5mg in Great Britain. Premier healing peptide compound. Premium purity and next-day shipping from a verified British chemical supplier.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"TB-500 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"68.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tb-500-10mg',
    name: 'TB-500 10mg (Alluvi Premium)',
    chemicalName: 'Thymosin Beta-4 Acetate',
    category: 'Healing & Tissue Repair',
    purity: '99.50%',
    concentration: '10mg',
    price: 118.00,
    image: getPeptideSvg('#be185d', '#ec4899', 'TB500', '10 MG'),
    badge: 'Featured',
    shortDesc: 'Double capacity 10mg TB-500 vial. Perfect for long-term cell migration and cardiac tissue regeneration research projects.',
    longDesc: 'A massive 10mg batch of high-purity TB-500. Formulated to support extensive and deep laboratory protocols simulating vascular and myofibrillar restoration.',
    benefits: [
      'Highly economical for multi-stage laboratory operations',
      'Purity tested at 99.50% by LC-MS',
      'Ensures reliable cellular migration trials'
    ],
    usageInfo: 'Mix slowly. Swirl vial gently. Handle strictly inside a fume hood.',
    storageInfo: 'Keep stored under -20°C at all times to prevent molecular decay.',
    specifications: { 'Vial Net Weight': '10mg', 'Purity': '99.50%' },
    faqs: [],
    seoTitle: 'TB-500 10mg UK | Purchase Healing Peptides in Bulk',
    seoMetaDesc: 'Get TB-500 10mg from the premier UK peptide store. High purity, certified batch analysis. Secure shipping next business day.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"TB-500 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"118.00","priceCurrency":"GBP"}}'
  },

  // CJC-1295 (19 to 21)
  {
    id: 'cjc-1295-nodac-5mg',
    name: 'CJC-1295 No DAC 5mg (Alluvi Premium)',
    chemicalName: 'Modified GRF (1-29) Peptide',
    category: 'Growth Hormone Secretagogues',
    purity: '99.40%',
    concentration: '5mg',
    price: 39.00,
    image: getPeptideSvg('#4f46e5', '#818cf8', 'CJCND', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Growth Hormone Releasing Hormone analog 5mg without Drug Affinity Complex (DAC). Highly pure GHRH receptor agonist for endocrine simulation.',
    longDesc: 'CJC-1295 No DAC, also known as Modified GRF 1-29, is a synthetic peptide containing 29 amino acids. Highly stable in cellular modeling. It acts as a growth hormone releasing hormone receptor agonist, stimulating GH release in vitro without prolonged systemic binding.',
    benefits: [
      'Pulsatile pituitary hormone secretion simulation in lab assays',
      '99.4% purity rate by HPLC analysis',
      'Free from chemical degradation intermediates'
    ],
    usageInfo: 'Dissolve with sterile water. Standard research procedures apply.',
    storageInfo: 'Keep at -20°C dry. Refrigerated solution remains stable for 14 days.',
    specifications: { 'Sequence': 'Y-DA-F-T-N-S-Y-R-K-V-L-A-Q-L-S-A-R-K-L-L-Q-D-I-L-S-R-NH2', 'Molecular Weight': '3367.9 g/mol', 'Purity': '99.40%' },
    faqs: [],
    seoTitle: 'CJC-1295 No DAC 5mg UK | Mod GRF 1-29 Peptide - Alluvi',
    seoMetaDesc: 'Order premium CJC-1295 No DAC 5mg online in Great Britain. Lyophilized growth hormone secretagogue analog. Lab certified batch results included.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"CJC-1295 No DAC 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"39.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'cjc-1295-wdac-5mg',
    name: 'CJC-1295 with DAC 5mg (Alluvi Premium)',
    chemicalName: 'CJC-1295 with Drug Affinity Complex',
    category: 'Growth Hormone Secretagogues',
    purity: '99.15%',
    concentration: '5mg',
    price: 49.00,
    image: getPeptideSvg('#4f46e5', '#818cf8', 'CJCWD', '5 MG'),
    badge: 'New',
    shortDesc: 'GHRH analog with Drug Affinity Complex (DAC) 5mg. Extended life peptide designed for continuous growth hormone pathway modeling in laboratory studies.',
    longDesc: 'This peptide contains the active GHRH (1-29) bonded to the Drug Affinity Complex (DAC), which allows it to chemically link with serum albumin, extending its research cycle to several days in vitro.',
    benefits: [
      'Prolonged pituitary secretion pathway simulation',
      'Premium HPLC-tested formulation',
      'Ensures continuous molecular exposure without frequent dosing'
    ],
    usageInfo: 'Mix slowly. Swirl gently and protect reconstituted peptide from shaking.',
    storageInfo: 'Store dry at -20°C. Protect from bright light.',
    specifications: { 'Molecular Formula': 'C165H271N47O49', 'Purity': '99.15%', 'DAC Addition': 'Verified covalent link' },
    faqs: [],
    seoTitle: 'CJC-1295 with DAC 5mg UK | Long-Lasting Peptides - Alluvi',
    seoMetaDesc: 'Buy CJC-1295 with DAC 5mg peptide in the UK. Extended release growth hormone pathway analog. Top quality lab tested batch. Fast next day shipment.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"CJC-1295 with DAC 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"49.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'ipamorelin-5mg',
    name: 'Ipamorelin 5mg (Alluvi Premium)',
    chemicalName: 'Ipamorelin Acetate',
    category: 'Growth Hormone Secretagogues',
    purity: '99.52%',
    concentration: '5mg',
    price: 36.00,
    image: getPeptideSvg('#06b6d4', '#22d3ee', 'IPAM', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Pentapeptide Ghrelin Receptor Agonist 5mg. Highly selective growth hormone secretagogue, exceptional for cellular growth and muscle cell pathway trials.',
    longDesc: 'Ipamorelin is a synthetic pentapeptide that binds to the growth hormone secretagogue receptor (GHS-R1a), acting as a highly selective ghrelin receptor agonist. It stimulates growth hormone release in cell lines without affecting ACTH, prolactin, or cortisol secretion.',
    benefits: [
      'Highly selective GHS-R agonist with no secondary endocrine effects',
      'Purity rate >99.5% tested by HPLC',
      'Does not elevate cortisol or prolactin in cellular assays'
    ],
    usageInfo: 'Reconstitute using sterile bacteriostatic water. Gentle swirling recommended.',
    storageInfo: 'Keep at -20°C. Once reconstituted, refrigerate at 2-8°C.',
    specifications: { 'Sequence': 'Aib-His-D-2-Nal-D-Phe-Lys-NH2', 'Molecular Weight': '711.9 g/mol', 'Purity': '99.52%' },
    faqs: [],
    seoTitle: 'Ipamorelin 5mg UK | Buy Selective GH Secretagogue - Alluvi',
    seoMetaDesc: 'Buy high purity Ipamorelin 5mg in the UK. Ultra pure ghrelin receptor agonist peptide. Perfect for academic cellular research. Fast domestic shipment.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Ipamorelin 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"36.00","priceCurrency":"GBP"}}'
  },

  // Ipamorelin, GHK-Cu, Melanotan, PT-141, Epitalon, etc (22 to 30)
  {
    id: 'ipamorelin-10mg',
    name: 'Ipamorelin 10mg (Alluvi Premium)',
    chemicalName: 'Ipamorelin Acetate',
    category: 'Growth Hormone Secretagogues',
    purity: '99.61%',
    concentration: '10mg',
    price: 64.00,
    image: getPeptideSvg('#06b6d4', '#22d3ee', 'IPAM', '10 MG'),
    badge: 'Best Seller',
    shortDesc: 'Double strength 10mg Ipamorelin. Highly selective growth hormone secretagogue, ideal for long-term endocrine research projects.',
    longDesc: 'Premium 10mg Ipamorelin vial. Offers high density lyophilized cake that dissolves perfectly clear, offering stable physiological pH representation for metabolic laboratory experiments.',
    benefits: [
      'High economy for active research labs',
      'HPLC verified purity above 99.6%',
      'Vacuum sealed under sterile conditions'
    ],
    usageInfo: 'Dilute slowly. Swirl vial gently. Handle strictly under professional supervision.',
    storageInfo: 'Store dry below -20°C. Refrigerate post-dilution.',
    specifications: { 'Weight': '10mg', 'Purity': '99.61%' },
    faqs: [],
    seoTitle: 'Ipamorelin 10mg UK | Buy Bulk Research Peptides',
    seoMetaDesc: 'Purchase Ipamorelin 10mg in the UK. Certified lab results provided. High quality vacuum sealed packaging. Fast next day shipment.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Ipamorelin 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"64.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'ghk-cu-50mg',
    name: 'GHK-Cu 50mg (Alluvi Premium)',
    chemicalName: 'Copper Peptide GHK-Cu',
    category: 'Cosmetic & Anti-Ageing',
    purity: '99.50%',
    concentration: '50mg',
    price: 52.00,
    image: getPeptideSvg('#1d4ed8', '#60a5fa', 'GHKCU', '50 MG'),
    badge: 'New',
    shortDesc: 'Pristine blue GHK-Cu Copper Peptide 50mg lyophilized vial. Highly valued for collagen synthesis, dermal remodeling, and cosmetic cellular modeling in the UK.',
    longDesc: 'GHK-Cu is a human copper-binding tripeptide. This peptide exhibits a deep blue hue upon reconstitution. It regulates extracellular matrix genes, promoting skin collagen, elastin, and glycosaminoglycan synthesis in cosmetic science studies.',
    benefits: [
      'Deep blue active copper peptide, HPLC certified',
      'Excellent for fibroblasts and hair follicle stem cell modeling',
      'Highly stable and immediate reconstitution solubility'
    ],
    usageInfo: 'Highly soluble in water. Upon adding water, the solution immediately turns a beautiful royal blue color.',
    storageInfo: 'Freeze dry powder at -20°C. Keep under 4°C after reconstitution.',
    specifications: { 'Sequence': 'Gly-His-Lys-Cu', 'Molecular Weight': '402.2 g/mol (with Cu)', 'Purity': '99.50%' },
    faqs: [],
    seoTitle: 'GHK-Cu Copper Peptide 50mg UK | Cosmetic Peptides - Alluvi',
    seoMetaDesc: 'Buy premium blue GHK-Cu 50mg peptide in Great Britain. High-grade cosmetic science reference materials. HPLC certified, lab grade, quick delivery.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"GHK-Cu 50mg (Alluvi Premium)","offers":{"@type":"Offer","price":"52.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'ghk-cu-100mg',
    name: 'GHK-Cu 100mg (Alluvi Premium)',
    chemicalName: 'Copper Peptide GHK-Cu',
    category: 'Cosmetic & Anti-Ageing',
    purity: '99.65%',
    concentration: '100mg',
    price: 92.00,
    image: getPeptideSvg('#1d4ed8', '#60a5fa', 'GHKCU', '100 MG'),
    badge: 'Featured',
    shortDesc: 'Double concentration 100mg GHK-Cu Copper Peptide. Maximum value vial for extensive dermal remodeling and cell viability tests.',
    longDesc: 'Highly potent 100mg Copper Peptide GHK-Cu. Ideal for prolonged academic cosmetic trials simulating skin barrier recovery, cellular longevity, and hair growth modeling.',
    benefits: [
      'Maximum concentration, premium value for cosmetic research',
      'HPLC verified purity of 99.65%',
      'Deep sapphire blue color on reconstitution'
    ],
    usageInfo: 'Mix with 2ml to 3ml of sterile bacteriostatic water.',
    storageInfo: 'Store dry in freezer. Keep cold at 2-8°C post-dilution.',
    specifications: { 'Purity': '99.65%', 'Copper Concentration': 'Fully saturated complex' },
    faqs: [],
    seoTitle: 'GHK-Cu 100mg UK | Buy Premium Copper Peptides',
    seoMetaDesc: 'Order GHK-Cu 100mg in the UK. Highly pure copper peptide, perfect for scientific cosmetic research. Triple filtered, zero chemical residues.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"GHK-Cu 100mg (Alluvi Premium)","offers":{"@type":"Offer","price":"92.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'melanotan-2-10mg',
    name: 'Melanotan II 10mg (Alluvi Premium)',
    chemicalName: 'Melanotan II Acetate',
    category: 'Melanocortin Agonists',
    purity: '99.42%',
    concentration: '10mg',
    price: 35.00,
    image: getPeptideSvg('#78350f', '#fbbf24', 'MT2', '10 MG'),
    badge: 'Best Seller',
    shortDesc: 'Synthetic cyclic melanocortin receptor agonist Melanotan II 10mg. Exceptionally pure peptide for pigment research, UV protection simulation, and appetite studies.',
    longDesc: 'Melanotan II is a cyclic heptapeptide melanocortin receptor agonist. It stimulates alpha-melanocyte stimulating hormone pathways. Extensively researched in pigementation, energy homeostasis, lipid processing, and libido signaling models.',
    benefits: [
      'Excellent cyclic peptide stability for long-term cellular studies',
      'Dual-action signaling (MC1R, MC3R, MC4R agonists)',
      'Lyophilized with zero chemical contaminants'
    ],
    usageInfo: 'Reconstitute slowly. Swirl gently. Handle with protective lab gear.',
    storageInfo: 'Store dry in deep-freeze. Once reconstituted, must be kept at 2-8°C.',
    specifications: { 'Sequence': 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2', 'Molecular Weight': '1024.2 g/mol', 'Purity': '99.42%' },
    faqs: [],
    seoTitle: 'Melanotan II 10mg UK | High-Purity MT2 Peptide - Alluvi',
    seoMetaDesc: 'Order Melanotan II 10mg peptide in the UK. Highly purified MT2 reference material. 99% pure HPLC tested. Discrete and secure UK shipment.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Melanotan II 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"35.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'pt-141-10mg',
    name: 'PT-141 Bremelanotide 10mg (Alluvi Premium)',
    chemicalName: 'Bremelanotide Peptide',
    category: 'Melanocortin Agonists',
    purity: '99.38%',
    concentration: '10mg',
    price: 39.00,
    image: getPeptideSvg('#854d0e', '#facc15', 'PT141', '10 MG'),
    badge: 'New',
    shortDesc: 'Synthetic melanocortin receptor agonist Bremelanotide (PT-141) 10mg vial. Exceptionally pure peptide for sexual health signaling and libido research in vitro.',
    longDesc: 'PT-141 (Bremelanotide) is a synthetic peptide analog of alpha-MSH. It acts as a non-selective agonist of melanocortin receptors (mainly MC3R and MC4R) to stimulate sexual response and dopamine pathways in laboratory modeling.',
    benefits: [
      'Highly stable cyclic peptide sequence',
      'Purity verified above 99.3%',
      'Perfect for neurotransmitter and hormonal pathway modeling'
    ],
    usageInfo: 'Reconstitute with sterile bacteriostatic water. Avoid direct sunlight.',
    storageInfo: 'Store dry in freezer. Keep cold at 2-8°C post-dilution.',
    specifications: { 'Sequence': 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH', 'Molecular Weight': '1025.2 g/mol', 'Purity': '99.38%' },
    faqs: [],
    seoTitle: 'PT-141 Bremelanotide 10mg UK | Research Peptides - Alluvi',
    seoMetaDesc: 'Buy Bremelanotide PT-141 10mg in Great Britain. Premium peptide cyclic formula. Verified HPLC purity, fast courier shipment, lab-grade quality.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"PT-141 Bremelanotide 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"39.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'epitalon-10mg',
    name: 'Epitalon 10mg (Alluvi Premium)',
    chemicalName: 'Epithalon Tetrapeptide',
    category: 'Cosmetic & Anti-Ageing',
    purity: '99.58%',
    concentration: '10mg',
    price: 48.00,
    image: getPeptideSvg('#a21caf', '#f0abfc', 'EPIT', '10 MG'),
    badge: 'Featured',
    shortDesc: 'Synthetic pineal tetrapeptide Epitalon (Epithalon) 10mg vial. Exceptional purity level for telomerase activation, cellular longevity, and circadian research.',
    longDesc: 'Epitalon is a synthetic tetrapeptide containing four amino acids (Ala-Glu-Asp-Gly). It stimulates telomerase enzyme activity and promotes pineal gland melatonin secretion in longevity in vitro models.',
    benefits: [
      'Pristine tetrapeptide structure, HPLC certified',
      'Key reference compound for telomerase and aging research models',
      'Highly stable and immediate reconstitution solubility'
    ],
    usageInfo: 'Reconstitute slowly on the vial side. Store reconstituted liquid in darkness.',
    storageInfo: 'Keep in freezer at -20°C. Once diluted, keep under 4°C and use within 14 days.',
    specifications: { 'Sequence': 'Ala-Glu-Asp-Gly', 'Molecular Weight': '390.3 g/mol', 'Purity': '99.58%' },
    faqs: [],
    seoTitle: 'Epitalon 10mg UK | Buy Telomerase Activator Peptide - Alluvi',
    seoMetaDesc: 'Order premium Epitalon 10mg peptide in the UK. Highly pure tetrapeptide for longevity and cell aging research. HPLC tested next-day dispatch.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Epitalon 10mg (Alluvi Premium)","offers":{"@type":"Offer","price":"48.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'nad-plus-500mg',
    name: 'NAD+ Coenzyme 500mg (Alluvi Premium)',
    chemicalName: 'Nicotinamide Adenine Dinucleotide',
    category: 'Cosmetic & Anti-Ageing',
    purity: '99.70%',
    concentration: '500mg',
    price: 59.00,
    image: getPeptideSvg('#0284c7', '#38bdf8', 'NAD', '500 MG'),
    badge: 'Best Seller',
    shortDesc: 'Nicotinamide Adenine Dinucleotide (NAD+) 500mg premium lyophilized powder. Critical cellular enzyme for mitochondrial function and longevity research.',
    longDesc: 'NAD+ is an essential coenzyme found in every cell of the body. It plays a critical role in mitochondrial energy production, DNA repair, sirtuin activation, and cellular aging research simulation.',
    benefits: [
      'Primal cellular coenzyme with high concentration',
      'Essential for sirtuin activation and mitochondrial assay models',
      'HPLC verified purity of 99.70%'
    ],
    usageInfo: 'Highly soluble in sterile water. Gently swirl until fully clear.',
    storageInfo: 'Keep in freezer at -20°C. Keeps for up to 2 years.',
    specifications: { 'Active Compound': 'Nicotinamide Adenine Dinucleotide', 'Purity': '99.70%', 'Format': 'Lyophilized crystalline cake' },
    faqs: [],
    seoTitle: 'NAD+ 500mg UK | Buy Premium Coenzymes Online',
    seoMetaDesc: 'Buy premium NAD+ 500mg lyophilized vials in the UK. Tested and verified research-grade coenzyme. Quick next-day shipping in temperature-controlled boxes.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"NAD+ Coenzyme 500mg (Alluvi Premium)","offers":{"@type":"Offer","price":"59.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'igf-1-lr3-1mg',
    name: 'IGF-1 LR3 1mg (Alluvi Premium)',
    chemicalName: 'Long R3 Insulin-like Growth Factor-1',
    category: 'Growth Factors & Hormones',
    purity: '99.10%',
    concentration: '1mg',
    price: 72.00,
    image: getPeptideSvg('#a855f7', '#c084fc', 'IGF1L', '1 MG'),
    badge: 'New',
    shortDesc: 'Recombinant IGF-1 LR3 peptide 1mg. An analog of human IGF-1 with an amino acid substitution and 13 amino acid extension, designed for cellular proliferation and hypertrophy signaling.',
    longDesc: 'IGF-1 LR3 (Long R3 Insulin-like Growth Factor-1) is a synthetic recombinant protein that displays significantly elevated biological activity in cell studies. Its design resists deactivation by insulin-like growth factor-binding proteins (IGFBPs), allowing sustained stimulation of the AKT/mTOR protein synthesis pathways.',
    benefits: [
      'Resistant to IGFBP binding, extending protein receptor activation half-life',
      'Highly potent activator of cell division and tissue hyperplasia models',
      'Purity checked via modern analytical techniques'
    ],
    usageInfo: 'Highly sensitive protein structure. Reconstitute slowly. Do not shake or tap.',
    storageInfo: 'Store dry below -20°C. Refrigerate post-mixing. Avoid frequent temperature shifts.',
    specifications: { 'Format': 'Lyophilized protein powder', 'Molecular Weight': '9111.0 g/mol', 'Purity': '99.10%' },
    faqs: [],
    seoTitle: 'IGF-1 LR3 1mg UK | Recombinant Growth Factors - Alluvi',
    seoMetaDesc: 'Order IGF-1 LR3 1mg online in Great Britain. High activity recombinant peptide with certified assay results. Secure checkout with bulk purchase tiering.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"IGF-1 LR3 1mg (Alluvi Premium)","offers":{"@type":"Offer","price":"72.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'hgh-fragment-176-191-5mg',
    name: 'HGH Fragment 176-191 5mg (Alluvi Premium)',
    chemicalName: 'AOD9604 Peptide Fragment',
    category: 'Healing & Tissue Repair',
    purity: '99.30%',
    concentration: '5mg',
    price: 38.00,
    image: getPeptideSvg('#ea580c', '#ff975c', 'HGHFR', '5 MG'),
    badge: 'Best Seller',
    shortDesc: 'Purified Human Growth Hormone peptide fragment (176-191) 5mg. Exceptional peptide for adipocyte lipid mobilization and lipolytic signaling research.',
    longDesc: 'HGH Fragment 176-191 is a synthetic peptide representation of the C-terminal region of human growth hormone. It simulates the lipolytic (fat-burning) pathway of growth hormone without elevating blood glucose or impacting insulin sensitivity.',
    benefits: [
      'Selectively triggers lipid catabolism pathways in cellular models',
      'Does not bind growth hormone receptors or cause IGF-1 systemic spikes',
      'HPLC purity rate >99.3%'
    ],
    usageInfo: 'Reconstitute slowly on the vial side. Store reconstituted liquid in darkness.',
    storageInfo: 'Store in standard freezer. Keeps for 24 months dry.',
    specifications: { 'Sequence': 'Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe', 'Molecular Weight': '1815.1 g/mol', 'Purity': '99.30%' },
    faqs: [],
    seoTitle: 'HGH Fragment 176-191 5mg UK | Fat Signaling Peptides',
    seoMetaDesc: 'Buy HGH Fragment 176-191 5mg in the UK. Premium peptide cyclic formula. Verified HPLC purity, fast courier shipment, lab-grade quality.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"HGH Fragment 176-191 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"38.00","priceCurrency":"GBP"}}'
  },
  {
    id: 'tesamorelin-5mg',
    name: 'Tesamorelin 5mg (Alluvi Premium)',
    chemicalName: 'Tesamorelin Acetate',
    category: 'Growth Hormone Secretagogues',
    purity: '99.45%',
    concentration: '5mg',
    price: 54.00,
    image: getPeptideSvg('#0284c7', '#38bdf8', 'TESAM', '5 MG'),
    badge: 'Featured',
    shortDesc: 'Synthetic Growth Hormone Releasing Hormone (GHRH) analog 5mg. Specially designed for lipid reduction, lipodystrophy modeling, and pituitary secretion research.',
    longDesc: 'Tesamorelin is a synthetic peptide consisting of all 44 amino acids of human GHRH with an anchored trans-3-hexenoic acid group. It stimulates pituitary somatotropes to synthesize and release growth hormone, heavily used in adipose lipid distribution research.',
    benefits: [
      'Enhanced resistance to dipeptidyl peptidase-4 (DPP-4) cleavage',
      'Promotes physiological growth hormone release pathways',
      'High HPLC purity >99.4%'
    ],
    usageInfo: 'Reconstitute with bacteriostatic water. Do not agitate to protect secondary peptide folding.',
    storageInfo: 'Keep at -20°C long term. Keep refrigerated after reconstitution and use within 14 days.',
    specifications: { 'Formula': 'C221H366N72O67S', 'Molecular Weight': '5135.9 g/mol', 'Purity': '99.45%' },
    faqs: [],
    seoTitle: 'Tesamorelin 5mg UK | Buy Premium GHRH Analogs - Alluvi',
    seoMetaDesc: 'Buy premium Tesamorelin 5mg in the UK. Lyophilized peptide of >99% purity. HPLC tested with secure UK next-day delivery. Perfect for metabolic laboratory research.',
    schemaMarkup: '{"@context":"https://schema.org","@type":"Product","name":"Tesamorelin 5mg (Alluvi Premium)","offers":{"@type":"Offer","price":"54.00","priceCurrency":"GBP"}}'
  }
];

// Map real image paths from the "shop-page" folder
const imageMapping: Record<string, string> = {
  'retatrutide-2mg': 'shop-page/retatrutide-peptide.webp',
  'retatrutide-5mg': 'shop-page/retatrutide-peptide.webp',
  'retatrutide-10mg': 'shop-page/alluvi-analytical.webp',
  'retatrutide-15mg': 'shop-page/retatrutide-peptide.webp',
  'tirzepatide-5mg': 'shop-page/tirzepatide-peptide.webp',
  'tirzepatide-10mg': 'shop-page/tirzepatide-peptide.webp',
  'tirzepatide-15mg': 'shop-page/tirzepatide-15mg-lyophilized-peptide.webp',
  'tirzepatide-20mg': 'shop-page/tirzepatide-peptide.webp',
  'semaglutide-2mg': 'shop-page/semaglutide-peptide.png',
  'semaglutide-5mg': 'shop-page/semaglutide-peptide.png',
  'semaglutide-10mg': 'shop-page/semaglutide-10mg-lyophilized-peptide.webp',
  'bpc-157-5mg': 'shop-page/bpc-157-peptide.jpg',
  'bpc-157-10mg': 'shop-page/bpc-157-10mg-lyophilized-peptide.webp',
  'bpc-157-15mg': 'shop-page/bpc-157-peptide.jpg',
  'tb-500-2mg': 'shop-page/tb-500-peptide-thymosin-beta-4.jpg',
  'tb-500-5mg': 'shop-page/tb-500-peptide-thymosin-beta-4.jpg',
  'tb-500-10mg': 'shop-page/tb-500-10mg-lyophilized-peptide.webp',
  'cjc-1295-nodac-5mg': 'shop-page/cjc-1295-peptide-no-dac.jpg',
  'cjc-1295-wdac-5mg': 'shop-page/cjc-1295-peptide-no-dac.jpg',
  'ipamorelin-5mg': 'shop-page/ipamorelin-5mg-lyophilized-peptide.avif',
  'ipamorelin-10mg': 'shop-page/ipamorelin-peptide.jpg',
  'ghk-cu-50mg': 'shop-page/ghk-cu-peptide.webp',
  'ghk-cu-100mg': 'shop-page/ghk-cu-peptide.webp',
  'melanotan-2-10mg': 'shop-page/melanotan-ii-peptide.webp',
  'pt-141-10mg': 'shop-page/pt-141-peptide-bremelanotide.webp',
  'epitalon-10mg': 'shop-page/epitalon-peptide.jpg',
  'nad-plus-500mg': 'shop-page/nad-500mg-lyophilized-vial.webp',
  'igf-1-lr3-1mg': 'shop-page/multi-peptide-copper-peptides.webp',
  'hgh-fragment-176-191-5mg': 'shop-page/hgh-frag-176-191-5mg.webp',
  'tesamorelin-5mg': 'shop-page/tesamorelin.webp'
};

// Apply real images over SVG placeholders
for (const product of products) {
  product.fallbackSvg = product.image; // Preserve the beautifully generated SVG as the ultimate fallback
  if (imageMapping[product.id]) {
    product.image = imageMapping[product.id];
  }
}

