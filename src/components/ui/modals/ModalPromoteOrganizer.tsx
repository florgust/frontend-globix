import React, { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";

interface User {
    id_usuario: number;
    nome: string;
    email: string;
    tipo: string;
    foto: string;
}



function ModalPromoteOrganizer({ isOpen, onClose, usuarios, onPromote, onRemove }: { isOpen: boolean; onClose: () => void; usuarios: User[]; onPromote: (id_usuario: number) => void; onRemove: (id_usuario: number) => void; }) {
    const [search, setSearch] = useState("");

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(search.toLowerCase())
    );

    const tipoUsuarioLabel: Record<string, string> = {
        Organizador: "Organizador",
        OrganizadorPromovido: "Organizador Promovido",
        Participante: "Participante",
    };

    if (!isOpen) return null;

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >

            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-[80vh] p-10 relative justify-center items-center">
                {/* Close Button */}

                <div className="flex flex-row items-center w-full h-20 mb-6">
                    <button
                        onClick={onClose}
                        className="relative absolute text-gray-500 hover:text-gray-700"
                    >
                        <ChevronLeft className="w-15 h-15" />
                    </button>

                    <div className="relative w-full flex flex-col items-center justify-center h-20">
                        <div className="absolute mt-4 ml-5  w-2/5 h-15 p-4 bg-[#1C4CDC]"></div>
                        <div className="absolute h-15 w-2/5 h-15 p-4 bg-[#0F2976]">
                            <h1 className="text-3xl font-bold text-center text-[#00FF4D]">
                                Adicionar Organizador
                            </h1>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-[#D1E1FE] p-6 rounded-lg shadow-md w-4/5 h-4/6 mx-auto mt-20"
                >
                    <div>
                        <div className="relative w-full max-w-md pl-4">
                            <input
                                type="text"
                                placeholder="Buscar usuário"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-80 p-2 pl-12 rounded-md bg-[#0F2976] focus:outline-none text-white placeholder-gray-200"
                            />
                            <Search
                                size={20}
                                color="#fff"
                                className="absolute left-8 top-1/2 transform -translate-y-1/2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between p-4 ml-3 w-3/5">
                        <h1 className="text-lg font-bold text-center text-[#0F2976] mt-4">
                            Nome
                        </h1>
                        <h1 className="text-lg font-bold text-center text-[#0F2976] mt-4 ml-2">
                            Tipo de Usuário
                        </h1>

                    </div>

                    {/* User List */}
                    <div className="flex flex-col p-4 overflow-y-auto max-h-72">
                        {usuariosFiltrados.map((usuario, idx) => {
                            let borderRadius = "";
                            if (usuariosFiltrados.length === 1) {
                                borderRadius = "rounded-lg";
                            } else {
                                const isFirst = idx === 0;
                                const isLast = idx === usuariosFiltrados.length - 1;
                                if (isFirst) borderRadius = "rounded-t-lg";
                                if (isLast) borderRadius += " rounded-b-lg";
                            }

                            return (
                                <div
                                    key={usuario.id_usuario}
                                    className={`flex items-center border border-[#0F2976] bg-white w-full ${borderRadius}`}
                                >
                                    <div className="flex items-center h-15 ml-2 flex-1 min-w-0">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=0D8ABC&color=fff`}
                                            alt={usuario.nome}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-bold text-lg truncate">{usuario.nome}</p>
                                            {/* <p className="text-sm text-gray-500 truncate">{usuario.email}</p> */}
                                        </div>

                                    </div>

                                    <div className="flex items-center w-2/5 justify-start">
                                        <p className="text-md text-left">{tipoUsuarioLabel[usuario.tipo]}</p>
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

export { ModalPromoteOrganizer };
