import Image from "next/image";
import Tag from "@/components/ui/Tag";
import { Trip } from "@/types/trip";

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs">
    <div className="relative">
      <Image
        src={trip.imagem}
        alt={trip.nome}
        width={300}
        height={160}
        className="object-cover w-full h-40"
      />
      <div className="absolute top-2 left-2">
        <Tag role={trip.papel} />
      </div>
    </div>
    <div className="p-4 space-y-1 text-sm">
      {/* Nome da viagem */}
      <div className="flex justify-center">
        <h3 className="text-2xl text-center font-semibold truncate">
          <span className="truncate">{trip.nome}</span>
        </h3>
      </div>
      <p><strong>Dia:</strong> {trip.dataInicio}</p>
      <p><strong>Organizador:</strong> {trip.organizador}</p>
      <p><strong>Transporte:</strong> {trip.transporte}</p>
      <p><strong>Duração:</strong> {trip.dataInicio} até {trip.dataFim}</p>
      <button className="bg-[#102976] text-white px-3 py-1 rounded-xl mt-2 text-sm hover:bg-[#0a1f5f] cursor-pointer">
        Mais detalhes
      </button>
    </div>
  </div>
);

export default TripCard;
