'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SERVICES = [
  'Podas y Talas Profesionales',
  'Diseño y Creación de Jardines',
  'Mantenimiento de Piscinas',
  'Mantenimiento de Áreas Verdes',
  'Paisajismo y Mini Obras',
  'Servicio Integral Completo',
];

const ZONAS = [
  'Alcobendas', 'Madrid Capital',
  'La Moraleja', 'San Sebastián de los Reyes',
  'Tres Cantos', 'Pozuelo de Alarcón',
  'Las Rozas', 'Majadahonda',
];

const NAV = [
  { label: 'Inicio',      href: '#inicio'    },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Proyectos',   href: '#proyectos' },
  { label: 'Zonas',       href: '#zonas'     },
  { label: 'FAQ',         href: '#faq'       },
  { label: 'Proceso',     href: '#proceso'   },
  { label: 'Contacto',    href: '#contacto'  },
];

const LEGAL = [
  { label: 'Política de Privacidad', href: '/politica-privacidad' },
  { label: 'Aviso Legal',            href: '/aviso-legal'         },
  { label: 'Política de Cookies',    href: '/politica-cookies'    },
];

function scrollTo(href) {
  if (href.startsWith('#')) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

const PhoneIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #030803 0%, #050e04 50%, #030803 100%)' }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(138,211,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(138,211,65,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8ad341, transparent)' }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(138,211,65,0.06) 0%, transparent 70%)' }}
      />

      {/* ── CTA TOP ROW ── */}
      <div
        className="relative border-b"
        style={{ borderColor: 'rgba(138,211,65,0.1)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.25em] mb-2"
                style={{ color: '#8ad341' }}
              >
                Jardinero profesional en Madrid
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
                ¿Tu jardín merece más?
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #9ae053, #c3f07a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Hablemos hoy mismo.
                </span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+34665764488"
                className="group inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #75b930 0%, #a6e072 100%)',
                  color: '#030803',
                  boxShadow: '0 4px 20px rgba(138,211,65,0.25)',
                }}
              >
                <PhoneIcon />
                <span>+34 665 764 488</span>
              </a>
              <a
                href="https://wa.me/34665764488?text=Hola%2C%20me%20interesa%20obtener%20un%20presupuesto%20para%20mi%20jardín."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border hover:-translate-y-0.5"
                style={{ borderColor: 'rgba(138,211,65,0.35)', color: '#9ae053' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.76z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Col 1: Brand + Contact */}
          <motion.div
            className="sm:col-span-2 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-40 h-14 mb-6">
              <Image
                src="/logo_green.png"
                alt="Flor Del Valle – Jardinero profesional Madrid"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-xs">
              Más de 25 años creando y cuidando jardines en Madrid. Tu espacio verde,
              nuestro máximo cuidado.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="tel:+34665764488"
                className="flex items-center space-x-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#8ad341]/30"
                  style={{ background: 'rgba(138,211,65,0.12)', color: '#8ad341' }}
                >
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Teléfono</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#9ae053] transition-colors">
                    +34 665 764 488
                  </p>
                </div>
              </a>

              <a
                href="tel:+34645956928"
                className="flex items-center space-x-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#8ad341]/30"
                  style={{ background: 'rgba(138,211,65,0.08)', color: '#8ad341' }}
                >
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Secundario</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#9ae053] transition-colors">
                    +34 645 956 928
                  </p>
                </div>
              </a>

              <a
                href="mailto:flordelvalle.ec@gmail.com"
                className="flex items-center space-x-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#8ad341]/30"
                  style={{ background: 'rgba(138,211,65,0.08)', color: '#8ad341' }}
                >
                  <MailIcon />
                </div>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#9ae053] transition-colors break-all">
                    flordelvalle.ec@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(138,211,65,0.08)', color: '#8ad341' }}
                >
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Horario</p>
                  <p className="text-sm font-semibold text-white/80">L–V: 9:00–18:00 · S: 9:00–15:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Col 2: Servicios */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3 border-b"
              style={{ color: '#8ad341', borderColor: 'rgba(138,211,65,0.15)' }}
            >
              Servicios
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo('#servicios')}
                    className="group flex items-center space-x-2.5 text-sm text-white/55 hover:text-white transition-colors duration-200 text-left"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 group-hover:w-3 transition-all duration-300"
                      style={{ backgroundColor: '#8ad341' }}
                    />
                    <span>{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Zonas */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3 border-b"
              style={{ color: '#8ad341', borderColor: 'rgba(138,211,65,0.15)' }}
            >
              Zonas
            </h3>
            <ul className="space-y-3">
              {ZONAS.map((z, i) => (
                <li
                  key={i}
                  className="text-sm text-white/55 hover:text-white/80 transition-colors duration-200"
                >
                  {z}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Navegación */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3 border-b"
              style={{ color: '#8ad341', borderColor: 'rgba(138,211,65,0.15)' }}
            >
              Navegación
            </h3>
            <ul className="space-y-3 mb-8">
              {NAV.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center space-x-2 text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    <ArrowIcon />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <h3
              className="text-xs font-black uppercase tracking-[0.2em] mb-4 pb-3 border-b"
              style={{ color: '#8ad341', borderColor: 'rgba(138,211,65,0.15)' }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {LEGAL.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(138,211,65,0.08)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left */}
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(138,211,65,0.15)' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#8ad341">
                  <path d="M12 3 Q18 6 18 12 Q18 18 12 21 Q6 18 6 12 Q6 6 12 3Z" />
                </svg>
              </div>
              <p className="text-xs text-white/35">
                © {new Date().getFullYear()} Flor Del Valle · Todos los derechos reservados
              </p>
            </div>

            {/* Center: legal quick links */}
            <div className="flex items-center space-x-4">
              {LEGAL.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <p className="text-xs text-white/25">
              Hecho con cuidado en Madrid
            </p>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(138,211,65,0.3), transparent)' }}
      />
    </footer>
  );
}
