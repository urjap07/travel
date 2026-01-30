import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from 'framer-motion';

// --- Animation variants ---
const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPackagesDropdownOpen, setIsPackagesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Handle scroll logic for logo and background
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  // Handle click outside to close dropdown
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
    <nav className={`fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-12 py-3 flex items-center justify-between transition-all duration-500 ${
      isScrolled ? "bg-gradient-to-r from-[#F8FDFD] via-[#E0F7FA] to-[#B2EBF2] shadow-md" : "bg-transparent shadow-none"
    }`}>
      
      {/* --- ANIMATED LOGO --- */}
      <div className="flex items-center">
        <Link to="/" className="relative h-16 w-48 overflow-hidden rounded-lg block">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* The Rolling Black Overlay */}
            <motion.div
              className="absolute inset-0 bg-black z-20"
              initial={false}
              animate={{ x: isScrolled ? "100%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            />
            {/* The White Background Revealed */}
            <div className="bg-white w-full h-full flex items-center justify-center p-2">
              <img src="/TheTravelGroup_Logo.jpg" alt="Logo" className="h-full w-auto object-contain" />
            </div>
            {/* The Accent Line */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-[#FF7A59] z-30"
              initial={false}
              animate={{ left: isScrolled ? "100%" : "0%", opacity: isScrolled ? 0 : 1 }}
              transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            />
          </div>
        </Link>
      </div>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden md:flex space-x-2 items-center">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <div className="relative" ref={dropdownRef}>
          <button type="button" className={linkClass("/packages")} onClick={() => setIsPackagesDropdownOpen(!isPackagesDropdownOpen)}>
            Packages
          </button>
          <AnimatePresence>
            {isPackagesDropdownOpen && (
              <motion.div 
                initial="hidden" animate="visible" exit="exit" variants={dropdownVariants} 
                className="absolute top-full left-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl z-[10000] border border-gray-100 p-2"
              >
                <div className="flex flex-col gap-1.5">
                  <button onClick={() => { setTimeout(() => { navigate("/group-packages"); setIsPackagesDropdownOpen(false); }, 1000); }} className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all text-sm text-left w-full">
                    Group / Family Packages
                  </button>
                  <button onClick={() => { setTimeout(() => { navigate("/packages"); setIsPackagesDropdownOpen(false); }, 1000); }} className="block px-5 py-4 rounded-2xl text-gray-800 font-bold hover:bg-[#FF7A59] hover:text-white transition-all text-sm text-left w-full">
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

      {/* --- MOBILE TOGGLE --- */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1A1A1A] p-2 rounded-md hover:bg-gray-100">
           {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-[9999]" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden">
            <div className="flex flex-col py-4 px-6 gap-2">
              <Link to="/" className={linkClass("/", true)} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <div className="bg-gray-50 border-y border-gray-100 py-4 my-2 rounded-2xl">
                <button className="block w-full text-left px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59]" onClick={() => { setTimeout(() => { navigate("/group-packages"); setIsMobileMenuOpen(false); }, 1000); }}>
                  Group / Family Packages
                </button>
                <button className="block w-full text-left px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59]" onClick={() => { setTimeout(() => { navigate("/packages"); setIsMobileMenuOpen(false); }, 1000); }}>
                  Popular Packages
                </button>
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
    </nav>
  );
}
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
              setIsPackagesDropdownOpen(!isPackagesDropdownOpen);
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

      {/* --- Mobile Menu Dropdown (THIS WAS MISSING) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-[9999]" 
            variants={mobileMenuVariants} 
            initial="hidden" 
            animate="visible" 
            exit="hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-2">
              <Link to="/" className={linkClass("/", true)} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              
              <div className="mt-4 mb-1">
                <span className="text-xl font-bold text-[#1A1A1A] px-4">Packages</span>
              </div>

              <div className="bg-gray-50 border-y border-gray-100 py-4 my-2 rounded-2xl">
                  <span className="block px-6 py-1 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Explore Packages</span>
                  <button 
                    className="block w-full text-left px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59] transition-colors"
                    onClick={() => {
                      setTimeout(() => {
                        navigate("/group-packages");
                        setIsMobileMenuOpen(false);
                      }, 1000);
                    }}
                  >
                    Group / Family Packages
                  </button>
                  <button 
                    className="block w-full text-left px-6 py-3 text-gray-700 font-bold hover:text-[#FF7A59] transition-colors"
                    onClick={() => {
                      setTimeout(() => {
                        navigate("/packages");
                        setIsMobileMenuOpen(false);
                      }, 1000);
                    }}
                  >
                    Popular Packages
                  </button>
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
