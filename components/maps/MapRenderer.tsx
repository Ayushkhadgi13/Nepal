'use client';

import { useEffect, useRef, useState } from 'react';
import { MapAnimations } from './MapAnimations';
import { ProvinceHover } from './ProvinceHover';
import { ProvinceId, ProvinceMap, SvgMapHandle } from './types';

interface MapRendererProps {
  svgUrl: string;
  triggerDraw: boolean;
  provinces: ProvinceMap;
  selectedProvince: ProvinceId | null;
  hoveredProvince: ProvinceId | null;
  onHover: (provinceId: ProvinceId | null) => void;
  onSelect: (provinceId: ProvinceId) => void;
  onSvgInjected?: (handle: SvgMapHandle) => void;
}

export default function MapRenderer({
  svgUrl,
  triggerDraw,
  provinces,
  selectedProvince,
  hoveredProvince,
  onHover,
  onSelect,
  onSvgInjected,
}: MapRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupEventsRef = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSvg() {
      try {
        setLoading(true);
        const response = await fetch(svgUrl);
        if (!response.ok) {
          throw new Error(`Map SVG request failed: ${response.status} ${response.statusText}`);
        }

        const rawSvg = await response.text();
        if (!active || !containerRef.current) return;

        cleanupEventsRef.current?.();
        cleanupEventsRef.current = null;

        const parsedDocument = new DOMParser().parseFromString(rawSvg, 'image/svg+xml');
        const parsedSvg = parsedDocument.querySelector('svg');
        if (!parsedSvg) throw new Error('Map SVG did not contain a root <svg> element.');

        parsedSvg.querySelectorAll('script').forEach((node) => node.remove());
        parsedSvg.classList.add('w-full', 'h-full', 'overflow-visible');
        parsedSvg.setAttribute('role', 'img');
        parsedSvg.setAttribute('aria-label', 'Interactive province map of Nepal');

        containerRef.current.replaceChildren(document.importNode(parsedSvg, true));

        const injectedSvg = containerRef.current.querySelector<SVGSVGElement>('svg');
        if (!injectedSvg) throw new Error('Map SVG injection failed.');

        const provinceEntries = Object.keys(provinces).flatMap((id) => {
          const path = injectedSvg.querySelector<SVGPathElement>(`#${id}`);
          return path ? [[id as ProvinceId, path] as const] : [];
        });

        cleanupEventsRef.current = ProvinceHover.bindEvents(containerRef.current, {
          provinces,
          onHover,
          onSelect,
        });

        setLoading(false);
        onSvgInjected?.({
          container: containerRef.current,
          svg: injectedSvg,
          provinces: new Map(provinceEntries),
        });
      } catch (error) {
        console.error('Error loading Nepal map SVG:', error);
        if (active) setLoading(false);
      }
    }

    loadSvg();

    return () => {
      active = false;
      cleanupEventsRef.current?.();
      cleanupEventsRef.current = null;
    };
  }, [svgUrl, provinces, onHover, onSelect, onSvgInjected]);

  useEffect(() => {
    if (loading || !triggerDraw || !containerRef.current) return;

    const timeline = MapAnimations.triggerInitialDraw(containerRef.current);
    return () => {
      timeline.kill();
    };
  }, [loading, triggerDraw]);

  useEffect(() => {
    if (loading || !containerRef.current) return;
    ProvinceHover.syncSelection(containerRef.current, provinces, selectedProvince, hoveredProvince);
  }, [hoveredProvince, loading, provinces, selectedProvince]);

  return (
    <div className="relative flex min-h-[280px] w-full aspect-[17/10] items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#F2E6C9]/10 backdrop-blur-sm pointer-events-none transition-opacity duration-500">
          <div className="mb-3 h-8 w-8 animate-spin rounded-full border border-[#8C5442] border-t-transparent" />
          <span className="text-[10px] tracking-[0.3em] font-mono text-[var(--secondary-ink)] uppercase">
            Loading Atlas Assets...
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`h-full w-full transition-opacity duration-1000 [&_svg]:block ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
