import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import Cookies from "js-cookie";

interface TripApiResponse {
  id: number;
  nome: string;
  data_inicio?: string;
  dataInicio?: string;
  data_fim?: string;
  dataFim?: string;
  imagem?: string;
}

function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export default function TravelSummariesCard() {
  const [trips, setTrips] = useState<TripApiResponse[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const usuarioCookie = Cookies.get("usuario");
        const user = usuarioCookie ? JSON.parse(usuarioCookie) : null;
        const idUsuario = user?.id;
        if (!idUsuario) return;

        const { data } = await api.get<TripApiResponse[]>(`/solicitacoes/viagem/card/${idUsuario}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filtra apenas viagens futuras
        const futureTrips = (data || []).filter((trip) => {
          const start = parseDate(trip.data_inicio || trip.dataInicio);
          return start && start >= today;
        });
        setTrips(futureTrips);
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    if (trips.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [trips]);

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg px-0 py-0 w-[100%] h-[30vh] flex flex-col items-center justify-center">
        <h2 className="text-[#0F2976] text-xl font-bold px-6 pt-4 pb-2 text-center">Resumos de Viagens</h2>
        <div className="text-[#0F2976] text-base font-semibold text-center">Nenhuma viagem futura encontrada.</div>
      </div>
    );
  }

  const trip = trips[current];

  return (
    <div className="bg-white rounded-2xl shadow-lg px-0 py-0 w-[100%] h-[30vh] flex flex-col">
      <h2 className="text-[#0F2976] text-xl font-bold px-6 pt-4 pb-2 text-center">Resumos de Viagens</h2>
      <div className="flex flex-col items-center px-4">
        <Image
          src={trip.imagem || "/images-home_page/carousel/rifaina-capa.png"}
          alt={trip.nome}
          width={220}
          height={100}
          className="rounded-lg object-cover mb-2"
          style={{ width: "220px", height: "100px", objectFit: "cover" }}
        />
        <div className="w-full px-4 flex flex-col items-center">
          <div className="text-black font-bold text-base text-center">{trip.nome}</div>
          <div className="text-[#333] text-sm mb-2 text-center">
            {formatDate(trip.data_inicio || trip.dataInicio)} - {formatDate(trip.data_fim || trip.dataFim)}
          </div>
          <button className="bg-[#0F2976] text-white text-xs font-semibold rounded-lg px-4 py-2 w-[50%] mx-auto cursor-pointer hover:transform hover:scale-105 transition duration-200">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}