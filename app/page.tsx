'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import ScenicHero from '@/components/ScenicHero';
import CinematicSection from '@/components/CinematicSection';
import AmbientParticles from '@/components/AmbientParticles';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (!introFinished) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [introFinished]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F2E6C9] overflow-hidden selection:bg-[#B38A3A]/25 selection:text-[#2A1D13]">
        {/* Intro transition overlay */}
        {!introFinished && <IntroScreen onComplete={() => setIntroFinished(true)} />}

        {/* Sunlight dust particles */}
        <AmbientParticles />

        <div
          className={`lokta-paper-main min-h-screen transition-opacity duration-1500 ease-in-out relative z-10 ${
            introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Navbar />

          <main className="relative z-10">
            <section id="about">
              <ScenicHero />
            </section>

            <CinematicSection
              id="explore"
              tagline="Expedition Notes on Peak Cartography"
              title="The Himalayas"
              description="Drawn inside historical notebooks: an endless system of frozen giants, glacial runs, and deep valleys. The Himalayas represent the high, cold, and sacred edges of Nepal, surviving as a permanent symbol of quiet grandeur."
              imagePlaceholderText="Ink sketch: Everest & Nuptse crestlines"
              accent="text-[#647A91]"
              imageBg="from-[#647A91]/15 to-[#2A1D13]/5"
            />

            <CinematicSection
              id="districts"
              tagline="Archives of Living Valley Temples"
              title="Heritage & Culture"
              description="Detailed entries regarding the clay palaces, stone steps, and gilded shrines of Kathmandu Valley. Here, decades-old woodcarvings and copper prayer flags are preserved as active communal hubs."
              imagePlaceholderText="Woodblock design: Patan Durbar Square"
              accent="text-[#8C5442]"
              imageBg="from-[#8C5442]/15 to-[#2A1D13]/5"
            />
          </main>

          <footer className="py-16 px-6 border-t border-[#2A1D13]/10 text-center relative z-20 bg-[#2A1D13]/2">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#5B4534] font-medium font-serif">
                © {new Date().getFullYear()} The Living Journal of Nepal. All Rights Reserved.
              </span>
              <div className="flex gap-8">
                <a href="#" className="text-[10px] uppercase tracking-wider text-[#2A1D13]/80 hover:text-[#B38A3A] transition-colors font-serif font-bold">
                  Archival Records
                </a>
                <a href="#" className="text-[10px] uppercase tracking-wider text-[#2A1D13]/80 hover:text-[#B38A3A] transition-colors font-serif font-bold">
                  Field Maps
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SmoothScroll>
  );
}