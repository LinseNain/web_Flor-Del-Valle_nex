'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import NatureCanvas from './NatureCanvas';
import CounterBar from './CounterBar';
import ZonasSection from './ZonasSection';
import FAQSection from './FAQSection';

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
    title: "Podas y Talas Profesionales",
    description: "Cuidamos de tus árboles como si fueran nuestros. Con técnicas que respetan su crecimiento natural y garantizan su salud para que disfrutes de ellos muchos años.",
    details: ["Aseguramos el desarrollo sano de tus árboles", "Trabajamos con máxima seguridad para todos", "Programamos los cuidados según cada estación", "Dejamos todo limpio y ordenado", "Te asesoramos sobre el cuidado de tus plantas"],
    color: colors.primary,
    featured: true
  },
  {
    icon: Icons.Tree,
    title: "Diseño y Creación de Jardines",
    description: "Creamos espacios verdes únicos adaptados a tus necesidades y estilo de vida. Desde jardines sencillos hasta proyectos más elaborados, cada diseño cuenta tu historia.",
    details: ["Diseño personalizado", "Instalación completa", "Riego automático", "Césped natural y artificial", "Iluminación exterior"],
    color: colors.secondary,
    featured: true
  },
  {
    icon: Icons.Pool,
    title: "Mantenimiento de Piscinas",
    description: "Servicio integral de mantenimiento de piscinas: limpieza, tratamiento químico, reparaciones y puesta a punto.",
    details: ["Limpieza semanal/mensual", "Tratamiento químico", "Reparación de filtros", "Puesta a punto primaveral", "Cierre invernal, Cuidado respetuoso con el entorno"],
    color: colors.primaryDark,
    featured: false
  },
  {
    icon: Icons.Leaf,
    title: "Mantenimiento de Áreas Verdes",
    description: "Nos encargamos de que tu jardín siempre esté bonito. Césped cuidado, setos bien definidos y plantas saludables para que tú solo tengas que disfrutar.",
    details: ["Siega, desbroce y eliminación de hojas y maleza.", "Corte y forma de setos; césped siempre cuidado.", "Control de plagas respetando el medio ambiente.", "Fertilizantes orgánicos y riego optimizado.", "Te contamos cómo va todo con informes periódicos"],
    color: colors.primary,
    featured: false
  },
  {
    icon: Icons.Hammer,
    title: "Paisajismo y Mini Obras ",
    description: "Construimos terrazas, caminos y estructuras que se integran perfectamente con la naturaleza, usando materiales de calidad que duran años.",
    details: ["Terrazas donde disfrutar del aire libre", "Caminos y muros de contención bien integrados.", "Pérgolas, cenadores y estructuras de madera con buen acabado.", "Sistemas de riego eficientes y duraderos.", "Elementos con agua para ambientes únicos y naturales."],
    color: colors.secondary,
    featured: false
  },
  {
    icon: Icons.Sparkles,
    title: "Servicio Completo",
    description: "Te ayudamos con todo el proceso. Para comunidades y empresas, gestionamos cada detalle para que tú solo tengas que preocuparte de disfrutar los resultados.",
    details: ["Nos encargamos de todo, desde el principio", "Contratos claros de mantenimiento", "Estamos disponibles para cualquier urgencia", "Asesoramiento técnico personalizado", "Te damos toda la documentación organizada"],
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
    description: "Trabajamos con vocación, amor por las plantas y pasión por crear espacios bonitos y sostenibles.",
    stat: "60+ proyectos"
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
    description: "Cada proyecto se trata de forma individual, adaptando nuestras soluciones a tus necesidades, estilo y presupuesto específicos.",
    stat: "100% Atención Personalizada"
  }
];

// SOLO CAMBIAMOS ESTE ARRAY DE TESTIMONIOS POR TIPS
const testimonials = [
  {
    name: "Riego Inteligente",
    role: "Consejo de cuidado",
    content: "Riega al amanecer o atardecer para reducir la evaporación. Las plantas absorben mejor el agua cuando hace menos calor.",
    rating: 5,
    project: "Técnica eficiente"
  },
  {
    name: "Ubicación Adecuada",
    role: "Consejo de diseño",
    content: "Coloca cada planta donde reciba la luz que necesita. Observa tu jardín durante el día para conocer las zonas de sol y sombra.",
    rating: 5,
    project: "Planificación ideal"
  },
  {
    name: "Poda en su Momento",
    role: "Consejo de mantenimiento",
    content: "La mejor época para podar la mayoría de árboles es a finales de invierno, cuando están en reposo pero a punto de despertar.",
    rating: 5,
    project: "Técnica profesional"
  }
];

