"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/common/Modal";
import { X } from "lucide-react";
import api from "@/utils/axios";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import Image from "next/image";
import RequireAuth from "@/components/auth/RequireAuth";

export default function TravelTransport() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Transporte atualmente selecionado
    const [description, setDescription] = useState(""); // Descrição do transporte selecionado
    const [confirmedOption, setConfirmedOption] = useState<string | null>(null); // Transporte confirmado
    const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({}); // Armazena as descrições de cada transporte
    const [showSuccess, setShowSuccess] = useState(false);

    const [placeholders] = useState({
        avião: "Informe dados importantes sobre o transporte aéreo, como: Nome da companhia aérea, modelo da aeronave e serviços disponíveis a bordo.",
        ônibus: "Informe dados importantes sobre o transporte de ônibus, como: Nome da empresa de transporte, tipo de veículo e comodidades disponíveis.",
        carro: "Informe dados importantes sobre o carro, como: Modelo, marca, cor, capacidade de passageiros e condições gerais do veículo.",
        trem: "Informe dados importantes sobre o transporte ferroviário, como: Nome da companhia ferroviária, tipo de trem e serviços disponíveis.",
        navio: "Informe dados importantes sobre o transporte marítimo, como: Nome da companhia marítima, tipo de embarcação e comodidades disponíveis.",
    });

    // Função para buscar transporte do back-end
    const fetchTransporte = async () => {
        try {
            const response = await api.get('/transportes');
            const transporte = response.data;

            if (transporte) {
                setConfirmedOption(transporte.tipoTransporte);
                setDescriptions({ [transporte.tipoTransporte]: transporte.descricao });
            }
        } catch (error) {
            console.error("Erro ao buscar transporte:", error);
        }
    };

    // Função para salvar transporte no back-end
    const handleFinalSave = async () => {
        if (!confirmedOption || !descriptions[confirmedOption]) {
            alert("Selecione um transporte e preencha a descrição antes de salvar.");
            return;
        }

        // Buscar id da viagem do localStorage
        const viagemStr = localStorage.getItem("viagemEmCriacao");
        if (!viagemStr) {
            alert("Viagem não encontrada. Por favor, crie uma viagem primeiro.");
            return;
        }
        const viagem = JSON.parse(viagemStr);
        const viagemId = viagem.id ?? viagem.id_viagem; // ajuste conforme o campo retornado pelo backend

        try {
            const payload = {
                viagemId,
                tipoTransporte: confirmedOption,
                descricao: descriptions[confirmedOption],
            };

            await api.post('/transporte', payload);

            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao salvar o transporte:", error);
            alert("Ocorreu um erro ao salvar o transporte. Tente novamente.");
        }
    };

    const handleCloseModalSuccess = () => {
        setShowSuccess(false);
        router.push("/trip_budget");
    };

    useEffect(() => {
        fetchTransporte(); // Busca o transporte ao carregar a página
    }, []);

    const handleTransportClick = (item: string) => {
        setSelectedOption(item); // Define o transporte selecionado
        setDescription(descriptions[item] || ""); // Carrega a descrição salva, se existir
        setOpenModal(true); // Abre o modal
    };

    const handleSaveAndExit = () => {
        if (selectedOption) {
            // Atualiza o estado para manter apenas a descrição do transporte selecionado
            setDescriptions({
                [selectedOption]: description, // Salva apenas a descrição do transporte selecionado
            });
            setConfirmedOption(selectedOption); // Confirma o transporte selecionado
            setOpenModal(false); // Fecha o modal
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Fecha o modal sem confirmar
        setDescription(""); // Limpa a descrição temporária
    };

    return (
        <RequireAuth>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
                <SidebarMenu />

                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />

                    <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-4">Criar Viagem - Transporte</h1>
                    <div className="flex flex-col items-center w-9/10 border-2 border-[#092064] mt-3 mb-10" />

                    <div className="flex flex-col items-center w-3/5 h-2/5 mt-12 p-4 border-2 border-[#00FF4D] rounded-4xl shadow-lg">
                        <h1 className="text-white font-quicksand font-bold text-[2.5rem] leading-[1] tracking-[0] text-center mt-5">
                            Qual será o Transporte utilizado <br /> na Viagem?
                        </h1>

                        <div className="flex items-center justify-center space-x-6 mt-auto mb-10">
                            <Modal isOpen={openModal}>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h1 className="text-[#0F2976] text-4xl text-center mb-10">Insira a descrição do Transporte:</h1>
                                    <textarea
                                        placeholder={selectedOption ? placeholders[selectedOption as keyof typeof placeholders] : ""}
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
                                {["avião", "ônibus", "carro", "trem", "navio"].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className="flex flex-col items-center cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                                        onClick={() => handleTransportClick(item)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleTransportClick(item);
                                            }
                                        }}
                                    >
                                        <div
                                            className={`hover:scale-110 transition-transform w-[6.125rem] h-[6.125rem] flex items-center justify-center rounded-full ${confirmedOption === item ? "bg-[#00FF4D]" : "bg-white"
                                                }`}
                                        >
                                            <Image
                                                src={`/images-trip_transport/${item}.svg`}
                                                alt={item.charAt(0).toUpperCase() + item.slice(1)}
                                                width={70}
                                                height={70}
                                                className="w-[4.375rem] h-[4.375rem]"
                                            />
                                        </div>
                                        <span className="text-white mt-2">
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center mt-30">
                        <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20" />
                        <button
                            onClick={handleFinalSave}
                            disabled={!confirmedOption || !descriptions[confirmedOption]}
                            className={`absolute bg-[#00FF4D] text-[#0F2976] font-bold rounded-lg w-2/4 h-20 text-3xl ${!confirmedOption || !descriptions[confirmedOption]
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
                <SuccessModal
                    isOpen={showSuccess}
                    message="Transporte salvo com sucesso!"
                    onClose={handleCloseModalSuccess}
                />
            </div>
        </RequireAuth>
    );
}