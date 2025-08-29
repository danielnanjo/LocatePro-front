import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Global Shipment Tracking',
    desc: 'Track your packages and freight worldwide with instant location updates and delivery status.',
    icon: 'https://i.pinimg.com/736x/24/55/5f/24555f694a8fb6a1ad7a074581c7cdfc.jpg',
  },
  {
    title: 'Multi-Carrier Support',
    desc: 'LocatePro supports all major couriers including DHL, FedEx, UPS, Maersk, and more.',
    icon: 'https://i.pinimg.com/736x/cc/86/c7/cc86c7e68357ad9961556fa2f5d72479.jpg',
  },
  {
    title: 'Enterprise-Grade Security',
    desc: 'Your data is protected with bank-level encryption, GDPR compliance, and 24/7 monitoring.',
    icon: 'https://i.pinimg.com/736x/4b/2f/0d/4b2f0d22d18cab030f82e946d4fde8bd.jpg',
  },
  {
    title: 'Reliable Notifications',
    desc: 'Get timely email and SMS alerts for every shipment milestone and delivery update.',
    icon: 'https://i.pinimg.com/1200x/32/5e/d7/325ed79775607026645a017fda26aa61.jpg',
  },
  {
    title: 'Easy Integration',
    desc: 'Connect LocatePro to your business systems via our robust API and webhooks.',
    icon: 'https://i.pinimg.com/736x/7e/03/82/7e038295cc624291af9ca1b97223ab4c.jpg',
  },
  {
    title: 'Dedicated Support',
    desc: 'Our expert team is available 24/7 to assist you with any tracking or account issues.',
    icon: 'https://i.pinimg.com/1200x/8a/96/94/8a969451593fd96775c366060f58d7b2.jpg',
  },
]

const stats = [
  { label: 'Shipments Tracked', value: '500,000+' },
  { label: 'Active Users', value: '7,000+' },
  { label: 'Supported Couriers', value: '30+' },
  { label: 'Countries Covered', value: '120+' },
  { label: 'Avg. Delivery Accuracy', value: '99.7%' },
  { label: 'Data Breaches', value: '0' },
]

const couriers = [
  { name: 'DHL', logo: 'https://i.pinimg.com/1200x/2b/33/b3/2b33b3b76ada5dbb70d96d971c965dca.jpg' },
  { name: 'FedEx', logo: 'https://i.pinimg.com/1200x/97/e3/cf/97e3cf93e846dc5021dad37ed3deaa52.jpg' },
  { name: 'UPS', logo: 'https://i.pinimg.com/1200x/9a/02/ad/9a02ade5ff50a8e50b21a4827a1c3917.jpg' },
  { name: 'Maersk', logo: 'https://i.pinimg.com/1200x/b2/c4/75/b2c47588432f7a0a2d09fd083394136c.jpg' },
  { name: 'USPS', logo: 'https://i.pinimg.com/736x/d7/4f/d2/d74fd2f2b789eebcb88d43877b49ce66.jpg' },
]

const highlights = [
  {
    icon: 'https://i.pinimg.com/1200x/18/3e/56/183e56f7eee99fadbd4199f58e990885.jpg',
    title: 'ISO 27001 Certified',
    desc: 'Industry-leading security standards for your peace of mind.',
    background: 'https://i.pinimg.com/736x/19/0b/55/190b5513e0f0a0c4d7d4360a2355c7e9.jpg',
  },
  {
    icon: 'https://i.pinimg.com/1200x/ec/0e/a8/ec0ea81f4f14751541f28d885295b446.jpg',
    title: '99.7% Uptime',
    desc: 'Our platform is monitored 24/7 for maximum reliability.',
    background : 'https://i.pinimg.com/736x/64/7e/5f/647e5f7b1cbd9d637cf5fc006514426f.jpg',
  },
  {
    icon: 'https://i.pinimg.com/1200x/da/01/51/da01517aad5159e4923c4b3ab81c66d9.jpg',
    title: '24/7 Live Support',
    desc: 'Get help anytime from our logistics experts.',
    background : 'https://i.pinimg.com/736x/d0/f8/a9/d0f8a97e1f7d4274fb23f4013626755f.jpg',
  },
]

