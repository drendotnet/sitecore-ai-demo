import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCHOTT | Sitecore AI POC',
  description: 'Pioneer your market with SCHOTT specialty glass and material solutions.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
