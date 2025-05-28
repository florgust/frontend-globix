import Image from "next/image";

export default function TravelSummariesCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-0 py-0 w-[260px] h-[220px] flex flex-col">
      <h2 className="text-[#1C4CDC] text-lg font-bold px-6 pt-4 pb-2">Resumos de Viagens</h2>
      <div className="flex flex-col items-center px-4">
        <Image
          src="/images-home_page/carousel/rifaina-capa.png"
          alt="Viagem Rifaina"
          width={220}
          height={80}
          className="rounded-lg object-cover mb-2"
        />
        <div className="w-full">
          <div className="text-[#1C4CDC] font-bold text-base">Viagem Rifaina</div>
          <div className="text-[#333] text-xs mb-2">01/07/2025 - 03/03/2025</div>
          <button className="bg-[#1C4CDC] text-white text-xs font-semibold rounded-lg px-4 py-2 w-full">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}