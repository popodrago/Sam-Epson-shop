import React, { useState } from 'react';
import {
  Package,
  FileText,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare,
  PhoneCall,
  Search,
  Filter,
  LogOut,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Download,
  KeyRound,
  Lock,
  Mail,
  Check,
  MapPin,
  Building,
  Globe,
  Save,
} from 'lucide-react';
import { Product, CustomerRequest, SellerContactInfo } from '../../types';
import { formatRWF } from '../../utils/formatCurrency';
import { NovenLogo } from '../common/NovenLogo';
import { updateAdminEmailAndPassword } from '../../lib/firebase';

interface AdminDashboardProps {
  products: Product[];
  requests: CustomerRequest[];
  contactInfo: SellerContactInfo;
  onAddProductClick: () => void;
  onEditProductClick: (p: Product) => void;
  onDeleteProductClick: (id: string) => void;
  onUpdateRequestStatus: (requestId: string, status: CustomerRequest['status']) => void;
  onUpdateContactInfo: (info: SellerContactInfo) => Promise<void>;
  onLogout: () => void;
  currentUserEmail?: string | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  requests,
  contactInfo,
  onAddProductClick,
  onEditProductClick,
  onDeleteProductClick,
  onUpdateRequestStatus,
  onUpdateContactInfo,
  onLogout,
  currentUserEmail = 'admin@samepson.rw',
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'requests' | 'contact' | 'security'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>('All');

