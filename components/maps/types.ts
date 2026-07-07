export interface ProvinceData {
  id: ProvinceId;
  nameEn: string;
  nameNe: string;
  elevation: string;
  terrain: string;
  description: string;
  highlights: string[];
  name?: string;
  nepaliName?: string;
  path?: string;
  cx?: number;
  cy?: number;
}

export type ProvinceId =
  | 'koshi'
  | 'madhesh'
  | 'bagmati'
  | 'gandaki'
  | 'lumbini'
  | 'karnali'
  | 'sudurpashchim';

export type ProvinceMap = Record<ProvinceId, ProvinceData>;

export interface SvgMapHandle {
  container: HTMLElement;
  svg: SVGSVGElement;
  provinces: Map<ProvinceId, SVGPathElement>;
}
