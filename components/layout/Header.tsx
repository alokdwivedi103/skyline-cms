'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import SearchBar from './SearchBar';
import CategoryMenu from '../ui/CategoryMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="container-custom">
          <div className="flex justify-between items-center py-2 text-sm">
            {/* Left: Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <span className="ml-4 text-xs">📦 Cash On Delivery Available</span>
            </div>

            {/* Right: Secondary Navigation */}
            <div className="flex items-center space-x-6">
              <Link href="/about" className="hover:text-secondary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-secondary transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="hover:text-secondary transition-colors hidden md:block">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <span className="text-2xl font-serif font-bold">SP</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-serif font-bold text-primary leading-tight">
                  Skyline Publications
                </h1>
                <p className="text-xs text-gray-600">Your Trusted Legal Publisher</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl">
              <SearchBar />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden text-primary hover:text-primary-light">
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Account */}
              <Link href="/account" className="hidden md:flex items-center space-x-2 text-primary hover:text-primary-light transition-colors">
                <FaUser className="w-5 h-5" />
                <span className="text-sm font-medium">Account</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative flex items-center space-x-2 text-primary hover:text-primary-light transition-colors">
                <FaShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:block text-sm font-medium">Cart</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-primary hover:text-primary-light"
              >
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden mt-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-background-light border-t border-gray-200">
        <div className="container-custom">
          <CategoryMenu />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-6 animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-4">
              <Link href="/" className="block text-lg font-medium text-primary hover:text-primary-light">
                Home
              </Link>
              <Link href="/products" className="block text-lg font-medium text-primary hover:text-primary-light">
                All Products
              </Link>
              <Link href="/about" className="block text-lg font-medium text-primary hover:text-primary-light">
                About Us
              </Link>
              <Link href="/contact" className="block text-lg font-medium text-primary hover:text-primary-light">
                Contact
              </Link>
              <Link href="/account" className="block text-lg font-medium text-primary hover:text-primary-light">
                My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
