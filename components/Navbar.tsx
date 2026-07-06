'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('About');
  const navItems = ['About', 'Explore', 'Districts', 'Gallery', 'Contact'];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
      role="banner"
    >
      <a
        href="#about"
        onClick={() => setActiveItem('About')}
        className="flex items-center gap-2 cursor-pointer group outline-none rounded p-1 pointer-events-auto"
        aria-label="The Living Journal of Nepal Home"
      >
        <Compass className="w-4 h-4 text-[#8C5442] group-hover:rotate-45 transition-transform duration-500 ease-out" />
        <span className="text-xs font-serif uppercase tracking-[0.4em] text-[#2A1D13] group-hover:text-[#8C5442] transition-colors font-bold">
          The Journal
        </span>
      </a>

      {/* Leather/Woodblock styled bookmark navbar */}
      <nav className="hidden md:flex items-center gap-1 bookmark-strip px-4 py-2.5 rounded-b-lg pointer-events-auto" role="navigation">
        {navItems.map((item) => {
          const isActive = activeItem === item;
          return (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveItem(item)}
              className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#F2E6C9]/80 hover:text-white transition-colors duration-300 relative py-1.5 px-4 outline-none rounded focus-visible:ring-1 focus-visible:ring-[#B38A3A]"
            >
              <span className="relative z-10">{item}</span>
              {isActive && (
                <motion.span
                  layoutId="activeBookmarkGlow"
                  className="absolute inset-0 bg-white/5 rounded z-0 border-b border-[#B38A3A]"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </a>
          );
        })}
      </nav>

      <div className="pointer-events-auto">
        <a
          href="#explore"
          className="stamp-button px-6 py-2.5 rounded relative overflow-hidden outline-none block"
        >
          <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-serif font-bold">
            Examine Records
          </span>
        </a>
      </div>
    </motion.header>
  );
}