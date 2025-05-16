import React, { useState } from "react";
import { X } from "lucide-react";

interface ModalEditTripProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (option: string) => void;
}

const ModalEditTrip: React.FC<ModalEditTripProps> = ({ isOpen, onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const options = [
        { label: "Viagem", icon: "/images-travel/Icons/IconBlueTrip.png", value: "viagem", link: "/editar_viagem" },
        { label: "Transporte", icon: "/images-travel/Icons/IconBlueTransport.png", value: "transporte", link: "/editar_transporte" },
        { label: "Itinerários", icon: "/images-travel/Icons/IconBlueItinerary.png", value: "itinerarios", link: "/editar_itinerarios" },
        { label: "Localização", icon: "/images-travel/Icons/IconBlueLocation.png", value: "localizacao", link: "/editar_localizacao" },
        { label: "Orçamento", icon: "/images-travel/Icons/IconBlueBudget.png", value: "orcamento", link: "/editar_orcamento" },
        { label: "Usuários", icon: "/images-travel/Icons/IconBlueUsers.png", value: "usuarios", link: "/editar_usuarios" },
    ];

    if (!isOpen) return null;

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-[85%] max-w-3xl p-8 relative">
                {/* Close Button */}
                <button
                    onClick={() => {
                        setSelectedOption(null);
                        onClose();
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-8 h-8" />
                </button>

                <h1 className="text-4xl font-bold text-center text-[#0F2976] mb-4">
                    Editar Viagem
                </h1>
                <p className="text-center text-xl text-gray-600 mb-6">
                    Quais informações você quer editar?
                </p>

                <div className="grid grid-cols-3 gap-6">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`flex flex-col items-center cursor-pointer`}
                        >
                            {/* Botão com o ícone */}
                            <div
                                className={`w-30 h-30 flex items-center justify-center ${selectedOption === option.value ? "bg-[#00FF4D]" : "bg-[#ACEBA2]"
                                    } rounded-lg p-4 transition-all duration-300 hover:bg-[#00FF4D]`}
                                onClick={() => setSelectedOption(option.value)}
                            >
                                <img src={option.icon} alt={option.label} className="w-18 h-18" />
                            </div>

                            {/* Texto fora do botão */}
                            <p className="mt-2 text-[#0F2976] font-bold">{option.label}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        if (selectedOption) {
                            const selectedLink = options.find((opt) => opt.value === selectedOption)?.link;
                            if (selectedLink) {
                                window.location.href = selectedLink; // Redireciona para a página vinculada
                            }
                        }
                    }}
                    disabled={!selectedOption}
                    className={`mt-8 flex items-center justify-center ${selectedOption ? "bg-[#0F2976] hover:bg-[#0D215E]" : "bg-gray-400 cursor-not-allowed"
                        } text-white font-bold text-xl px-6 py-3 rounded-3xl w-1/3 mx-auto transition-all duration-300`}
                >
                    Editar
                </button>
            </div>
        </div>
    );
};

export default ModalEditTrip;