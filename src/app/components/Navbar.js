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
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[calc(95%+5px)]">
      <motion.div
        className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden shadow-xl"
        whileHover={{
          boxShadow: '0 20px 40px -12px rgba(120, 185, 45, 0.22)',
          borderColor: 'rgba(120, 185, 45, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
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
  );
}