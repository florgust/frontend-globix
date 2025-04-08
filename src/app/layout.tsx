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
          <div className="container mx-auto flex items-center justify-between">

          {/* Barra de pesquisa */}
          <div className="flex items-center bg-black rounded-lg overflow-hidden w-1/4">
             <Search className='ml-5'/>

              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full px-4 py-2 text-white focus:outline-none"
              />
            </div>

            {/* Logo no lado direito */}
            <img
              src="/images/logo-globix.png" // Substitua pelo caminho da sua imagem
              alt="Logo"
              className="h-20 w-40"
              
            />
          </div>
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