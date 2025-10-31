import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- DATA IMPORTS ---
// FIXED: Removed .tsx extensions and the failing type import
import { dummyPackages } from '../data/dummyPackages'; 
import { packageDetails } from '../data/PackageDetails'; // Corrected path

// --- NEW: Local Interface Definitions ---
// We define the types here to avoid all import errors.
export interface Package {
  id: number;
  name: string;
  duration: string;
  region: string;
  price: string;
  imageUrl: string;
}

// This is the type for the detailed data
export interface PackageDetailType {
  id: number;
  description: string;
  itinerary: { day: number; title: string; details: string; }[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  testimonials: { name: string; quote: string; }[];
}

// --- HELPER ICONS ---
const CalendarIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- ANIMATION VARIANTS ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  },
};

// --- PACKAGE DETAIL PAGE ---
const PackageDetail = () => {
  // 1. Get the 'id' from the URL
  const { id } = useParams<{ id: string }>();
  
  // 2. State to hold our package data
  const [pkg, setPkg] = useState<Package | null>(null);
  // FIXED: Use the locally defined 'PackageDetailType' here
  const [details, setDetails] = useState<PackageDetailType | null>(null);

  // 3. Find the matching package data when the component loads
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    const packageId = Number(id);
    if (packageId) {
      const foundPkg = dummyPackages.find(p => p.id === packageId);
      const foundDetails = packageDetails.find(d => d.id === packageId);
      
      setPkg(foundPkg || null);
      setDetails(foundDetails || null);
    }
  }, [id]); // Re-run this effect if the ID in the URL changes

  // 4. Loading state
  if (!pkg || !details) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-2xl font-heading text-primary">Loading Package...</div>
      </div>
    );
  }

  // 5. Render the page
  return (
    <motion.div 
      className="bg-background font-body"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Hero Section --- */}
      <section 
        className="h-[50vh] min-h-[300px] bg-cover bg-center flex items-center justify-center text-white text-center px-6 relative"
        style={{ backgroundImage: `url(${pkg.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" /> {/* Dark overlay */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold drop-shadow-lg">{pkg.name}</h1>
          <p className="text-xl md:text-2xl mt-4 flex items-center justify-center drop-shadow-md">
            <CalendarIcon /> {pkg.duration}
          </p>
        </motion.div>
      </section>

      {/* --- Floating Enquire Button --- */}
      <div className="sticky top-[100px] z-30 flex justify-center md:justify-end pr-0 md:pr-12 -mt-8">
        <Link to="/enquiry">
          <motion.button 
            className="text-white bg-secondary font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            Enquire Now
          </motion.button>
        </Link>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="container mx-auto max-w-7xl p-6 lg:p-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- Left Column (Itinerary & Details) --- */}
          <motion.div 
            className="lg:col-span-2"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Description */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-4">About this Trip</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{details.description}</p>
            </motion.div>

            {/* Itinerary */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-6">Your Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {details.itinerary.map((day) => (
                  <motion.div 
                    key={day.day}
                    className="p-6 bg-white rounded-xl shadow-md"
                    variants={sectionVariants} // Staggered children
                  >
                    <h3 className="text-2xl font-heading font-semibold text-primary mb-2">Day {day.day}: {day.title}</h3>
                    <p className="text-gray-600">{day.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Gallery */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {details.gallery.map((image, index) => (
                  <motion.div 
                    key={index}
                    className="overflow-hidden rounded-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-40 object-cover transform hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* --- Right Column (Inclusions, Exclusions, Price) --- */}
          <motion.div 
            className="lg:col-span-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl">
              <p className="text-2xl font-heading text-gray-600">Starting from</p>
              <p className="text-5xl font-heading font-bold text-primary mb-6">{pkg.price}</p>
              
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">Inclusions</h3>
                <ul className="space-y-3">
                  {details.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">Exclusions</h3>
                <ul className="space-y-3">
                  {details.exclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <XIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
};

export default PackageDetail;

