import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="text-white px-6 bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images-initial/imagem-waves.png')",
        height: "calc(100vh - 92px)", // Subtraindo a altura do Header (92px)
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-6xl font-bold leading-tight mb-4">
            Gerencie suas <br />
            viagens de <br />
            forma <span className="text-[#C9F9AF]">eficiente!</span>
          </h1>
          <p className="text-white/90 mb-8 text-lg tracking-tight">
            Nosso software ajuda você a planejar destinos, <br />gerenciar participantes e
            controlar custos de forma<br /> <span className="font-bold">simples e rápida</span>.
          </p>
          <button className="bg-[#4F9CF9] hover:bg-blue-600 text-white cursor-pointer font-semibold px-5 py-3 rounded-lg transition flex items-center gap-2">
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
        <div className="flex-1">
          <Image
            src={"/images-initial/imagem-globo.png"}
            alt="Objeto globo"
            className="rounded-lg shadow-lg"
            width={700}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
