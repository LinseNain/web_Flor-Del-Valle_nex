import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import CookieConsent from './components/CookieConsent';
import CustomCursor from './components/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://www.flordelvallej.com';
const GA_ID = 'G-NB8F56QC88';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jardinero en Madrid | Podas y Mantenimiento de Jardines — Flor Del Valle',
    template: '%s | Flor Del Valle',
  },
  description:
    'Jardinero profesional en Madrid con más de 25 años de experiencia. Especialistas en podas, mantenimiento de jardines, diseño de paisajismo y piscinas naturales. Servicio en Alcobendas, Madrid capital y toda la Comunidad de Madrid. Presupuesto sin compromiso.',
  keywords: [
    'jardinero en Madrid',
    'jardinero profesional Madrid',
    'podas de árboles Madrid',
    'mantenimiento de jardines Madrid',
    'diseño de jardines Madrid',
    'paisajismo Madrid',
    'jardinero Alcobendas',
    'podas Alcobendas',
    'mantenimiento jardines Alcobendas',
    'poda de setos Madrid',
    'jardinero barato Madrid',
    'jardines a medida Madrid',
    'servicio de jardinería Comunidad de Madrid',
    'empresa jardinería Madrid',
    'cuidado de jardines Madrid',
    'limpieza de jardines Madrid',
    'instalación riego automático Madrid',
    'piscinas naturales Madrid',
    'jardinero particular Madrid',
    'jardinería para comunidades Madrid',
  ],
  authors: [{ name: 'Flor Del Valle', url: SITE_URL }],
  creator: 'Flor Del Valle',
  publisher: 'Flor Del Valle',
  category: 'Jardinería y Paisajismo',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
    languages: { 'es-ES': SITE_URL },
  },
  openGraph: {
    title: 'Jardinero en Madrid | Podas y Mantenimiento — Flor Del Valle',
    description:
      'Servicios profesionales de jardinería en Madrid. Especialistas en podas, mantenimiento de jardines y diseño de paisajismo. Más de 25 años de experiencia.',
    url: SITE_URL,
    siteName: 'Flor Del Valle',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flor Del Valle — Jardinero Profesional en Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jardinero en Madrid | Flor Del Valle',
    description:
      'Podas, mantenimiento de jardines y paisajismo profesional en Madrid. +25 años de experiencia.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Flor Del Valle',
  description:
    'Servicios profesionales de jardinería en Madrid. Especialistas en podas, mantenimiento de jardines, diseño de paisajismo y piscinas naturales.',
  url: SITE_URL,
  telephone: ['+34665764488', '+34645956928'],
  email: 'flordelvalle.ec@gmail.com',
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo_green.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alcobendas',
    addressLocality: 'Alcobendas',
    addressRegion: 'Comunidad de Madrid',
    postalCode: '28100',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.5479,
    longitude: -3.6412,
  },
  areaServed: [
    { '@type': 'City', name: 'Madrid' },
    { '@type': 'City', name: 'Alcobendas' },
    { '@type': 'City', name: 'San Sebastián de los Reyes' },
    { '@type': 'City', name: 'Pozuelo de Alarcón' },
    { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Jardinería',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Podas y Talas Profesionales',
          description: 'Poda de árboles, setos y arbustos con técnicas profesionales en Madrid',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño y Creación de Jardines',
          description: 'Diseño y ejecución de jardines personalizados y proyectos de paisajismo en Madrid',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mantenimiento de Jardines',
          description: 'Servicio integral de mantenimiento y cuidado de jardines en Madrid y Alcobendas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mantenimiento de Piscinas',
          description: 'Limpieza y mantenimiento de piscinas en Madrid',
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect para rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload imagen hero para mejorar LCP */}
        <link rel="preload" href="/inicio.jpg" as="image" fetchPriority="high" />

        {/* Schema.org FAQ — para Google Featured Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                { '@type': 'Question', name: '¿Cuánto cuesta contratar un jardinero en Madrid?', acceptedAnswer: { '@type': 'Answer', text: 'El precio varía según el tipo de servicio, el tamaño del jardín y la periodicidad. Un mantenimiento mensual básico puede partir de 80–150 €, mientras que un proyecto de diseño e instalación de jardín se presupuesta de forma personalizada. Siempre ofrecemos visita y presupuesto gratuito sin compromiso.' } },
                { '@type': 'Question', name: '¿Hacéis presupuesto previo gratuito?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, totalmente gratis y sin compromiso. Visitamos tu espacio, evaluamos el trabajo necesario y te entregamos un presupuesto detallado con precios claros.' } },
                { '@type': 'Question', name: '¿En qué zonas de Madrid ofrecéis servicio?', acceptedAnswer: { '@type': 'Answer', text: 'Trabajamos en toda la Comunidad de Madrid: Alcobendas, San Sebastián de los Reyes, La Moraleja, Tres Cantos, Madrid capital, Pozuelo de Alarcón, Las Rozas, Majadahonda, Boadilla del Monte y otras muchas zonas.' } },
                { '@type': 'Question', name: '¿Cuándo es el mejor momento para podar los árboles?', acceptedAnswer: { '@type': 'Answer', text: 'La época óptima depende de la especie. Para la mayoría de árboles de hoja caduca, la poda de formación se realiza en invierno (enero–febrero) cuando están en reposo vegetativo.' } },
                { '@type': 'Question', name: '¿Qué incluye el mantenimiento mensual de jardín?', acceptedAnswer: { '@type': 'Answer', text: 'Nuestro servicio integral incluye: siega y recorte de césped, poda de setos y arbustos, eliminación de malas hierbas, revisión del riego, abonado, tratamiento preventivo de plagas y recogida de residuos vegetales.' } },
                { '@type': 'Question', name: '¿Trabajáis con comunidades de propietarios?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, tenemos amplia experiencia gestionando zonas comunes de comunidades de vecinos. Ofrecemos contratos de mantenimiento adaptados y documentación completa para juntas de propietarios.' } },
                { '@type': 'Question', name: '¿Tenéis seguro de responsabilidad civil?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Disponemos de seguro de responsabilidad civil que cubre todos nuestros trabajos. Puedes solicitar el certificado de seguro en cualquier momento.' } },
              ],
            }),
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXLVZ55Z');`,
          }}
        />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXLVZ55Z"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <CustomCursor />
        {children}
        <CookieConsent />

        {/* Google Analytics 4 — carga diferida para no bloquear render */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
