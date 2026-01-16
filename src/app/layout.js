import { Inter } from 'next/font/google';
import './globals.css';
import CookieConsent from './components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://flordelvalle.ec'),
  title: {
    default: 'Flor Del Valle | Jardinero en Madrid - Podas y Mantenimiento de Jardines',
    template: '%s | Flor Del Valle',
  },
  description: 'Servicios profesionales de jardinería en Madrid y alrededores. Especialistas en podas, mantenimiento de jardines, diseño de paisajismo y cuidado de zonas verdes. Servicio en Alcobendas, Madrid capital y toda la Comunidad de Madrid. Jardinero profesional con más de 25 años de experiencia.',
  keywords: [
    'jardinero en Madrid',
    'podas',
    'mantenimiento de jardines',
    'jardinería Madrid',
    'poda de árboles Madrid',
    'diseño de jardines Madrid',
    'paisajismo Madrid',
    'jardinero profesional',
    'cuidado de jardines',
    'poda de setos',
    'limpieza de jardines',
    'jardinero económico Madrid',
    'servicio de jardinería',
    'jardinero Alcobendas',
    'podas Alcobendas',
    'mantenimiento jardines Alcobendas',
  ],
  authors: [{ name: 'Flor Del Valle', url: 'https://flordelvalle.ec' }],
  creator: 'Flor Del Valle',
  publisher: 'Flor Del Valle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://flordelvalle.ec',
  },
  openGraph: {
    title: 'Flor Del Valle | Jardinero en Madrid - Podas y Mantenimiento de Jardines',
    description: 'Servicios profesionales de jardinería en Madrid. Especialistas en podas, mantenimiento de jardines y diseño de paisajismo. Jardinero profesional con +25 años de experiencia.',
    url: 'https://flordelvalle.ec',
    siteName: 'Flor Del Valle',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flor Del Valle - Jardinero Profesional en Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor Del Valle | Jardinero en Madrid',
    description: 'Servicios profesionales de jardinería: podas, mantenimiento de jardines y paisajismo en Madrid.',
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
  verification: {
    // Añade aquí tu código de verificación cuando lo tengas
    // google: 'tu-codigo-de-verificacion-google',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
};

export default function RootLayout({ children }) {
  // Schema.org JSON-LD para LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://flordelvalle.ec',
    name: 'Flor Del Valle',
    description: 'Servicios profesionales de jardinería en Madrid. Especialistas en podas, mantenimiento de jardines y diseño de paisajismo.',
    url: 'https://www.flordelvallej.com',
    telephone: '+34 665 764 488', // Teléfono principal (también disponible: +34 645 956 928)
    email: 'jdra.flordelvalle@gmail.com',
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
      latitude: 40.5479, // Alcobendas, Madrid
      longitude: -3.6412,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Madrid',
      },
      {
        '@type': 'City',
        name: 'Alcobendas',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Comunidad de Madrid',
      },
    ],
    priceRange: '$$',
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
    sameAs: [
      // COMPLETAR: Tus redes sociales
      // 'https://www.facebook.com/flordelvalle',
      // 'https://www.instagram.com/flordelvalle',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Jardinería',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mantenimiento de Jardines',
            description: 'Servicio integral de mantenimiento y cuidado de jardines en Madrid',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Podas Profesionales',
            description: 'Poda de árboles, setos y arbustos con técnicas profesionales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Diseño de Jardines',
            description: 'Diseño y ejecución de proyectos de paisajismo personalizados',
          },
        },
      ],
    },
    // aggregateRating: Añadir cuando tengas reseñas reales en Google My Business
    // {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5',
    //   reviewCount: '10',
    // },
  };

  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXLVZ55Z');`
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXLVZ55Z"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}