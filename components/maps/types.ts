export interface ProvinceData {
  id: string;
  name: string;
  nepaliName: string;
  elevation: string;
  area: string;
  highestPeak: string;
  majorCities: string;
  nationalParks: string;
  unescoSites: string;
  festivals: string;
  poeticDescription: string;
  archiveNo: string;
  sketchLabel: string;
  path: string;
  cx: number; // Center X for label alignment
  cy: number; // Center Y for label alignment
}

export interface MapAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  illustrationsRef: React.RefObject<SVGGElement | null>;
  namesRef: React.RefObject<SVGGElement | null>;
  compassRef: React.RefObject<SVGGElement | null>;
  dropletRef: React.RefObject<SVGCircleElement | null>;
  triggerDraw: boolean;
  onComplete?: () => void;
}