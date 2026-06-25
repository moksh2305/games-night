import { Poppins } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { auth } from '@/auth';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Games Night - Premium Dashboard',
  description: 'Luxury cyber-neon web dashboard UI for Games Night',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Sidebar session={await auth()} />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
