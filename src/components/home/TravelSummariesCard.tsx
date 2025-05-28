import Image from "next/image";
import { useEffect, useState } from "react";

const trips = [
  {
    title: "Viagem Rifaina",
    image: "/images-home_page/carousel/rifaina-capa.png",
    period: "01/07/2025 - 03/03/2025",
  },
  {
    title: "Viagem Salvador",
    image: "/images-login/imagem-dunas.jpg",
    period: "15/08/2024 - 22/08/2024",
  },
  {
    title: "Viagem Bonito",
    image: "/images-login/imagem-maldivas.jpg",
    period: "10/01/2025 - 17/01/2025",
  },
];

export default function TravelSummariesCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const trip = trips[current];

  return (
    <div className="bg-white rounded-2xl shadow-lg px-0 py-0 w-[100%] h-[28vh] flex flex-col">
      <h2 className="text-black text-xl font-bold px-6 pt-4 pb-2 text-center">Resumos de Viagens</h2>
      <div className="flex flex-col items-center px-4">
        <Image
          src={trip.image}
          alt={trip.title}
          width={220}
          height={100}
          className="rounded-lg object-cover mb-2"
          style={{ width: "220px", height: "100px", objectFit: "cover" }}
        />
        <div className="w-full px-4 flex flex-col items-center">
          <div className="text-black font-bold text-base text-center">{trip.title}</div>
          <div className="text-[#333] text-sm mb-2 text-center">{trip.period}</div>
          <button className="bg-[#1C4CDC] text-white text-xs font-semibold rounded-lg px-4 py-2 w-[50%] mx-auto">
            Ver Detalhes
          </button>
        </div>
      </div>

    </div>
  );
}