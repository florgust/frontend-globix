"use client";
import React from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import {HeaderPages} from "@/components/ui/header";

export default function TripTransport() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />

                <div className="relative flex items-center justify-center w-full">
                    <div 
                        className="absolute top-19 flex items-center justify-center w-[6rem] h-[6rem] rounded-full z-10" 
                        style={{ backgroundImage: "url('/images-trip_unsuccessful/fundo_vermelho.svg')", backgroundSize: "cover" }}
                    >
                        <img
                            src="/images-trip_unsuccessful/erro.svg"
                            alt="Error Icon"
                            className="w-[8.3925rem] h-[8.3925rem]"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 mt-30 bg-white rounded-lg shadow-lg">
                    
                    <div className="mt-7">
                        <h1 className="text-[3rem] font-bold text-center text-[#0F2976]">
                            Erro ao criar Viagem! <br></br><br></br>
                        </h1>
                    </div>

                    <div className="w-full mt-6 text-[#0F2976] font-bold text-[2rem] text-center">
                        <p>Não foi possível criar viagem.</p>
                        <p>Verifique sua conexão e tente novamente.</p>
                    </div>

                    <div className="flex justify-center mt-6 space-x-4 gap-5">
                        <button className="w-48 h-14 bg-[#0F2976] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-lg text-[#00FF4DCC]">Tentar novamente</span>
                        </button>
                        <button className="w-48 h-14 bg-[#FFFFFF] border-2 border-[#00FF4D] rounded-lg cursor-pointer hover:scale-110">
                            <span className="font-bold text-lg text-[#092064]">Voltar ao início</span>
                        </button>
                    </div>

                    <br></br><br></br><br></br>

                    <p className="w-full mt-6 text-[#0F2976] text-[1.2rem] text-center">Se o problema persistir, entre em contato conosco.</p>
                </div>
            </div>
        </div>
    );
}