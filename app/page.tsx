'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import ScenicHero from '@/components/ScenicHero';
import CinematicSection from '@/components/CinematicSection';
import AmbientParticles from '@/components/AmbientParticles';

export default function Home() {
  // Stages:
  // 0: Cinematic Intro Screen (नमस्कार) - Only IntroScreen is mounted
  // 1: Navbar Drawing (Left/right rolls, borders, menu items)
  // 2: Hero Drawing (ScenicHero, lower sections, and footer are mounted and animated)
  // 3: Interactive (Lenis active, user interaction and scroll unlocked)
  const [stage, setStage] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Disable default browser scroll restoration and force top coordinates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync scroll lock and force scroll position during transition stages
  useEffect(() => {
    if (stage < 3) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [stage]);

  // Smoothly trigger main paper fade-in upon entering Stage 1
  useEffect(() => {
    if (stage >= 1) {
      const timer = setTimeout(() => setMounted(true), 20);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <SmoothScroll active={stage === 3}>
      <div className="relative min-h-screen bg-[#F2E6C9] overflow-hidden selection:bg-[#B38A3A]/25 selection:text-[#2A1D13]">
        
        {/* Stage 0: Cinematic Intro Screen - Rendered exclusively */}
        {stage === 0 && (
          <IntroScreen onComplete={() => setStage(1)} />
        )}

        {/* Stage 1+: Mount remaining application components sequentially */}
        {stage >= 1 && (
          <>
            {/* Soft solar dust */}
            <AmbientParticles />

            <div
              className={`lokta-paper-main min-h-screen transition-opacity duration-700 ease-in-out relative z-10 ${
                mounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Navbar starts drawing in Stage 1 and triggers Stage 2 */}
              <Navbar 
                triggerDraw={stage >= 1} 
                onComplete={() => {
                  if (stage === 1) {
                    setStage(2);
                  }
                }} 
              />

              <main className="relative z-10">
                {/* Hero mounts and starts animating only in Stage 2 */}
                {stage >= 2 && (
                  <section id="about">
                    <ScenicHero 
                      triggerMapDraw={stage >= 2} 
                      onComplete={() => {
                        if (stage === 2) {
                          setStage(3);
                        }
                      }}
                    />
                  </section>
                )}

                {/* Remaining sections mount only in Stage 2+ to prevent early rendering */}
                {stage >= 2 && (
                  <>
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
                  </>
                )}
              </main>

              {stage >= 2 && (
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
              )}
            </div>
          </>
        )}
      </div>
    </SmoothScroll>
  );
}