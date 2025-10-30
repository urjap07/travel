import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- IMPORTS ---
// FIXED: Using explicit file extensions and paths to resolve build issues
// These must match your local file names exactly.
import { dummyPackages } from '../data/dummyPackages.tsx';
import PackageCard from '../components/PackageCard.tsx';

// --- HELPER ICONS ---
const TicketIcon = () => (
  <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.721 19h8.558M12 5.093A9.48 9.48 0 003.58 10.042m.01 0a15.93 15.93 0 0116.82 0M12 21a9.48 9.48 0 008.42-4.958m-.01 0a15.93 15.93 0 00-16.82 0" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2.293 2.293a1 1 0 010 1.414L11 15m6-6l-2.293 2.293a1 1 0 000 1.414L17 15m-4-8v2m0 4v2m0 4v2M5 3l14 18" />
  </svg>
);

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const gradientVariants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// --- HOME COMPONENT ---
const Home = () => {
  return (
    <div className="bg-background font-body text-text">
      
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white px-6 overflow-hidden">
        {/* Animated Gradient Background - Subtle */}
        <motion.div 
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate" // Start the animation immediately
          animate="animate"
          style={{
            background: 'linear-gradient(to right, var(--tw-gradient-stops))',
            '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
            '--tw-gradient-from': 'rgba(102, 184, 182, 1.0)', // Light Teal/Green (#66B8B6)
            '--tw-gradient-to': 'rgba(255, 173, 161, 1.0)', // Light Coral (#FFADA1)
            backgroundSize: '200% 200%', // Makes the gradient larger than the container to allow animation
          }}
        />

        {/* Hero Content (Animated) */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Travel, Explore, Live!
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Your next adventure is just a click away.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link 
              to="/enquiry" 
              className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#E56F4F] transform hover:scale-105 transition-all duration-300"
            >
              Plan My Trip
            </Link>
            <Link 
              to="/packages" 
              className="bg-white text-text font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
            >
              View Packages
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Why Travel With Us (USPs) (Animated) --- */}
      <motion.section 
        className="py-20 px-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is visible
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">
            Why Travel With Us?
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            We make your travel dreams hassle-free and unforgettable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* USP 1 */}
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03 }} // Card lift on hover
            >
              <div className="flex justify-center mb-4">
                <TicketIcon />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Hassle-Free Booking
              </h3>
              <p className="text-gray-600">
                From flights to hotels, we handle all the details so you don't have to.
              </p>
            </motion.div>
            {/* USP 2 */}
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="flex justify-center mb-4">
                <GlobeIcon />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Local Experiences
              </h3>
              <p className="text-gray-600">
                Discover hidden gems and authentic culture with our curated guides.
              </p>
            </motion.div>
            {/* USP 3 */}
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="flex justify-center mb-4">
                <SparklesIcon />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Custom Trips
              </h3>
              <p className="text-gray-600">
                You dream it, we build it. Fully personalized itineraries just for you.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Popular Packages (Animated) --- */}
      <motion.section 
        className="py-20 px-6 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Popular Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* We map over the first 3 packages from your data file */}
            {dummyPackages.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={sectionVariants} // Use the same slide-up variant
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }} // Stagger animation
              >
                <PackageCard
                  id={pkg.id}
                  title={pkg.name}
                  imageUrl={pkg.imageUrl}
                  duration={pkg.duration}
                  price={pkg.price} // Pass the price string directly
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/packages"
              className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </motion.section>

      {/* --- Enquiry CTA Section --- */}
      <section className="py-20 px-6 bg-accent text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="text-4xl font-heading font-bold text-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready for Your Next Adventure?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's plan the trip of a lifetime. Get in touch with our experts today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/enquiry"
              className="bg-secondary text-white font-bold py-3 px-10 rounded-full text-xl hover:bg-[#E56F4F] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER WILL GO HERE --- */}
    </div>
  );
};

export default Home;
