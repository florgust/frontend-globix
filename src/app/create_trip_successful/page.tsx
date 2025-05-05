"use client";
import React from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Header from "@/components/ui/header";

export default function TripTransport() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <Header />

                <div className="relative flex items-center justify-center w-full">
                    <div className="absolute top-19 flex items-center justify-center w-[6rem] h-[6rem] bg-green-500 rounded-full z-10">
                        <img
                            src="/images-trip_successful/certo.svg"
                            alt="Success Icon"
                            className="w-[8.3925rem] h-[8.3925rem]"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 mt-30 bg-white rounded-lg shadow-lg">
                    
                    <div className="mt-7">
                        <h1 className="text-[3rem] font-bold text-center text-[#0F2976]">
                            Viagem Criada com <br></br>Sucesso!
                        </h1>
                    </div>

                    <div className="w-full mt-6 text-[#111315] ml-85 font-bold text-[1rem]">
                        <div className="flex items-center mb-2">
                            <img
                                src="/images-trip_successful/globo.svg"
                                alt="Globo"
                                className="mr-2 w-6 h-6"
                            />
                            <span>Viagem Rifaina</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <img
                                src="/images-trip_successful/calendario.svg"
                                alt="Calendario"
                                className="mr-2 w-6 h-6"
                            />
                            <span>De 01/07/2025 até 05/07/2025</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <img
                                src="/images-trip_successful/organizador.svg"
                                alt="Organizador"
                                className="mr-2 w-6 h-6"
                            />
                            <span>Organizador: Mauro Borges</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <img
                                src="/images-trip_successful/globo2.svg"
                                alt="Globo 2"
                                className="mr-2 w-6 h-6"
                            />
                            <span>Tipo: Pública</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <img
                                src="/images-trip_successful/pessoas.svg"
                                alt="Pessoas"
                                className="mr-2 w-6 h-6"
                            />
                            <span>Vagas disponíveis: 10</span>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[#27A450]">
                        <strong>Itinerário, transporte e localização foram salvos!</strong>
                    </p>
                    <p className="mt-2 text-sm text-[#111315]">
                        Você pode editar qualquer detalhe a qualquer momento.
                    </p>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button className="w-34 h-14 bg-[#00FF4D] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-sm text-[#092064]">Página inicial</span>
                        </button>
                        <button className="w-34 h-14 bg-[#00FF4D] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-sm text-[#092064]">Convidar participantes</span>
                        </button>
                        <button className="w-34 h-14 bg-[#00FF4D] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-sm text-[#092064]">Mais detalhes</span>
                        </button>
                        <button className="w-34 h-14 bg-[#00FF4D] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-sm text-[#092064]">Botão 4</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}