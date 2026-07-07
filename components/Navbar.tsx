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
  const navItems = ['About', 'Chronicle', 'Ascent'];

  const containerRef = useRef<HTMLDivElement>(null);
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

  useGSAP(() => {
    if (!triggerDraw) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    const getLength = (path: SVGPathElement | null) => path ? path.getTotalLength() : 0;

    gsap.set([leftRollRef.current, topBorderRef.current, rightRollRef.current, bottomBorderRef.current], {
      strokeDasharray: (i, target) => getLength(target as SVGPathElement),
      strokeDashoffset: (i, target) => getLength(target as SVGPathElement),
      opacity: 1
    });

    tl.to(leftRollRef.current, { strokeDashoffset: 0, duration: 0.75, ease: 'power1.inOut' })
      .to(topBorderRef.current, { strokeDashoffset: 0, duration: 0.85, ease: 'sine.inOut' }, '-=0.15')
      .to(rightRollRef.current, { strokeDashoffset: 0, duration: 0.75, ease: 'power1.inOut' }, '-=0.15')
      .to(bottomBorderRef.current, { strokeDashoffset: 0, duration: 0.85, ease: 'sine.inOut' }, '-=0.15')
      .fromTo(paperRef.current, { opacity: 0 }, { opacity: 0.95, duration: 0.6, ease: 'power2.out' }, '-=0.35')
      .fromTo(itemsRef.current, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }, '-=0.2');

  }, { scope: containerRef, dependencies: [triggerDraw] });

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-1000 ease-in-out pointer-events-none flex flex-col items-center justify-center ${
        isScrolled ? 'pt-2' : 'pt-6'
      }`}
      role="banner"
    >
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

      <div
        className={`relative pointer-events-auto h-16 w-full max-w-lg flex items-center justify-center transition-all duration-1000 ${
          isScrolled ? 'scale-[0.96] -translate-y-2' : 'scale-100'
        }`}
      >
        <div
          ref={paperRef}
          className="absolute inset-x-8 inset-y-[6px] bg-[#FAF3DE] rounded-[4px] -z-10 opacity-0 shadow-sm"
        />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none text-[var(--primary-ink)] stroke-current stroke-[0.85]"
          fill="none"
          viewBox="0 0 512 64"
          preserveAspectRatio="none"
        >
          <path ref={leftRollRef} className="opacity-0" d="M 28,10 C 16,10 10,20 10,32 C 10,44 16,54 28,54 C 40,54 44,44 44,32 C 44,22 40,14 28,14 C 20,14 16,22 16,32 C 16,38 20,44 28,44" />
          <path ref={topBorderRef} className="opacity-0" d="M 28,10 C 120,8 240,12 300,9 C 380,8 440,12 484,10" />
          <path ref={rightRollRef} className="opacity-0" d="M 484,10 C 496,10 502,20 502,32 C 502,44 496,54 484,54 C 472,54 468,44 468,32 C 468,22 472,14 484,14 C 492,14 496,22 496,32 C 496,38 492,44 484,44" />
          <path ref={bottomBorderRef} className="opacity-0" d="M 28,54 C 120,56 240,52 300,55 C 380,56 440,52 484,54" />
        </svg>

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
                className="text-[10px] md:text-[11px] font-serif uppercase tracking-[0.32em] relative py-2.5 px-6 transition-colors duration-500 outline-none rounded-[1px]"
              >
                <span className="relative z-10">{item}</span>

                {isActive && (
                  <div className="absolute inset-x-4 bottom-1 h-2 pointer-events-none">
                    <AnimatePresence>
                      <motion.svg
                        layoutId="activeBrush"
                        className="w-full h-full text-[#8C5442] filter ink-bleed"
                        viewBox="0 0 60 6"
                        preserveAspectRatio="none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85 }}
                        exit={{ opacity: 0 }}
                      >
                        <path d="M 2,3 C 15,1 30,5 45,2 C 52,3 56,1 58,4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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