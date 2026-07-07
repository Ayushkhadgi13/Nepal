'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import InteractiveMap from './InteractiveMap';

gsap.registerPlugin(useGSAP);

interface ScenicHeroProps {
  triggerMapDraw: boolean;
  onComplete?: () => void;
}

export default function ScenicHero({ triggerMapDraw, onComplete }: ScenicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const namasteRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const compassRef = useRef<SVGSVGElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerMapDraw) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.fromTo(watermarkRef.current, { opacity: 0 }, { opacity: 0.22, duration: 0.9, ease: 'power2.out' })
      .fromTo(namasteRef.current, { opacity: 0, y: 10 }, { opacity: 0.85, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.5')
      .fromTo(titleRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.65')
      .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 0.75, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(compassRef.current, { opacity: 0, scale: 0.92, rotate: -30 }, { opacity: 0.45, scale: 1, rotate: 0, duration: 1.1, ease: 'power3.out' }, '-=0.6')
      .fromTo(mapWrapperRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.75');
  }, { scope: containerRef, dependencies: [triggerMapDraw] });

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center pt-28 pb-16 px-4 md:px-8 overflow-hidden select-none"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-[#B38A3A]/4 blur-[130px]" />
        <div className="absolute top-[25%] right-[8%] w-[400px] h-[400px] rounded-full bg-[#8C5442]/3 blur-[140px]" />
      </div>

      <div
        ref={watermarkRef}
        className="text-xl md:text-2xl font-normal select-none tracking-[0.25em]"
        style={{
          opacity: 0,
          fontFamily: "'Noto Serif Devanagari', serif",
          color: '#D8C9A6',
          textShadow: '1px 1px 0px rgba(255, 255, 255, 0.45), -1px -1px 0px rgba(42, 29, 19, 0.08)'
        }}
      >
        नेपाल
      </div>

      <h2
        ref={namasteRef}
        className="mt-5 text-4xl md:text-5xl font-light text-[#8C5442] tracking-wide font-serif filter ink-bleed"
        style={{ opacity: 0, fontFamily: "'Noto Serif Devanagari', serif" }}
      >
        नमस्ते
      </h2>

      <h1
        ref={titleRef}
        className="mt-3 text-6xl md:text-[7.5rem] font-serif uppercase tracking-[0.08em] text-[var(--primary-ink)] leading-none font-normal"
        style={{ opacity: 0 }}
      >
        NEPAL
      </h1>

      <p
        ref={subtitleRef}
        className="mt-5 text-xs md:text-sm text-[var(--secondary-ink)] font-serif font-light tracking-[0.3em] max-w-lg text-center leading-relaxed italic"
        style={{ opacity: 0 }}
      >
        The Land of Himalayas, Heritage and Heart
      </p>

      <svg
        ref={compassRef}
        viewBox="0 0 100 100"
        className="mt-10 w-16 h-16 text-[var(--primary-ink)] filter ink-bleed stroke-[0.8]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <circle cx="50" cy="50" r="44" strokeDasharray="1,2" />
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="38" strokeDasharray="4,4" />
        <polygon points="50,14 53,47 50,50" fill="currentColor" opacity="0.15" />
        <polygon points="50,14 47,47 50,50" fill="currentColor" />
        <line x1="50" y1="6" x2="50" y2="94" strokeDasharray="1,2" />
        <line x1="6" y1="50" x2="94" y2="50" strokeDasharray="1,2" />
      </svg>

      <div
        ref={mapWrapperRef}
        className="mt-12 w-full max-w-4xl z-20 relative px-1 md:px-4"
        style={{ opacity: 0 }}
      >
        <InteractiveMap triggerDraw={triggerMapDraw} />
      </div>
    </div>
  );
}