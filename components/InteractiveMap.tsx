'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ArchiveCard from './maps/ArchiveCard';
import MapRenderer from './maps/MapRenderer';
import { mapData } from './maps/mapData';
import { ProvinceId, SvgMapHandle } from './maps/types';

interface InteractiveMapProps {
  triggerDraw: boolean;
}

export default function InteractiveMap({ triggerDraw }: InteractiveMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceId | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | null>(null);
  const [mapHandle, setMapHandle] = useState<SvgMapHandle | null>(null);
  const provinceList = useMemo(() => Object.values(mapData), []);

  const activeProvince = hoveredProvince ?? selectedProvince;
  const activeProvinceData = activeProvince ? mapData[activeProvince] : null;

  const handleHover = useCallback((provinceId: ProvinceId | null) => {
    setHoveredProvince(provinceId);
  }, []);

  const handleSelect = useCallback((provinceId: ProvinceId) => {
    setSelectedProvince((current) => (current === provinceId ? null : provinceId));
    setHoveredProvince(provinceId);
  }, []);

  const handleSvgInjected = useCallback((handle: SvgMapHandle) => {
    setMapHandle(handle);
  }, []);

  useEffect(() => {
    if (!triggerDraw || selectedProvince) return;

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollable > 0 ? window.scrollY / scrollable : 0;
      const index = Math.min(Math.floor(scrollPercent * provinceList.length), provinceList.length - 1);
      setHoveredProvince(provinceList[index]?.id ?? null);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [provinceList, selectedProvince, triggerDraw]);

  return (
    <section
      className="relative w-full rounded-2xl border border-[var(--primary-ink)]/10 bg-[#FAF3DE]/35 p-5 md:p-6 backdrop-blur-[1px] transition-colors duration-1000 shadow-sm"
      aria-label="Interactive Nepal province archive"
    >
      <div className="mb-5 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--secondary-ink)] font-bold">
          Field Survey Plan
        </span>
        <span className="text-xs italic text-[var(--primary-ink)]/80 font-serif">
          Administrative atlas geometry loaded from /maps/nepal.svg
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-stretch">
        <MapRenderer
          svgUrl="/maps/nepal.svg"
          triggerDraw={triggerDraw}
          provinces={mapData}
          selectedProvince={selectedProvince}
          hoveredProvince={hoveredProvince}
          onHover={handleHover}
          onSelect={handleSelect}
          onSvgInjected={handleSvgInjected}
        />

        <ArchiveCard data={activeProvinceData} />
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-[var(--primary-ink)]/5 pt-4 text-[10px] uppercase tracking-wider text-[var(--secondary-ink)]/70 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Selectable paths:{' '}
          <strong className="text-[var(--primary-ink)]">{mapHandle?.provinces.size ?? 0}</strong>
        </span>
        <span className="font-mono text-[9px]">External SVG Geometry Source</span>
      </div>
    </section>
  );
}
