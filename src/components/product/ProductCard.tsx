import React, { useState } from 'react';
import { Heart, Eye, Send, CheckCircle2, AlertTriangle, XCircle, Cpu, Wrench } from 'lucide-react';
import { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatRWF } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onRequestQuote: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onRequestQuote,
}) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getStatusBadge = () => {
    switch (product.status) {
      case 'Sold Out':
        return (
          <span className="bg-rose-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <XCircle className="w-3 h-3" />
            {t('product.soldOut')}
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="bg-amber-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <AlertTriangle className="w-3 h-3" />
            {t('product.outOfStock')}
          </span>
        );
      case 'Available':
      default:
        return (
          <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            {t('product.available')}
          </span>
        );
    }
  };

  const getConditionColor = (cond?: string) => {
    switch (cond) {
      case 'New (Original)':
        return 'bg-blue-600/90 text-white';
      case 'Refurbished':
        return 'bg-purple-600/90 text-white';
      case 'Original Pull':
        return 'bg-slate-700/90 text-white';
      default:
        return 'bg-slate-800/90 text-white';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-100"
          loading="lazy"
        />

        {/* Status & Condition Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {getStatusBadge()}
          {product.condition && (
            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow-xs ${getConditionColor(product.condition)}`}>
              {product.condition}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer z-10 border border-slate-700"
          title="Favorite Component"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-400'
            }`}
          />
        </button>

        {/* Thumbnail Dots if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentImageIndex === idx ? 'bg-blue-500 w-4' : 'bg-white/60 hover:bg-white w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Tag */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{product.brand}</span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[10px]">{product.unit || 'Piece'}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Compatible Printer Models Tag */}
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <div className="mt-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-start gap-1">
              <Cpu className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">
                Models: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{product.compatibleModels.slice(0, 3).join(', ')}</strong>
                {product.compatibleModels.length > 3 && ` +${product.compatibleModels.length - 3}`}
              </span>
            </div>
          )}
        </div>

        {/* Price & Minimum Order Quantity */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              {formatRWF(product.price)}
            </span>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            {t('product.minOrder')}: <strong className="text-slate-700 dark:text-slate-300">{product.minOrderQty || 1} {product.unit || 'Piece'}</strong>
          </p>
        </div>

        {/* Buy Now / Request Quote Action */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={t('product.viewDetails')}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onRequestQuote(product)}
            disabled={product.status === 'Sold Out'}
            className={`flex-1 py-2 px-3 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              product.status === 'Sold Out'
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{product.status === 'Sold Out' ? t('product.soldOut') : t('product.buyNow')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
