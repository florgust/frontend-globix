// src/app/layout.tsx

import '../styles/global.css'; // Importa o arquivo de estilo global, onde o Tailwind está configurado
import { ReactNode } from 'react';
import { Search } from "lucide-react";
import Header from '@/components/ui/header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="text-gray-900">

        {/* Conteúdo da Página */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}