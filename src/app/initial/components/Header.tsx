'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-[#0D1A3A] text-white px-6 py-4 flex justify-between items-center relative z-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo-globix.png"
          alt="Logo Globix"
          width={120}
          height={40}
          priority
        />
      </div>

      <nav className="flex items-center gap-6">
        {/* Viagens */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'viagens' ? null : 'viagens')}
            className="hover:underline focus:outline-none"
          >
            Viagens ▾
          </button>
          {openMenu === 'viagens' && (
            <ul className="absolute mt-2 bg-white text-[#0D1A3A] rounded shadow p-2 w-40">
              <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Planejadas</li>
              <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Passadas</li>
            </ul>
          )}
        </div>

        {/* Sobre Nós */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'sobre' ? null : 'sobre')}
            className="hover:underline focus:outline-none"
          >
            Sobre Nós ▾
          </button>
          {openMenu === 'sobre' && (
            <ul className="absolute mt-2 bg-white text-[#0D1A3A] rounded shadow p-2 w-40">
              <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Quem Somos</li>
              <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Contato</li>
            </ul>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <button className="bg-[#C9F9AF] text-[#0D1A3A] font-semibold px-4 py-1 rounded hover:bg-[#b2f396] active:scale-95 transition disabled:opacity-50">
            Login
          </button>
          <button className="bg-white text-[#0D1A3A] font-semibold px-4 py-1 rounded hover:bg-gray-200 active:scale-95 transition disabled:opacity-50">
            Cadastro
          </button>
        </div>
      </nav>
    </header>
  );
}
