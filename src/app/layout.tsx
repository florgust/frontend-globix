// src/app/layout.tsx

import '../styles/global.css'; // Importa o arquivo de estilo global
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="text-gray-900 font-sans">
        {/* Cabeçalho */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Meu Projeto Next.js com Tailwind</h1>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="min-h-screen bg-[#0F2976]">{children}</main>

        {/* Rodapé */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-4">
          <p>&copy; 2025 - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}