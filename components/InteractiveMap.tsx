'use client';

import MapContainer from './maps/MapContainer';

interface InteractiveMapProps {
  triggerDraw: boolean;
}

export default function InteractiveMap({ triggerDraw }: InteractiveMapProps) {
  return <MapContainer triggerDraw={triggerDraw} />;
}