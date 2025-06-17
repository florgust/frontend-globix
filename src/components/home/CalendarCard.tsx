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
  // Se vier só a data (yyyy-mm-dd), crie como local
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // <-- sem UTC!
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

export default function CalendarCard() {
  // Estado do mês e ano exibidos
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [tripStartDates, setTripStartDates] = useState<Date[]>([]);

  // Buscar viagens do backend ao montar
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await api.get("/viagens"); // ajuste o endpoint se necessário
        // Supondo que cada viagem tem data_inicio ou dataInicio
        const dates: Date[] = (data || [])
          .map((trip: any) => parseDate(trip.data_inicio || trip.dataInicio))
          .filter((d: Date | null) => d !== null) as Date[];
        setTripStartDates(dates);
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };
    fetchTrips();
  }, []);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getFirstDayOfWeek(month, year);

  // Gera os dias do calendário, incluindo espaços em branco antes do 1º dia
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Funções para navegar entre meses
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

  // Verifica se o dia é o início de alguma viagem
  const isTripStartDay = (day: number) =>
    tripStartDates.some(
      (date) =>
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
    );

  // Nomes dos meses
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Nomes dos dias da semana
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                  ? "bg-[#B0FAC6] text-[#0F2976] font-bold border-2 border-[#0F2976]"
                  : "text-[#0F2976] hover:bg-[#F0F9FF] cursor-pointer"
                }`}
              title={isTripStartDay(day) ? "Início de viagem" : ""}
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