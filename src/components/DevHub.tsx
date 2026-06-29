import React, { useState } from 'react';
import { Landmark, ShieldAlert, FileText, Braces, Download, Check, Code, ShieldCheck, HelpCircle } from 'lucide-react';

export default function DevHub() {
  const [activeTab, setActiveTab] = useState<'php' | 'assets' | 'seo' | 'security'>('php');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // 1. Ready-to-copy WordPress WooCommerce PHP Snippets
  const phpSnippets = [
    {
      id: 'min_order_php',
      title: 'Enforce £100 Minimum Order Limit (functions.php)',
      desc: 'Restricts checkout in WooCommerce if the final subtotal is less than £100. Displays notice to buyers.',
      code: `<?php
/**
 * WooCommerce functions.php Snippet: Enforce £100 Minimum Order
 * Optimized for PHP 8.3+ & WooCommerce 8.0+
 */
add_action('woocommerce_checkout_process', 'buyretat_enforce_minimum_order_limit');
add_action('woocommerce_before_cart', 'buyretat_enforce_minimum_order_limit');

function buyretat_enforce_minimum_order_limit() {
    if (is_cart() || is_checkout()) {
        $minimum = 100;
        $cart_total = WC()->cart->get_subtotal(); // Or use WC()->cart->get_total()

        if ($cart_total < $minimum) {
            $shortfall = $minimum - $cart_total;
            $error_message = sprintf(
                __('⚠️ <strong>Minimum Order Limit Restricted:</strong> Your current order total is £%s. You must have a minimum of £100.00 to complete research checkout. Please add another £%s in reference peptides to proceed.', 'buyretat'),
                number_format($cart_total, 2),
                number_format($shortfall, 2)
            );
            
            if (is_cart()) {
                wc_print_notice($error_message, 'error');
            } else {
                wc_add_notice($error_message, 'error');
            }
        }
    }
}`
    },
    {
      id: 'crypto_coupon_php',
      title: 'Apply 30% Discount for Crypto Payment Gateways',
      desc: 'Hooks into WooCommerce cart calculation to apply 30% discount automatically if a crypto payment gateway is selected, using BuyRetatUK coupon logic.',
      code: `<?php
/**
 * WooCommerce functions.php Snippet: 30% Off Crypto Payment Gateway
 */
add_action('woocommerce_cart_calculate_fees', 'buyretat_crypto_gateway_discount', 20, 1);

function buyretat_crypto_gateway_discount($cart) {
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }

    $chosen_gateway = WC()->session->get('chosen_payment_method');
    
    // Check if the buyer chose cryptocurrency gateway (e.g. 'btcpayserver' or custom gateway)
    if ($chosen_gateway === 'crypto_payment_gateway' || $chosen_gateway === 'crypto') {
        $subtotal = $cart->get_subtotal();
        $discount_amount = $subtotal * 0.30; // 30% OFF
        
        $cart->add_fee(
            __('Crypto Payment Discount (30% OFF - Code: BuyRetatUK)', 'buyretat'),
            -$discount_amount,
            false // Not taxable
        );
    }
}`
    },
    {
      id: 'whatsapp_checkout_php',
      title: 'WhatsApp Order Integration Hook',
      desc: 'Appends a "Submit Order via WhatsApp" secondary button on the order received page, linking to the pharmacist support desk.',
      code: `<?php
/**
 * WooCommerce Hook: WhatsApp Order Redirect and Details Parser
 */
add_action('woocommerce_thankyou', 'buyretat_whatsapp_redirect_receipt', 10, 1);

function buyretat_whatsapp_redirect_receipt($order_id) {
    $order = wc_get_order($order_id);
    $order_total = $order->get_total();
    $first_name = $order->get_billing_first_name();
    
    // Construct message template
    $msg = "Hello BuyRetat UK, I want to confirm payment for order ref #" . $order_id . " of £" . $order_total . " for " . $first_name . ".";
    $whatsapp_url = "https://wa.me/447529469162?text=" . urlencode($msg);
    
    echo '<div style="margin: 20px 0; padding: 20px; background: #e6f7ed; border: 1px solid #c2ebd0; border-radius: 12px; text-align: center;">';
    echo '  <h4 style="color: #047857; margin-bottom: 8px;">🚀 Expedite Order Dispatch via WhatsApp</h4>';
    echo '  <p style="font-size: 13px; color: #065f46; margin-bottom: 12px;">Send your transaction reference to our support pharmacists instantly.</p>';
    echo '  <a href="' . esc_url($whatsapp_url) . '" target="_blank" style="background: #10b981; color: white; padding: 10px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Send WhatsApp Payment Receipt</a>';
    echo '</div>';
}`
    }
  ];

  // 2. SEO Sitemaps & robots.txt layout
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated XML Sitemap for buyretat.co.uk -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url>
    <loc>https://buyretat.co.uk/</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://buyretat.co.uk/shop</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://buyretat.co.uk/about</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://buyretat.co.uk/blog</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Primary Retatrutide Product Pages -->
  <url>
    <loc>https://buyretat.co.uk/product/retatrutide-10mg</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://buyretat.co.uk/product/tirzepatide-10mg</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  const robotsTxt = `# robots.txt for buyretat.co.uk
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-content/plugins/
Disallow: /checkout/
Disallow: /cart/

Sitemap: https://buyretat.co.uk/sitemap.xml`;

  // 3. Security Headers (.htaccess snippet)
  const htaccessSecurity = `# SECURITY HEADERS FOR BUYRETAT.CO.UK
# Prevent Clickjacking
Header set X-Frame-Options "SAMEORIGIN"

# Prevent MIME-type Sniffing
Header set X-Content-Type-Options "nosniff"

# Enforce Cross-Site Scripting (XSS) Filter
Header set X-XSS-Protection "1; mode=block"

# Force Strict HTTPS Transport Security (HSTS)
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Secure Content Security Policy (CSP)
Header set Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
      
      {/* Header section */}
      <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-black text-[#111827] flex items-center space-x-2">
            <Braces className="w-8 h-8 text-[#2e5b62]" />
            <span>Alluvi WooCommerce Developer Hub</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Ready-to-deploy assets, XML schema models, security headers, and PHP 8.3 code hooks for buyretat.co.uk.</p>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('php')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'php' ? 'bg-[#132c30] text-white font-bold' : 'bg-slate-50 text-gray-500 hover:text-[#132c30]'
            }`}
          >
            Woo PHP Hooks
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'assets' ? 'bg-[#132c30] text-white font-bold' : 'bg-slate-50 text-gray-500 hover:text-[#132c30]'
            }`}
          >
            Brand SVG Assets
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'seo' ? 'bg-[#132c30] text-white font-bold' : 'bg-slate-50 text-gray-500 hover:text-[#132c30]'
            }`}
          >
            XML Sitemap &amp; Robots
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'security' ? 'bg-[#132c30] text-white font-bold' : 'bg-slate-50 text-gray-500 hover:text-[#132c30]'
            }`}
          >
            WAF &amp; security
          </button>
        </div>
      </div>

      {/* Tab content: 1. WooCommerce PHP Hooks */}
      {activeTab === 'php' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-amber-50 border border-amber-200/50 p-5 rounded-2xl text-xs text-amber-800 leading-relaxed flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-sans font-bold block uppercase tracking-wide">WordPress Functions.php Injection Guidelines</strong>
              To activate our peptide constraints (minimum £100 checkout, crypto automated 30% discounts, and custom WhatsApp dispatch alerts) on a real WordPress deployment, paste the matching PHP code blocks below directly into your active WordPress Child Theme <code>functions.php</code> file.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {phpSnippets.map((snippet) => (
              <div key={snippet.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-sans font-extrabold text-[#111827] text-sm">{snippet.title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{snippet.desc}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(snippet.id, snippet.code)}
                    className="px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#2e5b62] bg-white text-xs font-mono font-bold transition-all flex items-center space-x-1 hover:text-[#2e5b62]"
                  >
                    {copiedIndex === snippet.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10b981]" />
                        <span className="text-[#10b981]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6 bg-slate-900 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-72">
                  <pre>{snippet.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab content: 2. Brand Vector Assets */}
      {activeTab === 'assets' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-lg text-center md:text-left">
              <span className="bg-[#2e5b62]/10 text-[#2e5b62] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">Alluvi Vector Core</span>
              <h3 className="text-xl font-sans font-black text-[#111827]">Download Logo &amp; Favicon Vector SVGs</h3>
              <p className="text-gray-500 text-sm leading-relaxed">This vector asset represents the premium Alluvi logo requested in our style sheet. It features an integrated medical double-helix chemical bonds structure styled with Deep Luxury Teal and gold tones.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleCopy('svg_logo_data', `<svg viewBox="0 0 100 100" stroke="currentColor" fill="none" strokeWidth="6"><circle cx="50" cy="50" r="5" fill="#d97706" /></svg>`)}
                  className="px-5 py-3 bg-[#132c30] hover:bg-[#2e5b62] text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Copy Logo SVG Code</span>
                </button>
                <button
                  onClick={() => handleCopy('favicon_guidance', 'Generate standard 32x32 Favicon using our Helix Vector Atom')}
                  className="px-5 py-3 border border-gray-200 hover:border-[#132c30] text-[#132c30] text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Download PNG Bundle
                </button>
              </div>
            </div>

            {/* Displaying Logo Render directly */}
            <div className="p-8 bg-[#132c30]/5 rounded-3xl border border-[#2e5b62]/10 flex flex-col items-center justify-center space-y-4 shrink-0 w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#132c30]" stroke="currentColor" fill="none" strokeWidth="6" strokeLinecap="round">
                <path d="M25 20 Q50 50 75 80" opacity="0.4" />
                <path d="M75 20 Q50 50 25 80" />
                <line x1="32" y1="30" x2="68" y2="30" strokeWidth="4" strokeDasharray="1,8" />
                <line x1="42" y1="45" x2="58" y2="45" strokeWidth="4" />
                <line x1="50" y1="50" x2="50" y2="50" strokeWidth="8" />
                <line x1="38" y1="55" x2="62" y2="55" strokeWidth="4" />
                <line x1="28" y1="70" x2="72" y2="70" strokeWidth="4" strokeDasharray="1,8" />
                <circle cx="50" cy="50" r="5" fill="#d97706" stroke="none" />
              </svg>
              <span className="font-sans font-black text-sm text-[#132c30] tracking-widest uppercase">ALLUVI LOGO</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab content: 3. SEO XML Sitemaps & robots.txt */}
      {activeTab === 'seo' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sitemap */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-extrabold text-[#111827] text-sm">Automated XML Sitemap Schema</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Sitemap index for Google Search Console indexing buyretat.co.uk.</p>
                </div>
                <button
                  onClick={() => handleCopy('sitemap_xml', sitemapXml)}
                  className="p-2 rounded-lg border border-gray-200 bg-white hover:text-[#2e5b62]"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-slate-900 text-slate-300 font-mono text-[10px] leading-relaxed overflow-x-auto max-h-80">
                <pre>{sitemapXml}</pre>
              </div>
            </div>

            {/* robots.txt */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-extrabold text-[#111827] text-sm">Robots.txt Content</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Restricts bot crawler access on cart/checkout routes.</p>
                </div>
                <button
                  onClick={() => handleCopy('robots_txt', robotsTxt)}
                  className="p-2 rounded-lg border border-gray-200 bg-white hover:text-[#2e5b62]"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-slate-900 text-slate-300 font-mono text-[10px] leading-relaxed overflow-x-auto max-h-80">
                <pre>{robotsTxt}</pre>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab content: 4. Security Headers */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-extrabold text-[#111827] text-sm">Apache .htaccess Security Policy Injection</h3>
                <p className="text-gray-400 text-xs mt-0.5">Enforces X-Frame-Options, CSP rules, and HSTS headers on buyretat.co.uk.</p>
              </div>
              <button
                onClick={() => handleCopy('htaccess_security', htaccessSecurity)}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-mono font-bold transition-all flex items-center space-x-1 hover:text-[#2e5b62]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Copy Policy</span>
              </button>
            </div>
            <div className="p-6 bg-slate-900 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80">
              <pre>{htaccessSecurity}</pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
