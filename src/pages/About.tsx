import React from 'react';
import { motion, type Variants } from 'framer-motion';

// --- Inline SVG Icons ---
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "w-10 h-10 text-white"} 
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "w-10 h-10 text-white"}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "w-10 h-10 text-white"}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "w-12 h-12 text-primary mx-auto mb-4"}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);


// --- Icon Wrapper Component (for Mission/Vision) ---
// REMOVED: This component is no longer needed as icons are placed directly.

// --- Animation Variants ---
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.5, ease: "easeOut" }
  }
};

// MODIFIED: Made gradient animation faster and more dynamic
const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15, // Slightly longer for a smoother flow
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const floatVariants: Variants = {
    animate: {
        y: ["-10%", "10%"],
        x: ["-5%", "5%"],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        },
    },
};

// NEW: Variants for individual text elements in the hero
const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.7,
    },
  },
};

// NEW: Variants for the background blobs in the hero
const blobVariants: Variants = {
  animate: {
    y: ["0%", "10%", "0%"],
    x: ["0%", "5%", "0%"],
    rotate: [0, 360],
    scale: [1, 1.1, 1],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// --- About Us Page Component ---
const About = () => {
  return (
    <motion.div
      className="bg-background font-body"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* --- Hero Section --- */}
      <motion.section 
        className="h-[50vh] min-h-[300px] flex items-center justify-center text-white text-center px-6 relative overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <motion.div
            className="absolute inset-0 z-0"
            variants={gradientVariants}
            initial="animate"
            animate="animate"
            style={{
                background: 'linear-gradient(to right, var(--tw-gradient-stops))',
                '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
                '--tw-gradient-from': 'rgba(79, 70, 229, 1)', // primary
                '--tw-gradient-to': 'rgba(255, 122, 89, 1)', // secondary
                backgroundSize: '200% 200%',
            } as React.CSSProperties}
        />
        
        {/* NEW: Floating Background Blobs */}
        <motion.div
            className="absolute top-10 left-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"
            variants={blobVariants}
            animate="animate"
            style={{ animationDelay: '0s' }}
        />
        <motion.div
            className="absolute bottom-10 right-10 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl"
            variants={blobVariants}
            animate="animate"
            style={{ animationDelay: '5s' }}
        />
        <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary opacity-10 rounded-full blur-3xl"
            variants={blobVariants}
            animate="animate"
            style={{ animationDelay: '10s' }}
        />

        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }} // Stagger children for text reveal
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold drop-shadow-lg"
            variants={heroTextVariants} 
          >
            About The Travel Group
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mt-4 drop-shadow-md"
            variants={heroTextVariants} // Apply new text variants
          >
            Crafting your perfect journey, one adventure at a time.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* --- Our Story Section --- */}
      <motion.section 
        className="py-20 px-6 relative overflow-hidden" 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Floating Background Elements */}
        <motion.div 
            // MODIFIED: Increased opacity and reduced blur
            className="absolute -top-10 -left-10 w-40 h-40 bg-secondary opacity-30 rounded-full blur-xl"
            variants={floatVariants}
            initial="animate"
            animate="animate"
        />
        <motion.div 
            // MODIFIED: Increased opacity and reduced blur
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary opacity-30 rounded-full blur-xl delay-1000"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            style={{ animationDelay: '1s' }} 
        />

        <div className="container mx-auto max-w-4xl text-center relative z-10"> 
          {/* MODIFIED: Changed gradient colors */}
          <motion.h2 
            className="text-4xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent"
            style={{ backgroundSize: '200% 200%' }}
            variants={itemVariants}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed mb-6"
            variants={itemVariants}
          >
            Founded in 2020 by a team of passionate explorers, The Travel Group was born from a simple idea: travel should be extraordinary, accessible, and completely hassle-free. We were tired of cookie-cutter tours and impersonal service. We believed we could do better.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            variants={itemVariants}
          >
            Today, we are a leading name in bespoke travel, known for our attention to detail, local expertise, and unwavering commitment to our clients. We don't just plan trips; we co-create unforgettable experiences that last a lifetime.
          </motion.p>
        </div>
      </motion.section>

      {/* --- Mission & Vision Section --- */}
      <motion.section 
        // ADDED: Visible background color
        className="py-20 px-6 bg-blue-50 relative overflow-hidden" 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* NEW: Floating Background Elements for this section */}
        <motion.div 
            className="absolute top-10 right-10 w-32 h-32 bg-primary opacity-20 rounded-full blur-xl"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            style={{ animationDelay: '0.2s' }} 
        />
        <motion.div 
            className="absolute bottom-5 left-5 w-24 h-24 bg-secondary opacity-20 rounded-full blur-xl"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            style={{ animationDelay: '1.5s' }} 
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"> 
            
            {/* Our Mission */}
            <motion.div 
              className="p-8 rounded-2xl text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300 bg-white" 
              variants={itemVariants}
              // NEW: Added hover lift
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* NEW: Added floating animation */}
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="flex justify-center mb-4"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary shadow-lg">
                  <TargetIcon className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              {/* MODIFIED: Added animated gradient text */}
              <h3 
                className="text-3xl font-heading font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-orange-400"
                style={{ backgroundSize: '200% 200%' }}
              >
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To inspire and empower people to experience the world. We do this by providing perfectly planned, authentic, and personalized travel that connects our clients with the cultures and places they visit.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div 
              className="p-8 rounded-2xl text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300 bg-white" 
              variants={itemVariants}
              // NEW: Added hover lift
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* NEW: Added floating animation */}
              <motion.div
                variants={floatVariants}
                animate="animate"
                style={{ animationDelay: '0.5s' }} // Stagger float
                className="flex justify-center mb-4"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary shadow-lg">
                  <EyeIcon className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              {/* MODIFIED: Added animated gradient text */}
              <h3 
                className="text-3xl font-heading font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400"
                style={{ backgroundSize: '200% 200%' }}
              >
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the most trusted and innovative travel company in the world, renowned for our exceptional service, local insight, and commitment to sustainable and responsible tourism.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* --- Why Choose Us Section --- */}
      <motion.section 
        className="py-20 px-6 bg-accent text-center" 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* MODIFIED: Re-added a colorful gradient for visibility */}
          <motion.h2 
            className="text-4xl font-heading font-bold text-text mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            style={{ backgroundSize: '200% 200%' }}
            variants={itemVariants}
          >
            Why Travel With Us?
          </motion.h2> 
          <motion.p 
            className="text-xl text-gray-800 mb-10"
            variants={itemVariants}
          >
            Your perfect trip is our personal mission.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"> 
              {/* NEW: Added hover animation to icon */}
              <motion.div whileHover={{ scale: 1.2, rotate: 10, transition: { type: 'spring', stiffness: 300 } }}>
                <GlobeIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              </motion.div>
              <h4 className="text-xl font-heading font-semibold text-text mb-2">Local Expertise</h4>
              <p className="text-gray-600">Our team has lived, worked, and traveled extensively in every destination we offer.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"> 
              {/* NEW: Added hover animation to icon */}
              <motion.div whileHover={{ scale: 1.2, rotate: 10, transition: { type: 'spring', stiffness: 300 } }}>
                <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              </motion.div>
              <h4 className="text-xl font-heading font-semibold text-text mb-2">Personalized Service</h4>
              <p className="text-gray-600">From the first call to your return, you have a dedicated specialist for 24/7 support.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"> 
              {/* NEW: Added hover animation to icon */}
              <motion.div whileHover={{ scale: 1.2, rotate: 10, transition: { type: 'spring', stiffness: 300 } }}>
                <TargetIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              </motion.div>
              <h4 className="text-xl font-heading font-semibold text-text mb-2">Bespoke Itineraries</h4>
              <p className="text-gray-600">No two trips are the same. We build your journey around your unique interests and style.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default About;

