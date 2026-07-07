'use client';

import InteractiveMap from '../InteractiveMap';

interface MapContainerProps {
  triggerDraw: boolean;
}

export default function MapContainer({ triggerDraw }: MapContainerProps) {
  return <InteractiveMap triggerDraw={triggerDraw} />;
}
