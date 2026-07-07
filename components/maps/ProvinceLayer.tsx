'use client';

import { ProvinceData } from './types';

interface ProvinceLayerProps {
  provinces: ProvinceData[];
  selectedId: string;
  hoveredId: string | null;
  pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>; // Corrected type definition
  onHover: (province: ProvinceData | null) => void;
  onClick: (province: ProvinceData) => void;
  onKeyDown: (e: React.KeyboardEvent, province: ProvinceData) => void;
}

export default function ProvinceLayer({
  provinces,
  selectedId,
  hoveredId,
  pathRefs,
  onHover,
  onClick,
  onKeyDown,
}: ProvinceLayerProps) {
  return (
    <g id="provincesOutline">
      {provinces.map((prov, index) => {
        const isActive = selectedId === prov.id;
        const isHovered = hoveredId === prov.id;

        return (
          <path
            key={prov.id}
            ref={(el) => {
              pathRefs.current[index] = el;
            }}
            d={prov.path ?? ''}
            tabIndex={0}
            role="button"
            aria-label={`${prov.name ?? prov.nameEn}. Archive ledger coordinates.`}
            className={`transition-all duration-300 cursor-pointer outline-none ${
              isActive
                ? 'stroke-[#2A1D13] fill-[#2A1D13]/8 stroke-[2.2]'
                : isHovered
                ? 'stroke-[#2A1D13]/70 fill-[#2A1D13]/3 stroke-[1.6]'
                : 'stroke-[#2A1D13]/30 fill-transparent stroke-[1.1] hover:fill-[#2A1D13]/1'
            }`}
            style={{
              transformOrigin: `${prov.cx ?? 0}px ${prov.cy ?? 0}px`,
              transform: isHovered || isActive ? 'translateY(-2px) scale(1.005)' : 'none',
              filter: isHovered || isActive ? 'drop-shadow(0 4px 6px rgba(42, 29, 19, 0.08))' : 'none',
            }}
            onMouseEnter={() => onHover(prov)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(prov)}
            onFocus={() => onHover(prov)}
            onBlur={() => onHover(null)}
            onKeyDown={(e) => onKeyDown(e, prov)}
          />
        );
      })}
    </g>
  );
}
