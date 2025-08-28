import React from 'react';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com/' },
    { name: 'Facebook', icon: <FaFacebookF />, url: 'https://facebook.com/' },
  ];

  return (
    <div className="contact-page relative min-h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />

      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center text-center bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            We're here to help! Whether you have a question, need support, or want to partner with us, our team is ready to assist.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card bg-white/70 backdrop-blur-md p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-xl text-blue-600" />
                <span><a href="mailto:support@locatepro.com" className="hover:underline">support@locatepro.com</a></span>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhone className="text-xl text-blue-600" />
                <span><a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></span>
              </li>
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-xl text-blue-600" />
                <span>123 Logistics St, Suite 456, Global City, Country</span>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition">
                    <div className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-transform hover:scale-110">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card bg-white/70 backdrop-blur-md p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Type your message here..."
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-full px-5 py-3 text-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}