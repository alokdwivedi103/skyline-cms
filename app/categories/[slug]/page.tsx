'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [params.slug, sortBy]);

  const fetchCategoryAndProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch category details
      const categoryRes = await fetch(`/api/categories`);
      const categoryData = await categoryRes.json();
      
      if (categoryData.success) {
        const foundCategory = categoryData.data.find((cat: Category) => cat.slug === params.slug);
        setCategory(foundCategory || null);
        
        if (foundCategory) {
          // Fetch products in this category using category ID
          let url = `/api/products?category=${foundCategory._id}`;
          if (sortBy === 'price-low') url += '&sort=price';
          if (sortBy === 'price-high') url += '&sort=-price';
          if (sortBy === 'name') url += '&sort=title';

          const productsRes = await fetch(url);
          const productsData = await productsRes.json();
          
          if (productsData.success) {
            setProducts(productsData.data);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <Link href="/products" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-primary">{category.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input py-2"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
            <Link href="/products" className="btn btn-primary mt-4">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
