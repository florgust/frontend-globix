"use client";

import React, { useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import Filters from "@/components/ui/Filters";
import TripList from "@/components/ui/TripList";
import { useTrips } from "@/hooks/useTrips";
import { UserRole } from "@/types/trip";
import ModalProfileEdit from "@/components/ui/modals/ModalProfileEdit";

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialTrips = [
        {
            id: 1,
            nome: "Viagem Rifaina",
            imagem: "/images-my_trips/rifaina.png",
            dataInicio: "2025-06-01",
            dataFim: "2025-06-05",
            cidade: "Rifaina",
            organizador: "João Silva",
            transporte: "Ônibus",
            papel: "organizador" as UserRole,
        },
        {
            id: 2,
            nome: "Viagem Campos do Jordão",
            imagem: "/images-my_trips/londres.png",
            dataInicio: "2025-04-17",
            dataFim: "2025-04-25",
            cidade: "Campos do Jordão",
            organizador: "Maria Oliveira",
            transporte: "Van",
            papel: "participante" as UserRole,
        },
        {
            id: 3,
            nome: "Viagem Rio de Janeiro",
            imagem: "/images-my_trips/rj.png",
            dataInicio: "2025-08-20",
            dataFim: "2025-08-25",
            cidade: "Rio de Janeiro",
            organizador: "Carlos Souza",
            transporte: "Carro",
            papel: "organizador" as UserRole,
        },
        {
            id: 4,
            nome: "Caldas Novas",
            imagem: "/images-my_trips/caldas.png",
            dataInicio: "2025-09-15",
            dataFim: "2025-09-20",
            cidade: "Caldas Novas",
            organizador: "Ana Paula",
            transporte: "Avião",
            papel: "participante" as UserRole,
        },
    ];

    const { filtered, sortOrder, setSortOrder, roleFilter, setRoleFilter } = useTrips({
        initialTrips,
    });

    return (
        <div className="flex h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            {/* Sidebar */}
            <SidebarMenu />

            {/* Main Content */}
            <div className="flex flex-col w-full overflow-hidden">
                <HeaderPages />

                <div className="flex flex-col w-full h-full px-15 overflow-y-auto">
                    {/* Perfil */}
                    <h1 className="font-bold text-4xl text-left text-white mt-6">Meu perfil</h1>
                    <div className="relative bg-[#0F2976] rounded-lg shadow-lg h-72 flex items-center justify-between px-8 mt-6">
                        <div className="flex items-center">
                            <img
                                src="/images-profile/mauro.svg"
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover object-center mt-10 mb-10"
                            />
                            <div className="ml-6 text-[#FFFFFF]">
                                <h2 className="text-2xl font-bold">Mauro Borges</h2>
                                <p className="text-sm opacity-50">mauro@iftm.edu.br</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#00FF4D] text-[#0F2976] px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer text-[1.1rem]"
                        >
                            Editar Perfil
                        </button>
                    </div>

                    {/* Minhas Viagens */}
                    <div className="mt-10">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-3xl text-white">Minhas Viagens</h2>
                            <div className="flex items-center gap-4">
                                <Filters
                                    sortOrder={sortOrder}
                                    setSortOrder={setSortOrder}
                                    roleFilter={roleFilter}
                                    setRoleFilter={setRoleFilter}
                                />
                                <a
                                    href="/create_trip"
                                    className="bg-[#00FF4D] text-[#0F2976] px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer text-[1.1rem]"
                                >
                                    Criar Viagem
                                </a>
                            </div>
                        </div>
                        <hr className="mt-2 mb-6 w-full border-t-3 border-white/30 mx-auto" />
                        <div className="px-40 h-[calc(100vh-450px)] overflow-y-auto scrollbar-thin">
                            <TripList trips={filtered} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ModalProfileEdit isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}