'use client';

import { motion } from 'framer-motion';
import { ProvinceData } from './types';

interface ArchiveCardProps {
  province: ProvinceData;
}

export default function ArchiveCard({ province }: ArchiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, rotate: 0.8 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: -20, rotate: -0.8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full relative rounded-2xl p-6 bg-[#FAF5EB] border border-[#2A1D13]/15 shadow-md flex flex-col justify-between"
      style={{
        backgroundImage: 'linear-gradient(rgba(42, 29, 19, 0.015) 1px, transparent 1px)',
        backgroundSize: '100% 20px',
      }}
    >
      {/* 3D Paper Clip styling */}
      <div className="absolute -top-3 left-8 w-6 h-10 pointer-events-none z-30 opacity-75">
        <svg viewBox="0 0 24 40" className="w-full h-full text-[#B38A3A] fill-current">
          <path d="M 12,2 C 8.5,2 6,4.5 6,8 L 6,28 C 6,32.5 9.5,36 14,36 C 18.5,36 22,32.5 22,28 L 22,10 L 20,10 L 20,28 C 20,31.5 17.5,34 14,34 C 10.5,34 8,31.5 8,28 L 8,8 C 8,5.5 10,3.5 12,3.5 C 14,3.5 16,5.5 16,8 L 16,26 C 16,27 15,28 14,28 C 13,28 12,27 12,26 L 12,10 L 10,10 L 10,26 C 10,28.5 12,30 14,30 C 16,30 18,28.5 18,26 L 18,8 C 18,4.5 15.5,2 12,2 Z" />
        </svg>
      </div>

      {/* Dry woodblock ink stamp */}
      <div className="absolute top-6 right-6 border-[1.2px] border-dashed border-[#8C5442]/50 rounded px-2 py-0.5 text-[8px] text-[#8C5442] font-mono select-none pointer-events-none transform rotate-12">
        SURVEY DEPOT 14 <br /> RECORD VERIFIED
      </div>

      <div className="space-y-4">
        <div className="pt-2">
          <span className="font-mono text-[9px] tracking-widest text-[#2A1D13]/40 block">
            {province.archiveNo}
          </span>
          <h2 className="text-3xl font-serif text-[#2A1D13] leading-none mt-1">
            {province.name}
          </h2>
          <h3
            className="text-lg text-[#8C5442] italic mt-0.5"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            {province.nepaliName}
          </h3>
        </div>

        <hr className="border-t border-[#2A1D13]/10" />

        <div className="space-y-2.5 text-[11px] text-[#2A1D13]/85 font-serif leading-relaxed">
          <p className="italic leading-relaxed text-xs text-[#5B4534]">
            &ldquo;{province.poeticDescription}&rdquo;
          </p>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2">
            <div>
              <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">Elevation Range:</span>
              <span className="text-[11px] font-medium text-[#2A1D13]">{province.elevation}</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">Total Area:</span>
              <span className="text-[11px] font-medium text-[#2A1D13]">{province.area}</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">Highest Peak:</span>
              <span className="text-[11px] font-medium text-[#2A1D13]">{province.highestPeak}</span>
            </div>
            <div>
              <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">Major Hubs:</span>
              <span className="text-[11px] font-medium text-[#2A1D13] truncate block" title={province.majorCities}>
                {province.majorCities}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">National Parks:</span>
            <span className="text-[11px] text-[#2A1D13] font-medium">{province.nationalParks}</span>
          </div>

          <div>
            <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">UNESCO Heritage:</span>
            <span className="text-[11px] text-[#2A1D13] font-medium">{province.unescoSites}</span>
          </div>

          <div>
            <span className="text-[9px] text-[#5B4534] block uppercase tracking-wider font-bold">Local Festivals:</span>
            <span className="text-[11px] text-[#2A1D13] font-medium">{province.festivals}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2A1D13]/10 flex justify-between items-end">
        <div className="text-[8px] font-mono uppercase text-[#2A1D13]/40">
          SURVEY RECORD VII <br />
          <span className="text-[#8C5442]">{province.sketchLabel}</span>
        </div>
        <div className="w-16 h-8 opacity-40">
          <svg viewBox="0 0 60 30" className="w-full h-full text-[#2A1D13] fill-current">
            <polygon points="10,30 30,5 50,30" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <polygon points="25,30 38,12 52,30" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <line x1="30" y1="5" x2="33" y2="15" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}