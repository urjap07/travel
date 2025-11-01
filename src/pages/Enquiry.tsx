import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
// MODIFIED: Removed EmailJS import
// import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

// --- ICONS ---
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const MapPinIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3m-6-8a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
);

// --- ANIMATION VARIANTS ---
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Animated gradient for the form background
const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// NEW: Variants for the confirmation card
const confirmationCardVariants: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 150, 
      damping: 12, 
      delay: 0.2,
      staggerChildren: 0.1 // NEW: Stagger children (text)
    }
  }
};

// NEW: Variants for the checkmark icon
const checkmarkIconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      // MODIFIED: Use timeline/tween for multi-step keyframes
      type: "tween", 
      ease: "circOut",
      duration: 0.6,
      scale: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.5
      },
      rotate: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.5
      },
    }
  },
  heartbeat: {
    scale: [1, 1.05, 1], // Subtle heartbeat
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2 // Start after initial animation
    }
  }
};

// NEW: Variants for text pop-in
const textPopInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 10 }
  }
};

// --- NEW: Confetti Component ---
// MODIFIED: Refactored to calculate random values safely
const ConfettiPiece = ({ i }: { i: number }) => {
  const colors = ['#FF6F61', '#4F46E5', '#F4C542', '#00AFAA']; // secondary, primary, accent, teal
  const randomColor = colors[i % colors.length];
  
  // Define all random values as constants *once*
  const randomXStart = Math.random() * 200 - 100; // -100% to +100%
  const randomXEnd = randomXStart + (Math.random() - 0.5) * 100; // Drift sideways
  const randomYStart = Math.random() * 100 - 150; // -150% to -50%
  const randomYEnd = randomYStart + 200; // Fall down
  const randomRotate = Math.random() * 360;
  const randomDelay = Math.random() * 0.5 + 0.3; // Stagger start time
  const randomDuration = Math.random() * 2 + 1.5; // 1.5s to 3.5s duration

  const confettiVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 0, 
      x: 0, 
      rotate: 0,
      scale: 0
    },
    animate: {
      opacity: [1, 1, 0],
      y: [randomYStart, randomYEnd], // Use constant
      x: [randomXStart, randomXEnd], // Use constant
      rotate: [0, randomRotate],
      scale: 1,
      transition: {
        duration: randomDuration, // Use constant
        ease: "easeOut",
        delay: randomDelay,
      },
    },
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-3"
      style={{ backgroundColor: randomColor, zIndex: 100 }}
      variants={confettiVariants}
      initial="initial"
      animate="animate"
    />
  );
};

const ConfettiBurst = () => {
  return (
    <>
      {/* Create an array of 30 pieces */}
      {[...Array(30)].map((_, i) => (
        <ConfettiPiece key={i} i={i} />
      ))}
    </>
  );
};


