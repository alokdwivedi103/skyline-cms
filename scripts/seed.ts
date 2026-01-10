import mongoose from 'mongoose';
import Product from '../models/Product';
import Category from '../models/Category';

const MONGODB_URI = 'mongodb+srv://alokdwivedi103:alokdwivedi103@cluster0.kms0tjx.mongodb.net/skyline?retryWrites=true&w=majority&appName=Cluster0';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Bare Acts',
        slug: 'bare-acts',
        description: 'Complete collection of Indian bare acts with latest amendments',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Legal Commentaries',
        slug: 'commentaries',
        description: 'In-depth legal commentaries by renowned experts',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Question & Answer Series',
        slug: 'question-answer',
        description: 'Comprehensive Q&A books for law students',
        displayOrder: 3,
        isActive: true,
      },
      {
        name: 'Law Books',
        slug: 'law-books',
        description: 'Essential reference materials for legal practitioners',
        displayOrder: 4,
        isActive: true,
      },
    ]);

    console.log('Created categories:', categories.length);

    // Create sample products
    const products = [];
    const bookTitles = [
      { title: 'The Bharatiya Nyaya Samhita, 2023 (ALA/Bare Act)', author: 'Dr. R.K. Bangia', featured: true, newRelease: true },
      { title: 'The Bharatiya Sakshya Adhiniyam, 2023 (ALA/Bare Act)', author: 'Dr. R.K. Bangia', featured: true, newRelease: true },
      { title: 'The Protection of Women from Domestic Violence Act, 2005 (ALA/Bare Act)', author: 'Legal Experts', featured: false, newRelease: false },
      { title: 'The Sexual Harassment of Women at Workplace Act, 2013 (ALA/Bare Act)', author: 'Legal Experts', featured: false, newRelease: true },
      { title: 'Modern Hindu Law', author: 'Dr. R.K. Bangia', featured: true, newRelease: false },
      { title: 'The Law of Torts', author: 'Dr. R.K. Bangia', featured: true, newRelease: false },
      { title: 'Jurisprudence and Legal Theory', author: 'V.D. Mahajan', featured: true, newRelease: false },
      { title: 'Indian Penal Code', author: 'K.D. Gaur', featured: false, newRelease: false },
      { title: 'Code of Civil Procedure', author: 'C.K. Takwani', featured: false, newRelease: false },
      { title: 'Code of Criminal Procedure', author: 'K.N. Chandrasekharan Pillai', featured: false, newRelease: false },
      { title: 'Constitutional Law of India', author: 'J.N. Pandey', featured: true, newRelease: false },
      { title: 'Law of Contracts', author: 'Avtar Singh', featured: false, newRelease: false },
    ];

    for (let i = 0; i < bookTitles.length; i++) {
      const book = bookTitles[i];
      const categoryIndex = i % categories.length;
      const originalPrice = Math.floor(Math.random() * 500) + 200;
      const discountedPrice = Math.random() > 0.5 ? Math.floor(originalPrice * 0.85) : null;

      products.push({
        title: book.title,
        slug: book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: `Comprehensive guide to ${book.title}. This book provides in-depth analysis and commentary on the subject matter, making it an essential resource for legal professionals, students, and researchers.`,
        shortDescription: `Essential guide to ${book.title.split(',')[0]}`,
        category: categories[categoryIndex]._id,
        author: book.author,
        publisher: 'Allahabad Law Agency',
        edition: '2024 Edition',
        isbn: `978-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        images: [
          `https://picsum.photos/seed/${i}/400/600`,
          `https://picsum.photos/seed/${i + 100}/400/600`,
        ],
        price: {
          original: originalPrice,
          discounted: discountedPrice,
          currency: 'INR',
        },
        stock: Math.floor(Math.random() * 50) + 10,
        isFeatured: book.featured,
        isNewRelease: book.newRelease,
        tags: ['law', 'legal', 'books', 'india'],
      });
    }

    await Product.insertMany(products);
    console.log('Created products:', products.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
