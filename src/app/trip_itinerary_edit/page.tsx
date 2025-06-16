"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { Itinerary } from "@/components/ui/Itinerary";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

interface Activity {
  id?: number;
  time: string;
  title: string;
  description: string;
  type: string;
  edited?: boolean;
  isNew?: boolean;
}

interface ApiItinerary {
  id: number;
  viagemId: number;
  tipoEvento: string;
  titulo: string;
  dataHora: string;
  descricao: string;
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

  // Estado para edição
  const [editing, setEditing] = useState<{
    dayIdx: number;
    activityIdx: number;
  } | null>(null);

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

  // Função auxiliar para verificar se já existe atividade no mesmo horário
  const hasActivityAtSameTime = (activities: Activity[], time: string) =>
    activities.some(
      (a) => getComparableTime(a.time) === getComparableTime(time)
    );

  // Função auxiliar para comparar horários
  const compareActivityTimes = (a: Activity, b: Activity) =>
    getComparableTime(a.time).localeCompare(getComparableTime(b.time));

  // Função auxiliar para comparar datas de ItineraryDay
  const compareItineraryDates = (a: ItineraryDay, b: ItineraryDay) =>
    getComparableDate(a.date).localeCompare(getComparableDate(b.date));

  // Função para transformar resposta da API em formato do estado
  const mapApiToItineraries = (apiData: ApiItinerary[]): ItineraryDay[] => {
    const grouped: { [date: string]: Activity[] } = {};
    apiData.forEach((item) => {
      const [dateStr, timeStr] = item.dataHora.split("T");
      const [year, month, day] = dateStr.split("-");
      const displayDate = `${day.padStart(2, "0")}/${month.padStart(
        2,
        "0"
      )}/${year}`;
      if (!grouped[displayDate]) grouped[displayDate] = [];
      grouped[displayDate].push({
        id: item.id,
        time: timeStr.slice(0, 5),
        title: item.titulo,
        description: item.descricao,
        type: item.tipoEvento,
        edited: false,
        isNew: false,
      });
    });

    return Object.entries(grouped)
      .sort(([dateA], [dateB]) =>
        getComparableDate(dateA).localeCompare(getComparableDate(dateB))
      )
      .map(([date, activities], idx) => ({
        day: idx + 1,
        date,
        activities: activities.sort(compareActivityTimes),
      }));
  };

  // Buscar itinerários ao carregar a tela
  useEffect(() => {
    const fetchItinerarios = async () => {
      const selectedTripStr = localStorage.getItem("selectedTrip");
      if (!selectedTripStr) return;
      const selectedTrip = JSON.parse(selectedTripStr);
      const viagemId = selectedTrip.id;
      try {
        const response = await api.get(`/itinerarios/viagem/${viagemId}`);
        setItineraries(mapApiToItineraries(response.data));
      } catch (error) {
        console.error("Erro ao buscar itinerários:", error);
      }
    };
    fetchItinerarios();
  }, []);

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
      let found = false;
      let newItineraries = prev.map((it) => {
        if (getComparableDate(it.date) === comparableDate) {
          found = true;
          const exists = hasActivityAtSameTime(it.activities, time);
          if (exists) {
            alert("Já existe um evento neste horário para este dia.");
            return it;
          }
          const newActivities = [
            ...it.activities,
            { time, title, description, type, isNew: true },
          ].sort(compareActivityTimes);
          return { ...it, activities: newActivities };
        }
        return it;
      });

      if (!found) {
        newItineraries = [
          ...newItineraries,
          {
            day: 0,
            date: displayDate,
            activities: [{ time, title, description, type, isNew: true }],
          },
        ];
      }

