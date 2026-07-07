import { MapAnimations } from './MapAnimations';
import { ProvinceId, ProvinceMap } from './types';

interface ProvinceHoverOptions {
  provinces: ProvinceMap;
  onHover: (provinceId: ProvinceId | null) => void;
  onSelect: (provinceId: ProvinceId) => void;
}

export class ProvinceHover {
  public static bindEvents(container: HTMLElement, options: ProvinceHoverOptions): () => void {
    const provincePaths = ProvinceHover.getProvincePaths(container, options.provinces);

    const handleEnter = (event: Event) => {
      const path = event.currentTarget as SVGPathElement;
      const provinceId = ProvinceHover.getProvinceId(path, options.provinces);
      if (!provinceId || path.classList.contains('is-selected')) return;

      options.onHover(provinceId);
      MapAnimations.animateHoverState(path, true);
    };

    const handleLeave = (event: Event) => {
      const path = event.currentTarget as SVGPathElement;
      const provinceId = ProvinceHover.getProvinceId(path, options.provinces);
      if (!provinceId || path.classList.contains('is-selected')) return;

      options.onHover(null);
      MapAnimations.animateHoverState(path, false);
    };

    const handleSelect = (event: Event) => {
      const path = event.currentTarget as SVGPathElement;
      const provinceId = ProvinceHover.getProvinceId(path, options.provinces);
      if (provinceId) options.onSelect(provinceId);
    };

    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return;

      keyboardEvent.preventDefault();
      handleSelect(event);
    };

    provincePaths.forEach((path) => {
      const provinceId = ProvinceHover.getProvinceId(path, options.provinces);
      const province = provinceId ? options.provinces[provinceId] : null;

      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-label', province ? `${province.nameEn} province` : 'Nepal province');
      path.addEventListener('mouseenter', handleEnter);
      path.addEventListener('mouseleave', handleLeave);
      path.addEventListener('focus', handleEnter);
      path.addEventListener('blur', handleLeave);
      path.addEventListener('click', handleSelect);
      path.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      provincePaths.forEach((path) => {
        path.removeEventListener('mouseenter', handleEnter);
        path.removeEventListener('mouseleave', handleLeave);
        path.removeEventListener('focus', handleEnter);
        path.removeEventListener('blur', handleLeave);
        path.removeEventListener('click', handleSelect);
        path.removeEventListener('keydown', handleKeyDown);
      });
    };
  }

  public static syncSelection(
    container: HTMLElement,
    provinces: ProvinceMap,
    selectedProvince: ProvinceId | null,
    hoveredProvince: ProvinceId | null
  ): void {
    ProvinceHover.getProvincePaths(container, provinces).forEach((path) => {
      const provinceId = ProvinceHover.getProvinceId(path, provinces);
      const isSelected = provinceId === selectedProvince;
      const isHovered = provinceId === hoveredProvince && !isSelected;

      if (isSelected) {
        MapAnimations.animateActiveState(path, true);
      } else if (isHovered) {
        MapAnimations.animateHoverState(path, true);
      } else {
        path.classList.remove('is-hovered', 'is-selected');
        MapAnimations.animateActiveState(path, false);
      }
    });
  }

  private static getProvincePaths(container: HTMLElement, provinces: ProvinceMap): SVGPathElement[] {
    return Object.keys(provinces)
      .map((id) => container.querySelector<SVGPathElement>(`#${id}`))
      .filter((path): path is SVGPathElement => Boolean(path));
  }

  private static getProvinceId(path: SVGPathElement, provinces: ProvinceMap): ProvinceId | null {
    const id = path.id || path.dataset.province || path.getAttribute('data-province');
    return id && id in provinces ? (id as ProvinceId) : null;
  }
}
