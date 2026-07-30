import React from 'react';
import { ShieldCheck, PhoneCall, MessageSquare, Wrench } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DEFAULT_SELLER_CONTACT } from '../../data/categories';
import { SellerContactInfo } from '../../types';

interface NoticeBannerProps {
  contactInfo?: SellerContactInfo;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ contactInfo = DEFAULT_SELLER_CONTACT }) => {
  const { t } = useLanguage();
  const contact = contactInfo || DEFAULT_SELLER_CONTACT;

  return (
    <div className="bg-slate-950 text-slate-100 text-xs py-2 px-4 border-b border-slate-800/80 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-sans text-slate-300">
            {t('notice.noDirectPayment')}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-slate-300">
          <a
            href={`tel:${(contact.phone || '').replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
            <span>{contact.phone}</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href={`https://wa.me/${(contact.whatsapp || '').replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-400">WhatsApp Technical Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
