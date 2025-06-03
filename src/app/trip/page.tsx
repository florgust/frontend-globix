'use client';

import SidebarMenu from '@/components/ui/SidebarMenu';
import { UserList } from '@/components/ui/UserList';
import { IconButton } from '@/components/ui/button';
import { ModalItinerary } from '@/components/ui/modals/ModalItinerary';
import ModalMoreDetails from '@/components/ui/modals/ModalMoreDetails';
import ModalTransport from '@/components/ui/modals/ModalTransport';
import { Trip } from '@/types/trip';
import api from '@/utils/axios';
import { List } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalBudget from '@/components/ui/modals/ModalBudget';

interface UsuarioViagem {
    idViagem: number;
    idUsuario: number;
    papel: string;
    status: number;
}

interface Usuario {
    id: number;
    nome: string;
    email: string;
    status: number;
    tipo: string;
    foto?: string;
}

export default function DetailsPage() {

    const [isMoreDetailsOpen, setIsMoreDetailsModalOpen] = useState(false);
    const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
    const [isItineraryOpen, setIsItineraryModalOpen] = useState(false);
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false); // ADICIONE ESTA LINHA

    const [trip, setTrip] = useState<Trip | null>(null);
    const [organizadores, setOrganizadores] = useState<Usuario[]>([]);
    const [convidados, setConvidados] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const detalhesViagem = {
        itinerario: [
            {
                "id": 1,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Passeio de barco pelo rio",
                "dataHora": "2025-06-01T10:00:00",
                "descricao": "Passeio de barco para conhecer as belezas naturais do rio."
            },
            {
                "id": 2,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Almoço no restaurante Beira Rio",
                "dataHora": "2025-06-01T13:00:00",
                "descricao": "Almoço especial com pratos típicos da região."
            },
            {
                "id": 3,
                "idViagem": 1,
                "tipoEvento": "Visita",
                "titulo": "Visita ao centro histórico",
                "dataHora": "2025-06-01T15:00:00",
                "descricao": "Tour guiado pelo centro histórico da cidade."
            },
            {
                "id": 4,
                "idViagem": 1,
                "tipoEvento": "Trilha",
                "titulo": "Trilha ecológica",
                "dataHora": "2025-06-02T09:00:00",
                "descricao": "Caminhada por trilhas ecológicas com guia local."
            },
            {
                "id": 5,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Almoço no hotel",
                "dataHora": "2025-06-02T12:00:00",
                "descricao": "Almoço servido no restaurante do hotel."
            },
            {
                "id": 6,
                "idViagem": 1,
                "tipoEvento": "Atividade Livre",
                "titulo": "Tarde livre para atividades aquáticas",
                "dataHora": "2025-06-02T14:00:00",
                "descricao": "Tempo livre para aproveitar as atividades aquáticas do local."
            },
            {
                "id": 7,
                "idViagem": 1,
                "tipoEvento": "Jantar",
                "titulo": "Jantar de confraternização",
                "dataHora": "2025-06-02T20:00:00",
                "descricao": "Jantar especial para todos os participantes da viagem."
            },
            {
                "id": 8,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Visita à cachoeira",
                "dataHora": "2025-06-03T09:00:00",
                "descricao": "Caminhada até a cachoeira e banho refrescante."
            },
            {
                "id": 9,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Almoço no sítio",
                "dataHora": "2025-06-03T12:30:00",
                "descricao": "Almoço com comida caseira no sítio local."
            },
            {
                "id": 10,
                "idViagem": 1,
                "tipoEvento": "Atividade Livre",
                "titulo": "Tarde livre para descanso",
                "dataHora": "2025-06-03T15:00:00",
                "descricao": "Tempo livre para relaxar ou explorar a região."
            },
            {
                "id": 11,
                "idViagem": 1,
                "tipoEvento": "Jantar",
                "titulo": "Jantar temático",
                "dataHora": "2025-06-03T20:00:00",
                "descricao": "Jantar com música ao vivo e comidas típicas."
            },
            {
                "id": 12,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Passeio de bicicleta",
                "dataHora": "2025-06-04T08:30:00",
                "descricao": "Passeio guiado de bicicleta pela cidade."
            },
            {
                "id": 13,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Café da manhã especial",
                "dataHora": "2025-06-04T10:00:00",
                "descricao": "Café da manhã com produtos locais."
            },
            {
                "id": 14,
                "idViagem": 1,
                "tipoEvento": "Visita",
                "titulo": "Visita ao museu",
                "dataHora": "2025-06-04T14:00:00",
                "descricao": "Tour guiado pelo museu da cidade."
            },
            {
                "id": 15,
                "idViagem": 1,
                "tipoEvento": "Jantar",
                "titulo": "Jantar de despedida",
                "dataHora": "2025-06-04T19:30:00",
                "descricao": "Jantar especial de encerramento da viagem."
            },
            {
                "id": 16,
                "idViagem": 1,
                "tipoEvento": "Café da manhã",
                "titulo": "Café da manhã de encerramento",
                "dataHora": "2025-06-05T08:00:00",
                "descricao": "Última refeição juntos antes do retorno."
            },
            {
                "id": 17,
                "idViagem": 1,
                "tipoEvento": "Retorno",
                "titulo": "Viagem de volta",
                "dataHora": "2025-06-05T10:00:00",
                "descricao": "Embarque para retorno às cidades de origem."
            },
            {
                "id": 18,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Passeio de barco ao pôr do sol",
                "dataHora": "2025-06-06T17:00:00",
                "descricao": "Passeio relaxante de barco para ver o pôr do sol."
            },
            {
                "id": 19,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Jantar especial",
                "dataHora": "2025-06-06T20:00:00",
                "descricao": "Jantar com pratos típicos da região."
            },
            {
                "id": 20,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Visita ao parque ecológico",
                "dataHora": "2025-06-07T09:00:00",
                "descricao": "Caminhada e atividades no parque ecológico."
            },
            {
                "id": 21,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Almoço de confraternização",
                "dataHora": "2025-06-07T12:00:00",
                "descricao": "Almoço de encerramento da viagem."
            },
            {
                "id": 22,
                "idViagem": 1,
                "tipoEvento": "Atividade Livre",
                "titulo": "Tarde livre para compras",
                "dataHora": "2025-06-08T15:00:00",
                "descricao": "Tempo livre para compras e passeios pela cidade."
            },
            {
                "id": 23,
                "idViagem": 1,
                "tipoEvento": "Jantar",
                "titulo": "Jantar de despedida",
                "dataHora": "2025-06-08T20:00:00",
                "descricao": "Jantar especial de despedida do grupo."
            },
            {
                "id": 24,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Tour cultural",
                "dataHora": "2025-06-09T09:00:00",
                "descricao": "Visita a pontos turísticos e culturais."
            },
            {
                "id": 25,
                "idViagem": 1,
                "tipoEvento": "Refeição",
                "titulo": "Almoço no centro histórico",
                "dataHora": "2025-06-09T13:00:00",
                "descricao": "Almoço em restaurante tradicional no centro histórico."
            },
            {
                "id": 26,
                "idViagem": 1,
                "tipoEvento": "Atividade Livre",
                "titulo": "Noite livre",
                "dataHora": "2025-06-09T20:00:00",
                "descricao": "Noite livre para aproveitar a cidade."
            },
            {
                "id": 27,
                "idViagem": 1,
                "tipoEvento": "Passeio",
                "titulo": "Passeio de despedida",
                "dataHora": "2025-06-10T10:00:00",
                "descricao": "Último passeio antes do retorno."
            },
            {
                "id": 28,
                "idViagem": 1,
                "tipoEvento": "Retorno",
                "titulo": "Viagem de volta",
                "dataHora": "2025-06-10T15:00:00",
                "descricao": "Retorno para casa."
            }
        ]
    };

    useEffect(() => {
        async function fetchData() {
            if (typeof window !== "undefined") {
                const storedTrip = localStorage.getItem("selectedTrip");
                if (storedTrip) {
                    const tripObj = JSON.parse(storedTrip);
                    setTrip(tripObj);

                    // 1. Buscar solicitações da viagem
                    console.log("Buscando solicitações para a viagem:", tripObj.id);
                    const { data: solicitacoes } = await api.get(`/solicitacoes/viagem/${tripObj.id}`);
                    console.log("Solicitações encontradas:", solicitacoes);

                    // 2. Buscar dados completos dos usuários
                    const usuariosPromises = solicitacoes.map(async (sol: UsuarioViagem) => {
                        const { data: usuario } = await api.get(`/usuario/${sol.idUsuario}`);
                        return {
                            ...usuario,
                            papel: sol.papel,
                            status: sol.status
                        };
                    });
                    const usuariosCompletos: Usuario[] = await Promise.all(usuariosPromises);
                    console.log("Usuários completos:", usuariosCompletos);

                    // 3. Separar organizadores e convidados
                    setOrganizadores(
                        usuariosCompletos.filter(
                            u => ["organizador", "organizadorpromovido"].includes((u.tipo || "").toLowerCase())
                        )
                    );
                    setConvidados(
                        usuariosCompletos
                            .filter(
                                u => u.status == 1 && !["organizador", "organizadorpromovido"].includes((u.tipo || "").toLowerCase())
                            )
                            .map(u => ({
                                ...u,
                                foto: u.foto || "/user.png"
                            }))
                    );
                }
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const closeAllModals = () => {
        setIsTransportModalOpen(false);
        setIsMoreDetailsModalOpen(false);
        setIsItineraryModalOpen(false);
        setIsBudgetModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] items-center justify-center">
                <span className="text-white text-xl">Carregando...</span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-[#0F2976]">
                <img src="/images-home_page/logo-globix.png" className='ml-auto mr-5 mt-5' />

                <div className="absolute top-17 ml-5 items-center justify-center w-1/5 h-18 p-4 bg-[#1C4CDC]" />

                <div className="absolute top-15 items-center justify-center w-1/5 h-18 p-4 bg-white">
                    <h1 className="text-4xl font-bold text-center text-[#0F2976]">{trip?.nome}</h1>
                </div>

                {/* div branca */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-190 mt-25 mb-30">

                    {/* capa */}
                    <img src={trip?.imagem || "/images-travel/capa.png"} alt={trip?.nome || "Capa da viagem"} className='w-full h-80' />

                    <div className='p-10 w-full h-full'>
                        <div className="flex flex-row w-full justify-between">

                            {/* Div com o Organizador */}
                            <div className="flex relative flex-col items-center w-1/4">
                                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold mb-10">Organizadores</h2>
                                <div className="grid grid-cols-2 gap-2 overflow-x-auto h-60">
                                    {organizadores.map((usuario) => (
                                        <div key={usuario.id} className="flex flex-col items-center">
                                            <img
                                                src={usuario.foto || "/user.png"}
                                                alt={usuario.nome}
                                                className="w-23 h-23 object-cover rounded-full"
                                            />
                                            <p className="mt-2 text-sm text-[#292D32]">{usuario.nome}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Div com o gradiente */}
                            <div className="flex flex-col relative items-center justify-center w-full h-100 sm:w-2/3 sm:h-3/3">
                                <div className="relative w-[15rem] flex items-center justify-center bg-[#D9D9D9] rounded-full h-12 mb-10">
                                    <div className="flex w-full justify-center items-center">
                                        <button
                                            className="z-10 w-1/2 py-2 text-2xl font-bold transition-all duration-300 text-[#0F2976] flex justify-center items-center"
                                        >
                                            Convidados
                                        </button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#fffff #0F2976",
                                    }}
                                    className="w-3/5 p-4 pr-20 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                                >
                                    <UserList usuarios={convidados} />
                                </div>
                            </div>

                            {/* Div com os botões */}
                            <div className="flex relative flex-col items-center h-full w-1/4">
                                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold mb-10">Informações</h2>
                                <div className="flex gap-4">
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <IconButton
                                                icon={<List className="w-20 h-20" />}
                                                onClick={() => setIsMoreDetailsModalOpen(true)}
                                            />
                                            <p className="text-sm text-gray-500 mt-4">Mais Detalhes</p>
                                        </div>
                                        <ModalMoreDetails
                                            isOpen={isMoreDetailsOpen}
                                            onClose={() => setIsMoreDetailsModalOpen(false)}
                                            onNavigate={(target) => {
                                                closeAllModals();
                                                if (target === 'itinerary') setIsItineraryModalOpen(true);
                                                if (target === 'transport') setIsTransportModalOpen(true);
                                                if (target === 'budget') setIsBudgetModalOpen(true);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-20 h-20" />}
                                            onClick={() => {
                                                closeAllModals();
                                                setIsTransportModalOpen(true);
                                            }}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Transporte</p>
                                        <ModalTransport
                                            isOpen={isTransportModalOpen}
                                            onClose={() => setIsTransportModalOpen(false)}
                                            onNavigate={(target) => {
                                                closeAllModals();
                                                if (target === 'itinerary') setIsItineraryModalOpen(true);
                                                if (target === 'details') setIsMoreDetailsModalOpen(true);
                                                if (target === 'budget') setIsBudgetModalOpen(true);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="/images-travel/Icons/IconGreenItinerary.png"
                                                className="w-w-20 h-20" />}
                                            onClick={() => setIsItineraryModalOpen(true)}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Itinerário</p>
                                        <ModalItinerary
                                            isOpen={isItineraryOpen}
                                            onClose={() => setIsItineraryModalOpen(false)}
                                            onNavigate={(target) => {
                                                closeAllModals();
                                                if (target === 'transport') setIsTransportModalOpen(true);
                                                if (target === 'details') setIsMoreDetailsModalOpen(true);
                                                if (target === 'budget') setIsBudgetModalOpen(true);
                                            }}
                                            itinerario={detalhesViagem.itinerario}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <IconButton
                                                icon={<img src="\images-travel\Icons\IconGreenBudget.png"
                                                className="w-w-20 h-20" />}
                                                onClick={() => setIsBudgetModalOpen(true)}
                                            />
                                            <p className="text-sm text-gray-500 mt-4">Orçamento</p>
                                        </div>

                                        <ModalBudget
                                            isOpen={isBudgetModalOpen}
                                            onClose={() => setIsBudgetModalOpen(false)}
                                            onNavigate={(target) => {
                                                closeAllModals();
                                                if (target === 'itinerary') setIsItineraryModalOpen(true);
                                                if (target === 'transport') setIsTransportModalOpen(true);
                                                if (target === 'details') setIsMoreDetailsModalOpen(true);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="/images-travel/Icons/IconMessage.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Mensagem</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="/images-travel/Icons/IconAlert.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Avisos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between mt-8'>
                            <button className='text-2xl font-bold bg-[#FF2626] text-[#FFFFFF] rounded-full w-60 py-3 hover:bg-gray-500 cursor-pointer'>
                                Sair da viagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20'></div>
        </div>
    );
}