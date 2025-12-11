'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🔥 ICONOS (mantenidos igual)
const Icons = {
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  Scissors: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  Tree: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Pool: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Leaf: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11l5-5m0 0l5 5m-5-5v12m0 0H7m5 0h5" />
    </svg>
  ),
  Hammer: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Award: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9 1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Sprout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Lightbulb: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Water: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19c0-3.87 3.13-7 7-7 1.08 0 2.09.25 3 .7V10c0-3.22-2.78-6-6-6a6 6 0 00-6 6v9h12v-3c0-1.65-1.35-3-3-3s-3 1.35-3 3" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
};

// 🎨 PALETA DE COLORES
const colors = {
  primary: '#8ad341',
  primaryHover: '#7bc536',
  primaryLight: '#9ae053ff',
  primaryDark: '#79b83a',
  secondary: '#8ad341',
  secondaryHover: '#7fce39ff',
  secondaryLight: '#86ca4bff',
  secondaryDark: '#7fb94cff',
  gradientPrimary: 'linear-gradient(135deg, #75b930ff 0%, #a6e072ff 100%)',
  gradientSecondary: 'linear-gradient(135deg, #7eb350ff 0%, #8ad341 100%)',
  gradientLight: 'linear-gradient(135deg, #9de257ff 0%, #aee67dff 100%)',
  gradientDark: 'linear-gradient(135deg, rgba(117, 197, 37, 0.9) 0%, rgba(149, 214, 91, 0.9) 100%)',
  dark: '#000000ff',
  gray: '#535863ff',
  light: '#f8faf7',
  white: '#ffffff'
};

// 🏆 DATOS - TEXTO HUMANIZADO
const services = [
  {
    icon: Icons.Scissors,
    title: "Podas Expertas",
    description: "Cuidamos de tus árboles como si fueran nuestros. Con técnicas que respetan su crecimiento natural y garantizan su salud para que disfrutes de ellos muchos años.",
    details: ["Aseguramos el desarrollo sano de tus árboles", "Trabajamos con máxima seguridad para todos", "Programamos los cuidados según cada estación", "Dejamos todo limpio y ordenado", "Te asesoramos sobre el cuidado de tus plantas"],
    color: colors.primary,
    featured: true
  },
  {
    icon: Icons.Tree,
    title: "Diseño de Jardines",
    description: "Creamos espacios verdes que son una extensión de tu hogar. Desde jardines sencillos hasta proyectos más elaborados, cada diseño cuenta tu historia.",
    details: ["Un diseño pensado especialmente para ti", "Elegimos plantas que crecen bien en nuestra zona", "Sistemas de riego que ahorran agua", "Una iluminación que crea ambiente", "Te acompañamos en el mantenimiento"],
    color: colors.secondary,
    featured: true
  },
  {
    icon: Icons.Pool,
    title: "Piscinas Naturales",
    description: "Integramos piscinas que parecen parte del paisaje, con sistemas de filtrado que cuidan el medio ambiente y requieren menos mantenimiento.",
    details: ["Piscinas que se integran con la naturaleza", "Filtración natural sin productos químicos agresivos", "Cuidado respetuoso con el entorno", "Un diseño que parece que siempre estuvo ahí", "Controlamos la calidad del agua de forma natural"],
    color: colors.primaryDark,
    featured: false
  },
  {
    icon: Icons.Leaf,
    title: "Mantenimiento Integral",
    description: "Nos encargamos de que tu jardín siempre esté bonito. Césped cuidado, setos bien definidos y plantas saludables para que tú solo tengas que disfrutar.",
    details: ["Visitamos tu jardín regularmente", "Controlamos plagas de forma natural", "Usamos fertilizantes orgánicos", "Optimizamos el riego para ahorrar agua", "Te contamos cómo va todo con informes periódicos"],
    color: colors.primary,
    featured: false
  },
  {
    icon: Icons.Hammer,
    title: "Paisajismo Creativo",
    description: "Construimos terrazas, caminos y estructuras que se integran perfectamente con la naturaleza, usando materiales de calidad que duran años.",
    details: ["Terrazas donde disfrutar del aire libre", "Caminos que invitan a pasear", "Sistemas que funcionan sin problemas", "Estructuras de madera con buen acabado", "Incluimos agua para crear ambientes especiales"],
    color: colors.secondary,
    featured: false
  },
  {
    icon: Icons.Sparkles,
    title: "Servicio Completo",
    description: "Te ayudamos con todo el proceso. Para comunidades y empresas, gestionamos cada detalle para que tú solo tengas que preocuparte de disfrutar los resultados.",
    details: ["Nos encargamos de todo, desde el principio", "Contratos claros y sin letra pequeña", "Estamos disponibles para cualquier urgencia", "Coordinamos con los vecinos sin problemas", "Te damos toda la documentación organizada"],
    color: colors.primaryDark,
    featured: true
  }
];

