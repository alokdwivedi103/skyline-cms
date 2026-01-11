'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some books to your cart to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => {
                const price = item.price.discounted || item.price.original;
                
                return (
                  <div key={item._id} className="card p-4 flex gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                      <img
                        src={item.images[0] || '/placeholder-book.jpg'}
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="font-serif font-semibold text-lg mb-1 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      {item.author && (
                        <p className="text-sm text-gray-600 mb-2">{item.author}</p>
                      )}
                      <p className="text-lg font-bold text-secondary">
                        ₹{price}
                        {item.price.discounted && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{item.price.original}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from cart"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="font-semibold text-primary">
                        ₹{(price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-secondary">
                    ₹{getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full btn btn-secondary mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-primary hover:text-primary-light font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
