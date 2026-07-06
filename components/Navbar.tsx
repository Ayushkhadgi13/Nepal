'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface NavbarProps {
  triggerDraw: boolean;
  onComplete: () => void;
}

export default function Navbar({ triggerDraw, onComplete }: NavbarProps) {
  const [activeItem, setActiveItem] = useState('About');
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ['About', 'Explore', 'Districts', 'Gallery', 'Contact'];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hand-drawn vector paths
  const leftRollRef = useRef<SVGPathElement>(null);
  const topBorderRef = useRef<SVGPathElement>(null);
  const rightRollRef = useRef<SVGPathElement>(null);
  const bottomBorderRef = useRef<SVGPathElement>(null);
  
  const paperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Coordinated Drawing Timeline (Optimized pacing & natural path overlapping)
  useGSAP(() => {
    if (!triggerDraw) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    const getLength = (path: SVGPathElement | null) => path ? path.getTotalLength() : 0;

    // Prep lines as hidden
    gsap.set([leftRollRef.current, topBorderRef.current, rightRollRef.current, bottomBorderRef.current], {
      strokeDasharray: (i, target) => getLength(target as SVGPathElement),
      strokeDashoffset: (i, target) => getLength(target as SVGPathElement),
      opacity: 1
    });

    // Step 1: Left roll spirals are drawn
    tl.to(leftRollRef.current, {
      strokeDashoffset: 0,
      duration: 0.75,
      ease: 'power1.inOut',
    });

    // Step 2: Top line sketches
    tl.to(topBorderRef.current, {
      strokeDashoffset: 0,
      duration: 0.85,
      ease: 'sine.inOut',
    }, '-=0.15');

    // Step 3: Right roll spirals are drawn
    tl.to(rightRollRef.current, {
      strokeDashoffset: 0,
      duration: 0.75,
      ease: 'power1.inOut',
    }, '-=0.15');

    // Step 4: Bottom line sketches
    tl.to(bottomBorderRef.current, {
      strokeDashoffset: 0,
      duration: 0.85,
      ease: 'sine.inOut',
    }, '-=0.15');

    // Step 5: Interior paper texture fades in
    tl.fromTo(
      paperRef.current,
      { opacity: 0, filter: 'blur(2px)' },
      { opacity: 0.95, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
      '-=0.35'
    );

    // Step 6: Text items appear sequentially
    tl.fromTo(
      itemsRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    // Step 7: Brief pause before finalizing navbar drawing
    tl.to({}, { duration: 0.35 });

  }, { scope: containerRef, dependencies: [triggerDraw] });

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-1000 ease-in-out pointer-events-none flex flex-col items-center justify-center ${
        isScrolled ? 'pt-2' : 'pt-6'
      }`}
      role="banner"
    >
      {/* Decoupled watermarked Nepal script */}
      <div className="mb-1 select-none pointer-events-none opacity-20" aria-hidden="true">
        <span 
          className="text-xl tracking-[0.25em] font-light"
          style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            color: '#D5C4A0',
            textShadow: '1px 1px 0px rgba(255, 255, 255, 0.4), -1px -1px 0px rgba(42, 29, 19, 0.06)'
          }}
        >
          नेपाल
        </span>
      </div>

      {/* Expanded Hand-Drawn Scroll Container */}
      <div
        className={`relative pointer-events-auto h-20 w-full max-w-2xl flex items-center justify-center transition-all duration-1000 ${
          isScrolled ? 'scale-[0.96] -translate-y-2' : 'scale-100'
        }`}
        style={{
          filter: isScrolled ? 'drop-shadow(0 8px 16px rgba(42, 29, 19, 0.14))' : 'none'
        }}
      >
        {/* Parchment background overlay */}
        <div
          ref={paperRef}
          className="absolute inset-x-8 inset-y-[6px] bg-[#FAF3DE] rounded-[4px] -z-10 opacity-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(42,29,19,0.03) 100%)",
            boxShadow: 'inset 0 0 20px rgba(42, 29, 19, 0.06), 0 1px 2px rgba(42,29,19,0.1)'
          }}
        />

        {/* Modular SVG Scroll Framework */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none text-[#2A1D13] stroke-current stroke-[0.85]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 672 80"
          preserveAspectRatio="none"
        >
          {/* Path 1: Left Roll */}
          <path
            ref={leftRollRef}
            className="opacity-0"
            d="M 32,12 C 20,12 14,24 14,38 C 14,52 20,68 32,68 C 44,68 48,52 48,38 C 48,26 42,18 32,18 C 24,18 20,26 20,38 M 20,38 C 20,46 24,52 32,52 C 40,52 42,46 42,38 C 42,32 38,26 32,26 C 28,26 26,30 26,38"
          />

          {/* Path 2: Top Border */}
          <path
            ref={topBorderRef}
            className="opacity-0"
            d="M 32,12 C 140,9 280,14 360,11 C 480,9 560,14 640,12"
          />

          {/* Path 3: Right Roll */}
          <path
            ref={rightRollRef}
            className="opacity-0"
            d="M 640,12 C 652,12 658,24 658,38 C 658,52 652,68 640,68 C 628,68 624,52 624,38 C 624,26 630,18 640,18 C 648,18 652,26 652,38 M 652,38 C 652,46 648,52 640,52 C 632,52 630,46 630,38 C 630,32 634,26 640,26 C 644,26 646,30 646,38"
          />

          {/* Path 4: Bottom Border */}
          <path
            ref={bottomBorderRef}
            className="opacity-0"
            d="M 32,68 C 140,70 280,66 360,69 C 480,70 560,66 640,68"
          />

          {/* Cartographic markings */}
          <path d="M 52,64 L 58,58 L 64,64" opacity="0.12" />
          <circle cx="616" cy="58" r="4.5" strokeDasharray="1,1" opacity="0.15" />
        </svg>

        {/* Dynamic Nav Items */}
        <div className="flex items-center gap-2 relative z-10 px-12 select-none">
          {navItems.map((item, index) => {
            const isActive = activeItem === item;
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveItem(item)}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="text-[10px] md:text-[11px] font-serif uppercase tracking-[0.32em] relative py-2.5 px-6 transition-colors duration-500 outline-none rounded-[1px] focus-visible:ring-1 focus-visible:ring-[#B38A3A] text-[#2A1D13] opacity-0"
              >
                <span className="relative z-10">{item}</span>

                {/* Hand-painted ink brush stroke selection indicator */}
                {isActive && (
                  <div className="absolute inset-x-4 bottom-1 h-2 pointer-events-none">
                    <AnimatePresence>
                      <motion.svg
                        layoutId="activeBrushStroke"
                        className="w-full h-full text-[#8C5442] filter ink-bleed"
                        viewBox="0 0 60 6"
                        preserveAspectRatio="none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      >
                        <path 
                          d="M 2,3 C 15,1 30,5 45,2 C 52,3 56,1 58,4" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                        />
                      </motion.svg>
                    </AnimatePresence>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}