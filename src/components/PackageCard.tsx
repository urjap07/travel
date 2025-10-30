import React from 'react';
import { Link } from 'react-router-dom';

// This interface defines what props the PackageCard component expects
interface PackageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  duration: string;
  price: string; // The price is already a string like "199"
}

// This is the component itself
const PackageCard: React.FC<PackageCardProps> = ({ id, imageUrl, title, duration, price }) => {
  
  // We return a <Link> component so the whole card is clickable
  return (
    <Link 
      to={`/package/${id}`} 
      className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group"
    >
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          // Fallback image in case the link is broken
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Not+Found'; }}
        />
      </div>
      
      {/* Content container */}
      <div className="p-5">
        <h3 className="text-2xl font-heading font-semibold text-text mb-2 truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-600 font-body mb-3">
          {duration}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-heading font-bold text-primary">
            {/* We add the $ symbol here */}
            From ${price}
          </span>
          <span className="text-secondary font-semibold group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

// We use 'export default' so App.tsx and Home.tsx can import it easily
export default PackageCard;

