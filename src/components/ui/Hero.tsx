"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter();

  return (
    <section
      className="text-white px-4 sm:px-8 md:px-12 bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images-initial/imagem-waves.png')",
        height: "calc(100vh - 92px)", 
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-20 max-w-6xl w-full mx-auto">
        {/* Texto */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-4">
            Gerencie suas <br />
            viagens de <br />
            forma <span className="text-[#C9F9AF]">eficiente!</span>
          </h1>
          <p className="text-white/90 mb-8 text-base sm:text-lg md:text-xl tracking-tight">
            Nosso software ajuda você a planejar destinos, <br />gerenciar participantes e
            controlar custos de forma<br /> <span className="font-bold">simples e rápida</span>.
          </p>
          <button
            className="bg-[#4F9CF9] hover:bg-blue-600 text-white cursor-pointer font-semibold px-4 md:px-5 py-2 md:py-3 rounded-lg transition flex items-center gap-2 text-sm md:text-base"
            onClick={() => router.push("/login")}
          >
            Utilize o<span className="font-black">GLOBIX</span>gratuitamente
            <Image
              src="/images-initial/icone-right.png"
              alt="Ícone de seta para a direita"
              width={12}
              height={10}
            />
          </button>
        </div>

        {/* Imagem do globo */}
        <div className="flex-1 flex justify-center min-w-0">
          <Image
            src={"/images-initial/imagem-globo.png"}
            alt="Objeto globo"
            className="rounded-lg shadow-lg w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[700px] h-auto"
            width={700}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}