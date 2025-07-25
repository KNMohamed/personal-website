import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { LenisProvider } from './providers/lenis-provider';

// Define your font, specifying paths to your font files and their properties
const neueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/PPNeueMontreal-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Book.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Bold.otf',
      weight: '700', // Bold weight
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-SemiBolditalic.otf',
      weight: '600', // SemiBold weight
      style: 'italic', // Italic style
    },
  ],
  variable: '--font-neue-montreal',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${neueMontreal.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
