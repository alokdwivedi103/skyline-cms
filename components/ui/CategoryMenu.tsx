'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: string;
}

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?parentOnly=true');
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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
            onMouseEnter={() => setActiveCategory(category._id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              href={`/categories/${category.slug}`}
              className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-secondary transition-colors"
            >
              <span>{category.name}</span>
              <FaChevronDown className="w-3 h-3" />
            </Link>
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