// Imágenes de galería con imágenes de placeholder por defecto
const galleryImages = [
  {
    src: "/c-1.jpg",
    alt: "Jardín moderno con diseño limpio y natural",
    category: "Jardín Familiar",
    year: "2024",
    placeholder: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-2.jpg",
    alt: "Espacio urbano convertido en un rincón verde",
    category: "Transformación Urbana",
    year: "2024",
    placeholder: "https://images.unsplash.com/photo-1564352969906-8b7f46ba4b8e?w-800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-3.jpg",
    alt: "Terraza donde se funden interior y exterior",
    category: "Integración Natural",
    year: "2023",
    placeholder: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-4.jpg",
    alt: "Jardín mediterráneo recuperado con cariño",
    category: "Rehabilitación",
    year: "2023",
    placeholder: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-5.jpg",
    alt: "Espacio sostenible con plantas de la zona",
    category: "Diseño Sostenible",
    year: "2024",
    placeholder: "https://images.unsplash.com/photo-1564352969906-8b7f46ba4b8e?w-800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-6.jpg",
    alt: "Zona de descanso con agua integrada",
    category: "Espacio de Relax",
    year: "2024",
    placeholder: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=60"
  },
  {
    src: "/c-7.jpg",
    alt: "Jardín vertical en un espacio de trabajo",
    category: "Entorno Laboral",
    year: "2023",
    placeholder: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60"
  }
];

const advantages = [
  {
    icon: Icons.Award,
    title: "Experiencia Real",
    description: "25 años cuidando jardines nos han enseñado lo que realmente importa: entender las plantas y escuchar a las personas.",
    stat: "25+ años"
  },
  {
    icon: Icons.Users,
    title: "Equipo de Verdaderos Expertos",
    description: "Botánicos, diseñadores y técnicos que trabajan juntos. Gente que ama las plantas y disfruta creando espacios bonitos.",
    stat: "15+ personas"
  },
  {
    icon: Icons.Heart,
    title: "Compromiso de Verdad",
    description: "No hacemos solo jardines, creamos espacios donde las familias crean recuerdos. Tu satisfacción es lo que nos hace seguir mejorando.",
    stat: "98% clientes"
  },
  {
    icon: Icons.Clock,
    title: "Cumplimos lo que Decimos",
    description: "Valoramos tu tiempo tanto como el nuestro. Cuando decimos una fecha, la cumplimos. Así de sencillo.",
    stat: "100% puntuales"
  }
];

// REEMPLAZAMOS LOS TESTIMONIOS POR TIPS PRÁCTICOS
const tips = [
  {
    icon: Icons.Water,
    title: "Riego inteligente",
    content: "Riega al amanecer o atardecer para reducir la evaporación. Las plantas absorben mejor el agua cuando hace menos calor.",
    category: "Cuidado básico"
  },
  {
    icon: Icons.Sun,
    title: "Ubicación adecuada",
    content: "Coloca cada planta donde reciba la luz que necesita. Observa tu jardín durante el día para conocer las zonas de sol y sombra.",
    category: "Planificación"
  },
  {
    icon: Icons.Sprout,
    title: "Poda en su momento",
    content: "La mejor época para podar la mayoría de árboles es a finales de invierno, cuando están en reposo pero a punto de despertar.",
    category: "Mantenimiento"
  }
];

