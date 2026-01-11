import { FaBook, FaUsers, FaTrophy, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            About Skyline Publications
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Your trusted partner in legal education and professional development since 2024
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At Skyline Publications, we are dedicated to providing legal professionals, students, and enthusiasts 
                with access to the most comprehensive and up-to-date legal resources available.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Focus on seamless communication and collaboration. We embrace challenges with confidence and foster 
                innovation, ensuring a smooth process while achieving goals with ease and effectiveness.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our commitment is to make legal knowledge accessible, affordable, and reliable for everyone in the 
                legal community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: FaBook, title: '1000+', subtitle: 'Legal Books' },
                { icon: FaUsers, title: '5000+', subtitle: 'Happy Customers' },
                { icon: FaTrophy, title: '15+', subtitle: 'Years Experience' },
                { icon: FaHeart, title: '100%', subtitle: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="card p-6 text-center">
                  <stat.icon className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-primary mb-1">{stat.title}</h3>
                  <p className="text-gray-600 text-sm">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                description: 'We provide only authentic and updated legal publications from trusted publishers.',
                icon: '⭐',
              },
              {
                title: 'Accessibility',
                description: 'Making legal knowledge accessible to everyone through affordable pricing and easy delivery.',
                icon: '🌐',
              },
              {
                title: 'Trust',
                description: 'Building long-term relationships with our customers through reliable service and support.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Bare Acts',
                description: 'Complete collection of Indian bare acts with latest amendments and annotations.',
              },
              {
                title: 'Legal Commentaries',
                description: 'In-depth commentaries and analysis by renowned legal experts and scholars.',
              },
              {
                title: 'Question & Answer Series',
                description: 'Comprehensive Q&A books for law students and competitive exam preparation.',
              },
              {
                title: 'Reference Books',
                description: 'Essential reference materials for legal practitioners and researchers.',
              },
            ].map((offering, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Ready to Explore Our Collection?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Browse through our extensive catalog of legal books and resources
          </p>
          <a
            href="/products"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            View All Products
          </a>
        </div>
      </section>
    </div>
  );
}
