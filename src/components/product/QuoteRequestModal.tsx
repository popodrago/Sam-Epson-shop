import React, { useState } from 'react';
import { X, Send, PhoneCall, MessageSquare, Mail, MapPin, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { Product, CustomerRequest, SellerContactInfo } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { DEFAULT_SELLER_CONTACT } from '../../data/categories';
import { formatRWF } from '../../utils/formatCurrency';

interface QuoteRequestModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (requestData: Omit<CustomerRequest, 'id' | 'requestDate' | 'status'>) => void;
  contactInfo?: SellerContactInfo;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  product,
  isOpen,
  onClose,
  onSubmitRequest,
  contactInfo = DEFAULT_SELLER_CONTACT,
}) => {
  const { t } = useLanguage();
  const contact = contactInfo || DEFAULT_SELLER_CONTACT;
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(product ? (product.minOrderQty || 1) : 1);
  const [selectedModel, setSelectedModel] = useState(product?.compatibleModels?.[0] || '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    onSubmitRequest({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim(),
      quantity: Number(quantity),
      selectedSize: selectedModel || 'N/A',
      selectedColor: product.condition || 'N/A',
      message: message.trim(),
    });

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SAM EPSON Technical Support! I want to purchase / request quote for: ${product.name} (Part ID: ${product.id}). Required Quantity: ${quantity} ${product.unit || 'Piece'}. Printer Model: ${selectedModel || 'Unspecified'}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="py-8 text-center space-y-5 font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('modal.successTitle')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {t('modal.successMsg')}
              </p>
            </div>

            {/* Direct WhatsApp Action for instant technician response */}
            <div className="bg-emerald-50 dark:bg-slate-950 border border-emerald-200 dark:border-slate-800 rounded-lg p-4 text-center space-y-2 max-w-md mx-auto font-mono">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                Want Instant Technician Assistance?
              </span>
              <a
                href={`https://wa.me/${(contact.whatsapp || '').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-md shadow-sm transition-all cursor-pointer w-full"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={resetAndClose}
              className="bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold text-xs px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Printer Parts Catalog
            </button>
          </div>
        ) : (
          /* REQUEST FORM SCREEN */
          <div className="space-y-6 font-sans">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs uppercase tracking-wider mb-1">
                <Send className="w-4 h-4" />
                <span>Direct Component Inquiry</span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                {t('modal.quoteTitle')}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t('modal.quoteSubtitle')}
              </p>
            </div>

            {/* Product Summary Pill */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-lg font-mono">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded border border-slate-800 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{product.name}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{formatRWF(product.price)} / {product.unit || 'Piece'}</span>
                  <span>•</span>
                  <span>Min Order: {product.minOrderQty || 1}</span>
                </div>
              </div>
            </div>

            {/* Technical Desk Contact Quick Bar */}
            <div className="bg-slate-900 text-white p-3.5 rounded-lg space-y-2 text-xs font-mono">
              <span className="text-blue-400 font-bold uppercase tracking-wider block text-[10px]">
                {t('product.sellerContact')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-blue-400">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>{contact.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>

            {/* Request Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('modal.fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jean Habimana"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('modal.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('modal.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="technician@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('modal.quantity')} ({product.unit || 'Pcs'})
                  </label>
                  <input
                    type="number"
                    min={product.minOrderQty || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Printer Model */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Printer Model
                  </label>
                  <input
                    type="text"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder="e.g. Epson L382"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('modal.message')}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your printer error code, motherboard revision number, or delivery location in Rwanda..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-md outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('modal.submit')}</span>
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
