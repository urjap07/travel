import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface PackageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  duration: string;
  price: string;
}

// Animation for the peppy gradient background
const gradientVariants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 8, // Faster animation
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// --- NEW ANIMATION VARIANTS ---

// Variant for the main card (lift and scale)
const cardVariants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -12, 
    scale: 1.03,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

// Variant for the image (zoom and fade)
const imageVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: { 
    scale: 1.1, // Increased zoom
    opacity: 0.7, // Increased fade to show more gradient
    transition: { duration: 0.3 }
  }
};

// --- MODIFIED: Added a fun 'swing' animation ---
const tagVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 3, // Tilts the sign 3 degrees
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 // Adds a springy bounce to the tilt
    }
  }
};

const PackageCard: React.FC<PackageCardProps> = ({ id, imageUrl, title, duration, price }) => {
  return (
    <motion.div 
      className="bg-accent/20 rounded-xl shadow-lg overflow-hidden" 
      // All hover animations are now controlled by these variants
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }} // "Bouncy" click effect
    >
      {/* This relative container holds both the image and the animated gradient */}
      <div className="relative overflow-hidden">
        
        {/* The Animated Gradient (Behind the image) */}
        <motion.div 
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate"
          animate="animate"
          style={{
            background: 'linear-gradient(to right, var(--tw-gradient-stops))',
            '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%',
            '--tw-gradient-from': 'rgba(0, 175, 170, 0.7)', // Vibrant Primary
            '--tw-gradient-via': 'rgba(255, 122, 89, 0.7)', // Vibrant Secondary
            '--tw-gradient-to': 'rgba(244, 197, 66, 0.7)', // Vibrant Accent
            backgroundSize: '200% 200%',
          }}
        />

        {/* The Image (In front of the gradient) */}
        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-56 object-cover relative z-10" // z-10 puts it on top
          variants={imageVariants} // Linked to parent hover
          transition={{ duration: 0.3 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/600x400/eeeeee/aaaaaa?text=Image+Error`;
          }}
        />

        {/* Duration Tag - Hanging Sign Style (Moved to top-right) */}
        <motion.div 
          className="absolute top-0 right-6 z-20" // Container for the sign
          variants={tagVariants} // Apply pop AND swing animation
          style={{ transformOrigin: 'top center' }} // Swings from the "string"
        >
          {/* The "string" it hangs from */}
          <div className="w-px h-3 bg-gray-800 opacity-70 mx-auto" />
          
          {/* The sign itself */}
          <div className="bg-accent text-text font-bold text-sm px-4 py-1 rounded-md shadow-lg">
            {duration}
          </div>
        </motion.div>
      </div>
      
      {/* Ensure content bg matches the card's base color */}
      <div className="p-6 relative z-10 bg-accent/20"> 
        <h3 className="text-2xl font-heading font-bold text-text mb-2 truncate">
          {title}
        </h3>
        
        <p className="text-2xl font-heading font-semibold text-primary mb-4">
          {price}
        </p>
        
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link 
            to={`/package/${id}`} 
            className="font-body font-semibold text-secondary text-lg inline-flex items-center group"
          >
            View Details
            <span 
              className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PackageCard;

