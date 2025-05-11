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
    
                    <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Meu perfil</h1>

                    <div className="w-11/12 bg-gradient-to-b from-[#FFFFFF] via-[#CFE0FD] to-[#4182F9] rounded-lg shadow-lg p-4 mt-6 justify-between items-center"></div>

                    <div className="w-11/12 bg-[#0F2976] rounded-lg shadow-lg p-8 mt-6">
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden relative">
                                <img
                                    src="/images-profile/mauro.svg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="hover:scale-110 cursor-pointer transition-transform absolute top-64 left-87 w-[1.4rem] h-[1.4rem] rounded-full bg-[#FFFFFD] flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images-profile_edit/mais.svg"
                                    alt="Adicionar"
                                    className="w-4 h-4"
                                />
                            </div>
                            
                            
                            
                            <div className="ml-4">
                                <h2 className="text-white text-xl font-bold">Mauro Borges</h2>
                                <p className="text-gray-300">mauro@iftm.edu.br</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Seu Primeiro Nome"
                                    className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">Sobrenome</label>
                                <input
                                    type="text"
                                    placeholder="Sobrenome"
                                    className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">Gênero</label>
                                <select className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500">
                                    <option>Seu gênero</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">País</label>
                                <select className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500">
                                    <option>Seu país</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">Linguagem</label>
                                <select className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500">
                                    <option>Linguagem</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[#FFFFFD] mb-2">Fuso Horário</label>
                                <select className="rounded-[0.5rem] w-full p-2 rounded bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500">
                                    <option>Fuso Horário</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-[#FFFFFD] font-bold mb-2">Endereço de Email</h3>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-[#FFFFFF] mr-2 flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/images-profile_edit/email.svg"
                                            alt="Email"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div className="text-[#FFFFFD]">
                                        <p>mauro@iftm.edu.br</p>
                                        <p className="text-sm opacity-40">1 mês atrás</p>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-4 p-2 bg-[#D6D6D6] text-[#000000] rounded-[0.5rem] cursor-pointer hover:scale-110 transition-transform">
                                Adicionar Endereço de Email
                            </button>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-6 py-2 bg-[#86EE60] text-[#0F2976] rounded cursor-pointer hover:scale-110 transition-transform">Salvar</button>
                        </div>
                    </div>

                </div>
            </div>
    )
}