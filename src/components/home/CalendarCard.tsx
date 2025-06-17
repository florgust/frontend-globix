import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/utils/axios";

// Utilitário para obter o número de dias no mês
function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Utilitário para obter o dia da semana do primeiro dia do mês (0 = domingo)
function getFirstDayOfWeek(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

// Função para converter string de data do backend para Date
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

interface TripApiResponse {
  id: number;
  data_inicio?: string;
  dataInicio?: string;
  nome: string;
}

interface TripStart {
  id: number;
  date: Date;
  nome: string;
}

export default function CalendarCard() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [tripStartDates, setTripStartDates] = useState<TripStart[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await api.get<TripApiResponse[]>("/viagens");
        const trips: TripStart[] = (data || [])
          .map((trip: TripApiResponse) => {
            const date = parseDate(trip.data_inicio || trip.dataInicio || "");
            return date ? { id: trip.id, date, nome: trip.nome } : null;
          })
          .filter((t): t is TripStart => t !== null);
        setTripStartDates(trips);
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };
    fetchTrips();
  }, []);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getFirstDayOfWeek(month, year);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Retorna o nome da viagem que começa nesse dia (ou "")
  const getTripNameByDay = (day: number): string => {
    const trip = tripStartDates.find(
      (trip) =>
        trip.date.getDate() === day &&
        trip.date.getMonth() === month &&
        trip.date.getFullYear() === year
    );
    return trip ? trip.nome : "";
  };

  const isTripStartDay = (day: number) => !!getTripNameByDay(day);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 w-[100%] h-[29vh] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <button className="p-1 rounded hover:bg-gray-100" onClick={prevMonth}>
          <ChevronLeft size={20} className="text-[#0F2976] cursor-pointer" />
        </button>
        <span className="font-semibold text-[#0F2976]">
          {monthNames[month]} {year}
        </span>
        <button className="p-1 rounded hover:bg-gray-100" onClick={nextMonth}>
          <ChevronRight size={20} className="text-[#0F2976] cursor-pointer" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#0F2976] mb-1">
        {weekDays.map((wd) => (
          <span key={wd}>{wd}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarDays.map((day, idx) =>
          day ? (
            <span
              key={idx}
              className={`py-1 rounded-full transition ${isTripStartDay(day)
                  ? "bg-[#B0FAC6] text-[#0F2976] font-bold border-2 border-[#0F2976] cursor-help"
                  : "text-[#0F2976] hover:bg-[#F0F9FF] cursor-default"
                }`}
              title={getTripNameByDay(day)}
            >
              {day}
            </span>
          ) : (
            <span key={idx}></span>
          )
        )}
      </div>
    </div>
  );
}