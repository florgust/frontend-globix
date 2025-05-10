"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";

export default function TravelTransport() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Transporte atualmente selecionado
    const [confirmedOption, setConfirmedOption] = useState<string | null>(null); // Transporte confirmado
    const [description, setDescription] = useState("");
    const [isSaveEnabled, setIsSaveEnabled] = useState(false); // Habilita o botão "Salvar"
    const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({}); // Armazena as descrições de cada transporte
    const [placeholders, setPlaceholders] = useState({
        avião: "Informe os detalhes do voo, incluindo: Nome da companhia aérea, número do voo, terminal e portão de embarque, e qualquer informação adicional relevante.",
        ônibus: "Informe os detalhes do ônibus, incluindo: Nome da empresa de transporte, número da passagem, e informações adicionais, como número do assento.",
        carro: "Informe os detalhes do carro, incluindo: Modelo, marca, placa, cor, nome do locatário ou proprietário, e informações adicionais, como seguro ou condições de devolução (se for alugado).",
        trem: "Informe os detalhes do trem, incluindo: Nome da companhia ferroviária, número do bilhete, número do vagão e assento, e informações adicionais, como classe de viagem.",
        navio: "Informe os detalhes do navio, incluindo: Nome da companhia marítima, número da cabine, e informações adicionais, como serviços inclusos.",
    });

    const handleSaveAndExit = () => {
        if (description.trim().length > 0 && selectedOption) {
            setDescriptions((prev) => ({
                ...prev,
                [selectedOption]: description, // Salva a descrição do transporte selecionado
            }));
            setConfirmedOption(selectedOption); // Confirma o transporte selecionado
            setOpenModal(false);
            setIsSaveEnabled(true); // Habilita o botão "Salvar"
            setDescription(""); // Limpa o campo de descrição ao sair
        }
    };

    const handleTransportClick = (item: string) => {
        setSelectedOption(item); // Define o transporte selecionado
        setDescription(descriptions[item] || ""); // Carrega a descrição salva, se existir
        setOpenModal(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Fecha o modal sem confirmar
        setDescription(""); // Limpa a descrição temporária
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />

                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem - Transporte</h1>
                <div className="flex flex-col items-center w-9/10 border border-2 border-[#092064] mt-3 mb-20" />

                <div className="flex flex-col items-center w-3/5 h-2/5 mt-8 p-4 border-2 border-[#00FF4D] rounded-4xl shadow-lg">
                    <h1 className="text-white font-quicksand font-bold text-[2.5rem] leading-[1] tracking-[0] text-center mt-5">
                        Qual será o Transporte utilizado <br /> na Viagem?
                    </h1>

                    <div className="flex items-center justify-center space-x-6 mt-auto mb-10">
                        <Modal isOpen={openModal}>
                            <div className="flex flex-col items-center justify-center h-full">
                                <h1 className="text-[#0F2976] text-4xl mb-3 text-center mb-10">Insira a descrição do Transporte:</h1>
                                <textarea
                                    placeholder={selectedOption ? placeholders[selectedOption] : ""}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-[38rem] h-[12rem] pl-10 pr-10 pt-5 bg-[#0F2976] text-white placeholder-gray-300 rounded-[4.375rem] placeholder:text-2xl placeholder:leading-8 resize-none"
                                    style={{ fontSize: "1.5rem" }}
                                />
                                <button
                                    onClick={handleSaveAndExit}
                                    disabled={description.trim().length === 0}
                                    className={`mt-5 font-bold text-xl px-6 py-3 rounded-lg ${description.trim().length > 0
                                            ? "bg-[#00FF4D] text-[#0F2976] cursor-pointer"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        }`}
                                >
                                    Salvar e Sair
                                </button>
                                <button onClick={handleCloseModal}>
                                    <X className="absolute top-10 right-10 w-12 h-12 text-[#6C727F] cursor-pointer" />
                                </button>
                            </div>
                        </Modal>

                        <div className="flex space-x-6 gap-5">
                            {["avião", "ônibus", "carro", "trem", "navio"].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => handleTransportClick(item)}
                                >
                                    <div
                                        className={`hover:scale-110 transition-transform w-[6.125rem] h-[6.125rem] flex items-center justify-center rounded-full ${confirmedOption === item ? "bg-[#00FF4D]" : "bg-white"
                                            }`}
                                    >
                                        <img
                                            src={`/images-travel_transport/${item}.svg`}
                                            alt={item.charAt(0).toUpperCase() + item.slice(1)}
                                            className="w-[4.375rem] h-[4.375rem]"
                                        />
                                    </div>
                                    <span className="text-white mt-2">
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-auto mb-30">
                    <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20" />
                    <button
                        onClick={() => alert("Viagem salva com sucesso!")}
                        disabled={!isSaveEnabled || !confirmedOption || !descriptions[confirmedOption]}
                        className={`absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 text-3xl cursor-pointer ${!isSaveEnabled || !confirmedOption || !descriptions[confirmedOption]
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}