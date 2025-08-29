import React from 'react';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaBuildingColumns } from 'react-icons/fa6';
import { SiVenmo, SiCashapp, SiApplepay, SiChime, SiZelle } from 'react-icons/si';
import { FaGiftcard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const paymentMethods = [
  {
    title: 'Card & Digital Wallets',
    description: 'Pay securely via Visa, Mastercard, Amex, and major wallets. Fast, encrypted, and convenient for all clients.',
    icon: <FaCreditCard className="text-3xl text-blue-700" />,
  },
  {
    title: 'Venmo',
    description: 'Send money instantly with your Venmo account. Simply scan our QR code or use our Venmo handle.',
    icon: <SiVenmo className="text-3xl text-blue-700" />,
  },
  {
    title: 'Cash App',
    description: 'A quick and easy way to send funds directly from your Cash App balance. Scan our QR or use our Cashtag.',
    icon: <SiCashapp className="text-3xl text-blue-700" />,
  },
  {
    title: 'Apple Pay',
    description: 'Secure, contactless payments for Apple users. Pay directly and conveniently from your iPhone or Apple Watch.',
    icon: <SiApplepay className="text-3xl text-blue-700" />,
  },
  {
    title: 'Zelle',
    description: 'Fast, free payments directly from your bank account. Use our phone number or email to send money via Zelle.',
    icon: <SiZelle className="text-3xl text-blue-700" />,
  },
  {
    title: 'Chime',
    description: 'Send and receive money with your Chime account. Transfer funds to our account for a quick and seamless transaction.',
    icon: <SiChime className="text-3xl text-blue-700" />,
  },
  {
    title: 'Gift Card',
    description: 'Redeem gift cards or e-gift cards for payment. Simply enter your gift card details during checkout.',
    icon: <FaGiftcard className="text-3xl text-blue-700" />,
  },
  {
    title: 'Bank Transfer',
    description: 'For corporate and high-value transactions, direct bank transfer ensures traceability and compliance. Bank details provided on request.',
    icon: <FaBuildingColumns className="text-3xl text-blue-700" />,
  },
  {
    title: 'PayPal',
    description: 'Use PayPal for global, protected payments. We send secure requests directly to your account.',
    icon: <FaPaypal className="text-3xl text-blue-700" />,
  },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative overflow-x-hidden">
      {/* Subtle floating particles for realism */}
      <div className="particle-bg">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${28 + Math.random() * 32}px`,
              height: `${28 + Math.random() * 32}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 95}%`,
              background: i % 2 === 0
                ? 'linear-gradient(90deg,#1a2a6c,#00c9ff)'
                : 'linear-gradient(120deg,#5f6caf,#00c9ff)',
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <Nav />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 flex items-center justify-center text-center bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Seamless <span className="text-blue-700">Payments</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Secure, professional payment options for all your logistics needs.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <p className="text-center max-w-2xl mx-auto mb-16 text-gray-600">
          We prioritize security and simplicity. Our payment team ensures every transaction is clear, transparent, and trustworthy.
        </p>

        {/* Payment Methods Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">Secure Payment Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card border border-gray-200 p-6 text-center shadow-xl flex flex-col items-center"
              >
                <div className="mb-4 flex justify-center text-blue-700">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card bg-gradient-to-br from-gray-50 to-blue-50 p-10 rounded-2xl shadow-xl border border-gray-200 inline-block"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Ready to Get a Quote or Pay an Invoice?</h2>
            <p className="text-lg mb-6 text-gray-600">
              For new shipments, contact our team for a detailed quote. Existing clients receive secure, itemized invoices with clear payment instructions.
            </p>
            <Link
              to="/contact"
              className="btn px-8 py-4 text-base font-bold"
            >
              Contact Us
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}