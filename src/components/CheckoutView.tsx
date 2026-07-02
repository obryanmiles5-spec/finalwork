import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, ShieldCheck, CreditCard, Banknote, Landmark, PhoneCall, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import { CartItem, Product } from '../types';
import { ProductImage } from './ProductImage';

interface CheckoutViewProps {
  cart: CartItem[];
  couponCode: string;
  onBackToShop: () => void;
  onClearCart: () => void;
}

export default function CheckoutView({
  cart,
  couponCode,
  onBackToShop,
  onClearCart
}: CheckoutViewProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    paymentMethod: 'bank_transfer', // or 'paypal'
    orderViaWhatsApp: false,
    orderNotes: ''
  });

  const [checkoutMethod, setCheckoutMethod] = useState<'email' | 'whatsapp'>('email');
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discount = 0;
  if (couponCode.toLowerCase() === 'buyretatuk') {
    discount = subtotal * 0.3; // 30% Discount
  }
  const finalTotal = subtotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalTotal < 100) {
      alert('Minimum order limit of £100 has not been reached.');
      return;
    }

    // Generate simulated order
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const orderRef = `BRET-${orderNum}-UK`;
    
    const newOrder = {
      reference: orderRef,
      items: [...cart],
      billing: { ...formData, checkoutMethod },
      subtotal,
      discount,
      total: finalTotal,
      date: new Date().toLocaleDateString('en-GB')
    };

    const itemsText = cart.map((item: CartItem) => 
      `- ${item.product.name} (Qty: ${item.quantity}) - £${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'ad4d9f49-6bfb-49a9-8436-bf1191ef9821',
        subject: `New Order Received - Ref: ${orderRef}`,
        from_name: 'Alluvi UK Order System',
        order_reference: orderRef,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        ordered_items: itemsText,
        subtotal: `£${subtotal.toFixed(2)}`,
        discount: `-£${discount.toFixed(2)}`,
        total: `£${finalTotal.toFixed(2)}`,
        payment_method: formData.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'PayPal Friends & Family',
        checkout_method: checkoutMethod,
        order_notes: formData.orderNotes || 'None'
      })
    }).catch(err => console.error('Order form submission error:', err));

    setCreatedOrder(newOrder);
    setOrderComplete(true);
    onClearCart(); // Clears shopping cart upon placing order

    if (checkoutMethod === 'whatsapp') {
      const message = `Hello BuyRetat UK, I would like to confirm my order:
Order Ref: *${orderRef}*
Name: *${formData.firstName} ${formData.lastName}*
Email: ${formData.email}
Phone: ${formData.phone}
Shipping Address: ${formData.address}, ${formData.city}, ${formData.postcode}

*Ordered Items:*
${itemsText}

Subtotal: £${subtotal.toFixed(2)}
Discount (30% Code): -£${discount.toFixed(2)}
*Grand Total:* *£${finalTotal.toFixed(2)}*
Payment Method: *${formData.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'PayPal Friends & Family'}*
Order Notes: ${formData.orderNotes || 'None'}

Please confirm receipt of this order and send payment verification details. Thank you!`;

      const link = `https://wa.me/447529469162?text=${encodeURIComponent(message)}`;
      window.open(link, '_blank');
    }
  };

  // Compile WhatsApp text message template
  const getWhatsAppLink = () => {
    if (!createdOrder) return '';
    const itemsText = createdOrder.items.map((item: CartItem) => 
      `- ${item.product.name} (Qty: ${item.quantity}) - £${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Hello BuyRetat UK, I would like to confirm my order:
Order Ref: *${createdOrder.reference}*
Name: *${createdOrder.billing.firstName} ${createdOrder.billing.lastName}*
Email: ${createdOrder.billing.email}
Phone: ${createdOrder.billing.phone}
Shipping Address: ${createdOrder.billing.address}, ${createdOrder.billing.city}, ${createdOrder.billing.postcode}

*Ordered Items:*
${itemsText}

Subtotal: £${createdOrder.subtotal.toFixed(2)}
Discount (30% Code): -£${createdOrder.discount.toFixed(2)}
*Grand Total:* *£${createdOrder.total.toFixed(2)}*
Payment Method: *${createdOrder.billing.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'PayPal Friends & Family'}*
Order Notes: ${createdOrder.billing.orderNotes || 'None'}

Please confirm receipt of this order and send payment verification details. Thank you!`;

    return `https://wa.me/447529469162?text=${encodeURIComponent(message)}`;
  };

  // Phase 2: Order Complete Confirmation Screen
  if (orderComplete && createdOrder) {
    const isBank = createdOrder.billing.paymentMethod === 'bank_transfer';
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-fade-in">
        
        {/* Success header card */}
        <div className="bg-white rounded-3xl p-8 border border-[#2e5b62]/10 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl md:text-3xl font-sans font-black text-[#111827]">Order Successfully Registered!</h2>
            <p className="text-gray-500 text-sm">Thank you for ordering with Alluvi BuyRetat UK. Your laboratory reference code is active.</p>
          </div>

          <div className="inline-flex items-center space-x-6 bg-slate-50 border border-gray-100 rounded-2xl px-6 py-3 font-mono text-xs text-gray-500">
            <div>
              <span className="block text-gray-400">ORDER REFERENCE:</span>
              <strong className="text-[#132c30] text-sm font-black">{createdOrder.reference}</strong>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <span className="block text-gray-400">TOTAL DUE:</span>
              <strong className="text-[#d97706] text-sm font-black">£{createdOrder.total.toFixed(2)}</strong>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <span className="block text-gray-400">STATUS:</span>
              <span className="bg-[#d97706]/10 text-[#d97706] font-extrabold px-2 py-0.5 rounded uppercase text-[10px]">Awaiting Payment</span>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Action Block */}
        {createdOrder.billing.checkoutMethod === 'whatsapp' && (
          <div className="bg-[#10b981]/10 border-2 border-[#10b981]/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#10b981] text-white rounded-xl">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[#047857]">Complete Order Instantly via WhatsApp</h4>
                <p className="text-[#065f46] text-xs">You chose to order via WhatsApp. Click below to submit your compiled cart and details directly to our pharmacist line.</p>
              </div>
            </div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow flex items-center justify-center space-x-2 transition-colors cursor-pointer shrink-0"
            >
              <span>Submit to WhatsApp (+44)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Direct Email Action Block */}
        {createdOrder.billing.checkoutMethod === 'email' && (
          <div className="bg-[#132c30]/10 border-2 border-[#132c30]/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#132c30] text-white rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[#132c30]">Order Invoice Dispatched via Email</h4>
                <p className="text-[#2e5b62] text-xs">An automated invoice copy has been sent to your email <strong>{createdOrder.billing.email}</strong>. Please follow the instructions below to complete the payment.</p>
              </div>
            </div>
            <div className="text-[10px] bg-[#132c30]/10 text-[#132c30] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#2e5b62]/20">
              Email Invoice Queued
            </div>
          </div>
        )}

        {/* Specific Payment Instructions */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
            <ShieldCheck className="w-5.5 h-5.5 text-[#2e5b62]" />
            <h3 className="font-sans font-extrabold text-lg text-[#111827]">Order Verification</h3>
          </div>

          <div className="bg-[#eef4f4]/60 border border-[#2e5b62]/10 p-6 rounded-2xl text-center space-y-3">
            <p className="text-[#132c30] text-sm font-sans font-extrabold">
              Payment details will be provided when an admin has received an order.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed max-w-md mx-auto">
              Our administration desk is currently reviewing your order request (reference <span className="font-mono font-bold text-[#d97706]">{createdOrder.reference}</span>). We will contact you shortly via email or WhatsApp to provide the payment details and arrange shipping.
            </p>
          </div>

          <div className="text-center pt-2">
            <span className="inline-block text-[10px] text-gray-400 font-mono uppercase tracking-wider">
              Reference Code: {createdOrder.reference}
            </span>
          </div>
        </div>

        {/* Back control */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onBackToShop}
            className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#132c30] hover:bg-slate-50 transition-colors"
          >
            Return to Store
          </button>
        </div>

      </div>
    );
  }

  // Phase 1: Core Billing & Checkout Form
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <button
        onClick={onBackToShop}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-[#132c30] uppercase tracking-wider mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form details */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
          
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-2xl font-sans font-black text-[#111827]">WooCommerce Checkout</h2>
            <div className="flex items-center space-x-2 text-xs text-[#10b981] font-semibold uppercase tracking-wide mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Checkout & Guest Authorization Available</span>
            </div>
          </div>

          {/* Section 1: Billing & Shipping info */}
          <div className="space-y-4">
            <h3 className="font-sans font-extrabold text-sm text-[#111827] uppercase tracking-wider border-l-4 border-[#2e5b62] pl-3">Billing &amp; Delivery Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Richard"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Hawking"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. researcher@ox.ac.uk"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">UK Shipping Address *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. 15 Broad Street"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Town / City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Oxford"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Postcode *</label>
                <input
                  type="text"
                  name="postcode"
                  required
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="OX1 3AS"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Phone Number (For Shipping Courier Updates) *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +44 7123 456789"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Research Order Notes (Optional)</label>
              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Specifying custom batch configurations or security logistics directions..."
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2e5b62] text-[#132c30]"
              />
            </div>
          </div>

          {/* Section 2: Payment Methods Selection */}
          <div className="space-y-4">
            <h3 className="font-sans font-extrabold text-sm text-[#111827] uppercase tracking-wider border-l-4 border-[#2e5b62] pl-3">Payment Methods</h3>
            
            <div className="space-y-3.5">
              
              {/* Option 1: Bank transfer */}
              <label className="flex items-start p-4 rounded-2xl border border-gray-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors select-none">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#2e5b62] border-gray-300"
                />
                <div className="ml-4 flex-1">
                  <span className="font-sans font-extrabold text-xs text-[#111827] uppercase tracking-wider flex items-center space-x-1.5">
                    <Landmark className="w-4 h-4 text-gray-500" />
                    <span>Direct Bank Transfer (Faster Payments)</span>
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">Payment details will be provided when an admin has received your order. We support secure, direct bank transfers in GBP.</p>
                </div>
              </label>

              {/* Option 2: Paypal friends and family */}
              <label className="flex items-start p-4 rounded-2xl border border-gray-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors select-none">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#2e5b62] border-gray-300"
                />
                <div className="ml-4 flex-1">
                  <span className="font-sans font-extrabold text-xs text-[#111827] uppercase tracking-wider flex items-center space-x-1.5">
                    <Landmark className="w-4 h-4 text-gray-500 text-[#2e5b62]" />
                    <span>PayPal Transfer</span>
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">PayPal details and payment instructions will be provided when an admin has received your order.</p>
                </div>
              </label>

            </div>
          </div>

          {/* Section 3: Dual Checkout Paths with Minimum Order Enforcement */}
          {finalTotal < 100 && (
            <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-start space-x-3 text-xs text-rose-700 font-mono animate-pulse">
              <span className="text-base shrink-0">⚠️</span>
              <div className="space-y-1">
                <strong className="block font-black uppercase text-rose-900">Minimum Order Limit Active</strong>
                <p>Your current order total is <strong>£{finalTotal.toFixed(2)}</strong>. To comply with our medical grade cooling-courier distribution protocols, all dispatches require a minimum order value of <strong>£100.00</strong>.</p>
                <p className="text-[10px] text-rose-500 font-sans mt-1">Please return to the Shop page and add more peptides to satisfy the £100 dispatch criteria.</p>
              </div>
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-sans font-extrabold text-sm text-[#111827] uppercase tracking-wider border-l-4 border-[#2e5b62] pl-3">Dual Checkout Dispatch</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Choose your preferred order settlement path. Both channels fully support secure dispatch verification, express cold-chain packing, and 30% discount processing.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Button A: Email / Standard Invoice checkout */}
              <button
                type="submit"
                onClick={() => setCheckoutMethod('email')}
                disabled={finalTotal < 100}
                className={`py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                  finalTotal >= 100
                    ? 'bg-[#132c30] hover:bg-[#2e5b62] text-white shadow-md shadow-[#132c30]/10 hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed transform-none shadow-none'
                }`}
              >
                <Mail className="w-4 h-4 shrink-0 text-white" />
                <span>Settle via Email Invoice</span>
              </button>

              {/* Button B: WhatsApp checkout */}
              <button
                type="submit"
                onClick={() => setCheckoutMethod('whatsapp')}
                disabled={finalTotal < 100}
                className={`py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                  finalTotal >= 100
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-md shadow-[#10b981]/10 hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed transform-none shadow-none'
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.89l-1.16 4.24 4.34-1.14c1.42.77 3.03 1.2 4.7 1.2 5.52 0 10-4.48 10-10C21.14 6.48 16.66 2 12.004 2zm5.73 14.1c-.24.67-1.18 1.28-1.92 1.36-.5.05-1.15.08-3.34-.83-2.8-1.16-4.6-4.02-4.74-4.21-.14-.19-1.13-1.5-1.13-2.87 0-1.37.71-2.04.96-2.31.25-.27.55-.34.73-.34.18 0 .36.01.52.01.17 0 .4-.07.62.47.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.17-.32.39-.46.52-.16.15-.33.32-.14.65.19.32.85 1.4 1.83 2.27.84.75 1.55 1 1.88 1.15.32.14.52.12.71-.1.19-.22.83-.97 1.05-1.3.22-.33.44-.27.74-.16.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.14.08.82-.16 1.49z"/>
                </svg>
                <span>Checkout via WhatsApp</span>
              </button>
            </div>
          </div>

        </form>

        {/* Right Column: Order Summary sticky */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <ShoppingBag className="w-5.5 h-5.5 text-[#132c30]" />
            <h3 className="font-sans font-black text-base text-[#111827]">Order Summary</h3>
          </div>

          {/* Itemized list */}
          <div className="space-y-3.5 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-50 border border-gray-100 p-0.5 rounded-lg flex items-center justify-center shrink-0">
                    <ProductImage productId={item.product.id} alt={item.product.name} className="w-full h-full object-contain" fallbackSvg={item.product.fallbackSvg} />
                  </div>
                  <div>
                    <strong className="text-gray-800 line-clamp-1">{item.product.name}</strong>
                    <span className="text-gray-400 block font-mono text-[9px]">QTY: {item.quantity} | {item.product.concentration}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#132c30]">£{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Subtotals & Taxes */}
          <div className="space-y-2.5 border-t border-gray-100 pt-4 font-sans text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Cart Subtotal:</span>
              <span className="font-mono font-semibold text-gray-700">£{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#10b981]">
                <span>Applied Coupon (30% OFF):</span>
                <span className="font-mono font-semibold">-£{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping &amp; Courier Logistics:</span>
              <span className="font-mono text-[#10b981] font-bold uppercase">FREE NEXT-DAY UK</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#111827] pt-2 border-t border-dashed border-gray-200">
              <span>Grand Total:</span>
              <span className="font-mono">£{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-[#132c30]/5 rounded-2xl p-4 border border-[#2e5b62]/10 flex items-start space-x-2.5 text-[11px] text-[#2e5b62] leading-relaxed font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5 animate-pulse" />
            <span>Guaranteed next-day delivery on all orders across Great Britain. Shipped in medical grade cooling packs.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
