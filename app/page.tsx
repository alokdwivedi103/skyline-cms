'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/ui/HeroSlider';
import ProductCarousel from '@/components/products/ProductCarousel';

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
  isFeatured?: boolean;
  isNewRelease?: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export default function Home() {
  const [newReleases, setNewReleases] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
  };

  useEffect(() => {
    // Fetch new releases
    fetch('/api/products?isNewRelease=true&limit=8')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewReleases(data.data);
        }
      });

    // Fetch featured products
    fetch('/api/products?isFeatured=true&limit=8')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFeaturedProducts(data.data);
        }
      });

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data.slice(0, 4)); // Get first 4 categories
        }
      });
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/products?category=${category.slug}`}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-primary to-primary-dark rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl text-white">📚</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-center group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Carousel */}
      {newReleases.length > 0 && (
        <ProductCarousel
          title="Newly Released Bare Acts"
          products={newReleases}
          onQuickView={handleQuickView}
        />
      )}

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <section className="bg-background-light">
          <ProductCarousel
            title="Legal Masterpieces, All in One"
            products={featuredProducts}
            onQuickView={handleQuickView}
          />
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Download Our Complete Catalogue
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get access to our comprehensive collection of legal books, bare acts, and resources
          </p>
          <Link
            href="/catalogue"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Download Catalogue
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cash on Delivery',
                description: 'Pay when you receive your order',
                icon: '💵',
              },
              {
                title: 'Fast Shipping',
                description: 'Quick delivery across India',
                icon: '🚚',
              },
              {
                title: 'Authentic Books',
                description: 'Original and updated editions',
                icon: '✅',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
