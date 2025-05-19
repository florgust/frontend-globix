'use client';

import SidebarMenu from '@/components/ui/SidebarMenu';
import { UserList, RequestList } from '@/components/ui/UserList';
import { IconButton } from '@/components/ui/button';
import ModalEditTrip from '@/components/ui/modals/ModalEditTrip';
import { ModalItinerary } from '@/components/ui/modals/ModalItinerary';
import ModalMoreDetails from '@/components/ui/modals/ModalMoreDetails';
import { ModalPromoteOrganizer } from '@/components/ui/modals/ModalPromoteOrganizer';
import ModalTransport from '@/components/ui/modals/ModalTransport';
import { List, Plus } from 'lucide-react';
import { useState } from 'react';

export default function DetailsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isItineraryOpen, setIsItineraryOpen] = useState(false);


    async function promoverUsuario(id_usuario: number) {
        await fetch(`/api/usuarios/${id_usuario}/promover`, {
            method: "POST",
        });
    }

    async function removerUsuario(id_usuario: number) {
        await fetch(`/api/usuarios/${id_usuario}/remover`, {
            method: "POST",
        });
    }

    const handleEdit = (option: string) => {
        console.log(`Opção selecionada para edição: ${option}`);
        setIsEditModalOpen(false);
    };

    const handleAccept = async (id: number) => {
        await fetch(`/api/viagens/aceitar-solicitacao`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario: id, id_viagem: detalhesViagem.viagem.id_viagem }),
        });

        const usuarioAceito = solicitacoes.find((solicitacao) => solicitacao.id_usuario === id);
        if (usuarioAceito) {
            setConvidados([...convidados, usuarioAceito]);
            setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id_usuario !== id));
        }
    };

    const handleDeny = (id: number) => {
        setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id_usuario !== id)); // Remove das solicitações
    };

    const detalhesViagem = {
        viagem: {
            id_viagem: 1,
            nome: "Viagem Rifaina",
            criador_id: 1,
            descricao: "Uma viagem incrível para Rifaina, cheia de aventuras e diversão.",
            data_inicio: "2025-06-01",
            data_fim: "2025-06-07",
            imagem_capa: "/images-home_page/carousel/rifaina-capa.png"
        },
        usuario_viagem: [
            {
                id_usuario: 1,
                id_viagem: 1,
                papel: "Organizador",
            },
            {
                id_usuario: 2,
                id_viagem: 1,
                papel: "Participante"
            },
            {
                id_usuario: 3,
                id_viagem: 1,
                papel: "OrganizadorPromovido",
            }
        ],
        usuario: [
            {
                id_usuario: 1,
                nome: "Mauro Borges",
                email: "mauro@email.com.br",
                tipo: "Organizador",
                foto: "/images-travel/images-user/user_mauro.png",
            },
            {
                id_usuario: 2,
                nome: "Lucas Silva Souza",
                email: "lucas@email.com.br",
                tipo: "OrganizadorPromovido",
                foto: "/images-travel/images-user/user_patrick.png",
            },
            {
                id_usuario: 3,
                nome: "Joana",
                email: "joana@email.com.br",
                tipo: "Participante",
                foto: "/images-travel/images-user/user_patrick.png",
            },
            {
                id_usuario: 4,
                nome: "Luan",
                email: "luan@email.com.br",
                tipo: "Participante",
                foto: "/images-travel/images-user/user_luan.png",
            },
        ],
        solicitacoes: [
            {
                "id_usuario": 5,
                "nome": "Ana Paula",
                "email": "ana.paula@email.com.br",
                "tipo": "Solicitante",
                "foto": "/images-travel/images-user/user_ana.png",
                "tipo_solicitacao": 1,
            },
            {
                "id_usuario": 6,
                "nome": "Carlos Eduardo",
                "email": "carlos.eduardo@email.com.br",
                "tipo": "Solicitante",
                "foto": "/images-travel/images-user/user_carlos.png",
                "tipo_solicitacao": 1,
            },
            {
                "id_usuario": 7,
                "nome": "Fernanda Lima",
                "email": "fernanda.lima@email.com.br",
                "tipo": "Solicitante",
                "foto": "/images-travel/images-user/user_fernanda.png",
                "tipo_solicitacao": 1,
            }
        ],
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

    const [imagens, setImagens] = useState([
        "/images-home_page/carousel/carrossel.png", // Imagem inicial
    ]);

    const [activeButton, setActiveButton] = useState("convidados");
    const [convidados, setConvidados] = useState(detalhesViagem.usuario);
    const [solicitacoes, setSolicitacoes] = useState(detalhesViagem.solicitacoes);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
    const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-[#0F2976]">
                <img src="/images-home_page/logo-globix.png" className='ml-auto mr-5 mt-5' />

                <div className="absolute top-17 ml-5 items-center justify-center w-1/5 h-18 p-4 bg-[#1C4CDC]" />

                <div className="absolute top-15 items-center justify-center w-1/5 h-18 p-4 bg-white">
                    <h1 className="text-4xl font-bold text-center text-[#0F2976]">{detalhesViagem.viagem.nome}</h1>
                </div>

                {/* div branca */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-190 mt-25 mb-30">

                    {/* capa */}
                    <img src="/images-travel/capa.png " alt="Description of the image " className='w-full h-80' />

                    <div className='p-10 w-full h-full'>
                        <div className="flex flex-row w-full justify-between">

                            {/* Div com o Organizador */}

                            <div className="flex relative flex-col items-center w-1/4">
                                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold text-2xl font-bold mb-10">Organizadores</h2>

                                <div className="grid grid-cols-2 gap-2 overflow-x-auto h-60">
                                    {convidados
                                        .filter(usuario => usuario.tipo === "Organizador" || usuario.tipo === "OrganizadorPromovido")
                                        .map((usuario) => (
                                            <div key={usuario.id_usuario} className="flex flex-col items-center">
                                                <img
                                                    src={usuario.foto}
                                                    alt={usuario.nome}
                                                    className="w-23 h-23 object-cover rounded-full"
                                                />
                                                <p className="mt-2 text-sm text-[#292D32]">{usuario.nome}</p>
                                            </div>
                                        ))}

                                    {/* Botão para adicionar mais Ornizadores Promovidos */}
                                    {imagens.length < 6 && (
                                        <div className='flex flex-col w-full items-center'>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="w-19 shadow-md h-19 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300 cursor-pointer"
                                            >
                                                <Plus className='w-12 h-12 text-[#0F2976]' />

                                            </button>
                                            <p className="mt-2 text-xs text-[#292D32] whitespace-nowrap">Adicionar Organizador</p>
                                        </div>
                                    )}

                                    <ModalPromoteOrganizer
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        usuarios={detalhesViagem.usuario}
                                        onPromote={async (id) => {
                                            // Atualiza o tipo do usuário para "OrganizadorPromovido"
                                            await promoverUsuario(id);
                                            setConvidados(convidados.map(usuario =>
                                                usuario.id_usuario === id
                                                    ? { ...usuario, tipo: "OrganizadorPromovido" }
                                                    : usuario
                                            ));
                                            if (!imagens.includes(`/images-home_page/carousel/${id}.png`)) {
                                                setImagens([...imagens, `/images-home_page/carousel/${id}.png`]);
                                            }
                                            setIsModalOpen(false);
                                        }}
                                        onRemove={async (id) => {
                                            await removerUsuario(id);
                                            setConvidados(convidados.map(usuario =>
                                                usuario.id_usuario === id
                                                    ? { ...usuario, tipo: "Participante" }
                                                    : usuario
                                            ));
                                            setImagens(imagens.filter((img) => img !== `/images-home_page/carousel/${id}.png`));

                                        }}
                                    />
                                </div>
                            </div>


                            {/* Div com o gradiente */}
                            <div className="flex flex-col relative items-center justify-center w-full h-100 sm:w-2/3 sm:h-3/3">
                                <div className="relative w-3/5 flex items-center justify-center bg-[#D9D9D9] rounded-full h-12 mb-10">
                                    {/* Fundo azul animado */}
                                    <div
                                        className={`absolute top-0 left-0 h-12 w-1/2 bg-[#1C4CDC] transition-all duration-300
                                        ${activeButton === "convidados" ? "rounded-l-full" : "left-1/2 rounded-r-full"}`}
                                    ></div>
                                    {/* Botões */}
                                    <div className="relative flex w-full">
                                        <button
                                            className={`z-10 w-1/2 py-2 text-2xl font-bold transition-all duration-300  ${activeButton === "convidados"
                                                ? "text-white "
                                                : "text-[#0F2976] cursor-pointer"
                                                }`}
                                            onClick={() => setActiveButton("convidados")}
                                        >
                                            Convidados
                                        </button>
                                        <button
                                            className={`z-10 w-1/2 py-2 text-2xl font-bold transition-all duration-300 ${activeButton === "solicitacoes"
                                                ? "text-white"
                                                : "text-[#0F2976] cursor-pointer"
                                                }`}
                                            onClick={() => setActiveButton("solicitacoes")}
                                        >
                                            Solicitações
                                        </button>
                                    </div>
                                </div>

                                {/* Conteúdo condicional */}
                                {activeButton === "convidados" && (
                                    <div
                                        style={{
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "#fffff #0F2976",
                                        }}
                                        className="w-3/5 p-4 pr-20 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                                    >
                                        <UserList usuarios={convidados} />
                                    </div>
                                )}

                                {activeButton === "solicitacoes" && (
                                    <div
                                        style={{
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "#fffff #0F2976",
                                        }}
                                        className="w-3/5 p-4 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                                    >
                                        <RequestList
                                            solicitacoes={solicitacoes}
                                            onAccept={handleAccept}
                                            onDeny={handleDeny}
                                        />
                                    </div>
                                )}

                            </div>

                            {/* Div com os botões */}
                            <div className="flex relative flex-col items-center h-full w-1/4">

                                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold text-2xl font-bold mb-10">Informações</h2>

                                <div className="flex gap-4">
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <IconButton
                                                icon={<List className="w-20 h-20" />}
                                                onClick={() => setIsMoreDetailsOpen(true)}
                                            />
                                            <p className="text-sm text-gray-500 mt-4">Mais Detalhes</p>
                                        </div>

                                        {/* Modal de Mais Detalhes */}
                                        <ModalMoreDetails
                                            isOpen={isMoreDetailsOpen}
                                            onClose={() => setIsMoreDetailsOpen(false)}
                                        />
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-20 h-20" />}
                                            onClick={() => setIsTransportModalOpen(true)} // Abre o modal
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Transporte</p>

                                        {/* Modal de Transporte */}
                                        <ModalTransport
                                            isOpen={isTransportModalOpen}
                                            onClose={() => setIsTransportModalOpen(false)} // Fecha o modal
                                        />
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconGreenItinerary.png"
                                                className="w-w-20 h-20" />}
                                            onClick={() => setIsItineraryOpen(true)}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Itinerário</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-5">
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconGreenBudget.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Orçamento</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconMessage.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Mensagem</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconAlert.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Avisos</p>
                                    </div>
                                </div>

                                <ModalItinerary
                                    isOpen={isItineraryOpen}
                                    onClose={() => setIsItineraryOpen(false)}
                                    itinerario={detalhesViagem.itinerario}
                                />
                            </div>

                        </div>
                        <div className='w-full flex justify-between mt-8'>
                            <button className='text-2xl font-bold bg-[#D9D9D9] text-[#0F2976] rounded-full w-60 py-3 hover:bg-gray-300 cursor-pointer'
                                    onClick={() => setIsEditModalOpen(true)}
                            >
                                Editar
                            </button>
                            
                            <button className='text-2xl font-bold bg-blue-900 text-white rounded-full w-60 py-3 hover:bg-blue-800 cursor-pointer'>
                                Encerrar Viagem
                            </button>

                            <ModalEditTrip
                                isOpen={isEditModalOpen}
                                onClose={() => setIsEditModalOpen(false)}
                                onEdit={handleEdit}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20'></div>
        </div>
    );
}