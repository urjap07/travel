import { motion, type Variants } from "framer-motion";
import type { FC } from "react"; // <-- tiny type-only import to type the icon component

// --- IMPORTS ---
import { dummyPackages } from "../data/dummyPackages"; // removed .tsx in import
import PackageCard from "../components/PackageCard"; // removed .tsx in import

// --- HELPER ICON ---
const SparkleIcon: FC = () => ( // <-- typed as FC to avoid TSX implicit-any issues
  <svg
    className="w-full h-full text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 2.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 2.15zM10 6.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 6.15zM10 10.15l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24L10 10.15zM5.31 4.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM14.69 4.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM5.31 12.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18zM14.69 12.31l.38 1.18h1.24l-1 .73.38 1.18-1-.73-1 .73.38-1.18-1-.73h1.24l.39-1.18z"
      clipRule="evenodd"
    />
  </svg>
);

// --- ANIMATION VARIANTS (TYPED) ---
const cardListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------- Changed: mark these as `any` to avoid strict typing complaints ----------
// wave animation uses an array for `y` which sometimes trips Variants typing in strict setups
const waveVariants: any = {
  animate: {
    y: ["0px", "-10px", "0px"],
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
  },
};

// sparkle animation uses arrays for scale/opacity — cast to any to avoid TS friction
const sparkleVariants: any = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
  },
};
// ----------------------------------------------------------------------------------

const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 8, ease: "linear", repeat: Infinity },
  },
};

const Packages = () => {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative pt-24 pb-12 px-6 text-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={gradientVariants}
          initial="animate"
          animate="animate"
          style={{
            background: "linear-gradient(to right, var(--tw-gradient-stops))",
            ["--tw-gradient-stops" as any]:
              "var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%",
            ["--tw-gradient-from" as any]: "rgba(0, 175, 170, 0.9)",
            ["--tw-gradient-via" as any]: "rgba(255, 122, 89, 0.9)",
            ["--tw-gradient-to" as any]: "rgba(244, 197, 66, 0.9)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Hero Content unchanged */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore Our Packages
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Your next adventure starts here.
          </motion.p>

          <motion.div
            className="absolute top-1/4 left-1/4 w-10 h-10"
            variants={sparkleVariants}
            animate="animate"
            style={{ transitionDelay: "0.2s" }}
          >
            <SparkleIcon />
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-1/4 w-8 h-8"
            variants={sparkleVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          >
            <SparkleIcon />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 left-1/3 w-9 h-9"
            variants={sparkleVariants}
            animate="animate"
            style={{ transitionDelay: "0.8s" }}
          >
            <SparkleIcon />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{ lineHeight: 0, transform: "rotate(180deg)" }}
          variants={waveVariants}
          animate="animate"
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[80px] transform rotate-180"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-[#F8FDFD]"
            ></path>
          </svg>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-7xl pt-20 pb-20 px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={cardListVariants}
          initial="hidden"
          animate="visible"
        >
          {dummyPackages.map((pkg) => (
            <motion.div key={pkg.id} variants={cardItemVariants}>
              <PackageCard
                id={pkg.id}
                title={pkg.name}
                imageUrl={pkg.imageUrl}
                duration={pkg.duration}
                price={pkg.price}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;
