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
          className="flex items-center gap-2 font-bold text-gray-800 transition-transform duration-300 hover:scale-105"
          onClick={() => setOpen(false)}
        >
          {/* A simple SVG logo for consistent, fast rendering. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-[#00eaff]"
          >
            <path d="M12.972 2.164a1 1 0 0 0-1.944 0l-4.5 9a1 1 0 0 0-.063.14l-4.25 9.176a1 1 0 0 0 .907 1.49l18.5 0.024a1 1 0 0 0 .907-1.49l-4.25-9.176a1 1 0 0 0-.063-.14l-4.5-9ZM12 4.416 15.65 11.83 17.65 16h-3.3l-2.35-4.7L12 4.416Zm-1 0-1.65 3.3-2.35 4.7-3.3 0 2-4.17L11 4.416Zm4.3 11.584 1.35-3.08 2.5-5.38 2.1-1.07-1.85 4.02-3.1 6.51h-1Zm-10.6 0h-1l-1.9-4.02 1.9-4.02 1.35 3.08 3.1 6.51Z" />
          </svg>
          <span className="tracking-wide text-gray-800">LocatePro</span>
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

