"use client";
import React from "react";
import { Briefcase, UserRoundPlus, X } from "lucide-react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Header from "@/components/ui/header";
import Modal from "@/components/ui/modal";


export default function TripTransport() {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <Header />

                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem - Localização</h1>
                <div className='flex flex-col items-center w-9/10 border border-2 border-[#092064] mt-3 mb-20' />

                <div className="flex flex-col items-center w-[52.5rem] h-[30rem] p-4 border-2 border-[#00FF4D] rounded-[2rem] shadow-lg mt-[-2rem]">

                    <div className="w-full mt-2">
                        {/* IDA */}
                        <div className="mb-4">
                            <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center ml-3">
                                IDA
                            </h2>
                            <img src="/images-trip_location/linha.svg" alt="Linha decorativa" className="mb-4 ml-3" />
                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto inicial de onde a viagem vai começar. Ex.: Rodoviária"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Data de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto final da viagem. Ex.: Hotel, Posto..."
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Data de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] text-sm bg-[#FFFFFF]"
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
                            <img src="/images-trip_location/linha.svg" alt="Linha decorativa" className="mb-4 ml-3" />
                            <div className="flex flex-col space-y-2">
                            <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto inicial de onde a viagem vai iniciar para voltar para"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Data de Partida <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Local de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite o ponto final de onde a viagem vai terminar. Ex.: Hotel,"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3">
                                            Data de Chegada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] text-sm bg-[#FFFFFF]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center mt-auto mb-30'>
                    <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20"/>

                    <button className="absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 text-3xl cursor-pointer">
                        Próximo
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
