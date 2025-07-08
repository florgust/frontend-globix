"use client";
import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import Cookies from "js-cookie";
import RequireAuth from "@/components/auth/RequireAuth";
import { useRouter } from "next/navigation";

interface Trip {
    id?: string;
    nome: string;
    dataInicio: string;
    dataFim: string;
    tipo: string;
    quantidadeParticipante: number;
    codigoConvite?: string;
}

export default function TripTransport() {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [organizer, setOrganizer] = useState<string>("");
    const [isMounted, setIsMounted] = useState(false);
    const [copyMessage, setCopyMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Marca que o componente já foi montado (lado do cliente)
        // Busca nome do organizador do cookie
        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            const usuarioObj = JSON.parse(usuarioCookie);
            setOrganizer(usuarioObj.nome || "");
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            // Busca dados da viagem criada
            const tripStr = localStorage.getItem("viagemEmCriacao");
            if (tripStr) setTrip(JSON.parse(tripStr));
        }
    }, [isMounted]);

    if (!isMounted) {
        // Evita renderizar qualquer coisa até garantir que está no cliente
        return null;
    }

    if (!trip) {
        return (
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] items-center justify-center">
                <span className="text-white text-2xl">Carregando...</span>
            </div>
        );
    }

    // Formata datas para dd/mm/yyyy
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    // Função para obter dados atuais da viagem do localStorage
    const getCurrentTripData = () => {
        const tripStr = localStorage.getItem("viagemEmCriacao");
        if (tripStr) {
            const tripData = JSON.parse(tripStr);
            return tripData;
        }
        return null;
    };

    // Função para navegar para a página da viagem
    const handleGoToTripPage = () => {
        // Sempre busca os dados mais atuais do localStorage
        const currentTrip = getCurrentTripData();
        if (currentTrip && currentTrip.id) {
            // Armazena o ID da viagem no sessionStorage para acesso na próxima página
            sessionStorage.setItem('currentTripId', currentTrip.id);
            // Navega para a página sem o ID na URL
            router.push('/travels');
        } else {
            console.error("ID da viagem não encontrado no localStorage");
        }
    };

    // Função para copiar o código de convite
    const handleCopyInviteCode = async () => {
        // Sempre busca os dados mais atuais do localStorage
        const currentTrip = getCurrentTripData();
        
        if (currentTrip?.codigoConvite) {
            try {
                await navigator.clipboard.writeText(currentTrip.codigoConvite);
                setCopyMessage({ text: "Copiado com sucesso!", type: 'success' });
                // Remove a mensagem após 3 segundos
                setTimeout(() => setCopyMessage(null), 3000);
            } catch (error) {
                console.error("Erro ao copiar código:", error);
                setCopyMessage({ text: "Erro ao copiar código de convite", type: 'error' });
                // Remove a mensagem após 3 segundos
                setTimeout(() => setCopyMessage(null), 3000);
            }
        } else {
            setCopyMessage({ text: "Código de convite não encontrado", type: 'error' });
            setTimeout(() => setCopyMessage(null), 3000);
        }
    };

    return (
        <RequireAuth>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <SidebarMenu />

                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />

                    {/* Faixa de ícones e círculo de sucesso */}
                    <div className="relative flex items-center justify-center w-full">
                        <div className="absolute top-19 flex items-center justify-center w-[6rem] h-[6rem] bg-green-500 rounded-full z-10">
                            <img
                                src="/images-trip_successful/certo.svg"
                                alt="Success Icon"
                                className="w-[8.3925rem] h-[8.3925rem]"
                            />
                        </div>
                        <div className="absolute top-14 flex items-center justify-center w-[60rem] h-[10rem] z-10">
                            <img
                                src="/images-trip_successful/GroupSuccessful.png"
                                alt="Success Icon"
                                className="w-[60.3925rem] h-[15.3925rem]"
                            />
                        </div>
                    </div>

                    {/* Card de sucesso */}
                    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 mt-30 bg-white rounded-lg shadow-lg">
                        <div className="mt-7">
                            <h1 className="text-[3rem] font-bold text-center text-[#0F2976]">
                                Viagem Criada com <br />Sucesso!
                            </h1>
                        </div>

                        {/* INTEGRAÇÃO DOS DADOS */}
                        <div className="w-full mt-6 flex flex-col items-center">
                            <div className="text-[#0F2976] font-bold text-[1.1rem] w-full max-w-md text-left">
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/images-trip_successful/globo.svg"
                                        alt="Globo"
                                        className="mr-2 w-6 h-6"
                                    />
                                    <span> {trip.nome} </span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/images-trip_successful/calendario.svg"
                                        alt="Calendario"
                                        className="mr-2 w-6 h-6"
                                    />
                                    <span>
                                        De <b>{formatDate(trip.dataInicio)}</b> até <b>{formatDate(trip.dataFim)}</b>
                                    </span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/images-trip_successful/organizador.svg"
                                        alt="Organizador"
                                        className="mr-2 w-6 h-6"
                                    />
                                    <span>Organizador: <b>{organizer}</b></span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/images-trip_successful/globo2.svg"
                                        alt="Globo 2"
                                        className="mr-2 w-6 h-6"
                                    />
                                    <span>Tipo: <b>{trip.tipo === "publica" ? "Pública" : "Privada"}</b></span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/images-trip_successful/pessoas.svg"
                                        alt="Pessoas"
                                        className="mr-2 w-6 h-6"
                                    />
                                    <span>Vagas: <b>{trip.quantidadeParticipante}</b></span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-[#27A450] text-center">
                                <strong>Localização, transporte, orçamento e itinerário foram salvos!</strong>
                            </p>
                            <p className="mt-2 text-2sm text-[#111315] text-center">
                                Você pode editar qualquer detalhe a qualquer momento.
                            </p>
                        </div>

                        <div className="flex justify-center mt-6 space-x-4 gap-5">
                            <button className="w-34 h-14 bg-[#B1FF91] rounded-lg cursor-pointer hover:scale-110">
                                <a href="/home_page" className="font-bold text-sm text-[#092064]">Página inicial</a>
                            </button>
                            <button 
                                onClick={handleGoToTripPage}
                                className="w-34 h-14 bg-[#B1FF91] rounded-lg cursor-pointer hover:scale-110"
                            >
                                <span className="font-bold text-sm text-[#092064]">Página da viagem</span>
                            </button>
                            <button 
                                onClick={handleCopyInviteCode}
                                className="w-34 h-14 bg-[#B1FF91] rounded-lg cursor-pointer hover:scale-110"
                            >
                                <span className="font-bold text-sm text-[#092064]">Copiar código de convite</span>
                            </button>
                        </div>
                        
                        {/* Mensagem de feedback inline */}
                        {copyMessage && (
                            <div className={`mt-4 px-4 py-2 text-sm font-medium ${
                                copyMessage.type === 'success' 
                                    ? 'absolut top-full text-green-600 font-semibold bg-white px-3 rounded shadow' 
                                    : 'absolut top-full text-red-800 font-semibold bg-white px-3 rounded shadow'
                            }`}>
                                {copyMessage.text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
}