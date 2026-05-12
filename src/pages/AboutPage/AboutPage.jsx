import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  GitBranch,
  Network,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const AboutPage = () => {
  const { theme } = useTheme();

  const stats = [
    { value: '10K+', label: 'Customers', icon: Users },
    { value: '5K+', label: 'Products', icon: Package },
    { value: '4.8', label: 'Rating', icon: Star },
    { value: 'Fast', label: 'Delivery', icon: Truck },
  ];

  const values = [
    { title: 'Quality Guaranteed', text: 'Every product is selected with care and checked for lasting value.', icon: ShieldCheck },
    { title: 'Fast Shipping', text: 'Reliable delivery keeps your shopping experience smooth from cart to door.', icon: Truck },
    { title: '24/7 Support', text: 'Our team is ready to help whenever you need guidance or updates.', icon: Headphones },
  ];

  const team = [
    { name: 'Nadia Hassan', role: 'Founder' },
    { name: 'Omar Youssef', role: 'Operations Lead' },
    { name: 'Maya Adel', role: 'Customer Success' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`${theme.bg} ${theme.text} min-h-screen font-poppins pb-24 md:pb-0 transition-colors duration-300`}
    >
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-20 px-8 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-100 max-w-xl mx-auto"
        >
          Your trusted destination for quality products
        </motion.p>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-12">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${theme.card} rounded-2xl p-6 text-center shadow-sm`}
            >
              <div className="text-blue-500 flex justify-center mb-3">
                <Icon size={32} />
              </div>
              <h3 className={`text-2xl font-bold ${theme.text}`}>
                {value}
              </h3>
              <p className={`text-sm ${theme.textSecondary}`}>
                {label}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Our Mission</h2>
            <p className={`leading-7 ${theme.textSecondary}`}>
              We provide the best shopping experience by connecting customers with reliable products,
              thoughtful service, and a simple path from discovery to delivery.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://picsum.photos/seed/about-store/720/480"
            alt="Store team preparing products"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-sm"
          />
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${theme.text}`}>Our Values</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map(({ title, text, icon: Icon }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${theme.card} rounded-2xl p-6 shadow-sm`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className={`font-bold mb-2 ${theme.text}`}>{title}</h3>
                <p className={`text-sm leading-6 ${theme.textSecondary}`}>{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={`text-3xl font-bold text-center mb-8 ${theme.text}`}>Our Team</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${theme.card} rounded-2xl p-6 text-center shadow-sm`}
              >
                <img
                  src={`https://picsum.photos/seed/team-${index}/160/160`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500"
                />
                <h3 className={`font-bold ${theme.text}`}>{member.name}</h3>
                <p className={`text-sm mb-4 ${theme.textSecondary}`}>{member.role}</p>
                <div className="flex justify-center gap-3 text-blue-500">
                  <GitBranch size={18} />
                  <Network size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage;
