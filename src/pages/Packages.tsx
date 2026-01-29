import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle, Timer, Camera, Sparkles } from "lucide-react";

// --- UTILITY HELPER ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- DATA ---
const packagesData = [
  {
    id: 1,
    name: 'Goa Beach Vibes',
    duration: '4D/3N',
    price: '25,000/-',
    imageUrl: '/Goa_image.jpg',
    highlights: ["3-Star Hotel Stay", "Daily Breakfast", "North Goa Sightseeing", "South Goa Tour", "River Cruise", "Airport Transfers"]
  },
  {
    id: 2,
    name: 'Manali Snow Escape',
    duration: '5D/4N',
    price: '40,000/-',
    imageUrl: '/Manali_image.jpg',
    highlights: ["Resort Stay", "Breakfast & Dinner", "Solang Valley", "Hadimba Temple", "Naggar Castle", "Volvo Transfers"]
  },
  {
    id: 3,
    name: 'Paris + Swiss Bliss',
    duration: '7D/6N',
    price: '90,000/-',
    imageUrl: '/Paris_Switzerland_image.jpg',
    highlights: ["Eiffel Tower Entry", "Seine Cruise", "Jungfraujoch", "Mt. Titlis", "Swiss Pass", "Central Hotels"]
  },
  {
    id: 4,
    name: 'Bali Tropical Holiday',
    duration: '6D/5N',
    price: '35,000/-',
    imageUrl: '/Bali_image.jpg',
    highlights: ["Kuta & Ubud Stay", "Kintamani Tour", "Nusa Penida Boat", "Uluwatu Sunset", "Tanah Lot", "Balinese Massage"]
  },
  {
    id: 5,
    name: 'Dubai Luxury Getaway',
    duration: '5D/4N',
    price: '65,000/-',
    imageUrl: '/Dubai_image.jpg',
    highlights: ["Burj Khalifa Top", "Desert Safari BBQ", "Dhow Cruise", "Abu Dhabi Tour", "Grand Mosque", "Luxury Transfers"]
  },
  {
    id: 6,
    name: 'Thailand Budget Fun',
    duration: '5D/4N',
    price: '30,000/-',
    imageUrl: '/Thailand_image.jpg',
    highlights: ["Bangkok & Pattaya", "Coral Island", "Safari World", "Temple Tour", "Alcazar Show", "All Transfers"]
  },
];

// --- SCROLL PROGRESS COMPONENT ---
function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn("origin-left", className)}
      style={{ scaleX }}
    />
  );
}

// --- COMPONENT: FLIP PACKAGE CARD ---
interface FlipCardProps {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: string;
  highlights: string[];
}

const FlipPackageCard = ({ id, title, image, duration, price, highlights }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[420px] [perspective:2000px] cursor-pointer" 
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-lg bg-[#FFF6E0] flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-[60%] w-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-9 w-0.5 h-4 bg-black z-10"></div>
            <div className="absolute top-4 right-4 bg-[#FFC107] text-black font-bold px-3 py-1 rounded text-sm shadow-sm flex items-center gap-1 z-20">
               <Timer className="w-3 h-3" /> {duration}
            </div>
          </div>

          <div className="h-[40%] p-5 flex flex-col justify-between items-start text-left">
            <h3 className="text-xl font-bold text-gray-900 w-full">{title}</h3>
            <div className="w-full">
               <p className="text-2xl font-bold text-[#00AFAA] mb-2">{price}</p>
               <div className="text-[#FF7A59] font-medium text-sm flex items-center gap-1">
                 View Details <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-xl bg-teal-600 text-white p-6 flex flex-col"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 border-b border-orange-500 pb-2">{title}</h3>
            <p className="text-orange-200 text-xs uppercase tracking-wider font-semibold mb-4">Highlights</p>
            <ul className="space-y-2">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-100">
                  <CheckCircle className="w-4 h-4 text-[#FFC107] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to={`/package/${id}`} className="block w-full mt-2" onClick={(e) => e.stopPropagation()}>
            <button className="w-full bg-[#FFC107] hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2">
              View Full Itinerary <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const gradientVariants: Variants = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], transition: { duration: 8, ease: "linear", repeat: Infinity } },
};

const Packages = () => {
  return (
    <div className="bg-background min-h-screen relative">
      <ScrollProgress className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 z-[10000]" />

      <section className="relative pt-24 pb-12 px-6 text-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate"
          animate="animate"
          style={{
            background: "linear-gradient(to right, var(--tw-gradient-stops))",
            ["--tw-gradient-stops" as any]: "rgba(0, 175, 170, 0.9) 0%, rgba(255, 122, 89, 0.9) 50%, rgba(244, 197, 66, 0.9) 100%",
            backgroundSize: "200% 200%",
          }}
        />
        
        <div className="relative z-10">
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Explore Our Packages
          </motion.h1>
          <motion.p className="text-xl md:text-2xl mb-8 drop-shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Your next adventure starts here.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl pt-20 pb-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packagesData.map((pkg) => (
            <FlipPackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.name}
              image={pkg.imageUrl}
              duration={pkg.duration}
              price={pkg.price}
              highlights={pkg.highlights}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;