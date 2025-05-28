"use client";
import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { useRouter } from "next/navigation";
import api from "@/utils/axios"; // Importa a instância configurada do Axios

export default function TravelLocation() {
    const router = useRouter();

    // Estados para armazenar os dados do formulário
    const [ida, setIda] = useState({
        enderecoPartida: "",
        enderecoChegada: "",
        dataPartida: "",
        dataChegada: "",
    });

    const [volta, setVolta] = useState({
        enderecoPartida: "",
        enderecoChegada: "",
        dataPartida: "",
        dataChegada: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "ida" | "volta", field: string) => {
        const value = e.target.value;
        if (type === "ida") {
            setIda({ ...ida, [field]: value });
        } else {
            setVolta({ ...volta, [field]: value });
        }
    };

    const handleSave = async () => {
        const payload = {
            idViagem: 1, // Substitua pelo ID da viagem correspondente
            nome: "Localização Exemplo",
            idaEnderecoPartida: ida.enderecoPartida,
            idaEnderecoChegada: ida.enderecoChegada,
            idaDataPartida: ida.dataPartida,
            idaDataChegada: ida.dataChegada,
            voltaEnderecoPartida: volta.enderecoPartida,
            voltaEnderecoChegada: volta.enderecoChegada,
            voltaDataPartida: volta.dataPartida,
            voltaDataChegada: volta.dataChegada,
        };

        try {
            await api.post("/localizacao", payload); // Envia o payload para o backend
            alert("Localização atualizada com sucesso!");
            router.push("/travel_transport"); // Redireciona para a próxima página
        } catch (error) {
            console.error("Erro ao salvar a localização:", error);
            alert("Ocorreu um erro ao salvar a localização. Tente novamente.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />

                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Editar localização da viagem</h1>
                <div className="flex flex-col items-center w-9/10 border border-2 border-[#092064] mt-3 mb-15" />

                <div className="flex flex-col items-center w-[52.5rem] h-[30rem] p-4 border-2 border-[#00FF4D] rounded-[2rem] shadow-lg ">
                    <div className="w-full mt-2 ">
                        {/* IDA */}
                        <div className="mb-4 ">
                            <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center ml-3">
                                IDA
                            </h2>
                            <img src="/images-travel_location/linha.svg" alt="Linha decorativa" className="mb-4 ml-3" />
                            <div className="flex flex-col space-y-4 ">
                                <div className="flex items-center space-x-4 gap-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto inicial. Ex.: Rodoviária, Aeroporto..."
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                            value={ida.enderecoPartida}
                                            onChange={(e) => handleChange(e, "ida", "enderecoPartida")}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block">
                                            Data de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                                            value={ida.dataPartida}
                                            onChange={(e) => handleChange(e, "ida", "dataPartida")}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 gap-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto final. Ex.: Hotel, Posto..."
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                            value={ida.enderecoChegada}
                                            onChange={(e) => handleChange(e, "ida", "enderecoChegada")}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block">
                                            Data de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                                            value={ida.dataChegada}
                                            onChange={(e) => handleChange(e, "ida", "dataChegada")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VOLTA */}
                        <div>
                            <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center mt-5 ml-3">
                                VOLTA
                            </h2>
                            <img src="/images-travel_location/linha.svg" alt="Linha decorativa" className="mb-4 ml-3" />
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4 gap-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto inicial. Ex.: Rodoviária, Aeroporto..."
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                            value={volta.enderecoPartida}
                                            onChange={(e) => handleChange(e, "volta", "enderecoPartida")}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block">
                                            Data de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                                            value={volta.dataPartida}
                                            onChange={(e) => handleChange(e, "volta", "dataPartida")}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 gap-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto final. Ex.: Hotel, Posto..."
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                            value={volta.enderecoChegada}
                                            onChange={(e) => handleChange(e, "volta", "enderecoChegada")}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block">
                                            Data de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                                            value={volta.dataChegada}
                                            onChange={(e) => handleChange(e, "volta", "dataChegada")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-auto mb-30">
                    <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20" />
                    <button
                        onClick={handleSave}
                        className="absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 text-3xl cursor-pointer"
                    >
                        Atualizar
                    </button>
                </div>
            </div>
        </div>
    );
}