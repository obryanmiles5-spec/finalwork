import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, Truck, Award, ShieldCheck, HelpCircle, Mail, Phone, 
  MapPin, Clock, MessageSquare, ChevronDown, ChevronUp, Star, Send, 
  Check, Heart, GitCompare, Sparkles, AlertCircle, ShoppingCart, ArrowRight 
} from 'lucide-react';

import { Product, CartItem, BlogPost, FAQ } from './types';
import { products } from './data/products';
import { blogs } from './data/blogs';
import { faqs } from './data/faqs';

import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutView from './components/CheckoutView';
import BlogView from './components/BlogView';
import DevHub from './components/DevHub';
import COAView from './components/COAView';
import PolicyViews from './components/PolicyViews';
import ReviewsSlider from './components/ReviewsSlider';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Wishlist & Compare States (Local Storage persistent)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('buyretat_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('buyretat_compare');
    return saved ? JSON.parse(saved) : [];
  });

  // Newsletter & Contact Form States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // SEO accordion expand state
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  
  // General active FAQ index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');

  // Persist lists
  useEffect(() => {
    localStorage.setItem('buyretat_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('buyretat_compare', JSON.stringify(compareList));
  }, [compareList]);

  // Scroll to top on activeView change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  // Handler functions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Triggers feedback notice
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleToggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 products at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ad4d9f49-6bfb-49a9-8436-bf1191ef9821',
          subject: 'New Newsletter Subscription - Alluvi UK',
          from_name: 'Alluvi UK Newsletter',
          email: newsletterEmail
        })
      }).catch(err => console.error('Form submission error:', err));

      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'ad4d9f49-6bfb-49a9-8436-bf1191ef9821',
        subject: `New Contact Message: ${contactForm.subject || 'No Subject'}`,
        from_name: contactForm.name || 'Alluvi UK Website Visitor',
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message
      })
    }).catch(err => console.error('Contact form submission error:', err));

    setContactSuccess(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Direct active navigation trigger
  const navigateToShop = () => {
    setActiveView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Floating WhatsApp Support trigger
  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent("Hello Alluvi BuyRetat UK, I am studying your clinical peptide catalogs on buyretat.co.uk and would like to request technical specifications or arrange custom bank transfer/crypto invoicing.");
    window.open(`https://wa.me/447529469162?text=${text}`, '_blank');
  };

  // Filter 8 products for Homepage display
  const homepageProducts = products.slice(0, 8);

  // Filter and Search Catalog for Shop page
  const filteredCatalogProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    
    const catLower = p.category.toLowerCase();
    const selLower = selectedCategory.toLowerCase();
    
    if (selLower === 'growth factor') {
      return matchesSearch && (catLower.includes('growth hormone') || catLower.includes('growth factor'));
    }
    if (selLower === 'recovery') {
      return matchesSearch && catLower.includes('healing');
    }
    if (selLower === 'cognitive') {
      return matchesSearch && (catLower.includes('cosmetic') || catLower.includes('melanocortin'));
    }
    if (selLower === 'vitamins') {
      return matchesSearch && (catLower.includes('vitamin') || catLower.includes('nad'));
    }
    
    return matchesSearch && catLower === selLower;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-800 antialiased selection:bg-[#2e5b62]/10 selection:text-[#132c30]">
      
      {/* 1. STICKY HEADER & ROTATING ANNOUNCEMENT SLIDER */}
      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* MAIN VIEWPORT ROUTER */}
      <main className="flex-grow">
        
        {/* VIEW A: HOME VIEW */}
        {activeView === 'home' && (
          <div className="animate-fade-in space-y-20">
            {/* 1. HERO SECTION */}
            <Hero onShopNowClick={navigateToShop} />

            {/* 2. CATEGORY HORIZONTAL SLIDER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-10">
                <span className="font-mono text-xs text-[#2e5b62] font-semibold tracking-wider uppercase bg-[#2e5b62]/10 px-3 py-1 rounded-full">Explore Assays</span>
                <h2 className="text-3xl font-sans font-black text-[#111827]">Peptide Class Categories</h2>
                <p className="text-gray-500 text-sm max-w-lg mx-auto">Click any category to filter our lab catalog instantly</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { id: 'Retatrutide', label: 'Retatrutide (LY3)', icon: '🧬' },
                  { id: 'Tirzepatide', label: 'Tirzepatide', icon: '🧪' },
                  { id: 'Semaglutide', label: 'Semaglutide', icon: '💉' },
                  { id: 'Growth Factor', label: 'Growth Factors', icon: '📊' },
                  { id: 'Recovery', label: 'Cell Recovery', icon: '❤️' },
                  { id: 'Cognitive', label: 'Cognitive Research', icon: '🧠' }
                ].map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveView('shop');
                    }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#2e5b62]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center space-y-3 cursor-pointer group hover:-translate-y-1 text-center"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                    <span className="text-xs font-sans font-extrabold text-[#111827] group-hover:text-[#2e5b62] transition-colors">{cat.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. FEATURED PRODUCTS (2x4 GRID) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 mb-10 gap-4">
                <div className="text-center md:text-left">
                  <span className="font-mono text-xs text-[#2e5b62] font-bold uppercase">UK Laboratory Sourced</span>
                  <h2 className="text-3xl font-sans font-black text-[#111827] mt-1">Featured Best Sellers</h2>
                </div>
                <button
                  onClick={navigateToShop}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-gray-200 hover:border-[#132c30] text-[#132c30] text-xs font-bold rounded-xl uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse All 30 Peptides</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {homepageProducts.map((p) => (
                  <ProductCard 
                    key={p.id}
                    product={p}
                    onAddToCart={handleAddToCart}
                    onQuickView={setSelectedProduct}
                    isWishlisted={wishlist.includes(p.id)}
                    onToggleWishlist={handleToggleWishlist}
                    isCompared={compareList.includes(p.id)}
                    onToggleCompare={handleToggleCompare}
                    isInCart={cart.some((item) => item.product.id === p.id)}
                  />
                ))}
              </div>
            </section>

            {/* 4. WHY CHOOSE US (Alluvi benefits & logistics) */}
            <section className="bg-gradient-to-br from-[#132c30] to-[#0f1a1c] text-white py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="font-mono text-xs text-[#10b981] font-bold tracking-widest uppercase">ALLUVI STANDARDS</span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight leading-tight">Why Sourcing From BuyRetat UK Secures Scientific Accuracy</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">We handle references and model substrates with deep clinical integrity. Our cold chain shipping system and synthetic purity protocols bypass low-quality impurities that disrupt assay readouts.</p>
                    
                    <div className="space-y-4 pt-2">
                      <div className="flex items-start space-x-3 text-xs text-slate-200">
                        <Check className="w-5 h-5 text-[#10b981] shrink-0" />
                        <span>HPLC analytical testing included with every single batch.</span>
                      </div>
                      <div className="flex items-start space-x-3 text-xs text-slate-200">
                        <Check className="w-5 h-5 text-[#10b981] shrink-0" />
                        <span>Thermally insulated medical-grade cooling boxes for fast shipping.</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5">
                      <span className="text-2xl">🥶</span>
                      <h3 className="font-sans font-bold text-base">Cold Pack Insulation</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">Peptides degrade rapidly under thermal fluctuations. Our logistics system packs every order inside chilled insulated foils to guarantee 100% integrity.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5">
                      <span className="text-2xl">🪙</span>
                      <h3 className="font-sans font-bold text-base">30% Crypto Invoicing</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">Save huge amounts on clinical trials. Settle payments seamlessly via Bitcoin, USDT, or major networks to receive immediate 30% discount automatically.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5">
                      <span className="text-2xl">🇬🇧</span>
                      <h3 className="font-sans font-bold text-base">100% British Dispatch</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">Skip long customs holding. All reference materials are stocked, boxed, and dispatched natively from our clean facilities in Great Britain.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5">
                      <span className="text-2xl">🔬</span>
                      <h3 className="font-sans font-bold text-base">Third-Party Certificates</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">Verify chromatograms with ease. Download detailed analytical MS reports for your laboratory records on our developer portal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. TESTIMONIALS (Scientific laboratory reviews) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50/50 rounded-3xl border border-gray-100/50">
              <div className="text-center space-y-2 mb-12">
                <span className="font-mono text-xs text-[#2e5b62] font-semibold tracking-wider uppercase">Institutional Trust</span>
                <h2 className="text-3xl font-sans font-black text-[#111827]">Cited by Researchers Across Great Britain</h2>
              </div>

              <ReviewsSlider />
            </section>

            {/* 6. FAQ PREVIEW (4 highly relevant FAQs) */}
            <section 
              className="max-w-4xl mx-auto px-6 py-12 my-12 rounded-3xl border border-gray-200/50 shadow-sm relative overflow-hidden bg-slate-900/5 text-white"
              style={{ 
                backgroundImage: 'url("/FAQS.avif")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
              }}
            >
              {/* Soft overlay to ensure readability while keeping image fully visible and sharp */}
              <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-center space-y-2 mb-10">
                  <span className="font-mono text-xs text-emerald-300 font-extrabold tracking-wider uppercase bg-slate-900/70 px-3 py-1 rounded-full inline-block">Scientific Support</span>
                  <h2 className="text-3xl font-sans font-black text-white drop-shadow-sm">Frequently Answered Inquiries</h2>
                </div>

                <div className="space-y-3 max-w-2xl mx-auto">
                  {faqs.slice(0, 4).map((faq, idx) => (
                    <div key={faq.id} className="bg-white/95 hover:bg-white backdrop-blur-none rounded-2xl border border-white/10 overflow-hidden text-sm transition-all duration-200 shadow-sm">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full px-6 py-4 flex justify-between items-center text-[#132c30] font-bold text-left transition-colors"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-[#2e5b62]" /> : <ChevronDown className="w-4 h-4 text-[#2e5b62]" />}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-6 py-4 bg-slate-50 text-slate-600 font-medium leading-relaxed border-t border-slate-100 text-xs">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => { setActiveView('faqs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs font-mono text-emerald-300 hover:text-emerald-200 uppercase font-black bg-slate-900/80 hover:bg-slate-900/90 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer hover:scale-105 inline-block"
                  >
                    View All FAQ Support Categories
                  </button>
                </div>
              </div>
            </section>

            {/* 7. LATEST BLOG POSTS (3 articles) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 mb-10 gap-4">
                <div>
                  <span className="font-mono text-xs text-[#2e5b62] font-bold uppercase">Journal Clippings</span>
                  <h2 className="text-3xl font-sans font-black text-[#111827] mt-1">Biomedical Peptide Literature</h2>
                </div>
                <button
                  onClick={() => { setActiveView('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-4 py-2 border border-gray-200 hover:border-[#132c30] text-[#132c30] text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer bg-white"
                >
                  View All 15 Articles
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.slice(0, 3).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => { setActiveView('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="bg-white rounded-3xl border border-gray-100 hover:border-[#2e5b62]/20 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="aspect-video bg-slate-100 overflow-hidden relative">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-sans font-extrabold text-[#111827] text-sm group-hover:text-[#2e5b62] transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{post.introduction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. NEWSLETTER SIGNUP */}
            <section 
              className="relative py-20 border-t border-b border-gray-200/50 bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: "url('/Bckground%20Image.png')" }}
            >
              {/* Overlay for high contrast and readability */}
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />

              <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6 z-10">
                <span className="text-3xl filter drop-shadow">📧</span>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-sans font-black text-white">Join our UK Clinical Dispatch Journal</h3>
                  <p className="text-slate-200 text-sm max-w-md mx-auto">Get notified immediately when new clinical batches clear HPLC chromatography. Pure information, zero spam.</p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter researcher email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white border border-transparent rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#14b8a6] text-[#132c30]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-md"
                  >
                    Subscribe
                  </button>
                </form>

                {newsletterSuccess && (
                  <p className="text-xs font-mono text-[#10b981] animate-pulse">Subscription registered successfully! HPLC alerts active.</p>
                )}
              </div>
            </section>

            {/* 9. 500+ WORDS SEO EXPANDABLE CONTENT SECTION (For search rankings) */}
            <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsSeoExpanded(!isSeoExpanded)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:text-[#132c30] text-xs font-mono tracking-wide bg-white transition-all hover:border-[#2e5b62]/30 cursor-pointer"
              >
                <span>{isSeoExpanded ? 'Collapse Clinical Dossier' : 'Expand "Retatrutide UK" Clinical Dossier (500+ Words)'}</span>
                {isSeoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isSeoExpanded && (
                <div className="text-left text-sm text-gray-600 leading-relaxed space-y-6 pt-8 animate-slide-down">
                  <h3 className="font-sans font-extrabold text-[#111827] text-lg">Retatrutide UK: Sourcing High-Purity Reference Standards for Biomedical In Vitro Modeling</h3>
                  
                  <p>In the fields of metabolic and biochemical research within the United Kingdom, the discovery of triple-agonist mechanisms has represented a revolutionary shift. <strong className="text-[#132c30]">Retatrutide (LY3437943)</strong> stands at the forefront of these investigations. Acting as an agonist at the Glucose-Dependent Insulinotropic Polypeptide (GIP), Glucagon-Like Peptide-1 (GLP-1), and Glucagon (GCG) receptors, this peptide is heavily scrutinized for its metabolic regulation and lipolytic pathway modeling capabilities.</p>

                  <h4 className="font-sans font-bold text-[#132c30] text-sm uppercase tracking-wide">Purity Demands in Laboratory Assays</h4>
                  <p>When conducting pre-clinical assays, peptide purity is the singular element determining model accuracy. Low-grade peptides often contain residual trifluoroacetic acid (TFA), organic solvents, or heavy metals from synthesis. These impurities cause cellular toxicity, ruining cell culture models and distorting High-Performance Liquid Chromatography (HPLC) profiles. Alluvi products sold on BuyRetat.co.uk undergo rigorous mass-spectrometry characterization to ensure a stable, sterile, vacuum-sealed lyophilized state exceeding 99% purity.</p>

                  <h4 className="font-sans font-bold text-[#132c30] text-sm uppercase tracking-wide">Cold Chain Logistics Natively within Great Britain</h4>
                  <p>Peptide stability is sensitive to ambient thermal fluctuations during distribution. High temperatures trigger peptide denaturation, disrupting molecular binding kinetics. To satisfy UK research demands, BuyRetat UK handles all storage within professional freezer conditions (-20°C and below). Orders are shipped natively inside thermal aluminum barrier bags with custom gel refrigerant units. This guarantees safe transit, minimizing degradation during same-day courier schedules.</p>

                  <h4 className="font-sans font-bold text-[#132c30] text-sm uppercase tracking-wide">Regulatory Status & Scientific Scope</h4>
                  <p>All compounds showcased across our portal are strictly limited to scientific in vitro research, cell biology, model profiling, and diagnostic laboratory trials. They are not approved under any circumstance for animal or human consumption. Laboratories across London, Oxford, and Cambridge rely on Alluvi standards to secure reproducible chemical modeling data.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW B: SHOP VIEW (30 PRODUCTS CATALOG) */}
        {activeView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
            
            {/* Catalog header */}
            <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-sans font-black text-[#111827]">HPLC Reference Standards Shop</h2>
                <p className="text-gray-500 text-sm mt-1">Browse our list of 30 certified, high-purity laboratory research peptides.</p>
              </div>

              {/* Filtering category controls */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {['All', 'Retatrutide', 'Tirzepatide', 'Semaglutide', 'Growth Factor', 'Recovery', 'Cognitive', 'Vitamins'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#132c30] text-white shadow'
                        : 'bg-white text-gray-500 hover:text-[#132c30] border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredCatalogProducts.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <FlaskConical className="w-12 h-12 text-gray-300 mx-auto" />
                <h4 className="text-lg font-bold text-gray-700">No Peptides Match Your Filters</h4>
                <p className="text-gray-400 text-xs max-w-sm mx-auto">Try clearing your search query or choosing another compound family.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#132c30] text-white text-xs font-bold rounded-lg uppercase"
                >
                  Reset Catalog filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredCatalogProducts.map((p) => (
                  <ProductCard 
                    key={p.id}
                    product={p}
                    onAddToCart={handleAddToCart}
                    onQuickView={setSelectedProduct}
                    isWishlisted={wishlist.includes(p.id)}
                    onToggleWishlist={handleToggleWishlist}
                    isCompared={compareList.includes(p.id)}
                    onToggleCompare={handleToggleCompare}
                    isInCart={cart.some((item) => item.product.id === p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW C: ABOUT VIEW */}
        {activeView === 'about' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-gray-600 text-sm leading-relaxed">
            <div className="space-y-4 text-center">
              <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3.5 py-1.5 rounded-full uppercase">Chemical Excellence</span>
              <h1 className="text-3xl sm:text-4xl font-sans font-black text-[#111827]">About Alluvi BuyRetat UK</h1>
              <p className="text-gray-500 text-base max-w-xl mx-auto">A specialized chemical modeling agency dedicated to providing certified peptide reference structures natively to UK laboratories.</p>
            </div>

            <div className="aspect-video bg-gradient-to-br from-[#132c30]/5 to-[#2e5b62]/10 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 border border-gray-100">
              <FlaskConical className="w-16 h-16 text-[#2e5b62] animate-pulse" />
              <strong className="font-sans font-extrabold text-lg text-[#111827]">Our Mission</strong>
              <p className="text-center text-gray-500 max-w-md">"To eliminate analytical variances in British assays by offering highly refined molecular substrate structures preserving zero-impurity thresholds."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <h3 className="font-sans font-extrabold text-base text-[#111827]">Biochemical Quality Assurance</h3>
                <p>We work in alliance with certified peptide synthesis laboratories in China and the UK. Our raw structures undergo multiple recrystallization steps, resulting in a dense lyophilized matrix with high structural integrity.</p>
              </div>

              <div className="space-y-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <h3 className="font-sans font-extrabold text-base text-[#111827]">Discreet Cold Chain Distribution</h3>
                <p>We skip commercial shipping hazards. Vials are preserved immediately upon synthesis and packed in vacuum foils inside insulated cooling chambers. Dispatches are labeled as academic chemistry materials.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW D: BLOG VIEW */}
        {activeView === 'blog' && (
          <BlogView posts={blogs} onSelectProductCategory={setSelectedCategory} />
        )}

        {/* VIEW E: FAQs VIEW */}
        {activeView === 'faqs' && (
          <div 
            className="max-w-4xl mx-auto px-6 py-12 my-8 rounded-3xl border border-gray-200/50 shadow-sm relative overflow-hidden bg-cover bg-center text-white animate-fade-in"
            style={{ 
              backgroundImage: 'url("/FAQS.avif")', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat' 
            }}
          >
            {/* Soft overlay to ensure readability while keeping image fully visible and sharp */}
            <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

            <div className="relative z-10 space-y-10">
              <div className="text-center space-y-3">
                <span className="font-mono text-xs text-emerald-300 font-extrabold tracking-wider uppercase bg-slate-900/70 px-3.5 py-1 rounded-full inline-block">Support Center</span>
                <h1 className="text-3xl font-sans font-black text-white drop-shadow-sm">Frequently Asked Questions</h1>
                <p className="text-slate-100 text-sm max-w-xl mx-auto bg-slate-900/50 p-3 rounded-2xl border border-white/5 backdrop-blur-xs">Comprehensive answers about HPLC validation reports, crypto checkout, and UK refrigerated delivery policies.</p>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="bg-white/95 hover:bg-white rounded-2xl border border-white/10 overflow-hidden text-sm transition-all duration-200 shadow-sm">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full px-6 py-4 flex justify-between items-center text-[#132c30] font-bold text-left transition-colors"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-[#2e5b62]" /> : <ChevronDown className="w-4 h-4 text-[#2e5b62]" />}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-6 py-4 bg-slate-50 text-slate-600 font-medium leading-relaxed border-t border-slate-100 text-xs">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW F: CONTACT VIEW */}
        {activeView === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
            
            <div className="text-center space-y-3">
              <span className="font-mono text-xs text-[#2e5b62] font-semibold bg-[#eef4f4] px-3.5 py-1 rounded-full uppercase">Get in touch</span>
              <h1 className="text-3xl sm:text-4xl font-sans font-black text-[#111827]">Contact BuyRetat UK</h1>
              <p className="text-gray-500 text-sm max-w-lg mx-auto">Contact our laboratory dispatch desk or request bulk custom quotas via email or secure WhatsApp messaging.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-sans font-extrabold text-[#111827] text-base">Send Instant Message</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Dr. Richard Vance"
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="scientist@laboratory.org"
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Subject *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="HPLC verification / Custom 500mg assay quotation..."
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe laboratory protocols or order quantities..."
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#132c30] hover:bg-[#2e5b62] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>

                {contactSuccess && (
                  <div className="p-4 bg-[#10b981]/10 text-[#10b981] font-mono text-xs rounded-xl flex items-center space-x-2 animate-pulse">
                    <Check className="w-4 h-4" />
                    <span>Inquiry submitted! Our clinical pharmacist will respond via email within 2 hours.</span>
                  </div>
                )}
              </form>

              {/* Sidebar Info */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-sans font-extrabold text-[#111827] text-base border-b border-gray-100 pb-3">Contact Directives</h3>
                
                <div className="space-y-4 text-xs text-gray-500 font-mono">
                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-4.5 h-4.5 text-[#2e5b62] mt-0.5" />
                    <div>
                      <span className="block text-gray-400">EMAIL SUPPORT:</span>
                      <strong className="text-[#132c30]">contact@buyretat.co.uk</strong>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-4.5 h-4.5 text-[#2e5b62] mt-0.5" />
                    <div>
                      <span className="block text-gray-400">WHATSAPP DIRECT ORDERING:</span>
                      <strong className="text-[#132c30]">+44 7529 469162</strong>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-4.5 h-4.5 text-[#2e5b62] mt-0.5" />
                    <div>
                      <span className="block text-gray-400">DISTRIBUTION FACILITY:</span>
                      <strong className="text-[#132c30]">Alluvi BioLabs, Oxford Science Park, OX4 4GA</strong>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Clock className="w-4.5 h-4.5 text-[#2e5b62] mt-0.5" />
                    <div>
                      <span className="block text-gray-400">HOURS OF WORK:</span>
                      <strong className="text-[#132c30]">Mon - Fri, 8:00 AM - 5:00 PM GMT</strong>
                    </div>
                  </div>
                </div>

                {/* Google Map Placeholder styling */}
                <div className="w-full aspect-video rounded-2xl bg-[#eef4f4] relative overflow-hidden border border-gray-100 flex items-center justify-center p-4">
                  <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop")' }} />
                  <div className="relative text-center space-y-1.5 z-10">
                    <MapPin className="w-8 h-8 text-[#2e5b62] mx-auto animate-bounce" />
                    <strong className="text-xs text-[#132c30] block">Alluvi BioLabs Oxford</strong>
                    <span className="text-[10px] text-gray-400 uppercase font-mono">MAP SATELLITE ACTIVE</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW G: THE CORE DEVELOPER HUB */}
        {activeView === 'devhub' && <DevHub />}

        {/* VIEW H: CHECKOUT VIEW */}
        {activeView === 'checkout' && (
          <CheckoutView 
            cart={cart}
            couponCode={couponCode}
            onBackToShop={navigateToShop}
            onClearCart={handleClearCart}
          />
        )}

        {/* VIEW I: CERTIFICATE OF ANALYSIS VIEW */}
        {activeView === 'coa' && <COAView />}

        {/* VIEW J: SINGLE POLICY PAGES */}
        {(activeView === 'shipping-policy' || 
          activeView === 'refund-policy' || 
          activeView === 'privacy-policy' || 
          activeView === 'terms-policy') && (
          <PolicyViews 
            viewType={activeView as any} 
            onBackToHome={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        )}

      </main>

      {/* 2. FLOATING WHATSAPP BUTTON (ALWAYS VISIBLE BOTTOM RIGHT) */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-6 right-6 z-40 bg-[#10b981] hover:bg-[#059669] text-white w-14 h-14 md:w-16 md:h-16 p-0 rounded-full shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center border-2 border-white/20"
        title="Open WhatsApp Pharmacist Live Support Chat"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.89l-1.16 4.24 4.34-1.14c1.42.77 3.03 1.2 4.7 1.2 5.52 0 10-4.48 10-10C21.14 6.48 16.66 2 12.004 2zm5.73 14.1c-.24.67-1.18 1.28-1.92 1.36-.5.05-1.15.08-3.34-.83-2.8-1.16-4.6-4.02-4.74-4.21-.14-.19-1.13-1.5-1.13-2.87 0-1.37.71-2.04.96-2.31.25-.27.55-.34.73-.34.18 0 .36.01.52.01.17 0 .4-.07.62.47.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.17-.32.39-.46.52-.16.15-.33.32-.14.65.19.32.85 1.4 1.83 2.27.84.75 1.55 1 1.88 1.15.32.14.52.12.71-.1.19-.22.83-.97 1.05-1.3.22-.33.44-.27.74-.16.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.14.08.82-.16 1.49z"/>
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
        </span>
      </button>

      {/* 3. CART SIDEBAR DRAWER PANEL */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActiveView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. DETAILED QUICK VIEW MODAL POPUP */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isInCart={cart.some((item) => item.product.id === selectedProduct.id)}
          relatedProducts={products.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
          onSelectRelated={(p) => setSelectedProduct(p)}
        />
      )}

      {/* 5. FOOTER */}
      <footer className="bg-[#0f1a1c] text-[#eef4f4]/80 py-16 border-t border-[#2e5b62]/20 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="Buy%20Retat%20Logo.png" alt="BuyRetat UK Logo" className="h-full w-auto object-contain rounded" referrerPolicy="no-referrer" />
              </div>
              <span className="font-sans font-black text-base tracking-[0.15em] text-white">ALLUVI UK</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">Certified high-purity triple-agonist reference peptides. Distributed securely inside professional insulated cooling courier systems directly to United Kingdom metabolic study labs.</p>
            <div className="text-[10px] text-rose-400 font-mono font-bold leading-normal bg-rose-400/5 border border-rose-400/20 p-2.5 rounded-xl">
              ⚠️ ALL PRODUCTS ARE STRICTLY FOR LABORATORY MODEL IN VITRO RESEARCH ONLY. NOT APPROVED FOR HUMAN CONSUMPTION.
            </div>
          </div>

          {/* Col 2: Useful links */}
          <div className="space-y-3.5">
            <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">Research Policy Standards</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><button onClick={() => { setActiveView('shipping-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Shipping &amp; Insulated Logistics Policy</button></li>
              <li><button onClick={() => { setActiveView('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Refund &amp; Custom Reship Policy</button></li>
              <li><button onClick={() => { setActiveView('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Privacy &amp; Data Security Protocol</button></li>
              <li><button onClick={() => { setActiveView('terms-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Terms &amp; Institution Conditions</button></li>
            </ul>
          </div>

          {/* Col 3: Catalog navigation */}
          <div className="space-y-3.5">
            <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">Chemical Catalog</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><button onClick={() => { setSelectedCategory('Retatrutide'); setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Retatrutide (LY3437943)</button></li>
              <li><button onClick={() => { setSelectedCategory('Tirzepatide'); setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Tirzepatide Research</button></li>
              <li><button onClick={() => { setSelectedCategory('Semaglutide'); setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Semaglutide Reference</button></li>
              <li><button onClick={() => { setSelectedCategory('Growth Factor'); setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#10b981] transition-colors">Recombinant Growth Factors</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & payments */}
          <div className="space-y-4">
            <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">Invoicing Desk</h4>
            <ul className="space-y-2 text-gray-400 text-[11px] font-mono">
              <li>Email: contact@buyretat.co.uk</li>
              <li>WhatsApp: +44 7529 469162</li>
              <li>Settle Option: Provided upon order</li>
            </ul>

            {/* Payment Icons render */}
            <div className="flex items-center space-x-2.5 pt-2 border-t border-[#2e5b62]/20">
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold">BTC</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold">USDT</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold">FASTER PAYMENTS</span>
              <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold">PAYPAL</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#2e5b62]/10 text-center text-[10px] text-gray-500 font-mono space-y-1.5">
          <p>© 2026 BuyRetat UK (buyretat.co.uk). All rights reserved. Sourced under strict Alluvi pharmacological standards.</p>
          <p>Built for the UK pre-clinical laboratory reference community. Registered metabolic modeling. Oxford, United Kingdom.</p>
        </div>
      </footer>

    </div>
  );
}