const testimonials = [
  {
    name: "Sarah O.",
    company: "EcomXpress",
    text: "LocatePro transformed our logistics. Real-time tracking and beautiful dashboard make our work effortless.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "James T.",
    company: "Global Freight",
    text: "The glassmorphic UI and instant notifications are game-changers. Our customers love it.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya S.",
    company: "RetailHub",
    text: "Support is always available and the analytics are top-notch. LocatePro is truly premium.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
]

const galleryImages = [
  "https://i.pinimg.com/736x/46/06/e6/4606e6ed6db487e57590e5e9e76fc66b.jpg",
  "https://i.pinimg.com/1200x/64/a8/f3/64a8f378378aa61f58ee9109bfbea45b.jpg",
  "https://i.pinimg.com/736x/6f/30/fb/6f30fb421a032706180b6dcece7b3a7f.jpg",
  "https://i.pinimg.com/1200x/88/8f/49/888f49e8e97e96034f433878557324a9.jpg",
  "https://i.pinimg.com/1200x/1b/6c/cc/1b6ccc394378df1ef1dbaffb806218c1.jpg",
  "https://i.pinimg.com/736x/4c/40/93/4c409323e7d2315595aaf41d51a2036e.jpg",
]

const faqs = [
  {
    question: "How do I track my shipment?",
    answer: "Simply enter your tracking number on our Track page to view the latest status and location of your package.",
  },
  {
    question: "Which couriers are supported?",
    answer: "LocatePro supports over 50 global and regional couriers including DHL, FedEx, UPS, Maersk, USPS, and more.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We use bank-level encryption, are ISO 27001 certified, and never share your data with third parties.",
  },
  {
    question: "Can I get notifications?",
    answer: "Yes! Enable email or SMS alerts to receive updates at every shipment milestone.",
  },
  {
    question: "How do I contact support?",
    answer: "Our support team is available 24/7 via live chat, email, and phone. See the Contact section below.",
  },
]

const howItWorks = [
  {
    step: 1,
    title: "Enter Tracking Number",
    desc: "Go to the Track page and input your shipment's tracking number.",
    icon: "https://i.pinimg.com/1200x/97/45/6b/97456bb29a589e7d4b39427d6b5d6e1c.jpg",
  },
  {
    step: 2,
    title: "View Shipment Details",
    desc: "See the latest status, location, and estimated delivery date for your package.",
    icon: "https://i.pinimg.com/1200x/a6/f6/55/a6f6551e6d36fd37eb69a7637632f552.jpg",
  },
  {
    step: 3,
    title: "Get Notifications",
    desc: "Enable alerts to receive real-time updates on your shipment's progress.",
    icon: "https://i.pinimg.com/1200x/63/10/62/6310626d936c5ece5c70bd2ed7b37673.jpg",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      
      {/* Floating particles background */}
      <div className="particle-bg">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${32 + Math.random() * 48}px`,
              height: `${32 + Math.random() * 48}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 95}%`,
              background: i % 2 === 0
                ? 'linear-gradient(90deg,#0057ff,#00eaff)'
                : 'linear-gradient(120deg,#7c3aed,#00eaff)',
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <Nav />

      {/* Hero Section */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-500 text-transparent bg-clip-text mb-6">
            LocatePro Logistics
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-8">
            Luxury-level shipment tracking. Real-time updates. Beautiful analytics. All in one immersive dashboard.
          </p>
          <div className="flex gap-4">
            <Link
              to="/track"
              className="btn shadow-xl"
            >
              Track Shipment
            </Link>
            <a
  href="mailto:support@locatepro.com?subject=Account%20Inquiry&body=Hi%20LocatePro%2C%0A%0AI'd%20like%20to%20inquire%20about%20setting%20up%20logistics%20support.%20Here%20are%20my%20details%3A%0A- Name%3A%20%0A- Company%3A%20%0A- Phone%3A%20%0A%0AThanks!"
  className="btn bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
>
  Email Us
</a>

          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <div className="glass-card p-2 shadow-xl">
            <img
              src="https://i.pinimg.com/1200x/08/e7/93/08e79344eed9c4aadd673ae653221619.jpg"
              alt="Dashboard preview"
              className="rounded-2xl object-cover w-full max-w-md aspect-video"
            />
          </div>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="kpi-card px-8 py-6 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">{stat.value}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Couriers Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text">
          Supported Couriers
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {couriers.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={c.logo} alt={c.name} className="h-10 object-contain grayscale opacity-80 mb-1" />
              <span className="text-xs text-gray-500">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card px-8 py-6 text-center max-w-xs"
              style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), url(${h.background})` }}
            >
              <img src={h.icon} alt={h.title} className="w-12 h-12 mb-3 object-contain" />
              <div className="text-lg font-bold text-blue-600">{h.title}</div>
              <div className="text-gray-700 mt-2">{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text">
          Why Choose LocatePro?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <img src={f.icon} alt={f.title} className="w-16 h-16 mb-3 object-contain" />
              <h3 className="font-semibold text-lg text-blue-600">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-500 text-transparent bg-clip-text">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-3 shadow-xl border-4 border-cyan-400" />
              <p className="text-gray-700 italic mb-3">"{t.text}"</p>
              <div className="font-semibold text-blue-600">{t.name}</div>
              <div className="text-sm text-gray-500">{t.company}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card overflow-hidden p-2"
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="rounded-xl w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <img src={step.icon} alt={step.title} className="w-14 h-14 mb-3 object-contain" />
              <div className="text-cyan-400 font-bold text-xl mb-1">Step {step.step}</div>
              <h3 className="font-semibold text-lg text-blue-600">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold text-blue-600">{faq.question}</h3>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text"
        >
          Contact Us
        </motion.h2>
        <div className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-blue-600 mb-2">Customer Service</h3>
            <p className="text-gray-700 mb-2">Email: <a href="mailto:support@locatepro.com" className="underline text-cyan-500">support@locatepro.com</a></p>
            <p className="text-gray-700 mb-2">Phone: <a href="tel:+1234567890" className="underline text-cyan-500">+1 (234) 567-890</a></p>
            <p className="text-gray-700">Live Chat: Available 24/7 (see bottom right)</p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-600 mb-2">Business Inquiries</h3>
            <p className="text-gray-700 mb-2">Email: <a href="mailto:business@locatepro.com" className="underline text-cyan-500">business@locatepro.com</a></p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card inline-block px-8 py-8 shadow-xl"
        >
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 text-transparent bg-clip-text">Ready to get started?</h3>
          <p className="mb-4 text-gray-700">Sign up now and experience premium logistics tracking.</p>
          <Link
            to="/signup"
            className="btn"
          >
            Create Account
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white p-8 md:p-12 lg:p-16 rounded-t-3xl shadow-xl border-t-2 border-slate-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Company Info / Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#" className="text-3xl font-bold tracking-tight text-teal-400 hover:text-teal-300 transition-colors duration-300">
            YourBrand
          </a>
          <p className="mt-2 text-sm text-slate-400 max-w-sm">
            Crafting beautiful and functional digital experiences.
          </p>
          
          {/* New secure/support section */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <img src="https://i.pinimg.com/736x/49/e6/52/49e65204f855f1c5e85149473e19ea1c.jpg" alt="Secure & Encrypted" className="h-6 w-6 rounded-full" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://i.pinimg.com/1200x/09/8e/92/098e92110a2160252f007de814230828.jpg" alt="24/7 Support" className="h-6 w-6 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
          <a href="/about" className="text-slate-300 hover:text-white transition-colors duration-300">
            About
          </a>
          <a href="./Services.jsx" className="text-slate-300 hover:text-white transition-colors duration-300">
            Services
          </a>
          <a href="./Blog.jsx" className="text-slate-300 hover:text-white transition-colors duration-300">
            Blog
          </a>
          <a href="/contact" className="text-slate-300 hover:text-white transition-colors duration-300">
            Contact
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-end">
          <Link
              to="/contact" // You can create a quote page or a contact page route
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Get a Quote
            </Link>
          <Link
  to="/contact" // Assuming you want to link to the contact page
  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
>
  Learn More
</Link>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-8 pt-6 border-t border-slate-700 text-center text-slate-500 text-sm">
        &copy; 2016 YourBrand. All Rights Reserved.
      </div>
    </footer>
    </div>
  )
}