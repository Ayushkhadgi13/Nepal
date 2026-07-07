'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LocationRecord {
  id: string;
  title: string;
  diaryText: string;
  marginalia: string;
  fieldNotes: string;
  inkPlateLabel: string;
  svgSketchPath: React.ReactNode;
}

interface JournalSectionProps {
  altitude: string;
  region: string;
  chapterTitle: string;
  locations?: LocationRecord[]; // Option-tagged with structural fallback support
  bgGradient: string;
}

export default function JournalSection({
  altitude = '60m',
  region = 'Unknown Region',
  chapterTitle = 'Untitled Chapter',
  locations = [], // Initialized as an empty array to prevent undefined indexing crashes
  bgGradient
}: JournalSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Safely dereference current active index
  const currentRecord = locations && locations.length > 0 ? locations[activeIdx] : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const ledgerContentRef = useRef<HTMLDivElement>(null);
  const cardIllustrationRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) {
          window.dispatchEvent(
            new CustomEvent('nepal-altitude-change', {
              detail: { altitude, region }
            })
          );
        }
      }
    });

    gsap.fromTo(
      ledgerContentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      cardIllustrationRef.current,
      { opacity: 0, scale: 0.95, rotate: -1 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  const turnToPage = (targetIndex: number) => {
    if (targetIndex === activeIdx || !locations.length) return;

    const outTimeline = gsap.timeline({
      onComplete: () => {
        setActiveIdx(targetIndex);

        window.dispatchEvent(
          new CustomEvent('nepal-location-change', {
            detail: { locationId: locations[targetIndex].id, region }
          })
        );

        const inTimeline = gsap.timeline();
        
        inTimeline.fromTo(
          ledgerContentRef.current,
          { opacity: 0, x: 50, skewX: -3, rotate: 1.5 },
          { opacity: 1, x: 0, skewX: 0, rotate: 0, duration: 1.0, ease: 'power3.out' }
        );

        inTimeline.fromTo(
          cardIllustrationRef.current,
          { opacity: 0, x: 30, scale: 0.94, rotate: -2 },
          { opacity: 1, x: 0, scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.2)' },
          '-=0.8'
        );
      }
    });

    outTimeline.to(ledgerContentRef.current, {
      opacity: 0,
      x: -60,
      skewX: 4,
      rotate: -2,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    outTimeline.to(cardIllustrationRef.current, {
      opacity: 0,
      x: -40,
      scale: 0.96,
      rotate: 1.5,
      duration: 0.45,
      ease: 'power2.inOut'
    }, '-=0.45');
  };

  // If no location datasets are supplied, return an empty placeholder block
  if (!currentRecord) {
    return (
      <section ref={containerRef} className={`min-h-screen w-full flex items-center justify-center ${bgGradient}`}>
        <div className="text-center font-serif text-[var(--secondary-ink)]/50 italic text-sm">
          Awaiting field observation data...
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-[var(--primary-ink)]/5 transition-all duration-1000 ${bgGradient}`}
    >
      <div className="max-w-6xl w-full flex flex-col gap-8 mb-10 z-20">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[var(--primary-ink)]/10 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C5442] bg-[#8C5442]/5 px-2.5 py-1 rounded-sm border border-[#8C5442]/10 uppercase">
              {altitude}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[var(--secondary-ink)]/80">
              {region}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif text-[var(--secondary-ink)]/60 italic font-light">
            {chapterTitle}
          </h2>
        </div>

        {locations.length > 1 && (
          <div className="flex flex-wrap gap-2 md:gap-3" role="tablist" aria-label="Expedition Records">
            {locations.map((loc, index) => {
              const isActive = index === activeIdx;
              return (
                <button
                  key={loc.id}
                  onClick={() => turnToPage(index)}
                  className={`relative text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--primary-ink)]/5 text-[var(--primary-ink)] border-[var(--primary-ink)]/35 font-bold shadow-sm translate-y-[-1px]'
                      : 'border-[var(--primary-ink)]/10 text-[var(--secondary-ink)]/70 hover:border-[var(--primary-ink)]/20 hover:text-[var(--primary-ink)]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="relative z-10">{loc.title}</span>
                  {isActive && (
                    <div className="absolute inset-x-2 bottom-1 h-[1.5px] bg-[#8C5442] pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div ref={ledgerContentRef} className="lg:col-span-7 flex flex-col justify-center will-change-transform">
          <h3 className="text-3xl md:text-5xl font-serif font-light text-[var(--primary-ink)] mt-2 mb-6 tracking-wide leading-tight uppercase">
            {currentRecord.title}
          </h3>
          <div className="h-[1px] w-20 bg-[var(--primary-ink)]/15 mb-6" />
          <p className="text-sm md:text-base text-[var(--primary-ink)]/90 font-serif leading-relaxed italic pr-4 max-w-xl">
            {currentRecord.diaryText}
          </p>
          <div className="mt-8 p-4 border-l-2 border-[var(--primary-ink)]/10 bg-[#FAF3DE]/10 rounded-r-md">
            <span className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-[var(--secondary-ink)] block">
              Explorer&apos;s Field Logbook Addendum:
            </span>
            <p className="text-xs text-[var(--secondary-ink)]/85 font-serif mt-1.5 leading-relaxed">
              {currentRecord.marginalia}
            </p>
          </div>
        </div>

        <div ref={cardIllustrationRef} className="lg:col-span-5 w-full will-change-transform">
          <div className="relative rounded-2xl border border-[var(--primary-ink)]/10 bg-[#FAF3DE]/35 p-6 md:p-8 flex flex-col justify-between h-[360px] md:h-[420px] transition-all duration-500 hover:border-[var(--primary-ink)]/25">
            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-full max-w-[200px] text-[var(--primary-ink)]/65 flex items-center justify-center filter ink-bleed transition-opacity duration-300">
                {currentRecord.svgSketchPath}
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] font-serif italic text-[var(--secondary-ink)]/50 tracking-wider">
                {currentRecord.fieldNotes}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--primary-ink)]/5 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-[var(--secondary-ink)]/55">Field Specimen</span>
                <span className="text-xs font-serif italic text-[var(--primary-ink)]">{currentRecord.inkPlateLabel}</span>
              </div>
              <span className="text-[10px] font-mono text-[#8C5442] tracking-widest font-bold">LOKTA-VI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}