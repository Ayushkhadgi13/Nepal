import React from 'react';

// Terai Grasslands
export const GrasslandsSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <path d="M10,80 Q25,30 35,80 M25,80 Q40,15 50,80 M45,80 Q60,40 70,80 M60,80 Q75,20 85,80" />
    <path d="M15,85 Q30,50 38,85 M32,85 Q45,25 55,85 M52,85 Q65,48 72,85 M68,85 Q80,32 88,85" strokeDasharray="1,1" />
  </svg>
);

// Chure Road Map & Sandstone
export const GorgeSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <path d="M10,20 C30,22 45,18 90,25 M10,45 C40,48 55,40 90,52 M10,75 C25,78 65,72 90,82" />
    <path d="M25,20 C22,35 28,40 24,45 M65,45 C68,58 62,65 66,75" strokeDasharray="3,3" />
    <circle cx="45" cy="32" r="3" strokeDasharray="1,1" />
  </svg>
);

// Mid Hills Ridges
export const RidgesSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <path d="M5,75 Q25,45 50,75 M40,75 Q65,30 90,75 M5,90 L95,90" />
    <path d="M15,65 L35,65 M48,55 L68,55 M25,75 L30,72 M60,75 L65,72" strokeWidth="0.5" />
  </svg>
);

// Kathmandu Pagoda Framing
export const PagodaSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <path d="M25,80 L75,80 M30,65 L70,65 M35,45 L65,45 M45,25 L55,25" />
    <path d="M30,80 L35,65 M70,80 L65,65 M35,65 L40,45 M65,65 L60,45 M40,45 L45,25 M60,45 L55,25" />
    <path d="M20,65 C35,62 65,62 80,65 M25,45 C40,42 60,42 75,45 M35,25 C45,22 55,22 65,25" strokeWidth="1.2" />
    <circle cx="50" cy="18" r="2" />
  </svg>
);

// Pine Branch
export const PineSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <line x1="10" y1="90" x2="90" y2="10" strokeWidth="1.2" />
    <path d="M30,70 Q20,50 15,55 M40,60 Q30,40 25,45 M50,50 Q40,30 35,35 M60,40 Q50,20 45,25" />
    <path d="M70,30 Q80,50 85,45 M60,40 Q70,60 75,55 M50,50 Q60,70 65,65 M40,60 Q50,80 55,75" />
  </svg>
);

// Mountain Ridges
export const MountainSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <path d="M10,80 L45,25 L85,80 M35,55 L55,40 L75,65" />
    <path d="M45,25 L52,45 L48,65 L55,80" strokeDasharray="2,2" />
    <path d="M15,80 L25,75 L38,80" />
  </svg>
);

// Mountaineering Crampon
export const GearSketch = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 stroke-current stroke-[0.8] opacity-75">
    <rect x="20" y="45" width="60" height="15" rx="2" />
    <path d="M25,60 L20,75 M35,60 L35,75 M65,60 L65,75 M75,60 L80,75" strokeWidth="1.2" />
    <path d="M50,45 C50,30 40,25 35,25" strokeDasharray="2,2" />
  </svg>
);

// Everest Summit Gold Stamp
export const SummitGoldStamp = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-44 h-44 text-[#B38A3A] stroke-current stroke-[1]">
    <circle cx="50" cy="50" r="42" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="38" strokeDasharray="3,3" />
    <path d="M30,65 L50,30 L70,65 M42,50 L50,44 L58,52" />
    <text x="50" y="78" textAnchor="middle" className="text-[7px] font-mono tracking-[0.25em] fill-[#B38A3A] font-bold">
      8848M
    </text>
  </svg>
);