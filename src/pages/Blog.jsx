import React from 'react';
import Nav from '../components/Nav.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShareAlt, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

// Animation variants for blog cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Logistics: Navigating Supply Chain in a 3D World',
    author: 'Jane Doe',
    date: 'Aug 27, 2025',
    readingTime: '7 min read',
    excerpt: 'Explore how real-time, 3D visualization is transforming the logistics industry, providing unprecedented transparency and efficiency.',
    tags: ['Technology', 'Logistics', 'Innovation'],
    image: 'https://i.pinimg.com/1200x/c4/f2/4a/c4f24a3f722aee5adb5fd091ad6b0037.jpg',
  },
  {
    id: 2,
    title: 'Sustainable Shipping: How to Reduce Your Carbon Footprint',
    author: 'John Smith',
    date: 'Aug 20, 2025',
    readingTime: '5 min read',
    excerpt: 'Learn about the latest trends in eco-friendly shipping and how companies are adopting sustainable practices to protect our planet.',
    tags: ['Sustainability', 'Environment', 'Shipping'],
    image: 'https://i.pinimg.com/736x/af/c6/0a/afc60a08e2d2596604b74dc38a89117d.jpg',
  },
  {
    id: 3,
    title: 'Navigating Customs: A Guide to Hassle-Free International Shipments',
    author: 'Emily White',
    date: 'Aug 15, 2025',
    readingTime: '10 min read',
    excerpt: 'This comprehensive guide covers everything you need to know about international customs, from documentation to duties and taxes.',
    tags: ['International', 'Customs', 'Guide'],
    image: 'https://i.pinimg.com/736x/2d/9c/ed/2d9cedf61a023086288ee4dcbe3863f1.jpg',
  },
  {
    id: 4,
    title: 'Leveraging AI and Machine Learning in Supply Chain Management',
    author: 'Michael Brown',
    date: 'Aug 10, 2025',
    readingTime: '8 min read',
    excerpt: 'Discover how artificial intelligence is optimizing routes, predicting delays, and automating tasks for a smarter supply chain.',
    tags: ['AI', 'Data', 'Technology'],
    image: 'https://i.pinimg.com/564x/41/70/4e/41704e6c278c772e272635ddf7918a38.jpg',
  },
  {
    id: 5,
    title: 'Case Study: A Successful Cross-Continent Freight Project',
    author: 'LocatePro Team',
    date: 'Aug 05, 2025',
    readingTime: '6 min read',
    excerpt: 'A detailed look at a recent project where our team successfully managed a complex shipment from Asia to Europe, showcasing our expertise.',
    tags: ['Case Study', 'Freight', 'Logistics'],
    image: 'https://i.pinimg.com/564x/87/02/b0/8702b0c3608b63e18cfdd54900a6c6a4.jpg',
  },
];

// Helper to generate shareable URL
const getShareUrl = (title) => {
  return `https://yourdomain.com/blog/${title.toLowerCase().replace(/ /g, '-')}`;
};

export default function Blog() {
  return (
    <div className="blog-page relative min-h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      {/* Subtle background particles */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />

      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center text-center bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Insights from the <span className="text-blue-600">Logistics World</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Stay ahead with our latest articles on technology, trends, and best practices in global shipping and supply chain management.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="glass-card bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl overflow-hidden flex flex-col"
            >
              <div className="w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/E5E7EB/4B5563?text=Image+Unavailable';
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 font-semibold transition-colors duration-200 hover:text-blue-800"
                  >
                    Read Article &rarr;
                  </Link>
                  <div className="flex gap-3 text-gray-500">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl(post.title))}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                      className="hover:text-blue-400 transition-colors"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl(post.title))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      className="hover:text-blue-400 transition-colors"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(getShareUrl(post.title))}`}
                      aria-label="Share via Email"
                      className="hover:text-blue-400 transition-colors"
                    >
                      <FaShareAlt />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="btn bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-300">
            Load More Posts
          </button>
        </div>
      </main>
    </div>
  );
}