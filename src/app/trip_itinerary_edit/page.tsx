"use client";
import React, { useState, useEffect } from "react";
import WhiteBackground from "@/components/create_trip/whiteBackground";
import { HeaderPages } from "@/components/common/Header";
import SidebarMenu from "@/components/common/SidebarMenu";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { Alert } from "@/components/common/Alert";
import RequireAuth from "@/components/auth/RequireAuth";
import api from "@/utils/axios";
import {
  Clock,
  Calendar,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Save,
  ChevronLeft,
  ChevronRight,
  Car,
  Home,
  Coffee,
  Camera,
  Info,
  CheckCircle,
} from "lucide-react";

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
  { value: "Alimentação", icon: Coffee, color: "bg-orange-500" },
  { value: "Passeio", icon: MapPin, color: "bg-green-500" },
  { value: "Transporte", icon: Car, color: "bg-blue-500" },
  { value: "Hospedagem", icon: Home, color: "bg-purple-500" },
  { value: "Outro", icon: Camera, color: "bg-gray-500" },
];

export default function TripItineraryEdit() {
  const router = useRouter();

  const [itineraries, setItineraries] = useState<ItineraryDay[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
  const [type, setType] = useState(eventTypes[0].value);

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
  const hasActivityAtSameTime = (
    activities: Activity[],
    time: string,
    excludeIdx?: number
  ) =>
    activities.some(
      (a, idx) =>
        idx !== excludeIdx &&
        getComparableTime(a.time) === getComparableTime(time)
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
      if (!selectedTripStr) {
        setAlertMessage("Viagem não encontrada.");
        setLoading(false);
        return;
      }

      const selectedTrip = JSON.parse(selectedTripStr);
      const viagemId = selectedTrip.id;

      try {
        const response = await api.get(`/itinerarios/viagem/${viagemId}`);
        const mappedData = mapApiToItineraries(response.data);
        setItineraries(mappedData);

        // Se houver dados, definir data inicial baseada no primeiro dia
        if (mappedData.length > 0) {
          setDate(getComparableDate(mappedData[0].date));
        }
      } catch (error) {
        console.error("Erro ao buscar itinerários:", error);
        setAlertMessage("Erro ao carregar itinerários existentes.");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerarios();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // Adicionar atividade ao dia correto
  const handleAddItinerary = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !date.trim() ||
      !time.trim() ||
      !type.trim()
    ) {
      setAlertMessage("Por favor, preencha todos os campos.");
      return;
    }

    const displayDate = formatDateDisplay(date);
    const comparableDate = getComparableDate(date);

    setItineraries((prev) => {
      let found = false;
      let newItineraries = prev.map((it) => {
        if (getComparableDate(it.date) === comparableDate) {
          found = true;
          const exists = hasActivityAtSameTime(it.activities, time);
          if (exists) {
            setAlertMessage("Já existe um evento neste horário para este dia.");
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

    // Limpar form
    setTitle("");
    setDescription("");
    setType(eventTypes[0].value);
    setTime("08:00");
    setEditing(null);
  };

  // Remove activity
  const handleRemoveActivity = async (dayIdx: number, activityIdx: number) => {
    const activity = itineraries[dayIdx].activities[activityIdx];

    if (activity.id) {
      try {
        await api.delete(`/itinerario/${activity.id}`);
      } catch (error) {
        setAlertMessage("Erro ao excluir atividade!");
        console.error(error);
        return;
      }
    }

    setItineraries(
      (prev) =>
        prev
          .map((it, idx) =>
            idx === dayIdx
              ? {
                  ...it,
                  activities: it.activities.filter((_, i) => i !== activityIdx),
                }
              : it
          )
          .filter((it) => it.activities.length > 0) // Remove dias vazios
          .map((it, idx) => ({ ...it, day: idx + 1 })) // Reordena numeração
    );

    setEditing(null);

    // Ajustar página atual se necessário
    setCurrentPage((prev) => {
      const newLength = itineraries.filter(
        (it) => it.activities.length > 0
      ).length;
      if (prev >= newLength) return Math.max(0, newLength - 1);
      return prev;
    });
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

  // Cancelar edição
  const handleCancelEdit = () => {
    setTitle("");
    setDescription("");
    setType(eventTypes[0].value);
    setTime("08:00");
    setEditing(null);
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
    ) {
      setAlertMessage("Por favor, preencha todos os campos.");
      return;
    }

    const { dayIdx, activityIdx } = editing;

    // Verificar conflito de horário
    const exists = hasActivityAtSameTime(
      itineraries[dayIdx].activities,
      time,
      activityIdx
    );

    if (exists) {
      setAlertMessage("Já existe um evento neste horário para este dia.");
      return;
    }

    const displayDate = formatDateDisplay(date);
    const comparableDate = getComparableDate(date);

    setItineraries((prev) => {
      let newItineraries = [...prev];

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

        // Remove dia se ficou vazio
        if (newItineraries[dayIdx].activities.length === 0) {
          newItineraries.splice(dayIdx, 1);
        }
      } else {
        // Reordena atividades do mesmo dia
        newItineraries[dayIdx].activities.sort(compareActivityTimes);
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

    // Limpar form
    setTitle("");
    setDescription("");
    setType(eventTypes[0].value);
    setTime("08:00");
    setEditing(null);
  };

  // Salvar no backend
  const handleSaveItinerary = async () => {
    const selectedTripStr = localStorage.getItem("selectedTrip");
    if (!selectedTripStr) {
      setAlertMessage("Viagem não encontrada.");
      return;
    }

    const selectedTrip = JSON.parse(selectedTripStr);
    const viagemId = selectedTrip.id;

    try {
      setLoading(true);

      for (const day of itineraries) {
        for (const activity of day.activities) {
          const [dayStr, monthStr, yearStr] = day.date.split("/");
          const dataHora = `${yearStr}-${monthStr.padStart(
            2,
            "0"
          )}-${dayStr.padStart(2, "0")}T${activity.time}:00Z`;

          // Nova atividade: POST
          if (activity.isNew) {
            const response = await api.post("/itinerario", {
              viagemId,
              tipoEvento: activity.type,
              titulo: activity.title,
              dataHora,
              descricao: activity.description,
            });

            // Atualizar o ID local com o retornado
            activity.id = response.data.id;
            activity.isNew = false;
          }
          // Atividade editada: PUT
          else if (activity.edited && activity.id) {
            await api.put(`/itinerario/${activity.id}`, {
              titulo: activity.title,
              descricao: activity.description,
              tipoEvento: activity.type,
              dataHora,
            });

            activity.edited = false;
          }
        }
      }

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("Erro ao salvar o itinerário.");
    } finally {
      setLoading(false);
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

  const getEventTypeIcon = (type: string) => {
    const eventType = eventTypes.find((et) => et.value === type);
    return eventType || eventTypes[4]; // Default para "Outro"
  };

  if (loading) {
    return (
      <RequireAuth>
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <SidebarMenu />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-white text-xl">Carregando itinerário...</div>
          </div>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <SidebarMenu />

        {alertMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
            <Alert message={alertMessage} type="error" />
          </div>
        )}

        <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <HeaderPages />
          <WhiteBackground titulo="Editar Itinerário">
            <div className="max-w-6xl mx-auto px-6 py-8">
              {/* Seção de Informações */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#0F2976]">
                <div className="flex items-center mb-3">
                  <Info className="text-[#0F2976] mr-3" size={24} />
                  <h3 className="text-[#0F2976] font-bold text-lg">
                    Edição de Itinerário
                  </h3>
                </div>
                <p className="text-[#3B4449] text-sm leading-relaxed">
                  Edite as atividades da sua viagem. Você pode adicionar novas
                  atividades, editar as existentes ou removê-las conforme
                  necessário.
                </p>
              </div>

              <div className="flex gap-8">
                {/* Formulário de Adição/Edição */}
                <div className="w-1/2 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#3B4449] mb-6 flex items-center">
                    {editing ? (
                      <Edit3 className="mr-2" size={20} />
                    ) : (
                      <Plus className="mr-2" size={20} />
                    )}
                    {editing ? "Editar Atividade" : "Nova Atividade"}
                  </h3>

                  <div className="space-y-4">
                    {/* Data e Hora */}
                    <div>
                      <label className="block text-sm font-bold text-[#3B4449] mb-2">
                        Data e Hora
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-[#0F2976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-[#0F2976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Título */}
                    <div>
                      <label className="block text-sm font-bold text-[#3B4449] mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título da atividade"
                        className="w-full px-3 py-2 border-2 border-[#0F2976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <label className="block text-sm font-bold text-[#3B4449] mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição da atividade"
                        rows={3}
                        className="w-full px-3 py-2 border-2 border-[#0F2976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                      />
                    </div>

                    {/* Tipo de Evento */}
                    <div>
                      <label className="block text-sm font-bold text-[#3B4449] mb-2">
                        Tipo de Evento
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-[#0F2976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        {eventTypes.map((eventType) => (
                          <option key={eventType.value} value={eventType.value}>
                            {eventType.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2 pt-4">
                      {editing ? (
                        <>
                          <button
                            onClick={handleEditItinerary}
                            disabled={
                              !title.trim() ||
                              !description.trim() ||
                              !date.trim() ||
                              !time.trim()
                            }
                            className="flex-1 bg-[#B1FF91] text-[#0F2976] font-bold py-3 rounded-lg hover:bg-[#9AE670] transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                          >
                            <Save className="inline mr-2" size={16} />
                            Salvar Edição
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleAddItinerary}
                          disabled={
                            !title.trim() ||
                            !description.trim() ||
                            !date.trim() ||
                            !time.trim()
                          }
                          className="w-full bg-[#B1FF91] text-[#0F2976] font-bold py-3 rounded-lg hover:bg-[#9AE670] transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                          <Plus className="inline mr-2" size={16} />
                          Adicionar Atividade
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visualização do Itinerário */}
                <div className="w-1/2">
                  {itineraries.length > 0 ? (
                    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                      {/* Header do dia atual */}
                      <div className="bg-[#0F2976] text-white p-4">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                            className="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft size={20} />
                          </button>

                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Dia {itineraries[currentPage]?.day}
                            </h3>
                            <p className="text-sm opacity-90 flex items-center justify-center">
                              <Calendar size={16} className="mr-1" />
                              {itineraries[currentPage]?.date}
                            </p>
                          </div>

                          <button
                            onClick={handleNext}
                            disabled={currentPage === itineraries.length - 1}
                            className="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Atividades do dia */}
                      <div className="p-4 max-h-96 overflow-y-auto">
                        {itineraries[currentPage]?.activities.length > 0 ? (
                          <div className="space-y-3">
                            {itineraries[currentPage].activities.map(
                              (activity, activityIdx) => {
                                const eventType = getEventTypeIcon(
                                  activity.type
                                );
                                const IconComponent = eventType.icon;
                                const isEditing =
                                  editing?.dayIdx === currentPage &&
                                  editing?.activityIdx === activityIdx;

                                return (
                                  <div
                                    key={activityIdx}
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                      isEditing
                                        ? "border-[#B1FF91] bg-green-50"
                                        : "border-gray-200 hover:border-[#0F2976] hover:bg-blue-50"
                                    }`}
                                    onClick={() =>
                                      handleSelectActivity(
                                        currentPage,
                                        activityIdx
                                      )
                                    }
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start space-x-3 flex-1">
                                        <div
                                          className={`w-10 h-10 rounded-full flex items-center justify-center ${eventType.color}`}
                                        >
                                          <IconComponent
                                            size={20}
                                            className="text-white"
                                          />
                                        </div>

                                        <div className="flex-1">
                                          <div className="flex items-center mb-1">
                                            <Clock
                                              size={14}
                                              className="text-gray-500 mr-1"
                                            />
                                            <span className="text-sm font-bold text-[#0F2976]">
                                              {activity.time}
                                            </span>
                                            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                                              {activity.type}
                                            </span>
                                          </div>

                                          <h4 className="font-bold text-[#3B4449] mb-1">
                                            {activity.title}
                                          </h4>

                                          <p className="text-sm text-gray-600 line-clamp-2">
                                            {activity.description}
                                          </p>

                                          {(activity.isNew ||
                                            activity.edited) && (
                                            <div className="flex items-center mt-2">
                                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                                                <Info
                                                  size={12}
                                                  className="mr-1"
                                                />
                                                {activity.isNew
                                                  ? "Nova"
                                                  : "Editada"}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveActivity(
                                            currentPage,
                                            activityIdx
                                          );
                                        }}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                                        title="Remover atividade"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar
                              size={48}
                              className="mx-auto mb-2 opacity-50"
                            />
                            <p>Nenhuma atividade neste dia</p>
                          </div>
                        )}
                      </div>

                      {/* Indicador de páginas */}
                      {itineraries.length > 1 && (
                        <div className="bg-gray-50 px-4 py-3">
                          <div className="flex justify-center space-x-2">
                            {itineraries.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentPage(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                  idx === currentPage
                                    ? "bg-[#0F2976]"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center">
                      <Calendar
                        size={64}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <h3 className="text-lg font-bold text-gray-500 mb-2">
                        Nenhum itinerário encontrado
                      </h3>
                      <p className="text-gray-400">
                        Adicione a primeira atividade para começar
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão de Salvar */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSaveItinerary}
                  disabled={
                    loading ||
                    itineraries.length === 0 ||
                    !itineraries.some(
                      (it) => it.activities && it.activities.length > 0
                    )
                  }
                  className="bg-[#B1FF91] text-[#0F2976] font-bold px-12 py-4 rounded-xl text-xl hover:bg-[#9AE670] transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 flex items-center mx-auto"
                >
                  <CheckCircle className="mr-3" size={24} />
                  {loading ? "Salvando..." : "Atualizar Itinerário"}
                </button>
              </div>

              <SuccessModal
                isOpen={showSuccess}
                message="Itinerário atualizado com sucesso!"
                onClose={handleCloseModal}
              />
            </div>
          </WhiteBackground>
        </div>
      </div>
    </RequireAuth>
  );
}