const clientTypes = [
  {
    icon: Icons.Home,
    title: "Familias",
    description: "Jardines para que los niños jueguen, para comer al aire libre, para leer un libro en paz. Espacios donde la vida pasa.",
    projects: "150+ familias"
  },
  {
    icon: Icons.Building,
    title: "Comunidades de Vecinos",
    description: "Cuidamos los espacios que todos compartimos. Jardines donde los vecinos se encuentran y disfrutan juntos.",
    projects: "80+ comunidades"
  },
  {
    icon: Icons.Briefcase,
    title: "Empresas",
    description: "Espacios verdes que hacen que ir a trabajar sea más agradable. Donde los equipos descansan y se inspiran.",
    projects: "45+ empresas"
  }
];

const processSteps = [
  {
    icon: Icons.Phone,
    title: "Charlamos Contigo",
    description: "Primero escuchamos. Queremos saber qué sueñas para tu espacio, qué te gusta, cómo vives. Sin compromiso, hablando claro.",
    duration: "1-2 días"
  },
  {
    icon: Icons.Mail,
    title: "Te Contamos Nuestra Idea",
    description: "Te mostramos un plan completo con dibujos en 3D, un calendario claro y un presupuesto detallado. Sin sorpresas.",
    duration: "3-5 días"
  },
  {
    icon: Icons.Hammer,
    title: "Hacemos Realidad tu Jardín",
    description: "Nuestro equipo trabaja manteniéndote informado en cada paso. Verás cómo tu idea toma forma día a día.",
    duration: "Depende del proyecto"
  },
  {
    icon: Icons.Check,
    title: "Te Entregamos y Seguimos",
    description: "Te damos las llaves de tu nuevo espacio y seguimos disponibles para lo que necesites. Tu jardín evoluciona y nosotros con él.",
    duration: "Seguimos cerca"
  }
];

// 🎨 COMPONENTE SECTION HEADER MEJORADO
const SectionHeader = ({ title, subtitle, number, isLight = false }) => (
  <motion.div
    className="text-center mb-12 md:mb-24 relative px-3 sm:px-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {number && (
      <div className="text-7xl md:text-9xl font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 -z-10 tracking-tighter"
        style={{ color: isLight ? 'white' : colors.primary }}>
        {number}
      </div>
    )}
    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-tight ${isLight ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    <p className={`text-lg md:text-xl lg:text-2xl ${isLight ? 'text-white/90' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed font-light px-2`}>
      {subtitle}
    </p>
    <div className="w-24 h-1 md:w-32 h-1.5 rounded-full mx-auto mt-8 md:mt-12"
      style={{ background: isLight ? 'white' : colors.gradientPrimary }} />
  </motion.div>
);

