'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

const STATS = [
  { target: 60,  suffix: '+', label: 'Proyectos\nrealizados',   duration: 1600 },
  { target: 25,  suffix: '+', label: 'Años de\nexperiencia',    duration: 1400 },
  { target: 98,  suffix: '%', label: 'Clientes\nsatisfechos',   duration: 2000 },
  { target: 100, suffix: '%', label: 'Compromiso\ngarantizado', duration: 1800 },
];

function Counter({ target, suffix, label, duration, start }) {
  const value = useCountUp(target, duration, start);
  return (
    <div className="text-center px-4 md:px-8 flex flex-col items-center">
      <span
        className="text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight"
        style={{ color: '#8ad341' }}
      >
        {value}
        {suffix}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-widest whitespace-pre-line text-center">
        {label}
      </span>
    </div>
  );
}

export default function CounterBar() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f07 0%, #111a08 50%, #0a0f07 100%)' }}
      aria-label="Estadísticas Flor Del Valle"
    >
      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(138,211,65,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #8ad341 50%, transparent 100%)' }}
      />
      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #8ad341 50%, transparent 100%)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {STATS.map((s, i) => (
            <Counter key={i} {...s} start={started} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-xs text-gray-500 mt-10 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Jardineros profesionales en Madrid desde 1999
        </motion.p>
      </div>
    </section>
  );
}
