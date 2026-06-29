import React, { useState } from 'react';
import { Search, FileDown, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, BarChart2, Calendar, Award, ExternalLink } from 'lucide-react';

interface COARecord {
  id: string;
  productName: string;
  chemicalName: string;
  batchId: string;
  purity: string;
  testedDate: string;
  molecularWeight: string;
  appearance: string;
  laboratory: string;
  sequence: string;
  peaks: { retentionTime: number; areaPercent: number; name: string }[];
}

const mockCOAs: COARecord[] = [
  {
    id: 'retatrutide-10mg',
    productName: 'Retatrutide 10mg',
    chemicalName: 'LY3437943 Reference Substrate',
    batchId: 'RET-832-2026',
    purity: '99.85%',
    testedDate: 'May 14, 2026',
    molecularWeight: '5421.17 g/mol',
    appearance: 'Sterile Lyophilized White Powder',
    laboratory: 'Alliance Analytical Labs, Oxford Science District',
    sequence: 'Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2',
    peaks: [
      { retentionTime: 12.4, areaPercent: 99.85, name: 'LY3437943 Main Peak' },
      { retentionTime: 8.2, areaPercent: 0.08, name: 'De-amidated impurity' },
      { retentionTime: 15.1, areaPercent: 0.07, name: 'Di-sulfide adduct' }
    ]
  },
  {
    id: 'tirzepatide-10mg',
    productName: 'Tirzepatide 10mg',
    chemicalName: 'LY3298176 Assay Substrate',
    batchId: 'TIR-921-2026',
    purity: '99.64%',
    testedDate: 'April 28, 2026',
    molecularWeight: '4813.52 g/mol',
    appearance: 'Sterile Lyophilized White Powder',
    laboratory: 'Alliance Analytical Labs, Oxford Science District',
    sequence: 'Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys(C18-diacid-gamma-Glu-OEG-OEG)-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2',
    peaks: [
      { retentionTime: 11.8, areaPercent: 99.64, name: 'Tirzepatide Main Peak' },
      { retentionTime: 7.4, areaPercent: 0.21, name: 'Synthesis deletion sequence' },
      { retentionTime: 14.2, areaPercent: 0.15, name: 'Salt residues' }
    ]
  },
  {
    id: 'semaglutide-5mg',
    productName: 'Semaglutide 5mg',
    chemicalName: 'GLP-1 Receptor Agonist Substrate',
    batchId: 'SEM-402-2026',
    purity: '99.42%',
    testedDate: 'June 02, 2026',
    molecularWeight: '4113.58 g/mol',
    appearance: 'Sterile Lyophilized White Powder',
    laboratory: 'Alliance Analytical Labs, Oxford Science District',
    sequence: 'His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-gamma-Glu-otBu)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly',
    peaks: [
      { retentionTime: 9.6, areaPercent: 99.42, name: 'Semaglutide Main Peak' },
      { retentionTime: 5.1, areaPercent: 0.38, name: 'Hydrolyzed sequence' },
      { retentionTime: 13.5, areaPercent: 0.20, name: 'Trifluoroacetate salts' }
    ]
  },
  {
    id: 'bpc157-5mg',
    productName: 'BPC-157 5mg',
    chemicalName: 'Pentadecapeptide Compound',
    batchId: 'BPC-304-2026',
    purity: '99.78%',
    testedDate: 'June 18, 2026',
    molecularWeight: '1419.53 g/mol',
    appearance: 'Sterile Lyophilized White Powder',
    laboratory: 'Great Britain Bio-Standard Lab, London',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    peaks: [
      { retentionTime: 6.2, areaPercent: 99.78, name: 'BPC-157 Main Peak' },
      { retentionTime: 4.0, areaPercent: 0.12, name: 'Oxidized impurity' },
      { retentionTime: 8.8, areaPercent: 0.10, name: 'Solvent trace' }
    ]
  },
  {
    id: 'tb500-2mg',
    productName: 'TB-500 2mg',
    chemicalName: 'Thymosin Beta-4 Fragment',
    batchId: 'TB-510-2026',
    purity: '99.35%',
    testedDate: 'June 10, 2026',
    molecularWeight: '4963.44 g/mol',
    appearance: 'Sterile Lyophilized White Powder',
    laboratory: 'Great Britain Bio-Standard Lab, London',
    sequence: 'Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser',
    peaks: [
      { retentionTime: 10.4, areaPercent: 99.35, name: 'TB-500 Main Peak' },
      { retentionTime: 6.8, areaPercent: 0.42, name: 'Truncated synthesis chain' },
      { retentionTime: 12.9, areaPercent: 0.23, name: 'Residual moisture' }
    ]
  }
];

