import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Timer } from "lucide-react";

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
      className="relative w-full h-[420px] group [perspective:2000px]" 
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative w-full h-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* --- FRONT FACE --- */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "rounded-xl overflow-hidden shadow-lg",
            "bg-[#FFF6E0]", 
            "flex flex-col",
            "transition-all duration-700",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          {/* Image Area */}
          <div className="relative h-[60%] w-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Hanging String Visual */}
            <div className="absolute top-0 right-9 w-0.5 h-4 bg-black z-10"></div>

            {/* Duration Badge */}
            <div className="absolute top-4 right-4 bg-[#FFC107] text-black font-bold px-3 py-1 rounded text-sm shadow-sm flex items-center gap-1 z-20">
               <Timer className="w-3 h-3" /> {duration}
            </div>
          </div>

          {/* Content Area */}
          <div className="h-[40%] p-5 flex flex-col justify-between items-start text-left">
            <h3 className="text-xl font-bold text-gray-900 w-full">{title}</h3>
            
            <div className="w-full">
               <p className="text-2xl font-bold text-[#00AFAA] mb-2">{price}</p>
               
               <div className="text-[#FF7A59] font-medium text-sm flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer">
                 View Details <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-xl overflow-hidden shadow-xl",
            "bg-teal-600 text-white p-6", 
            "flex flex-col",
            "transition-all duration-700",
            !isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 border-b border-orange-500 pb-2">{title}</h3>
            
            <p className="text-orange-200 text-xs uppercase tracking-wider font-semibold mb-4">
              Highlights
            </p>

            <ul className="space-y-2">
              {highlights.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-gray-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="w-4 h-4 text-[#FFC107] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <Link to={`/package/${id}`} className="block w-full mt-2">
            <button className="w-full bg-[#FFC107] hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
              View Full Itinerary <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- HELPER ICON ---
const SparkleIcon: FC = () => (
  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 2.15zM10 6.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 6.15zM10 10.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 10.15zM5.31 4.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM14.69 4.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM5.31 12.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM14.69 12.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18z" clipRule="evenodd" />
  </svg>
);

// --- ANIMATION VARIANTS ---
const cardListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const waveVariants: any = {
  animate: { y: ["0px", "-10px", "0px"], transition: { duration: 5, ease: "easeInOut", repeat: Infinity } },
};

const sparkleVariants: any = {
  animate: { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity } },
};

const gradientVariants: Variants = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], transition: { duration: 8, ease: "linear", repeat: Infinity } },
};

const Packages = () => {
  return (
    <div className="bg-background min-h-screen relative">
      {/* SCROLL PROGRESS BAR */}
      <ScrollProgress className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 z-[10000]" />

      <section className="relative pt-24 pb-12 px-6 text-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate"
          animate="animate"
          style={{
            background: "linear-gradient(to right, var(--tw-gradient-stops))",
            ["--tw-gradient-stops" as any]:
              "var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%",
            ["--tw-gradient-from" as any]: "rgba(0, 175, 170, 0.9)",
            ["--tw-gradient-via" as any]: "rgba(255, 122, 89, 0.9)",
            ["--tw-gradient-to" as any]: "rgba(244, 197, 66, 0.9)",
            backgroundSize: "200% 200%",
          }}
        />
        
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
            Explore Our Packages
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Your next adventure starts here.
          </motion.p>
          <motion.div className="absolute top-1/4 left-1/4 w-10 h-10" variants={sparkleVariants} animate="animate" style={{ transitionDelay: "0.2s" }}><SparkleIcon /></motion.div>
          <motion.div className="absolute top-1/2 right-1/4 w-8 h-8" variants={sparkleVariants} animate="animate" style={{ transitionDelay: "0.5s" }}><SparkleIcon /></motion.div>
          <motion.div className="absolute bottom-1/4 left-1/3 w-9 h-9" variants={sparkleVariants} animate="animate" style={{ transitionDelay: "0.8s" }}><SparkleIcon /></motion.div>
        </motion.div>

        <motion.div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0, transform: "rotate(180deg)" }} variants={waveVariants} animate="animate">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] transform rotate-180">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F8FDFD]"></path>
          </svg>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-7xl pt-20 pb-20 px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={cardListVariants}
          initial="hidden"
          animate="visible"
        >
          {packagesData.map((pkg) => (
            <motion.div key={pkg.id} variants={cardItemVariants}>
              <FlipPackageCard
                id={pkg.id}
                title={pkg.name}
                image={pkg.imageUrl}
                duration={pkg.duration}
                price={pkg.price}
                highlights={pkg.highlights}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;