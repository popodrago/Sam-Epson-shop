import React from 'react';
import { PhoneCall, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Wrench } from 'lucide-react';
import { DEFAULT_SELLER_CONTACT } from '../../data/categories';
import { SellerContactInfo } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ContactSectionProps {
  contactInfo?: SellerContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo = DEFAULT_SELLER_CONTACT }) => {
  const { t } = useLanguage();
  const contact = contactInfo || DEFAULT_SELLER_CONTACT;

  return (
    <section className="py-12 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800/80 inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>DIRECT TECHNICAL HELPDESK</span>
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Need Specific Part Serial Numbers or Board Compatibility?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Our technicians verify motherboard revisions, printhead head-ID codes, and sensor models before shipping. Contact SAM EPSON directly in Kigali.
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold block text-[10px] uppercase">Phone Line</span>
                <a href={`tel:${(contact.phone || '').replace(/\s+/g, '')}`} className="text-sm font-bold hover:text-blue-400 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>{contact.phone}</span>
                </a>
              </div>

              <div className="bg-emerald-950/40 p-3.5 rounded-lg border border-emerald-900/60 space-y-1">
                <span className="text-emerald-400 font-bold block text-[10px] uppercase">WhatsApp Support</span>
                <a
                  href={`https://wa.me/${(contact.whatsapp || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-300 hover:underline flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{contact.whatsapp}</span>
                </a>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold block text-[10px] uppercase">Official Email</span>
                <a href={`mailto:${contact.email}`} className="text-xs font-bold hover:text-blue-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{contact.email}</span>
                </a>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold block text-[10px] uppercase">Working Hours</span>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{contact.businessHours}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50 font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>No online credit card requirements • Cash / MoMo payment upon inspection</span>
            </div>
          </div>

          {/* Service Center & Location Card */}
          <div className="bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Kigali Service Center & Parts Warehouse</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                Visit our Kigali technician facility for on-site printhead testing, motherboard diagnosis, or direct part pick-up.
              </p>
              
              <div className="p-3 bg-slate-950 rounded-md font-mono font-bold text-blue-300 border border-slate-800">
                {contact.location}
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
                <p>• Same-day local delivery across Kigali</p>
                <p>• Technical assistance for Epson head alignment & logic board EEPROM flashing</p>
                <p>• Emergency spare part shipping across Provinces in Rwanda</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
