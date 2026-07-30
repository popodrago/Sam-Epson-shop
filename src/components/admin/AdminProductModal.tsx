import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Image as ImageIcon,
  Plus,
  Trash2,
  Tag,
  Layers,
  DollarSign,
  Upload,
  HardDrive,
  Smartphone,
  Check,
  Search,
  Sparkles,
  FolderPlus,
  Star,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES, BRANDS } from '../../data/categories';
import { STOCK_GALLERY_IMAGES, GalleryImage } from '../../data/stockGallery';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSaveProduct: (product: Product) => void;
}

const compressAndReadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSaveProduct,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'NoveN Craft',
    categoryId: 'clothes',
    subcategoryId: 'shirts',
    description: '',
    price: 35000,
    currency: 'RWF',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    isFeatured: true,
    isNewArrival: true,
    images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Black', 'White', 'Navy'],
    specifications: {
      Material: '100% Premium Combed Cotton',
      Origin: 'Crafted in Rwanda',
    },
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [newSizeInput, setNewSizeInput] = useState('');
  const [newColorInput, setNewColorInput] = useState('');

  // Image Upload & Gallery Modal state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('all');
  const [gallerySearch, setGallerySearch] = useState<string>('');
  const [previewImageModalUrl, setPreviewImageModalUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({
        id: `noven-${Date.now()}`,
        name: '',
        brand: 'NoveN Craft',
        categoryId: 'clothes',
        subcategoryId: 'shirts',
        description: '',
        price: 35000,
        currency: 'RWF',
        minOrderQty: 1,
        unit: 'Pcs',
        status: 'Available',
        isFeatured: true,
        isNewArrival: true,
        images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800'],
        availableSizes: ['S', 'M', 'L', 'XL'],
        availableColors: ['Black', 'White', 'Navy'],
        specifications: {
          Material: '100% Premium Cotton',
          Origin: 'Crafted in Rwanda',
        },
        likesCount: 0,
        viewsCount: 0,
        createdAt: new Date().toISOString(),
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const currentCategoryObj = CATEGORIES.find((c) => c.id === formData.categoryId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const finalProd: Product = {
      id: formData.id || `sam-${Date.now()}`,
      name: formData.name || 'Untitled Printer Component',
      brand: formData.brand || 'Epson',
      compatibleModels: formData.compatibleModels || ['Epson L382', 'Epson L383'],
      categoryId: formData.categoryId || 'printheads',
      subcategoryId: formData.subcategoryId || 'epson-printheads',
      description: formData.description || '',
      price: Number(formData.price),
      currency: 'FRW',
      minOrderQty: Number(formData.minOrderQty) || 1,
      unit: formData.unit || 'Pcs',
      status: (formData.status as any) || 'Available',
      condition: formData.condition || 'Original',
      isFeatured: !!formData.isFeatured,
      isNewArrival: !!formData.isNewArrival,
      images:
        formData.images && formData.images.length > 0
          ? formData.images
          : ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800'],
      sizes: formData.availableSizes || [],
      colors: (formData.availableColors || []).map((c: string) => ({ name: c, hex: '#111827' })),
      availableSizes: formData.availableSizes || [],
      availableColors: formData.availableColors || ['Standard'],
      specifications: formData.specifications || {},
      likesCount: formData.likesCount ?? 0,
      viewsCount: formData.viewsCount ?? 0,
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    onSaveProduct(finalProd);
    onClose();
  };

  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), imageUrlInput.trim()],
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSetCoverImage = (index: number) => {
    setFormData((prev) => {
      const existing = [...(prev.images || [])];
      if (index <= 0 || index >= existing.length) return prev;
      const selected = existing.splice(index, 1)[0];
      existing.unshift(selected);
      return { ...prev, images: existing };
    });
  };

  // Process File List (Device/Computer Files)
  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      setUploadProgress(`Processing image ${i + 1} of ${fileArray.length}...`);
      try {
        const dataUrl = await compressAndReadImage(fileArray[i]);
        newImages.push(dataUrl);
      } catch (err) {
        console.error('Error reading image file:', err);
      }
    }

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newImages],
    }));

    setIsUploading(false);
    setUploadProgress(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleAddFromGallery = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), url],
    }));
  };

  const handleAddSize = () => {
    if (!newSizeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      availableSizes: [...(prev.availableSizes || []), newSizeInput.trim()],
    }));
    setNewSizeInput('');
  };

  const handleRemoveSize = (sizeStr: string) => {
    setFormData((prev) => ({
      ...prev,
      availableSizes: (prev.availableSizes || []).filter((s) => s !== sizeStr),
    }));
  };

  const handleAddColor = () => {
    if (!newColorInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      availableColors: [...(prev.availableColors || []), newColorInput.trim()],
    }));
    setNewColorInput('');
  };

  const handleRemoveColor = (colStr: string) => {
    setFormData((prev) => ({
      ...prev,
      availableColors: (prev.availableColors || []).filter((c) => c !== colStr),
    }));
  };

  // Stock gallery filtering
  const filteredStockImages = STOCK_GALLERY_IMAGES.filter((img) => {
    if (galleryCategoryFilter !== 'all' && img.category !== galleryCategoryFilter) return false;
    if (gallerySearch.trim()) {
      const q = gallerySearch.toLowerCase();
      return img.title.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm animate-in fade-in">
      {/* Hidden File Input for Local Computer / Device Gallery Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 relative">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {productToEdit ? 'Edit Catalog Item' : 'Add New Product to NoveN Catalog'}
            </h2>
            <p className="text-xs text-gray-500">
              Set exact price in Rwandan Francs (RWF), attach images, and set availability.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. NoveN Signature Oxford Cotton Shirt"
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brand / Line *</label>
              <input
                type="text"
                required
                value={formData.brand || ''}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. NoveN Craft"
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Main Category</label>
              <select
                value={formData.categoryId || 'clothes'}
                onChange={(e) => {
                  const catId = e.target.value;
                  const catObj = CATEGORIES.find((c) => c.id === catId);
                  setFormData({
                    ...formData,
                    categoryId: catId,
                    subcategoryId: catObj?.subcategories[0]?.id || '',
                  });
                }}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 bg-white font-semibold"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subcategory</label>
              <select
                value={formData.subcategoryId || ''}
                onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 bg-white font-semibold"
              >
                {currentCategoryObj?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Price in RWF (Rwandan Francs) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.price ?? 35000}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-bold"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-orange-600">RWF</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Minimum Order Quantity & Unit
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="1"
                  value={formData.minOrderQty ?? 1}
                  onChange={(e) => setFormData({ ...formData, minOrderQty: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-semibold"
                  placeholder="Min Qty"
                />
                <select
                  value={formData.unit || 'Pcs'}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 bg-white font-semibold"
                >
                  <option value="Pcs">Pcs</option>
                  <option value="Pairs">Pairs</option>
                  <option value="Sets">Sets</option>
                  <option value="Dozens">Dozens</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of craftsmanship, materials, sizing fit..."
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-orange-500 font-medium"
            />
          </div>

          {/* Availability & Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Availability Status</label>
              <select
                value={formData.status || 'Available'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white outline-none focus:border-orange-500 font-bold"
              >
                <option value="Available">Available</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Hidden">Hidden (Admin Only)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="isFeatured"
                checked={!!formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded accent-orange-500"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-gray-800 cursor-pointer">
                Show in Featured Showcase
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="isNewArrival"
                checked={!!formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded accent-orange-500"
              />
              <label htmlFor="isNewArrival" className="text-xs font-bold text-gray-800 cursor-pointer">
                Mark as New Arrival
              </label>
            </div>
          </div>

          {/* Enhanced Product Image Section */}
          <div className="space-y-3 bg-orange-50/40 p-5 rounded-2xl border border-orange-200/80">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-orange-600" />
                  <span>Product Photo Gallery ({formData.images?.length || 0})</span>
                </label>
                <p className="text-[11px] text-gray-500">
                  Select images from computer/gallery, pick from NoveN stock collection, or paste an image URL.
                </p>
              </div>

              <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-2.5 py-1 rounded-full">
                Drag & Drop Ready
              </span>
            </div>

            {/* Quick Action Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Upload from Local Computer / Mobile Photo Gallery */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="p-3.5 bg-white hover:bg-orange-50 border-2 border-dashed border-orange-300 hover:border-orange-500 rounded-2xl transition-all text-left flex items-center gap-3 group cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900 flex items-center gap-1">
                    <span>Upload from Computer / Phone Gallery</span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    JPG, PNG, WebP (auto-optimized & compressed)
                  </div>
                </div>
              </button>

              {/* Option 2: Select from Stock Photo Collection */}
              <button
                type="button"
                onClick={() => setShowGalleryModal(true)}
                className="p-3.5 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-900 rounded-2xl transition-all text-left flex items-center gap-3 group cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900">Choose from Stock Gallery</div>
                  <div className="text-[10px] text-gray-500">
                    Browse curated suits, shoes, shirts & accessories
                  </div>
                </div>
              </button>
            </div>

            {/* Interactive Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-orange-500 bg-orange-100/60 scale-[1.01]'
                  : 'border-gray-300 bg-white/80 hover:bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-700">
                <FolderPlus className="w-4 h-4 text-orange-500" />
                <span>Drag & drop photo files here or click to open file picker</span>
              </div>
            </div>

            {/* Progress Bar when uploading */}
            {isUploading && (
              <div className="p-3 bg-orange-100 text-orange-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
                <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <span>{uploadProgress || 'Processing selected photos...'}</span>
              </div>
            )}

            {/* Option 3: Manual Image URL Input */}
            <div className="pt-2 border-t border-orange-200/60 space-y-1">
              <label className="block text-[11px] font-bold text-gray-700">
                Or Paste Image Direct Link (URL):
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3.5 py-2 text-xs border border-gray-300 bg-white rounded-xl outline-none focus:border-orange-500 font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-gray-900 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add URL</span>
                </button>
              </div>
            </div>

            {/* Attached Image Thumbnails */}
            <div className="pt-2">
              <span className="text-[11px] font-extrabold text-gray-700 block mb-2">
                Attached Images ({formData.images?.length || 0}):
              </span>

              {(!formData.images || formData.images.length === 0) ? (
                <p className="text-xs text-rose-600 font-semibold italic">
                  No images attached yet. Please upload or select at least one product photo.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {formData.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm bg-gray-100"
                    >
                      <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />

                      {/* Main Cover Badge */}
                      {i === 0 ? (
                        <div className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-white" />
                          <span>Cover</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(i)}
                          className="absolute top-1 left-1 p-1 bg-gray-900/80 hover:bg-orange-500 text-white rounded-md text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Set as Main Cover Image"
                        >
                          Make Cover
                        </button>
                      )}

                      {/* Action overlay buttons */}
                      <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setPreviewImageModalUrl(img)}
                          className="p-1 bg-gray-900/80 hover:bg-gray-900 text-white rounded-md transition-colors"
                          title="Preview Full Size"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sizes & Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sizes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Available Sizes</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                  placeholder="e.g. M, L, XL, 42"
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(formData.availableSizes || []).map((s) => (
                  <span
                    key={s}
                    className="bg-gray-100 text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(s)}
                      className="text-gray-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Available Colors</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newColorInput}
                  onChange={(e) => setNewColorInput(e.target.value)}
                  placeholder="e.g. Black, White, Olive"
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(formData.availableColors || []).map((c) => (
                  <span
                    key={c}
                    className="bg-gray-100 text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(c)}
                      className="text-gray-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Product to Firestore</span>
            </button>
          </div>
        </form>
      </div>

      {/* Stock Gallery Selection Modal Popup */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>NoveN Stock Fashion Photo Library</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select high-resolution apparel photos to instantly attach to your product catalog
                </p>
              </div>

              <button
                onClick={() => setShowGalleryModal(false)}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Search & Filter Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Search gallery photos..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-xl bg-white outline-none focus:border-orange-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'suits', label: 'Suits' },
                  { id: 'shirts', label: 'Shirts' },
                  { id: 'tshirts', label: 'T-Shirts' },
                  { id: 'jackets', label: 'Jackets' },
                  { id: 'shoes', label: 'Shoes' },
                  { id: 'caps', label: 'Caps' },
                  { id: 'accessories', label: 'Accessories' },
                  { id: 'bags', label: 'Bags' },
                  { id: 'traditional', label: 'Traditional' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setGalleryCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      galleryCategoryFilter === cat.id
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredStockImages.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-400 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto stroke-1" />
                  <p className="text-xs font-semibold">No stock photos found matching search criteria.</p>
                </div>
              ) : (
                filteredStockImages.map((stock) => {
                  const isAlreadyAdded = (formData.images || []).includes(stock.url);
                  return (
                    <div
                      key={stock.id}
                      onClick={() => {
                        handleAddFromGallery(stock.url);
                      }}
                      className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer aspect-square ${
                        isAlreadyAdded
                          ? 'border-orange-500 ring-2 ring-orange-500/30 opacity-80'
                          : 'border-gray-200 hover:border-orange-500 hover:shadow-xl'
                      }`}
                    >
                      <img src={stock.url} alt={stock.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="self-end bg-gray-900/80 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded backdrop-blur">
                          {stock.category}
                        </span>

                        <div>
                          <p className="text-white text-xs font-bold line-clamp-1">{stock.title}</p>
                          <span className="text-[10px] text-orange-400 font-extrabold flex items-center gap-1 pt-0.5">
                            {isAlreadyAdded ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Added to Product
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5">
                                <Plus className="w-3 h-3" /> Click to Insert
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600">
                Total Attached: <strong className="text-orange-600">{formData.images?.length || 0} images</strong>
              </span>

              <button
                onClick={() => setShowGalleryModal(false)}
                className="bg-gray-900 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Done Selecting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox Modal */}
      {previewImageModalUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setPreviewImageModalUrl(null)}
        >
          <div className="relative max-w-2xl w-full max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={previewImageModalUrl} alt="Preview" className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-gray-800" />
            <button
              onClick={() => setPreviewImageModalUrl(null)}
              className="absolute -top-3 -right-3 p-2 bg-white text-gray-900 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

