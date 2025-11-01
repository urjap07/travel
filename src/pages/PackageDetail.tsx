import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

// --- MOCK DATA ---
// Added mock data here so the file is self-contained and runnable.
export interface Package {
  id: number;
  name: string;
  duration: string;
  region: string;
  price: string;
  imageUrl: string;
}

export interface PackageDetailType {
  id: number;
  description: string;
  itinerary: { day: number; title: string; details: string; }[];
  inclusions: string[];
  exclusions: string[];
  gallery: { url: string; title: string; }[]; // MODIFIED: Now an object
  testimonials: { name: string; quote: string; }[];
}

export const dummyPackages: Package[] = [
  {
    id: 1,
    name: 'Goa Beach Vibes',
    duration: '4D/3N',
    region: 'India',
    price: '25,000/-',
    imageUrl: '/Goa_image.jpg',
  },
  {
    id: 2,
    name: 'Manali Snow Escape',
    duration: '5D/4N',
    region: 'India',
    price: '40,000/-',
    imageUrl: '/Manali_image.jpg',
  },
  {
    id: 3,
    name: 'Paris + Swiss Bliss',
    duration: '7D/6N',
    region: 'Europe',
    price: '90,000/-',
    imageUrl: '/Paris_Switzerland_image.jpg',
  },
  {
    id: 4,
    name: 'Bali Tropical Holiday',
    duration: '6D/5N',
    region: 'Asia',
    price: '35,000/-',
    imageUrl: '/Bali_image.jpg',
  },
  {
    id: 5,
    name: 'Dubai Luxury Getaway',
    duration: '5D/4N',
    region: 'Middle East',
    price: '65,000/-',
    imageUrl: '/Dubai_image.jpg',
  },
  {
    id: 6,
    name: 'Thailand Budget Fun',
    duration: '5D/4N',
    region: 'Asia',
    price: '30,000/-',
    imageUrl: '/Thailand_image.jpg',
  },
];

