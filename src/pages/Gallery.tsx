import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";

// Data matching the 12 image slots
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
  const { scrollY } = useScroll();
  
  // Parallax values for floating aesthetic orbs using brand colors
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <div className="bg-[#FCFEFE] min-h-screen pb-24 px-8 selection:bg-[#00AFAA] selection:text-white overflow-x-hidden">
      
      {/* --- Aesthetic Background Layer --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Brand Teal Orb matching "Bags" gradient */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#00AFAA]/10 blur-[120px]"
        />
        {/* Brand Coral Orb matching "Bags" gradient */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#FF7A59]/15 blur-[100px]"
        />
        {/* Subtle Geometric Wireframe Globe */}
        <motion.div 
          style={{ rotate }}
          className="absolute top-[10%] left-[20%] opacity-[0.04]"
        >
          <Globe className="w-[500px] h-[500px] text-[#1A1A1A]" strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Creative Hero Header --- */}
        <header className="pt-32 mb-28 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full bg-white/40 backdrop-blur-xl border border-gray-100 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#FF7A59]" />
            <span className="text-[12px] font-black tracking-[0.5em] uppercase text-gray-400">Visual Narratives</span>
          </motion.div>
          
          <div className="relative inline-block">
            {/* Multi-stop gradient matching the "Bags" text: Teal -> Coral -> Gold */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[11rem] font-black text-[#1A1A1A] tracking-tighter leading-[0.8] mb-10"
            >
              The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFAA] via-[#FF7A59] to-[#F4C542]">
                Gallery.
              </span>
            </motion.h1>
            
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-6 -right-12 hidden lg:block opacity-[0.15]"
            >
              <Camera className="w-24 h-24 text-[#1A1A1A]" strokeWidth={1} />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7 }}
            className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed mt-6 px-4"
          >
            Capturing the spirit of discovery across borders and peaks. Every frame tells a curated story of a journey well-traveled.
          </motion.p>
        </header>

        {/* --- Masonry Grid Layout --- */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="relative group overflow-hidden rounded-[3rem] break-inside-avoid shadow-2xl border border-white/20 bg-white"
            >
              <div className="overflow-hidden">
                <motion.img 
                  src={img.url}
                  alt={`Travel Gallery ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x800/eeeeee/999999?text=Frame+'+(index+1); }}
                />
              </div>
              {/* Glass Hover Overlay using Brand Teal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00AFAA]/10 via-transparent to-[#FF7A59]/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* --- Bottom CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-48 text-center pb-20"
        >
          <Link to="/enquiry" className="inline-block group relative">
            <span className="text-4xl font-black text-gray-900 group-hover:text-[#00AFAA] transition-all duration-500">
              Begin Your Own Story
            </span>
            <span className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-[#FF7A59] to-[#00AFAA] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;