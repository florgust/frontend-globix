import React from "react";
import { ChevronLeft, X } from "lucide-react";

interface User {
    id_usuario: number;
    nome: string;
    email: string;
    tipo: string;
    foto: string;
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

            <div className="flex-col bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-[80vh] p-10 relative justify-center items-center">
                {/* Close Button */}

                <button
                    onClick={onClose}
                    className="relative absolute text-gray-500 hover:text-gray-700"
                >
                    <ChevronLeft className="w-15 h-15" />
                </button>

                <div className="w-full flex flex-col items-center justify-center h-20 relative">
                    <div className="absolute mt-3  w-2/5 h-15 p-4 bg-[#1C4CDC]"></div>
                    <div className="absolute h-15 ml-12 w-2/5 h-15 p-4 bg-[#0F2976]">
                        <h1 className="text-4xl font-bold text-center text-[#00FF4D]">
                            Adicionar Organizador
                        </h1>
                    </div>
                </div>

                <div
                    className="bg-[#D1E1FE] p-6 rounded-lg shadow-md w-4/5 h-3/5 mx-auto "
                >
                    {/* User List */}
                    <div className="flex flex-col mt-6 p-4">
                        {usuarios.map((usuario, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === usuarios.length - 1;
                            let borderRadius = "";
                            if (isFirst) borderRadius = "rounded-t-lg";
                            if (isLast) borderRadius += " rounded-b-lg";

                            // Supondo que usuario.tipo pode ser: "Normal", "OrganizadorPromovido", "Organizador"
                            return (
                                <div
                                    key={usuario.id_usuario}
                                    className={`flex items-center border bg-white w-full ${borderRadius}`}
                                >
                                    <div className="flex items-center h-15 ml-2 flex-1 min-w-0">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=0D8ABC&color=fff`}
                                            alt={usuario.nome}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-bold truncate">{usuario.nome}</p>
                                            <p className="text-sm text-gray-500 truncate">{usuario.email}</p>
                                        </div>
                                        
                                    </div>

                                    <div className="flex items-center w-1/3 justify-start">
                                        <p className="text-md text-left">{usuario.tipo}</p>
                                    </div>

                                    <div className="flex gap-2 pr-2 min-w-[120px] justify-end">
                                        {usuario.tipo === "Participante" && (
                                            <button
                                                className="px-3 py-2 bg-[#0F2976] text-white rounded-full hover:bg-blue-900"
                                                onClick={() => onPromote(usuario.id_usuario)}
                                            >
                                                promover
                                            </button>
                                        )}
                                        {usuario.tipo === "OrganizadorPromovido" && (
                                            <button
                                                className="px-4 py-2 bg-[#76120F] text-white rounded-full hover:bg-red-800"
                                                onClick={() => onRemove(usuario.id_usuario)}
                                            >
                                                remover
                                            </button>
                                        )}
                                        {/* Se for "Organizador", não mostra botão */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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