const clientTypes = [
  {
    icon: Icons.Home,
    title: "Particulares",
    description: "Jardines que que reflejan tu estilo de vida. Para comer al aire libre, para leer un libro en paz. Espacios para la vida.",
    projects: "15+ familias"
  },
  {
    icon: Icons.Building,
    title: "Comunidades",
    description: "Cuidamos los jardines y zonas verdes comunes con responsabilidad, aumentando el valor de vuestra propiedad y el bienestar de todos los vecinos.",
    projects: "comunidades"
  },
  {
    icon: Icons.Briefcase,
    title: "Clientes Corporativos",
    description: "Soluciones verdes para empresas, promotoras, administraciones públicas y grandes propietarios. Creamos y mantenemos jardines que reflejan profesionalidad, cuidado y compromiso con el entorno.",
    projects: "empresas"
  }
];

const processSteps = [
  {
    icon: Icons.Phone,
    title: "Hablamos contigo",
    description: "Primero escuchamos tus necesidades, visitamos tu espacio y lo analizamos en persona. Sin compromiso y con total transparencia.",
    duration: "1-3 días"
  },
  {
    icon: Icons.Mail,
    title: "Propuesta Detallada",
    description: "En función de la visita, las dimensiones, el tipo de trabajo, la maquinaria necesaria y los materiales, te enviamos un plan claro: qué haremos, cómo, cuándo y cuánto costará.",
    duration: "3-5 días"
  },
  {
    icon: Icons.Hammer,
    title: "Ejecución",
    description: "Nos ponemos manos a la obra  manteniéndote informado en cada fase. Verás cómo tu espacio se transforma día a día .",
    duration: "Depende del proyecto"
  },
  {
    icon: Icons.Check,
    title: "Entrega y Soporte",
    description: "Te entregamos tu jardín terminado y, si lo deseas, te ofrecemos un plan de mantenimiento personalizado. Tu jardín crece y nosotros seguimos <a tu lado.",
    duration: "Seguimos cerca"
  }
];

