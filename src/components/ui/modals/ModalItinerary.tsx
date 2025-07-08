import React, { useState } from "react";
import { IconButton } from "@/components/common/Button";

interface ItineraryItem {
    id: number;
    idViagem: number;
    tipoEvento: string;
    titulo: string;
    dataHora: string;
    descricao: string;
}

interface ModalItineraryProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (target: 'transport' | 'details' | 'budget') => void;
    itinerario: ItineraryItem[];
}

function ModalItinerary({ isOpen, onClose, onNavigate, itinerario }: ModalItineraryProps) {
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

    const diasItinerario = agruparItinerarioPorDia(itinerario);

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-auto max-h-[90vh] p-6 md:p-10 flex flex-col items-center overflow-y-auto">
                <div className="flex items-center justify-between w-full mb-6">
                    {/* Botão com a seta para a esquerda */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                    >
                        <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
                    </button>

                    {/* Título "Itinerário" */}
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-14 py-2 relative z-10">
                            Itinerário
                        </h2>
                        <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0"></div>
                    </div>

                    {/* Espaço vazio para alinhar o título ao centro */}
                    <div className="w-8"></div>
                </div>

                {/* Eventos do dia selecionado */}
                <div className="bg-[#E3FFEB] border border-[#0F2976] rounded-lg shadow-md px-6 py-4 w-full max-w-4xl flex flex-col items-center">
                    {/* Botões dos dias */}
                    <div className="w-full overflow-x-auto mb-4">
                        <div className="flex gap-2">
                            {diasItinerario.map((dia, idx) => (
                                <button
                                    key={dia.data}
                                    className={`px-4 py-2 rounded-lg font-bold text-lg transition-all whitespace-nowrap
                                        ${diaSelecionado === idx
                                            ? "bg-[#0F2976] text-white"
                                            : "bg-[#659EF6] text-white hover:bg-[#0F2976]"}
                                    `}
                                    onClick={() => setDiaSelecionado(idx)}
                                >
                                    Dia {dia.dia}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border-t border-[#0F2976] mb-4"></div>

                    {/* Mini título do dia selecionado */}
                    <div className="w-full text-left mb-4">
                        <span className="text-xl text-[#292D32]">
                            Dia {diasItinerario[diaSelecionado]?.dia} - {diasItinerario[diaSelecionado] && new Date(diasItinerario[diaSelecionado].data).toLocaleDateString("pt-BR")}
                        </span>
                    </div>

                    {/* Lista de eventos */}
                    <div className="w-full overflow-y-auto max-h-60">
                        {diasItinerario[diaSelecionado]?.eventos.map(item => (
                            <div key={item.id} className="mb-4 p-4 border border-[#1C4CDC] rounded-lg bg-[#F5F8FF]">
                                <div className="flex items-start">
                                    <span className="text-lg text-gray-800 min-w-[70px]">
                                        {new Date(item.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <div className="ml-4">
                                        <span className="font-semibold text-gray-800 text-lg">{item.titulo}</span>
                                        <p className="text-gray-600">{item.descricao}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-xs text-gray-500">{item.tipoEvento}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ícones de ações */}
                <div className="flex justify-center gap-5 mt-7">
                    {/* Ícone de Mais Detalhes */}
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenList.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('details')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mais Detalhes</p>
                    </div>

                    {/* Ícone de Transporte */}
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('transport')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Transporte</p>
                    </div>

                    {/* Ícone de Orçamento */}
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenBudget.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('budget')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Orçamento</p>
                    </div>                   
                    {/* Ícone de Aviso */}
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconAlert.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => alert("Avisos clicado!")}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Avisos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ModalItinerary };