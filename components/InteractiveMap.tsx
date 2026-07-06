'use client';

import { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';

interface ProvinceData {
  id: string;
  name: string;
  altitude: string;
  peaks: string;
  description: string;
  color: string;
  path: string;
}

const HISTORIC_PROVINCES: ProvinceData[] = [
  {
    id: 'sudurpashchim',
    name: 'Sudurpashchim Province',
    altitude: '109m – 7,132m',
    peaks: 'Api Peak, Nampa Ridge',
    description: 'An untouched landscape of pristine lakes, deep rivers, and high alpine meadows.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 30,130 C 50,110 80,115 110,105 C 130,115 140,140 145,170 C 135,190 110,210 85,225 C 60,220 35,210 20,185 C 15,165 20,145 30,130 Z',
  },
  {
    id: 'karnali',
    name: 'Karnali Territory',
    altitude: '350m – 7,043m',
    peaks: 'Kanjiroba, Patrasi Range',
    description: 'The ancient trans-Himalayan heartland of isolated stone settlements and deep blue lakes.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 110,105 C 140,95 180,90 220,105 C 235,120 250,150 240,185 C 220,195 190,205 165,220 C 145,170 130,115 110,105 Z',
  },
  {
    id: 'lumbini',
    name: 'Lumbini Plains',
    altitude: '100m – 3,135m',
    peaks: 'Churia foothills',
    description: 'A serene historic valley. Home of early Buddha monastic ruins and sacred archaeological structures.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 165,220 C 190,205 220,195 240,185 C 255,200 270,215 300,215 C 295,235 285,255 260,265 C 220,270 185,250 165,220 Z',
  },
  {
    id: 'gandaki',
    name: 'Gandaki Province',
    altitude: '200m – 8,167m',
    peaks: 'Annapurna, Dhaulagiri, Manaslu',
    description: 'A global trekking epicenter encompassing legendary circuits and cold glacial river basins.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 220,105 C 260,95 300,90 350,100 C 370,125 365,155 350,180 C 320,195 290,200 270,215 C 250,150 235,120 220,105 Z',
  },
  {
    id: 'bagmati',
    name: 'Bagmati Valley',
    altitude: '141m – 7,227m',
    peaks: 'Langtang Lirung, Ganesh Himal',
    description: 'The cultural center containing old Kathmandu Valley temples and living woodcarving galleries.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 350,100 C 385,100 420,110 450,130 C 465,150 455,185 435,210 C 390,225 375,200 350,180 C 365,155 370,125 350,100 Z',
  },
  {
    id: 'koshi',
    name: 'Koshi Territory',
    altitude: '60m – 8,848m',
    peaks: 'Mount Everest, Lhotse, Makalu',
    description: 'The high edge of the Earth. Features rugged climbing routes and hanging glaciers.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 450,130 C 490,115 540,110 580,140 C 585,170 565,205 550,230 C 500,240 460,230 435,210 C 455,185 465,150 450,130 Z',
  },
  {
    id: 'madhesh',
    name: 'Madhesh Province',
    altitude: '60m – 605m',
    peaks: 'Chure Range Plains',
    description: 'Agricultural flatlands showcasing historic Mithila art, dynamic rural traditions, and extensive forest reserves.',
    color: 'stroke-[#2A1D13]/60 hover:stroke-[#2A1D13] hover:fill-[#2A1D13]/5 focus-visible:fill-[#2A1D13]/5',
    path: 'M 435,210 C 460,230 500,240 550,230 C 535,250 515,260 480,260 C 450,255 420,245 400,230 C 410,220 425,215 435,210 Z',
  }
];

export default function InteractiveMap() {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    pathRefs.current.forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', delay: 0.3 }
      );
    });
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - bounds.left + 20,
      y: e.clientY - bounds.top + 20,
    });
  };

  const handleKeyDown = (e: KeyboardEvent, province: ProvinceData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setHoveredProvince(province);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Editorial Header */}
      <div className="text-center mb-10 select-none">
        <span className="text-[10px] uppercase tracking-[0.45em] text-[#5B4534] font-bold">Journal Map Log</span>
        <h3 className="text-3xl md:text-5xl font-normal tracking-wide text-[#2A1D13] mt-1 font-serif">Sectors of the Cartographer</h3>
        <p className="text-xs md:text-sm text-[#5B4534]/80 max-w-xl mx-auto mt-3 font-light italic leading-relaxed">
          Hover or focus with your stylus on individual territories to unearth peaks, altitudinal coordinates, and local records.
        </p>
      </div>

      <div
        ref={mapRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[280px] md:h-[480px] flex justify-center items-center rounded-3xl p-6 overflow-hidden border border-[#2A1D13]/15 select-none bg-[#E7D7B5]/30 shadow-sm"
      >
        <div className="absolute top-8 left-8 border-l border-t border-[#2A1D13]/10 w-12 h-12 pointer-events-none" />
        <div className="absolute bottom-8 right-8 border-r border-b border-[#2A1D13]/10 w-12 h-12 pointer-events-none" />

        {/* Vintage Compass Rose Icon */}
        <div className="absolute top-10 right-10 w-16 h-16 opacity-40 pointer-events-none border border-[#2A1D13]/20 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-serif text-[#2A1D13]">N</span>
          <div className="absolute w-[1.5px] h-10 bg-[#2A1D13] transform rotate-45" />
        </div>

        <svg
          viewBox="0 0 600 300"
          className="w-full h-full max-h-[420px] filter ink-bleed"
          role="img"
          aria-label="Hand-drawn map of Nepal"
        >
          {/* Subtle lat/long lines */}
          <line x1="150" y1="0" x2="150" y2="300" stroke="rgba(42, 29, 19, 0.04)" strokeDasharray="3,3" />
          <line x1="300" y1="0" x2="300" y2="300" stroke="rgba(42, 29, 19, 0.04)" strokeDasharray="3,3" />
          <line x1="450" y1="0" x2="450" y2="300" stroke="rgba(42, 29, 19, 0.04)" strokeDasharray="3,3" />

          {HISTORIC_PROVINCES.map((province, index) => {
            const isHovered = hoveredProvince?.id === province.id;
            return (
              <path
                key={province.id}
                ref={(el) => { pathRefs.current[index] = el; }}
                d={province.path}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${province.name}. Peaks: ${province.peaks}.`}
                className={`transition-all duration-500 ease-out stroke-[1.2] fill-[#2A1D13]/1 cursor-pointer outline-none ${province.color} ${
                  isHovered ? 'stroke-[2] fill-[#2A1D13]/8' : ''
                } focus-visible:ring-1 focus-visible:ring-[#B38A3A]`}
                onMouseEnter={() => setHoveredProvince(province)}
                onMouseLeave={() => setHoveredProvince(null)}
                onFocus={() => setHoveredProvince(province)}
                onBlur={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleKeyDown(e, province)}
              />
            );
          })}
        </svg>

        {/* Handcrafted Ink Tooltip */}
        <AnimatePresence>
          {hoveredProvince && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-20 pointer-events-none p-5 rounded-xl border border-[#2A1D13]/15 max-w-[280px] shadow-md bg-[#F2E6C9] text-[#2A1D13]"
            >
              <h4 className="text-xs font-semibold tracking-wider uppercase mb-1 font-serif">{hoveredProvince.name}</h4>
              <div className="h-[1px] w-full bg-[#2A1D13]/15 mb-3" />
              <div className="flex justify-between text-[10px] text-[#5B4534] font-serif mb-2 uppercase tracking-wider">
                <span>Altitude:</span>
                <span>{hoveredProvince.altitude}</span>
              </div>
              <p className="text-[11px] text-[#2A1D13]/85 font-serif leading-relaxed mb-3 italic">
                "{hoveredProvince.description}"
              </p>
              <div className="text-[9px] text-[#5B4534] font-serif font-semibold">
                <span>Featured Peaks:</span> {hoveredProvince.peaks}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Synchronized Description Sheet */}
      <div className="w-full mt-8 h-28 relative">
        <AnimatePresence mode="wait">
          {hoveredProvince ? (
            <motion.div
              key={hoveredProvince.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#2A1D13]/10 bg-[#E7D7B5]/40"
            >
              <div className="flex-1">
                <h4 className="text-lg font-serif text-[#2A1D13]">{hoveredProvince.name}</h4>
                <p className="text-xs text-[#2A1D13]/80 mt-1 max-w-3xl font-serif italic leading-relaxed">"{hoveredProvince.description}"</p>
              </div>
              <div className="flex flex-col text-left md:text-right justify-center border-l md:border-l-0 md:border-r border-[#2A1D13]/10 pl-4 md:pl-0 md:pr-6 whitespace-nowrap">
                <span className="text-[9px] uppercase tracking-wider text-[#B38A3A] font-semibold">Field Topography</span>
                <span className="text-xs text-[#5B4534] font-serif mt-0.5">{hoveredProvince.peaks.split(',')[0]}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center justify-center border border-dashed border-[#2A1D13]/15 rounded-2xl"
            >
              <span className="text-xs text-[#2A1D13]/55 uppercase tracking-[0.25em] font-serif italic">
                Hold your stylus over a map sector to reveal old records
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}