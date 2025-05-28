import { Sun } from "lucide-react";

export default function WeatherCard() {
  return (
    <div className="bg-gradient-to-br from-[#1C4CDC] to-[#00C86B] rounded-2xl shadow-lg px-8 py-6 w-[260px] h-[120px] flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <Sun className="text-yellow-300" size={36} />
        <div>
          <span className="text-white text-lg font-bold">Hoje</span>
          <div className="text-white text-2xl font-extrabold leading-none">26°C</div>
        </div>
      </div>
      <span className="text-white text-sm mt-2">Dia Ensolarado</span>
    </div>
  );
}