// COMPONENTE SECTION HEADER 
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(3);

  // ESTADOS NUEVOS PARA EL FORMULARIO
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const slideIntervalRef = useRef(null);

  // FUNCIONES DEL FORMULARIO
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Validaciones básicas
      if (!formData.name || !formData.phone) {
        throw new Error('Por favor completa los campos requeridos');
      }

      // Insertar en Supabase
      if (!supabase) {
        throw new Error('El servicio de contacto no está disponible en este momento. Por favor llámanos directamente.');
      }

      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            service: formData.service || null,
            message: formData.message || null,
          }
        ]);

      if (error) throw error;

      // Éxito
      setSubmitStatus({
        type: 'success',
        message: '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.'
      });

      // Resetear formulario
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(testimonialInterval);
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
      {/* ═══════════════════════════════ HERO V2 ═══════════════════════════════ */}
      <section id="inicio" className="relative h-screen min-h-[700px] overflow-hidden">

        {/* Background image + layered gradients */}
        <div className="absolute inset-0">
          <img
            src="/inicio.jpg"
            alt="Jardín profesional diseñado en Madrid"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(108deg, rgba(2,8,1,0.88) 0%, rgba(4,14,2,0.72) 40%, rgba(0,0,0,0.3) 100%)',
            }}
          />
          {/* Bottom vignette for stat bar readability */}
          <div
            className="absolute bottom-0 inset-x-0 h-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
          />
        </div>

        {/* Leaf canvas */}
        <NatureCanvas />

        {/* ── Main content ── */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 h-full flex flex-col justify-center pb-32 md:pb-36">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-7 md:mb-9"
            >
              <div
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border backdrop-blur-md"
                style={{ background: 'rgba(138,211,65,0.1)', borderColor: 'rgba(138,211,65,0.3)' }}
              >
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/85 text-xs font-semibold">+25 años de experiencia en Madrid</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.38 }}
              className="font-black leading-none tracking-tight mb-6 text-white"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
            >
              <span className="block">JARDINES</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #9ae053 0%, #c3f07a 50%, #8ad341 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                QUE ENAMORAN
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58 }}
              className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 md:mb-12 max-w-xl leading-relaxed font-light"
            >
              Diseñamos, creamos y mantenemos el jardín de tus sueños en Madrid.{' '}
              <span style={{ color: '#9ae053' }} className="font-medium">
                Presupuesto gratis
              </span>
              , sin compromiso.
            </motion.p>

            {/* CTA group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Primary: Call */}
              <a
                href="tel:+34665764488"
                className="group inline-flex items-center space-x-3 px-6 py-4 rounded-2xl font-black text-sm md:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #75b930 0%, #a6e072 100%)',
                  color: '#030803',
                  boxShadow: '0 6px 28px rgba(138,211,65,0.35)',
                }}
              >
                <div className="w-9 h-9 bg-black/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icons.Phone className="text-base" style={{ color: '#030803' }} />
                </div>
                <div className="leading-none">
                  <div className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-65 mb-1">
                    Llamar ahora · Gratis
                  </div>
                  <div className="text-base md:text-lg font-black">+34 665 764 488</div>
                </div>
              </a>

              {/* Secondary: Quote */}
              <motion.button
                onClick={() => scrollToSection('contacto')}
                className="group inline-flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 border-2 text-white hover:bg-white/10 hover:-translate-y-1 backdrop-blur-sm active:scale-95"
                style={{ borderColor: 'rgba(255,255,255,0.22)' }}
                whileHover={{ borderColor: 'rgba(138,211,65,0.5)' }}
              >
                <Icons.Mail className="w-5 h-5 opacity-80" />
                <span>Solicitar presupuesto</span>
                <Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 opacity-70" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom stat cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute bottom-0 inset-x-0 z-10 pb-6 md:pb-8"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { number: '60+',  label: 'Proyectos' },
                { number: '25+',  label: 'Años exp.' },
                { number: '98%',  label: 'Satisfacción' },
                { number: '100%', label: 'Compromiso' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center px-3 py-3 md:py-4 rounded-xl backdrop-blur-md border"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="text-xl md:text-2xl font-black text-white leading-none">{s.number}</div>
                  <div className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll hint — desktop right side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute right-8 bottom-40 hidden lg:flex flex-col items-center space-y-3"
        >
          <div
            className="w-px h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(138,211,65,0.5))' }}
          />
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('servicios')}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
            style={{
              background: 'rgba(138,211,65,0.08)',
              borderColor: 'rgba(138,211,65,0.3)',
              color: '#8ad341',
            }}
          >
            <Icons.ChevronDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* 📊 COUNTER BAR */}
      <CounterBar />

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
            subtitle="Espacios donde se viven momentos especiales"
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

      {/* 📍 ZONAS DE COBERTURA */}
      <ZonasSection />

      {/* ⭐ EXPERIENCIA & TESTIMONIOS */}
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
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center px-1"
                  >
                    <StarRating rating={testimonials[activeTestimonial].rating} />
                    <p className="text-xs md:text-sm lg:text-base leading-relaxed font-normal text-gray-800 my-4 md:my-5 italic border-l-2 md:border-l-3 pl-2 md:pl-4" style={{ borderColor: colors.primary }}>
                      &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                    </p>
                    <div className="mb-2 md:mb-3">
                      <div className="text-sm md:text-base font-black text-gray-900 mb-0.5 md:mb-1">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-xs md:text-sm font-semibold" style={{ color: colors.primary }}>
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                    <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider"
                      style={{ background: colors.primary + '20', color: colors.primary }}>
                      <Icons.Award className="w-2 h-2 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      {testimonials[activeTestimonial].project}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-center space-x-1.5 md:space-x-2 mt-4 md:mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${index === activeTestimonial
                        ? 'w-4 md:w-5 shadow'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      style={{ backgroundColor: index === activeTestimonial ? colors.primary : undefined }}
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
          style={{ backgroundImage: "url('/inicio.jpg')" }}
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

      {/* ❓ FAQ SECTION */}
      <FAQSection />

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

      {/* ═══════════════════════════ CONTACTO V2 ═══════════════════════════ */}
      <section id="contacto" className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

          {/* LEFT PANEL — dark, conversion-focused */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-20 overflow-hidden"
            style={{ background: 'linear-gradient(155deg, #030a02 0%, #071005 50%, #030a02 100%)' }}
          >
            {/* Background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(138,211,65,0.07) 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(138,211,65,0.4), transparent)' }}
            />

            <div className="relative z-10 max-w-md">
              {/* Badge */}
              <div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border"
                style={{ background: 'rgba(138,211,65,0.1)', borderColor: 'rgba(138,211,65,0.25)', color: '#8ad341' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>Respondemos en menos de 2 horas</span>
              </div>

              <h2
                className="font-black leading-tight tracking-tight text-white mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Hablamos hoy.
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #9ae053, #c3f07a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Tu jardín no puede esperar.
                </span>
              </h2>

              <p className="text-white/55 text-base leading-relaxed mb-10 font-light">
                Presupuesto gratuito, sin compromiso. Nos desplazamos a toda
                la Comunidad de Madrid.
              </p>

              {/* Big phone CTA */}
              <a
                href="tel:+34665764488"
                className="group flex items-center space-x-4 p-5 rounded-2xl border mb-4 transition-all duration-300 hover:border-green-500/60 hover:bg-white/5"
                style={{ borderColor: 'rgba(138,211,65,0.2)', background: 'rgba(138,211,65,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #75b930, #a6e072)' }}
                >
                  <Icons.Phone className="text-lg" style={{ color: '#030a02' }} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Llamar ahora</p>
                  <p className="text-2xl font-black text-white group-hover:text-green-300 transition-colors">
                    +34 665 764 488
                  </p>
                </div>
                <Icons.ChevronRight className="ml-auto text-white/30 group-hover:text-green-400 group-hover:translate-x-1 transition-all w-5 h-5" />
              </a>

              {/* Secondary contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                <a
                  href="tel:+34645956928"
                  className="flex items-center space-x-3 p-3.5 rounded-xl border transition-all duration-200 hover:bg-white/5 group"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icons.Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#8ad341' }} />
                  <div>
                    <p className="text-[9px] text-white/35 uppercase tracking-wider">Teléfono 2</p>
                    <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">+34 645 956 928</p>
                  </div>
                </a>

                <a
                  href="mailto:flordelvalle.ec@gmail.com"
                  className="flex items-center space-x-3 p-3.5 rounded-xl border transition-all duration-200 hover:bg-white/5 group"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icons.Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#8ad341' }} />
                  <div>
                    <p className="text-[9px] text-white/35 uppercase tracking-wider">Email</p>
                    <p className="text-[11px] font-bold text-white/80 group-hover:text-white transition-colors break-all">
                      flordelvalle.ec@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/34665764488?text=Hola%2C%20me%20gustaría%20obtener%20un%20presupuesto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3.5 rounded-xl border transition-all duration-200 hover:bg-white/5 group"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="#8ad341" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.76l-.002-.005z"/>
                  </svg>
                  <div>
                    <p className="text-[9px] text-white/35 uppercase tracking-wider">WhatsApp</p>
                    <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Chatear ahora</p>
                  </div>
                </a>

                <div
                  className="flex items-center space-x-3 p-3.5 rounded-xl border"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icons.Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#8ad341' }} />
                  <div>
                    <p className="text-[9px] text-white/35 uppercase tracking-wider">Horario</p>
                    <p className="text-[11px] font-bold text-white/70">L–V 9–18h · S 9–15h</p>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div
                className="flex items-center space-x-3 p-4 rounded-xl border"
                style={{ background: 'rgba(138,211,65,0.06)', borderColor: 'rgba(138,211,65,0.15)' }}
              >
                <Icons.Shield className="w-5 h-5 flex-shrink-0" style={{ color: '#8ad341' }} />
                <p className="text-xs text-white/60">
                  Empresa con seguro de responsabilidad civil · Presupuesto claro y sin sorpresas
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-20 bg-white"
          >
            <div className="max-w-md w-full mx-auto lg:mx-0">
              {/* Header */}
              <div className="mb-8">
                <p
                  className="text-xs font-black uppercase tracking-[0.2em] mb-3"
                  style={{ color: '#8ad341' }}
                >
                  Presupuesto gratuito
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2">
                  Cuéntanos tu idea
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  Rellena el formulario y te contactamos hoy mismo.
                </p>
                <div
                  className="w-12 h-1 rounded-full mt-4"
                  style={{ background: 'linear-gradient(90deg, #75b930, #a6e072)' }}
                />
              </div>

              {/* Form status */}
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl text-sm flex items-start space-x-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <Icons.Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{submitStatus.message}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Phone side by side on md */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Nombre *
                    </label>
                    <input
                      type="text" name="name"
                      value={formData.name} onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-900 placeholder-gray-300 transition-all duration-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 hover:border-gray-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Teléfono *
                    </label>
                    <input
                      type="tel" name="phone"
                      value={formData.phone} onChange={handleInputChange}
                      placeholder="+34 6XX XXX XXX"
                      required disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-900 placeholder-gray-300 transition-all duration-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 hover:border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Email
                  </label>
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleInputChange}
                    placeholder="tu@email.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-900 placeholder-gray-300 transition-all duration-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 hover:border-gray-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Servicio que necesitas
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service} onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-900 transition-all duration-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Selecciona un servicio...</option>
                      {services.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                    <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Cuéntanos más
                  </label>
                  <textarea
                    name="message"
                    value={formData.message} onChange={handleInputChange}
                    placeholder="Describe tu espacio, qué necesitas, ideas que tengas..."
                    rows="4" disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-900 placeholder-gray-300 transition-all duration-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 hover:border-gray-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-black text-sm md:text-base relative overflow-hidden group transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style={{
                    background: isSubmitting
                      ? '#9ae053'
                      : 'linear-gradient(135deg, #75b930 0%, #a6e072 100%)',
                    color: '#030a02',
                    boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(138,211,65,0.3)',
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Enviando tu idea...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar y recibir presupuesto gratis</span>
                        <Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.button>

                <p className="text-center text-[10px] text-gray-400 flex items-center justify-center space-x-1.5">
                  <Icons.Shield className="w-3 h-3" />
                  <span>Datos protegidos · Nunca spam · Solo te llamamos una vez</span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}