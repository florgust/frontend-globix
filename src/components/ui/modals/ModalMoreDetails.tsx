import React from "react";
import { IconButton } from "@/components/ui/button";

interface ModalMoreDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (target: 'transport' | 'itinerary' | 'budget' | 'messages' | 'alerts') => void;
    trip: {
        nome: string;
        descricao: string;
        destino: string;
        dataInicio: string;
        dataFim: string;
        tipo: string;
        quantidadeParticipante: number;
        organizador: string;
        dataCriacao: string;
        imagemOrganizador?: string;
    };
}

const ModalMoreDetails: React.FC<ModalMoreDetailsProps> = ({ isOpen, onClose, onNavigate, trip }) => {
    if (!isOpen) return null;

    // Função para formatar datas
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div className="bg-[#EAF8E6] rounded-lg shadow-lg w-[95%] max-w-5xl p-8 relative">
                <div className="flex items-center justify-between w-full mb-6">
                    {/* Botão com a seta para a esquerda */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                    >
                        <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
                    </button>

                    {/* Título "Mais Detalhes" */}
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-14 py-2 relative z-10">
                            Mais Detalhes
                        </h2>
                        <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0"></div>
                    </div>

                    {/* Espaço vazio para alinhar o título ao centro */}
                    <div className="w-8"></div>
                </div>

                <div className="flex flex-col items-center">
                    {/* Conteúdo dentro do quadrado */}
                    <div
                        style={{ backgroundColor: "rgba(0, 255, 77, 0.17)" }}
                        className="w-[90%] max-w-3xl p-2 rounded-lg shadow-md mt-3"
                    >
                        {/* Header */}
                        <h1 className="text-4xl font-bold text-center text-[#0F2976] mb-4">
                            {trip.nome}
                        </h1>
                        <p className="text-center text-lg text-[#3B4449] mb-8">
                            {trip.descricao || "Descrição não informada"}
                        </p>

                        {/* Informações */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <p className="flex items-center gap-2 text-[#0F2976]">
                                    <img src="/images-modals/Icons/LocationIcon.png" alt="Ícone de localização" className="w-8 h-8" />
                                    Destino: <span className="font-bold">{trip.destino || "Destino não informado"}</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="flex items-center gap-2 text-[#0F2976]">
                                    <img src="/images-modals/Icons/CalendarIcon.png" alt="Ícone de calendário" className="w-8 h-8" />
                                    Data: <span className="font-bold">{formatDate(trip.dataInicio)} a {formatDate(trip.dataFim)}</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="flex items-center gap-2 text-[#0F2976]">
                                    <img src="/images-modals/Icons/PlanetIcon.png" alt="Ícone de tipo público" className="w-8 h-8" />
                                    Tipo: <span className="font-bold">{trip.tipo === "publica" ? "Pública" : "Privada"}</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="flex items-center gap-2 text-[#0F2976]">
                                    <img src="/images-modals/Icons/UsersIcon.png" alt="Ícone de vagas" className="w-8 h-8" />
                                    Vagas: <span className="font-bold">{trip.quantidadeParticipante} disponíveis</span>
                                </p>
                            </div>
                        </div>

                        {/* Organizador */}
                        <div className="flex items-center mt-6">
                            <img
                                src={trip.imagemOrganizador || "/images-travel/images-user/user_mauro.png"}
                                alt="Organizador"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-xs text-[#3B4449]">Organizador: <span className="font-bold">{trip.organizador}</span></p>
                                <p className="text-xs text-[#3B4449]">Viagem criada: <span className="font-bold">{formatDate(trip.dataCriacao)}</span></p>
                                <a href="#" className="text-xs text-[#1C4CDC] underline">
                                    Ver Perfil
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ícones de ações */}
                <div className="flex justify-center gap-5 mt-7">
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('transport')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Transporte</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenItinerary.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('itinerary')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Itinerário</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenBudget.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('budget')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Orçamento</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconMessage.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('messages')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mensagens</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconAlert.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('alerts')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Avisos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMoreDetails;