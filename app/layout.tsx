import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const courierPrime = localFont({
  src: [
    { path: '../public/fonts/courier-prime-regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/courier-prime-bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/courier-prime-italic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/courier-prime-bold-italic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-courier-prime',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'XIYI | Portfolio',
  description:
    'XIYI 的个人作品集：三维视觉、装置、平面设计、印刷与创意制作。',
  keywords: [
    'XIYI',
    '艺术家作品集',
    '视觉设计',
    '装置设计',
    '3D视觉',
    '平面与印刷',
  ],
  openGraph: {
    title: 'XIYI | Portfolio',
    description: '跨学科艺术、3D 视觉、装置、平面与创意制作。',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'XIYI | Portfolio',
    description: '跨学科艺术、3D 视觉、装置、平面与创意制作。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={courierPrime.variable}>{children}</body>
    </html>
  );
}
