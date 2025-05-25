import React from "react";
import ReactDOM from "react-dom";

interface LoginSuccessModalProps {
    open: boolean;
    onClose: () => void;
}

export const LoginSuccessModal: React.FC<LoginSuccessModalProps> = ({ open, onClose }) => {
    if (!open) return null;

    const modalContent = (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="p-6 rounded bg-white text-center shadow-lg border-green-500 border min-w-[300px]">
                <h2 className="text-2xl font-bold text-green-600 mb-2">Login realizado!</h2>
                <p className="text-gray-800 mb-4">Você será redirecionado em instantes.</p>
                <button
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );

    // Pode usar portal ou não, dependendo da sua preferência
    return typeof window !== "undefined"
        ? ReactDOM.createPortal(modalContent, document.body)
        : null;
};