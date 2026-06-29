import React from 'react';
import { Eye, Heart, GitCompare, ShoppingCart, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  isCompared: boolean;
  onToggleCompare: (productId: string) => void;
  isInCart: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  isInCart
}: ProductCardProps) {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="bg-white rounded-3xl border border-gray-100 hover:border-[#2e5b62]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative h-full"
    >
      {/* Absolute Badging top-left */}
      {product.badge && (
        <span 
          className={`absolute top-4 left-4 z-20 font-sans font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full text-white shadow-sm ${
            product.badge === 'New' 
              ? 'bg-[#10b981]' 
              : product.badge === 'Best Seller' 
              ? 'bg-[#d97706]' 
              : 'bg-[#132c30]'
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Quick Action Overlays top-right */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`p-2 rounded-full border shadow-md transition-all duration-200 cursor-pointer ${
            isWishlisted 
              ? 'bg-rose-50 border-rose-100 text-rose-500' 
              : 'bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <button
          id={`compare-toggle-${product.id}`}
          onClick={(e) => { e.stopPropagation(); onToggleCompare(product.id); }}
          className={`p-2 rounded-full border shadow-md transition-all duration-200 cursor-pointer ${
            isCompared 
              ? 'bg-blue-50 border-blue-100 text-blue-500' 
              : 'bg-white border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50'
          }`}
          title="Compare Product Specifications"
        >
          <GitCompare className="w-4 h-4" />
        </button>

        <button
          id={`quick-view-toggle-${product.id}`}
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-[#2e5b62] hover:bg-[#eef4f4] shadow-md transition-all duration-200 cursor-pointer"
          title="Quick View Specifications"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Area */}
      <div 
        onClick={() => onQuickView(product)}
        className="w-full aspect-square bg-[#f8fafc] relative overflow-hidden flex items-center justify-center p-6 cursor-pointer"
      >
        <ProductImage 
          productId={product.id}
          alt={product.seoTitle || product.name} 
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          fallbackSvg={product.image}
        />
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132c30]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-semibold text-[#2e5b62] tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 text-[9px] font-mono text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100/50">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                <span>{Math.floor(7 + (product.name.length % 6))} viewing</span>
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-[#d97706] fill-current" />
                <span className="text-[10px] font-mono text-gray-500 font-bold">5.0</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-sans font-extrabold text-[#111827] text-base group-hover:text-[#2e5b62] transition-colors duration-200 cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short scientific description */}
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {product.shortDesc}
          </p>

          {/* Chemical details tag */}
          <div className="pt-1 flex items-center space-x-1.5 text-[10px] text-[#132c30] font-mono bg-[#eef4f4]/60 px-2 py-1 rounded w-fit">
            <span className="font-bold uppercase">Formula:</span>
            <span className="text-[#2e5b62]">{product.specifications['Molecular Formula'] || product.chemicalName}</span>
          </div>
        </div>

        {/* Pricing and Call To Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <span className="text-[10px] font-mono block text-gray-400">RESEARCH PRICE:</span>
            <span className="text-lg font-mono font-bold text-[#111827]">
              £{product.price.toFixed(2)}
            </span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-300 cursor-pointer ${
              isInCart 
                ? 'bg-[#10b981] hover:bg-[#059669] text-white' 
                : 'bg-[#132c30] hover:bg-[#2e5b62] text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
