import React from 'react';
import { ArrowUpDown, SlidersHorizontal, Check, Sparkles, Flame, Layers, Cpu } from 'lucide-react';
import { Product, FilterState } from '../../types';
import { CATEGORIES, BRANDS } from '../../data/categories';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductGridProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (updater: (prev: FilterState) => FilterState) => void;
  onResetFilters: () => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onRequestQuote: (p: Product) => void;
  currentView?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onRequestQuote,
  currentView = 'products',
}) => {
  const { t } = useLanguage();

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === filterState.categoryId);

  // Dynamic header configuration based on active tab
  let title = "SAM EPSON Parts Directory";
  let subtitle = `Showing ${products.length} component listings for Epson, Brother, and HP printer systems in Rwanda`;
  let badge = null;

  if (currentView === 'featured') {
    title = "Featured Printer Components";
    subtitle = `Spotlighted MicroPiezo printheads, logic mainboards, and high-demand spares (${products.length} items)`;
    badge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
        FEATURED PARTS
      </span>
    );
  } else if (currentView === 'new-arrivals') {
    title = "Fresh Stock Arrivals";
    subtitle = `Recently received replacement boards, printheads, and optical sensors (${products.length} items)`;
    badge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-slate-700 shadow-xs">
        <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        NEW ARRIVALS
      </span>
    );
  } else {
    badge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
        <Layers className="w-3.5 h-3.5 text-blue-500" />
        FULL INVENTORY
      </span>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 h-fit font-sans">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-mono font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" />
              <span>Filter Parts</span>
            </h3>
            <button
              onClick={onResetFilters}
              className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('nav.categories')}
            </label>
            <div className="space-y-1">
              <button
                onClick={() =>
                  onFilterChange((prev) => ({ ...prev, categoryId: '', subcategoryId: '' }))
                }
                className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
                  !filterState.categoryId ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Categories
              </button>

              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-0.5">
                  <button
                    onClick={() =>
                      onFilterChange((prev) => ({ ...prev, categoryId: cat.id, subcategoryId: '' }))
                    }
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors flex items-center justify-between ${
                      filterState.categoryId === cat.id && !filterState.subcategoryId
                        ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>

                  {/* Subcategories */}
                  {filterState.categoryId === cat.id && (
                    <div className="pl-3 space-y-0.5 border-l border-slate-200 dark:border-slate-800 ml-2">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() =>
                            onFilterChange((prev) => ({ ...prev, subcategoryId: sub.id }))
                          }
                          className={`w-full text-left px-2 py-1 rounded text-[11px] font-sans transition-colors ${
                            filterState.subcategoryId === sub.id
                              ? 'bg-blue-600 text-white font-bold'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Printer Brand Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Printer Brands
            </label>
            <select
              value={filterState.brand}
              onChange={(e) => onFilterChange((prev) => ({ ...prev, brand: e.target.value }))}
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">All Brands (Epson, Brother, HP...)</option>
              {BRANDS.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Availability Status Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Availability Status
            </label>
            <div className="space-y-1 font-mono">
              {['All', 'Available', 'Sold Out', 'Out of Stock'].map((st) => (
                <button
                  key={st}
                  onClick={() => onFilterChange((prev) => ({ ...prev, status: st as any }))}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-between ${
                    filterState.status === st ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{st}</span>
                  {filterState.status === st && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Max Price (RWF)
            </label>
            <input
              type="number"
              placeholder="e.g. 150000"
              value={filterState.maxPrice ?? ''}
              onChange={(e) =>
                onFilterChange((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

        </div>

        {/* Right Main Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header Bar with Count & Sorting */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {badge}
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 font-mono">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={filterState.sortBy}
                onChange={(e) =>
                  onFilterChange((prev) => ({ ...prev, sortBy: e.target.value as any }))
                }
                className="px-3 py-2 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Stock</option>
                <option value="popular">Most In Demand</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills */}
          {(filterState.categoryId || filterState.brand || filterState.status !== 'All' || filterState.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 bg-blue-50/50 dark:bg-slate-800/80 p-3 rounded-lg border border-blue-200 dark:border-slate-700 font-mono text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-300">Active Filters:</span>
              {filterState.searchQuery && (
                <span className="bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-200 font-bold px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                  Query: "{filterState.searchQuery}"
                </span>
              )}
              {filterState.categoryId && (
                <span className="bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-200 font-bold px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                  Category: {selectedCategoryObj?.name || filterState.categoryId}
                </span>
              )}
              {filterState.brand && (
                <span className="bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-200 font-bold px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                  Brand: {filterState.brand}
                </span>
              )}
              {filterState.status !== 'All' && (
                <span className="bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-200 font-bold px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                  Status: {filterState.status}
                </span>
              )}
              <button
                onClick={onResetFilters}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline ml-auto"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {products.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center font-bold text-xl">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No printer parts match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                Try clearing selected filters or searching for terms like "Printhead", "Epson L382", "Motherboard", or "Sensor".
              </p>
              <button
                onClick={onResetFilters}
                className="bg-blue-600 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={isFavorite(p.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProduct={onSelectProduct}
                  onRequestQuote={onRequestQuote}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
