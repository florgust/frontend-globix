import React from "react";
import { IconButton } from "@/components/ui/button";

interface ModalTransportProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (target: 'details' | 'itinerary' | 'budget') => void;
}

const ModalTransport: React.FC<ModalTransportProps> = ({ isOpen, onClose, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-5xl p-8 relative">
                <div className="flex items-center justify-between w-full mb-6">
                    {/* Botão com a seta para a esquerda */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                    >
                        <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
                    </button>

                    {/* Título "Transporte" */}
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-16 py-2 relative z-10">
                            Transporte
                        </h2>
                        <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0"></div>
                    </div>

                    {/* Espaço vazio para alinhar o título ao centro */}
                    <div className="w-8"></div>
                </div>

                {/* Informações do Transporte */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center">
                        <h3 className="text-3xl font-medium text-[#0F2976] mt-3">
                            Tipo de Transporte: <span className="font-bold text-black">Ônibus</span>
                        </h3>
                        <div
                            className="w-15 h-15 bg-[#4182F9] rounded-full flex items-center justify-center ml-4"
                        >
                            <img
                                src="/images-modals/Icons/WhiteBusIcon.png"
                                alt="Ícone de ônibus"
                                className="w-10 h-10"
                            />
                        </div>
                    </div>
                    <p className="text-lg text-[#3B4449] mt-4">
                        Ônibus azul, dois andares, placa: HTSR-3134. Possui Ar-condicionado, Wi-Fi e poltronas reclináveis.
                    </p>
                </div>

                {/* Detalhes de Ida e Volta */}
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Ida */}
                        <div className="bg-[rgba(65,130,249,0.24)] rounded-lg p-4 shadow-md w-full">
                            <h4 className="text-2xl font-bold text-black mb-2 ml-16">Ida</h4>
                            <div className="flex items-center gap-4">
                                <img src="/images-modals/Icons/LocationIcon2.png" alt="Ícone de localização" className="w-12 h-12" />
                                <div>
                                    <p className="text-xl font-bold text-[#0F2976]">Saída da Cidade Origem</p>
                                    <p className="text-sm text-[#3B4449]">
                                        <span className="font-bold">Data de Saída:</span> 20/03/25 às 19:30h<br />
                                        <span className="font-bold">Local:</span> Posto Graal Antares | Uberaba - MG
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <img src="/images-modals/Icons/MapIcon.png" alt="Ícone de mapa" className="w-12 h-12" />
                                <div>
                                    <p className="text-xl text-[#0F2976] font-bold">Chegada na Cidade Destino</p>
                                    <p className="text-sm text-[#3B4449]">
                                        <span className="font-bold">Data de Chegada:</span> 25/03/25 às 22:30h<br />
                                        <span className="font-bold">Local:</span> Rua Rifaina - Rifaina SP
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Volta */}
                        <div className="bg-[rgba(0,255,77,0.11)] rounded-lg p-4 shadow-md w-full">
                            <h4 className="text-2xl font-bold text-black mb-2 ml-16">Volta</h4>

                            <div className="flex items-center gap-4">
                                <img
                                    src="/images-modals/Icons/LocationIcon2.png"
                                    alt="Ícone de localização"
                                    className="w-12 h-12"
                                    style={{ filter: "invert(58%) sepia(91%) saturate(300%) hue-rotate(90deg) brightness(100%) contrast(95%)" }}
                                />
                                <div>
                                    <p className="text-xl font-bold text-[#0B772B]">Saída da Cidade Destino</p>
                                    <p className="text-sm text-[#3B4449]">
                                        <span className="font-bold">Data de Retorno:</span> 30/03/25 às 16:00h<br />
                                        <span className="font-bold">Local:</span> Rua Rifaina | Rifaina - SP
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <img
                                    src="/images-modals/Icons/MapIcon.png"
                                    alt="Ícone de localização"
                                    className="w-12 h-12"
                                    style={{ filter: "invert(58%) sepia(91%) saturate(300%) hue-rotate(90deg) brightness(100%) contrast(95%)" }}
                                />
                                <div>
                                    <p className="text-xl text-[#0B772B] font-bold">Chegada na Cidade Origem</p>
                                    <p className="text-sm text-[#3B4449]">
                                        <span className="font-bold">Data de Chegada:</span> 30/03/25 às 18:00h<br />
                                        <span className="font-bold">Local:</span> Posto Graal Antares | Uberaba - MG
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ícones de ações */}
                <div className="flex justify-center gap-5 mt-7">
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenList.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('details')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mais Detalhes</p>
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
                            onClick={() => alert("Mensagens clicado!")}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mensagens</p>
                    </div>
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
};

export default ModalTransport;