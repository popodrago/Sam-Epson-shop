import React from 'react';
import { ArrowRight, Printer, Cpu, Scan, Zap, Cog, Disc, Cable, Monitor, Droplet, Wrench, Box } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useLanguage } from '../../contexts/LanguageContext';

interface CategoryGridProps {
  onSelectCategory: (catId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const { t } = useLanguage();

  const getCategoryImage = (id: string) => {
    switch (id) {
      case 'printheads':
        return 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800';
      case 'mainboards':
        return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
      case 'sensors':
        return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800';
      case 'power-supplies':
        return 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800';
      case 'control-boards':
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800';
      case 'motors':
        return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800';
      case 'rollers':
        return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
      case 'cables':
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800';
      case 'display-panels':
        return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800';
      case 'ink-systems':
        return 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800';
      case 'maintenance-kits':
        return 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800';
      default:
        return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'printheads':
        return <Printer className="w-5 h-5 text-blue-400" />;
      case 'mainboards':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'sensors':
        return <Scan className="w-5 h-5 text-sky-400" />;
      case 'power-supplies':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'control-boards':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'motors':
        return <Cog className="w-5 h-5 text-emerald-400" />;
      case 'rollers':
        return <Disc className="w-5 h-5 text-teal-400" />;
      case 'cables':
        return <Cable className="w-5 h-5 text-cyan-400" />;
      case 'display-panels':
        return <Monitor className="w-5 h-5 text-rose-400" />;
      case 'ink-systems':
        return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'maintenance-kits':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <Box className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 transition-colors py-12 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              COMPONENTS CATALOGUE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {t('section.popularCategories')}
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Click any component category to filter compatible parts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 transition-all cursor-pointer shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Bright, Clear Top Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={getCategoryImage(cat.id)}
                  alt={cat.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute top-2.5 left-2.5 p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 backdrop-blur-xs shadow-xs">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded shadow-xs">
                  {cat.subcategories.length} Types
                </span>
              </div>

              {/* Bottom Details Bar */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans line-clamp-1 mt-0.5">
                    {cat.subcategories.map((s) => s.name).join(' • ')}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
