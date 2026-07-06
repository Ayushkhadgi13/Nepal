'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Step 1: Characters of "नमस्कार" are written
    tl.fromTo(
      charsRef.current,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(6px)',
      },
      {
        opacity: 0.9,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.3,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    // Step 2: Ink settles, and subtitle appears beneath
    tl.to(
      charsRef.current,
      {
        opacity: 0.15,
        scale: 1.03,
        duration: 1.1,
        ease: 'power2.inOut',
      },
      '-=0.5'
    );

    tl.fromTo(
      contentWrapperRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power4.inOut' },
      '-=1.0'
    );

    // Step 3: Streamlined hold for the user to absorb the intro
    tl.to({}, { duration: 0.75 });

    // Step 4: Intro screens fades out to begin Stage 1
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        scale: 1.03,
        duration: 1.1,
        ease: 'power3.inOut',
      }
    );
  }, { scope: containerRef });

  const characters = ['न', 'म', 'स्', 'का', 'र'];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1D140C] px-4 text-center select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to The Living Journal"
    >
      {/* Lokta textured background overlay */}
      <div className="absolute inset-0 lokta-paper-main opacity-95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2A1D13]/10 via-transparent to-white/5 pointer-events-none" />

      <div className="relative max-w-4xl flex flex-col items-center justify-center z-10">
        <h1 className="sr-only">नमस्कार. Welcome to Nepal</h1>

        {/* Ink-bleed characters of "नमस्कार" */}
        <div className="flex space-x-2 justify-center overflow-hidden h-[160px] md:h-[260px] items-center mb-10 filter ink-bleed" aria-hidden="true">
          {characters.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) charsRef.current[index] = el;
              }}
              className="inline-block text-8xl md:text-[13rem] font-light text-[#2A1D13] tracking-wide font-serif"
              style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Welcome Subtitle */}
        <div ref={contentWrapperRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mt-28 md:mt-36">
          <h2 className="text-xl md:text-4xl font-normal text-[#2A1D13] uppercase tracking-[0.3em] font-serif">
            Welcome to Nepal
          </h2>

          <div
            ref={lineRef}
            className="h-[1px] w-28 bg-[#2A1D13]/15 mx-auto my-6 origin-center"
          />

          <p
            className="text-[10px] md:text-xs font-light text-[#5B4534] uppercase tracking-[0.45em] max-w-md mx-auto leading-relaxed italic"
          >
            "The Land of Himalayas, Heritage and Heart"
          </p>
        </div>
      </div>
    </div>
  );
}