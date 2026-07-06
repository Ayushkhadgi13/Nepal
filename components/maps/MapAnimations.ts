import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapAnimationProps } from './types';

gsap.registerPlugin(ScrollTrigger);

export function runMapAnimations({
  containerRef,
  svgRef,
  pathRefs,
  illustrationsRef,
  namesRef,
  compassRef,
  dropletRef,
  triggerDraw,
  onComplete,
}: MapAnimationProps) {
  if (!triggerDraw) return;

  // Ensure initial starting conditions
  gsap.set([illustrationsRef.current, namesRef.current], { opacity: 0 });
  gsap.set(dropletRef.current, { scale: 0, opacity: 0 });

  const totalTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 85%',
      once: true,
    },
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  // Step A: Ink Droplet splash
  totalTimeline.to(dropletRef.current, {
    scale: 1,
    opacity: 0.9,
    duration: 0.35,
    ease: 'bounce.out',
  });
  totalTimeline.to(dropletRef.current, {
    scale: 4,
    opacity: 0,
    duration: 0.55,
    ease: 'power2.out',
  }, '-=0.1');

  // Step B: Sequential Drawing of boundaries
  pathRefs.current.forEach((path, index) => {
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });

    totalTimeline.to(path, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 1.0 + Math.random() * 0.4,
      ease: 'power1.inOut',
    }, index === 0 ? '-=0.2' : '-=0.9');
  });

  // Step C: Illustrations fade-in
  totalTimeline.fromTo(
    illustrationsRef.current,
    { opacity: 0 },
    { opacity: 0.75, duration: 1.1, ease: 'power2.out' },
    '-=0.4'
  );

  // Step D: Typography Printed label fade-in
  totalTimeline.fromTo(
    namesRef.current,
    { opacity: 0, y: 4 },
    { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
    '-=0.5'
  );

  // Step E: Set up constant idle compass breathing animation loop
  const compassNeedle = compassRef.current?.querySelector('#needleGroup');
  if (compassNeedle) {
    gsap.fromTo(
      compassNeedle,
      { rotation: -4 },
      {
        rotation: 4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '40px 40px',
      }
    );
  }

  // Step F: Subtle structural floating sway to give physical paper weight
  const floatingTween = gsap.to(svgRef.current, {
    y: '+=2.0',
    x: '+=1.0',
    rotation: 0.4,
    transformOrigin: '50% 50%',
    duration: 9.0,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // Pause floating sway when completely off viewport boundaries
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      if (self.isActive) {
        floatingTween.play();
      } else {
        floatingTween.pause();
      }
    },
  });
}