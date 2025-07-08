import Image from "next/image";
import Tag from "@/components/common/Tag";
import { Trip } from "@/types/trip";
import { useRouter } from "next/navigation";

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const url = trip.papel === "organizador" ? "/travels" : "/trip";
  const router = useRouter();
  const isEncerrada = trip.status === 0;

  const handleDetailsClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTrip", JSON.stringify(trip));
    }
    router.push(url);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs relative ${isEncerrada ? 'opacity-50 grayscale' : ''}`}>
      {/* Overlay sutil para viagens encerradas */}
      {isEncerrada && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-white font-bold text-xs bg-red-500 px-2 py-1 rounded">
            ENCERRADA
          </span>
        </div>
      )}
      
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
        <div className="flex justify-center">
          <h3 className="text-2xl text-center font-semibold truncate">
            <span className="truncate">{trip.nome}</span>
          </h3>
        </div>
        <p>
          <strong>Dia:</strong>{" "}
          {new Date(trip.dataInicio).toLocaleDateString("pt-BR")}
        </p>
        <p><strong>Organizador:</strong> {trip.organizador}</p>
        <p><strong>Transporte:</strong> {trip.transporte}</p>
        <p>
          <strong>Duração:</strong>{" "}
          {new Date(trip.dataInicio).toLocaleDateString("pt-BR")} até {new Date(trip.dataFim).toLocaleDateString("pt-BR")}
        </p>
        <button
          className={`px-3 py-1 rounded-xl mt-2 text-sm cursor-pointer ${
            isEncerrada 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-[#102976] text-white hover:bg-[#0a1f5f]'
          }`}
          onClick={isEncerrada ? undefined : handleDetailsClick}
          disabled={isEncerrada}
        >
          {isEncerrada ? 'Encerrada' : 'Mais detalhes'}
        </button>
      </div>
    </div>
  );
};

export default TripCard;