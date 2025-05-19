import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface ItineraryItem {
    id: number;
    idViagem: number;
    tipoEvento: string;
    titulo: string;
    dataHora: string;
    descricao: string;
}

function ModalItinerary({ isOpen, onClose, itinerario }: { isOpen: boolean; onClose: () => void; itinerario: ItineraryItem[] }) {

    const diasItinerario = agruparItinerarioPorDia(itinerario);
    const [diaSelecionado, setDiaSelecionado] = useState(0);
    if (!isOpen) return null;

    function agruparItinerarioPorDia(itinerario: ItineraryItem[]) {
        const sorted = [...itinerario].sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
        const diasMap = new Map<string, ItineraryItem[]>();
        sorted.forEach(item => {
            const data = item.dataHora.split("T")[0];
            if (!diasMap.has(data)) diasMap.set(data, []);
            diasMap.get(data)!.push(item);
        });
        return Array.from(diasMap.entries()).map(([data, eventos], idx) => ({
            dia: idx + 1,
            data,
            eventos
        }));
    }

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-[80vh] p-10 flex flex-col items-center justify-center">
                {/* Header e título */}
                <div className="flex flex-row items-center w-full h-20 mb-6">
                    <button
                        onClick={onClose}
                        className="relative absolute text-gray-500 hover:text-gray-700"
                    >
                        <ChevronLeft className="w-15 h-15" />
                    </button>

                    <div className="relative w-full flex flex-col items-center justify-center h-20">
                        <div className="absolute mt-4 ml-5 w-2/5 h-15 p-4 bg-[#1C4CDC]"></div>
                        <div className="absolute h-15 w-2/5 h-15 p-4 bg-[#0F2976]">
                            <h1 className="text-3xl font-bold text-center text-[#00FF4D]">
                                Itinerário
                            </h1>
                        </div>
                    </div>
                </div>



                {/* Eventos do dia selecionado */}
                <div className="bg-[#E3FFEB] border border-[#0F2976] rounded-4xl shadow-2xl px-10 py-6 w-[53rem] max-h-[80vh] flex flex-col items-center mx-auto">

                    {/* Botões dos dias */}
                    <div
                        className="w-full overflow-x-auto"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                    >
                        <div
                            className="flex gap-2 mb-3 ml-3 flex-nowrap min-w-max"
                            style={{
                                overflow: "hidden"
                            }}
                        >                            {diasItinerario.map((dia, idx) => (
                            <button
                                key={dia.data}
                                className={`px-4 py-2 rounded-lg font-bold transition-all text-2xl whitespace-nowrap
                                    ${diaSelecionado === idx
                                        ? "bg-[#0F2976] text-white"
                                        : "bg-[#659EF6] text-white hover:bg-[#0F2976] hover:text-white"}
                                `}
                                onClick={() => setDiaSelecionado(idx)}
                            >
                                Dia {dia.dia}
                            </button>
                        ))}
                        </div>
                        <style>
                            {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                        `}
                        </style>
                    </div>

                    <div className="w-full border-t border-[#0F2976] mb-2"></div>

                    {/* Mini título do dia selecionado */}
                    <div className="w-full text-left mb-4 ml-2">
                        <span className="text-2xl text-[#292D32]">
                            Dia {diasItinerario[diaSelecionado]?.dia} - {diasItinerario[diaSelecionado] && new Date(diasItinerario[diaSelecionado].data).toLocaleDateString("pt-BR")}
                        </span>
                    </div>

                    <div className="overflow-y-auto w-3/4 max-h-90 self-start">
                        {diasItinerario[diaSelecionado]?.eventos.map(item => (
                            <div key={item.id} className="mb-4 h-24 p-4 border border-[#1C4CDC] rounded-lg bg-[#F5F8FF]">
                                <div className="flex items-start">
                                    <span className="text-xl text-gray-800 min-w-[70px] text-left">
                                        {new Date(item.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-lg">{item.titulo}</span>
                                        <span className="text-gray-800 truncate">{item.descricao}</span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-xs text-gray-700 opacity-70">{item.tipoEvento}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginação dos dias */}
                    <div className="w-full flex items-center justify-between mt-4">
                        <button
                            className={`flex items-center font-bold text-xl transition-all
                             ${diaSelecionado === 0
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#0F2976] hover:text-[#1C4CDC]"}
                            `}
                            onClick={() => setDiaSelecionado(diaSelecionado - 1)}
                            disabled={diaSelecionado === 0}
                        >
                            <ChevronLeft className="w-15 h-15" />
                            Dia anterior
                        </button>

                        <button
                            className={`flex items-center font-bold text-xl transition-all
                            ${diaSelecionado === diasItinerario.length - 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#0F2976] hover:text-[#1C4CDC]"}
                            `}
                            onClick={() => setDiaSelecionado(diaSelecionado + 1)}
                            disabled={diaSelecionado === diasItinerario.length - 1}
                        >
                            Dia seguinte
                            <ChevronRight className="w-15 h-15" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ModalItinerary };
