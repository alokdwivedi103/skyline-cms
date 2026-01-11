'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  price: {
    original: number;
    discounted?: number;
  };
}

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<{ [key: string]: Product[] }>({});

  useEffect(() => {
    fetch('/api/categories?parentsOnly=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleCategoryHover = async (categoryId: string, categorySlug: string) => {
    setHoveredCategory(categoryId);
    
    // Fetch products for this category if not already loaded
    if (!categoryProducts[categoryId]) {
      try {
        const res = await fetch(`/api/products?category=${categoryId}&limit=6`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setCategoryProducts(prev => ({
            ...prev,
            [categoryId]: data.data
          }));
        }
      } catch (err) {
        console.error('Error fetching category products:', err);
      }
    }
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center space-x-8 py-4">
        <li>
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            Home
          </Link>
        </li>
        
        {categories.slice(0, 6).map((category) => (
          <li
            key={category._id}
            className="relative"
            onMouseEnter={() => handleCategoryHover(category._id, category.slug)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm flex gap-1 items-center font-medium text-primary hover:text-secondary transition-colors"
            >
              {category.name}<BiChevronDown className="size-6" />
            </Link>

            {/* Dropdown with products */}
            {hoveredCategory === category._id && categoryProducts[category._id] && categoryProducts[category._id].length > 0 && (
              <div className="absolute left-0 top-full w-96 bg-white shadow-2xl rounded-b-lg z-50 border-t-4 border-secondary mt-2 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:bg-transparent">
                <div className="p-4">
                  <h3 className="text-primary font-semibold mb-3 text-sm uppercase">
                    Popular in {category.name}
                  </h3>
                  <div className="space-y-2">
                    {categoryProducts[category._id].slice(0, 4).map((product) => (
                      <Link
                        key={product._id}
                        href={`/products/${product.slug}`}
                        className="flex gap-3 p-2 hover:bg-background-light rounded transition-colors"
                      >
                        <img
                          src={product.images[0] || '/placeholder-book.jpg'}
                          alt={product.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-secondary font-semibold text-sm mt-1">
                            ₹{product.price.discounted || product.price.original}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block mt-3 text-center text-primary hover:text-secondary font-semibold text-sm py-2 border-t"
                  >
                    View All {category.name} →
                  </Link>
                </div>
              </div>
            )}
          </li>
        ))}

        <li>
          <Link
            href="/products"
            className="text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            All Products
          </Link>
        </li>
      </ul>
    </nav>
  );
}
