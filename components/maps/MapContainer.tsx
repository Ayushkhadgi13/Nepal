'use client';

import { useState, useRef,MouseEvent, KeyboardEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { MAP_PROVINCES } from './mapData';
import { ProvinceData } from './types';
import NepalMap, { NepalMapHandles } from './NepalMap';
import ArchiveCard from './ArchiveCard';
import Compass from './Compass';
import { runMapAnimations } from './MapAnimations';

interface MapContainerProps {
  triggerDraw: boolean;
}

export default function MapContainer({ triggerDraw }: MapContainerProps) {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData>(MAP_PROVINCES[3]); // Default to Gandaki
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<SVGSVGElement>(null);
  const paperSpotlightRef = useRef<SVGCircleElement>(null);
  const nepalMapRef = useRef<NepalMapHandles>(null);

  const spotlightX = useRef<((val: number) => void) | null>(null);
  const spotlightY = useRef<((val: number) => void) | null>(null);

  // Initialize Viewport-Aware Entry Sequence and Spotlights
  useGSAP(() => {
    if (!triggerDraw || !nepalMapRef.current) return;

    // Run central sequence orchestrator
    runMapAnimations({
      containerRef,
      svgRef: nepalMapRef.current.svgRef,
      pathRefs: nepalMapRef.current.pathRefs,
      illustrationsRef: nepalMapRef.current.illustrationsRef,
      namesRef: nepalMapRef.current.namesRef,
      compassRef,
      dropletRef: nepalMapRef.current.dropletRef,
      triggerDraw,
    });

    if (paperSpotlightRef.current) {
      spotlightX.current = gsap.quickTo(paperSpotlightRef.current, 'cx', { duration: 0.5, ease: 'power2.out' });
      spotlightY.current = gsap.quickTo(paperSpotlightRef.current, 'cy', { duration: 0.5, ease: 'power2.out' });
    }
  }, { scope: containerRef, dependencies: [triggerDraw] });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mapFrameRef.current) return;
    const bounds = mapFrameRef.current.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    if (spotlightX.current && spotlightY.current) {
      spotlightX.current(mouseX);
      spotlightY.current(mouseY);
    }

    // Magnetize Compass Pointer to cursor
    if (compassRef.current) {
      const pinX = bounds.width - 64;
      const pinY = bounds.height - 64;
      const angle = Math.atan2(mouseY - pinY, mouseX - pinX) * (180 / Math.PI) - 90;
      gsap.to(compassRef.current.querySelector('#needleGroup'), {
        rotation: angle,
        duration: 0.8,
        ease: 'power2.out',
        transformOrigin: '40px 40px',
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent, province: ProvinceData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProvince(province);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Map Drawing Field (8 Columns) */}
        <div
          ref={mapFrameRef}
          onMouseMove={handleMouseMove}
          className="lg:col-span-8 relative rounded-2xl p-6 overflow-hidden border border-[#2A1D13]/15 bg-[#FAF3DE] shadow-inner select-none flex items-center justify-center min-h-[380px] md:min-h-[440px]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 15%, rgba(255, 253, 245, 0.4) 0%, rgba(42, 29, 19, 0.05) 100%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fibers'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fibers)'/%3E%3C/svg%3E")
            `,
          }}
        >
          {/* Topographic markings */}
          <div className="absolute top-3 left-3 flex gap-1 items-center font-mono text-[8px] text-[#2A1D13]/40">
            <span>+ CABINET REC. 14</span>
          </div>
          <div className="absolute top-3 right-3 font-mono text-[8px] text-[#2A1D13]/40">
            SEC. LAT: 28° N
          </div>

          {/* Spotlight Shadow ring */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-55 z-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="warmSpot" cx="0" cy="0" r="240" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.0" />
                  <stop offset="70%" stopColor="#2A1D13" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1D140C" stopOpacity="0.4" />
                </radialGradient>
              </defs>
              <circle ref={paperSpotlightRef} cx="-500" cy="-500" r="850" fill="url(#warmSpot)" />
            </svg>
          </div>

          {/* Actual SVG Map Layer */}
          <NepalMap
            ref={nepalMapRef}
            provinces={MAP_PROVINCES}
            selectedId={selectedProvince.id}
            hoveredId={hoveredProvince ? hoveredProvince.id : null}
            onHover={setHoveredProvince}
            onClick={setSelectedProvince}
            onKeyDown={handleKeyDown}
          />

          {/* Animated Compass */}
          <Compass ref={compassRef} />
        </div>

        {/* Archival Detail Card (4 Columns) */}
        <div className="lg:col-span-4 flex items-stretch">
          <AnimatePresence mode="wait">
            <ArchiveCard key={selectedProvince.id} province={selectedProvince} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}