import React from 'react';
import { X, Heart, Send, Trash2, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatRWF } from '../../utils/formatCurrency';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProducts: Product[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onRequestQuote: (p: Product) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteProducts,
  onToggleFavorite,
  onSelectProduct,
  onRequestQuote,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-rose-100 dark:bg-slate-800 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-base text-slate-900 dark:text-white">{t('nav.favorites')}</h3>
              <p className="text-xs text-slate-500 font-sans">{favoriteProducts.length} saved printer parts</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3 flex-1 overflow-y-auto">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3 font-sans">
              <Heart className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto stroke-[1.5]" />
              <h4 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">No saved components yet</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the heart icon on any printer component card to save items to your workbench list.
              </p>
            </div>
          ) : (
            favoriteProducts.map((p) => (
              <div
                key={p.id}
                className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-blue-500/50 transition-all font-mono"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded cursor-pointer border border-slate-800 shrink-0"
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">{p.brand}</span>
                    {p.status === 'Sold Out' && (
                      <span className="bg-rose-600 text-white font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Sold Out
                      </span>
                    )}
                  </div>

                  <h4
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-blue-600 cursor-pointer font-sans"
                  >
                    {p.name}
                  </h4>

                  <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                    {formatRWF(p.price)} <span className="text-[10px] text-slate-500 font-normal">/ {p.unit || 'Piece'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestQuote(p);
                    }}
                    disabled={p.status === 'Sold Out'}
                    className={`p-2 rounded-md font-bold text-xs flex items-center gap-1 cursor-pointer ${
                      p.status === 'Sold Out'
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    title={t('product.buyNow')}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleFavorite(p.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold text-xs px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
