'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaEye, FaMinus, FaPlus, FaHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

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
  };
  onQuickView?: (productId: string) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false); // Ideally fetch this state from props or context
  
  // Check if product is in cart and get quantity
  const cartItem = cart.find(item => item._id === product._id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      images: product.images,
      price: product.price,
      author: product.author,
    });
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product._id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateQuantity(product._id, cartItem.quantity - 1);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // You might want to redirect to login or show a toast
      alert('Please login to use wishlist');
      return;
    }

    try {
      const res = await fetch('/api/users/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsWishlisted(!isWishlisted);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const discount = product.price.discounted
    ? Math.round(((product.price.original - product.price.discounted) / product.price.original) * 100)
    : 0;

  return (
    <div className="card group relative overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0] || '/placeholder-book.jpg'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleToggleWishlist}
            className={`p-3 rounded-full bg-white transition-colors hover:bg-secondary hover:text-white ${isWishlisted ? 'text-red-500' : 'text-primary'}`}
            title="Add to Wishlist"
          >
            <FaHeart className="w-5 h-5" />
          </button>
          
          {onQuickView && (
            <button
              onClick={() => onQuickView(product._id)}
              className="p-3 rounded-full bg-white text-primary hover:bg-secondary hover:text-white transition-colors"
              title="Quick View"
            >
              <FaEye className="w-5 h-5" />
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

        {/* Buy Now / Quantity Controls */}
        {quantityInCart > 0 ? (
          <div className="flex items-center justify-between bg-secondary text-white rounded-lg overflow-hidden">
            <button
              onClick={handleDecreaseQuantity}
              className="px-4 py-2 hover:bg-secondary-dark transition-colors flex-shrink-0"
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="flex-1 text-center font-semibold py-2">
              {quantityInCart} in Cart
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="px-4 py-2 hover:bg-secondary-dark transition-colors flex-shrink-0"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full btn btn-secondary text-sm py-2"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
}
