import React from "react";
import { CheckCircle } from "lucide-react";

interface ModalEditProfileSucessProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const ModalEditProfileSucess: React.FC<ModalEditProfileSucessProps> = ({
    isOpen,
    onClose,
    message = "Alteração realizada com sucesso!",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-xs relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#0F2976] hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Fechar"
                >
                    <span className="text-2xl font-bold">&times;</span>
                </button>
                <CheckCircle size={64} className="text-[#00C851] mb-4" />
                <h2 className="text-2xl font-bold text-[#0F2976] text-center mb-2">Sucesso!</h2>
                <p className="text-[#0F2976] text-center">{message}</p>
            </div>
        </div>
    );
};

export default ModalEditProfileSucess;