import React from "react";
import { X } from "lucide-react";

interface User {
    id_usuario: number;
    nome: string;
    email: string;
}

interface PromoteOrganizerModalProps {
    isOpen: boolean;
    onClose: () => void;
    usuarios: User[];
    onPromote: (id_usuario: number) => void;
    onRemove: (id_usuario: number) => void;
}

function PromoteOrganizerModal({ isOpen, onClose, usuarios, onPromote, onRemove }: PromoteOrganizerModalProps) {
    if (!isOpen) return null;
    return (
        <div 
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-[80vh] p-8 relative">

                <div className="relative w-full h-20">
                    <div className="absolute mt-3  w-2/5 h-15 p-4 bg-[#1C4CDC]"></div>
                    <div className="absolute h-15 ml-12 w-2/5 h-15 p-4 bg-[#0F2976]">
                        <h1 className="text-4xl font-bold text-center text-[#00FF4D]">
                            Adicionar Organizador
                        </h1>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* User List */}
                <div className="flex flex-col gap-4 mt-6">
                    {usuarios.map((usuario) => (
                        <div
                            key={usuario.id_usuario}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-bold">{usuario.nome}</p>
                                <p className="text-sm text-gray-500">{usuario.email}</p>
                            </div>
                            <div className="flex gap-2">
                                {/* Promote Button */}
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    onClick={() => onPromote(usuario.id_usuario)}
                                >
                                    Promover
                                </button>

                                {/* Remove Button */}
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => onRemove(usuario.id_usuario)}
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function Modal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
    if (isOpen) {
        return (
            <div
                style={{ backgroundColor: "rgba(41, 45, 50, 0.5)" }}
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            >
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-4xl shadow-2xl p-6 h-[25rem] w-[60rem] flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        );
    }
    return null;
}

export { Modal, PromoteOrganizerModal };