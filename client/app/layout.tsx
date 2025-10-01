import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthGuard from '@/components/auth/auth-guard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GPGestion',
  description: 'Application moderne de gestion de projets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}