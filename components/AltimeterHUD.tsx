'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AltimeterStop {
  altitude: number;
  name: string;
  label: string;
}

export default function AltimeterHUD() {
  const [currentAltitude, setCurrentAltitude] = useState(60);
  const [activeRegion, setActiveRegion] = useState('The Terai Belt');
  const hudRef = useRef<HTMLDivElement>(null);
  const trackerFillRef = useRef<HTMLDivElement>(null);

  const stops: AltimeterStop[] = [
    { altitude: 8848, name: 'The Summit', label: 'Everest' },
    { altitude: 5364, name: 'Khumbu Base Camp', label: 'Base Camp' },
    { altitude: 4500, name: 'Alpine Ridge', label: 'High Himal' },
    { altitude: 3000, name: 'The Highland Forests', label: 'Lower Himal' },
    { altitude: 2000, name: 'Kathmandu Bowl', label: 'Kathmandu' },
    { altitude: 1400, name: 'Middle Valleys', label: 'Mid Hills' },
    { altitude: 700, name: 'Chure Foothills', label: 'Chure' },
    { altitude: 60, name: 'The Terai Belt', label: 'Terai' }
  ];

  useGSAP(() => {
    const hud = hudRef.current;
    if (!hud) return;

    gsap.fromTo(
      hud,
      { opacity: 0, x: -80, rotateY: 30 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#ascent',
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
  }, { scope: hudRef });

  useEffect(() => {
    const handleAltitudeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { altitude, region } = customEvent.detail;
      
      const numericAltitude = parseInt(altitude.replace(/[^0-9]/g, ''), 10);
      
      setCurrentAltitude(numericAltitude);
      setActiveRegion(region);

      const stopIndex = stops.findIndex(s => s.altitude === numericAltitude);
      if (stopIndex !== -1 && trackerFillRef.current) {
        const totalSteps = stops.length - 1;
        const fillPercentage = ((totalSteps - stopIndex) / totalSteps) * 100;

        gsap.to(trackerFillRef.current, {
          height: `${fillPercentage}%`,
          duration: 1.1,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('nepal-altitude-change', handleAltitudeChange);
    return () => window.removeEventListener('nepal-altitude-change', handleAltitudeChange);
  }, []);

  return (
    <div
      ref={hudRef}
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 flex items-center gap-6 pointer-events-none select-none origin-left opacity-0"
      style={{ perspective: '1000px' }}
    >
      <div className="relative bg-[#FAF3DE]/95 border border-[var(--primary-ink)]/15 rounded-md shadow-lg p-5 md:p-6 flex flex-col justify-between w-[150px] h-[340px] pointer-events-auto filter drop-shadow-sm backdrop-blur-[2px]">
        <div className="absolute right-[4px] inset-y-0 w-[1px] bg-[var(--primary-ink)]/5" />
        
        <div className="flex flex-col items-start border-b border-[var(--primary-ink)]/10 pb-3 w-full">
          <span className="text-[8px] uppercase tracking-[0.25em] text-[var(--secondary-ink)]/70 font-mono">EL. PROFILE</span>
          <div className="text-xl font-bold text-[var(--primary-ink)] font-serif mt-1 flex items-baseline gap-0.5 leading-none">
            <span className="tabular-nums transition-all duration-300">{currentAltitude.toLocaleString()}</span>
            <span className="text-[9px] font-normal font-sans tracking-wide">m</span>
          </div>
          <span className="text-[7.5px] uppercase tracking-wider text-[var(--secondary-ink)]/50 mt-1 truncate max-w-full italic font-serif">
            {activeRegion}
          </span>
        </div>

        <div className="flex-1 w-full flex items-center justify-center my-4 relative">
          <div className="absolute left-[3px] top-1 bottom-1 w-[1px] bg-[var(--primary-ink)]/10">
            <div
              ref={trackerFillRef}
              className="absolute bottom-0 left-0 w-[1px] bg-[#8C5442] origin-bottom transition-all"
              style={{ height: '0%' }}
            />
          </div>

          <div className="w-full h-full flex flex-col justify-between relative pl-[14px]">
            {stops.map((stop) => {
              const isActive = currentAltitude === stop.altitude;
              const isPassed = currentAltitude >= stop.altitude;
              
              return (
                <div key={stop.altitude} className="flex items-center gap-3 relative h-3">
                  <div
                    className={`absolute -left-[14px] w-2 h-2 rounded-full border transition-all duration-700 ${
                      isActive
                        ? 'bg-[#8C5442] border-[#8C5442] scale-125 shadow-sm'
                        : isPassed
                        ? 'bg-[#8C5442]/50 border-[var(--primary-ink)]/25'
                        : 'bg-[#FAF3DE] border-[var(--primary-ink)]/15'
                    }`}
                  />
                  <span
                    className={`text-[8px] font-serif tracking-widest uppercase transition-all duration-500 truncate ${
                      isActive
                        ? 'text-[#8C5442] font-bold scale-[1.03] translate-x-1'
                        : 'text-[var(--secondary-ink)]/45'
                    }`}
                  >
                    {stop.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}