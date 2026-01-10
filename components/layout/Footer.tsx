'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Successfully subscribed!');
        setEmail('');
      } else {
        setMessage(data.error || 'Subscription failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-dark py-12">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif font-bold mb-2">Join Us-</h3>
            <p className="text-gray-300 mb-6">
              Become a part of our community and gain access to expert knowledge and resources. 
              Join us to stay ahead in your legal journey with fresh insights and exclusive content.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email address"
                required
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary hover:bg-secondary-dark px-8 py-3 rounded-md font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'CONTACT NOW'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${message.includes('Success') ? 'text-green-300' : 'text-red-300'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white text-primary p-2 rounded-lg">
                  <span className="text-xl font-serif font-bold">SLA</span>
                </div>
                <h3 className="text-lg font-serif font-bold">Skyline Law Agency</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Focus on seamless communication and collaboration. Embrace challenges with confidence and foster 
                innovation, ensuring a smooth process while achieving goals with ease and effectiveness.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Menu</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="link-footer text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="link-footer text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="link-footer text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="link-footer text-sm">
                    Download Catalogue
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/shipping-policy" className="link-footer text-sm">
                    Shipping & Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="link-footer text-sm">
                    Return, Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="link-footer text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="link-footer text-sm">
                    Order History
                  </Link>
                </li>
              </ul>
            </div>

            {/* What's in Store */}
            <div>
              <h4 className="text-lg font-semibold mb-4">What's in Store</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/categories/bare-acts" className="link-footer text-sm">
                    Bare Acts
                  </Link>
                </li>
                <li>
                  <Link href="/categories/question-answer" className="link-footer text-sm">
                    Question & Answer Series
                  </Link>
                </li>
                <li>
                  <Link href="/categories/law-books" className="link-footer text-sm">
                    Other Law Books
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-light py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>© 2024 Skyline Law Agency. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
