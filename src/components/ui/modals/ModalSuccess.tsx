import React from "react";

interface SuccessModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay translúcido */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="relative bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                <span className="text-green-600 text-4xl mb-4">✔️</span>
                <p className="text-2xl text-[#0F2976] font-bold mb-6">{message}</p>
                <button
                    className="bg-[#00FF4D] text-[#0F2976] font-bold px-8 py-2 rounded-lg text-xl"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;