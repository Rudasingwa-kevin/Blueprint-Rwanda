import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ListingCardProps {
  id: string;
  title: string;
  price: string;
  rating: number;
  image: string;
  location: string;
  type: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ title, price, rating, image, location, type }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-surface rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-pill text-xs font-bold text-primary shadow-sm">
            {type}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 group-hover:translate-x-1 transition-transform">
          <div className="bg-primary p-3 rounded-2xl shadow-lg">
            <ArrowRight size={20} className="text-secondary" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-heading font-bold text-text group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-accent">
            <Star size={18} fill="currentColor" />
            <span className="font-bold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-sm mb-6">
          <MapPin size={16} />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">{price}</span>
            <span className="text-text-muted text-sm"> / night</span>
          </div>
          <button className="text-sm font-bold text-text-muted hover:text-primary transition-colors">
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
