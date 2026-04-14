'use client';
import { motion } from 'framer-motion';

const ZONAS = [
  { name: 'Alcobendas',                  featured: true  },
  { name: 'Madrid Capital',              featured: true  },
  { name: 'San Sebastián de los Reyes',  featured: false },
  { name: 'La Moraleja',                 featured: true  },
  { name: 'Soto de la Moraleja',         featured: false },
  { name: 'Tres Cantos',                 featured: false },
  { name: 'Pozuelo de Alarcón',          featured: false },
  { name: 'Las Rozas de Madrid',         featured: false },
  { name: 'Majadahonda',                 featured: false },
  { name: 'Boadilla del Monte',          featured: false },
  { name: 'El Goloso',                   featured: false },
  { name: 'Torrejón de Ardoz',           featured: false },
];

const PinIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

// Decorative Madrid skyline SVG (abstract)
const MadridSkyline = () => (
  <svg viewBox="0 0 800 160" className="w-full opacity-10" preserveAspectRatio="none" aria-hidden="true">
    <path
      d="M0 160 L0 100 L40 100 L40 80 L50 80 L50 70 L60 70 L60 80 L70 80 L70 60 L75 55 L75 40 L80 35 L85 40 L85 55 L90 60 L90 80 L100 80 L100 90 L120 90 L120 70 L130 65 L140 70 L140 90 L160 90 L160 75 L170 68 L175 55 L180 68 L190 75 L190 55 L200 50 L200 40 L205 35 L205 20 L210 15 L215 20 L215 35 L220 40 L220 75 L230 75 L230 85 L250 85 L250 60 L260 55 L265 45 L270 55 L280 60 L280 85 L300 85 L300 70 L310 65 L320 70 L320 85 L340 85 L340 50 L350 45 L360 50 L360 85 L380 85 L380 75 L390 65 L395 50 L400 45 L405 50 L410 65 L420 75 L420 85 L440 85 L440 70 L450 65 L460 70 L460 85 L480 85 L480 55 L490 50 L490 30 L495 25 L495 10 L500 5 L505 10 L505 25 L510 30 L510 50 L520 55 L520 85 L540 85 L540 70 L550 65 L560 70 L560 85 L580 85 L580 60 L590 55 L600 60 L600 85 L620 85 L620 75 L630 65 L635 55 L640 65 L650 75 L650 85 L680 85 L680 90 L700 90 L700 75 L710 70 L720 75 L720 90 L750 90 L750 100 L800 100 L800 160 Z"
      fill="#8ad341"
    />
  </svg>
);

export default function ZonasSection() {
  return (
    <section
      id="zonas"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0c1a06 0%, #0f2108 50%, #0c1a06 100%)' }}
      aria-labelledby="zonas-title"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(138,211,65,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8ad34150, transparent)' }}
      />

      {/* Skyline decoration */}
      <div className="absolute bottom-0 inset-x-0">
        <MadridSkyline />
      </div>

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
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full mb-6 border text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(138,211,65,0.08)',
              borderColor: 'rgba(138,211,65,0.25)',
              color: '#8ad341',
            }}
          >
            <PinIcon />
            <span>Comunidad de Madrid</span>
          </div>

          <h2
            id="zonas-title"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Servicio en toda la
            <span style={{ color: '#8ad341' }}> Comunidad de Madrid</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Nos desplazamos sin coste adicional a las principales zonas de Madrid.
            Si no ves tu municipio, consúltanos — casi seguro llegamos.
          </p>
          <div
            className="w-24 h-1 rounded-full mx-auto mt-8"
            style={{ background: 'linear-gradient(90deg, #75b930, #a6e072)' }}
          />
        </motion.div>

        {/* Zones grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-12">
          {ZONAS.map((zona, i) => (
            <motion.div
              key={zona.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="relative group rounded-xl px-4 py-3 flex items-center space-x-2.5 border transition-all duration-300 cursor-default"
              style={{
                background: zona.featured
                  ? 'rgba(138,211,65,0.12)'
                  : 'rgba(255,255,255,0.04)',
                borderColor: zona.featured
                  ? 'rgba(138,211,65,0.4)'
                  : 'rgba(255,255,255,0.08)',
              }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
                style={{
                  background: zona.featured
                    ? 'rgba(138,211,65,0.25)'
                    : 'rgba(138,211,65,0.1)',
                  color: '#8ad341',
                }}
              >
                {zona.featured ? <PinIcon /> : <CheckIcon />}
              </span>
              <span
                className="text-sm font-semibold leading-tight"
                style={{ color: zona.featured ? '#c3f07a' : 'rgba(255,255,255,0.75)' }}
              >
                {zona.name}
              </span>
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(138,211,65,0.3)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-sm mb-5">
            ¿No ves tu municipio? Con toda seguridad llegamos.
          </p>
          <a
            href="https://wa.me/34665764488?text=Hola%2C%20me%20gustaría%20saber%20si%20ofrecéis%20servicio%20en%20mi%20zona.%20¿Podéis%20indicarme%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #75b930 0%, #a6e072 100%)',
              color: '#0a0f07',
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.76z"/>
            </svg>
            <span>Consulta disponibilidad en tu zona</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
