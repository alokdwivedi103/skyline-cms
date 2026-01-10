'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onQuickView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCarousel({ title, products, onQuickView, onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary">{title}</h2>
          
          {products.length > itemsPerView && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-background-light hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-full bg-background-light hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${currentIndex * (100 / itemsPerView)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="flex-shrink-0"
                style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
              >
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
