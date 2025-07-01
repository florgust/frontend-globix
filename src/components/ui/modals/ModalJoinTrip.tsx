import React from "react";
import { X } from "lucide-react";

interface ModalJoinTripProps {
    isOpen: boolean;
    tripCode: string;
    setTripCode: (code: string) => void;
    alertMessage: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ModalJoinTrip: React.FC<ModalJoinTripProps> = ({
    isOpen,
    tripCode,
    setTripCode,
    alertMessage,
    onConfirm,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="relative bg-white rounded-2xl shadow-lg px-12 py-10 flex flex-col items-center min-w-[32rem]">
                {/* Botão de fechar (X) fora do fluxo do título */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10"
                    aria-label="Fechar"
                >
                    <X className="w-8 h-8 text-[#6C727F] cursor-pointer" />
                </button>
                <div className="w-full flex flex-col items-center mt-2 mb-10">
                    <h1 className="text-[#0F2976] text-3xl text-center font-bold">
                        Insira o código da Viagem que você <br /> quer participar
                    </h1>
                </div>
                {alertMessage && (
                    <div className="mb-6 px-6 py-4 rounded-lg text-white text-center text-xl font-medium bg-red-600">
                        {alertMessage}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Insira o código da viagem"
                    value={tripCode}
                    onChange={(e) => setTripCode(e.target.value)}
                    className="w-[30rem] h-[6rem] p-2 rounded-full bg-[#0F2976] focus:outline-none text-white placeholder-gray-200 text-2xl text-center"
                />
                <button
                    onClick={onConfirm}
                    className="mt-5 px-10 py-4 bg-[#00FF4D] text-white rounded-lg shadow-lg hover:bg-green-600 transition cursor-pointer"
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default ModalJoinTrip;