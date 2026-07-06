'use client';

import { forwardRef } from 'react';

interface CompassProps {
  // Receives rotation parameters handled by parent event tracking
}

const Compass = forwardRef<SVGSVGElement, CompassProps>((_, ref) => {
  return (
    <div className="absolute bottom-6 right-6 w-24 h-24 pointer-events-none select-none opacity-40 z-25 transition-opacity duration-300 hover:opacity-75">
      <svg
        ref={ref}
        viewBox="0 0 80 80"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Outer Engraved Rings */}
        <circle cx="40" cy="40" r="37" stroke="#2A1D13" strokeWidth="1.2" fill="none" />
        <circle cx="40" cy="40" r="34" stroke="#2A1D13" strokeWidth="0.6" strokeDasharray="1,2" fill="none" />
        <circle cx="40" cy="40" r="30" stroke="#2A1D13" strokeWidth="0.5" fill="none" />

        {/* Compass Cardinal Markings */}
        <text x="40" y="10" textAnchor="middle" className="text-[6.5px] font-bold font-serif fill-[#2A1D13] tracking-wide">N</text>
        <text x="40" y="76" textAnchor="middle" className="text-[6.5px] font-bold font-serif fill-[#2A1D13] tracking-wide">S</text>
        <text x="73" y="42.5" textAnchor="middle" className="text-[6.5px] font-bold font-serif fill-[#2A1D13] tracking-wide">E</text>
        <text x="7.5" y="42.5" textAnchor="middle" className="text-[6.5px] font-bold font-serif fill-[#2A1D13] tracking-wide">W</text>

        {/* Internal compass points and divisions */}
        <g stroke="#2A1D13" strokeWidth="0.4" fill="none">
          <line x1="40" y1="12" x2="40" y2="68" />
          <line x1="12" y1="40" x2="68" y2="40" />
          <line x1="20.2" y1="20.2" x2="59.8" y2="59.8" />
          <line x1="20.2" y1="59.8" x2="59.8" y2="20.2" />
        </g>

        {/* Magnetic Compass Needle Pin */}
        <g id="needleGroup" className="origin-[40px_40px]">
          <polygon points="40,8 43,40 40,43 37,40" fill="#8C5442" stroke="#2A1D13" strokeWidth="0.65" />
          <polygon points="40,72 43,40 40,37 37,40" fill="#5B4534" stroke="#2A1D13" strokeWidth="0.65" />
          <circle cx="40" cy="40" r="2.5" fill="#2A1D13" />
          <circle cx="40" cy="40" r="0.8" fill="#FFFDF5" />
        </g>
      </svg>
    </div>
  );
});

Compass.displayName = 'Compass';
export default Compass;