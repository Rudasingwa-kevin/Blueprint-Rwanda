import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-text text-surface pt-16 pb-8">
      <div className="container overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <Landmark className="text-secondary w-8 h-8" />
              <span className="text-secondary font-heading font-bold text-2xl tracking-tight">
                Blueprint Rwanda
              </span>
            </Link>
            <p className="text-secondary/70 max-width-xs">
              Your trusted partner for discovering the best of Rwanda. Unforgettable journeys start here.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-text-muted/20 border border-text-muted/30 rounded-lg hover:bg-primary hover:text-secondary transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link to="/accommodation" className="hover:text-primary transition-colors">Accommodation</Link></li>
              <li><Link to="/rent-car" className="hover:text-primary transition-colors">Car Rentals</Link></li>
              <li><Link to="/visit" className="hover:text-primary transition-colors">Tours & Experiences</Link></li>
              <li><Link to="/partners" className="hover:text-primary transition-colors">Partnership</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-secondary font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/faq" className="hover:text-primary transition-colors">Common Questions</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/owners" className="hover:text-primary transition-colors">Property Owners</Link></li>
              <li><Link to="/team" className="hover:text-primary transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-secondary font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-secondary/70">
                <Mail size={20} className="text-primary" />
                <span>info@blueprintrwanda.com</span>
              </li>
              <li className="flex gap-3 text-secondary/70">
                <Phone size={20} className="text-primary" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex gap-3 text-secondary/70">
                <MapPin size={20} className="text-primary" />
                <span>KG 123 St, Kigali, Rwanda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-text-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary/50 text-sm">
          <p>&copy; 2026 Blueprint Rwanda. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
