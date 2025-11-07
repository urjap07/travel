import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
// MODIFIED: Imported motion and AnimatePresence
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- NEW: Icons for mobile menu ---
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <line x1="3" x2="21" y1="12" y2="12" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <line x1="3" x2="21" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

// --- NEW: Animation variants for mobile menu ---
const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};


export default function Navbar() {
 const { pathname } = useLocation();
  // NEW: State to manage mobile menu visibility
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 // Helper to style the active and hovered links
 const linkClass = (path: string, isMobile: boolean = false) => {
    // MODIFIED: Added isMobile check for different styles
    const baseClass = isMobile
      ? "block w-full text-left px-4 py-3 text-lg" // Mobile styles
      : "py-2 px-4 rounded-xl transition font-medium transform"; // Desktop styles

    const activeClass = isMobile
      ? "bg-secondary text-white"
      : "bg-[#FF7A59] text-white shadow"; // Coral for active

    const inactiveClass = isMobile
      ? "text-gray-700 hover:bg-accent/50"
      : [
          "text-[#1A1A1A] border border-transparent",
          "hover:text-white hover:shadow-md hover:-translate-y-0.5",
          "hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA]",
        ].join(" ");

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="bg-gradient-to-r from-[#F8FDFD] via-[#E0F7FA] to-[#B2EBF2] shadow-md px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 relative">
      {/* MODIFIED: Replaced image with video */}
     <div className="flex items-center">
      <Link to="/" className="flex items-center">
          {/* MODIFIED: Replaced <img> with <video> */}
          <video 
            // IMPORTANT: Replace this with the path to your video file
            src="/Travel Logo Animation.mp4" 
            autoPlay
            loop
            muted
            playsInline
            className="h-16 w-auto" // Kept the same size as the logo
          >
            Your browser does not support the video tag.
          </video>
      </Link>
      </div>

     {/* --- Desktop Menu --- */}
      <div className="hidden md:flex space-x-2">
      <Link to="/" className={linkClass("/")}>Home</Link>
      <Link to="/packages" className={linkClass("/packages")}>Packages</Link>
      <Link to="/enquiry" className={linkClass("/enquiry")}>Enquiry</Link>
      <Link to="/about" className={linkClass("/about")}>About</Link>
      </div>

      {/* --- Mobile Menu Button --- */}
      {/* NEW: Show on medium and below */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-text p-2 rounded-md hover:bg-accent"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col py-2">
              <Link to="/" className={linkClass("/", true)} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/packages" className={linkClass("/packages", true)} onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
              <Link to="/enquiry" className={linkClass("/enquiry", true)} onClick={() => setIsMobileMenuOpen(false)}>Enquiry</Link>
              <Link to="/about" className={linkClass("/about", true)} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
 );
}