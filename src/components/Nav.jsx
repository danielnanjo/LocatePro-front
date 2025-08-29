import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// The main navigation component for the website.
// This component provides a responsive and animated navigation bar
// that perfectly complements the glassmorphic design from the global stylesheet.
export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Define the navigation links for the website.
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/track', label: 'Track' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
    { to: '/payments', label: 'Payments' },
  ];

  return (
    // Main navigation container with a glassmorphic background and shadow.
    <nav className="fixed top-0 z-50 w-full bg-white/40 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and site title, styled for a premium look. */}
        <Link
  to="/"
  className="flex items-center gap-3 font-bold transition-transform duration-300 hover:scale-105"
  onClick={() => setOpen(false)}
>
  {/* Modern and clean logo design */}
  <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1 shadow-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  </div>
  {/* Company name with clear typography */}
  <div className="flex flex-col items-start leading-none">
    <span className="text-xl font-extrabold text-gray-800">
      Locate Pro
    </span>
    <span className="text-sm font-semibold text-gray-600">
      Logistics
    </span>
  </div>
</Link>

        {/* Hamburger button for mobile, with animated lines. */}
        <button
          className="group relative z-50 block md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          {/* Top line of the hamburger menu */}
          <span
            className={`block h-1 w-8 rounded-full bg-[#0057ff] transition-all duration-300
              ${open ? 'translate-y-2 rotate-45' : 'translate-y-0'}`}
          />
          {/* Middle line of the hamburger menu, fades out on open */}
          <span
            className={`my-1 block h-1 w-8 rounded-full bg-[#0057ff] transition-all duration-300
              ${open ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* Bottom line of the hamburger menu */}
          <span
            className={`block h-1 w-8 rounded-full bg-[#0057ff] transition-all duration-300
              ${open ? '-translate-y-2 -rotate-45' : 'translate-y-0'}`}
          />
        </button>

        {/* Navigation links container. It's a glassmorphic element that
            appears on mobile with a smooth animation. */}
        <div
          className={`glass-card navbar-links absolute md:static top-16 right-0 w-full md:w-auto p-4 transition-all duration-300 ${
            open ? 'flex animate-fadeInMenu flex-col' : 'hidden md:flex'
          } items-center justify-center gap-4 text-center text-gray-800`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors duration-200 hover:text-[#00eaff]
              ${
                pathname === link.to
                  ? 'text-[#0057ff]'
                  : 'text-gray-700'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

