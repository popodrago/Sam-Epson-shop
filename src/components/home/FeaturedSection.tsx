import React, { useState } from 'react';
import { Cpu, Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface FeaturedSectionProps {
  products: Product[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onRequestQuote: (p: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onRequestQuote,
  onViewAllProducts,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'featured' | 'trending' | 'new'>('featured');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'trending') return (p.viewsCount ?? 0) > 300 || (p.likesCount ?? 0) > 30;
    return true;
  });

  return (
    <section className="bg-slate-100 dark:bg-slate-900/60 py-12 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Editorial Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>TESTED PRINTER SPARES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('section.featured')}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs self-start">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'featured'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('nav.featured')}</span>
            </button>

            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'trending'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('section.trending')}</span>
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('nav.newArrivals')}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(filteredProducts.length > 0 ? filteredProducts : products).slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProduct={onSelectProduct}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>

        {/* View All CTA Button */}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-mono font-bold text-xs px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer border border-slate-800 dark:border-slate-700"
          >
            <span>View All Printer Components ({products.length} Items Available)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
