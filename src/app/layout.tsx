import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCHOTT | Sitecore AI POC',
  description: 'Pioneer your market with SCHOTT specialty glass and material solutions.',
  icons: {
    icon: [
      {
        url: 'https://www.schott.com/static/assets/gfx/favicon/SCHOTT_32.png?v=202610281229',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: 'https://www.schott.com/static/assets/gfx/favicon/SCHOTT_16.png?v=202610281229',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
