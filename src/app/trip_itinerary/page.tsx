"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { FiTrash2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const initialItineraries = [
    {
        day: 1,
        date: "20/04/2025",
        activities: [
            {
                time: "08:00",
                title: "Café da Manhã",
                description: "Buffet de café da manhã no hotel",
                type: "Alimentação",
            },
            {
                time: "11:00",
                title: "Pegar uma praia Ihul",
                description: "Praia de Rifânia muito boa",
                type: "Passeio",
            },
            {
                time: "17:00",
                title: "Barzinho pra curtir",
                description: "Bar Rifânia Top demais",
                type: "Passeio",
            },
        ],
    },
    {
        day: 2,
        date: "21/04/2025",
        activities: [
            {
                time: "08:00",
                title: "Café da Manhã",
                description: "Buffet de café da manhã no hotel",
                type: "Alimentação",
            },
            {
                time: "11:00",
                title: "Pegar uma praia Ihul",
                description: "Praia de Rifânia muito boa",
                type: "Passeio",
            },
            {
                time: "17:00",
                title: "Barzinho pra curtir",
                description: "Bar Rifânia Top demais",
                type: "Passeio",
            },
        ],
    },
    {
        day: 3,
        date: "22/04/2025",
        activities: [],
    },
];

const eventTypes = [
    "Alimentação",
    "Passeio",
    "Transporte",
    "Hospedagem",
    "Outro",
];

