import React from 'react';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaAward, FaHandshake, FaGlobe, FaCubes, FaHeadset, FaShieldHalved } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const missionFeatures = [
    {
      title: 'Innovation',
      description: 'We continuously innovate our platform to meet the evolving demands of the global supply chain, leveraging the latest technology for smarter, faster deliveries.',
      icon: <FaLightbulb className="text-3xl text-blue-600" />,
    },
    {
      title: 'Reliability',
      description: 'Our commitment to reliability means you can trust us with your most critical shipments. We provide secure and dependable service from start to finish.',
      icon: <FaHandshake className="text-3xl text-blue-600" />,
    },
    {
      title: 'Transparency',
      description: 'With real-time tracking and comprehensive updates, we provide full transparency, giving you peace of mind and complete control over your logistics.',
      icon: <FaGlobe className="text-3xl text-blue-600" />,
    },
  ];

  const whyChooseFeatures = [
    {
      title: 'Real-Time Tracking',
      description: 'Always know where your shipment is with our advanced GPS and sensor technology.',
      icon: <FaCubes className="text-5xl text-blue-600" />,
    },
    {
      title: 'Global Network',
      description: 'A vast network covering every major port and city, ensuring your delivery arrives on time, every time.',
      icon: <FaGlobe className="text-5xl text-blue-600" />,
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated team is always available to assist you with any questions or concerns, day or night.',
      icon: <FaHeadset className="text-5xl text-blue-600" />,
    },
    {
      title: 'Secure Solutions',
      description: 'Your data and shipments are protected with bank-level security and compliance standards.',
      icon: <FaShieldHalved className="text-5xl text-blue-600" />,
    },
  ];

  return (
    <div className="about-page relative min-h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      {/* Background particles from Home.jsx */}
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center text-center bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            About <span className="text-blue-600">LocatePro</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            We are a leading logistics platform committed to providing seamless and transparent supply chain solutions for businesses of all sizes.
          </p>
          <Link to="/track" className="btn inline-flex items-center space-x-2">
            <span>Track Your Shipment</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Our Story and Team Section */}
        <section className="py-16 grid md:grid-cols-2 gap-12">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card bg-white/70 backdrop-blur-md p-8 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Founded in 2022, LocatePro has empowered thousands of companies to optimize supply chains and deliver with confidence. We combine cutting-edge technology, 3D interfaces, and world-class support to deliver a premium logistics experience.
                </p>
                <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                    <img
                        src="https://i.pinimg.com/1200x/3a/37/68/3a3768273c5346f6e0ccfc2f964175ff.jpg"
                        alt="Our Story"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </motion.div>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card bg-white/70 backdrop-blur-md p-8 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Our diverse team of engineers, designers, and logistics experts is dedicated to innovation and customer success. We value collaboration, creativity, and a relentless drive for excellence.
                </p>
                <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                    <img
                        src="https://i.pinimg.com/736x/20/f8/c5/20f8c514e3b6465630bde75bc8d592f1.jpg"
                        alt="Our Team"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </motion.div>
        </section>

        {/* Our Mission & Values Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionFeatures.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-8 flex flex-col items-center text-center gap-4 shadow-xl"
              >
                <div className="p-4 rounded-full bg-blue-50 border border-blue-100 shadow-md">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 p-6 text-center shadow-xl"
              >
                <div className="mb-4 flex justify-center text-blue-600">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Optimize Your Logistics?</h2>
            <p className="text-lg mb-6 text-gray-600">Join thousands of happy customers who trust us with their shipments every day.</p>
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