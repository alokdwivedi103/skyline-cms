'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/products/ProductCard';

interface Product {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  images: string[];
  price: {
    original: number;
    discounted?: number;
    currency: string;
  };
  author?: string;
}

export default function WishlistPage() {
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account/login');
      return;
    }

    if (isAuthenticated && token) {
      fetchWishlist();
    }
  }, [authLoading, isAuthenticated, token, router]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/users/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setWishlistItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light py-12">
      <div className="container-custom">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/account" className="hover:text-primary">Account</Link>
          <span>/</span>
          <span className="text-primary">Wishlist</span>
        </div>

        <h1 className="text-3xl font-serif font-bold text-primary mb-8">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm">
            <span className="text-6xl mb-4 block">❤️</span>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you want to buy later by clicking the heart icon.</p>
            <Link href="/products" className="btn btn-secondary inline-block">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
