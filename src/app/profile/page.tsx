"use client";

import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import Filters from "@/components/common/Filters";
import TripList from "@/components/ui/TripList";
import { Trip } from "@/types/trip";
import Cookies from "js-cookie";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import api from "@/utils/axios";
import ModalProfileEdit from "@/components/ui/modals/ModalProfileEdit";
import ModalPasswordEdit from "@/components/ui/modals/ModalPasswordEdit";
import RequireAuth from "@/components/auth/RequireAuth";
import { getDefaultImage } from "@/utils/imageUtils";

export default function Profile() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [sortOrder, setSortOrder] = useState("recentes");
    const [roleFilter, setRoleFilter] = useState("");
    const [usuario, setUsuario] = useState<{nome: string;email: string;id?: number;} | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState<string>(getDefaultImage("user")
    );

    useEffect(() => {
        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                setUsuario(usuarioObj);

                // Buscar viagens do usuário
                if (usuarioObj.id) {
                    api
                        .get(`/usuarios/${usuarioObj.id}/foto`)
                        .then((res) => {
                            const userData = res.data;
                            if (userData.url) {
                                setProfileImageUrl(userData.url);
                            }
                        })
                        .catch(() => {
                            setProfileImageUrl(getDefaultImage("user")");
                        });

                    api
                        .get(`/solicitacoes/viagem/card/${usuarioObj.id}`)
                        .then((res) => {
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

    // Função para normalizar papel para filtro
    function papelParaFiltro(papel: string) {
        if (!papel) return "";
        const papelLower = papel.toLowerCase();
        if (papelLower === "organizador" || papelLower === "organizadorpromovido") return "organizador";
        if (papelLower === "participante") return "participante";
        return papelLower;
    }

    // Filtro e ordenação das viagens
    const filteredTrips = useMemo(() => {
        let result = trips;

        // Filtro por papel
        if (roleFilter) {
            result = result.filter(trip => papelParaFiltro(trip.papel) === roleFilter);
        }

        // Ordenação
        if (sortOrder === "recentes") {
            result = [...result].sort((a, b) => {                
                const dataA = a.dataCriacao ?? a.dataInicio;
                const dataB = b.dataCriacao ?? b.dataInicio;
                return (dataB || "").localeCompare(dataA || "");
            });
        } else if (sortOrder === "a-z") {
            result = [...result].sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sortOrder === "z-a") {
            result = [...result].sort((a, b) => b.nome.localeCompare(a.nome));
        }

        return result;
    }, [trips, roleFilter, sortOrder]);

    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    const handleModalClose = () => {
        setIsModalOpen(false);

        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                if (usuarioObj.id) {
                    api
                        .get(`/usuarios/${usuarioObj.id}/foto`)
                        .then((res) => {
                            const userData = res.data;
                            if (userData.url) {
                                setProfileImageUrl(userData.url);
                            } else {
                                setProfileImageUrl(getDefaultImage("user"));
                            }
                        })
                }
            } catch (error) {
                console.error("Erro ao carregar imagem do menu do usuário:", error);
                setProfileImageUrl(getDefaultImage("user"));
            }
        }
    };
    return (
        <RequireAuth>
            <div className="flex h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                {/* Sidebar */}
                <SidebarMenu />

                {/* Main Content */}
                <div className="flex flex-col w-full overflow-hidden">
                    <HeaderPages />

                    <div className="flex flex-col w-full h-full px-15 overflow-y-auto">
                        {/* Perfil */}
                        <h1 className="font-bold text-4xl text-left text-white mt-6">
                            Meu perfil
                        </h1>
                        <div className="relative bg-[#0F2976] rounded-lg shadow-lg h-72 flex items-center justify-between px-8 mt-6">
                            <div className="flex items-center">
                                <Image
                                    src={profileImageUrl}
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="w-40 h-40 rounded-full object-cover object-center mt-10 mb-10"
                                />
                                <div className="ml-6 text-[#FFFFFF]">
                                    <h2 className="text-2xl font-bold">
                                        {usuario?.nome ?? "Nome do usuario"}
                                    </h2>
                                    <p className="text-sm opacity-50">
                                        {usuario?.email ?? "Email do usuario"}
                                    </p>
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
                                <h2 className="font-bold text-3xl text-white">
                                    Minhas Viagens
                                </h2>
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
                                <TripList trips={filteredTrips} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de editar perfil */}
                <ModalProfileEdit
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onOpenPassword={handleOpenPasswordModal}
                />

                {/* Modal de editar senha */}
                <ModalPasswordEdit
                    isOpen={isPasswordModalOpen}
                    onClose={handleClosePasswordModal}
                />
            </div>
        </RequireAuth>
    );
}
