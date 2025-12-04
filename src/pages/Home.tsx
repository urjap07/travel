import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Ticket as TicketIcon, 
  Globe as GlobeIcon, 
  Sparkles as SparklesIcon,
  CheckCircle,
  Timer
} from 'lucide-react';

// ============================================================================
// 0. UTILITY HELPER & DATA
// ============================================================================
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const homePackagesData = [
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
  }
];

// ============================================================================
// 1. FLIP PACKAGE CARD COMPONENT
// ============================================================================

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
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT FACE */}
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
          <div className="relative h-[60%] w-full">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            {/* Hanging String */}
            <div className="absolute top-0 right-9 w-0.5 h-4 bg-black z-10"></div>

            {/* Duration Badge */}
            <div className="absolute top-4 right-4 bg-[#FFC107] text-black font-bold px-3 py-1 rounded text-sm shadow-sm flex items-center gap-1 z-10">
               <Timer className="w-3 h-3" /> {duration}
            </div>
          </div>
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

        {/* BACK FACE */}
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
            <p className="text-orange-200 text-xs uppercase tracking-wider font-semibold mb-4">Highlights</p>
            <ul className="space-y-2">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-100" style={{ transitionDelay: `${index * 50}ms` }}>
                  <CheckCircle className="w-4 h-4 text-[#FFC107] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
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

// ============================================================================
// 2. SLIDE BUTTON COMPONENT (UPDATED FOR INSTANT MOBILE TOUCH)
// ============================================================================

interface SlideButtonProps {
  text: string;
  hoverText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const SlideButton = ({ text, hoverText, href, onClick, className = "" }: SlideButtonProps) => {
  const textTwo = hoverText || text;

  const content = (
    <motion.div
      className={`relative overflow-hidden flex items-center justify-center w-full h-full group ${className} rounded-full`}
      initial="initial"
      whileHover="hover"
      whileTap="hover" // Ensures the effect triggers on touch
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* 1. INVISIBLE SPACER: Keeps button dimensions correct */}
      <span className="invisible whitespace-nowrap font-bold px-4">
        {text.length > textTwo.length ? text : textTwo}
      </span>

      {/* 2. ANIMATED TEXT */}
      <span className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Initial Text: Slides OUT */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center w-full h-full"
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>

        {/* Hover Text: Slides IN */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center w-full h-full"
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {textTwo}
        </motion.span>
      </span>
    </motion.div>
  );

  // If href is provided, wrap in Link, otherwise just a div/button
  if (href) {
    return (
      <Link to={href} className="inline-block" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {content}
    </div>
  );
};

// ============================================================================
// 3. MAIN HOME COMPONENT
// ============================================================================

const sectionVariants: Variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const gradientVariants: Variants = { animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], transition: { duration: 15, ease: 'linear', repeat: Infinity } } };

const Home = () => {
  return (
    <div className="bg-background font-body text-text">

      {/* HERO SECTION */}
      <section className="relative h-[55vh] sm:h-[60vh] min-h-[380px] sm:min-h-[420px] flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" variants={gradientVariants} initial="animate" animate="animate" style={{ background: 'linear-gradient(to right, var(--tw-gradient-stops))', '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%', '--tw-gradient-from': 'rgba(102, 184, 182, 1.0)', '--tw-gradient-to': 'rgba(255, 173, 161, 1.0)', backgroundSize: '200% 200%' } as React.CSSProperties} />
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-3 sm:mb-4 drop-shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>Travel, Explore, Live!</motion.h1>
          <motion.p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 drop-shadow-md px-2 sm:px-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>Your next adventure is just a click away.</motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            
            {/* --- PLAN MY TRIP: DIRECT LINK --- */}
            <SlideButton 
              text="Plan My Trip" 
              hoverText="Start Journey" 
              href="/enquiry" 
              className="bg-secondary text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-[#E56F4F] shadow-lg" 
            />

            {/* --- VIEW PACKAGES: DIRECT LINK --- */}
            <SlideButton 
              text="View Packages" 
              hoverText="Explore Deals" 
              href="/packages" 
              className="bg-white text-text font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-gray-100 shadow-lg" 
            />
          
          </motion.div>
        </motion.div>
      </section>

      {/* WHY TRAVEL WITH US */}
      <motion.section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-3 sm:mb-4">Why Travel With Us?</h2>
          <p className="text-base sm:text-lg text-center text-gray-600 mb-10 sm:mb-12 px-2 sm:px-0">We make your travel dreams hassle-free and unforgettable.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg" whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="flex justify-center mb-4"><TicketIcon className="w-10 h-10 text-secondary" /></div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">Hassle-Free Booking</h3>
              <p className="text-gray-600 text-sm sm:text-base">From flights to hotels, we handle all the details so you don't have to.</p>
            </motion.div>
            <motion.div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg" whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="flex justify-center mb-4"><GlobeIcon className="w-10 h-10 text-secondary" /></div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">Local Experiences</h3>
              <p className="text-gray-600 text-sm sm:text-base">Discover hidden gems and authentic culture with our curated guides.</p>
            </motion.div>
            <motion.div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg" whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="flex justify-center mb-4"><SparklesIcon className="w-10 h-10 text-secondary" /></div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">Custom Trips</h3>
              <p className="text-gray-600 text-sm sm:text-base">You dream it, we build it. Fully personalized itineraries just for you.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* POPULAR PACKAGES */}
      <motion.section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-12">Popular Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {homePackagesData.map((pkg, index) => (
              <motion.div 
                key={pkg.id} 
                variants={sectionVariants} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.5 }} 
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
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
          </div>
          <div className="flex justify-center mt-10 sm:mt-12">
            <SlideButton 
              text="View All Packages" 
              hoverText="See Full List" 
              href="/packages" 
              className="bg-primary text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 shadow-lg" 
            />
          </div>
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-accent text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 className="text-3xl sm:text-4xl font-heading font-bold text-text mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>Ready for Your Next Adventure?</motion.h2>
          <motion.p className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 sm:mb-8 px-2 sm:px-0" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} viewport={{ once: true }}>Let's plan the trip of a lifetime. Get in touch with our experts today!</motion.p>
          
          <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 100 }} viewport={{ once: true }}>
            
            {/* --- ENQUIRE NOW: DIRECT LINK --- */}
            <SlideButton 
              text="Enquire Now" 
              hoverText="Let's Chat" 
              href="/enquiry" 
              className="bg-secondary text-white font-bold py-3 px-8 sm:px-10 rounded-full text-lg sm:text-xl hover:bg-[#E56F4F] shadow-lg" 
            />

          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;