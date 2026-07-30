import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Cpu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DEFAULT_SELLER_CONTACT, CATEGORIES } from '../../data/categories';
import { SellerContactInfo } from '../../types';
import { NovenLogo } from './NovenLogo';

interface FooterProps {
  onNavigateCategory: (catId: string) => void;
  onNavigate: (view: string) => void;
  contactInfo?: SellerContactInfo;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateCategory, onNavigate, contactInfo = DEFAULT_SELLER_CONTACT }) => {
  const { t } = useLanguage();
  const contact = contactInfo || DEFAULT_SELLER_CONTACT;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Company Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <NovenLogo size="md" inline variant="white" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('footer.aboutText')}
          </p>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-blue-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Direct Technical Inquiry:</strong> No online card payments required. All purchases are arranged via MoMo, Bank Transfer, or Cash upon inspection in Kigali.
            </span>
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-white font-mono font-bold text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
            Printer Component Categories
          </h4>
          <ul className="space-y-1.5 text-xs font-medium text-slate-400">
            {CATEGORIES.slice(0, 7).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onNavigateCategory(cat.id)}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-blue-500 font-mono">›</span>
                  <span>{cat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contacts Column */}
        <div className="space-y-3">
          <h4 className="text-white font-mono font-bold text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
            {t('product.sellerContact')}
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`tel:${(contact.phone || '').replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-mono">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${(contact.whatsapp || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400"
              >
                {contact.whatsapp} (WhatsApp Direct)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors font-mono">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{contact.location}</span>
            </li>
            <li className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{contact.businessHours}</span>
            </li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="space-y-3">
          <h4 className="text-white font-mono font-bold text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
            How To Order Spare Parts
          </h4>
          <div className="space-y-2 text-xs text-slate-400 font-sans">
            <div className="p-2.5 bg-slate-900 rounded-md flex items-center gap-2.5 border border-slate-850">
              <span className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <span>Find part & check printer model compatibility.</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-md flex items-center gap-2.5 border border-slate-850">
              <span className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <span>Click <strong>Buy / Request Part</strong> to submit details.</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-md flex items-center gap-2.5 border border-slate-850">
              <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <span>SAM EPSON technician verifies part & coordinates pickup/delivery.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} SAM EPSON Technical Platform. {t('footer.rights')}</p>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span>Epson • Brother • HP Genuine Parts Showcase</span>
        </div>
      </div>
    </footer>
  );
};
