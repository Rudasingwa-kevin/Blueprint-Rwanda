import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronRight, Bed, Car, Map } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background - Video Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-text/50 via-text/20 to-bg z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-landscape-4028-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
              Experience the Heart of <span className="text-secondary italic">Rwanda</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-surface/90 font-light max-w-2xl mx-auto">
              Discover unique stays, breathtaking places, and seamless car rentals for your next adventure.
            </p>

            {/* Search Bar - Premium Glassmorphism */}
            <div className="glass p-2 rounded-2xl md:rounded-pill flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto shadow-2xl border border-white/20">
              <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-white/10 w-full">
                <Search className="text-primary w-5 h-5 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Where would you like to go?" 
                  className="bg-transparent border-none outline-none w-full text-text placeholder:text-text/50 font-medium"
                />
              </div>
              <button className="bg-primary text-secondary px-10 py-4 rounded-pill font-bold hover:bg-primary-dark transition-all w-full md:w-auto shadow-lg">
                Explore Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories / Services Section */}
      <section className="py-24 container overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">Our Premium Services</h2>
            <p className="text-text-muted text-lg">Curated experiences tailored to make your journey in Rwanda truly unforgettable.</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group">
            All Services <ChevronRight className="group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Accommodation', icon: Bed, desc: 'Luxury apartments to cozy guesthouses.', color: 'bg-primary/10', text: 'text-primary' },
            { title: 'Rent a Car', icon: Car, desc: 'Reliable vehicles for every destination.', color: 'bg-accent/10', text: 'text-accent' },
            { title: 'Places to Visit', icon: Map, desc: 'Guided tours and hidden local gems.', color: 'bg-secondary/20', text: 'text-text-muted' },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -10 }}
              className="bg-surface p-8 rounded-3xl border border-border hover:shadow-xl transition-all"
            >
              <div className={`${service.color} ${service.text} p-4 rounded-2xl w-fit mb-6`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">{service.title}</h3>
              <p className="text-text-muted mb-6">{service.desc}</p>
              <button className="text-primary font-bold flex items-center gap-2 group">
                Browse <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
