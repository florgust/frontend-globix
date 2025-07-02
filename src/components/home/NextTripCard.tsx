import { useState, useEffect } from "react";
import api from "@/utils/axios";
import Cookies from "js-cookie";

const checklist = [
  "Verificar documentos (passaporte, RG/CNH e visto)",
  "Confirmar passagens e reservas de hospedagem",
  "Baixar mapas e apps de navegação offline",
  "Preparar mala (roupas, remédios e carregadores)",
  "Baixar músicas, filmes ou e-books para viagem",
];

const STORAGE_KEY = "nextTripChecklist";

function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

export default function NextTripCard() {
  const [checked, setChecked] = useState(Array(checklist.length).fill(false));
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  // Carregar do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  // Buscar próxima viagem
  useEffect(() => {
    const fetchNextTrip = async () => {
      try {
        const usuarioCookie = Cookies.get("usuario");
        const user = usuarioCookie ? JSON.parse(usuarioCookie) : null;
        const idUsuario = user?.id;
        if (!idUsuario) return;

        const { data } = await api.get(`/solicitacoes/viagem/card/${idUsuario}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filtra apenas viagens futuras
        const futureTrips = (data || [])
          .map((trip: any) => ({
            ...trip,
            start: parseDate(trip.data_inicio || trip.dataInicio),
          }))
          .filter((trip: any) => trip.start && trip.start >= today)
          .sort((a: any, b: any) => (a.start as Date).getTime() - (b.start as Date).getTime());

        if (futureTrips.length > 0) {
          const nextTrip = futureTrips[0];
          const diffTime = (nextTrip.start as Date).getTime() - today.getTime();
          setDaysLeft(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        } else {
          setDaysLeft(null);
        }
      } catch (error) {
        setDaysLeft(null);
      }
    };
    fetchNextTrip();
  }, []);

  const handleCheck = (idx: number) => {
    setChecked((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <div
      className="rounded-2xl shadow-lg px-6 py-5 w-[420px] h-[42.5vh] flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #CAFFB5 99.99%, #A7FF84 100%)"
      }}
    >
      <h2 className="text-[#0F2976] text-lg font-extrabold mb-1">Próxima Viagem</h2>
      <div className="text-[#292D32] text-2xl font-bold mb-2">
        {daysLeft === null
          ? "Nenhuma viagem futura encontrada!"
          : daysLeft === 0
            ? "A viagem começa hoje!"
            : `Faltam ${daysLeft} dia${daysLeft > 1 ? "s" : ""} para a viagem!`}
      </div>
      <div className="w-full border-b border-black mb-3" />
      <div className="text-[#0F2976] text-xs mb-2">Antes de partir, não esqueça de:</div>
      <ul className="text-[#292D32] text-2sm space-y-3 pl-1">
        {checklist.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 py-1">
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => handleCheck(idx)}
              className="accent-[#0F2976] w-4 h-4 rounded border-gray-300 cursor-pointer"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}