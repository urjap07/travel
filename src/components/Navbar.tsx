import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- Icons ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

// --- Animation variants ---
const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, display: 'none' },
  visible: { 
    opacity: 1, 
    y: 0, 
    display: 'block', 
    transition: { duration: 0.2, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.2, ease: "easeIn" }, 
    transitionEnd: { display: 'none' } 
  }
};

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPackagesDropdownOpen, setIsPackagesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPackagesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (path: string, isMobile: boolean = false) => {
    const baseClass = isMobile 
      ? "block w-full text-left px-4 py-3 text-lg rounded-xl" 
      : "py-2 px-4 rounded-xl transition font-medium transform"; 

    const isPackagesActive = path === "/packages" && (pathname === "/packages" || pathname === "/group-packages");
    const isActive = pathname === path || isPackagesActive;

    const activeClass = isMobile
      ? "bg-secondary text-white"
      : "bg-[#FF7A59] text-white shadow"; 

    const inactiveClass = isMobile
      ? "text-gray-700 hover:bg-accent/50"
      : "text-[#1A1A1A] border border-transparent hover:text-white hover:shadow-md hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA]";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="bg-gradient-to-r from-[#F8FDFD] via-[#E0F7FA] to-[#B2EBF2] shadow-md px-4 sm:px-12 py-3 flex items-center justify-between sticky top-0 z-[9999]">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/TheTravelGroup_Logo.jpg" alt="The Travel Group Logo" className="h-16 w-auto" />
        </Link>
      </div>

      {/* --- Desktop Menu --- */}
      <div className="hidden md:flex space-x-2 items-center">
        <Link to="/" className={linkClass("/")}>Home</Link>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            type="button"
            onClick={() => setIsPackagesDropdownOpen(!isPackagesDropdownOpen)}
            className={linkClass("/packages")}
          >
            Packages
          </button>
          
          <AnimatePresence>
            {isPackagesDropdownOpen && (
              <motion.div 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={dropdownVariants} 
                // REMOVED: overflow-hidden to ensure hover backgrounds are fully visible
                className="absolute top-full left-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl z-[10000] border border-gray-100 p-2"
              >
                <div className="flex flex-col gap-1.5">
                  <Link 
                    to="/group-packages" 
                    // STYLED: Explicit orange hover that stands out against the white background
                    className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all shadow-sm text-sm text-left"
                    onClick={() => setIsPackagesDropdownOpen(false)}
                  >
                    Group / Family Packages
                  </Link>
                  <Link 
                    to="/packages" 
                    // STYLED: Explicit orange hover
                    className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all shadow-sm text-sm text-left"
                    onClick={() => setIsPackagesDropdownOpen(false)}
                  >
                    Popular Packages
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/gallery" className={linkClass("/gallery")}>Gallery</Link>
        <Link to="/enquiry" className={linkClass("/enquiry")}>Enquiry</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
      </div>

      {/* --- Mobile Menu Button --- */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1A1A1A] p-2 rounded-md hover:bg-gray-100" aria-label="Toggle menu">
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-[9999]" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden">
            <div className="flex flex-col py-2 px-4">
              <Link to="/" className={linkClass("/", true)} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              
              <div className="mt-4 mb-1">
                <span className="text-xl font-bold text-[#1A1A1A] px-4">Packages</span>
              </div>

              <div className="bg-gray-50 border-y border-gray-100 py-3 my-2 rounded-xl">
                  <span className="block px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Explore Packages</span>
                  <Link to="/group-packages" className="block px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59]" onClick={() => setIsMobileMenuOpen(false)}>
                    Group / Family Packages
                  </Link>
                  <Link to="/packages" className="block px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59]" onClick={() => setIsMobileMenuOpen(false)}>
                    Popular Packages
                  </Link>
              </div>

              <Link to="/gallery" className={linkClass("/gallery", true)} onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/enquiry" className={linkClass("/enquiry", true)} onClick={() => setIsMobileMenuOpen(false)}>Enquiry</Link>
              <Link to="/about" className={linkClass("/about", true)} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}