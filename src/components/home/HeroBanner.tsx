import React, { useState } from 'react';
import { ChevronRight, Zap, ShieldCheck, Clock, Send, Printer, Cpu, Scan, Zap as PowerIcon, Cog, Disc, Droplet, Wrench, Search, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroBannerProps {
  onSelectCategory: (catId: string, subId?: string) => void;
  onRequestQuoteClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onRequestQuoteClick,
}) => {
  const { t } = useLanguage();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'printheads':
        return <Printer className="w-4 h-4 text-blue-500" />;
      case 'mainboards':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'sensors':
        return <Scan className="w-4 h-4 text-sky-500" />;
      case 'power-supplies':
        return <PowerIcon className="w-4 h-4 text-amber-500" />;
      case 'motors':
        return <Cog className="w-4 h-4 text-emerald-500" />;
      case 'rollers':
        return <Disc className="w-4 h-4 text-purple-500" />;
      case 'ink-systems':
        return <Droplet className="w-4 h-4 text-cyan-500" />;
      default:
        return <Wrench className="w-4 h-4 text-blue-500" />;
    }
  };

  const brandChips = [
    { name: 'Epson EcoTank & Photo Parts', count: '28+ Models', catId: 'printheads' },
    { name: 'Brother InkBenefit Components', count: '19+ Models', catId: 'mainboards' },
    { name: 'HP Smart Tank / DeskJet Parts', count: '22+ Models', catId: 'ink-systems' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-8 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Category Sidebar (Technical Component Index) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 relative flex flex-col justify-between shadow-xs dark:shadow-lg transition-colors">
            <div>
              <div className="px-2 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {t('nav.categories')}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Kigali Hub</span>
              </div>

              <div className="space-y-1">
                {CATEGORIES.slice(0, 8).map((cat, idx) => (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryIndex(idx)}
                    onMouseLeave={() => setActiveCategoryIndex(null)}
                    className="relative"
                  >
                    <button
                      onClick={() => onSelectCategory(cat.id)}
                      className="w-full px-3 py-2 rounded-lg flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        {getCategoryIcon(cat.id)}
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    {/* Subcategories Flyout Menu */}
                    {activeCategoryIndex === idx && (
                      <div className="absolute left-full top-0 -ml-1.5 pl-2.5 w-64 z-50">
                        <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3.5 space-y-2">
                          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              {cat.name}
                            </span>
                            <button
                              onClick={() => onSelectCategory(cat.id)}
                              className="text-[10px] font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 underline cursor-pointer"
                            >
                              All ({cat.subcategories.length})
                            </button>
                          </div>

                          <div className="space-y-1 max-h-64 overflow-y-auto pr-0.5">
                            {cat.subcategories.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => onSelectCategory(cat.id, sub.id)}
                                className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors flex items-center justify-between group/sub cursor-pointer"
                              >
                                <span>{sub.name}</span>
                                <ChevronRight className="w-3 h-3 text-slate-400 group-hover/sub:text-blue-600 dark:group-hover/sub:text-blue-400 group-hover/sub:translate-x-0.5 transition-all" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 bg-blue-50/80 dark:bg-blue-950/40 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Printer Tech Hotline</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                Not sure about exact model compatibility? We verify motherboard & printhead serials before dispatch.
              </p>
            </div>
          </div>

          {/* Center Main Editorial Showcase with Bright Printer Shop & Certified Parts Visual */}
          <div className="lg:col-span-6 relative rounded-xl border border-blue-200/80 dark:border-slate-800 overflow-hidden shadow-md dark:shadow-xl bg-gradient-to-br from-slate-50 via-white to-blue-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white flex flex-col justify-between p-6 sm:p-8 min-h-[420px] transition-colors duration-200">
            {/* Background Printer Shop Workshop Image with Light / Dark Adaptive Legibility Gradient */}
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"
              alt="SAM EPSON Technical Shop Workshop"
              className="absolute inset-0 w-full h-full object-cover object-right opacity-65 dark:opacity-70 pointer-events-none transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-slate-950 dark:via-slate-950/50 dark:to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2563eb_1px,transparent_1px)] dark:bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded shadow-sm tracking-wider">
                  SAM EPSON • Technical Hub & Workshop
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-white/90 dark:bg-slate-900/90 border border-blue-200 dark:border-slate-700 px-2.5 py-1 rounded backdrop-blur-xs shadow-xs">
                  Kigali Direct Spares
                </span>
              </div>

              {/* Title & Subtitle with high contrast */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Precision Printer Components & Original Replacement Parts
                </h1>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans leading-relaxed max-w-xl">
                  Certified MicroPiezo printheads, formatter logic boards, optical encoder sensors, AC power modules, carriage motors, and heavy-duty rollers.
                </p>
              </div>

              {/* Printer Shop Workshop Showcase Banner with High Visibility Image */}
              <div className="relative rounded-xl overflow-hidden border border-blue-200 dark:border-blue-500/30 bg-white/90 dark:bg-slate-900/95 p-3.5 flex items-center gap-4 shadow-xs dark:shadow-md backdrop-blur-sm">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-blue-300 dark:border-blue-500/40 shrink-0 bg-slate-100 dark:bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800"
                    alt="MicroPiezo Printhead Component"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-[9px] font-mono text-center font-bold text-white py-0.5">
                    GENUINE
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Certified Technical Workshop & Direct Sourcing</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 font-sans leading-relaxed">
                    All printheads, logic mainboards, and optical sensors undergo 100% bench diagnostic testing in Rwanda prior to dispatch.
                  </p>
                </div>
              </div>

              {/* Brand Compatibility Badges */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                {brandChips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectCategory(chip.catId)}
                    className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg text-left transition-all cursor-pointer group shadow-xs"
                  >
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {chip.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 font-sans">{chip.name.split(' ').slice(1).join(' ')}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={onRequestQuoteClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Part Quote</span>
                </button>
                <button
                  onClick={() => onSelectCategory('printheads')}
                  className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
                >
                  View Printheads
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Bench Tested</span>
              </div>
            </div>
          </div>

          {/* Right Part Inquiry & Contact Sourcing Box */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-xs dark:shadow-lg transition-colors">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-mono font-bold text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <div className="w-7 h-7 rounded bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  RFQ
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-none">Quick Part Request</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-normal">Kigali Service Desk</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                Need a specific board or printhead for Epson L382, L3150, Brother DCP-T500W, or HP Smart Tank?
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Quote Time: <strong className="text-slate-900 dark:text-white">&lt; 30 Mins</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Direct MoMo / Cash Delivery</span>
                </div>
              </div>
            </div>

            <button
              onClick={onRequestQuoteClick}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-mono font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer border border-slate-800 dark:border-slate-700 text-center flex items-center justify-center gap-2"
            >
              <span>{t('product.requestQuote')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
