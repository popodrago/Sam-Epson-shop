import React, { useState } from 'react';
import { Search, Heart, Globe, Menu, X, UserCheck, Cpu, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CATEGORIES } from '../../data/categories';
import { Language } from '../../types';
import { NovenLogo } from './NovenLogo';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAdminModal: () => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  currentView: string;
  onNavigate: (view: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenAdminModal,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  currentView,
  onNavigate,
  theme = 'dark',
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'rw', label: 'Kinyarwanda', flag: '🇷🇼' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none"
          >
            <NovenLogo size="md" inline variant="dark" />
          </button>
        </div>

        {/* Editorial Tech Search Bar */}
        <form
          onSubmit={onSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/80 shadow-xs focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all overflow-hidden"
        >
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <option value="">{t('search.categoryAll')}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Text Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none bg-transparent"
          />

          {/* Search Action Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('search.button')}</span>
          </button>
        </form>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
            title={t('nav.favorites')}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
            <span className="hidden lg:inline text-xs font-medium text-slate-700 dark:text-slate-300">
              {t('nav.favorites')}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="uppercase">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                    language === lang.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-700/50' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          )}

          {/* Admin Login Button */}
          <button
            onClick={onOpenAdminModal}
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-blue-600 text-white dark:bg-slate-800 dark:hover:bg-blue-600 px-3 py-1.5 rounded-md transition-colors cursor-pointer border border-slate-800 dark:border-slate-700"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">{t('nav.adminLogin')}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar (One Page Love Editorial Strip) */}
      <nav className="bg-slate-900 text-white border-t border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-mono tracking-wide">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-all ${
                currentView === 'home'
                  ? 'border-blue-500 text-white bg-slate-800/80 font-bold'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('nav.home')}</span>
            </button>

            <button
              onClick={() => onNavigate('products')}
              className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-all ${
                currentView === 'products'
                  ? 'border-blue-500 text-white bg-slate-800/80 font-bold'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('nav.products')}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Technical Hub Kigali
            </span>
            <span>•</span>
            <span className="text-slate-300">Epson • Brother • HP</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 py-4 border-t border-slate-800 space-y-3">
          <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-1 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-400 outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 text-xs font-semibold rounded">
              {t('search.button')}
            </button>
          </form>

          <div className="flex flex-col gap-1 text-xs font-medium pt-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => { onOpenFavorites(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 flex items-center justify-between"
            >
              <span>{t('nav.favorites')}</span>
              <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full">{favoritesCount}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
