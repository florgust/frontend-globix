"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { FiCalendar, FiMapPin, FiUsers, FiTrash2, FiPlus } from "react-icons/fi";

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
						<div className="font-bold text-[2rem] mb-2 text-[#0F2976]">Viagem Rifaina</div>
                        <div className="flex items-center gap-4 mb-1 text-[1.3rem]">
                            <img src="/images-trip_budget/calendario.svg" alt="Calendário" className="w-6 h-6" />
                            <span>
                                Data: <b className="text-[#0F2976]">01/07/2025</b> até <b className="text-[#0F2976]">05/07/2025</b>
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mb-1 text-[1.3rem]">
                            <img src="/images-trip_budget/globo.svg" alt="Globo" className="w-6 h-6" />
                            <span>Local: <b className="text-[#0F2976]">Rifaina</b></span>
                        </div>
                        <div className="flex items-center gap-4 text-[1.3rem]">
                            <img src="/images-trip_budget/pessoas.svg" alt="Pessoas" className="w-6 h-6" />
                            <span>
                                Participantes: <b className="text-[#0F2976]">{participants}</b>
                            </span>
                        </div>
					</div>
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <div className="flex font-bold mb-2">
                                <span className="w-1/2 text-[#0F2976]">Categoria</span>
                                <span className="w-1/2 text-[#0F2976]">Custo (R$)</span>
                            </div>
                            <div>
                                {categories.map((cat, idx) => (
                                    <React.Fragment key={cat.id}>
                                        <div className="flex items-center mb-2">
                                            <button
                                                className="text-red-500 mr-2"
                                                onClick={() => handleRemoveCategory(cat.id)}
                                                title="Remover categoria"
                                            >
                                                <FiTrash2 />
                                            </button>
                                            <span className="w-1/2 px-2 py-1 mr-2 text-[#000000]">
                                                {cat.name}
                                            </span>
                                            <input
                                                className="w-1/2 border rounded px-2 py-1"
                                                type="number"
                                                min="0"
                                                value={cat.value}
                                                onChange={(e) =>
                                                    handleCategoryChange(cat.id, e.target.value)
                                                }
                                                placeholder="R$"
                                            />
                                        </div>
                                        {idx < categories.length - 1 && (
                                            <hr className="border-t border-[#EAF1FF] mb-2" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                            <button
                                className="flex items-center text-[#1C4CDC] mt-2"
                                onClick={handleAddCategory}
                            >
                                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#6CFB7B] mr-2">
                                    <img src="/images-trip_budget/mais.svg" alt="Adicionar" className="w-4 h-4" />
                                </span>
                                Adicionar Categoria
                            </button>
                            <div className="flex justify-between mt-4 font-bold text-[#1C4CDC]">
                                <span>Total:</span>
                                <span>
                                    R$
                                    {total.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-[#1C4CDC]">
                                <span>Custo por pessoa:</span>
                                <span>
                                    R$
                                    {perPerson.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="bg-[#EAF1FF] rounded-xl p-4">
                                <div className="font-bold text-[#1C4CDC] mb-2">
                                    Observações Adicionais
                                </div>
                                <textarea
                                    className="w-full h-32 border rounded p-2 text-[#1C4CDC] bg-white"
                                    placeholder="Insira mais detalhes sobre o orçamento da viagem, por exemplo, prazos para pagamento, divisão de custos ou observações importantes."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
					<div className="flex justify-end mt-6">
						<button className="bg-[#6CFB7B] text-[#0F2976] font-bold px-12 py-3 rounded-xl text-lg shadow hover:bg-[#4be05a] transition">
							próximo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}