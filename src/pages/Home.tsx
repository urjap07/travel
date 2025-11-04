import React from 'react';
import { motion, type Variants } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import { dummyPackages } from '../data/dummyPackages';

// --- ICONS ---
const TicketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 sm:w-12 sm:h-12 text-secondary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 sm:w-12 sm:h-12 text-secondary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 sm:w-12 sm:h-12 text-secondary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" />
    <line x1="10" x2="14" y1="8" y2="8" />
    <line x1="18" x2="22" y1="16" y2="16" />
  </svg>
);

// --- ANIMATION VARIANTS ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as any },
  },
};

const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 15, ease: 'linear' as any, repeat: Infinity },
  },
};

// --- HOME COMPONENT ---
const Home = () => {
  return (
    <div className="bg-background font-body text-text">

      {/* HERO SECTION */}
      <section className="relative h-[55vh] sm:h-[60vh] min-h-[380px] sm:min-h-[420px] flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate"
          animate="animate"
          style={{
            background: 'linear-gradient(to right, var(--tw-gradient-stops))',
            '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
            '--tw-gradient-from': 'rgba(102, 184, 182, 1.0)',
            '--tw-gradient-to': 'rgba(255, 173, 161, 1.0)',
            backgroundSize: '200% 200%',
          } as React.CSSProperties}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as any }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-3 sm:mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as any }}
          >
            Travel, Explore, Live!
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 drop-shadow-md px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' as any }}
          >
            Your next adventure is just a click away.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as any }}
          >
            <a
              href="/enquiry"
              className="bg-secondary text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-[#E56F4F] transform hover:scale-105 transition-all duration-300"
            >
              Plan My Trip
            </a>
            <a
              href="/packages"
              className="bg-white text-text font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
            >
              View Packages
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY TRAVEL WITH US */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-3 sm:mb-4">
            Why Travel With Us?
          </h2>
          <p className="text-base sm:text-lg text-center text-gray-600 mb-10 sm:mb-12 px-2 sm:px-0">
            We make your travel dreams hassle-free and unforgettable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* USP 1 */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0px 15px 30px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <motion.div
                className="flex justify-center mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <TicketIcon />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">
                Hassle-Free Booking
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                From flights to hotels, we handle all the details so you don't have to.
              </p>
            </motion.div>

            {/* USP 2 */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0px 15px 30px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <motion.div
                className="flex justify-center mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <GlobeIcon />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">
                Local Experiences
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Discover hidden gems and authentic culture with our curated guides.
              </p>
            </motion.div>

            {/* USP 3 */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0px 15px 30px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <motion.div
                className="flex justify-center mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <SparklesIcon />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">
                Custom Trips
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                You dream it, we build it. Fully personalized itineraries just for you.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* POPULAR PACKAGES */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-12">
            Popular Packages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {dummyPackages.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <PackageCard
                  id={pkg.id}
                  title={pkg.name}
                  imageUrl={pkg.imageUrl}
                  duration={pkg.duration}
                  price={pkg.price}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <a
              href="/packages"
              className="bg-primary text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
            >
              View All Packages
            </a>
          </div>
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-accent text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl font-heading font-bold text-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready for Your Next Adventure?
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 sm:mb-8 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as any }}
            viewport={{ once: true }}
          >
            Let's plan the trip of a lifetime. Get in touch with our experts today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
          >
            <a
              href="/enquiry"
              className="bg-secondary text-white font-bold py-3 px-8 sm:px-10 rounded-full text-lg sm:text-xl hover:bg-[#E56F4F] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Enquire Now
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
