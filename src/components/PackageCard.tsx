import { Link } from 'react-router-dom';
// IMPORT Variants and Transition types
import { motion } from 'framer-motion'; // FIXED: Removed Variants and Transition

export interface PackageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  duration: string;
  price: string;
}

// TYPED the variants
const gradientVariants = { // FIXED: Removed :Variants type
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
      // repeatType: "loop", // 'repeat: Infinity' implies "loop"
    },
  },
};

const cardVariants = { // FIXED: Removed :Variants type
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -12, 
    scale: 1.03,
    // TYPED the transition
    transition: { type: "spring", stiffness: 300, damping: 20 } // FIXED: Removed 'as Transition'
  }
};

const imageVariants = { // FIXED: Removed :Variants type
  initial: { scale: 1, opacity: 1 },
  hover: { 
    scale: 1.1,
    opacity: 0.7,
    transition: { duration: 0.3 }
  }
};

const tagVariants = { // FIXED: Removed :Variants type
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 3,
    // TYPED the transition
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } // FIXED: Removed 'as Transition'
  }
};

const PackageCard: React.FC<PackageCardProps> = ({ id, imageUrl, title, duration, price }) => {
  return (
    <motion.div 
      className="bg-accent/20 rounded-xl shadow-lg overflow-hidden" 
      variants={cardVariants as any} // FIXED: Cast to as any
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden">
        
        <motion.div 
          className="absolute inset-0 z-0"
          variants={gradientVariants as any} // FIXED: Cast to as any
          initial="animate"
          animate="animate"
          // FIXED: Cast style to 'any' to allow CSS custom properties
          style={{
            background: 'linear-gradient(to right, var(--tw-gradient-stops))',
            '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%',
            '--tw-gradient-from': 'rgba(0, 175, 170, 0.7)',
            '--tw-gradient-via': 'rgba(255, 122, 89, 0.7)',
            '--tw-gradient-to': 'rgba(244, 197, 66, 0.7)',
            backgroundSize: '200% 200%',
          } as any}
        />

        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-56 object-cover relative z-10"
          variants={imageVariants as any} // FIXED: Cast to as any
          transition={{ duration: 0.3 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/600x400/eeeeee/aaaaaa?text=Image+Error`;
          }}
        />

        <motion.div 
          className="absolute top-0 right-6 z-20"
          variants={tagVariants as any} // FIXED: Cast to as any
          style={{ transformOrigin: 'top center' }}
        >
          <div className="w-px h-3 bg-gray-800 opacity-70 mx-auto" />
          <div className="bg-accent text-text font-bold text-sm px-4 py-1 rounded-md shadow-lg">
            {duration}
          </div>
        </motion.div>
      </div>
      
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

