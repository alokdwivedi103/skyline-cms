'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'New Releases 2025',
    subtitle: 'Latest Legal Publications',
    description: 'Explore our newest collection of bare acts and legal commentaries',
    image: '/hero-1.jpg',
    link: '/products?newRelease=true',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    title: 'Legal Masterpieces',
    subtitle: 'All in One Collection',
    description: 'Comprehensive legal resources for professionals and students',
    image: '/hero-2.jpg',
    link: '/categories/legal-masterpieces',
    buttonText: 'Explore Collection',
  },
  {
    id: 3,
    title: 'Bare Acts Collection',
    subtitle: 'Updated & Authentic',
    description: 'Get the latest bare acts with amendments and annotations',
    image: '/hero-3.jpg',
    link: '/categories/bare-acts',
    buttonText: 'View All',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative h-[600px] md:h-[600px] bg-gradient-to-r from-primary to-primary-dark overflow-hidden group group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url(${slides[currentSlide].image})`,
            }}
          />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container-custom px-4">
              <div className="max-w-2xl text-white">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl mb-4 font-medium"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl text-white font-serif font-bold mb-6 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl mb-8 text-gray-200"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href={slides[currentSlide].link}
                    className="inline-block bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    {slides[currentSlide].buttonText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Hidden on mobile, visible on group hover for desktop */}
      <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Navigation Arrows - Hidden on mobile, visible on group hover for desktop */}
      <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm text-white p-4 rounded-full transition-all z-10"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm text-white p-4 rounded-full transition-all z-10"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
