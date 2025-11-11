import type { Metadata } from 'next';
import '@/app/globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Health Coaching: Pre-Consultation Form',
  description:
    'Health coaching pre-consultation form to gather your health journey details',
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico?v=5', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'manifest', url: '/icons/site.webmanifest' },
      { rel: 'icon', url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
      <Footer />
    </html>
  );
}
