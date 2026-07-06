'use client';

import { forwardRef } from 'react';

// Monochrome, faint drawings aligned with geographic context of the provinces
const IllustrationLayer = forwardRef<SVGGElement>((_, ref) => {
  return (
    <g ref={ref} className="pointer-events-none select-none opacity-40">
      
      {/* 1. Koshi Region: Mt. Everest ridge & lines */}
      <g transform="translate(540, 130)">
        <path d="M 0,25 L 15,0 L 30,30 M 15,0 L 22,12" stroke="#2A1D13" strokeWidth="0.75" fill="none" />
        <path d="M 22,12 L 35,5 L 45,28" stroke="#2A1D13" strokeWidth="0.6" fill="none" />
        <path d="M 15,0 C 13,8 8,14 2,16" stroke="#2A1D13" strokeWidth="0.45" strokeDasharray="1,1" fill="none" />
      </g>

      {/* 2. Bagmati Region: Swayambhunath spire sketch */}
      <g transform="translate(425, 155)">
        <path d="M 0,20 L 10,20 L 10,16 L 0,16 Z" stroke="#2A1D13" strokeWidth="0.8" fill="none" />
        <path d="M -2,16 L 12,16 L 5,8 Z" stroke="#2A1D13" strokeWidth="0.7" fill="none" />
        <line x1="5" y1="8" x2="5" y2="0" stroke="#2A1D13" strokeWidth="0.8" />
      </g>

      {/* 3. Gandaki Region: Suspension Bridge & River line */}
      <g transform="translate(290, 145)">
        {/* Bridge */}
        <path d="M 0,15 Q 15,22 30,15" stroke="#2A1D13" strokeWidth="0.6" fill="none" />
        <line x1="0" y1="10" x2="0" y2="20" stroke="#2A1D13" strokeWidth="0.8" />
        <line x1="30" y1="10" x2="30" y2="20" stroke="#2A1D13" strokeWidth="0.8" />
        {/* River */}
        <path d="M 15,22 Q 10,35 -5,50" stroke="#2A1D13" strokeWidth="0.4" strokeDasharray="2,2" fill="none" />
      </g>

      {/* 4. Lumbini Region: Monastic Pillar */}
      <g transform="translate(180, 240)">
        <line x1="10" y1="0" x2="10" y2="15" stroke="#2A1D13" strokeWidth="1.2" />
        <circle cx="10" cy="0" r="1.5" fill="#2A1D13" />
      </g>

      {/* 5. Madhesh Region: Traditional agricultural lines */}
      <g transform="translate(420, 250)">
        <line x1="0" y1="10" x2="25" y2="5" stroke="#2A1D13" strokeWidth="0.4" strokeDasharray="1,2" />
        <line x1="3" y1="14" x2="28" y2="9" stroke="#2A1D13" strokeWidth="0.4" strokeDasharray="1,2" />
      </g>

      {/* 6. Karnali Region: Pine trees & lake contour */}
      <g transform="translate(150, 150)">
        <path d="M 0,12 L 4,5 L 8,12 M 4,5 L 4,14" stroke="#2A1D13" strokeWidth="0.65" fill="none" />
        <path d="M 12,14 L 15,8 L 18,14 M 15,8 L 15,16" stroke="#2A1D13" strokeWidth="0.65" fill="none" />
      </g>

      {/* 7. Sudurpashchim Region: River curve */}
      <g transform="translate(60, 185)">
        <path d="M 0,0 C 12,10 18,22 25,32" stroke="#2A1D13" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
      </g>
    </g>
  );
});

IllustrationLayer.displayName = 'IllustrationLayer';
export default IllustrationLayer;