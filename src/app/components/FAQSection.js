'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: '¿Cuánto cuesta contratar un jardinero en Madrid?',
    a: 'El precio varía según el tipo de servicio, el tamaño del jardín y la periodicidad. Un mantenimiento mensual básico puede partir de 80–150 €, mientras que un proyecto de diseño e instalación de jardín se presupuesta de forma personalizada. Siempre ofrecemos visita y presupuesto gratuito sin compromiso.',
  },
  {
    q: '¿Hacéis presupuesto previo gratuito?',
    a: 'Sí, totalmente gratis y sin compromiso. Visitamos tu espacio, evaluamos el trabajo necesario y te entregamos un presupuesto detallado con precios claros. No hay sorpresas en la factura final.',
  },
  {
    q: '¿En qué zonas de Madrid ofrecéis servicio?',
    a: 'Trabajamos en toda la Comunidad de Madrid: Alcobendas, San Sebastián de los Reyes, La Moraleja, Tres Cantos, Madrid capital, Pozuelo de Alarcón, Las Rozas, Majadahonda, Boadilla del Monte y otras muchas zonas. Si no ves tu municipio, consúltanos — el desplazamiento no supone coste adicional en la mayoría de casos.',
  },
  {
    q: '¿Cuándo es el mejor momento para podar los árboles?',
    a: 'La época óptima depende de la especie. Para la mayoría de árboles de hoja caduca, la poda de formación se realiza en invierno (enero–febrero) cuando están en reposo vegetativo. Los frutales tienen su momento específico según la variedad. Las coníferas se podan preferiblemente en primavera o principios de verano. Nuestros especialistas evalúan cada árbol individualmente para determinar el momento y técnica más adecuados.',
  },
  {
    q: '¿Qué incluye el mantenimiento mensual de jardín?',
    a: 'Nuestro servicio integral de mantenimiento incluye: siega y recorte de césped, poda de setos y arbustos, eliminación de malas hierbas, revisión y regulación del sistema de riego, abonado y fertilización orgánica, tratamiento preventivo de plagas y enfermedades, y recogida de residuos vegetales. Al final de cada visita te informamos del estado de tu jardín.',
  },
  {
    q: '¿Cuánto tarda el diseño e instalación de un jardín nuevo?',
    a: 'Depende del tamaño y complejidad. Un jardín residencial mediano (100–300 m²) suele llevar entre 1 y 3 semanas desde la aprobación del proyecto. Proyectos más grandes o con elementos estructurales (terrazas, pérgolas, piscinas naturales) pueden requerir 4–8 semanas. Durante todo el proceso te mantenemos informado del avance.',
  },
  {
    q: '¿Trabajáis con comunidades de propietarios?',
    a: 'Sí, tenemos amplia experiencia gestionando zonas comunes de comunidades de vecinos. Ofrecemos contratos de mantenimiento adaptados, documentación completa para juntas de propietarios, y un interlocutor dedicado para que la gestión sea sencilla. Nuestros trabajos mejoran el valor de la propiedad y el bienestar de todos los vecinos.',
  },
  {
    q: '¿Tenéis seguro de responsabilidad civil?',
    a: 'Sí. Disponemos de seguro de responsabilidad civil que cubre todos nuestros trabajos. Trabajamos con total seguridad para nuestro equipo y con garantías para tu propiedad. Puedes solicitar el certificado de seguro en cualquier momento.',
  },
];

const ChevronIcon = ({ open }) => (
  <svg
    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: '#8ad341' }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#8ad341 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest border"
            style={{
              background: 'rgba(138,211,65,0.08)',
              borderColor: 'rgba(138,211,65,0.3)',
              color: '#5aaa1e',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Preguntas Frecuentes</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Todo lo que necesitas
            <span style={{ color: '#8ad341' }}> saber</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            Resolvemos las dudas más habituales sobre nuestros servicios de jardinería en Madrid.
          </p>
          <div
            className="w-24 h-1 rounded-full mx-auto mt-8"
            style={{ background: 'linear-gradient(90deg, #75b930, #a6e072)' }}
          />
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: isOpen ? 'rgba(138,211,65,0.5)' : 'rgba(0,0,0,0.08)',
                  boxShadow: isOpen ? '0 4px 24px rgba(138,211,65,0.12)' : 'none',
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  style={{ background: isOpen ? 'rgba(138,211,65,0.04)' : 'white' }}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-bold text-sm md:text-base pr-4 leading-snug transition-colors duration-200"
                    style={{ color: isOpen ? '#3d7a0f' : '#111827' }}
                  >
                    {faq.q}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed text-gray-600 border-t"
                        style={{ borderColor: 'rgba(138,211,65,0.2)' }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm mb-5">
            ¿Tienes otra pregunta? Estamos a tu disposición.
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #75b930 0%, #a6e072 100%)',
              color: '#0a0f07',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Contactar ahora</span>
          </a>
        </motion.div>
      </div>

      {/* FAQ Schema.org — Server rendered via layout, but also here for completeness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
