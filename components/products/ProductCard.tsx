'use client';

import Link from 'next/link';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

interface ProductCardProps {
  product: {
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
  };
  onQuickView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const discount = product.price.discounted
    ? Math.round(((product.price.original - product.price.discounted) / product.price.original) * 100)
    : 0;

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images[0] || '/placeholder-book.jpg'}
            alt={product.title}
            className="product-card-image"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewRelease && (
            <span className="badge badge-new">NEW</span>
          )}
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
        </div>

        {/* Quick Actions - Show on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product._id)}
              className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-all transform scale-0 group-hover:scale-100"
              title="Quick View"
            >
              <FaEye className="w-5 h-5" />
            </button>
          )}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product._id)}
              className="bg-secondary text-white p-3 rounded-full hover:bg-secondary-dark transition-all transform scale-0 group-hover:scale-100"
              title="Add to Cart"
            >
              <FaShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {product.author && (
          <p className="text-xs text-gray-600 mb-1">{product.author}</p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-secondary">
            ₹{product.price.discounted || product.price.original}
          </span>
          {product.price.discounted && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.original}
            </span>
          )}
        </div>

        {/* Buy Now Button */}
        <button
          onClick={() => onAddToCart && onAddToCart(product._id)}
          className="w-full btn btn-secondary text-sm py-2"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
