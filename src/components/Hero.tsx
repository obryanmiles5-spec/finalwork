import React from 'react';
import { ShoppingCart, PhoneCall, ShieldCheck, Truck, Award, Zap } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { getPeptideSvg } from '../data/products';

interface HeroProps {
  onShopNowClick: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent("Hello BuyRetat UK, I would like to place an order for high-purity Retatrutide and other research peptides. Please provide pricing and cryptocurrency/bank transfer details.");
    window.open(`https://wa.me/447529469162?text=${text}`, '_blank');
  };

  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden py-20 md:py-28 border-b border-[#2e5b62]/20 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: 'url("Home.png")' }}
    >
      {/* Premium luxury translucent overlay that makes the beautiful background image highly visible while ensuring text contrasts perfectly and looks premium */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1c1f]/85 via-[#132c30]/60 to-[#0d1c1f]/75 z-0" />


      {/* Absolute background grid pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2e5b62" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
              <span className="text-[#e1f5f7]">Premium Research Grade Reference Materials</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#14b8a6]">Retatrutide UK</span>
              </h1>
              <p className="text-slate-200 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience Alluvi-grade chemical engineering. Our triple-agonist <strong className="text-[#38bdf8] font-semibold">Retatrutide (LY3437943)</strong> is vacuum sealed with verified purity levels exceeding 99.8%. Tailored specifically for clinical trials and cellular research in Great Britain.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-shop-cta"
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#14b8a6] text-white font-semibold rounded-xl shadow-lg shadow-[#0ea5e9]/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transform hover:-translate-y-0.5 cursor-pointer border-none"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Premium Catalog</span>
              </button>
            </div>

            {/* Minimal Sub-Trust Badge */}
            <p className="text-xs text-slate-400 font-mono tracking-wide">
              *All compounds are strictly limited to laboratory research and in vitro evaluations. Not for human use.
            </p>
          </div>

          {/* Right Column: High Quality Interactive Product Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Absolute Glowing Backdrop */}
            <div className="absolute w-72 h-72 bg-[#2e5b62]/10 blur-3xl rounded-full -top-10 -left-10 z-0"></div>
            <div className="absolute w-72 h-72 bg-[#d97706]/5 blur-3xl rounded-full -bottom-10 -right-10 z-0"></div>

            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#2e5b62]/10 w-full max-w-sm transform hover:scale-[1.02] transition-transform duration-500">
              {/* Scientific details header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <span className="font-mono text-[10px] text-[#2e5b62] font-semibold">ALLUVI ANALYTICAL</span>
                <span className="bg-[#10b981]/10 text-[#10b981] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">HPLC VERIFIED</span>
              </div>

              {/* Product Visual */}
              <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner group p-4">
                <ProductImage 
                  productId="retatrutide-10mg"
                  alt="Alluvi Retat 10mg" 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  fallbackSvg={getPeptideSvg('#2e5b62', '#10b981', 'RETAT', '10 MG')}
                />
              </div>

              {/* Lab Stats */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono">
                <div className="text-left">
                  <span className="block text-gray-400 text-[10px]">CHEMICAL CODE:</span>
                  <strong className="text-[#132c30] text-xs">LY3437943</strong>
                </div>
                <div className="text-right">
                  <span className="block text-gray-400 text-[10px]">UK BATCH REGISTRATION:</span>
                  <strong className="text-[#2e5b62] text-xs">#RET-832-2026</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. HORIZONTAL TRUST BADGES SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-[#2e5b62]/10">
          
          <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#2e5b62]/10 flex items-center justify-center text-[#2e5b62] shrink-0">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-[#111827]">Certified Lab Tested</h4>
              <p className="text-xs text-gray-500">Purity verified above 99%</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#2e5b62]/10 flex items-center justify-center text-[#2e5b62] shrink-0">
              <Truck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-[#111827]">Next-Day UK Delivery</h4>
              <p className="text-xs text-gray-500">Fully tracked Royal Mail</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#2e5b62]/10 flex items-center justify-center text-[#2e5b62] shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-[#111827]">Secure SSL Checkout</h4>
              <p className="text-xs text-gray-500">Bank Transfer & Cryptos</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#2e5b62]/10 flex items-center justify-center text-[#2e5b62] shrink-0">
              <Award className="w-5.5 h-5.5 text-[#d97706]" />
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-[#111827]">Premium Alluvi Sourcing</h4>
              <p className="text-xs text-gray-500">100% Guaranteed delivery</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