// MODIFIED: Updated gallery to be an array of objects
export const packageDetails: PackageDetailType[] = [
  // Package 1: Goa
  {
    id: 1,
    description: "Experience the vibrant beaches, Portuguese heritage, and lively nightlife of Goa. This is the hassle-free beach escape you've been dreaming of.",
    itinerary: [
      { day: 1, title: 'Arrival in Goa', details: 'Arrive at Goa Airport/Station, transfer to your hotel. Evening free to explore the famous Calangute beach.' },
      { day: 2, title: 'North Goa Sightseeing', details: 'Visit Fort Aguada, Candolim Beach, Baga Beach, and the Anjuna flea market.' },
      { day: 3, title: 'South Goa & Culture', details: 'Explore Old Goa churches (Basilica of Bom Jesus), Mangeshi Temple, and a relaxing evening boat cruise on the Mandovi River.' },
      { day: 4, title: 'Departure', details: 'After breakfast, check out from the hotel and transfer to the airport/station for your departure.' },
    ],
    inclusions: ['Accommodation in 3-star hotel', 'Daily Breakfast', 'Airport Transfers (Shared)', 'Full-day North & South Goa sightseeing'],
    exclusions: ['Flights/Train tickets', 'Lunch & Dinner', 'Water sports charges', 'Personal expenses'],
    gallery: [
      { url: '/Goa_image1.jpg', title: 'Goa Beach 1' },
      { url: '/Goa_image2.jpg', title: 'Goa Market' },
      { url: '/Goa_image3.jpg', title: 'Goa Nightlife' },
      { url: '/Goa_image4.jpg', title: 'Goa Sunset' },
    ],
    testimonials: [
      { name: 'Rohan & Priya', quote: 'The Goa trip was perfectly organized. We loved the sightseeing and the hotel was great!' }
    ]
  },
  // Package 2: Manali
  {
    id: 2,
    description: "Escape the heat and dive into a snowy paradise. Our Manali Snow Escape takes you through breathtaking valleys and high-altitude passes.",
    itinerary: [
      { day: 1, title: 'Arrival in Manali', details: 'Arrive in Manali, check into your hotel. Day at leisure to explore Mall Road.' },
      { day: 2, title: 'Manali Local Sightseeing', details: 'Visit Hadimba Devi Temple, Manu Temple, Vashisht Hot Springs, and Tibetan Monastery.' },
      { day: 3, title: 'Solang Valley Adventure', details: 'Full day excursion to Solang Valley for adventure activities like paragliding, zorbing, and skiing (winter).' },
      { day: 4, title: 'Kullu & Naggar Castle', details: 'Visit the famous Kullu Shawl Factory and explore the historic Naggar Castle.' },
      { day: 5, title: 'Departure', details: 'After breakfast, check out and depart from Manali with wonderful memories.' },
    ],
    inclusions: ['Accommodation in cozy hotel', 'Daily Breakfast & Dinner', 'All transfers by private car', 'Sightseeing as per itinerary'],
    exclusions: ['Bus/Flight tickets', 'Lunch', 'Adventure activity costs', 'Rohtang Pass permit'],
    gallery: [
      { url: '/Manali_image1.jpg', title: 'Solang Valley' },
      { url: '/Manali_image2.jpg', title: 'Hadimba Temple' },
      { url: '/Manali_image3.jpg', title: 'Kullu Valley' },
      { url: '/Manali_image4.jpg', title: 'Rohtang Pass' },
    ],
    testimonials: [
      { name: 'Ankit Sharma', quote: 'Solang Valley was the highlight. Amazing trip, well managed by the team.' }
    ]
  },
  // Package 3: Paris + Swiss
  {
    id: 3,
    description: "The perfect blend of romance and adventure. Witness the iconic Eiffel Tower in Paris and explore the majestic snow-capped peaks of the Swiss Alps.",
    itinerary: [
      { day: 1, title: 'Arrival in Paris', details: 'Arrive in Paris, transfer to your hotel. Evening illumination tour and Seine river cruise.' },
      { day: 2, title: 'Paris City Tour', details: 'Visit the Eiffel Tower (2nd level), Louvre Museum (outside), Arc de Triomphe, and Champs-Élysées.' },
      { day: 3, title: 'Paris to Interlaken', details: 'Take a high-speed train to Interlaken, Switzerland. Check into your hotel and enjoy the scenic town.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe', details: 'Full day excursion to Jungfraujoch. Experience the ice palace, sphinx observatory, and stunning glacier views.' },
      { day: 5, title: 'Visit Lucerne', details: 'Travel to Lucerne, visit the Chapel Bridge, Lion Monument, and enjoy a boat ride on Lake Lucerne.' },
      { day: 6, title: 'Mt. Titlis', details: 'Excursion to Mt. Titlis, experience the Rotair revolving cable car and the Titlis Cliff Walk.' },
      { day: 7, title: 'Departure from Zurich', details: 'Transfer to Zurich Airport (ZRH) for your flight back home.' },
    ],
    inclusions: ['Accommodation in 4-star hotels', 'Daily Breakfast', 'Train tickets (Paris-Interlaken, Interlaken-Lucerne)', 'All sightseeing and excursions as mentioned', 'Swiss Travel Pass (for inter-city travel)'],
    exclusions: ['International flights', 'Visa fees', 'Lunches & Dinners', 'Personal expenses'],
    gallery: [
      { url: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Eiffel+Tower', title: 'Eiffel Tower' },
      { url: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Jungfraujoch', title: 'Jungfraujoch' },
      { url: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Lake+Lucerne', title: 'Lake Lucerne' },
      { url: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Mt+Titlis', title: 'Mt Titlis' },
    ],
    testimonials: [
      { name: 'The Kapoors', quote: 'Unforgettable trip! From the romance of Paris to the beauty of the Alps, everything was perfect.' }
    ]
  },
  // Package 4: Bali
  {
    id: 4,
    description: "Discover the 'Island of the Gods'. From stunning beaches and lush rice terraces to ancient temples and a vibrant culture, Bali is a tropical dream.",
    itinerary: [
      { day: 1, title: 'Arrival in Bali', details: 'Arrive at Ngurah Rai Airport (DPS), transfer to your hotel in Kuta. Evening at leisure.' },
      { day: 2, title: 'Kintamani Volcano Tour', details: 'Full-day tour to see the active Batur volcano, visit a coffee plantation, and explore Ubud art villages.' },
      { day: 3, title: 'Water Sports & Uluwatu', details: 'Morning water sports at Tanjung Benoa (optional). Evening visit to Uluwatu Temple for the Kecak dance and sunset.' },
      { day: 4, title: 'Bedugul & Tanah Lot', details: 'Visit Ulun Danu Beratan Temple on Lake Bratan, and the iconic Tanah Lot Temple for sunset.' },
      { day: 5, title: 'Nusa Penida Day Trip', details: 'Full-day fast boat excursion to Nusa Penida island. Visit Kelingking Beach, Angel\'s Billabong, and Broken Beach.' },
      { day: 6, title: 'Departure', details: 'Enjoy a final Balinese massage (included) before your transfer to the airport.' },
    ],
    inclusions: ['Accommodation (Kuta & Ubud)', 'Daily Breakfast', 'Airport Transfers', 'All tours by private car', 'Nusa Penida fast boat & tour', '1x Balinese Massage'],
    exclusions: ['International flights', 'Lunches & Dinners', 'Water sports fees', 'Visa on Arrival'],
    gallery: [
      { url: 'https://placehold.co/300x200/F4C542/FFFFFF?text=Kelingking+Beach', title: 'Kelingking Beach' },
      { url: 'https://placehold.co/300x200/F4C542/FFFFFF?text=Tanah+Lot', title: 'Tanah Lot' },
      { url: 'https://placehold.co/300x200/F4C542/FFFFFF?text=Ubud+Rice+Terrace', title: 'Ubud Rice Terrace' },
      { url: 'https://placehold.co/300x200/F4C542/FFFFFF?text=Ulun+Danu+Temple', title: 'Ulun Danu Temple' },
    ],
    testimonials: [
      { name: 'Vikram & Aisha', quote: 'Bali was magical. The private tours were excellent, and Nusa Penida was unbelievable.' }
    ]
  },
  // Package 5: Dubai
  {
    id: 5,
    description: "Experience the ultimate in luxury and modern marvels. From the world's tallest building to desert safaris and mega-malls, Dubai has it all.",
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', details: 'Arrive at Dubai (DXB), transfer to your hotel. Evening Dhow Cruise dinner on the Dubai Marina.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa', details: 'Half-day city tour (Dubai Museum, Jumeirah Mosque). Evening visit to Burj Khalifa "At The Top" (124th floor) and Dubai Mall Fountains.' },
      { day: 3, title: 'Desert Safari', details: 'Morning at leisure (visit Mall of the Emirates). Afternoon Desert Safari with dune bashing, camel ride, BBQ dinner, and belly dancing.' },
      { day: 4, title: 'Abu Dhabi Day Trip', details: 'Full-day tour to Abu Dhabi. Visit the Sheikh Zayed Grand Mosque, Emirates Palace, and Ferrari World (photo stop).' },
      { day: 5, title: 'Departure', details: 'Morning free for last-minute shopping. Transfer to DXB airport for your flight.' },
    ],
    inclusions: ['4-star hotel accommodation', 'Daily Breakfast', 'Airport Transfers', 'Burj Khalifa ticket', 'Desert Safari with Dinner', 'Dhow Cruise Dinner', 'Abu Dhabi city tour'],
    exclusions: ['International flights', 'Visa fees', 'Lunches', 'Tourism Dirham Tax (paid at hotel)'],
    gallery: [
      { url: 'https://placehold.co/300x200/E879F9/FFFFFF?text=Burj+Khalifa', title: 'Burj Khalifa' },
      { url: 'https://placehold.co/300x200/E879F9/FFFFFF?text=Desert+Safari', title: 'Desert Safari' },
      { url: 'https://placehold.co/300x200/E879F9/FFFFFF?text=Sheikh+Zayed+Mosque', title: 'Sheikh Zayed Mosque' },
      { url: 'https://placehold.co/300x200/E879F9/FFFFFF?text=Dubai+Marina', title: 'Dubai Marina' },
    ],
    testimonials: [
      { name: 'Mr. & Mrs. Gupta', quote: 'Dubai was spectacular! The desert safari and Burj Khalifa were experiences of a lifetime.' }
    ]
  },
  // Package 6: Thailand
  {
    id: 6,
    description: "The perfect budget-friendly introduction to Thailand. Enjoy the vibrant city life of Bangkok and the stunning beaches of Pattaya.",
    itinerary: [
      { day: 1, title: 'Arrival in Bangkok & Transfer to Pattaya', details: 'Arrive in Bangkok (BKK), transfer to your hotel in Pattaya. Evening free to explore Walking Street.' },
      { day: 2, title: 'Pattaya - Coral Island Tour', details: 'Half-day tour to Coral Island (Koh Larn) by speedboat. Enjoy swimming, sunbathing, and optional water sports.' },
      { day: 3, title: 'Pattaya to Bangkok & Temple Tour', details: 'Transfer back to Bangkok. En route, visit the Golden Buddha and Marble Buddha temples.' },
      { day: 4, title: 'Bangkok - Safari World', details: 'Full day at Safari World and Marine Park, including lunch. Enjoy the safari drive, dolphin show, and more.' },
      { day: 5, title: 'Departure', details: 'After breakfast, free for shopping at Pratunam Market. Transfer to BKK airport for your flight.' },
    ],
    inclusions: ['Accommodation (Pattaya & Bangkok)', 'Daily Breakfast', 'All transfers', 'Coral Island Tour', 'Bangkok Temple Tour', 'Safari World ticket with Lunch'],
    exclusions: ['International flights', 'Visa on Arrival fees', 'Lunches & Dinners (except one)', 'Personal expenses'],
    gallery: [
      { url: 'https://placehold.co/300x200/FB923C/FFFFFF?text=Coral+Island', title: 'Coral Island' },
      { url: 'https://placehold.co/300x200/FB923C/FFFFFF?text=Grand+Palace+(Bangkok)', title: 'Grand Palace' },
      { url: 'https://placehold.co/300x200/FB923C/FFFFFF?text=Safari+World', title: 'Safari World' },
      { url: 'https://placehold.co/300x200/FB923C/FFFFFF?text=Floating+Market', title: 'Floating Market' },
    ],
    testimonials: [
      { name: 'College Friends Group', quote: 'Amazing and affordable. Coral Island was beautiful and Safari World was so much fun!' }
    ]
  },
];


// --- ICONS ---
const CalendarIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- ANIMATION VARIANTS ---
// Typed with Variants to satisfy TypeScript and Framer Motion typings.
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  },
};

// NEW: More lively variant for itinerary cards
const itineraryCardVariants: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  },
};


