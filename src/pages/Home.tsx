import React, { useState, useContext, useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, type Variants, type Transition } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Ticket as TicketIcon, 
  Globe as GlobeIcon, 
  Sparkles as SparklesIcon,
  CheckCircle,
  Timer,
  X
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
// 1. SCROLL PROGRESS COMPONENT
// ============================================================================

interface ScrollProgressProps {
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

function ScrollProgress({ className, containerRef }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

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

// ============================================================================
// 2. MORPHING DIALOG COMPONENTS
// ============================================================================

type MorphingDialogContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
  transition?: Transition;
};

const MorphingDialogContext = React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error('useMorphingDialog must be used within a MorphingDialogProvider');
  }
  return context;
}

type MorphingDialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingDialog({ children, transition }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <MorphingDialogContext.Provider value={{ isOpen, setIsOpen, uniqueId, triggerRef, transition }}>
      {children}
    </MorphingDialogContext.Provider>
  );
}

type MorphingDialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogTrigger({ children, className, style }: MorphingDialogTriggerProps) {
  const { setIsOpen, uniqueId, triggerRef } = useMorphingDialog();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('cursor-pointer', className)}
      onClick={() => setIsOpen(true)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

type MorphingDialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogContainer({ children, className, style }: MorphingDialogContainerProps) {
  const { isOpen, setIsOpen } = useMorphingDialog();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn('fixed inset-0 z-50 flex items-center justify-center', className)} style={style}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 w-full max-w-lg px-6">
             {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

type MorphingDialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogContent({ children, className, style }: MorphingDialogContentProps) {
  const { uniqueId, transition } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden bg-white', className)}
      style={style}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

function MorphingDialogClose({ className }: { className?: string }) {
  const { setIsOpen } = useMorphingDialog();
  return (
    <button
      className={cn('absolute right-4 top-4 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors', className)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <X className="h-4 w-4" />
    </button>
  );
}

function MorphingDialogImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.img
      layoutId={`dialog-img-${uniqueId}`}
      src={src}
      alt={alt}
      className={cn('', className)}
    />
  );
}

function MorphingDialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.h3 layoutId={`dialog-title-${uniqueId}`} className={className}>
      {children}
    </motion.h3>
  );
}

function MorphingDialogSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.div layoutId={`dialog-subtitle-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

function MorphingDialogDescription({ children, className, disableLayoutAnimation, variants }: { children: React.ReactNode; className?: string; disableLayoutAnimation?: boolean; variants?: Variants }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.div
      {...(!disableLayoutAnimation && { layoutId: `dialog-description-${uniqueId}` })}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 3. FLIP PACKAGE CARD COMPONENT
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
            
            {/* Hanging String Visual */}
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
// 2. SLIDE BUTTON COMPONENT
// ============================================================================

interface SlideButtonProps {
  text: string;
  hoverText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const SlideButton = ({ text, hoverText, href, onClick, className = "" }: SlideButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const textTwo = hoverText || text;

  // Event handlers for both Mouse (Desktop) and Touch (Mobile)
  const handleInteractionStart = () => setIsHovered(true);
  const handleInteractionEnd = () => setIsHovered(false);

  const content = (
    <div
      className={`relative overflow-hidden flex items-center justify-center w-full h-full group ${className} rounded-full`}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
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
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>

        {/* Hover Text: Slides IN */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center w-full h-full"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {textTwo}
        </motion.span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link 
        to={href} 
        className="inline-block" 
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className="inline-block cursor-pointer"
    >
      {content}
    </div>
  );
};

// ============================================================================
// 5. MAIN HOME COMPONENT
// ============================================================================

const sectionVariants: Variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const gradientVariants: Variants = { animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], transition: { duration: 15, ease: 'linear', repeat: Infinity } } };

const Home = () => {
  return (
    <div className="bg-background font-body text-text relative">
      
      {/* --- SCROLL PROGRESS BAR (FIXED TOP) --- */}
      <ScrollProgress className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 z-[10000]" />

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

            {/* --- VIEW PACKAGES: MORPHING DIALOG TRIGGER --- */}
            <MorphingDialog transition={{ type: 'spring', bounce: 0.05, duration: 0.25 }}>
              <MorphingDialogTrigger className="inline-block">
                <SlideButton 
                  text="View Packages" 
                  hoverText="Explore Deals" 
                  className="bg-white text-text font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-gray-100 shadow-lg" 
                />
              </MorphingDialogTrigger>
              
              <MorphingDialogContainer>
                <MorphingDialogContent 
                  style={{ borderRadius: '24px' }} 
                  className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden bg-white border border-zinc-950/10 sm:w-[500px]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                     <MorphingDialogImage
                        src="/Bali_image.jpg"
                        alt="Travel Packages"
                        className="h-full w-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white drop-shadow-md">Top Destinations</h3>
                     </div>
                  </div>

                  <div className="p-6">
                    <MorphingDialogTitle className="text-2xl font-bold text-zinc-950 mb-2">
                      Explore Our Packages
                    </MorphingDialogTitle>
                    <MorphingDialogSubtitle className="text-zinc-500 mb-4">
                      Hand-picked destinations just for you.
                    </MorphingDialogSubtitle>
                    
                    <MorphingDialogDescription
                      disableLayoutAnimation
                      variants={{
                        initial: { opacity: 0, scale: 0.8, y: 20 },
                        animate: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.8, y: 20 },
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                            <p className="font-bold text-zinc-800">Goa</p>
                            <p className="text-xs text-zinc-500">Beaches & Party</p>
                         </div>
                         <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                            <p className="font-bold text-zinc-800">Manali</p>
                            <p className="text-xs text-zinc-500">Snow & Mountains</p>
                         </div>
                         <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                            <p className="font-bold text-zinc-800">Paris</p>
                            <p className="text-xs text-zinc-500">Romance & City</p>
                         </div>
                         <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                            <p className="font-bold text-zinc-800">Bali</p>
                            <p className="text-xs text-zinc-500">Tropical Paradise</p>
                         </div>
                      </div>

                      <Link to="/packages" className="block w-full mt-4 text-center bg-secondary text-white font-bold py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors">
                         See All Packages
                      </Link>
                    </MorphingDialogDescription>
                  </div>
                  <MorphingDialogClose className="text-zinc-500" />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          
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
            {/* Also use Morphing Dialog for this bottom button */}
            <MorphingDialog transition={{ type: 'spring', bounce: 0.05, duration: 0.25 }}>
              <MorphingDialogTrigger className="inline-block">
                 <SlideButton 
                  text="View All Packages" 
                  hoverText="See Full List" 
                  className="bg-primary text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 shadow-lg" 
                />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent style={{ borderRadius: '24px' }} className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden bg-white border border-zinc-950/10 sm:w-[500px]">
                   <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                     <MorphingDialogImage src="/Thailand_image.jpg" alt="All Packages" className="h-full w-full object-cover" />
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><h3 className="text-3xl font-bold text-white drop-shadow-md">All Destinations</h3></div>
                   </div>
                   <div className="p-6">
                    <MorphingDialogTitle className="text-2xl font-bold text-zinc-950 mb-2">Ready to Explore?</MorphingDialogTitle>
                    <MorphingDialogSubtitle className="text-zinc-500 mb-4">We have over 50+ destinations waiting for you.</MorphingDialogSubtitle>
                    <MorphingDialogDescription disableLayoutAnimation className="space-y-4">
                      <p className="text-sm text-gray-600">From the snowy peaks of Manali to the tropical beaches of Bali, we curate the best experiences for every traveler.</p>
                      <Link to="/packages" className="block w-full mt-4 text-center bg-secondary text-white font-bold py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors">Browse Full Catalog</Link>
                    </MorphingDialogDescription>
                   </div>
                   <MorphingDialogClose className="text-zinc-500" />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
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