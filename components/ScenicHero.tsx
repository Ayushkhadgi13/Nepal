'use client';

import { useRef } from 'react';
import { ArrowDown, Flame, Compass, Trees } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import InteractiveMap from './InteractiveMap';

export default function ScenicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      titleWrapperRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center pt-36 pb-28 px-4 md:px-8 overflow-hidden"
    >
      {/* Soft warm vignette simulating natural daylight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-[5%] left-[10%] w-[450px] h-[450px] rounded-full bg-[#B38A3A]/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#8C5442]/3 blur-[140px]" />
      </div>

      {/* Main Woodblock Title Header */}
      <div ref={titleWrapperRef} className="text-center relative z-10 mb-20 select-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-[#2A1D13]/10 bg-[#E7D7B5]/40 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C5442]" />
          <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#5B4534] font-bold">
            The Living Journal — Entry I
          </span>
        </div>

        <h2 className="text-6xl md:text-[6.5rem] font-normal tracking-wide text-[#2A1D13] leading-none font-serif">
          NEPAL
        </h2>
        <div className="h-[1px] w-36 bg-[#2A1D13]/15 mx-auto mt-6 mb-4" />
        <p className="text-xs md:text-sm text-[#5B4534] font-light tracking-[0.35em] max-w-xl mx-auto uppercase italic">
          The land of Himalayas, Heritage and Heart
        </p>
      </div>

      {/* Cartographic central map */}
      <div className="w-full max-w-5xl z-20 relative px-1 md:px-4">
        <InteractiveMap />
      </div>

      {/* Handwritten info cells */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 z-10">
        <div className="p-6 rounded-xl flex items-start gap-4 border border-[#2A1D13]/10 bg-[#E7D7B5]/20 hover:bg-[#E7D7B5]/40 transition-all duration-300">
          <Trees className="w-5 h-5 text-[#556B4D] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#2A1D13] uppercase font-serif">Sovereign Wilds</h4>
            <p className="text-xs text-[#5B4534] font-serif italic mt-2 leading-relaxed">
              Sub-tropical forests and national preservation sanctuaries, home to diverse, protected ecosystems.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl flex items-start gap-4 border border-[#2A1D13]/10 bg-[#E7D7B5]/20 hover:bg-[#E7D7B5]/40 transition-all duration-300">
          <Compass className="w-5 h-5 text-[#647A91] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#2A1D13] uppercase font-serif">Glacial Streams</h4>
            <p className="text-xs text-[#5B4534] font-serif italic mt-2 leading-relaxed">
              Pristine mountain lakes and rivers that flow from the Himalayas to feed regional ecosystems downstream.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl flex items-start gap-4 border border-[#2A1D13]/10 bg-[#E7D7B5]/20 hover:bg-[#E7D7B5]/40 transition-all duration-300">
          <Flame className="w-5 h-5 text-[#8C5442] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#2A1D13] uppercase font-serif">Sacred Monasteries</h4>
            <p className="text-xs text-[#5B4534] font-serif italic mt-2 leading-relaxed">
              Centuries-old shrines and cultural landmarks that anchor deep regional traditions.
            </p>
          </div>
        </div>
      </div>

      {/* Downward Navigation Link */}
      <a
        href="#explore"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[#B38A3A] p-2 rounded-lg"
        aria-label="Turn page forward"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-serif text-[#2A1D13]/70">Turn Page</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#8C5442] animate-bounce" />
      </a>
    </div>
  );
}