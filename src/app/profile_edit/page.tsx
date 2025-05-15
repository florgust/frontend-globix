"use client";
import React from "react";
import { X } from "lucide-react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";


export default function Profile() {
    return (
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
                <SidebarMenu />
    
                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />

                    <div className="w-11/12 bg-[#0F2976] rounded-lg shadow-lg p-8 mt-6 border-1 border-[#FFFFFF]">

                        <div className="flex justify-center mb-4">
                            <h1 className="font-bold text-4xl text-white text-center w-full">Editar perfil</h1>
                        </div>

                        <div className="flex items-center justify-center mb-6 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden relative">
                                    <img
                                        src="/images-profile/mauro.svg"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="mt-4 p-2 bg-[#D9D9D9] bg-opacity-10 rounded-[0.5rem] font-bold cursor-pointer hover:scale-110 transition-transform text-[#0F2976]">
                                    Editar foto
                                </button>
                            </div>
                        </div>
                            
                        <div className="flex flex-col gap-6 items-center">
                            <div className="w-full max-w-120">
                                <label className="block text-[#FFFFFD] mb-2 text-left">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Mauro Borges"
                                    className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                                />
                            </div>
                            <div className="w-full max-w-120">
                                <label className="block text-[#FFFFFD] mb-2 text-left">Sobrenome</label>
                                <input
                                    type="text"
                                    placeholder="mauro@iftm.edu.br"
                                    className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 w-full max-w-120 mx-auto">
                            <h3 className="text-[#FFFFFD] font-bold">Senha</h3>
                            <div className="flex items-center justify-between bg-transparent mt-2">
                                <div className="flex items-center ml-0">
                                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF] mr-2 flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/images-profile_edit/senha.svg"
                                            alt="Senha"
                                            className="w-6 h-6"
                                        />
                                    </div>
                                    <button className="ml-1 px-4 py-1 bg-[#163a9c] text-[#4182F9] rounded transition-colors text-sm hover:scale-110 transition-transform cursor-pointer">
                                        Alterar senha
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <div className="flex w-full max-w-120 gap-4 font-bold">
                                <button className="flex-1 px-6 py-2 bg-[#FFFFFF] text-[#0F2976] rounded cursor-pointer hover:scale-110 transition-transform">Salvar alterações</button>
                                <button className="flex-1 px-6 py-2 text-[#FFFFFF] rounded cursor-pointer hover:scale-110 transition-transform border border-white">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}