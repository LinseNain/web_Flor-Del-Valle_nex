'use client';

import React from 'react';
import Image from 'next/image';

// Usamos los iconos del homepage
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default function Footer() {
  const colors = {
    primary: '#8ad341',
    primaryHover: '#7bc536',
    primaryLight: '#9ae053ff',
    primaryDark: '#79b83a',
    dark: '#000000ff',
    gray: '#535863ff',
    light: '#f8faf7',
    white: '#ffffff'
  };

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Proceso', href: '#proceso' },
  ];

  const services = [
    "Podas Expertas",
    "Diseño de Jardines",
    "Piscinas Naturales",
    "Mantenimiento Integral",
    "Paisajismo Creativo",
    "Soluciones Completas"
  ];

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Columna 1: Información de la empresa */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              {/* Logo en lugar del icono */}
              <div className="relative w-32 h-12 md:w-40 md:h-16">
                <Image
                  src="/logo_green.png"
                  alt="Logo VerdeVivo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                />
              </div>
              <div>
                {/* Eliminamos el texto "VerdeVivo" ya que está en el logo */}
                <div className="flex items-center space-x-2 mt-1">
                  <AwardIcon className="text-yellow-400" />
                  <span className="text-sm font-medium" style={{ color: colors.primaryLight }}>
                    Más de 25 años de experiencia
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed max-w-lg text-sm md:text-base">
              Transformamos espacios ordinarios en experiencias extraordinarias. Más de 25 años de experiencia
              en paisajismo, diseño de jardines y mantenimiento integral con los más altos estándares de calidad.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.primary }}>
                  <PhoneIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Teléfono</div>
                  <div className="font-bold">+34 600 000 000</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.primary }}>
                  <MailIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="font-bold">hola@verdevivo.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-lg font-black mb-4 pb-2 border-b"
              style={{ borderColor: colors.primary + '40' }}>
              Navegación
            </h3>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group text-sm md:text-base"
                  >
                    <span className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: colors.primary }} />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-lg font-black mb-4 pb-2 border-b"
              style={{ borderColor: colors.primary + '40' }}>
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <div className="flex items-start space-x-2 group">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                        border: `1px solid ${colors.primary}30`
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm md:text-base">
                      {service}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px mb-8" style={{ background: `linear-gradient(90deg, transparent 0%, ${colors.primary}40 50%, transparent 100%)` }} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Información de contacto */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-3">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4" style={{ color: colors.primaryLight }} />
                <span className="text-sm text-gray-300">Madrid, España</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <ShieldIcon className="w-4 h-4" style={{ color: colors.primaryLight }} />
                <span className="text-sm text-gray-300">Empresa certificada</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 VerdeVivo Paisajismo. Todos los derechos reservados.
            </p>
          </div>

          {/* Estadísticas */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { number: "500+", label: "Proyectos" },
              { number: "25+", label: "Años" },
              { number: "98%", label: "Satisfacción" },
              { number: "15+", label: "Expertos" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-black mb-1" style={{ color: colors.primaryLight }}>
                  {stat.number}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aviso legal */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Diseño y desarrollo con pasión por la naturaleza •
            <a href="#" className="mx-2 hover:text-gray-300 transition-colors">Política de privacidad</a> •
            <a href="#" className="mx-2 hover:text-gray-300 transition-colors">Aviso legal</a> •
            <a href="#" className="mx-2 hover:text-gray-300 transition-colors">Cookies</a>
          </p>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </footer>
  );
}