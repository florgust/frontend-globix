"use client";
import React, { useState, useEffect, Suspense } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/axios";
import Image from "next/image";

interface TripData {
    idViagem: string;
    nome: string;
    idaEnderecoPartida: string;
    idaEnderecoChegada: string;
    idaDataPartida: string;
    idaDataChegada: string;
    voltaEnderecoPartida: string;
    voltaEnderecoChegada: string;
    voltaDataPartida: string;
    voltaDataChegada: string;
}

function TravelLocationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tripId = searchParams.get("tripId");

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

    const [tripData, setTripData] = useState<TripData | null>(null);

    function formatDateForInput(dateString: string) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    }

    useEffect(() => {
        const fetchTripData = async () => {
            if (!tripId) return;
            try {
                const response = await api.get(`/viagem/${tripId}`);
                const data = response.data;
                setTripData(data);
                setIda({
                    enderecoPartida: data.idaEnderecoPartida || "",
                    enderecoChegada: data.idaEnderecoChegada || "",
                    dataPartida: formatDateForInput(data.idaDataPartida),
                    dataChegada: formatDateForInput(data.idaDataChegada),
                });
                setVolta({
                    enderecoPartida: data.voltaEnderecoPartida || "",
                    enderecoChegada: data.voltaEnderecoChegada || "",
                    dataPartida: formatDateForInput(data.voltaDataPartida),
                    dataChegada: formatDateForInput(data.voltaDataChegada),
                });
            } catch (error) {
                console.error("Erro ao buscar os dados da viagem:", error);
            }
        };

        fetchTripData();
    }, [tripId]);

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
            idViagem: tripId,
            nome: tripData?.nome || "Localização Exemplo",
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
            await api.post("/localizacao", payload);
            alert("Localização salva com sucesso!");
            router.push("/travel_transport");
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

                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">
                    Editar Viagem - Localização
                </h1>
                <div className="flex flex-col items-center w-9/10 border border-[#092064] mt-3 mb-15" />

                <div className="flex flex-col items-center w-[52.5rem] h-[30rem] p-4 border-2 border-[#00FF4D] rounded-[2rem] shadow-lg ">
                    {tripData ? (
                        <>
                            <h2 className="text-[#FFFFFF] font-bold text-2xl mb-4">
                                Viagem: {tripData.nome}
                            </h2>
                            <div className="w-full mt-2 ">
                                {/* IDA */}
                                <div className="mb-4 ">
                                    <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center ml-3">
                                        IDA
                                    </h2>
                                    <Image
                                        src="/images-travel_location/linha.svg"
                                        alt="Linha decorativa"
                                        width={400}
                                        height={12}
                                        className="mb-4 ml-3"
                                        priority
                                    />
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
                                    <Image
                                        src="/images-travel_location/linha.svg"
                                        alt="Linha decorativa"
                                        width={400}
                                        height={12}
                                        className="mb-4 ml-3"
                                        priority
                                    />
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
                        </>
                    ) : (
                        <p className="text-white">Carregando dados da viagem...</p>
                    )}
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-auto mb-30">
                    <button
                        onClick={handleSave}
                        className="absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 cursor-pointer"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TravelLocation() {
    return (
        <Suspense fallback={<div className="text-white">Carregando página...</div>}>
            <TravelLocationContent />
        </Suspense>
    );
}