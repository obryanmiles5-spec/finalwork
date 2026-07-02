import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowLeftRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  activeView,
  setActiveView,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Announcement Bar slides
  const slides = [
    { text: '🚚 Minimum Order £100 | Free Tracked Next-Day UK Shipping', link: 'shop' },
    { text: '🔬 Verified Lab Tested Peptides | 30% OFF Crypto Payments (Code: BuyRetatUK)', link: 'shop' },
    { text: '💬 Easy Ordering & Support via WhatsApp | +44 7529 469162', link: 'contact' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAnnouncementClick = () => {
    const target = slides[currentSlide].link;
    setActiveView(target);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'coa', label: 'COA' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="w-full relative z-50">
      {/* 1. TOP ANNOUNCEMENT BAR (ROTATING SLIDER) */}
      <div 
        id="announcement-bar"
        onClick={handleAnnouncementClick}
        className="w-full bg-[#0f1a1c] text-[#eef4f4] py-2 px-4 text-xs font-medium cursor-pointer transition-all duration-500 flex items-center justify-center select-none border-b border-[#2e5b62]/20 hover:bg-[#132c30]"
      >
        <div className="flex items-center space-x-2 animate-fade-in text-center max-w-lg md:max-w-none">
          <Sparkles className="w-3.5 h-3.5 text-[#d97706] shrink-0 animate-pulse" />
          <span className="tracking-wide">{slides[currentSlide].text}</span>
        </div>
      </div>

      {/* 2. MAIN STICKY HEADER */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-[#2e5b62]/10 sticky top-0 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            id="app-logo"
            onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Brand Logo: Buy Retat Logo.png */}
            <div className="w-15 h-15 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src="Buy%20Retat%20Logo.png" alt="BuyRetat UK Logo" className="h-full w-auto object-contain rounded-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 leading-none">
                <span className="font-sans font-black text-2.5xl tracking-[0.18em] bg-gradient-to-r from-[#132c30] via-[#2e5b62] to-[#0f172a] bg-clip-text text-transparent">ALLUVI</span>
                <span className="text-[10px] font-mono font-extrabold tracking-wider text-[#d97706] border border-[#d97706]/40 px-1.5 py-0.5 rounded leading-none bg-[#d97706]/5 shadow-sm">UK</span>
              </div>
              <span className="block text-[9px] font-mono tracking-[0.28em] text-[#2e5b62] uppercase font-semibold mt-1">BUYRETAT PEPTIDE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => { setActiveView(item.id); setSearchQuery(''); }}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-2 ${
                  activeView === item.id 
                    ? 'text-[#2e5b62] font-semibold' 
                    : 'text-gray-500 hover:text-[#132c30]'
                }`}
              >
                {item.label}
                {activeView === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#132c30] to-[#2e5b62] rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Input Box Toggle */}
            <div className="relative flex items-center">
              {isSearchVisible ? (
                <div className="flex items-center border border-[#2e5b62]/20 rounded-full bg-slate-50 px-3 py-1.5 animate-slide-in">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search Retatrutide, BPC..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeView !== 'shop') setActiveView('shop');
                    }}
                    className="text-xs bg-transparent outline-none w-36 md:w-48 text-[#132c30]"
                    autoFocus
                  />
                  <X 
                    className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 ml-1" 
                    onClick={() => { setSearchQuery(''); setIsSearchVisible(false); }}
                  />
                </div>
              ) : (
                <button
                  id="search-btn"
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2 text-gray-500 hover:text-[#132c30] hover:bg-slate-50 rounded-full transition-colors duration-200"
                  aria-label="Search Catalog"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Trigger */}
            <button
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-500 hover:text-[#132c30] hover:bg-slate-50 rounded-full relative transition-all duration-200"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d97706] text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-[#132c30] rounded-full transition-colors duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MOBILE MENU SLIDE-DOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-32 left-0 right-0 bg-white border-b border-[#2e5b62]/10 shadow-lg animate-slide-down py-4 px-6 z-40">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveView(item.id);
                  setSearchQuery('');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-[#eef4f4] text-[#132c30]'
                    : 'text-gray-600 hover:bg-slate-50 hover:text-[#132c30]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-[#2e5b62]/10 pt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 font-mono py-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Verified UK Laboratory Sourced</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
