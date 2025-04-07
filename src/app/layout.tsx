// src/app/layout.tsx

import '../styles/globals.css'; // Importa o arquivo de estilo global, onde o Tailwind está configurado
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        {/* Cabeçalho */}
        <header className="bg-blue-600 text-white p-4">
          
        </header>

        {/* Conteúdo da Página */}
        <main className="container mx-auto p-4">
          {children}
        </main>

        {/* Rodapé */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-4">
          
        </footer>
      </body>
    </html>
  );
}