// --- COMPONENT ---
const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [details, setDetails] = useState<PackageDetailType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const packageId = Number(id);
    if (packageId) {
      // Use the mock data defined in this file
      const foundPkg = dummyPackages.find(p => p.id === packageId);
      const foundDetails = packageDetails.find(d => d.id === packageId);
      
      setPkg(foundPkg || null);
      setDetails(foundDetails || null);
    }
  }, [id]);

  if (!pkg || !details) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-2xl font-heading text-primary">Loading Package...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-background font-body"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section 
        className="h-[50vh] min-h-[300px] bg-cover bg-center flex items-center justify-center text-white text-center px-6 relative"
        style={{ backgroundImage: `url(${pkg.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold drop-shadow-lg">{pkg.name}</h1>
          <p className="text-xl md:text-2xl mt-4 flex items-center justify-center drop-shadow-md">
            <CalendarIcon /> {pkg.duration}
          </p>
        </motion.div>
      </section>

      {/* Enquire Button */}
      <div className="sticky top-[100px] z-30 flex justify-center md:justify-end pr-0 md:pr-12 -mt-8">
        <Link to="/enquiry">
          <motion.button 
            className="text-white bg-secondary font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            Enquire Now
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl p-6 lg:p-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <motion.div 
            className="lg:col-span-2"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible" // Use whileInView for scroll-triggered animation
            viewport={{ once: true, amount: 0.2 }} // Trigger once 20% is visible
          >
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-4">About this Trip</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{details.description}</p>
            </motion.div>

            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-6">Your Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                
                {/* ✅ UPDATED ANIMATED ITINERARY CARDS */}
                {details.itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    className="flex items-start p-6 bg-white rounded-xl shadow-lg cursor-pointer" // MODIFIED: Added shadow-lg
                    variants={itineraryCardVariants} // USE NEW VARIANT
                    whileHover={{
                      scale: 1.02, // More subtle scale
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }} // Make hover springy
                  >
                    {/* Colorful Day Bubble */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center rounded-full mr-5 shadow">
                      <span className="text-white font-bold text-xl">{day.day}</span>
                    </div>
                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-heading font-semibold text-primary mb-1">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-gray-600">{day.details}</p>
                    </div>
                  </motion.div>
                ))}

              </div>
            </motion.div>
            
            {/* MODIFIED: GALLERY SECTION */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {/* Increased gap */}
                {details.gallery.map((image, index) => (
                  <div key={index} className="flex flex-col"> {/* Simple container for title + card */}
                    {/* Title on top */}
                    <h4 
                      className="text-sm font-semibold text-gray-800 text-center mb-2 truncate" 
                      title={image.title}
                    >
                      {image.title}
                    </h4>
                    {/* Image Card */}
                    <motion.div 
                      className="overflow-hidden rounded-lg shadow-md"
                      whileHover={{ scale: 1.05, y: -5 }} 
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <img src={image.url} alt={image.title} className="w-full h-40 object-cover" /> 
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="lg:col-span-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl">
              <p className="text-2xl font-heading text-gray-600">Starting from</p>
              <p className="text-5xl font-heading font-bold text-primary mb-6">{pkg.price}</p>
              
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">Inclusions</h3>
                <ul className="space-y-3">
                  {details.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">Exclusions</h3>
                <ul className="space-y-3">
                  {details.exclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <XIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
};

export default PackageDetail;

