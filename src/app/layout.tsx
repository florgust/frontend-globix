import '../styles/global.css';
import { ReactNode } from 'react';
import { TripCreationProvider } from '@/utils/contextAPI';

export const metadata = {
  title: "Globix",
  description: "Seu app de viagens",
  icons: {
    icon: "/favicon2.png", 
  },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full text-gray-900 overflow-x-hidden">
        <TripCreationProvider>
          <main className="h-full">{children}</main>
        </TripCreationProvider>
      </body>
    </html>
  );
}