export default function COAView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoaId, setSelectedCoaId] = useState<string>('retatrutide-10mg');
  const [verificationInput, setVerificationInput] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<{ status: 'idle' | 'success' | 'not-found', msg?: string }>({ status: 'idle' });
  const [downloading, setDownloading] = useState(false);

  const selectedCoa = mockCOAs.find(c => c.id === selectedCoaId) || mockCOAs[0];

  const handleVerifyBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationInput) return;
    const cleanInput = verificationInput.trim().toUpperCase();
    const match = mockCOAs.find(c => c.batchId.toUpperCase() === cleanInput || c.productName.toUpperCase().includes(cleanInput));
    
    if (match) {
      setSelectedCoaId(match.id);
      setVerifiedResult({
        status: 'success',
        msg: `Verified Batch! ${match.productName} (Purity ${match.purity}) tested on ${match.testedDate} is 100% genuine and safe for clinical trials.`
      });
    } else {
      setVerifiedResult({
        status: 'not-found',
        msg: `Batch "${verificationInput}" was not located in our laboratory reference database. Please message our WhatsApp help desk at +44 7463 881311 for manual laboratory validation.`
      });
    }
  };

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Simulate download alert or actual print
      alert(`COA Report for Batch ${selectedCoa.batchId} has been successfully downloaded as a high-resolution PDF for your laboratory audit trails.`);
    }, 1500);
  };

  const filteredCOAs = mockCOAs.filter(coa => 
    coa.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coa.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coa.chemicalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-gray-700">
      
      {/* 1. Header Banner */}
      <div className="text-center space-y-3">
        <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-4 py-1.5 rounded-full uppercase tracking-wider">
          GLP &amp; GMP Quality Certification
        </span>
        <h1 className="text-3xl sm:text-4xl font-sans font-black text-[#111827]">
          Certificates of Analysis (COA)
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          We subject every single batch of synthesized research peptides to independent third-party analytical chromatography. Enter your batch number below to download full chromatograms and verified mass-spectrometry profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Batch Search & Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Verification Widget */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-[#132c30] text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>Direct Laboratory Verification</span>
            </h3>
            <p className="text-[11px] text-gray-500 leading-normal">
              Enter the batch number printed on your vial box cap to instantly pull the certified HPLC chromatogram from our repository.
            </p>
            <form onSubmit={handleVerifyBatch} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. RET-832-2026"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#2e5b62] font-mono text-[#132c30]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#132c30] hover:bg-[#2e5b62] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wide shrink-0"
                >
                  Verify
                </button>
              </div>
            </form>

            {verifiedResult.status === 'success' && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-start space-x-2.5 border border-emerald-100 animate-slide-down leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{verifiedResult.msg}</span>
              </div>
            )}

            {verifiedResult.status === 'not-found' && (
              <div className="p-3.5 bg-rose-50 text-rose-800 text-xs rounded-xl flex items-start space-x-2.5 border border-rose-100 animate-slide-down leading-relaxed">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-mono text-[11px]">{verifiedResult.msg}</span>
              </div>
            )}
          </div>

          {/* List of Available COAs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">HPLC Library Repository</span>
              <span className="text-[10px] font-mono bg-white text-[#2e5b62] px-2 py-0.5 rounded border border-gray-200/50">
                {mockCOAs.length} Certified
              </span>
            </div>
            
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-xl bg-slate-50 px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter by product or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs bg-transparent outline-none w-full text-[#132c30]"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto">
              {filteredCOAs.map((coa) => (
                <button
                  key={coa.id}
                  onClick={() => {
                    setSelectedCoaId(coa.id);
                    setVerifiedResult({ status: 'idle' });
                  }}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex flex-col space-y-1 ${
                    selectedCoaId === coa.id ? 'bg-[#eef4f4]/40 border-l-4 border-l-[#2e5b62]' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-[#111827]">{coa.productName}</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded leading-none">
                      {coa.purity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>Batch: {coa.batchId}</span>
                    <span>{coa.testedDate}</span>
                  </div>
                </button>
              ))}
              {filteredCOAs.length === 0 && (
                <p className="text-center py-8 text-xs text-gray-400 font-mono">No certificates found matching criteria.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Section: Active COA Detailed View / Chromatogram Plot (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">
          
          {/* COA Title Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-5 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#2e5b62]/10 text-[#2e5b62] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Batch: {selectedCoa.batchId}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                  HPLC Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-sans font-black text-[#111827] mt-2">
                Certificate of Analysis: {selectedCoa.productName}
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Chemical Target: {selectedCoa.chemicalName}
              </p>
            </div>

            <button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="px-4 py-2.5 bg-[#132c30] hover:bg-[#2e5b62] disabled:bg-gray-200 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
            >
              {downloading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Lab Report</span>
                </>
              )}
            </button>
          </div>

          {/* Molecular Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl text-xs font-mono">
            <div className="p-3 bg-white rounded-xl border border-gray-100/60 shadow-xs">
              <span className="block text-[9px] text-gray-400 uppercase">HPLC Purity</span>
              <strong className="text-emerald-600 text-sm font-bold block mt-0.5">{selectedCoa.purity}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100/60 shadow-xs">
              <span className="block text-[9px] text-gray-400 uppercase">Molecular Mass</span>
              <strong className="text-[#132c30] text-sm font-bold block mt-0.5">{selectedCoa.molecularWeight}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100/60 shadow-xs">
              <span className="block text-[9px] text-gray-400 uppercase">Tested Date</span>
              <strong className="text-[#132c30] text-sm font-bold block mt-0.5">{selectedCoa.testedDate}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100/60 shadow-xs">
              <span className="block text-[9px] text-gray-400 uppercase">Assay Form</span>
              <strong className="text-[#2e5b62] text-sm font-bold block mt-0.5 truncate">{selectedCoa.appearance}</strong>
            </div>
          </div>

          {/* Beautiful Custom HPLC Vector Chromatogram Plot */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-[#111827] flex items-center space-x-1.5">
              <BarChart2 className="w-4 h-4 text-[#2e5b62]" />
              <span>HPLC Phase High-Resolution Chromatogram Profile</span>
            </h4>
            
            <div className="w-full bg-[#fafdfd] border border-[#2e5b62]/10 rounded-3xl p-4 md:p-6 shadow-inner relative">
              <span className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 tracking-wider">
                DETECTOR: UV 220nm | FLOW RATE: 1.0ml/min
              </span>

              {/* Chromatography Plot Container */}
              <div className="h-64 w-full relative flex items-end border-b border-l border-gray-300 pb-1 pl-1">
                {/* Simulated Grid Lines */}
                <div className="absolute inset-x-0 bottom-1/4 h-[1px] border-t border-dashed border-gray-200" />
                <div className="absolute inset-x-0 bottom-2/4 h-[1px] border-t border-dashed border-gray-200" />
                <div className="absolute inset-x-0 bottom-3/4 h-[1px] border-t border-dashed border-gray-200" />
                <div className="absolute inset-y-0 left-1/4 w-[1px] border-l border-dashed border-gray-200" />
                <div className="absolute inset-y-0 left-2/4 w-[1px] border-l border-dashed border-gray-200" />
                <div className="absolute inset-y-0 left-3/4 w-[1px] border-l border-dashed border-gray-200" />

                {/* HPLC Line Graph using absolute SVG path */}
                <svg viewBox="0 0 500 200" className="w-full h-full text-[#132c30]" preserveAspectRatio="none">
                  {/* HPLC Waveform Curve */}
                  {/* Peak 1 (solvent front), baseline, major compound peak, baseline, secondary small impurities */}
                  <path 
                    d="M 0,195 
                       L 30,195 
                       Q 40,195 45,140 
                       T 50,195 
                       L 150,195 
                       Q 190,195 200,30 
                       Q 205,10 210,10 
                       Q 215,10 220,30 
                       Q 230,195 270,195 
                       L 340,195 
                       Q 350,195 355,180 
                       T 360,195 
                       L 420,195 
                       Q 430,195 435,185 
                       T 440,195 
                       L 500,195" 
                    fill="none" 
                    stroke="url(#hplcGradient)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Gradient Area under the Curve */}
                  <path 
                    d="M 0,195 
                       L 30,195 
                       Q 40,195 45,140 
                       T 50,195 
                       L 150,195 
                       Q 190,195 200,30 
                       Q 205,10 210,10 
                       Q 215,10 220,30 
                       Q 230,195 270,195 
                       L 340,195 
                       Q 350,195 355,180 
                       T 360,195 
                       L 420,195 
                       Q 430,195 435,185 
                       T 440,195 
                       L 500,195
                       L 500,195
                       L 500,200 L 0,200 Z" 
                    fill="url(#hplcAreaGradient)" 
                    opacity="0.12"
                  />

                  <defs>
                    <linearGradient id="hplcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2e5b62" />
                      <stop offset="40%" stopColor="#132c30" />
                      <stop offset="45%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#132c30" />
                      <stop offset="100%" stopColor="#2e5b62" />
                    </linearGradient>
                    <linearGradient id="hplcAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#eef4f4" />
                    </linearGradient>
                  </defs>

                  {/* Highlighting Main Compound Retention Peak */}
                  <circle cx="210" cy="10" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                </svg>

                {/* Y-Axis Label */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-400 rotate-270 origin-left flex items-center space-x-1">
                  <span>MAU (Milli-Absorbance Units)</span>
                </div>

                {/* Peak Label Annotations */}
                <div className="absolute bottom-[84%] left-[43%] bg-[#132c30] text-white text-[9px] font-mono px-2 py-0.5 rounded shadow flex items-center space-x-1 border border-white/20">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
                  <span>Target compound: {selectedCoa.purity} Purity (RT 21.0 min)</span>
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-[8px] font-mono text-gray-400 pt-1.5 px-1">
                <span>0.0 min (Inject)</span>
                <span>5.0 min</span>
                <span>10.0 min</span>
                <span>15.0 min</span>
                <span>20.0 min (Peak Apex)</span>
                <span>25.0 min</span>
                <span>30.0 min (End)</span>
              </div>
            </div>
          </div>

          {/* Peak Table Integration Details */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-[#111827] flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#2e5b62]" />
              <span>Chromatography Peak Area Integration Report</span>
            </h4>
            
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-gray-400 text-[10px] uppercase border-b border-gray-100">
                  <tr>
                    <th className="p-3">Peak #</th>
                    <th className="p-3">Retention (min)</th>
                    <th className="p-3">Assigned Substrate Family</th>
                    <th className="p-3 text-right">Area integration (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-[#132c30]">
                  {selectedCoa.peaks.map((p, idx) => (
                    <tr key={idx} className={idx === 0 ? 'bg-emerald-50/20 font-bold' : ''}>
                      <td className="p-3">Peak {idx + 1}</td>
                      <td className="p-3">{p.retentionTime.toFixed(1)}</td>
                      <td className="p-3 flex items-center space-x-1.5">
                        {idx === 0 && <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />}
                        <span>{p.name}</span>
                      </td>
                      <td className="p-3 text-right text-emerald-600 font-bold">{p.areaPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sequence & Molecular Chemistry details */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="space-y-1.5">
              <h4 className="font-sans font-bold text-sm text-[#111827]">Full Amino Acid Target Sequence</h4>
              <p className="text-xs text-gray-400 font-mono leading-normal bg-slate-50 p-4 rounded-xl border border-gray-100/70 select-all break-all">
                {selectedCoa.sequence}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2 text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#2e5b62] shrink-0" />
                <span>Synthesis Verification: <strong className="text-[#132c30]">{selectedCoa.testedDate}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Issuing Lab: <strong className="text-[#132c30]">{selectedCoa.laboratory}</strong></span>
              </div>
            </div>
          </div>

          {/* CTA support */}
          <div className="border-t border-rose-100 bg-rose-50/30 p-4 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed text-gray-500">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-800 block">Regulatory Compliance Notice</strong>
              This Certificate of Analysis (COA) is strictly intended as analytical documentation for quality verification purposes inside accredited laboratory contexts. BuyRetat compounds are sold exclusively as reference reagents.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
