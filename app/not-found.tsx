export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
