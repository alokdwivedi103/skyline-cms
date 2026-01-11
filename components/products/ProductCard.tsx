'use client';

import Link from 'next/link';
import { FaShoppingCart, FaEye, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

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
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  
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
    if (cartItem) {
      updateQuantity(product._id, cartItem.quantity - 1);
    }
  };

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
          <button
            onClick={handleAddToCart}
            className="bg-secondary text-white p-3 rounded-full hover:bg-secondary-dark transition-all transform scale-0 group-hover:scale-100"
            title="Add to Cart"
          >
            <FaShoppingCart className="w-5 h-5" />
          </button>
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
