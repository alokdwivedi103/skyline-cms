'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaShare, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';


export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart, updateQuantity } = useCart();
  
  // Check if product is in cart and get quantity
  const cartItem = product ? cart.find(item => item._id === product._id) : null;
  const quantityInCart = cartItem?.quantity || 0;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        title: product.title,
        slug: product.slug,
        images: product.images,
        price: product.price,
        author: product.author,
      });
    }
  };

  const handleIncreaseQuantity = () => {
    if (product && cartItem) {
      updateQuantity(product._id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (product && cartItem) {
      updateQuantity(product._id, cartItem.quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const discount = product.price.discounted
    ? Math.round(((product.price.original - product.price.discounted) / product.price.original) * 100)
    : 0;

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-primary">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="card overflow-hidden mb-4">
              <img
                src={product.images[0] || '/placeholder-book.jpg'}
                alt={product.title}
                className="w-full h-auto"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="card overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                    <img src={image} alt={`${product.title} ${index + 2}`} className="w-full h-auto" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNewRelease && <span className="badge badge-new">NEW</span>}
              {discount > 0 && <span className="badge badge-sale">-{discount}% OFF</span>}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {product.title}
            </h1>

            {product.author && (
              <p className="text-lg text-gray-600 mb-4">
                by <span className="font-medium">{product.author}</span>
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-secondary">
                ₹{product.price.discounted || product.price.original}
              </span>
              {product.price.discounted && (
                <span className="text-2xl text-gray-500 line-through">
                  ₹{product.price.original}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="bg-background-light p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-4">Product Details</h3>
              <div className="space-y-2 text-gray-700">
                {product.publisher && (
                  <div className="flex">
                    <span className="w-32 font-medium">Publisher:</span>
                    <span>{product.publisher}</span>
                  </div>
                )}
                {product.edition && (
                  <div className="flex">
                    <span className="w-32 font-medium">Edition:</span>
                    <span>{product.edition}</span>
                  </div>
                )}
                {product.isbn && (
                  <div className="flex">
                    <span className="w-32 font-medium">ISBN:</span>
                    <span>{product.isbn}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="w-32 font-medium">Availability:</span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              {quantityInCart > 0 ? (
                <div className="flex-1 flex items-center justify-between bg-secondary text-white rounded-lg overflow-hidden">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="px-6 py-3 hover:bg-secondary-dark transition-colors flex-shrink-0"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-semibold text-lg py-3">
                    {quantityInCart} in Cart
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="px-6 py-3 hover:bg-secondary-dark transition-colors flex-shrink-0"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              )}
              <button className="btn btn-outline">
                <FaHeart />
              </button>
              <button className="btn btn-outline">
                <FaShare />
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
