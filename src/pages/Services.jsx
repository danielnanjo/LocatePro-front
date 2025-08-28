import React from 'react';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';
import { FaPlane, FaShip, FaTruckFast, FaWarehouse, FaRoad } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  const servicesList = [
    {
      title: 'Air Freight',
      description: 'The fastest way to get your time-sensitive and high-value shipments to any corner of the globe. Our extensive network ensures swift and secure delivery.',
      icon: <FaPlane className="text-3xl text-blue-600" />,
      image: 'https://i.pinimg.com/736x/d8/3b/b4/d83bb44713e1ea16bb4234d4b86501f2.jpg',
    },
    {
      title: 'Ocean Freight',
      description: 'The most cost-effective solution for large-volume and heavy shipments. We handle full container loads (FCL) and less-than-container loads (LCL) with reliable scheduling.',
      icon: <FaShip className="text-3xl text-blue-600" />,
      image: 'https://i.pinimg.com/736x/d6/66/7e/d6667e09e85c0b603a0ec65bcd0a75a7.jpg',
    },
    {
      title: 'Land Freight',
      description: 'Flexible and efficient road and rail transport for domestic and cross-border deliveries. Perfect for last-mile delivery and regional distribution.',
      icon: <FaTruckFast className="text-3xl text-blue-600" />,
      image: 'https://i.pinimg.com/736x/4c/49/bd/4c49bda300b8b9eece550f815fff24a1.jpg',
    },
    {
      title: 'Warehousing & Distribution',
      description: 'Secure, modern, and strategically located warehouses to manage your inventory and optimize your supply chain. We offer pick-and-pack, storage, and cross-docking services.',
      icon: <FaWarehouse className="text-3xl text-blue-600" />,
      image: 'https://i.pinimg.com/1200x/f7/40/0a/f7400ab0ff596da7a741ddf131fe9b87.jpg',
    },
  ];

  return (
    <div className="services-page relative min-h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center text-center bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Our Global <span className="text-blue-600">Logistics</span> Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            We provide a comprehensive suite of courier and freight services, offering seamless delivery by air, sea, and land to meet your every need.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Services Grid */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-6 text-center shadow-xl flex flex-col items-center"
              >
                <div className="mb-4 flex justify-center text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="relative w-full h-40 mt-4 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Trust Us with Your Shipments?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <FaWarehouse className="text-5xl text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Global Reach</h3>
              <p className="text-gray-600">Our vast network spans over 150 countries, ensuring your package can get anywhere it needs to go.</p>
            </motion.div>
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <FaTruckFast className="text-5xl text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">On-Time Delivery</h3>
              <p className="text-gray-600">We are committed to punctuality, with a proven track record of meeting deadlines and exceeding expectations.</p>
            </motion.div>
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <FaRoad className="text-5xl text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Secure & Reliable</h3>
              <p className="text-gray-600">Your cargo is our priority. We use advanced security measures to protect your shipments from origin to destination.</p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action section */}
        <section className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card bg-gradient-to-br from-white to-blue-50 p-12 rounded-2xl shadow-xl border border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Ship with Confidence?</h2>
            <p className="text-lg mb-6 text-gray-600">Get a free, no-obligation quote for your next shipment today.</p>
            <Link
              to="/contact"
              className="btn bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}