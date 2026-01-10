'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  price: {
    original: number;
    discounted?: number;
  };
  author?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/products/${slug}`);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search for Books..."
          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white p-2 rounded-md hover:bg-secondary-dark transition-colors"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowResults(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result._id}
                onClick={() => handleResultClick(result.slug)}
                className="flex items-center gap-4 p-4 hover:bg-background-light cursor-pointer transition-colors border-b last:border-b-0"
              >
                {result.images && result.images[0] && (
                  <img
                    src={result.images[0]}
                    alt={result.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{result.title}</h4>
                  {result.author && (
                    <p className="text-xs text-gray-600">{result.author}</p>
                  )}
                  <p className="text-sm font-semibold text-primary mt-1">
                    ₹{result.price.discounted || result.price.original}
                    {result.price.discounted && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        ₹{result.price.original}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div className="p-3 text-center border-t">
              <button
                onClick={() => {
                  router.push(`/products?search=${encodeURIComponent(query)}`);
                  setShowResults(false);
                }}
                className="text-sm text-primary hover:text-primary-light font-medium"
              >
                View all results for "{query}"
              </button>
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 text-center">
          <p className="text-sm text-gray-600">Searching...</p>
        </div>
      )}
    </div>
  );
}
