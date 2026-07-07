import gsap from 'gsap';

export class MapAnimations {
  public static triggerInitialDraw(container: HTMLElement, onComplete?: () => void): gsap.core.Timeline {
    const boundary = container.querySelector<SVGPathElement>('.country-outline-path, #nepal-outline');
    const mountains = container.querySelectorAll<SVGElement>('.mountain-ridge-trace, .mountain-ridge');
    const rivers = container.querySelectorAll<SVGPathElement>('.river-path-trace, .river-path');
    const grids = container.querySelectorAll<SVGElement>('.tick-line-grid, .tick-line');
    const labels = container.querySelectorAll<SVGElement>('.province-label');

    const timeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete,
    });

    timeline.fromTo(
      grids,
      { opacity: 0 },
      { opacity: 0.6, duration: 1.2, ease: 'power1.out' }
    );

    if (boundary) {
      const length = getPathLength(boundary);
      gsap.set(boundary, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
      timeline.to(
        boundary,
        {
          strokeDashoffset: 0,
          opacity: 0.85,
          duration: 2.8,
          ease: 'power2.inOut',
        },
        '-=0.6'
      );
    }

    timeline.fromTo(
      mountains,
      { opacity: 0, y: 15 },
      { opacity: 0.55, y: 0, stagger: 0.02, duration: 1.5, ease: 'power2.out' },
      '-=1.5'
    );

    rivers.forEach((river) => {
      const length = getPathLength(river);
      gsap.set(river, { strokeDasharray: length, strokeDashoffset: length });
    });

    timeline.fromTo(
      rivers,
      { opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.35, stagger: 0.15, duration: 2, ease: 'sine.inOut' },
      '-=1.2'
    );

    timeline.fromTo(
      labels,
      { opacity: 0, filter: 'blur(3px)' },
      { opacity: 0.85, filter: 'blur(0px)', stagger: 0.08, duration: 0.8, ease: 'power1.out' },
      '-=1'
    );

    return timeline;
  }

  public static animateActiveState(path: SVGPathElement, isActive: boolean): void {
    path.classList.toggle('is-selected', isActive);
    path.classList.remove('is-hovered');

    gsap.to(path, {
      fill: isActive ? 'rgba(140, 84, 66, 0.12)' : 'transparent',
      stroke: isActive ? '#8C5442' : 'rgba(42, 29, 19, 0.35)',
      strokeWidth: isActive ? 2.2 : 1.5,
      duration: isActive ? 0.5 : 0.6,
      ease: isActive ? 'power1.out' : 'power1.inOut',
      overwrite: 'auto',
    });
  }

  public static animateHoverState(path: SVGPathElement, isHovered: boolean): void {
    path.classList.toggle('is-hovered', isHovered);

    gsap.to(path, {
      fill: isHovered ? 'rgba(42, 29, 19, 0.06)' : 'transparent',
      stroke: isHovered ? '#2A1D13' : 'rgba(42, 29, 19, 0.35)',
      strokeWidth: isHovered ? 1.8 : 1.5,
      duration: 0.25,
      ease: 'power1.out',
      overwrite: 'auto',
    });
  }
}

function getPathLength(path: SVGPathElement | null): number {
  return path && typeof path.getTotalLength === 'function' ? path.getTotalLength() : 4500;
}
