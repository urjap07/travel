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
  visible: { opacity: 1, y: 0, display: 'block', transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" }, transitionEnd: { display: 'none' } }
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
    const baseClass = isMobile ? "block w-full text-left px-4 py-3 text-lg" : "py-2 px-4 rounded-xl transition font-medium transform"; 
    const activeClass = isMobile ? "bg-secondary text-white" : "bg-[#FF7A59] text-white shadow"; 
    const inactiveClass = isMobile ? "text-gray-700 hover:bg-accent/50" : "text-[#1A1A1A] border border-transparent hover:text-white hover:shadow-md hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA]";

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="bg-gradient-to-r from-[#F8FDFD] via-[#E0F7FA] to-[#B2EBF2] shadow-md px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
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
            onClick={() => setIsPackagesDropdownOpen(!isPackagesDropdownOpen)}
            className={`${linkClass("/packages").replace("bg-[#FF7A59] text-white shadow", "")} flex items-center gap-1 focus:outline-none`}
          >
            Packages
          </button>
          <AnimatePresence>
            {isPackagesDropdownOpen && (
              <motion.div initial="hidden" animate="visible" exit="exit" variants={dropdownVariants} className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100 p-2">
                <div className="flex flex-col gap-2">
                  <Link to="/group-packages" className="block px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA] hover:text-white transition-all text-left font-medium text-gray-800 shadow-sm" onClick={() => setIsPackagesDropdownOpen(false)}>
                    Group / Family Packages
                  </Link>
                  <Link to="/packages" className="block px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA] hover:text-white transition-all text-left font-medium text-gray-800 shadow-sm" onClick={() => setIsPackagesDropdownOpen(false)}>
                    Popular Packages
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- NEW: Gallery Link --- */}
        <Link to="/gallery" className={linkClass("/gallery")}>Gallery</Link>
        
        <Link to="/enquiry" className={linkClass("/enquiry")}>Enquiry</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
      </div>

      {/* --- Mobile Menu Button --- */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text p-2 rounded-md hover:bg-accent" aria-label="Toggle menu">
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden">
            <div className="flex flex-col py-2">
              <Link to="/" className={linkClass("/", true)} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              
              <div className="border-l-4 border-accent ml-4 pl-0 mt-2 mb-2">
                  <span className="block px-4 py-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Packages</span>
                  <Link to="/group-packages" className="block px-4 py-3 mx-2 rounded-lg bg-gray-50 text-gray-800 font-medium hover:bg-accent/30 transition-colors mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Group / Family Packages
                  </Link>
                  <Link to="/packages" className="block px-4 py-3 mx-2 rounded-lg bg-gray-50 text-gray-800 font-medium hover:bg-accent/30 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Popular Packages
                  </Link>
              </div>

              {/* --- NEW: Mobile Gallery Link --- */}
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