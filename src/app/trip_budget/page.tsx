"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { FiTrash2 } from "react-icons/fi";

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

    const tripData = {
        name: "Viagem Rifania",
        startDate: "01/07/2025",
        endDate: "05/07/2025",
        location: "Rifania",
        participants: participants,
    };

    return (
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
                            <img src="/images-trip_budget/calendario.svg" alt="Calendário" className="w-6 h-6" />
                            <span>
                                Data: <b className="text-[#0F2976]">{tripData.startDate}</b> até <b className="text-[#0F2976]">{tripData.endDate}</b>
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mb-1 text-[1.3rem]">
                            <img src="/images-trip_budget/globo.svg" alt="Globo" className="w-6 h-6" />
                            <span>Local: <b className="text-[#0F2976]">{tripData.location}</b></span>
                        </div>
                        <div className="flex items-center gap-4 text-[1.3rem]">
                            <img src="/images-trip_budget/pessoas.svg" alt="Pessoas" className="w-6 h-6" />
                            <span>
                                Participantes: <b className="text-[#0F2976]">{tripData.participants}</b>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <div className="flex font-bold mb-2">
                                <span className="w-1/2 text-[#0F2976] ml-5">Categoria</span>
                                <span className="w-1/2 text-[#0F2976] ml-2">Custo (R$)</span>
                            </div>
                            <div>
                                {categories.map((cat, idx) => (
                                    <React.Fragment key={cat.id}>
                                        {/* Linha acima da primeira categoria */}
                                        {idx === 0 && (
                                            <hr
                                                className="border-t mb-2"
                                                style={{ borderColor: "#1C4CDC", width: "86%" }}
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
                                                className="w-1/3 px-2 py-1 mr-2 border rounded text-[#000000]"
                                                type="text"
                                                value={cat.name}
                                                onChange={(e) =>
                                                    handleCategoryNameChange(cat.id, e.target.value)
                                                }
                                                placeholder="Categoria"
                                            />
                                            <div className="w-8" /> {/* Espaçamento ao meio */}
                                            <input
                                                className="w-1/3 border rounded px-2 py-1"
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
                                            style={{ borderColor: "#1C4CDC", width: "86%" }}
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
                                        <img src="/images-trip_budget/mais.svg" alt="Adicionar" className="w-4 h-4" />
                                    </span>
                                    Adicionar Categoria
                                </button>

                                <div className="flex flex-col gap-1 items-start w-56">
                                    <div className="flex justify-start font-bold text-[#000000] w-full">
                                        <span>Total: </span>
                                        <span className="text-[#092064] ml-2">
                                            R$
                                            {total.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-start text-sm text-[#000000] w-full">
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
                        <div className="w-1/3">
                            <div className="bg-[#4182F933] rounded-xl p-5">
                                <div className="font-bold text-[#0F2976] mb-4 text-[1.1rem]">
                                    Observações Adicionais
                                </div>
                                <textarea
                                    className="w-full h-32 border rounded p-2 text-[#FFFFFF] bg-[#102976]"
                                    placeholder="Insira mais detalhes sobre o orçamento da viagem, por exemplo, prazos para pagamento, divisão de custos ou observações importantes."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
					<div className="flex justify-end mt-6">
                        <button
                            className="cursor-pointer transition hover:scale-110 bg-[#86EE60] text-[#0F2976] font-bold px-28 py-4 rounded-xl text-xl shadow hover:bg-[#4be05a] min-w-[260px]"
                        >
                            Próximo
                        </button>
					</div>
				</div>
			</div>
		</div>
	);
}