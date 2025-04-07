import Image from "next/image";
import globe from "/../public/images-initial/imagem-globo.png";

export default function Hero() {
  return (
    <section
      className="text-white px-6 py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/imagem-waves.png')" }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Gerencie suas <br />
            viagens de <br />
            forma <span className="text-[#C9F9AF]">eficiente!</span>
          </h1>
          <p className="text-white/90 mb-6">
            Nosso software ajuda você a planejar destinos, gerenciar participantes e
            controlar custos de forma simples e rápida.
          </p>
          <button className="bg-[#1E40AF] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
            Utilize o <span className="font-bold">GLOBIX</span> gratuitamente →
          </button>
        </div>

        {/* Imagem do globo */}
        <div className="flex-1">
          <Image
            src={globe}
            alt="Objeto globo"
            className="rounded-lg shadow-lg"
            width={500}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
