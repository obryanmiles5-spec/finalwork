import React, { useState } from 'react';
import { X, Check, ShoppingCart, Award, ShieldCheck, Thermometer, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
  relatedProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  isInCart,
  relatedProducts,
  onSelectRelated
}: QuickViewModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reconstitution'>('info');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!product) return null;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        id={`quickview-modal-${product.id}`}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="bg-[#132c30] text-white px-6 py-4 flex items-center justify-between border-b border-[#2e5b62]/20">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-[#10b981]" />
            <span className="font-mono text-xs tracking-wider uppercase font-semibold">Analytical Reference Material Spec Sheet</span>
          </div>
          <button 
            id="close-quick-view-btn"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Product Image & Badges */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="aspect-square bg-[#f8fafc] rounded-2xl p-6 flex items-center justify-center border border-gray-100 shadow-inner relative">
                <ProductImage 
                  productId={product.id}
                  alt={product.name} 
                  className="w-full h-full object-contain"
                  fallbackSvg={product.fallbackSvg}
                />
                
                {/* Certified badges overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full animate-ping" />
                  <span className="font-mono text-[9px] font-bold text-[#132c30]">UK LAB TESTED APPROVED</span>
                </div>
              </div>

              {/* Quality Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col space-y-1">
                  <span className="font-mono text-[10px] text-gray-400">HPLC PURITY:</span>
                  <span className="font-sans font-bold text-[#132c30] text-base">{product.purity}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col space-y-1">
                  <span className="font-mono text-[10px] text-gray-400">CONCENTRATION:</span>
                  <span className="font-sans font-bold text-[#2e5b62] text-base">{product.concentration}</span>
                </div>
              </div>

              {/* Related recommendations */}
              <div className="space-y-3">
                <h4 className="text-xs font-sans font-extrabold text-[#111827] uppercase tracking-wide">Synergistic Peptides:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {relatedProducts.slice(0, 3).map((rel) => (
                    <div 
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="bg-[#f8fafc] hover:bg-[#eef4f4] border border-gray-100 hover:border-[#2e5b62]/30 p-2.5 rounded-xl cursor-pointer flex flex-col items-center justify-between transition-colors h-24"
                    >
                      <ProductImage 
                        productId={rel.id} 
                        alt={rel.name} 
                        className="w-10 h-10 object-contain" 
                        fallbackSvg={rel.fallbackSvg}
                      />
                      <span className="text-[9px] font-sans font-bold text-center text-gray-700 truncate w-full">{rel.concentration} {rel.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Title and Badge */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#2e5b62]/10 text-[#2e5b62] font-mono text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {product.category}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-600 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-rose-100/50">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                      <span>{Math.floor(11 + (product.name.length % 8))} Researchers Viewing Online</span>
                    </span>
                    <span className="text-gray-400 text-xs font-mono">
                      CHEMICAL COMPOSITION: {product.chemicalName}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#111827]">
                    {product.name}
                  </h2>
                </div>

                {/* Tabs selection */}
                <div className="flex border-b border-gray-200 mt-6 mb-4 font-mono text-xs overflow-x-auto whitespace-nowrap">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`py-2 px-4 border-b-2 font-medium cursor-pointer transition-colors ${
                      activeTab === 'info' 
                        ? 'border-[#2e5b62] text-[#2e5b62]' 
                        : 'border-transparent text-gray-500 hover:text-[#132c30]'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 px-4 border-b-2 font-medium cursor-pointer transition-colors ${
                      activeTab === 'specs' 
                        ? 'border-[#2e5b62] text-[#2e5b62]' 
                        : 'border-transparent text-gray-500 hover:text-[#132c30]'
                    }`}
                  >
                    Molecular Data
                  </button>
                  <button
                    onClick={() => setActiveTab('reconstitution')}
                    className={`py-2 px-4 border-b-2 font-medium cursor-pointer transition-colors ${
                      activeTab === 'reconstitution' 
                        ? 'border-[#2e5b62] text-[#2e5b62]' 
                        : 'border-transparent text-gray-500 hover:text-[#132c30]'
                    }`}
                  >
                    Lab Preparation
                  </button>
                </div>

                {/* Tab content 1: Specifications */}
                {activeTab === 'info' && (
                  <div className="space-y-4 animate-fade-in text-sm text-gray-600">
                    <p className="leading-relaxed">{product.longDesc}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-sans font-extrabold text-[#111827] text-xs uppercase tracking-wide">Key Research Pathways:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-gray-50">
                            <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab content 2: Molecular Data */}
                {activeTab === 'specs' && (
                  <div className="space-y-4 animate-fade-in text-sm text-gray-600">
                    <div className="bg-[#132c30]/5 rounded-xl p-4 border border-[#2e5b62]/10 space-y-3">
                      <h4 className="font-sans font-extrabold text-[#132c30] text-xs uppercase tracking-wide">Chromatography & Sequence Parameters:</h4>
                      <table className="w-full text-xs font-mono">
                        <tbody>
                          {Object.entries(product.specifications).map(([key, val]) => (
                            <tr key={key} className="border-b border-gray-100 last:border-0">
                              <td className="py-2 text-gray-400 uppercase font-bold">{key}</td>
                              <td className="py-2 text-[#132c30] text-right font-medium">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab content 3: Reconstitution */}
                {activeTab === 'reconstitution' && (
                  <div className="space-y-4 animate-fade-in text-sm text-gray-600">
                    <div className="bg-[#d97706]/5 border border-[#d97706]/20 p-4 rounded-xl flex items-start space-x-3">
                      <Thermometer className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans font-extrabold text-[#b45309] text-xs uppercase tracking-wide">Storage Notice:</h4>
                        <p className="text-xs text-[#b45309] mt-1 leading-relaxed">{product.storageInfo}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-sans font-extrabold text-[#111827] text-xs uppercase tracking-wide">Reconstitution Guidelines:</h4>
                      <p className="text-xs leading-relaxed">{product.usageInfo}</p>
                    </div>
                  </div>
                )}

                {/* Frequently Asked Questions specific to product */}
                {product.faqs && product.faqs.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-sans font-extrabold text-[#111827] uppercase tracking-wide mb-3">Product Support FAQ:</h4>
                    <div className="space-y-2">
                      {product.faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full bg-slate-50 hover:bg-slate-100 px-4 py-2.5 flex justify-between items-center text-[#132c30] font-semibold text-left"
                          >
                            <span>{faq.question}</span>
                            {openFaqIndex === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          {openFaqIndex === idx && (
                            <div className="px-4 py-3 bg-white text-gray-500 leading-relaxed border-t border-gray-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Drawer adding to cart */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div>
                  <span className="text-[10px] font-mono block text-gray-400">RESEARCH PRICE (INCL. UK EXPEDITED DELIVERY):</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-[#111827]">
                      £{product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 uppercase">GBP / VIAL</span>
                  </div>
                </div>

                <button
                  id={`quick-add-cart-${product.id}`}
                  onClick={() => onAddToCart(product)}
                  className={`px-8 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer ${
                    isInCart
                      ? 'bg-[#10b981] hover:bg-[#059669] text-white'
                      : 'bg-[#132c30] hover:bg-[#2e5b62] text-white shadow-[#132c30]/10'
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>In Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Research Kit</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
