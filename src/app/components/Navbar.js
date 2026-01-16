'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODAS LAS SECCIONES
  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto', isButton: true }
  ];

  const scrollToSection = (href) => {
    try {
      const element = document.querySelector(href);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Fallback para navegadores que no soportan behavior: 'smooth'
        setTimeout(() => {
          if (Math.abs(window.pageYOffset - offsetTop) > 5) {
            window.scrollTo(0, offsetTop);
          }
        }, 100);
      } else {
        // Fallback positions
        if (href === '#inicio') window.scrollTo(0, 0);
        if (href === '#servicios') window.scrollTo(0, 800);
        if (href === '#contacto') window.scrollTo(0, 5000);
      }
    } catch (error) {
      console.error('Error en scroll:', error);
    }
    
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[calc(95%+5px)]">
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden shadow-xl"
          whileHover={{
            boxShadow: '0 20px 40px -12px rgba(120, 185, 45, 0.22)',
            borderColor: 'rgba(120, 185, 45, 0.3)'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Contenido del header existente */}
          <div className="container mx-auto px-5 py-6">
            <div className="flex items-center justify-between">
              {/* LOGO */}
              <motion.a
                href="#inicio"
                className="relative w-65 h-15 block"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#inicio');
                }}
              >
                <Image
                  src="/logo_green.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  sizes="64x"
                  priority
                />
              </motion.a>

              {/* Menú desktop */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                {navItems.map((item, idx) => (
                  item.isButton ? (
                    <motion.button
                      key={idx}
                      onClick={() => scrollToSection(item.href)}
                      className="px-6 py-2.5 rounded-full bg-[rgb(120,185,45)] text-white font-bold text-sm"
                      whileHover={{
                        y: -2,
                        scale: 1.03,
                        boxShadow: '0 8px 20px rgba(120, 185, 45, 0.35)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ) : (
                    <motion.button
                      key={idx}
                      className="text-gray-700 font-medium py-2 px-1 relative group text-sm lg:text-base"
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(120,185,45)] rounded-full transition-all duration-300 group-hover:w-full" />
                    </motion.button>
                  )
                ))}
              </nav>

              {/* Menú móvil */}
              <div className="flex md:hidden items-center space-x-3">
                <motion.button
                  onClick={() => scrollToSection('#contacto')}
                  className="px-3.5 py-2 rounded-full bg-[rgb(120,185,45)] text-white font-bold text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contacto
                </motion.button>
                <button
                  className="p-2.5 rounded-xl hover:bg-gray-100/60 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menú"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menú móvil completo */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="md:hidden px-5 pb-6 border-t border-gray-200/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="space-y-3 mt-4">
                    {navItems.filter(item => !item.isButton).map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block w-full text-left py-3.5 px-5 text-gray-700 rounded-xl font-medium hover:bg-green-50 hover:text-green-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }}
                        onMouseDown={(e) => {
                          // Para devtools mobile simulation
                          if (e.button === 0) { // Left click
                            e.preventDefault();
                            scrollToSection(item.href);
                          }
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      {/* Botón flotante de WhatsApp */}
      <motion.a
        href="https://wa.me/34665764488?text=Hola,%20me%20interesa%20sus%20servicios%20de%20jardinería.%20Me%20gustaría%20obtener%20un%20presupuesto%20personalizado%20para%20diseño%20y%20mantenimiento%20de%20jardines.%20¿Podrían%20contactarme%20para%20hablar%20de%20mi%20proyecto?"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.76l-.002-.005z"/>
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          1
        </div>
      </motion.a>
    </>
  );
}