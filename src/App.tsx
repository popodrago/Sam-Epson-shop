import React, { useState, useEffect, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { NoticeBanner } from './components/common/NoticeBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSection } from './components/home/FeaturedSection';
import { Testimonials } from './components/home/Testimonials';
import { ContactSection } from './components/home/ContactSection';
import { ProductGrid } from './components/product/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { QuoteRequestModal } from './components/product/QuoteRequestModal';
import { FavoritesModal } from './components/product/FavoritesModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProductModal } from './components/admin/AdminProductModal';
import { useFavorites } from './hooks/useFavorites';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';
import { INITIAL_PRODUCTS } from './data/mockCatalog';
import { DEFAULT_SELLER_CONTACT } from './data/categories';
import { Product, FilterState, CustomerRequest, SellerContactInfo } from './types';
import {
  getFirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  seedProductsIfEmpty,
  subscribeToProducts,
  subscribeToRequests,
  subscribeToContactInfo,
  saveContactInfoToFirestore,
  saveProductToFirestore,
  deleteProductFromFirestore,
  addCustomerRequestToFirestore,
  updateRequestStatusInFirestore,
} from './lib/firebase';

function MainAppContent() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const { recentIds, addRecentlyViewed } = useRecentlyViewed();

  // Theme State (Light mode default)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [contactInfo, setContactInfo] = useState<SellerContactInfo>(DEFAULT_SELLER_CONTACT);
  const [currentView, setCurrentView] = useState<string>('home');

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string | null>(null);

  // Modals state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Admin Product Edit Modal State
  const [adminProductModalOpen, setAdminProductModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Filters state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    categoryId: '',
    subcategoryId: '',
    brand: '',
    minPrice: null,
    maxPrice: null,
    status: 'All',
    selectedSize: '',
    selectedColor: '',
    sortBy: 'featured',
  });

  // Firebase Initialization & Realtime Listeners
  useEffect(() => {
    // 1. Seed & initial products check
    seedProductsIfEmpty()
      .then((initialItems) => {
        if (initialItems && initialItems.length > 0) {
          const existingIds = new Set(initialItems.map((p) => p.id));
          const missingInitial = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
          setProducts([...initialItems, ...missingInitial]);
        }
      })
      .catch((err) => {
        console.warn('Initial product catalog loading fallback used:', err);
      });

    // 2. Subscribe to products updates from Firestore
    const unsubscribeProducts = subscribeToProducts((realtimeProducts) => {
      if (realtimeProducts && realtimeProducts.length > 0) {
        const existingIds = new Set(realtimeProducts.map((p) => p.id));
        const missingInitial = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        setProducts([...realtimeProducts, ...missingInitial]);
      }
    });

    // 3. Subscribe to customer quote requests from Firestore
    const unsubscribeRequests = subscribeToRequests((realtimeRequests) => {
      setRequests(realtimeRequests);
    });

    // 4. Subscribe to public seller contact information from Firestore
    const unsubscribeContact = subscribeToContactInfo((realtimeContact) => {
      if (realtimeContact) {
        setContactInfo(realtimeContact);
      }
    });

    // 5. Firebase Auth State Listener
    try {
      const auth = getFirebaseAuth();
      const unsubscribeAuth = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            setIsAdminLoggedIn(true);
            setAdminUserEmail(user.email);
          }
        },
        (error) => {
          console.warn('Firebase Auth state notice:', error);
        }
      );
      return () => {
        unsubscribeProducts();
        unsubscribeRequests();
        unsubscribeContact();
        unsubscribeAuth();
      };
    } catch (err) {
      console.warn('Firebase Auth state listener notice:', err);
      return () => {
        unsubscribeProducts();
        unsubscribeRequests();
        unsubscribeContact();
      };
    }
  }, []);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProductForDetail(product);
    addRecentlyViewed(product.id);
  };

  const handleRequestQuote = (product: Product) => {
    setSelectedProductForQuote(product);
  };

  const handleSelectCategoryFromNav = (catId: string, subId?: string) => {
    setFilterState((prev) => ({
      ...prev,
      categoryId: catId,
      subcategoryId: subId || '',
      searchQuery: '', // reset text search query so all category items show up cleanly
      sortBy: 'featured', // suggested sort
    }));
    setCurrentView('products');
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      categoryId: '',
      subcategoryId: '',
      brand: '',
      minPrice: null,
      maxPrice: null,
      status: 'All',
      selectedSize: '',
      selectedColor: '',
      sortBy: 'featured',
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('products');
  };

  const handleAddRequest = async (requestData: Omit<CustomerRequest, 'id' | 'requestDate' | 'status'>) => {
    try {
      await addCustomerRequestToFirestore(requestData);
    } catch (err) {
      console.error('Failed to submit request to Firestore:', err);
      // Local fallback
      const newReq: CustomerRequest = {
        ...requestData,
        id: `req-${Date.now()}`,
        requestDate: new Date().toISOString(),
        status: 'Pending',
      };
      setRequests((prev) => [newReq, ...prev]);
    }
  };

  const handleUpdateContactInfo = async (newInfo: SellerContactInfo) => {
    try {
      await saveContactInfoToFirestore(newInfo);
      setContactInfo(newInfo);
    } catch (err) {
      console.error('Failed to save contact info to Firestore:', err);
      setContactInfo(newInfo);
    }
  };

  const handleAdminLoginAttempt = async (email: string, pass: string) => {
    setAdminAuthError(null);
    const cleanEmail = (email || '').trim().toLowerCase();

    // Check built-in demo admin credentials first to guarantee seamless login without unnecessary failing network calls
    if (
      (cleanEmail === 'admin@noven.rw' || cleanEmail === 'admin@avenuefashion.com') &&
      pass === 'admin123'
    ) {
      setIsAdminLoggedIn(true);
      setAdminUserEmail(cleanEmail);
      setAdminModalOpen(false);
      setCurrentView('admin');
      return;
    }

    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, pass);
      setIsAdminLoggedIn(true);
      setAdminUserEmail(email);
      setAdminModalOpen(false);
      setCurrentView('admin');
    } catch (firebaseErr: any) {
      if (firebaseErr?.code === 'auth/operation-not-allowed') {
        setAdminAuthError(
          'Firebase Auth Email/Password sign-in is disabled in Firebase console. Please sign in with demo admin: admin@noven.rw / admin123'
        );
      } else if (
        firebaseErr?.code === 'auth/user-not-found' ||
        firebaseErr?.code === 'auth/wrong-password' ||
        firebaseErr?.code === 'auth/invalid-credential'
      ) {
        setAdminAuthError('Invalid credentials. Use demo admin: admin@noven.rw / admin123');
      } else {
        setAdminAuthError('Authentication notice: Invalid credentials. Use demo admin: admin@noven.rw / admin123');
      }
    }
  };

  const handleAdminLogout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (err) {
      console.warn('Signout error:', err);
    }
    setIsAdminLoggedIn(false);
    setAdminUserEmail(null);
    setCurrentView('home');
  };

  // Product CRUD Handlers (Admin)
  const handleSaveProduct = async (product: Product) => {
    try {
      await saveProductToFirestore(product);
    } catch (err) {
      console.error('Failed to save product to Firestore:', err);
    }
    // Update local state immediately so UI updates in real time even before Firestore push
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = product;
        return updated;
      }
      return [product, ...prev];
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProductFromFirestore(productId);
    } catch (err) {
      console.error('Failed to delete product from Firestore:', err);
    }
  };

  const handleUpdateRequestStatus = async (
    requestId: string,
    status: CustomerRequest['status']
  ) => {
    try {
      await updateRequestStatusInFirestore(requestId, status);
    } catch (err) {
      console.error('Failed to update request status in Firestore:', err);
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'featured') {
      setFilterState((prev) => ({ ...prev, sortBy: 'featured' }));
    } else if (view === 'new-arrivals') {
      setFilterState((prev) => ({ ...prev, sortBy: 'newest' }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const isSpecificFilterActive = Boolean(
        filterState.categoryId ||
        filterState.subcategoryId ||
        filterState.searchQuery ||
        filterState.brand
      );

      // Tab-specific filters: 'featured' tab filters for isFeatured, 'new-arrivals' tab filters for isNewArrival
      // Only enforce tab filter if user has NOT selected a specific category, subcategory, brand, or search query
      if (!isSpecificFilterActive) {
        if (currentView === 'featured' && !p.isFeatured) return false;
        if (currentView === 'new-arrivals' && !p.isNewArrival) return false;
      }

      // Search query
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.categoryId.toLowerCase().includes(q) || p.subcategoryId.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesDesc) return false;
      }

      // Category filter (handles exact match, case-insensitivity, and singular/plural variations like printhead vs printheads)
      if (filterState.categoryId) {
        const targetCat = filterState.categoryId.toLowerCase().trim();
        const pCat = (p.categoryId || '').toLowerCase().trim();
        
        const catNormTarget = targetCat.replace(/s$/, '').replace(/er$/, '');
        const catNormProd = pCat.replace(/s$/, '').replace(/er$/, '');

        const matchesCategoryDirect = pCat === targetCat;
        const matchesCategoryNorm = catNormProd.includes(catNormTarget) || catNormTarget.includes(catNormProd);

        if (!matchesCategoryDirect && !matchesCategoryNorm) return false;
      }

      // Subcategory filter
      if (filterState.subcategoryId) {
        const targetSub = filterState.subcategoryId.toLowerCase().trim();
        const pSub = (p.subcategoryId || '').toLowerCase().trim();
        if (pSub !== targetSub && !pSub.includes(targetSub) && !targetSub.includes(pSub)) return false;
      }

      // Brand filter
      if (filterState.brand && p.brand.toLowerCase().trim() !== filterState.brand.toLowerCase().trim()) return false;

      // Status filter
      if (filterState.status !== 'All' && p.status !== filterState.status) return false;

      // Price filter
      if (filterState.maxPrice !== null && p.price > filterState.maxPrice) return false;

      // Hidden status filter for public users
      if (!isAdminLoggedIn && (p.status === 'Hidden' || p.status === 'Archived')) return false;

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'popular') return b.viewsCount - a.viewsCount;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filterState, isAdminLoggedIn, currentView]);

  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favoriteIds.includes(p.id));
  }, [products, favoriteIds]);

  // If Admin is logged in and currentView is 'admin', render Admin Dashboard
  if (isAdminLoggedIn && currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <AdminDashboard
          products={products}
          requests={requests}
          contactInfo={contactInfo}
          onAddProductClick={() => {
            setProductToEdit(null);
            setAdminProductModalOpen(true);
          }}
          onEditProductClick={(p) => {
            setProductToEdit(p);
            setAdminProductModalOpen(true);
          }}
          onDeleteProductClick={handleDeleteProduct}
          onUpdateRequestStatus={handleUpdateRequestStatus}
          onUpdateContactInfo={handleUpdateContactInfo}
          onLogout={handleAdminLogout}
          currentUserEmail={adminUserEmail}
        />

        {/* Admin Product Modal */}
        <AdminProductModal
          isOpen={adminProductModalOpen}
          onClose={() => {
            setAdminProductModalOpen(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
          onSaveProduct={handleSaveProduct}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white transition-colors duration-200">
      <div>
        {/* Top Notice Bar */}
        <NoticeBanner contactInfo={contactInfo} />

        {/* Primary Navigation Header */}
        <Header
          favoritesCount={favoriteIds.length}
          onOpenFavorites={() => setFavoritesModalOpen(true)}
          onOpenAdminModal={() => {
            if (isAdminLoggedIn) {
              setCurrentView('admin');
            } else {
              setAdminModalOpen(true);
            }
          }}
          selectedCategory={filterState.categoryId}
          onSelectCategory={(catId) => handleSelectCategoryFromNav(catId)}
          searchQuery={filterState.searchQuery}
          onSearchChange={(q) => setFilterState((prev) => ({ ...prev, searchQuery: q }))}
          onSearchSubmit={handleSearchSubmit}
          currentView={currentView}
          onNavigate={handleNavigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* View Router */}
        {currentView === 'home' && (
          <main>
            {/* Hero Section */}
            <HeroBanner
              onSelectCategory={handleSelectCategoryFromNav}
              onRequestQuoteClick={() => {
                if (products.length > 0) setSelectedProductForQuote(products[0]);
              }}
            />

            {/* Popular Categories */}
            <CategoryGrid onSelectCategory={handleSelectCategoryFromNav} />

            {/* Featured Showcase */}
            <FeaturedSection
              products={products}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={handleSelectProduct}
              onRequestQuote={handleRequestQuote}
              onViewAllProducts={() => handleNavigate('featured')}
            />

            {/* Customer Reviews & Testimonials */}
            <Testimonials />

            {/* Direct Contact Section */}
            <ContactSection contactInfo={contactInfo} />
          </main>
        )}

        {(currentView === 'products' || currentView === 'featured' || currentView === 'new-arrivals') && (
          <main className="bg-slate-50 dark:bg-slate-950 min-h-[60vh] py-6 transition-colors duration-200">
            <ProductGrid
              products={filteredProducts}
              filterState={filterState}
              onFilterChange={setFilterState}
              onResetFilters={handleResetFilters}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={handleSelectProduct}
              onRequestQuote={handleRequestQuote}
              currentView={currentView}
            />
          </main>
        )}

        {currentView === 'contact' && (
          <main>
            <ContactSection contactInfo={contactInfo} />
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        onNavigateCategory={handleSelectCategoryFromNav}
        onNavigate={(v) => setCurrentView(v)}
      />

      {/* Product Detail View Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        isFavorite={selectedProductForDetail ? isFavorite(selectedProductForDetail.id) : false}
        onToggleFavorite={toggleFavorite}
        onRequestQuote={handleRequestQuote}
        contactInfo={contactInfo}
      />

      {/* Quote & Purchase Request Modal */}
      <QuoteRequestModal
        product={selectedProductForQuote}
        isOpen={!!selectedProductForQuote}
        onClose={() => setSelectedProductForQuote(null)}
        onSubmitRequest={handleAddRequest}
        contactInfo={contactInfo}
      />

      {/* Favorites Drawer / Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favoriteProducts={favoriteProducts}
        onToggleFavorite={toggleFavorite}
        onSelectProduct={handleSelectProduct}
        onRequestQuote={handleRequestQuote}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLoginAttempt={handleAdminLoginAttempt}
        error={adminAuthError}
      />

      {/* Admin Product Modal */}
      <AdminProductModal
        isOpen={adminProductModalOpen}
        onClose={() => {
          setAdminProductModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
        onSaveProduct={handleSaveProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

