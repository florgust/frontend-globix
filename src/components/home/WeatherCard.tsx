import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

const LAT = -19.7502;
const LON = -47.9325;

const weatherMap: Record<number, { description: string; icon: string }> = {
  0: { description: "Céu limpo", icon: "01d" },
  1: { description: "Principalmente limpo", icon: "02d" },
  2: { description: "Parcialmente nublado", icon: "03d" },
  3: { description: "Nublado", icon: "04d" },
  45: { description: "Névoa", icon: "50d" },
  48: { description: "Névoa gelada", icon: "50d" },
  51: { description: "Garoa leve", icon: "09d" },
  53: { description: "Garoa moderada", icon: "09d" },
  55: { description: "Garoa densa", icon: "09d" },
  61: { description: "Chuva leve", icon: "10d" },
  63: { description: "Chuva moderada", icon: "10d" },
  65: { description: "Chuva forte", icon: "10d" },
  80: { description: "Chuva rápida", icon: "09d" },
  81: { description: "Chuva passageira", icon: "09d" },
  82: { description: "Chuva intensa", icon: "09d" },
};

export default function WeatherCard() {
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
    icon: string;
  } | null>(null);

  const [forecast, setForecast] = useState<
    { date: string; min: number; max: number; code: number }[]
  >([]);
  const [forecastIndex, setForecastIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Sao_Paulo`
      )
      .then((res) => {
        const data = res.data;
        const code = data.current.weather_code;
        const weatherInfo = weatherMap[code] || { description: "Desconhecido", icon: "01d" };
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          description: weatherInfo.description,
          icon: weatherInfo.icon,
        });
        const forecastArr = data.daily.time.map((date: string, i: number) => ({
          date,
          min: Math.round(data.daily.temperature_2m_min[i]),
          max: Math.round(data.daily.temperature_2m_max[i]),
          code: data.daily.weather_code[i],
        }));
        setForecast(forecastArr);

        // Ajuste: encontrar o índice do dia de hoje
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayIndex = forecastArr.findIndex((f: { date: string | number | Date; }) => {
          const d = new Date(f.date);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });
        if (todayIndex !== -1) {
          setForecastIndex(todayIndex);
        } else {
          setForecastIndex(0); // fallback
        }
      });
  }, []);

  const day = forecast[forecastIndex];
  const dayWeather =
    day
      ? {
        date: day.date,
        min: day.min,
        max: day.max,
        code: day.code,
        ...weatherMap[day.code],
      }
      : weather
        ? {
          date: "Hoje",
          min: weather.temp,
          max: weather.temp,
          code: 0,
          ...weather,
        }
        : null;

  const handlePrev = () => setForecastIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setForecastIndex((i) => Math.min(i + 1, forecast.length - 1));

return (
  <div className="rounded-2xl shadow-lg py-5 w-[100%] h-auto flex flex-col justify-between"
    style={{
      background: "linear-gradient(180deg, #4182F9 0%, #A7FF84 100%)"
    }}
  >
    <span className="text-white text-xl font-semibold mb-1 ml-5">Previsão do Tempo</span>
    {dayWeather ? (
      <div className="flex items-center justify-between ">
        <button
          onClick={handlePrev}
          disabled={forecastIndex === 0}
          className="p-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={34} />
        </button>
        <img
          src={`https://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`}
          alt="Ícone do clima"
          className="w-24 h-24 object-cover"
        />
        <div className="flex flex-col items-start justify-center flex-1">
          <span className="text-[#0F2976] text-2xl font-bold mb-3">
            {(() => {
              const today = new Date();
              const forecastDate = new Date(dayWeather.date);
              today.setHours(0, 0, 0, 0);
              forecastDate.setHours(0, 0, 0, 0);
              if (today.getTime() === forecastDate.getTime()) {
                return "Hoje";
              }
              let weekDay = forecastDate.toLocaleDateString("pt-BR", { weekday: "long" });
              weekDay = weekDay.replace("-feira", "");
              return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
            })()}
          </span>
          <div className="text-white text-xl font-extrabold leading-none">
            {dayWeather.min === dayWeather.max ? (
              <>
                {dayWeather.min}
                <span className="text-xs align-super">°C</span>
              </>
            ) : (
              <>
                {dayWeather.min}
                <span className="text-xs align-super">°C</span>
                {" / "}
                {dayWeather.max}
                <span className="text-xs align-super">°C</span>
              </>
            )}
          </div>
          <span className="text-[#0F2976] text-2sm font-lg mt-1 truncate">
            {dayWeather.description.charAt(0).toUpperCase() +
              dayWeather.description.slice(1)}
          </span>
        </div>
        <button
          onClick={handleNext}
          disabled={forecastIndex === forecast.length - 1}
          className="p-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={34} />
        </button>
      </div>
    ) : (
      <div className="flex justify-center items-center h-32">
        <span className="text-[#0F2976]">Carregando...</span>
      </div>
    )}
  </div>
)};