import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const API_KEY = "SUA_API_KEY_AQUI"; // Substitua pela sua chave da OpenWeatherMap
const CITY = "Ribeirao Preto,BR"; // Ou qualquer cidade desejada

export default function WeatherCard() {
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
    icon: string;
  } | null>(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=pt_br`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      });
  }, []);

  return (
    <div className="rounded-2xl shadow-lg px-6 py-4 w-[100%] h-[20vh] flex flex-col justify-between"
      style={{
        background: "linear-gradient(180deg, #4182F9 0%, #A7FF84 100%)"
      }}
    >
      <span className="text-white text-xl font-semibold mb-1">Previsão do Tempo</span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {weather ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Ícone do clima"
              className="w-14 h-14"
            />
          ) : (
            <div className="w-14 h-14 bg-yellow-200 rounded-full animate-pulse" />
          )}
          <div>
            <span className="text-[#1C4CDC] text-xl font-bold">Hoje</span>
            <div className="text-[#1C4CDC] text-3xl font-extrabold leading-none">
              {weather ? `${weather.temp}°C` : "--"}
            </div>
          </div>
        </div>
        <ChevronRight className="text-[#1C4CDC]" size={28} />
      </div>
      <span className="text-[#1C4CDC] text-2sm mt-1 font-semibold">
        {weather ? weather.description.charAt(0).toUpperCase() + weather.description.slice(1) : "Carregando..."}
      </span>
    </div>
  );
}