import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  couponCode,
  setCouponCode,
  onProceedToCheckout
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Coupon logic
  let discount = 0;
  if (couponCode.toLowerCase() === 'buyretatuk') {
    discount = subtotal * 0.3; // 30% Crypto payment or general discount
  }

  const finalTotal = subtotal - discount;
  const isMinimumOrderMet = finalTotal >= 100;
  const missingAmount = 100 - finalTotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (couponInput.trim().toLowerCase() === 'buyretatuk') {
      setCouponCode('BuyRetatUK');
      setCouponSuccess('Coupon applied: 30% discount activated!');
    } else {
      setCouponError('Invalid coupon code. Try "BuyRetatUK"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in bg-slate-900/60 backdrop-blur-xs">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Cart Container slide in */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left z-10 border-l border-[#2e5b62]/10">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#132c30] text-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#10b981]" />
            <span className="font-sans font-bold text-lg">Your Research Order</span>
          </div>
          <button 
            id="close-cart-btn"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500 font-sans font-medium">Your shopping cart is empty</p>
              <button 
                onClick={onClose}
                className="text-xs font-mono text-[#2e5b62] hover:underline uppercase font-bold"
              >
                Browse Peptide Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-gray-100 relative group"
                >
                  {/* Small Product Icon */}
                  <div className="w-14 h-14 bg-white rounded-xl border border-gray-100 p-1 flex items-center justify-center shrink-0">
                    <ProductImage productId={item.product.id} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Title and adjustments */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-[#111827] text-sm truncate">{item.product.name}</h4>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">CONC: {item.product.concentration} | PURITY: {item.product.purity}</span>
                    
                    {/* Price and quantity controller */}
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-mono font-bold text-[#132c30]">£{(item.product.price * item.quantity).toFixed(2)}</span>
                      
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden font-mono text-xs">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-slate-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <span className="px-3.5 font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-slate-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer and Math calculations */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-slate-50 space-y-4">
            
            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  placeholder="Enter Code (BuyRetatUK)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:border-[#2e5b62]"
                />
                <Ticket className="absolute right-3.5 w-4 h-4 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#132c30] hover:bg-[#2e5b62] text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            
            {couponError && <p className="text-[10px] font-mono text-rose-500">{couponError}</p>}
            {couponSuccess && <p className="text-[10px] font-mono text-[#10b981]">{couponSuccess}</p>}

            {/* Calculations and Totals */}
            <div className="space-y-2.5 font-sans text-xs border-b border-gray-200 pb-4">
              <div className="flex justify-between text-gray-500">
                <span>Cart Subtotal:</span>
                <span className="font-mono font-bold text-gray-700">£{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#10b981]">
                  <span>Crypto / Bulk Coupon (30% OFF):</span>
                  <span className="font-mono font-bold">-£{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>UK Next-Day Courier Delivery:</span>
                <span className="font-mono font-bold text-[#10b981] uppercase">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#111827] pt-2 border-t border-dashed border-gray-200">
                <span>Final Total:</span>
                <span className="font-mono">£{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* ⚠️ £100 MINIMUM ORDER CONSTRAINT NOTIFICATION */}
            {!isMinimumOrderMet ? (
              <div id="min-order-warning" className="bg-[#d97706]/10 border border-[#d97706]/20 p-4 rounded-xl flex flex-col space-y-1.5 animate-pulse text-xs text-[#b45309]">
                <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-[#92400e]">
                  <span>⚠️ Minimum Order Limit Restricted</span>
                </div>
                <p className="leading-relaxed text-[#92400e]">
                  To secure wholesale prices & expedited logistics, we enforce a <strong>£100.00 minimum checkout</strong>. Please add <strong className="font-mono">£{missingAmount.toFixed(2)}</strong> more in peptides.
                </p>
                <div className="w-full bg-[#d97706]/20 h-1.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-[#d97706] h-full" 
                    style={{ width: `${Math.min((finalTotal / 100) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#10b981] font-mono font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Minimum Order Target Met! Proceeding Available</span>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              id="checkout-proceed-btn"
              onClick={onProceedToCheckout}
              disabled={!isMinimumOrderMet}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                isMinimumOrderMet
                  ? 'bg-gradient-to-r from-[#132c30] to-[#2e5b62] text-white shadow-md shadow-[#132c30]/10 hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed transform-none shadow-none'
              }`}
            >
              <span>Secure Research Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
