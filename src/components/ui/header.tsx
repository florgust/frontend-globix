'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import React from "react";
import { Search } from "lucide-react";

const logo = "images-home_page/logo-globix.png";

export function HeaderPages() {
    return (
        <header className="w-full">
            <div className="bg-[#102976] p-5">
                <div className="flex items-center space-x-2">
                <div className="relative w-full max-w-md pl-10 ">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className="w-80 p-2 pl-12 rounded-md bg-[#111315] focus:outline-none text-white placeholder-gray-200"
                        />
                        <Search
                            size={20}
                            color="#fff"
                            className="absolute left-15 top-1/2 transform -translate-y-1/2"
                        />
                    </div>
                    <img src={logo} className="ml-auto pr-10"></img>
                </div>
            </div>
        </header>
    );

}


export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#102976] text-white px-8 py-3 flex justify-center items-center relative z-20 h-[92px]">
      {/* Contêiner central */}
      <div className="flex items-center justify-between w-full max-w-6xl gap-10">
        {/* Logo */}
        <div className="flex items-center cursor-pointer justify-center h-full">
          <Image
            src="/images-initial/globix-logo.png"
            alt="Logo Globix"
            width={200}
            height={0}
            priority
          />
        </div>

        {/* Navegação principal */}
        <nav className="flex items-center gap-8 text-sm font-medium" ref={menuRef}>
          {/* Viagens */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === 'viagens' ? null : 'viagens')}
              className="focus:outline-none flex items-center gap-2 cursor-pointer hover:font-bold"
            >
              Viagens
              <Image
                src="/images-initial/icone-down.png"
                alt="Ícone de seta para baixo"
                width={10}
                height={12}
              />
            </button>
            {openMenu === 'viagens' && (
              <ul className="absolute mt-2 bg-white text-[#0D1A3A] rounded shadow p-2 w-40 z-10">
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Planejadas</li>
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Passadas</li>
              </ul>
            )}
          </div>

          {/* Sobre Nós */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === 'sobre' ? null : 'sobre')}
              className="focus:outline-none flex items-center gap-2 cursor-pointer hover:font-bold"
            >
              Sobre Nós
              <Image
                src="/images-initial/icone-down.png"
                alt="Ícone de seta para baixo"
                width={10}
                height={12}
                className="hover:font-bold"
              />
            </button>
            {openMenu === 'sobre' && (
              <ul className="absolute mt-2 bg-white text-[#0D1A3A] rounded shadow p-2 w-40 z-10">
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Quem Somos</li>
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">Contato</li>
              </ul>
            )}
          </div>
        </nav>

        {/* Botões */}
        <div className="flex justify-center items-center gap-6">
          <a href='/login' className="flex justify-center items-center bg-[#C8FFB2] text-[#0D1A3A] font-semibold cursor-pointer text-sm px-5 py-3 rounded-md hover:bg-[#b3f9a1] active:scale-95 transition w-24 h-12">
            Login
          </a>
          <a href='/register' className="flex justify-center items-center bg-[#FFFDFD] text-[#0D1A3A] font-semibold cursor-pointer text-sm px-5 py-3 rounded-md hover:bg-[#f2f2f2] active:scale-95 transition w-24 h-12">
            Cadastro
          </a>
        </div>
      </div>
    </header>
  );
}