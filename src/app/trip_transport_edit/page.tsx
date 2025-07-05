"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { Modal } from "@/components/common/Modal";
import { X } from "lucide-react";
import api from "@/utils/axios";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";

const transportTypes = ["avião", "ônibus", "carro", "trem", "navio"];

export default function TripTransportEdit() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [confirmedOption, setConfirmedOption] = useState<string | null>(null);
    const [transporteId, setTransporteId] = useState<number | null>(null);
    const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const [placeholders] = useState({
        avião: "Informe dados importantes sobre o transporte aéreo, como: Nome da companhia aérea, modelo da aeronave e serviços disponíveis a bordo.",
        ônibus: "Informe dados importantes sobre o transporte de ônibus, como: Nome da empresa de transporte, tipo de veículo e comodidades disponíveis.",
        carro: "Informe dados importantes sobre o carro, como: Modelo, marca, cor, capacidade de passageiros e condições gerais do veículo.",
        trem: "Informe dados importantes sobre o transporte ferroviário, como: Nome da companhia ferroviária, tipo de trem e serviços disponíveis.",
        navio: "Informe dados importantes sobre o transporte marítimo, como: Nome da companhia marítima, tipo de embarcação e comodidades disponíveis.",
    });

    // Carrega transporte já salvo ao abrir a página
    useEffect(() => {
        const fetchTransporte = async () => {
            try {
                const selectedTripStr = localStorage.getItem("selectedTrip");
                if (!selectedTripStr) return;
                const selectedTrip = JSON.parse(selectedTripStr);
                const viagemId = selectedTrip.id;

                const response = await api.get(`/transporte/viagem/${viagemId}`);
                const transporte = Array.isArray(response.data) ? response.data[0] : response.data;
                if (transporte) {
                    setTransporteId(transporte.id); // Salve o id do transporte
                    setConfirmedOption(transporte.tipoTransporte || transporte.tipo_transporte);
                    setSelectedOption(transporte.tipoTransporte || transporte.tipo_transporte);
                    setDescriptions({ [transporte.tipoTransporte || transporte.tipo_transporte]: transporte.descricao });
                }
            } catch (error) {
                console.error("Erro ao buscar transporte:", error);
            }
        };
        fetchTransporte();
    }, []);

    // Atualiza descrição ao abrir modal
    const handleTransportClick = (item: string) => {
        setSelectedOption(item);
        setDescription(descriptions[item] || "");
        setOpenModal(true);
    };

    const handleSaveAndExit = () => {
        if (selectedOption) {
            setDescriptions({
                [selectedOption]: description,
            });
            setConfirmedOption(selectedOption);
            setOpenModal(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDescription("");
    };

    // Atualiza transporte (PUT)
    const handleFinalSave = async () => {
        if (!confirmedOption || !descriptions[confirmedOption]) {
            alert("Selecione um transporte e preencha a descrição antes de salvar.");
            return;
        }

        if (!transporteId) {
            alert("Transporte não encontrado para atualizar.");
            return;
        }

        const payload = {
            tipoTransporte: confirmedOption,
            descricao: descriptions[confirmedOption],
        };

        try {
            await api.put(`/transporte/${transporteId}`, payload);
            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao atualizar o transporte:", error);
            alert("Ocorreu um erro ao atualizar o transporte. Tente novamente.");
        }
    };

    const handleCloseModalSuccess = () => {
        setShowSuccess(false);
        router.push("/travels");
    };

    return (
        <RequireAuth>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
                <SidebarMenu />
                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />
                    <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-4">Editar Transporte da Viagem</h1>
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
                                {transportTypes.map((item, index) => (
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
                                                src={`/images-trip_transport/${item}.svg`}
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
                            onClick={handleFinalSave}
                            disabled={!confirmedOption || !descriptions[confirmedOption]}
                            className={`absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 text-3xl ${!confirmedOption || !descriptions[confirmedOption]
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                        >
                            Atualizar
                        </button>
                    </div>
                </div>
                <SuccessModal
                    isOpen={showSuccess}
                    message="Transporte atualizado com sucesso!"
                    onClose={handleCloseModalSuccess}
                />
            </div>
        </RequireAuth>
    );
}