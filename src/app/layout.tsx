// src/app/layout.tsx

import '../styles/global.css'; // Importa o arquivo de estilo global, onde o Tailwind está configurado
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full text-gray-900 overflow-x-hidden">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}