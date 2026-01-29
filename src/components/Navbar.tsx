import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, display: 'none' },
  visible: { 
    opacity: 1, 
    y: 0, 
    display: 'block', 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.8, ease: "easeIn" }, 
    transitionEnd: { display: 'none' } 
  }
};

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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

    const activeClass = "bg-[#FF7A59] text-white shadow"; 
    const inactiveClass = isMobile
      ? "text-gray-700 hover:bg-gray-100"
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
            className={linkClass("/packages")}
            onClick={() => {
              // Toggle the dropdown instantly for visual feedback
              setIsPackagesDropdownOpen(!isPackagesDropdownOpen);
              
              // Wait 1 second so the orange hover/active color is seen
              setTimeout(() => {
                navigate("/packages");
                setIsPackagesDropdownOpen(false);
              }, 1000); 
            }}
          >
            Packages
          </button>
          
          <AnimatePresence>
            {isPackagesDropdownOpen && (
              <motion.div 
                initial="hidden" animate="visible" exit="exit" variants={dropdownVariants} 
                className="absolute top-full left-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl z-[10000] border border-gray-100 p-2"
              >
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => {
                      // Navigate to sub-packages with same 1s delay logic if preferred
                      setTimeout(() => { navigate("/group-packages"); setIsPackagesDropdownOpen(false); }, 1000);
                    }}
                    className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all text-sm text-left w-full"
                  >
                    Group / Family Packages
                  </button>
                  <button 
                    onClick={() => {
                      setTimeout(() => { navigate("/packages"); setIsPackagesDropdownOpen(false); }, 1000);
                    }}
                    className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all text-sm text-left w-full"
                  >
                    Popular Packages
                  </button>
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
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1A1A1A] p-2 rounded-md hover:bg-gray-100">
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  );
}