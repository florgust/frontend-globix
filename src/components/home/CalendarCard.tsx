import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarCard() {
  // Exemplo estático, destaque no dia 21
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const highlightDay = 21;

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 w-[320px] h-[220px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <button className="p-1 rounded hover:bg-gray-100">
          <ChevronLeft size={20} className="text-[#1C4CDC]" />
        </button>
        <span className="font-semibold text-[#1C4CDC]">July 2021</span>
        <button className="p-1 rounded hover:bg-gray-100">
          <ChevronRight size={20} className="text-[#1C4CDC]" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#1C4CDC] mb-1">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day) => (
          <span
            key={day}
            className={`py-1 rounded-full ${
              day === highlightDay
                ? "bg-[#00C86B] text-white font-bold"
                : "text-[#1C4CDC]"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}