import React from 'react';
import ListingCard from '../components/ListingCard';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Accommodation: React.FC = () => {
  const listings = [
    {
      id: 'acc-1',
      title: 'Kigali View Apartment',
      price: '$50',
      rating: 4.92,
      location: 'Kigali, Rwanda',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'acc-2',
      title: 'Musanze Mountain Retreat',
      price: '$80',
      rating: 4.95,
      location: 'Musanze, Rwanda',
      type: 'Guesthouse',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'acc-3',
      title: 'Lake Kivu Suite',
      price: '$120',
      rating: 5.0,
      location: 'Gisenyi, Rwanda',
      type: 'Eco-Lodge',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'acc-4',
      title: 'Cultural Huye Guesthouse',
      price: '$60',
      rating: 4.88,
      location: 'Huye, Rwanda',
      type: 'Cultural Stay',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Premium Stays</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-text">Find Your <span className="text-primary italic">Perfect</span> Stay</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-xl font-medium hover:bg-bg transition-colors">
              <Filter size={20} />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-xl font-medium hover:bg-bg transition-colors">
              <SlidersHorizontal size={20} />
              Sort
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ListingCard {...listing} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