export default function TripItinerary() {
    const [itineraries, setItineraries] = useState(initialItineraries);
    const [currentPage, setCurrentPage] = useState(0);

    // Form state
    const [date, setDate] = useState("2025-04-20");
    const [time, setTime] = useState("08:00");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(eventTypes[0]);

    // Add itinerary item
    const handleAddItinerary = () => {
        if (!title.trim()) return;
        const activity = {
            time,
            title,
            description,
            type,
        };
        setItineraries((prev) =>
            prev.map((it, idx) =>
                idx === currentPage
                    ? { ...it, activities: [...it.activities, activity] }
                    : it
            )
        );
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
                          activities: it.activities.filter(
                              (_, i) => i !== activityIdx
                          ),
                      }
                    : it
            )
        );
    };

    // Remove entire day
    const handleRemoveDay = (dayIdx: number) => {
        if (itineraries.length <= 1) return;
        setItineraries((prev) => prev.filter((_, idx) => idx !== dayIdx));
        if (currentPage >= itineraries.length - 1) {
            setCurrentPage(itineraries.length - 2);
        }
    };

    // Pagination
    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < itineraries.length - 1)
            setCurrentPage(currentPage + 1);
    };

    // Add new day
    const handleAddDay = () => {
        const nextDay = itineraries.length + 1;
        const nextDate = new Date(itineraries[itineraries.length - 1].date
            .split("/")
            .reverse()
            .join("-"));
        nextDate.setDate(nextDate.getDate() + 1);
        const formattedDate = nextDate
            .toLocaleDateString("pt-BR")
            .split("/")
            .join("/");
        setItineraries([
            ...itineraries,
            { day: nextDay, date: formattedDate, activities: [] },
        ]);
        setCurrentPage(itineraries.length);
    };

    // Format date for input
    const getInputDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    // Format date for display
    const getDisplayDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            <SidebarMenu />
            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />
                <div className="bg-[#0F2976] w-[80rem] rounded-t-2xl px-10 py-6 mt-8">
                    <h2 className="text-3xl font-bold text-white">
                        Criar Viagem - Itinerário
                    </h2>
                </div>
                <div className="w-[80rem] bg-white rounded-b-2xl shadow-lg px-10 py-8 flex gap-8">
                    {/* Formulário */}
                    <div className="flex flex-col w-1/2 gap-4">
                        <label className="font-bold text-[#0F2976] text-lg">
                            Data e Hora
                        </label>
                        <div className="flex gap-2 items-center">
                            <div className="flex items-center border border-[#86EE60] rounded-lg px-2 py-1 bg-white">
                                <img
                                    src="/images-trip_budget/calendario.svg"
                                    alt="Calendário"
                                    className="w-5 h-5 mr-2"
                                />
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
                        <label className="font-bold text-[#0F2976] text-lg mt-2">
                            Título
                        </label>
                        <input
                            className="border-2 border-[#86EE60] rounded-lg px-4 py-2 text-[#0F2976] font-bold focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título do evento"
                        />
                        <label className="font-bold text-[#0F2976] text-lg mt-2">
                            Descrição
                        </label>
                        <textarea
                            className="border-2 border-[#86EE60] rounded-lg px-4 py-2 text-[#0F2976] font-normal focus:outline-none resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição do evento"
                        />
                        <label className="font-bold text-[#0F2976] text-lg mt-2">
                            Tipo de Evento
                        </label>
                        <select
                            className="border-2 border-[#86EE60] rounded-lg px-4 py-2 text-[#0F2976] font-bold focus:outline-none"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {eventTypes.map((ev) => (
                                <option key={ev} value={ev}>
                                    {ev}
                                </option>
                            ))}
                        </select>
                        <button
                            className="flex items-center justify-center gap-2 mt-4 bg-[#86EE60] text-[#0F2976] font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4be05a] transition"
                            onClick={handleAddItinerary}
                            type="button"
                        >
                            <span className="text-2xl">+</span> Adicionar Itinerário
                        </button>
                    </div>
                    {/* Atividades */}
                    <div className="flex flex-col w-1/2">
                        <div className="font-bold text-[#0F2976] text-lg mb-2">
                            Atividades
                        </div>
                        <div className="bg-[#E9FFE5] rounded-xl p-2 mb-2">
                            <div className="flex items-center justify-between bg-[#86EE60] rounded-t-xl px-4 py-2">
                                <span className="font-bold text-[#0F2976] text-base">
                                    Dia {itineraries[currentPage].day} - {itineraries[currentPage].date}
                                </span>
                                <button
                                    className="text-[#0F2976] hover:text-red-600"
                                    title="Remover dia"
                                    onClick={() => handleRemoveDay(currentPage)}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 px-2 py-2">
                                {itineraries[currentPage].activities.length === 0 && (
                                    <span className="text-[#0F2976] text-center py-4">
                                        Nenhuma atividade cadastrada para este dia.
                                    </span>
                                )}
                                {itineraries[currentPage].activities.map((act, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow"
                                    >
                                        <div>
                                            <div className="font-bold text-[#0F2976] text-sm">
                                                {act.time} - {act.title}
                                            </div>
                                            <div className="text-[#0F2976] text-xs">
                                                {act.description}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[#0F2976] text-xs">
                                                {act.type}
                                            </span>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                title="Remover atividade"
                                                onClick={() => handleRemoveActivity(idx)}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Paginação */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <button
                                className="p-2 rounded-full bg-[#E9FFE5] text-[#0F2976] hover:bg-[#86EE60] transition"
                                onClick={handlePrev}
                                disabled={currentPage === 0}
                            >
                                <FaChevronLeft />
                            </button>
                            {itineraries.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-8 h-8 rounded-full font-bold ${
                                        idx === currentPage
                                            ? "bg-[#0F2976] text-white"
                                            : "bg-[#E9FFE5] text-[#0F2976] hover:bg-[#86EE60]"
                                    }`}
                                    onClick={() => setCurrentPage(idx)}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                className="p-2 rounded-full bg-[#E9FFE5] text-[#0F2976] hover:bg-[#86EE60] transition"
                                onClick={handleNext}
                                disabled={currentPage === itineraries.length - 1}
                            >
                                <FaChevronRight />
                            </button>
                            <button
                                className="ml-4 px-3 py-1 rounded bg-[#86EE60] text-[#0F2976] font-bold text-sm hover:bg-[#4be05a] transition"
                                onClick={handleAddDay}
                                type="button"
                            >
                                + Dia
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 w-full">
                    <button
                        className="cursor-pointer transition hover:scale-105 bg-[#86EE60] text-[#0F2976] font-bold px-[10rem] py-[1rem] rounded-xl text-2xl shadow hover:bg-[#4be05a] min-w-[40rem]"
                        type="button"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}