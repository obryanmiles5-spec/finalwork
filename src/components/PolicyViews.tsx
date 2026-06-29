import React from 'react';
import { Truck, RotateCcw, ShieldAlert, FileText, CheckCircle2, AlertCircle, ShieldCheck, Mail, Calendar, MapPin } from 'lucide-react';

interface PolicyViewProps {
  viewType: 'shipping-policy' | 'refund-policy' | 'privacy-policy' | 'terms-policy';
  onBackToHome: () => void;
}

export default function PolicyViews({ viewType, onBackToHome }: PolicyViewProps) {
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in text-gray-600 text-sm leading-relaxed">
      
      {/* Dynamic Render based on viewType */}
      {viewType === 'shipping-policy' && (
        <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="space-y-4 text-center border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-[#eef4f4] text-[#2e5b62] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Truck className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3 py-1 rounded-full uppercase">
              Clinical Cold Chain Logistics Protocol
            </span>
            <h1 className="text-3xl font-sans font-black text-[#111827]">
              Shipping &amp; Insulated Logistics Policy
            </h1>
            <p className="text-gray-400 text-xs font-mono">
              Last Updated: June 2026 | Document Reference: LLP-UK-2026-v4
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>1. Thermally Insulated Cold Chain Packing</span>
            </h3>
            <p>
              Peptide molecules are complex amino acid chains held together by delicate covalent bonds. Exposure to elevated temperatures during transit can trigger denaturation, resulting in molecular fragmentation and complete loss of assay utility.
            </p>
            <p>
              To eliminate thermal degradation hazards, <strong>Alluvi BioLabs</strong> ships all reference materials inside vacuum-sealed medical grade aluminum bubble pouches packed with proprietary, pre-frozen food-grade gel refrigerant packs. This passive refrigeration chamber maintains a consistent temperature of <strong>2°C to 8°C (35.6°F to 46.4°F)</strong> for up to 72 hours, insulating the vials against severe postal sorting warehouse fluctuations.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>2. Courier Carriers and Same-Day UK Dispatch</span>
            </h3>
            <p>
              We dispatch all stocked reference products natively from our storage facilities in the <strong>Oxford Science Park, United Kingdom</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Domestic Standard:</strong> Royal Mail Tracked 24 (Delivered within 1 business day). Fully traceable through the online postal portal.</li>
              <li><strong>Domestic Express:</strong> Royal Mail Special Delivery Guaranteed by 1pm (Next-day signature required). Recommended for fragile metabolic assays.</li>
              <li><strong>International Shipments:</strong> Handled via DHL Express Cold-Chain Logistics, bypassing traditional customs holding queues where possible under strict scholastic chemical codes.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>3. Handling Upon Arrival</span>
            </h3>
            <p>
              Upon receipt of your shipment, researchers must immediately unpack the insulated container. The lyophilized vials must be placed inside a dark, temperature-controlled environment:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-gray-100">
              <li>Short-term storage (under 30 days): Store at 2°C to 8°C (Standard clinical refrigerator).</li>
              <li>Long-term storage (up to 2 years): Freeze at -20°C to -80°C. Keep protected from moisture and ultraviolet light.</li>
              <li>DO NOT freeze and thaw repeatedly, as this damages the crystalline lattice of the lyophilized cakes.</li>
            </ul>
          </div>

          {/* Alert Notice */}
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Discreet &amp; Safe Academic Labeling:</strong> All shipments are packaged inside sterile outer envelopes with zero external references to peptides, hormones, or clinical trials to ensure maximum privacy, compliance, and swift delivery without delays.
            </div>
          </div>
        </div>
      )}

      {viewType === 'refund-policy' && (
        <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="space-y-4 text-center border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-[#eef4f4] text-[#2e5b62] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <RotateCcw className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3 py-1 rounded-full uppercase">
              Guaranteed Delivery and Research Assurances
            </span>
            <h1 className="text-3xl font-sans font-black text-[#111827]">
              Refund &amp; Custom Reship Policy
            </h1>
            <p className="text-gray-400 text-xs font-mono">
              Last Updated: June 2026 | Document Reference: RRP-UK-2026-v2
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>1. 100% Guaranteed UK Delivery Policy</span>
            </h3>
            <p>
              Because our reference products are shipped directly from within Great Britain, they are completely immune to traditional customs seizures or inspection blockages that plague international peptide importers. 
            </p>
            <p>
              In the highly unlikely event that a package is lost, damaged, or severely delayed by Royal Mail (i.e. if tracking fails to show delivery within 10 business days), we will initiate a <strong>100% free, priority reshipment</strong> of your exact order order, packed with fresh cooling units, no questions asked.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>2. Quality Discrepancy &amp; Laboratory Reshipment</span>
            </h3>
            <p>
              At Alluvi, we maintain deep scientific confidence in our chemical synthesis standards. If an independent High-Performance Liquid Chromatography (HPLC) or Mass Spectrometry (MS) scan of our products is performed by an accredited academic facility (such as a university department laboratory) and shows a purity level below our advertised <strong>98%</strong>, please submit the formal analytical chromatogram to our team.
            </p>
            <p>
              We will immediately issue a full refund of your invoice amount, or provide a custom, newly synthesized batch of reference materials free of charge.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>3. Return Constraints</span>
            </h3>
            <p>
              Due to the sensitive biochemical nature of lyophilized peptides and the strict cold chain logistics required to preserve molecular integrity, <strong>we cannot accept physical returns of opened or ambient-exposed peptide vials</strong>. 
            </p>
            <p>
              Once a vial leaves our sterile refrigeration vaults and is subjected to unmonitored atmospheric, thermal, or shipping conditions, we can no longer guarantee its stability to other researchers. All approved claims are handled exclusively through full refunds or brand-new courier dispatches.
            </p>
          </div>

          {/* Alert Notice */}
          <div className="bg-[#132c30]/5 border border-[#2e5b62]/10 text-[#132c30] p-4 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed">
            <AlertCircle className="w-5 h-5 text-[#2e5b62] shrink-0 mt-0.5" />
            <div>
              <strong>Resolving Logistics Inquiries:</strong> If you have any concerns regarding a package currently in transit, please contact our dispatch team via email at <strong>contact@buyretat.co.uk</strong> or open a live ticket with our WhatsApp pharmacist line. We respond to all claims within 2 hours.
            </div>
          </div>
        </div>
      )}

      {viewType === 'privacy-policy' && (
        <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="space-y-4 text-center border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-[#eef4f4] text-[#2e5b62] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3 py-1 rounded-full uppercase">
              EU &amp; UK GDPR Data Security Compliance
            </span>
            <h1 className="text-3xl font-sans font-black text-[#111827]">
              Privacy &amp; Data Security Protocol
            </h1>
            <p className="text-gray-400 text-xs font-mono">
              Last Updated: June 2026 | Document Reference: PDP-UK-2026-v2
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>1. Information We Collect</span>
            </h3>
            <p>
              We collect minimal, necessary details strictly for the fulfillment of reference orders, invoice generation, and secure account creation under UK data protection frameworks:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Contact Information:</strong> Full Name, institutional affiliation (if applicable), email address, and billing/shipping address.</li>
              <li><strong>Technical Logs:</strong> IP address, device telemetry, and referral links used purely to prevent fraudulent cryptocurrency invoicing attempts.</li>
              <li><strong>WhatsApp Correspondence:</strong> Secure chat text exchanged during direct pharmacist support, deleted periodically from local devices under high-security guidelines.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>2. Encryption and Database Cleansing</span>
            </h3>
            <p>
              We prioritize customer confidentiality. To secure private scientific purchasing histories:
            </p>
            <p>
              All customer database profiles and transaction histories are protected using military-grade <strong>AES-256 bit database encryption</strong>. Shipping details are scrubbed clean from our local network databases exactly <strong>30 days</strong> after order receipt to ensure absolute physical security and privacy for all metabolic researchers.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>3. Sharing Restrictions (Zero Third-Party Disclosures)</span>
            </h3>
            <p>
              We maintain a strict <strong>zero sharing guarantee</strong>. Under no circumstances will Alluvi or BuyRetat UK sell, share, lease, or distribute private customer databases, purchase statistics, email lists, or research parameters to marketing networks, commercial pharmaceutical coalitions, or outside entities.
            </p>
          </div>

          {/* Alert Notice */}
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Fully Cryptographic Payment Security:</strong> Our blockchain invoices and payments are validated peer-to-peer over secure decentralized protocols. This ensures your scientific research funding and payments leave zero bank trace, shielding sensitive pre-clinical studies.
            </div>
          </div>
        </div>
      )}

      {viewType === 'terms-policy' && (
        <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="space-y-4 text-center border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-[#eef4f4] text-[#2e5b62] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <FileText className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3 py-1 rounded-full uppercase">
              Institutional Terms of Scholastic Usage
            </span>
            <h1 className="text-3xl font-sans font-black text-[#111827]">
              Terms &amp; Institution Conditions
            </h1>
            <p className="text-gray-400 text-xs font-mono">
              Last Updated: June 2026 | Document Reference: TOC-UK-2026-v3
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 text-rose-800 bg-rose-50/40 p-5 rounded-2xl border border-rose-100/60">
            <h3 className="font-sans font-extrabold text-base text-rose-950 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>CRITICAL: INTENDED SCIENTIFIC USE ONLY</span>
            </h3>
            <p className="text-xs">
              All chemical products, reference peptides, and molecular compounds displayed on <strong>buyretat.co.uk</strong> are sold strictly for in vitro laboratory modeling, cellular assay testing, diagnostic evaluation, and pre-clinical academic research.
            </p>
            <p className="text-xs font-bold">
              THESE PRODUCTS ARE NOT LICENSED, INTENDED, OR APPROVED FOR HUMAN OR ANIMAL INJECTION, CONSUMPTION, THERAPEUTIC TREATMENT, OR DIETARY USE.
            </p>
            <p className="text-xs">
              Any purchase made under the pretense of personal administration, body building, weight loss, or direct therapeutic intervention constitutes a direct violation of these Terms of Service and will result in immediate cancellation of your invoice and customer profile blacklisting.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827]">
              1. Purchaser Qualifications &amp; Responsibilities
            </h3>
            <p>
              By accessing this catalog or submitting an order, you represent and warrant that you are associated with an accredited laboratory, biotechnology firm, university research department, or established scientific institution. 
            </p>
            <p>
              You certify that you possess the necessary specialized safety gear, ventilation hoods, sterile reconstitution protocols, and certified clinical disposal processes to handle advanced research reagents like Retatrutide and Tirzepatide safely.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827]">
              2. Intellectual Property and Content Disclaimer
            </h3>
            <p>
              All academic blog content, HPLC integration summaries, molecular illustrations, and WooCommerce developer snippets published across our platform are provided solely for scholastic literature review and educational rankings support. They do not constitute formal medical advice, chemical guidelines, or legal counsel.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-base text-[#111827]">
              3. Limitation of Liability
            </h3>
            <p>
              In no event shall Alluvi BioLabs, its lead chemists, developers, or affiliates be held liable for any damages (including, without limitation, laboratory cellular assay failures, structural peptide degradation due to improper cold storage, or administrative penalties) arising from the handling, storage, or misuse of our materials. Sourcing from our catalog represents a full assumption of all laboratory trial risk.
            </p>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="text-center pt-6">
        <button
          onClick={onBackToHome}
          className="px-6 py-3 bg-[#132c30] hover:bg-[#2e5b62] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
        >
          Return to Laboratory Home Page
        </button>
      </div>

    </div>
  );
}
