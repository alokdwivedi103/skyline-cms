'use client';

import { useState, useEffect } from 'react';
import HeroSlider from '@/components/ui/HeroSlider';
import ProductCarousel from '@/components/products/ProductCarousel';
import Link from 'next/link';
import { FaBook, FaGavel, FaGraduationCap, FaFileAlt } from 'react-icons/fa';

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

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newReleases, setNewReleases] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch featured products
      const featuredRes = await fetch('/api/products?featured=true&limit=8');
      const featuredData = await featuredRes.json();

      // Fetch new releases
      const newReleasesRes = await fetch('/api/products?newRelease=true&limit=8');
      const newReleasesData = await newReleasesRes.json();

      if (featuredData.success) {
        setFeaturedProducts(featuredData.data);
      }

      if (newReleasesData.success) {
        setNewReleases(newReleasesData.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Implement cart functionality
    console.log('Add to cart:', productId);
  };

  const handleQuickView = (productId: string) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', productId);
  };

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bare Acts', icon: FaBook, slug: 'bare-acts', color: 'bg-blue-500' },
              { name: 'Legal Commentaries', icon: FaGavel, slug: 'commentaries', color: 'bg-red-500' },
              { name: 'Question & Answer', icon: FaGraduationCap, slug: 'question-answer', color: 'bg-green-500' },
              { name: 'Law Books', icon: FaFileAlt, slug: 'law-books', color: 'bg-purple-500' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group card card-hover p-8 text-center"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-primary group-hover:text-secondary transition-colors">
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
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      )}

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <section className="bg-background-light">
          <ProductCarousel
            title="Legal Masterpieces, All in One"
            products={featuredProducts}
            onAddToCart={handleAddToCart}
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