      newItineraries = newItineraries
        .toSorted(compareItineraryDates)
        .map((it, idx) => ({ ...it, day: idx + 1 }));

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
    setEditing(null);
  };

  // Remove activity
  const handleRemoveActivity = async (activityIdx: number) => {
    const activity = itineraries[currentPage].activities[activityIdx];
    if (activity.id) {
      try {
        await api.delete(`/itinerario/${activity.id}`);
      } catch (error) {
        alert("Erro ao excluir atividade!");
        console.error(error);
        return;
      }
    }
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
    setEditing(null);
  };

  // Remove entire day
  const handleRemoveDay = async (dayIdx: number) => {
    const day = itineraries[dayIdx];
    // Remove cada atividade do backend
    await Promise.all(
      day.activities
        .filter((activity) => activity.id) // só remove se tiver id
        .map((activity) =>
          api
            .delete(`/itinerario/${activity.id}`)
            .catch((err) =>
              console.error(`Erro ao remover atividade ${activity.id}:`, err)
            )
        )
    );

    // Atualiza o estado local
    setItineraries((prev) => prev.filter((_, idx) => idx !== dayIdx));
    setCurrentPage((prevPage) => {
      if (dayIdx === 0) return 0;
      if (prevPage >= itineraries.length - 1)
        return itineraries.length - 2 >= 0 ? itineraries.length - 2 : 0;
      return prevPage;
    });
    setEditing(null);
  };

  // Selecionar uma atividade para edição
  const handleSelectActivity = (dayIdx: number, activityIdx: number) => {
    const activity = itineraries[dayIdx].activities[activityIdx];
    setDate(getComparableDate(itineraries[dayIdx].date));
    setTime(activity.time);
    setTitle(activity.title);
    setDescription(activity.description);
    setType(activity.type);
    setEditing({ dayIdx, activityIdx });
  };

  // Salvar edição
  const handleEditItinerary = () => {
    if (
      editing === null ||
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
      let newItineraries = [...prev];
      const { dayIdx, activityIdx } = editing;

      // Atualiza a atividade
      newItineraries[dayIdx].activities[activityIdx] = {
        ...newItineraries[dayIdx].activities[activityIdx],
        time,
        title,
        description,
        type,
        edited: true,
      };

      // Se a data foi alterada, move a atividade para o dia correto
      if (getComparableDate(newItineraries[dayIdx].date) !== comparableDate) {
        const activity = newItineraries[dayIdx].activities.splice(
          activityIdx,
          1
        )[0];
        activity.edited = true;
        let found = false;
        for (let i = 0; i < newItineraries.length; i++) {
          if (getComparableDate(newItineraries[i].date) === comparableDate) {
            found = true;
            newItineraries[i].activities.push(activity);
            newItineraries[i].activities.sort(compareActivityTimes);
            break;
          }
        }
        if (!found) {
          newItineraries.push({
            day: 0,
            date: displayDate,
            activities: [activity],
          });
        }
        if (newItineraries[dayIdx].activities.length === 0) {
          newItineraries.splice(dayIdx, 1);
        }
      }

      newItineraries = newItineraries
        .toSorted(compareItineraryDates)
        .map((it, idx) => ({ ...it, day: idx + 1 }));

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
    setEditing(null);
  };

  // Salvar no backend
  const handleSaveItinerary = async () => {
    const selectedTripStr = localStorage.getItem("selectedTrip");
    if (!selectedTripStr) {
      alert("Viagem não encontrada.");
      return;
    }
    const selectedTrip = JSON.parse(selectedTripStr);
    const viagemId = selectedTrip.id;

    try {
      for (const day of itineraries) {
        for (const activity of day.activities) {
          const [dayStr, monthStr, yearStr] = day.date.split("/");
          const dataHora = `${yearStr}-${monthStr.padStart(
            2,
            "0"
          )}-${dayStr.padStart(2, "0")}T${activity.time}:00Z`;

          // Nova atividade: POST
          if (activity.isNew) {
            await api.post("/itinerario", {
              viagemId,
              tipoEvento: activity.type,
              titulo: activity.title,
              dataHora,
              descricao: activity.description,
            });
          }
          // Atividade editada: PUT
          else if (activity.edited && activity.id) {
            await api.put(`/itinerario/${activity.id}`, {
              titulo: activity.title,
              descricao: activity.description,
              tipoEvento: activity.type,
              dataHora,
            });
          }
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
    router.push("/travels");
  };

  // Paginação
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < itineraries.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
      <SidebarMenu />
      <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <HeaderPages />
        <div className="bg-[#0F2976] w-[80rem] rounded-t-2xl px-10 py-6 mt-8">
          <h2 className="text-3xl font-bold text-white">
            Editar itinerário da viagem
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
                className="border-2 border-[#00FF4D] rounded-lg px-4 py-2 text-[#0F2976] font-bold focus:outline-none"
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
                {editing ? (
                  <button
                    className="flex items-center justify-center gap-2 mt-4 bg-[#A7FF84] text-[#0F2976] font-bold py-2 rounded-lg text-lg shadow hover:bg-[#4be05a] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-65 border-[#C4C4C4]"
                    onClick={handleEditItinerary}
                    type="button"
                    disabled={
                      !title.trim() ||
                      !description.trim() ||
                      !date.trim() ||
                      !time.trim() ||
                      !type.trim()
                    }
                  >
                    Salvar Edição
                  </button>
                ) : (
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
                )}
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
              onSelectActivity={handleSelectActivity}
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
  );
}
