import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import StructuredData from './components/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://salarkitek.hu'),
  title: 'Salarkitek Kft. - Építőipari Generálkivitelezés Felsőfokon',
  description:
    'Stabil háttérrel rendelkező építőipari generálkivitelezés. Családi házak, ipari épületek, felújítások. Megbízható, gyors, professzionális.',
  keywords: [
    'generálkivitelezés',
    'építőipari kivitelezés',
    'családi ház építés',
    'építőipari cég',
    'generálkivitelező',
  ],
  authors: [{ name: 'Salarkitek Kft.' }],
  openGraph: {
    title: 'Salarkitek Kft. - Generálkivitelezés Felsőfokon',
    description: 'Építőipari generálkivitelezés stabil háttérrel',
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Salarkitek Kft.',
    url: 'https://salarkitek.hu',
    images: [
      {
        url: 'https://salaritek-website.vercel.app/og.png',
        width: 274,
        height: 248,
        alt: 'Salarkitek Kft.',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': 'placeholder',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ConstructionCompany',
  name: 'Salarkitek Kft.',
  description:
    'Építőipari generálkivitelezés családi házak, ipari épületek, felújítások területén. Megbízható kivitelező csapat stabil háttérrel.',
  url: 'https://salarkitek.hu',
  '@id': 'https://salarkitek.hu',
  logo: 'https://salaritek-website.vercel.app/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'HU',
  },
  sameAs: [
    // Ide jöhetnek social linkek (ha vannak)
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <StructuredData data={jsonLd} />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}