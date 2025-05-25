"use client";

import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import Filters from "@/components/ui/Filters";
import TripList from "@/components/ui/TripList";
import { useTrips } from "@/hooks/useTrips";
import { Trip } from "@/types/trip";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/axios";


export default function Profile() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const { sortOrder, setSortOrder, roleFilter, setRoleFilter } = useTrips({
        initialTrips: trips,
    });

    const [usuario, setUsuario] = useState<{ nome: string; email: string; id?: number } | null>(null);

    useEffect(() => {
        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                setUsuario(usuarioObj);

                // Buscar viagens do usuário
                if (usuarioObj.id) {
                    api.get(`/solicitacoes/viagem/card/${usuarioObj.id}`)
                        .then((res) => {
                            console.log("Viagens recebidas:", res.data);
                            setTrips(res.data);
                        })
                        .catch(() => setTrips([]));
                }
            } catch {
                setUsuario(null);
                setTrips([]);
            }
        }
    }, []);

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
                            <Image
                                src="/images-profile/mauro.svg"
                                alt="Profile"
                                width={160}
                                height={160}
                                className="w-40 h-40 rounded-full object-cover object-center mt-10 mb-10"
                            />
                            <div className="ml-6 text-[#FFFFFF]">
                                <h2 className="text-2xl font-bold">{usuario?.nome ?? "Nome do usuario"}</h2>
                                <p className="text-sm opacity-50">{usuario?.email ?? "Email do usuario"}</p>
                            </div>
                        </div>
                        <a
                            href="/profile_edit"
                            className="bg-[#00FF4D] text-[#0F2976] px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer text-[1.1rem]"
                        >
                            Editar Perfil
                        </a>
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
                            <TripList trips={trips} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}