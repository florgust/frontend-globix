import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

interface User {
    id_usuario: number;
    nome: string;
    email: string;
    tipo: string;
    foto: string;
}

interface ItineraryItem {
    id: number;
    idViagem: number;
    tipoEvento: string;
    titulo: string;
    dataHora: string;
    descricao: string;
}

function PromoteOrganizerModal({ isOpen, onClose, usuarios, onPromote, onRemove }: { isOpen: boolean; onClose: () => void; usuarios: User[]; onPromote: (id_usuario: number) => void; onRemove: (id_usuario: number) => void; }) {
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

function ModalItinerary({ isOpen, onClose, itinerario }: { isOpen: boolean; onClose: () => void; itinerario: ItineraryItem[] }) {
    if (!isOpen) return null;

     function agruparItinerarioPorDia(itinerario: ItineraryItem[]) {
        const sorted = [...itinerario].sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
        const diasMap = new Map<string, ItineraryItem[]>();
        sorted.forEach(item => {
            const data = item.dataHora.split("T")[0];
            if (!diasMap.has(data)) diasMap.set(data, []);
            diasMap.get(data)!.push(item);
        });
        return Array.from(diasMap.entries()).map(([data, eventos], idx) => ({
            dia: idx + 1,
            data,
            eventos
        }));
    }

    const diasItinerario = agruparItinerarioPorDia(itinerario);
    const [diaSelecionado, setDiaSelecionado] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [atividadesOcultas, setAtividadesOcultas] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        // calcula quantas atividades estão ocultas
        const visibleHeight = el.clientHeight;
        let visibleCount = 0;
        let totalHeight = 0;
        for (const child of Array.from(el.children)) {
            // @ts-ignore
            totalHeight += child.offsetHeight;
            if (totalHeight <= visibleHeight) visibleCount++;
        }
        const total = diasItinerario[diaSelecionado]?.eventos.length || 0;
        setAtividadesOcultas(total - visibleCount);
    }, [diaSelecionado, diasItinerario]);

    return (
        <div
            style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-6xl h-[80vh] p-10 flex flex-col items-center justify-center">
                {/* Header e título */}
                <div className="flex flex-row items-center w-full h-20 mb-6">
                    <button
                        onClick={onClose}
                        className="relative absolute text-gray-500 hover:text-gray-700"
                    >
                        <ChevronLeft className="w-15 h-15" />
                    </button>

                    <div className="relative w-full flex flex-col items-center justify-center h-20">
                        <div className="absolute mt-4 ml-5 w-2/5 h-15 p-4 bg-[#1C4CDC]"></div>
                        <div className="absolute h-15 w-2/5 h-15 p-4 bg-[#0F2976]">
                            <h1 className="text-3xl font-bold text-center text-[#00FF4D]">
                                Itinerário
                            </h1>
                        </div>
                    </div>
                </div>



                {/* Eventos do dia selecionado */}
                <div className="bg-[#E3FFEB] border border-[#0F2976] rounded-4xl shadow-2xl px-10 py-6 w-[53rem] max-h-[80vh] flex flex-col items-center mx-auto">

                    {/* Botões dos dias */}
                    <div
                        className="w-full overflow-x-auto"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                    >
                        <div
                            className="flex gap-2 mb-3 ml-3 flex-nowrap min-w-max"
                            style={{
                                overflow: "hidden"
                            }}
                        >                            {diasItinerario.map((dia, idx) => (
                            <button
                                key={dia.data}
                                className={`px-4 py-2 rounded-lg font-bold transition-all text-2xl whitespace-nowrap
                                    ${diaSelecionado === idx
                                        ? "bg-[#0F2976] text-white"
                                        : "bg-[#659EF6] text-white hover:bg-[#0F2976] hover:text-white"}
                                `}
                                onClick={() => setDiaSelecionado(idx)}
                            >
                                Dia {dia.dia}
                            </button>
                        ))}
                        </div>
                        <style>
                            {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                        `}
                        </style>
                    </div>

                    <div className="w-full border-t border-[#0F2976] mb-2"></div>

                    {/* Mini título do dia selecionado */}
                    <div className="w-full text-left mb-4 ml-2">
                        <span className="text-2xl text-[#292D32]">
                            Dia {diasItinerario[diaSelecionado]?.dia} - {diasItinerario[diaSelecionado] && new Date(diasItinerario[diaSelecionado].data).toLocaleDateString("pt-BR")}
                        </span>
                    </div>

                    <div className="overflow-y-auto w-3/4 max-h-90 self-start">
                        {diasItinerario[diaSelecionado]?.eventos.map(item => (
                            <div key={item.id} className="mb-4 h-24 p-4 border border-[#1C4CDC] rounded-lg bg-[#F5F8FF]">
                                <div className="flex items-start">
                                    <span className="text-xl text-gray-800 min-w-[70px] text-left">
                                        {new Date(item.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-lg">{item.titulo}</span>
                                        <span className="text-gray-800 truncate">{item.descricao}</span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-xs text-gray-700 opacity-70">{item.tipoEvento}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginação dos dias */}
                    <div className="w-full flex items-center justify-between mt-4">
                        <button
                            className={`flex items-center font-bold text-xl transition-all
                             ${diaSelecionado === 0
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#0F2976] hover:text-[#1C4CDC]"}
                            `}
                            onClick={() => setDiaSelecionado(diaSelecionado - 1)}
                            disabled={diaSelecionado === 0}
                        >
                            <ChevronLeft className="w-15 h-15" />
                            Dia anterior
                        </button>

                        <button
                            className={`flex items-center font-bold text-xl transition-all
                            ${diaSelecionado === diasItinerario.length - 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#0F2976] hover:text-[#1C4CDC]"}
                            `}
                            onClick={() => setDiaSelecionado(diaSelecionado + 1)}
                            disabled={diaSelecionado === diasItinerario.length - 1}
                        >
                            Dia seguinte
                            <ChevronRight className="w-15 h-15" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Modal, PromoteOrganizerModal, ModalItinerary };