  // Contact Info state
  const [contactPhone, setContactPhone] = useState(contactInfo?.phone || '');
  const [contactWhatsapp, setContactWhatsapp] = useState(contactInfo?.whatsapp || '');
  const [contactEmail, setContactEmail] = useState(contactInfo?.email || '');
  const [contactHours, setContactHours] = useState(contactInfo?.businessHours || '');
  const [contactLocation, setContactLocation] = useState(contactInfo?.location || '');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    if (contactInfo) {
      setContactPhone(contactInfo.phone || '');
      setContactWhatsapp(contactInfo.whatsapp || '');
      setContactEmail(contactInfo.email || '');
      setContactHours(contactInfo.businessHours || '');
      setContactLocation(contactInfo.location || '');
    }
  }, [contactInfo]);

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactMessage(null);
    if (!contactPhone.trim() || !contactWhatsapp.trim() || !contactEmail.trim()) {
      setContactMessage({ type: 'error', text: 'Phone, WhatsApp, and Email fields are required.' });
      return;
    }

    setContactLoading(true);
    try {
      await onUpdateContactInfo({
        phone: contactPhone.trim(),
        whatsapp: contactWhatsapp.trim(),
        email: contactEmail.trim(),
        businessHours: contactHours.trim(),
        location: contactLocation.trim(),
      });
      setContactMessage({
        type: 'success',
        text: 'Seller contact information updated successfully! Public website updated live.',
      });
    } catch (err: any) {
      setContactMessage({
        type: 'error',
        text: err?.message || 'Failed to update contact details. Please try again.',
      });
    } finally {
      setContactLoading(false);
    }
  };

  // Admin Account Security state
  const [adminEmailInput, setAdminEmailInput] = useState(currentUserEmail || 'admin@samepson.rw');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateAdminAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setSecurityMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setSecurityLoading(true);
    try {
      const res = await updateAdminEmailAndPassword(
        currentPassword,
        adminEmailInput,
        newPassword
      );
      setSecurityMessage({ type: 'success', text: res.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setSecurityMessage({
        type: 'error',
        text: err.message || 'Failed to update credentials. Please check your current password.',
      });
    } finally {
      setSecurityLoading(false);
    }
  };

  // Filtered products for admin
  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  // Filtered requests for admin
  const filteredRequests = requests.filter((r) => {
    if (requestStatusFilter !== 'All' && r.status !== requestStatusFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.customerName.toLowerCase().includes(q) ||
      r.customerPhone.includes(q) ||
      r.productName.toLowerCase().includes(q)
    );
  });

  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;

  const exportRequestsToCSV = () => {
    if (requests.length === 0) {
      alert('No requests available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Location', 'Product', 'Quantity', 'Unit', 'Size', 'Color', 'Status', 'Notes'];
    const rows = requests.map((r) => [
      r.id,
      new Date(r.requestDate).toLocaleString(),
      `"${(r.customerName || '').replace(/"/g, '""')}"`,
      `"${r.customerPhone || ''}"`,
      `"${(r.customerLocation || '').replace(/"/g, '""')}"`,
      `"${(r.productName || '').replace(/"/g, '""')}"`,
      r.quantity,
      r.unit,
      r.selectedSize,
      r.selectedColor,
      r.status,
      `"${(r.additionalNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `noven_quote_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportProductsToCSV = () => {
    if (products.length === 0) {
      alert('No products available to export.');
      return;
    }
    const headers = ['ID', 'Name', 'Brand', 'Category', 'Subcategory', 'Price (RWF)', 'Min Qty', 'Unit', 'Status'];
    const rows = products.map((p) => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${(p.brand || '').replace(/"/g, '""')}"`,
      p.categoryId,
      p.subcategoryId,
      p.price,
      p.minOrderQty,
      p.unit,
      p.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `noven_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-16">
      
      {/* Admin Top Header */}
      <header className="bg-gray-900 text-white shadow-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <NovenLogo size="sm" inline variant="white" showTagline={false} />
            <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
            <div>
              <h1 className="text-base font-extrabold flex items-center gap-2">
                <span>Administrator Dashboard</span>
                <span className="bg-blue-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded shadow-xs">
                  Live Firebase Sync
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Logged in as: <strong className="text-blue-400">{currentUserEmail || 'admin@samepson.rw'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-400 text-xs px-3 py-1.5 rounded-xl border border-emerald-800/80 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Firestore Sync Active</span>
            </div>

            <button
              onClick={onLogout}
              className="bg-gray-800 hover:bg-rose-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        {/* Navigation Tabs & Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <button
            onClick={() => setActiveTab('products')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                : 'bg-white/80 border-gray-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Catalog Items</h3>
                <p className="text-xs text-gray-500">{products.length} products total</p>
              </div>
            </div>
            <span className="text-xl font-black text-gray-900">{products.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                : 'bg-white/80 border-gray-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Buyer Quotes</h3>
                <p className="text-xs text-amber-600 font-bold">{pendingRequestsCount} Pending Action</p>
              </div>
            </div>
            <span className="text-xl font-black text-gray-900">{requests.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                : 'bg-white/80 border-gray-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Contact Details</h3>
                <p className="text-xs text-emerald-600 font-semibold">WhatsApp, Email & Phone</p>
              </div>
            </div>
            <Globe className="w-5 h-5 text-emerald-500" />
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeTab === 'security'
                ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                : 'bg-white/80 border-gray-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Admin Security</h3>
                <p className="text-xs text-gray-500">Change Credentials</p>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-purple-500" />
          </button>

        </div>

        {/* Tab 1: Product Catalog Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog by name, brand..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={exportProductsToCSV}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Export Catalog to CSV"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={onAddProductClick}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product to Firestore</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price (RWF)</th>
                    <th className="py-3 px-3">Min Qty</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400 font-semibold">
                        No catalog items found matching search query.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-orange-50/40 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0"
                            />
                            <div>
                              <div className="font-extrabold text-gray-900">{p.name}</div>
                              <div className="text-[10px] text-orange-600 font-bold">{p.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-700 capitalize">
                          {p.categoryId} / {p.subcategoryId}
                        </td>
                        <td className="py-3 px-3 font-black text-gray-900">
                          {formatRWF(p.price)}
                        </td>
                        <td className="py-3 px-3 text-gray-600 font-bold">
                          {p.minOrderQty} {p.unit}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              p.status === 'Available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.status === 'Sold Out'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onEditProductClick(p)}
                              className="p-1.5 text-gray-600 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${p.name} from Firestore?`)) {
                                  onDeleteProductClick(p.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Customer Quote Requests */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search buyer name or phone..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-600">Status:</span>
                  <select
                    value={requestStatusFilter}
                    onChange={(e) => setRequestStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-xl bg-white text-slate-900 outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="All" className="bg-white text-slate-900 font-medium">All Requests</option>
                    <option value="Pending" className="bg-white text-slate-900 font-medium">Pending</option>
                    <option value="In Review" className="bg-white text-slate-900 font-medium">In Review</option>
                    <option value="Quoted" className="bg-white text-slate-900 font-medium">Quoted</option>
                    <option value="Completed" className="bg-white text-slate-900 font-medium">Completed</option>
                    <option value="Cancelled" className="bg-white text-slate-900 font-medium">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={exportRequestsToCSV}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Export Buyer Requests to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-gray-600" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-400 space-y-2">
                  <FileText className="w-10 h-10 mx-auto stroke-[1.5]" />
                  <p className="text-xs font-semibold">No quote requests found in Firestore.</p>
                </div>
              ) : (
                filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-gray-900">{req.customerName}</span>
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              req.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : req.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Date: {new Date(req.requestDate).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Update Status:</span>
                        <select
                          value={req.status}
                          onChange={(e) =>
                            onUpdateRequestStatus(req.id, e.target.value as CustomerRequest['status'])
                          }
                          className="px-2.5 py-1 text-xs font-bold border border-slate-300 rounded-lg bg-white text-slate-900 outline-none focus:border-blue-600 cursor-pointer"
                        >
                          <option value="Pending" className="bg-white text-slate-900 font-medium">Pending</option>
                          <option value="In Review" className="bg-white text-slate-900 font-medium">In Review</option>
                          <option value="Quoted" className="bg-white text-slate-900 font-medium">Quoted</option>
                          <option value="Completed" className="bg-white text-slate-900 font-medium">Completed</option>
                          <option value="Cancelled" className="bg-white text-slate-900 font-medium">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Product</span>
                        <span className="font-bold text-orange-600">{req.productName}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Quantity & Size</span>
                        <span className="font-bold text-gray-900">
                          {req.quantity} {req.unit} ({req.selectedSize} / {req.selectedColor})
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Customer Location</span>
                        <span className="font-medium text-gray-700">{req.customerLocation || 'Kigali'}</span>
                      </div>
                    </div>

                    {req.additionalNotes && (
                      <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-700">
                        <span className="font-bold text-gray-500 block text-[10px] uppercase">Notes:</span>
                        {req.additionalNotes}
                      </div>
                    )}

                    {/* Quick Direct Communication Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${req.customerPhone}`}
                        className="bg-gray-900 text-white hover:bg-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                        <span>Call Buyer ({req.customerPhone})</span>
                      </a>

                      <a
                        href={`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open WhatsApp Chat</span>
                      </a>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* Tab 3: Public Contact Details & Showroom Settings */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
            
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">
                    Public Seller Contact & Showroom Details
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage the contact phone, WhatsApp sales number, official support email, showroom hours, and physical location displayed across the website.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
                <Globe className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Live Website Sync</span>
              </div>
            </div>

            {contactMessage && (
              <div
                className={`p-4 rounded-2xl border text-xs font-bold flex items-start gap-2.5 ${
                  contactMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {contactMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{contactMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Column */}
              <form onSubmit={handleSaveContactInfo} className="lg:col-span-7 space-y-5">
                
                {/* Phone Line */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                    <span>Official Sales Phone Line *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold text-gray-900"
                  />
                  <p className="text-[10px] text-gray-400">
                    Appears in top banner, header, footer, and quote modals.
                  </p>
                </div>

                {/* WhatsApp Sales */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp Direct Sales Number *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactWhatsapp}
                    onChange={(e) => setContactWhatsapp(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold text-gray-900"
                  />
                  <p className="text-[10px] text-gray-400">
                    Used for direct click-to-WhatsApp buyer inquiries and quote confirmations. Include country code (+250).
                  </p>
                </div>

                {/* Official Email */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-orange-500" />
                    <span>Official Public Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="sales@noven.rw"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold text-gray-900"
                  />
                  <p className="text-[10px] text-gray-400">
                    Displayed for official correspondence and corporate quotation requests.
                  </p>
                </div>

                {/* Business Hours */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Business & Showroom Working Hours</span>
                  </label>
                  <input
                    type="text"
                    value={contactHours}
                    onChange={(e) => setContactHours(e.target.value)}
                    placeholder="Mon - Sat: 8:00 AM - 7:00 PM (CAT)"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold text-gray-900"
                  />
                </div>

                {/* Location / Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Physical Showroom & Distribution Center Address</span>
                  </label>
                  <textarea
                    rows={2}
                    value={contactLocation}
                    onChange={(e) => setContactLocation(e.target.value)}
                    placeholder="NoveN Design & Craft Showroom, Suite 402, Kigali - Rwanda"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold text-gray-900"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {contactLoading ? (
                      <span className="animate-pulse">Saving Contact Details...</span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save & Publish Contact Details</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Live Preview Card */}
              <div className="lg:col-span-5 bg-gray-900 text-white p-6 rounded-3xl space-y-5 border border-gray-800 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <span className="text-xs font-extrabold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Live Website Preview
                  </span>
                  <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 font-semibold">
                    Real-Time
                  </span>
                </div>

                {/* Top Banner Mock */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-3 rounded-xl text-[11px] font-medium space-y-1">
                  <span className="text-[9px] uppercase font-bold text-orange-200 block">Header Announcement Banner</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">📞 {contactPhone || '+250 788 123 456'}</span>
                    <span className="text-emerald-300 font-bold shrink-0">💬 WhatsApp</span>
                  </div>
                </div>

                {/* Contact Card Mock */}
                <div className="bg-gray-800/90 p-4 rounded-2xl border border-gray-700 space-y-3 text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Public Contact Information Card
                  </span>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="font-bold text-white">{contactPhone || '+250 788 123 456'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-bold">{contactWhatsapp || '+250 788 123 456'} (WhatsApp)</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>{contactEmail || 'sales@noven.rw'}</span>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300 pt-1 border-t border-gray-700/60">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{contactLocation || 'Kigali, Rwanda'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-amber-300 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{contactHours || 'Mon - Sat: 8:00 AM - 7:00 PM'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-800/60 text-[11px] text-emerald-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    When saved, these details instantly update in the top banner, website footer, inquiry section, and product quote modals for all site visitors.
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 4: Admin Account Security & Settings */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
            
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">Admin Account & Security</h2>
                  <p className="text-xs text-gray-500">Update admin email address and account login password</p>
                </div>
              </div>
            </div>

            {securityMessage && (
              <div
                className={`p-4 rounded-2xl border text-xs font-bold flex items-start gap-2.5 ${
                  securityMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {securityMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{securityMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateAdminAccount} className="space-y-5">
              
              {/* Admin Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>Admin Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  placeholder="admin@noven.rw"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
                <p className="text-[10px] text-gray-400">
                  Used for authenticating as administrator in NoveN Control Panel.
                </p>
              </div>

              {/* Current Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gray-500" />
                  <span>Current Password *</span>
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to verify identity"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500"
                />
              </div>

              <div className="h-px bg-gray-100 my-4"></div>

              {/* New Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-orange-500" />
                    <span>New Password</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep unchanged"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Confirm New Password</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={securityLoading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {securityLoading ? (
                    <span className="animate-pulse">Updating Credentials...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Security Settings</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
