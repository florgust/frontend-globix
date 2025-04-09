// src/app/layout.tsx

import '../styles/global.css'; // Importa o arquivo de estilo global, onde o Tailwind está configurado
import { ReactNode } from 'react';
import { Search } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="text-gray-900">

        {/* Gambiarra, mudar depois */}
        <header className="bg-blue-800 text-white p-4">
          
        </header>

        {/* Conteúdo da Página */}
        <main className="min-h-screen">{children}</main>

        {/* Rodapé */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-4">
          <p>&copy; 2025 - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}