'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-serif font-bold text-secondary mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
