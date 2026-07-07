'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ProvinceData } from './types';
import ProvinceLayer from './ProvinceLayer';
import IllustrationLayer from './IllustrationLayer';

interface NepalMapProps {
  provinces: ProvinceData[];
  selectedId: string;
  hoveredId: string | null;
  onHover: (province: ProvinceData | null) => void;
  onClick: (province: ProvinceData) => void;
  onKeyDown: (e: React.KeyboardEvent, province: ProvinceData) => void;
}

export interface NepalMapHandles {
  svgRef: React.RefObject<SVGSVGElement | null>;
  pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  illustrationsRef: React.RefObject<SVGGElement | null>;
  namesRef: React.RefObject<SVGGElement | null>;
  dropletRef: React.RefObject<SVGCircleElement | null>;
}

const NepalMap = forwardRef<NepalMapHandles, NepalMapProps>(({
  provinces,
  selectedId,
  hoveredId,
  onHover,
  onClick,
  onKeyDown,
}, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const illustrationsRef = useRef<SVGGElement>(null);
  const namesRef = useRef<SVGGElement>(null);
  const dropletRef = useRef<SVGCircleElement>(null);

  useImperativeHandle(ref, () => ({
    svgRef,
    pathRefs,
    illustrationsRef,
    namesRef,
    dropletRef,
  }));

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 850 420"
      className="w-full h-full max-h-[390px] relative z-15"
      style={{ filter: 'url(#museumInkingFilter)' }}
      role="img"
      aria-label="Survey Outline of Nepal"
    >
      <defs>
        {/* Handcrafted displacement map simulating physical ink absorption */}
        <filter id="museumInkingFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.4" result="bleed" />
          <feMerge>
            <feMergeNode in="bleed" />
            <feMergeNode in="displaced" />
          </feMerge>
        </filter>
      </defs>

      {/* Latitudinal and Longitudinal Survey Ticks */}
      <g stroke="rgba(42, 29, 19, 0.04)" strokeWidth="0.5" strokeDasharray="3,12">
        <path d="M 50,80 L 800,80 M 50,200 L 800,200 M 50,320 L 800,320" />
        <path d="M 120,40 L 120,380 M 320,40 L 320,380 M 520,40 L 520,380 M 720,40 L 720,380" />
      </g>

      {/* Animated Ink Splat node */}
      <circle ref={dropletRef} cx="420" cy="180" r="10" fill="#2A1D13" />

      {/* Traditional exploratory context overlays */}
      <IllustrationLayer ref={illustrationsRef} />

      {/* Handcrafted Boundary Vectors */}
      <ProvinceLayer
        provinces={provinces}
        selectedId={selectedId}
        hoveredId={hoveredId}
        pathRefs={pathRefs}
        onHover={onHover}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />

      {/* Cursive Labels Layer */}
      <g ref={namesRef} className="pointer-events-none select-none font-serif">
        {provinces.map((prov) => {
          const isSelected = selectedId === prov.id;
          const cx = prov.cx ?? 0;
          const cy = prov.cy ?? 0;
          return (
            <g key={`label-${prov.id}`} className="transition-all duration-300">
              <text
                x={cx}
                y={cy - 1}
                textAnchor="middle"
                className={`text-[9px] uppercase tracking-wider font-bold transition-colors duration-300 ${
                  isSelected ? 'fill-[#2A1D13]' : 'fill-[#2A1D13]/40'
                }`}
              >
                {prov.name ?? prov.nameEn}
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                className={`text-[8.5px] italic transition-colors duration-300 ${
                  isSelected ? 'fill-[#8C5442]' : 'fill-[#2A1D13]/20'
                }`}
                style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
              >
                {prov.nepaliName ?? prov.nameNe}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
});

NepalMap.displayName = 'NepalMap';

export default NepalMap; // Appended default export to resolve Next.js dynamic routing errors
