import React, { useState } from 'react';
import { X, Heart, Share2, Send, PhoneCall, MessageSquare, Mail, MapPin, CheckCircle2, ShieldCheck, Cpu, Wrench } from 'lucide-react';
import { Product, SellerContactInfo } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { DEFAULT_SELLER_CONTACT } from '../../data/categories';
import { formatRWF } from '../../utils/formatCurrency';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRequestQuote: (p: Product) => void;
  contactInfo?: SellerContactInfo;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestQuote,
  contactInfo = DEFAULT_SELLER_CONTACT,
}) => {
  const { t } = useLanguage();
  const contact = contactInfo || DEFAULT_SELLER_CONTACT;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute top-3 left-3 bg-slate-900/90 text-blue-400 border border-slate-700 font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded backdrop-blur-xs">
                {product.status}
              </div>

              {product.condition && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow-xs">
                  {product.condition}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-slate-950 ${
                      selectedImageIndex === idx ? 'border-blue-500 scale-105 shadow-xs' : 'border-slate-300 dark:border-slate-800 hover:border-blue-400'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Component Technical Specs & Order CTA */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4 font-sans">
              
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-slate-800 px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                  {product.brand}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer text-xs font-mono flex items-center gap-1"
                    title={t('product.share')}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copied ? 'Copied Link!' : t('product.share')}</span>
                  </button>

                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title={t('product.like')}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {product.name}
              </h1>

              {/* Advertised Price & Minimum Order */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">Advertised Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">{formatRWF(product.price)}</span>
                    <span className="text-xs text-slate-500">/ {product.unit || 'Piece'}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block font-semibold">{t('product.minOrder')}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{product.minOrderQty || 1} {product.unit || 'Piece'}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{product.description}</p>
              </div>

              {/* Compatible Printer Models */}
              {product.compatibleModels && product.compatibleModels.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{t('product.compatibleModels')}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibleModels.map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-semibold text-xs rounded border border-slate-200 dark:border-slate-700">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              {product.specifications && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('product.specifications')}</h4>
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 last:border-0 pb-1 last:pb-0">
                        <span className="text-slate-500">{key}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Help Card */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 font-mono">
                <span className="text-blue-400 font-bold text-[10px] uppercase tracking-wider block">
                  {t('product.sellerContact')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a href={`tel:${(contact.phone || '').replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-blue-400">
                    <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                    <span>{contact.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${(contact.whatsapp || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Technician</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Request Part CTA Button */}
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product);
              }}
              disabled={product.status === 'Sold Out'}
              className={`w-full py-3.5 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                product.status === 'Sold Out'
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{product.status === 'Sold Out' ? 'THIS PART IS CURRENTLY OUT OF STOCK' : t('product.buyNow')}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