// Componente para manejar imágenes con fallback
const ImageWithFallback = ({ src, placeholder, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0 && placeholder) {
      setImgSrc(placeholder);
      setErrorCount(1);
    } else {
      // Usar un placeholder genérico si ambos fallan
      setImgSrc("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f9f0'/%3E%3Cpath d='M100 150 L150 100 L250 200 L300 150' stroke='%238ad341' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='150' r='20' fill='%238ad341' opacity='0.3'/%3E%3Ccircle cx='250' cy='200' r='20' fill='%238ad341' opacity='0.3'/%3E%3C/svg%3E");
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default function Homepage() {
  const [activeService, setActiveService] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeTip, setActiveTip] = useState(0); // Cambiado de activeTestimonial a activeTip
  const [imagesPerView, setImagesPerView] = useState(3);
  const slideIntervalRef = useRef(null);

  // FUNCIÓN PARA SCROLL
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // FUNCIONES DEL CARRUSEL MEJORADO
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= galleryImages.length ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevSlideIndex = prev - 1;
      return prevSlideIndex < 0 ? galleryImages.length - 1 : prevSlideIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Ajustar número de imágenes por vista según tamaño de pantalla
  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth < 640) {
        setImagesPerView(1);
      } else if (window.innerWidth < 1024) {
        setImagesPerView(2);
      } else {
        setImagesPerView(3);
      }
    };

    updateImagesPerView();
    window.addEventListener('resize', updateImagesPerView);
    return () => window.removeEventListener('resize', updateImagesPerView);
  }, []);

  // CARRUSEL AUTOMÁTICO MEJORADO
  useEffect(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }

    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [currentSlide]);

  // Pausar carrusel al interactuar
  const pauseCarousel = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  const resumeCarousel = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    if (!autoRotate) return;
    const serviceInterval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(serviceInterval);
  }, [autoRotate]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % tips.length);
    }, 7000);
    return () => clearInterval(tipInterval);
  }, []);

  const handleServiceClick = (index) => {
    setAutoRotate(false);
    setActiveService(index);
    setTimeout(() => setAutoRotate(true), 15000);
  };

  const StarRating = ({ rating }) => (
    <div className="flex space-x-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <Icons.Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  // Obtener imágenes visibles para el carrusel
  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < imagesPerView; i++) {
      const index = (currentSlide + i) % galleryImages.length;
      visible.push(galleryImages[index]);
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="overflow-x-hidden">
      {/* 🌟 HERO SECTION */}
      <section id="inicio" className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/inicio.jpg"
          >
            <source src="/garden-hero.mp4" type="video/mp4" />
            <img src="/inicio.jpg" alt="Jardín verde" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full opacity-20"
              style={{ backgroundColor: colors.primaryLight }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center space-x-2 md:space-x-3 bg-white/10 backdrop-blur-lg text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl mb-6 md:mb-8 border border-white/20 shadow-lg md:shadow-2xl"
            >
              <Icons.Award className="text-green-300 w-4 h-4 md:w-5 md:h-5" />
              <span className="font-bold text-xs md:text-sm tracking-widest uppercase">+ de 25 años Cuidando jardines </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 leading-none tracking-tight"
            >
              <span className="block">JARDINES</span>
              <span className="block" style={{ color: colors.primaryLight }}>CON ALMA</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-12 max-w-xl leading-relaxed font-light"
            >
              Creamos espacios donde la naturaleza y las personas se encuentran. Donde tus momentos especiales tienen el marco perfecto.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch sm:items-start w-full"
            >
              <motion.button
                onClick={() => scrollToSection('contacto')}
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-lg md:shadow-xl w-full sm:w-auto sm:min-w-[220px] md:min-w-[260px] group relative overflow-hidden"
                style={{ background: colors.gradientPrimary, color: colors.dark }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 md:space-x-3">
                  <span className="text-center">Cuéntanos tu idea</span>
                  <Icons.ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.button>
              <button
                onClick={() => scrollToSection('proyectos')}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 w-full sm:w-auto sm:min-w-[220px] md:min-w-[260px] group backdrop-blur-sm"
              >
                <span className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center justify-center space-x-2 md:space-x-3">
                  <Icons.Camera className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-center">Ver nuestros trabajos</span>
                </span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 pt-6 md:mt-12 md:pt-8 border-t border-white/20"
            >
              {[
                { number: "500+", label: "Jardines creados" },
                { number: "25+", label: "Años de experiencia" },
                { number: "98%", label: "Familias contentas" },
                { number: "15+", label: "Personas en el equipo" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-base md:text-lg font-black text-white mb-1">{stat.number}</div>
                  <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('servicios')}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center">
              <Icons.ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 🎯 SERVICIOS SECTION */}
      <section id="servicios" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <SectionHeader
            title="Lo que hacemos por ti"
            subtitle="Servicios que hacen que disfrutar de tu jardín sea fácil y bonito"
            number="01"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            <div className="relative">
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className={`p-2.5 md:p-3 lg:p-4 rounded-lg md:rounded-xl cursor-pointer transition-all duration-500 flex flex-col items-center justify-center min-h-[110px] md:min-h-[130px] lg:min-h-[150px] group relative overflow-hidden ${activeService === index
                      ? 'text-white shadow-md md:shadow-lg scale-[1.02] md:scale-105 ring-1 md:ring-2 lg:ring-3'
                      : 'bg-gray-50 hover:bg-white text-gray-700 hover:scale-102 border border-gray-100'
                      }`}
                    style={{
                      backgroundColor: activeService === index ? service.color : undefined,
                      ringColor: activeService === index ? service.color + '40' : 'transparent',
                      borderColor: activeService === index ? service.color + '20' : undefined
                    }}
                    onClick={() => handleServiceClick(index)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {service.featured && (
                      <div className="absolute top-1.5 right-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    )}
                    <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl mb-1.5 md:mb-2 transition-all duration-300 ${activeService === index ? 'bg-white/20' : 'bg-white shadow-sm'
                      }`}>
                      <service.icon className={`text-base md:text-lg lg:text-xl ${activeService === index ? 'text-white' : ''
                        }`}
                        style={{ color: activeService === index ? 'white' : service.color }}
                      />
                    </div>
                    <span className="font-bold text-[10px] md:text-xs text-center leading-tight tracking-tight">
                      {service.title.split(' ')[0]}
                    </span>
                    <span className="text-[8px] md:text-xs text-center opacity-80 mt-0.5 font-medium leading-tight">
                      {service.title.split(' ').slice(1).join(' ')}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute -top-3 -left-3 w-12 h-12 md:w-16 md:h-16 rounded-full opacity-5"
                style={{ backgroundColor: colors.primary }} />
            </div>
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg md:shadow-xl border relative overflow-hidden min-h-[320px] md:min-h-[400px] lg:min-h-[480px] flex flex-col justify-center"
              style={{
                background: colors.gradientLight,
                borderColor: colors.primary + '15'
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full opacity-5 transform translate-x-6 -translate-y-6 md:translate-x-12 md:-translate-y-12"
                style={{ backgroundColor: colors.primary }} />
              <div className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-5 transform -translate-x-4 translate-y-4 md:-translate-x-8 md:translate-y-8"
                style={{ backgroundColor: colors.secondary }} />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3 lg:space-x-5 mb-5 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md mx-auto md:mx-0"
                    style={{
                      background: services[activeService].featured ?
                        colors.gradientPrimary :
                        `linear-gradient(135deg, ${services[activeService].color} 0%, ${services[activeService].color}99 100%)`
                    }}>
                    {React.createElement(services[activeService].icon, {
                      className: "text-base md:text-lg lg:text-xl text-white"
                    })}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-black mb-2 md:mb-3 tracking-tight text-gray-900">
                      {services[activeService].title}
                    </h3>
                    <div className="w-10 h-0.5 md:w-12 h-1 rounded-full mx-auto md:mx-0"
                      style={{
                        background: services[activeService].featured ?
                          colors.gradientPrimary :
                          services[activeService].color
                      }} />
                  </div>
                </div>
                <p className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed font-light text-gray-700 text-center md:text-left px-1">
                  {services[activeService].description}
                </p>
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {services[activeService].details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="flex items-start space-x-1.5 md:space-x-2.5 group"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm"
                        style={{
                          background: services[activeService].featured ?
                            colors.gradientPrimary :
                            `linear-gradient(135deg, ${services[activeService].color}20 0%, ${services[activeService].color}10 100%)`
                        }}>
                        <Icons.Check className="text-[10px] md:text-xs" style={{ color: services[activeService].color }} />
                      </div>
                      <span className="font-medium text-xs md:text-sm leading-relaxed text-gray-900 pt-0.5">{detail}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  className="px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all duration-300 shadow-sm md:shadow-md hover:shadow-lg w-full group"
                  style={{
                    background: services[activeService].featured ?
                      colors.gradientPrimary :
                      `linear-gradient(135deg, ${services[activeService].color} 0%, ${services[activeService].color}dd 100%)`,
                    color: colors.dark
                  }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center space-x-0.5 md:space-x-1.5">
                    <span>Hablar sobre {services[activeService].title}</span>
                    <Icons.ChevronRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 md:group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🖼️ CARRUSEL DE IMÁGENES MEJORADO */}
      <section id="proyectos" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <SectionHeader
            title="Jardines que hemos creado"
            subtitle="Espacios donde las familias viven momentos especiales"
            number="02"
          />

          <div className="relative max-w-7xl mx-auto">
            {/* Botones de navegación */}
            <button
              onClick={prevSlide}
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
              aria-label="Anterior"
            >
              <Icons.ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
              aria-label="Siguiente"
            >
              <Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
            </button>

            {/* Contenedor del carrusel */}
            <div
              className="overflow-hidden mx-2 sm:mx-4 md:mx-6"
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
            >
              <motion.div
                className="flex"
                initial={false}
                animate={{ x: `-${currentSlide * (100 / imagesPerView)}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Duplicamos las imágenes para crear un efecto de loop continuo */}
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={`${image.alt}-${index}`}
                    className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                    style={{ width: `${100 / imagesPerView}%` }}
                  >
                    <div className="relative group h-full">
                      <div className="aspect-square md:aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl shadow-lg bg-gray-100">
                        <ImageWithFallback
                          src={image.src}
                          placeholder={image.placeholder}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full font-medium">
                              {image.category}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full">
                              {image.year}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                            {image.alt}
                          </h3>
                          <button className="text-xs sm:text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
                            Ver detalles
                            <Icons.ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center gap-1 sm:gap-2 mt-6 md:mt-8">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-green-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>

            {/* Contador */}
            <div className="text-center mt-3 sm:mt-4">
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
                {currentSlide + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ EXPERIENCIA & TIPS */}
      <section id="experiencia" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Lo que nos hace diferentes"
            subtitle="La confianza se gana cuidando los detalles y escuchando a las personas"
            number="03"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm md:shadow-md relative overflow-hidden"
                        style={{ background: colors.gradientPrimary }}>
                        <advantage.icon className="text-base md:text-lg text-white" />
                        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                      </div>
                      <div className="text-base md:text-lg font-black text-right min-w-[50px] md:min-w-[70px]"
                        style={{ color: colors.primary }}>
                        {advantage.stat}
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-black mb-2 md:mb-3 leading-tight tracking-tight text-gray-900">
                      {advantage.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed font-normal text-gray-700">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-md md:shadow-lg border border-gray-100">
                <div className="text-center mb-5 md:mb-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-gray-900">
                    Consejos prácticos para tu jardín
                  </h3>
                  <div className="w-16 h-1 rounded-full mx-auto" style={{ background: colors.gradientPrimary }} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTip}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center px-1"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md"
                      style={{ background: colors.gradientLight }}>
                      {React.createElement(tips[activeTip].icon, {
                        className: "text-base md:text-lg",
                        style: { color: colors.primary }
                      })}
                    </div>
                    <h4 className="text-base md:text-lg font-black mb-2 md:mb-3 text-gray-900">
                      {tips[activeTip].title}
                    </h4>
                    <p className="text-xs md:text-sm lg:text-base leading-relaxed font-normal text-gray-800 my-4 md:my-5 italic border-l-2 md:border-l-3 pl-2 md:pl-4" style={{ borderColor: colors.primary }}>
                      "{tips[activeTip].content}"
                    </p>
                    <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider"
                      style={{ background: colors.primary + '20', color: colors.primary }}>
                      <Icons.Lightbulb className="w-2 h-2 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      {tips[activeTip].category}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-center space-x-1.5 md:space-x-2 mt-4 md:mt-6">
                  {tips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTip(index)}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${index === activeTip
                        ? 'w-4 md:w-5 shadow'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      style={{ backgroundColor: index === activeTip ? colors.primary : undefined }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 CLIENTES SECTION */}
      <section id="clientes" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/clientes-bg.jpg')" }}
        />
        <div className="absolute inset-0" style={{ background: colors.gradientDark, opacity: 0.92 }} />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <SectionHeader
            title="Para quiénes trabajamos"
            subtitle="Creamos espacios para todo tipo de personas y lugares"
            number="04"
            isLight
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {clientTypes.map((client, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm md:bg-white/15 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 md:bg-white/25 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden shadow-sm md:shadow-md">
                  <client.icon className="text-base md:text-lg text-white" />
                  <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-black text-white mb-2 md:mb-3 drop-shadow-sm">
                  {client.title}
                </h3>
                <p className="text-white/90 leading-relaxed mb-3 md:mb-4 font-normal text-xs md:text-sm">
                  {client.description}
                </p>
                <div className="text-white font-bold text-[10px] md:text-xs tracking-wider bg-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full inline-block">
                  {client.projects}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔄 PROCESO SECTION */}
      <section id="proceso" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Cómo trabajamos"
            subtitle="Un camino sencillo y claro hacia el jardín que imaginas"
            number="05"
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-12 md:top-16 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center text-white font-black text-[10px] md:text-xs z-20 shadow-md"
                    style={{ background: colors.gradientPrimary }}>
                    {index + 1}
                  </div>
                  <div className="relative mb-3 md:mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-md md:shadow-lg group-hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                      style={{ background: colors.gradientLight }}>
                      <step.icon className="text-base md:text-lg" style={{ color: colors.primary }} />
                      <div className="absolute inset-0 bg-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10 min-h-[180px] md:min-h-[200px] flex flex-col">
                    <h3 className="text-sm md:text-base lg:text-lg font-black mb-2 md:mb-3 tracking-tight text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed font-light flex-1 text-gray-700">
                      {step.description}
                    </p>
                    <div className="mt-3 pt-2 md:mt-4 md:pt-2.5 border-t border-gray-200">
                      <div className="text-[10px] md:text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📞 CONTACTO SECTION */}
      <section id="contacto" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 rounded-full opacity-5"
                style={{ backgroundColor: colors.primary }} />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 rounded-full opacity-5"
                style={{ backgroundColor: colors.secondary }} />
              <div className="relative z-10">
                <div className="text-center lg:text-left mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4 tracking-tight text-gray-900">
                    Hablemos de tu jardín
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed font-light">
                    Empieza a crear el espacio donde vivirás momentos especiales
                  </p>
                  <div className="w-16 h-1 rounded-full mx-auto lg:mx-0 mt-3 md:mt-4"
                    style={{ background: colors.gradientPrimary }} />
                </div>
                <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed font-light text-gray-600">
                  Cada jardín tiene su propia historia. Ayúdanos a escribir la tuya. Estamos aquí para escuchar lo que sueñas y hacerlo realidad.
                </p>
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  {[
                    {
                      icon: Icons.Phone,
                      title: "Habla con nosotros",
                      description: "+34 600 000 000",
                      subtext: "Lunes a Sábado: 8:00 - 20:00",
                      action: "Llamar ahora"
                    },
                    {
                      icon: Icons.Mail,
                      title: "Escríbenos",
                      description: "hola@verdevivo.com",
                      subtext: "Te contestamos en menos de 4 horas",
                      action: "Enviar mensaje"
                    },
                    {
                      icon: Icons.MapPin,
                      title: "Estamos en Madrid",
                      description: "Comunidad de Madrid",
                      subtext: "Nos desplazamos sin coste adicional",
                      action: "Ver zona"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-2 md:space-x-3 p-2.5 md:p-3.5 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-300 group border border-gray-100 w-full"
                      whileHover={{ x: 1 }}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm md:shadow-md"
                        style={{ background: colors.gradientPrimary }}>
                        <item.icon className="text-[10px] md:text-sm text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[12px] md:text-sm mb-0.5 md:mb-1 text-gray-900 truncate">{item.title}</h3>
                        <p className="font-semibold text-[12px] md:text-sm mb-0.5 md:mb-1 text-green-600 break-words">{item.description}</p>
                        <p className="text-[10px] md:text-xs mb-1 md:mb-1.5 font-light text-gray-500 truncate">{item.subtext}</p>
                        <button className="text-[10px] md:text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity duration-300 text-green-600">
                          {item.action} →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="rounded-lg md:rounded-xl p-3 md:p-4 border-2 shadow-md"
                  style={{ backgroundColor: colors.light, borderColor: colors.primary + '20' }}
                  whileHover={{ y: -1 }}
                >
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm md:shadow-md flex-shrink-0"
                      style={{ background: colors.gradientPrimary }}>
                      <Icons.Heart className="text-[12px] md:text-sm text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[12px] md:text-sm mb-0.5 md:mb-1 text-gray-900">Nuestra forma de trabajar</h4>
                      <p className="text-[10px] md:text-xs font-light text-gray-600 truncate">
                        Te escuchamos • Presupuestos claros • Resultados que te gustarán
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-md md:shadow-lg border border-gray-200 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-5 transform translate-x-6 -translate-y-6 md:translate-x-10 md:-translate-y-10"
                style={{ backgroundColor: colors.primary }} />
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-gray-900">Cuéntanos tu idea</h3>
                <p className="text-sm md:text-base mb-3 md:mb-4 text-gray-600 font-light">Rellena el formulario y te llamamos hoy mismo</p>
                <form className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-700">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        placeholder="Cómo te llamas"
                        required
                        className="w-full px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-lg md:rounded-xl border border-gray-200 focus:ring-1 focus:border-transparent transition-all duration-300 text-[13px] md:text-sm hover:border-gray-300 focus:border-green-500 font-light"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-700">
                        Tu teléfono *
                      </label>
                      <input
                        type="tel"
                        placeholder="Para llamarte personalmente"
                        required
                        className="w-full px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-lg md:rounded-xl border border-gray-200 focus:ring-1 focus:border-transparent transition-all duration-300 text-[13px] md:text-sm hover:border-gray-300 focus:border-green-500 font-light"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-700">
                        Tu email
                      </label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-lg md:rounded-xl border border-gray-200 focus:ring-1 focus:border-transparent transition-all duration-300 text-[13px] md:text-sm hover:border-gray-300 focus:border-green-500 font-light"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-700">
                        Qué necesitas
                      </label>
                      <select className="w-full px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-lg md:rounded-xl border border-gray-200 focus:ring-1 focus:border-transparent transition-all duration-300 text-[13px] md:text-sm hover:border-gray-300 focus:border-green-500 font-light appearance-none bg-white">
                        <option>Selecciona el servicio...</option>
                        {services.map((service, i) => (
                          <option key={i}>{service.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-700">
                        Cuéntanos sobre tu espacio
                      </label>
                      <textarea
                        placeholder="Describe tu jardín actual, qué te gustaría cambiar, tus ideas..."
                        rows="3"
                        className="w-full px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-lg md:rounded-xl border border-gray-200 focus:ring-1 focus:border-transparent resize-none transition-all duration-300 text-[13px] md:text-sm hover:border-gray-300 focus:border-green-500 font-light"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-sm md:shadow-md hover:shadow-md relative overflow-hidden group"
                    style={{ background: colors.gradientPrimary, color: colors.dark }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-1 md:space-x-1.5">
                      <span>Enviar mi idea</span>
                      <Icons.ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 md:group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.button>
                  <p className="text-center text-[10px] md:text-xs mt-2 md:mt-3 font-light text-gray-500">
                    <Icons.Shield className="w-2.5 h-2.5 md:w-3 md:h-3 inline-block mr-0.5 md:mr-1 mb-0.5 md:mb-0.5" />
                    Tus datos están seguros con nosotros. Respetamos tu privacidad.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}