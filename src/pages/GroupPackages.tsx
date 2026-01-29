import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Timer, Globe, Plane, Map } from "lucide-react";

// --- UTILITY HELPER ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- DATA ---
const packagesData = [
  {
    id: 7,
    name: 'Chardham Yatra',
    duration: '5D/4N',
    price: '90,000/-',
    imageUrl: '/Chardham_image.jpg',
    highlights: ["VIP Darshans", "Dwarkadhish Temple", "Shri Badrinath Ji Temple", "Raghurajpur Artist Village", "Nageshwar Jyotirling", "Dhanushkodi Beach Point"]
  },
  {
    id: 8,
    name: 'Best of Europe Tour',
    duration: '13D/12N  ',
    price: '1,50,000/-',
    imageUrl: '/Italy_image.jpg',
    highlights: ["Pizza and Pasta in Italy", "Gelato in Italy", "Swiss Chocolate Ice Cream in Switzerland", "Acropolis", "Palace of Versailles", "Vatican City"]
  },
  {
    id: 9,
    name: 'Beauty of Europe Tour',
    duration: '9D/8N',
    price: '1,25,000/-',
    imageUrl: '/Switzerland_image.jpg',
    highlights: ["Waffle in Belgium", "Gala Dinner in Switzerland", "Tower of London", "The British Museum", "Palace of the Parliament", "Windsor Castle"]
  }
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
              className="w-full h-full object-cover transition-transform duration-700"
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
            <button className="w-full bg-[#FFC107] hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
              View Full Itinerary <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const cardListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const GroupPackages = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="bg-[#F8FDFD] min-h-screen relative overflow-x-hidden">
      <ScrollProgress className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00AFAA] to-[#FF7A59] z-[10000]" />

      {/* --- CREATIVE HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-[#00AFAA]/10 to-transparent">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] rounded-full bg-[#FF7A59]/20 blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-[#FFC107]/20 blur-[120px]" 
          />
        </div>

        <motion.div style={{ y: y2 }} className="absolute top-20 left-[10%] text-[#00AFAA]/20 hidden md:block">
          <Globe size={140} />
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-20 right-[15%] text-[#FF7A59]/20 hidden md:block">
          <Map size={120} />
        </motion.div>
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[20%] text-[#FFC107]/40"
        >
          <Plane size={80} />
        </motion.div>

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
             className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/80 backdrop-blur-md border border-[#00AFAA]/10 shadow-sm"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
          >
            <span className="text-[#00AFAA] font-bold tracking-[0.2em] text-[10px] uppercase">Curated Group Experiences</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight">
            Pack Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFAA] via-[#FF7A59] to-[#FFC107]">Bags.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Discover hand-picked packages designed for families, friends, and small groups.
          </p>

          <motion.div 
            className="mt-10 flex gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00AFAA] animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-[#FF7A59] animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-[#FFC107] animate-bounce [animation-delay:0.4s]" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-[#F8FDFD]">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl pt-10 pb-24 px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={cardListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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

export default GroupPackages;