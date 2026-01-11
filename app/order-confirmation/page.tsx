'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We've received your order and will process it soon.
            </p>
          </div>

          {orderNumber && (
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">Order Number</h2>
              <p className="text-3xl font-bold text-secondary">{orderNumber}</p>
              <p className="text-sm text-gray-600 mt-2">
                Please save this order number for your records
              </p>
            </div>
          )}

          <div className="card p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>You will receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>We will process your order and prepare it for shipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>You'll receive a tracking number once your order is shipped</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Payment will be collected upon delivery (Cash on Delivery)</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="btn btn-outline"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
