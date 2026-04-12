import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,284', change: '+12%', positive: true, icon: Users },
    { title: 'Active Listings', value: '452', change: '+5%', positive: true, icon: Home },
    { title: 'Total Bookings', value: '890', change: '-2%', positive: false, icon: ShoppingCart },
    { title: 'Monthly Revenue', value: '$45,200', change: '+18%', positive: true, icon: DollarSign },
  ];

  return (
    <div className="pt-32 pb-24 container">
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-heading font-bold text-text mb-2">Admin Dashboard</h1>
          <p className="text-text-muted">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="bg-primary text-secondary px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2">
          Download Report
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border p-6 rounded-3xl shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-text-muted text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-text font-heading">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-heading font-bold text-text">Recent Activity</h2>
          <button className="text-primary font-bold text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg/50 text-text-muted text-xs uppercase tracking-wider">
                <th className="px-8 py-4 font-bold">User</th>
                <th className="px-8 py-4 font-bold">Activity</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold">Date</th>
                <th className="px-8 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="hover:bg-bg/20 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                        JD
                      </div>
                      <div>
                        <div className="font-bold text-text">John Doe</div>
                        <div className="text-xs text-text-muted">john@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-text-muted">
                    Booked "Kigali View Apartment"
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-pill text-xs font-bold">
                      Completed
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-text-muted">
                    April 12, 2026
                  </td>
                  <td className="px-8 py-5 text-right text-text-muted">
                    <button className="hover:text-primary"><MoreHorizontal size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