// --- ENQUIRY PAGE COMPONENT ---
const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '', 
    endDate: '',   
    travelers: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // NEW: State for loading and errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  // REMOVED: formRef is no longer needed for Formspree fetch
  // const formRef = useRef<HTMLFormElement>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // MODIFIED: Updated handleSubmit to use Formspree fetch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    // --- IMPORTANT ---
    // 1. Go to Formspree.io and create a new form.
    // 2. Find your Form ID. It's the string of characters in the URL,
    //    e.g., https://formspree.io/f/xeqyvjlp
    // 3. Replace 'YOUR_FORM_ID' below with your actual ID.

    const YOUR_FORM_ID = 'xgvppppw';
    // ---------------

    try {
      const response = await fetch(`https://formspree.io/f/${YOUR_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true); // Show the "Thank You" card
      } else {
        // Try to parse the error from Formspree
        const errorData = await response.json();
        const errorMessage = errorData.errors?.map((err: any) => err.message).join(', ') || 'Something went wrong.';
        setSubmissionError(`Failed to send enquiry: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setSubmissionError('Failed to send enquiry. Please check your network and try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <motion.div
      className="bg-background font-body min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Hero Section --- */}
      <section 
        className="h-[40vh] min-h-[250px] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-center px-6 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold drop-shadow-lg">Plan Your Dream Trip</h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow-md">Get in touch and let's make it happen!</p>
        </motion.div>
      </section>

      {/* --- Form Section --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          
          {isSubmitted ? (
            // --- Confirmation Message ---
            <motion.div
              className="text-center p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden" // MODIFIED: Added classes
              variants={confirmationCardVariants} // NEW: Use new variants
              initial="hidden"
              animate="visible"
            >
              {/* NEW: Confetti! */}
              <ConfettiBurst />

              {/* NEW: Animated gradient background for confirmation card */}
              <motion.div
                className="absolute inset-0 z-0" 
                variants={gradientVariants}
                initial="animate"
                animate="animate"
                style={{
                    background: 'linear-gradient(120deg, var(--tw-gradient-stops))',
                    '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
                    '--tw-gradient-from': 'rgba(255, 255, 255, 1)', 
                    '--tw-gradient-to': 'rgba(128, 255, 192, 0.4)', // A fresh, light green/teal accent for success
                    backgroundSize: '200% 200%',
                } as React.CSSProperties}
              />
              {/* MODIFIED: Checkmark icon with new animation */}
              <motion.div
                className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                variants={checkmarkIconVariants} // NEW: Use new checkmark variants
                initial="initial"
                animate={["animate", "heartbeat"]} // Play pop-in then heartbeat
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              {/* MODIFIED: Added motion and variants to text */}
              <motion.h2 
                className="relative z-10 text-4xl font-heading font-bold text-secondary mb-4" // MODIFIED: Changed text-primary to text-secondary
                variants={textPopInVariants} // NEW
              >
                Thank You!
              </motion.h2>
              <motion.p 
                className="relative z-10 text-xl text-gray-700" // MODIFIED: Text color for contrast
                variants={textPopInVariants} // NEW
              > 
                Your enquiry has been sent. We will get back to you within 24 hours.
              </motion.p>
            </motion.div>
          ) : (
            // --- Enquiry Form ---
            <motion.form
              // REMOVED: ref={formRef}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              whileHover={{ scale: 1.01, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* NEW: Animated gradient for the form background */}
              <motion.div
                className="absolute inset-0 z-0" // z-0 to place it behind content
                variants={gradientVariants}
                initial="animate"
                animate="animate"
                style={{
                    background: 'linear-gradient(120deg, var(--tw-gradient-stops))', // Changed angle
                    '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
                    '--tw-gradient-from': 'rgba(255, 255, 255, 1)', // White base
                    '--tw-gradient-to': 'rgba(255, 223, 128, 0.4)', // Slightly more vibrant yellow/orange, higher opacity
                    backgroundSize: '200% 200%',
                } as React.CSSProperties}
              />

              {/* MODIFIED: Added relative z-10 */}
              <h2 className="relative z-10 text-4xl font-heading font-bold text-primary text-center mb-8">Send Us an Enquiry</h2> {/* MODIFIED: Changed text-text to text-primary */}
              {/* MODIFIED: Added relative z-10 */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <motion.div variants={formItemVariants} className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserIcon />
                    </span>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <MailIcon />
                    </span>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div> 
                {/* FIXED: Corrected closing tag from </Dmotion.div> to </motion.div> */}

                {/* Phone */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <PhoneIcon />
                    </span>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="(+91) 12345 67890"
                    />
                  </div>
                </motion.div>
                
                {/* Destination */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination(s) of Interest</label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <MapPinIcon />
                    </span>
                    <input 
                      type="text" 
                      name="destination" 
                      id="destination" 
                      required
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="e.g., Goa, Manali, Paris"
                    />
                  </div>
                </motion.div>

                {/* Start Date */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Travel Start Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CalendarIcon />
                    </span>
                    <input 
                      type="text" 
                      name="startDate" 
                      id="startDate"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.type = 'text')}
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="Start Date"
                    />
                  </div>
                </motion.div> 
                {/* FIXED: Corrected closing tag from </Dmotion.div> to </motion.div> */}

                {/* End Date */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Travel End Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CalendarIcon />
                    </span>
                    <input 
                      type="text" 
                      name="endDate" 
                      id="endDate"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.type = 'text')}
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="End Date"
                    />
                  </div>
                </motion.div>

                {/* Travelers */}
                <motion.div variants={formItemVariants}>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <UsersIcon />
                    </span>
                    <input 
                      type="number" 
                      name="travelers" 
                      id="travelers" 
                      min="1"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                      placeholder="e.g., 2"
                    />
                  </div>
                </motion.div>
                {/* FIXED: Corrected closing tag from </Dmotion.div> to </motion.div> */}

                {/* Message */}
                <motion.div variants={formItemVariants} className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" 
                    placeholder="Tell us more about your dream trip..."
                  />
                </motion.div> 
                {/* FIXED: Corrected closing tag from </Dmotion.div> to </motion.div> */}
              </div>

              {/* NEW: Submission Error Message */}
              {submissionError && (
                <motion.div 
                  className="relative z-10 text-center text-red-600 font-medium mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {submissionError}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={formItemVariants} className="relative z-10 text-center mt-8">
                <motion.button 
                  type="submit"
                  disabled={isSubmitting} // NEW
                  className="bg-secondary text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" // MODIFIED
                  whileHover={isSubmitting ? {} : { // MODIFIED
                    scale: 1.05, 
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    rotate: [0, -3, 3, -3, 3, 0], 
                    transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 } 
                  }}
                  whileTap={isSubmitting ? {} : { scale: 0.95 }} // MODIFIED
                >
                  {isSubmitting ? 'Sending...' : 'Submit Enquiry'} {/* MODIFIED */}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Enquiry;

