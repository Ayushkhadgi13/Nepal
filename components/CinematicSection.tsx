'use client';

import { motion } from 'framer-motion';

interface CinematicSectionProps {
  id: string;
  tagline: string;
  title: string;
  description: string;
  imagePlaceholderText: string;
  accent: string;
  imageBg: string;
}

export default function CinematicSection({
  id,
  tagline,
  title,
  description,
  imagePlaceholderText,
  accent,
  imageBg,
}: CinematicSectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-12 relative overflow-hidden border-t border-[#2A1D13]/10 bg-[#E7D7B5]/15"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="flex flex-col justify-center">
          <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${accent}`}>{tagline}</span>
          <h3 className="text-3xl md:text-5xl font-serif font-normal text-[#2A1D13] tracking-wide mt-3 mb-6 uppercase leading-tight">
            {title}
          </h3>
          <div className="h-[1px] w-16 bg-[#2A1D13]/15 mb-6" />
          <p className="text-xs md:text-sm text-[#2A1D13]/85 font-serif leading-relaxed mb-8 max-w-lg italic">
            "{description}"
          </p>

          <div className="flex gap-4">
            <button className="stamp-button px-6 py-3 rounded text-[9px] uppercase tracking-[0.2em] font-bold">
              Examine Archives
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative h-[280px] md:h-[450px] rounded-2xl overflow-hidden group border border-[#2A1D13]/15 bg-[#E7D7B5]/40 shadow-sm"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${imageBg} opacity-15`} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/5">
            <div className="w-10 h-10 rounded-full border border-[#2A1D13]/15 flex items-center justify-center mb-4 text-[#2A1D13]">
              +
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#5B4534] font-bold">Field Illustration</span>
            <p className="text-base text-[#2A1D13] font-serif font-light italic mt-2 max-w-xs">{imagePlaceholderText}</p>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#2A1D13]/50 font-serif">Plate IV</span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#8C5442] font-mono font-bold">LOKTA CHRONICLE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}