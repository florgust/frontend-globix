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
    
                    <h1 className="font-bold text-4xl text-left text-white w-full pl-15 mt-2">Meu perfil</h1>

                    <div className="w-full mt-6 px-15">
                        <div className="relative bg-[#0F2976] rounded-lg shadow-lg h-72 flex items-center justify-between px-8">
                            <div className="flex items-center">
                                <img
                                    src="/images-profile/mauro.svg"
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover object-center"
                                />
                                <div className="ml-6 text-[#FFFFFF]">
                                    <h2 className="text-2xl font-bold">Mauro Borges</h2>
                                    <p className="text-sm opacity-50">mauro@iftm.edu.br</p>
                                </div>
                            </div>
                            <button className="bg-[#00FF4D] text-[#0F2976] px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer text-[1.1rem]">
                                Editar Perfil
                            </button>
                        </div>

                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
}