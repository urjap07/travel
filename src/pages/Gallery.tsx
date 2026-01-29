import { motion } from "framer-motion";
import { Camera, Link } from "lucide-react";

// --- DATA: 12 Image Slots ---
const galleryImages = [
  { url: "/Gallery_image_1.jpeg" },
  { url: "/Gallery_image_2.jpeg" },
  { url: "/Gallery_image_3.jpeg" },
  { url: "/Gallery_image_4.jpeg" },
  { url: "/Gallery_image_5.jpeg" },
  { url: "/Gallery_image_6.jpeg" },
  { url: "/Gallery_image_7.jpeg" },
  { url: "/Gallery_image_8.jpeg" },
  { url: "/Gallery_image_9.jpeg" },
  { url: "/Gallery_image_10.jpeg" },
  { url: "/Gallery_image_11.jpeg" },
  { url: "/Gallery_image_12.jpeg" },
];

const Gallery = () => {
  return (
    <div className="bg-[#FCFEFE] min-h-screen pt-32 pb-24 px-8 selection:bg-[#00AFAA] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <header className="mb-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-gray-50 border border-gray-100 shadow-sm"
          >
            <Camera className="w-3 h-3 text-[#FF7A59]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Visual Narratives</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter mb-6"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFAA] via-[#FF7A59] to-[#FFC107]">Gallery.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Capturing the spirit of discovery across borders and peaks. Every frame tells a story of a journey well-traveled.
          </motion.p>
        </header>

        {/* --- Masonry Grid Layout --- */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.15 } 
            }
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-sm border border-gray-100 bg-white"
            >
              <div className="overflow-hidden">
                <motion.img 
                  src={img.url}
                  alt={`Travel Gallery ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  // Handling missing images gracefully
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/eeeeee/999999?text=Image+Coming+Soon'; }}
                />
              </div>

              {/* Minimalist Overlay - Pure aesthetic, no text/icons */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* --- Bottom Call to Action --- */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <Link to="/enquiry" className="text-2xl font-black text-gray-900 hover:text-[#00AFAA] transition-colors underline decoration-[#FF7A59] decoration-4 underline-offset-8">
            Begin Your Own Story
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;