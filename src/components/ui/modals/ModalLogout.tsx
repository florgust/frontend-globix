import React from "react";

interface ModalLogoutProps {
    open: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function ModalLogout({ open, onClose, onLogout }: Readonly<ModalLogoutProps>) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay translúcido */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-sm border-2 border-[#0F2976]">
                <h2 className="text-xl font-bold text-[#0F2976] mb-4">Deseja sair?</h2>
                <p className="mb-6 text-gray-700">Tem certeza que deseja encerrar sua sessão?</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-[#0F2976] hover:bg-gray-300 font-semibold"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 rounded bg-[#0F2976] text-white hover:bg-[#1439b6] font-semibold"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}