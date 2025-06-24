"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import RequireAuth from "@/components/auth/RequireAuth";

const initialCategories = [
    { id: 1, name: "Transporte", value: "" },
    { id: 2, name: "Hospedagem", value: "" },
    { id: 3, name: "Alimentação", value: "" },
    { id: 4, name: "Passeio", value: "" },
    { id: 5, name: "Reserva", value: "" },
];

export default function TripBudget() {
    const [categories, setCategories] = useState(initialCategories);
    const [notes, setNotes] = useState("");
    const [participants] = useState(10);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        // Buscar id da viagem do localStorage
        const viagemStr = localStorage.getItem("viagemEmCriacao");
        if (!viagemStr) {
            alert("Viagem não encontrada. Por favor, crie uma viagem primeiro.");
            return;
        }
        const viagem = JSON.parse(viagemStr);
        const viagemId = viagem.id ?? viagem.id_viagem; // ajuste conforme o campo retornado pelo backend

        try {
            for (const cat of categories) {
                if (!cat.name || !cat.value) continue;
                await api.post("/orcamento", {
                    viagemId,
                    categoria: cat.name,
                    custo: parseFloat(cat.value),
                    observacao: notes || "Orçamento destinado à viagem"
                });
            }
            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao salvar orçamentos:", error);
            alert("Erro ao salvar orçamentos.");
        }
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
        router.push("/trip_itinerary"); // Redireciona para a próxima página
    };

    const handleCategoryChange = (id: number, value: string) => {
        setCategories(
            categories.map((cat) => (cat.id === id ? { ...cat, value } : cat))
        );
    };

    const handleCategoryNameChange = (id: number, name: string) => {
        setCategories(
            categories.map((cat) => (cat.id === id ? { ...cat, name } : cat))
        );
    };

    const handleRemoveCategory = (id: number) => {
        setCategories(categories.filter((cat) => cat.id !== id));
    };

    const handleAddCategory = () => {
        setCategories([
            ...categories,
            { id: Date.now(), name: "", value: "" },
        ]);
    };

    const total = categories.reduce(
        (sum, cat) => sum + (parseFloat(cat.value) || 0),
        0
    );
    const perPerson = participants > 0 ? total / participants : 0;

    const viagemStr = typeof window !== "undefined" ? localStorage.getItem("viagemEmCriacao") : null;
    let tripData = {
        name: "",
        startDate: "",
        endDate: "",
        location: "",
        participants: participants,
    };

    if (viagemStr) {
        const viagem = JSON.parse(viagemStr);
        tripData = {
            name: viagem.nome ?? "",
            startDate: viagem.dataInicio ?? "",
            endDate: viagem.dataFim ?? "",
            location: (viagem.nome?.split(" ")[2]) ?? "", // terceira palavra do nome
            participants: viagem.quantidadeParticipante ?? participants,
        };
    }

    return (
        <RequireAuth>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <SidebarMenu />
                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />
                    <div className="bg-[#0F2976] w-[80rem] rounded-t-2xl px-10 py-6 mt-8">
                        <h2 className="text-3xl font-bold text-white">
                            Criar Viagem - Orçamento
                        </h2>
                    </div>

                    <div className="w-[80rem] bg-white rounded-b-2xl shadow-lg px-10 py-4">

                        <div className="mb-6">
                            <div className="font-bold text-[2rem] mb-2 text-[#0F2976]">{tripData.name}</div>
                            <div className="flex items-center gap-4 mb-1 text-[1.3rem]">
                                <Image
                                    src="/images-trip_budget/calendario.svg"
                                    alt="Calendário"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span>
                                    Data: <b className="text-[#0F2976]">{tripData.startDate}</b> até <b className="text-[#0F2976]">{tripData.endDate}</b>
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mb-1 text-[1.3rem]">
                                <Image
                                    src="/images-trip_budget/globo.svg"
                                    alt="Globo"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span>Local: <b className="text-[#0F2976]">{tripData.location}</b></span>
                            </div>
                            <div className="flex items-center gap-4 text-[1.3rem]">
                                <Image
                                    src="/images-trip_budget/pessoas.svg"
                                    alt="Pessoas"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span>
                                    Participantes: <b className="text-[#0F2976]">{tripData.participants}</b>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-1">
                                <div className="flex font-bold mb-2">
                                    <span className="w-1/2 text-[#0F2976] ml-3">Categoria</span>
                                    <span className="w-1/2 text-[#0F2976] ml-2">Custo (R$)</span>
                                </div>
                                <div>
                                    {categories.map((cat, idx) => (
                                        <React.Fragment key={cat.id}>
                                            {/* Linha acima da primeira categoria */}
                                            {idx === 0 && (
                                                <hr
                                                    className="border-t mb-2"
                                                    style={{ borderColor: "#1C4CDC", width: "73%" }}
                                                />
                                            )}
                                            <div className="flex items-center mb-2 gap-6">
                                                <button
                                                    className="text-red-500 mr-2"
                                                    onClick={() => handleRemoveCategory(cat.id)}
                                                    title="Remover categoria"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                                <input
                                                    className="w-1/5 px-2 py-1 mr-2 rounded text-[#000000] ml-[-30]"
                                                    type="text"
                                                    value={cat.name}
                                                    onChange={(e) =>
                                                        handleCategoryNameChange(cat.id, e.target.value)
                                                    }
                                                    placeholder="Categoria"
                                                />
                                                <div className="w-34" />{/* Espaçamento ao meio */}
                                                <input
                                                    className="w-1/5 border rounded px-2 py-1"
                                                    type="number"
                                                    min="0"
                                                    value={cat.value}
                                                    onChange={(e) =>
                                                        handleCategoryChange(cat.id, e.target.value)
                                                    }
                                                    placeholder="R$"
                                                />
                                            </div>
                                            {/* Linha abaixo de todas as categorias */}
                                            <hr
                                                className="border-t mb-2"
                                                style={{ borderColor: "#1C4CDC", width: "73%" }}
                                            />
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="flex items-center text-[#0F2976] font-bold ml-4 cursor-pointer"
                                        onClick={handleAddCategory}
                                    >
                                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#6CFB7B] mr-2">
                                            <Image
                                                src="/images-trip_budget/mais.svg"
                                                alt="Adicionar"
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        </span>
                                        <span>Adicionar Categoria</span>
                                    </button>

                                    <div className="flex flex-col gap-1 items-start w-56">
                                        <div className="flex justify-start font-bold text-[#000000] ml-[-115]">
                                            <span>Total: </span>
                                            <span className="text-[#092064] ml-2">
                                                R$
                                                {total.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex justify-start text-sm text-[#000000] ml-[-165]">
                                            <span>Custo por pessoa: </span>
                                            <span className="text-[#092064] font-bold ml-2">
                                                R$
                                                {perPerson.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 mr-20">
                                <div className="bg-[#4182F933] rounded-2xl p-7 shadow-lg">
                                    <div className="font-bold text-[#0F2976] mb-4 text-[1.1rem]">
                                        Observações Adicionais
                                    </div>
                                    <textarea
                                        className="w-full h-36 border-none rounded-2xl p-4 text-[#FFFFFF] bg-[#102976] resize-none focus:outline-none"
                                        placeholder="Insira mais detalhes sobre o orçamento da viagem, por exemplo, prazos para pagamento, divisão de custos ou observações importantes."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="cursor-pointer bg-[#00FF4D] transition hover:scale-110 text-[#0F2976] font-bold px-[10rem] py-[1rem] rounded-xl text-2xl shadow hover:bg-[#4be05a] min-w-[40rem]"
                                onClick={handleSubmit}
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
                <SuccessModal
                    isOpen={showSuccess}
                    message="Orçamentos salvos com sucesso!"
                    onClose={handleCloseModal}
                />
            </div>
        </RequireAuth>
    );
}