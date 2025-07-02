"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { Itinerary } from "@/components/ui/Itinerary";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import RequireAuth from "@/components/auth/RequireAuth";

interface Activity {
  time: string;
  title: string;
  description: string;
  type: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

const eventTypes = [
  "Alimentação",
  "Passeio",
  "Transporte",
  "Hospedagem",
  "Outro",
];

export default function TripItinerary() {
  const [itineraries, setItineraries] = useState<ItineraryDay[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // Form state
  const [date, setDate] = useState("2025-04-20");
  const [time, setTime] = useState("08:00");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(eventTypes[0]);

  // Utilitário para formatar data para "dd/mm/yyyy"
  const formatDateDisplay = (dateStr: string) => {
    if (dateStr.includes("/")) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  // Utilitário para comparar datas (yyyy-mm-dd)
  const getComparableDate = (dateStr: string) => {
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  };

  // Utilitário para comparar horas (hh:mm)
  const getComparableTime = (timeStr: string) => {
    return timeStr.padStart(5, "0");
  };

  // Adicionar atividade ao dia correto, criando o dia se necessário, mantendo ordem cronológica
  const handleAddItinerary = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !date.trim() ||
      !time.trim() ||
      !type.trim()
    )
      return;

    const displayDate = formatDateDisplay(date);
    const comparableDate = getComparableDate(date);

    setItineraries((prev) => {
      // Procura se já existe o dia
      let found = false;
      let newItineraries = prev.map((it) => {
        if (getComparableDate(it.date) === comparableDate) {
          found = true;
          // Verifica se já existe atividade no mesmo horário
          const exists = it.activities.some(
            (a) => getComparableTime(a.time) === getComparableTime(time)
          );
          if (exists) {
            alert("Já existe um evento neste horário para este dia.");
            return it;
          }
          // Adiciona atividade e ordena por hora
          const newActivities = [
            ...it.activities,
            { time, title, description, type },
          ].sort((a, b) =>
            getComparableTime(a.time).localeCompare(getComparableTime(b.time))
          );
          return { ...it, activities: newActivities };
        }
        return it;
      });

      // Se não encontrou, cria novo dia
      if (!found) {
        newItineraries = [
          ...newItineraries,
          {
            day: 0, // será ajustado depois
            date: displayDate,
            activities: [{ time, title, description, type }],
          },
        ];
      }

      // Ordena os dias por data
      newItineraries = newItineraries
        .sort((a, b) =>
          getComparableDate(a.date).localeCompare(getComparableDate(b.date))
        )
        .map((it, idx) => ({ ...it, day: idx + 1 }));

      // Atualiza página atual para o dia do evento recém adicionado
      const newPage = newItineraries.findIndex(
        (it) => getComparableDate(it.date) === comparableDate
      );

      setCurrentPage(newPage);

      return newItineraries;
    });

    setTitle("");
    setDescription("");
    setType(eventTypes[0]);
    setTime("08:00");
  };

  // Remove activity
  const handleRemoveActivity = (activityIdx: number) => {
    setItineraries((prev) =>
      prev.map((it, idx) =>
        idx === currentPage
          ? {
            ...it,
            activities: it.activities.filter((_, i) => i !== activityIdx),
          }
          : it
      )
    );
  };

  // Remove entire day
  const handleRemoveDay = (dayIdx: number) => {
    setItineraries((prev) => prev.filter((_, idx) => idx !== dayIdx));
    // Ajusta a página atual para não ficar fora do índice
    setCurrentPage((prevPage) => {
      if (dayIdx === 0) return 0;
      if (prevPage >= itineraries.length - 1)
        return itineraries.length - 2 >= 0 ? itineraries.length - 2 : 0;
      return prevPage;
    });
  };

  // Pagination
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < itineraries.length - 1) setCurrentPage(currentPage + 1);
  };

  const handleSaveItinerary = async () => {
    const viagemStr = localStorage.getItem("viagemEmCriacao");
    if (!viagemStr) {
      alert("Viagem não encontrada.");
      return;
    }
    const viagem = JSON.parse(viagemStr);
    const viagemId = viagem.id;

    try {
      for (const day of itineraries) {
        for (const activity of day.activities) {
          const [dayStr, monthStr, yearStr] = day.date.split("/");
          // Monta dataHora no formato ISO
          const dataHora = `${yearStr}-${monthStr.padStart(
            2,
            "0"
          )}-${dayStr.padStart(2, "0")}T${activity.time}:00Z`;

          await api.post("/itinerario", {
            viagemId,
            tipoEvento: activity.type,
            titulo: activity.title,
            dataHora,
            descricao: activity.description,
          });
        }
      }
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar o itinerário.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push("/create_trip_successful");
  };

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <SidebarMenu />
        <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <HeaderPages />
          <div className="bg-[#0F2976] w-[80rem] rounded-t-2xl px-10 py-6 mt-8">
            <h2 className="text-3xl font-bold text-white">
              Criar Viagem - Itinerário
            </h2>
          </div>
          <div className="w-[80rem] h-[41rem] bg-white rounded-b-2xl shadow-lg px-10 py-8 flex gap-8 flex-col">
            <div className="flex flex-row gap-8 flex-1">
              {/* Formulário */}
              <div className="flex flex-col w-1/2 gap-4">
                <label className="font-bold text-[#292D32] text-lg">
                  Data e Hora
                </label>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center border border-[#00FF4D] rounded-lg px-2 py-1 bg-white">
                    <input
                      type="date"
                      className="outline-none border-none bg-transparent text-[#0F2976] font-bold"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="outline-none border-none bg-transparent text-[#0F2976] font-bold ml-2"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <label className="font-bold text-[#292D32] text-lg mt-2">
                  Título
                </label>
                <input
                  className="border-2 border-[#00FF4D] rounded-lg px-4 py-2 text-[#0F2976] focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título do evento"
                />
                <label className="font-bold text-[#292D32] text-lg mt-2">
                  Descrição
                </label>
                <textarea
                  className="border-2 border-[#00FF4D] rounded-lg px-4 py-2 text-[#0F2976] font-normal focus:outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição do evento"
                />
                <label className="font-bold text-[#292D32] text-lg mt-2">
                  Tipo de Evento
                </label>
                <select
                  className="border-2 border-[#00FF4D] rounded-lg px-4 py-2 text-[#0F2976] font-bold focus:outline-none cursor-pointer"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {eventTypes.map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                </select>
                <div className="flex justify-center">
                  <button
                    className="flex items-center justify-center gap-2 mt-4 bg-[#A7FF84] text-[#0F2976] font-bold py-2 rounded-lg text-lg shadow hover:bg-[#4be05a] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-65 border-[#C4C4C4]"
                    onClick={handleAddItinerary}
                    type="button"
                    disabled={
                      !title.trim() ||
                      !description.trim() ||
                      !date.trim() ||
                      !time.trim() ||
                      !type.trim()
                    }
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white mr-2">
                      <img
                        src="/images-trip_itinerary/mais.svg"
                        alt="Adicionar"
                        className="w-5 h-5"
                      />
                    </span>
                    Adicionar Itinerário
                  </button>
                </div>
              </div>
              {/* Linha vertical divisória */}
              <div className="w-px bg-[#092064] h-[32rem] mx-2" />
              <Itinerary
                itineraries={itineraries}
                currentPage={currentPage}
                handleRemoveDay={handleRemoveDay}
                handleRemoveActivity={handleRemoveActivity}
                handlePrev={handlePrev}
                handleNext={handleNext}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="flex justify-center pb-44">
              <button
                className="cursor-pointer transition hover:scale-105 bg-[#A7FF84] text-[#0F2976] font-bold px-[10rem] py-[1rem] rounded-xl text-2xl shadow min-w-[20rem] disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={
                  itineraries.length === 0 ||
                  !itineraries.some(
                    (it) => it.activities && it.activities.length > 0
                  )
                }
                onClick={handleSaveItinerary}
              >
                Salvar
              </button>
              <SuccessModal
                isOpen={showSuccess}
                message="Itinerário salvo com sucesso!"
                onClose={handleCloseModal}
              />
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
