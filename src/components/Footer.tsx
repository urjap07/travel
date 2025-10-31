import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion'; // <-- REMOVED motion

// --- (REMOVED: Animation Variants) ---


// --- SVG ICONS ---
// (Kept SVG icon components as they are still used)

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.667 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.667 4.771 4.919 4.919 1.266-.058 1.646.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.268.196-6.106 2.034-6.3 6.3C.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.947.196 4.268 2.034 6.106 6.3 6.3 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.268-.196 6.106-2.034 6.3-6.3.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.196-4.268-2.034-6.106-6.3-6.3C15.667.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.724-.664 1.565-.664 2.458 0 1.945 1.056 3.662 2.668 4.646-.974-.031-1.889-.3-2.69-.745v.065c0 2.71 1.912 4.966 4.437 5.484-.466.127-.96.195-1.464.195-.357 0-.703-.034-1.043-.1 1.061 2.41 3.239 3.518 5.466 3.559-1.9 1.49-4.288 2.38-6.897 2.38-.449 0-.892-.026-1.328-.077 2.461 1.577 5.381 2.502 8.48 2.502 9.178 0 14.19-7.903 13.913-14.514 1.036-.748 1.921-1.68 2.623-2.724z" />
  </svg>
);

// --- (Removed floating icon SVGs) ---

const Footer = () => {
  return (
    // CHANGED: Set to a static gradient from primary to secondary, and added pt-20
    <footer className="relative bg-gradient-to-r from-primary to-secondary text-white font-body overflow-hidden pt-20"> 

      {/* --- ADDED: Static Wavy Separator (no motion) --- */}
      <div 
        className="absolute top-0 left-0 w-full overflow-hidden" 
        style={{ lineHeight: 0 }}
      >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F8FDFD]"></path>
        </svg>
      </div>
      
      {/* --- (REMOVED: Animated Gradient Background) --- */}
      {/* --- (REMOVED: Floating Animated Elements) --- */}

      {/* Footer Content */}
      {/* CHANGED: Added relative z-10, removed pt-28 */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="col-span-1">
            <h2 className="text-3xl font-heading font-bold mb-4 drop-shadow-md">The Travel Group</h2>
            <p className="text-gray-200 drop-shadow-sm leading-relaxed">
              Your next adventure is just a click away.
            </p>
          </div>

          {/* Column 2: Quick Links (Simplified) */}
          <div className="md:col-start-2">
            <h3 className="text-lg font-heading font-semibold mb-4 text-white drop-shadow-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-200 hover:text-white hover:underline">Home</Link></li>
              <li><Link to="/packages" className="text-gray-200 hover:text-white hover:underline">Packages</Link></li>
              <li><Link to="/enquiry" className="text-gray-200 hover:text-white hover:underline">Enquiry</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-white hover:underline">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-white drop-shadow-sm">Contact Us</h3>
            <ul className="space-y-2 text-gray-200">
              <li>Email: info@travelgroup.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 Travel St, Pune, India</li>
            </ul>
          </div>

          {/* Column 4: Social (Simplified) */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-white drop-shadow-sm">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity"><FacebookIcon /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity"><InstagramIcon /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity"><TwitterIcon /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/30 text-center text-gray-200">
          <p>&copy; 2025 The Travel Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

