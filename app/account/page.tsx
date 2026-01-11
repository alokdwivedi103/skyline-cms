'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaBox, FaHeart, FaMapMarkerAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function AccountPage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'My Orders',
      description: 'Track, return, or buy things again',
      icon: FaBox,
      href: '/account/orders',
    },
    {
      title: 'My Wishlist',
      description: 'View your favorite products',
      icon: FaHeart,
      href: '/account/wishlist',
    },
    {
      title: 'Your Addresses',
      description: 'Edit addresses for orders and gifts',
      icon: FaMapMarkerAlt,
      href: '/account/addresses',
    },
    {
      title: 'Login & Security',
      description: 'Edit login, name, and mobile number',
      icon: FaUser,
      href: '/account/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary">Your Account</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4 border border-gray-200"
            >
              <div className="bg-primary-light p-3 rounded-full text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders Preview (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Recent Orders</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600">You haven't placed any orders yet.</p>
            <Link href="/products" className="text-secondary hover:underline mt-2 inline-block">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
