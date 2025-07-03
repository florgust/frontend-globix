'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, Search } from 'lucide-react';

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
          <div className="ml-auto pr-10 flex items-center">
            <Image
              src="/images-home_page/logo-globix.png"
              alt="Logo Globix"
              width={120}
              height={40}
              priority
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );

}


export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#102976] text-white px-4 md:px-8 py-3 flex justify-center items-center relative z-20 h-[92px]">
      {/* Contêiner central */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-7xl gap-4 md:gap-10">
        {/* Logo */}
        <div className="flex items-center cursor-pointer justify-center h-full min-w-[120px]">
          <Image
            src="/images-initial/globix-logo.png"
            alt="Logo Globix"
            width={160}
            height={0}
            priority
            className="w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

        {/* Navegação principal */}
        <nav className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-medium min-w-0" ref={menuRef}>
          {/* Viagens */}
            <div className="relative">
            <button
              onClick={() => window.location.href = '/community'}
              className="focus:outline-none flex items-center gap-2 cursor-pointer hover:font-bold"
            >
              Comunidade
            </button>
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
              <ul className="absolute mt-2 bg-white text-[#0D1A3A] rounded shadow p-2 w-36 md:w-40 z-10">
                <li
                  className="hover:bg-gray-100 px-3 py-1 cursor-pointer"
                  onClick={() => window.location.href = '/about/#bem-vindo'}
                >
                  Bem vindo
                </li>

                <li
                  className="hover:bg-gray-100 px-3 py-1 cursor-pointer"
                  onClick={() => window.location.href = '/about/#globuxo'}
                >
                  Globuxo
                </li>

                <li
                  className="hover:bg-gray-100 px-3 py-1 cursor-pointer"
                  onClick={() => window.location.href = '/about/#time'}
                >
                  Time
                </li>

                <li
                  className="hover:bg-gray-100 px-3 py-1 cursor-pointer"
                  onClick={() => window.location.href = '/about/#motivos'}
                >
                  Motivos para usar o Globix
                </li>
              </ul>
            )}
          </div>
        </nav>

        {/* Botões - Desktop */}
        <div className="hidden sm:flex flex-wrap justify-center items-center gap-4 md:gap-6 min-w-[180px]">
          <a href='/login' className="flex justify-center items-center bg-[#C8FFB2] text-[#0D1A3A] font-semibold cursor-pointer text-xs md:text-sm px-4 md:px-5 py-2 md:py-3 rounded-md hover:bg-[#b3f9a1] active:scale-95 transition w-20 md:w-24 h-10 md:h-12">
            Login
          </a>
          <a href='/register' className="flex justify-center items-center bg-[#FFFDFD] text-[#0D1A3A] font-semibold cursor-pointer text-xs md:text-sm px-4 md:px-5 py-2 md:py-3 rounded-md hover:bg-[#f2f2f2] active:scale-95 transition w-20 md:w-24 h-10 md:h-12">
            Cadastro
          </a>
        </div>

        {/* Menu Hamburguer - Mobile */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            className="p-2 rounded hover:bg-[#223a7a] transition"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>
          {showMobileMenu && (
            <div
              ref={mobileMenuRef}
              className="absolute top-[80px] right-4 bg-white text-[#0D1A3A] rounded shadow-lg flex flex-col items-stretch w-40 z-30 animate-fade-in"
            >
              <a
                href="/login"
                className="px-6 py-3 border-b border-gray-200 hover:bg-gray-100 font-semibold transition"
                onClick={() => setShowMobileMenu(false)}
              >
                Login
              </a>
              <a
                href="/register"
                className="px-6 py-3 hover:bg-gray-100 font-semibold transition"
                onClick={() => setShowMobileMenu(false)}
              >
                Cadastro
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}