'use client';
import { useEffect, useRef } from 'react';

const PALETTE = [
  '#8ad341', '#9ae053', '#75b930', '#a6e072',
  '#6bc528', '#b5e86a', '#7ec832', '#c3f07a',
  '#5aaa1e', '#4d9918', '#d4f590', '#e8ffcc',
];

class Particle {
  constructor(canvas, isInitial = false) {
    this.canvas = canvas;
    this.init(isInitial);
  }

  init(isInitial = false) {
    const { width, height } = this.canvas;

    // Depth: 0 = far/back, 1 = near/front
    this.z = Math.pow(Math.random(), 1.8);
    this.size = 3 + this.z * 18;
    this.x = Math.random() * width;

    // Rising seeds (5%) vs falling leaves (95%)
    this.rising = Math.random() < 0.05;

    if (isInitial) {
      this.y = Math.random() * height;
    } else {
      this.y = this.rising ? height + this.size * 2 : -this.size * 2;
    }

    const speed = 0.25 + this.z * 1.5;
    this.vx = (Math.random() - 0.5) * 0.6 * (0.3 + this.z);
    this.vy = this.rising ? -speed * 0.6 : speed;

    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.035 * (1 + this.z * 0.5);

    // 3D flip simulation (coin-flip around vertical axis)
    this.flip = Math.random() * Math.PI * 2;
    this.flipSpeed = (Math.random() - 0.5) * 0.022 + (this.rising ? 0.01 : 0);

    // Horizontal sway
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleAmp = 0.4 + Math.random() * 0.8 * this.z;
    this.wobbleSpeed = 0.012 + Math.random() * 0.018;

    // Visual
    this.opacity = 0.12 + this.z * 0.72;
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];

    // Shape: 0 = pollen dot, 1 = round leaf, 2 = long leaf, 3 = maple-ish
    const r = Math.random();
    this.type = r < 0.18 ? 0 : r < 0.55 ? 1 : r < 0.82 ? 2 : 3;

    // Glow effect only on near-ish particles
    this.glow = this.z > 0.55 && Math.random() > 0.35;
  }

  update(mouse, wind) {
    this.wobble += this.wobbleSpeed;
    const windInfluence = wind * (0.25 + this.z * 0.75);
    this.x += this.vx + Math.sin(this.wobble) * this.wobbleAmp + windInfluence;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.flip += this.flipSpeed;

    // Mouse repulsion (wind gust effect)
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const radius = 110 + this.z * 90;
      if (distSq < radius * radius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = Math.pow((radius - dist) / radius, 2) * 3.5;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force * 0.65;
      }
    }

    const { width, height } = this.canvas;
    const margin = 80;
    if (
      this.y > height + margin ||
      this.y < -height * 0.6 ||
      this.x < -margin ||
      this.x > width + margin
    ) {
      this.init(false);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.glow) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.size * 2.2;
    }

    if (this.type === 0) {
      // Pollen / seed dot
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      if (this.size > 7) {
        // Halo
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = this.color + '40';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    } else {
      // Leaf with 3D flip
      const flipScale = Math.cos(this.flip);
      ctx.scale(flipScale, 1);

      const h = this.size * 0.5;

      if (this.type === 1) {
        // Round/oval leaf
        const w = this.size * 0.42;
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.bezierCurveTo(w * 1.3, -h * 0.35, w * 1.3, h * 0.35, 0, h);
        ctx.bezierCurveTo(-w * 1.3, h * 0.35, -w * 1.3, -h * 0.35, 0, -h);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.size > 9 && Math.abs(flipScale) > 0.15) {
          // Central vein
          ctx.beginPath();
          ctx.moveTo(0, -h * 0.85);
          ctx.quadraticCurveTo(w * 0.12, 0, 0, h * 0.85);
          ctx.strokeStyle = 'rgba(255,255,255,0.22)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
          // Side veins
          if (this.size > 13) {
            for (let s = -1; s <= 1; s += 2) {
              ctx.beginPath();
              ctx.moveTo(0, -h * 0.2);
              ctx.quadraticCurveTo(w * 0.5 * s, h * 0.15, w * 0.9 * s, h * 0.4);
              ctx.strokeStyle = 'rgba(255,255,255,0.14)';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      } else if (this.type === 2) {
        // Long/narrow leaf
        const w = this.size * 0.24;
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.bezierCurveTo(w, -h * 0.4, w, h * 0.4, 0, h);
        ctx.bezierCurveTo(-w, h * 0.4, -w, -h * 0.4, 0, -h);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.size > 8 && Math.abs(flipScale) > 0.15) {
          ctx.beginPath();
          ctx.moveTo(0, -h * 0.9);
          ctx.lineTo(0, h * 0.9);
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      } else {
        // 5-lobe simplified leaf (maple-inspired)
        const w = this.size * 0.48;
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.lineTo(w * 0.45, -h * 0.2);
        ctx.lineTo(w, -h * 0.3);
        ctx.lineTo(w * 0.55, h * 0.1);
        ctx.lineTo(w * 0.35, h);
        ctx.lineTo(0, h * 0.55);
        ctx.lineTo(-w * 0.35, h);
        ctx.lineTo(-w * 0.55, h * 0.1);
        ctx.lineTo(-w, -h * 0.3);
        ctx.lineTo(-w * 0.45, -h * 0.2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    ctx.restore();
  }
}

export default function NatureCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: null, y: null },
    wind: 0,
    windTarget: 0,
    windTimer: 0,
    animId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Particle count scaled by screen area, capped for performance
    const count = Math.min(75, Math.max(28, Math.floor((canvas.width * canvas.height) / 11000)));
    s.particles = Array.from({ length: count }, () => new Particle(canvas, true));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Evolve wind gently
      s.windTimer++;
      if (s.windTimer > 160) {
        s.windTarget = (Math.random() - 0.5) * 1.4;
        s.windTimer = 0;
      }
      s.wind += (s.windTarget - s.wind) * 0.007;

      // Depth-sort: far particles drawn first (painter's algorithm)
      s.particles.sort((a, b) => a.z - b.z);

      for (const p of s.particles) {
        p.update(s.mouse, s.wind);
        p.draw(ctx);
      }

      s.animId = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      s.mouse.x = null;
      s.mouse.y = null;
    };
    const onResize = () => {
      resize();
      // Re-spread particles within new bounds
      s.particles.forEach(p => {
        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 3, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
