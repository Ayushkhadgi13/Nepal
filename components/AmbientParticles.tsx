'use client';

import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isLoopActive = true;

    const dustList: DustParticle[] = [];
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const createDust = () => {
      const count = isReducedMotion ? 10 : Math.min(Math.floor(width / 25), 45);
      dustList.length = 0;
      for (let i = 0; i < count; i++) {
        dustList.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.3,
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: -Math.random() * 0.12 - 0.04,
          opacity: Math.random() * 0.2 + 0.05,
          drift: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.008 + 0.002,
        });
      }
    };

    createDust();

    const draw = () => {
      if (!isLoopActive) return;
      
      ctx.clearRect(0, 0, width, height);

      dustList.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42, 29, 19, ${d.opacity})`;
        ctx.fill();

        d.y += d.speedY;
        d.drift += d.driftSpeed;
        d.x += d.speedX + Math.sin(d.drift) * 0.04;

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
          d.opacity = Math.random() * 0.2 + 0.05;
        }
        if (d.x < -10 || d.x > width + 10) {
          d.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Pause rendering entirely when the tab is out of focus (battery-saving)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isLoopActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isLoopActive) {
          isLoopActive = true;
          draw();
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createDust();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 opacity-60"
      aria-hidden="true"
    />
  );
}