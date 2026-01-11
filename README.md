# Skyline Publications

A modern e-commerce platform for legal books and resources built with Next.js and MongoDB.

## Features

- 🏪 Full e-commerce functionality
- 📚 Product catalog with categories
- 🔍 Real-time search with autocomplete
- 🛒 Shopping cart system
- 📧 Newsletter subscription
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 14
- 🎨 Beautiful UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skyline-cms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=skyline
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
NODE_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
skyline-cms/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── categories/        # Category pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── products/         # Product cards, carousels
│   ├── ui/               # Reusable UI components
│   └── forms/            # Contact, Newsletter forms
├── lib/                   # Utilities
│   └── mongodb.ts        # MongoDB connection
├── models/                # MongoDB schemas
│   ├── Product.ts
│   ├── Category.ts
│   ├── Order.ts
│   └── Newsletter.ts
└── public/                # Static assets
```

## API Endpoints

### Products
- `GET /api/products` - List products with pagination and filters
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - List orders

### Other
- `GET /api/search` - Search products
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/contact` - Submit contact form

## Database Collections

- **products** - Product catalog
- **categories** - Product categories
- **orders** - Customer orders
- **newsletters** - Email subscriptions
- **contacts** - Contact form submissions

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

MIT

## Support

For support, email support@skylinepublications.com
