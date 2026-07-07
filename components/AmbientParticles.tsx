'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  length: number;           // Fiber strand physical dimension parameter
  angle: number;            // Fiber strand rotation state
  angularVelocity: number;  // Rotational velocity parameter
  type: 'dust' | 'organic-fiber' | 'mist' | 'snowflake';
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles: Particle[] = [];
    let animationFrameId: number;

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(Math.floor(width / 24), 60);
      for (let i = 0; i < count; i++) {
        const pTypeRand = Math.random();
        let type: Particle['type'] = 'dust';
        
        if (pTypeRand > 0.75) {
          type = 'organic-fiber';
        } else if (pTypeRand > 0.6) {
          type = 'mist';
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: type === 'mist' ? Math.random() * 12 + 6 : Math.random() * 1.6 + 0.3,
          speedY: -Math.random() * 0.12 - 0.03,
          speedX: (Math.random() - 0.5) * 0.08,
          opacity: Math.random() * 0.18 + 0.04,
          drift: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.003 + 0.001,
          length: Math.random() * 14 + 6,
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.01,
          type
        });
      }
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = totalScroll > 0 ? scrollY / totalScroll : 0;

      // Real-time environmental transition flags
      const isWarmPlain = scrollPercent < 0.25;
      const isMistZone = scrollPercent >= 0.25 && scrollPercent < 0.65;
      const isAlpineAscent = scrollPercent >= 0.65;

      particles.forEach((p) => {
        // Adapt physical properties dynamically depending on the current climate zone
        if (isAlpineAscent) {
          p.type = 'snowflake';
          p.speedY = Math.max(p.speedY, 0.75 + p.size * 0.45);
          p.speedX = -0.9 - Math.random() * 0.6; // High altitude crosswind behavior
          p.opacity = Math.min(p.opacity + 0.005, 0.5);
        } else if (isMistZone) {
          if (p.type !== 'mist' && Math.random() > 0.95) p.type = 'mist';
          p.speedY = -0.15 - Math.random() * 0.15;
          p.speedX = (Math.random() - 0.5) * 0.3;
          p.opacity = Math.max(p.opacity - 0.002, 0.08);
        } else {
          // Warm Lowland Plain dust/fiber defaults
          if (p.type === 'snowflake') p.type = 'dust';
          p.speedY = -0.1 - Math.random() * 0.08;
          p.speedX = (Math.random() - 0.5) * 0.08;
        }

        ctx.beginPath();

        if (p.type === 'snowflake') {
          // Crystalline snowy formations falling at a dynamic velocity vector
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 238, 242, ${p.opacity * 1.6})`;
          ctx.fill();
        } else if (p.type === 'mist') {
          // Soft valley fog particles mapping moisture accumulation
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.22})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'organic-fiber') {
          // Fine curves simulating strands of Lokta wood bark pulp floating within the air
          ctx.strokeStyle = `rgba(74, 53, 37, ${p.opacity * 0.7})`;
          ctx.lineWidth = 0.55;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.moveTo(-p.length / 2, 0);
          ctx.quadraticCurveTo(0, Math.sin(p.drift) * 4, p.length / 2, 0);
          ctx.stroke();
          ctx.restore();
          
          p.angle += p.angularVelocity;
        } else {
          // Warm golden-brown dust specks illuminated by sunlight
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(94, 70, 51, ${p.opacity * 0.8})`;
          ctx.fill();
        }

        // Apply physical changes
        p.y += p.speedY;
        p.drift += p.driftSpeed;
        p.x += p.speedX + Math.sin(p.drift) * 0.04;

        // Check canvas boundary intersections and recycle particles cleanly
        if (p.y < -40 || p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          p.y = p.speedY > 0 ? -30 : height + 30;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-80"
      aria-hidden="true"
    />
  );
}