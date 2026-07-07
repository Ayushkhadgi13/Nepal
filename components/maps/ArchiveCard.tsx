'use client';

import { ProvinceData } from './types';

interface ArchiveCardProps {
  data: ProvinceData | null;
}

export default function ArchiveCard({ data }: ArchiveCardProps) {
  if (!data) {
    return (
      <div className="h-full border border-[var(--primary-ink)]/10 rounded-xl bg-[#FAF3DE]/35 p-6 flex flex-col justify-center items-center text-center transition-all duration-700 select-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--secondary-ink)]/60 font-serif">Altimetric Ledger</span>
        <p className="text-xs italic text-[var(--primary-ink)]/60 mt-3 font-serif max-w-xs">
          Hover over the map regions or continue ascending the journal to catalog regional geography details.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full border border-[var(--primary-ink)]/15 rounded-xl bg-[#FAF3DE]/60 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 shadow-sm relative overflow-hidden select-none">
      {/* Decoupled stamp mark style decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-[#8C5442]/10 flex items-center justify-center pointer-events-none transform rotate-12">
        <span className="text-[8px] font-mono tracking-widest text-[#8C5442]/25">OFFICIAL SURVEY</span>
      </div>

      <div>
        <div className="flex justify-between items-baseline border-b border-[var(--primary-ink)]/10 pb-4">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C5442] font-mono">SPECIMEN RECORD</span>
            <h4 className="text-3xl font-serif text-[var(--primary-ink)] mt-1 uppercase font-normal tracking-wide">
              {data.nameEn}
            </h4>
          </div>
          <span 
            className="text-2xl text-[#8C5442]/80"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            {data.nameNe}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-[var(--secondary-ink)]/60">Altitude Profile</span>
            <span className="text-xs font-serif font-bold text-[var(--primary-ink)] mt-1 italic">{data.elevation}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-[var(--secondary-ink)]/60">Geology/Terrain</span>
            <span className="text-xs font-serif text-[var(--primary-ink)] mt-1 italic">{data.terrain}</span>
          </div>
        </div>

        <div className="my-6">
          <span className="text-[9px] uppercase tracking-wider text-[var(--secondary-ink)]/60 block mb-1">Field Observations</span>
          <p className="text-xs text-[var(--primary-ink)]/85 font-serif leading-relaxed italic">
            {data.description}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--primary-ink)]/5">
        <span className="text-[9px] uppercase tracking-wider text-[var(--secondary-ink)]/60 block mb-2">Key Survey Plate Markers</span>
        <div className="flex flex-wrap gap-2">
          {data.highlights.map((highlight, index) => (
            <span 
              key={index}
              className="text-[9px] font-mono bg-[var(--primary-ink)]/[0.04] border border-[var(--primary-ink)]/10 text-[var(--secondary-ink)] px-2.5 py-1 rounded-sm"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
