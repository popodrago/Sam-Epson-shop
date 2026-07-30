import React from 'react';
import { Star, Quote, ShieldCheck, Wrench } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      id: 1,
      name: 'Emmanuel Habimana',
      role: 'Chief Engineer, Kigali Print Studio',
      comment: 'Sourced an original Epson L382 printhead and L3150 logic board. Both were 100% bench-tested and arrived in sealed packaging with zero nozzle clogs.',
      rating: 5,
      date: '1 week ago',
    },
    {
      id: 2,
      name: 'Claude Bizimana',
      role: 'IT & Printer Repair Manager, Musanze',
      comment: 'SAM EPSON is our go-to for Brother DCP-T500W mainboards and optical encoder strips. Quick WhatsApp verification saved us hours of troubleshooting.',
      rating: 5,
      date: '2 weeks ago',
    },
    {
      id: 3,
      name: 'Sandrine Uwamahoro',
      role: 'Copy & Digital Bureau Owner, Huye',
      comment: 'Replaced HP Smart Tank 515 printheads and paper pickup rollers. Excellent technical advice and fast local delivery in Rwanda.',
      rating: 5,
      date: '1 month ago',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-md border border-blue-200 dark:border-slate-700 inline-flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            <span>TECHNICIAN VERIFIED REVIEWS</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('section.testimonials')}
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Feedback from certified printer repair technicians, IT managers, and digital print bureaus across Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{rev.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <span className="text-[10px] text-slate-500 font-sans">{rev.role}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
