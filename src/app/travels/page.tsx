'use client';

import SidebarMenu from '@/components/ui/SidebarMenu';
import { UserList, RequestList } from '@/components/ui/UserList';
import { IconButton } from '@/components/ui/button';
import { Modal, PromoteOrganizerModal } from '@/components/ui/modal';
import { List, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function DetailsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                nome: "Lucas Silva",        
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
        ]
    };

    const [imagens, setImagens] = useState([
        "/images-home_page/carousel/carrossel.png", // Imagem inicial
    ]);

    const [activeButton, setActiveButton] = useState("convidados");

    const [convidados, setConvidados] = useState(detalhesViagem.usuario);
    const [solicitacoes, setSolicitacoes] = useState(detalhesViagem.solicitacoes);

    const handleAccept = (id: number) => {
        const usuarioAceito = solicitacoes.find((solicitacao) => solicitacao.id_usuario === id);
        if (usuarioAceito) {
            setConvidados([...convidados, usuarioAceito]); // Adiciona aos convidados
            setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id_usuario !== id)); // Remove das solicitações
        }
    };

    const handleDeny = (id: number) => {
        setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id_usuario !== id)); // Remove das solicitações
    };
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
                <div className="flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-180 mt-25 mb-30">

                    {/* capa */}
                    <img src="/images-travel/capa.png " alt="Description of the image " className='w-full h-80' />

                    <div className='p-10 w-full h-full'>
                        <div className="flex flex-row w-full h-full justify-between">

                            {/* Div com o Organizador */}

                            <div className="flex relative flex-col items-center h-full w-1/4">
                                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold text-2xl font-bold mb-10">Organizadores</h2>

                                <div className="grid grid-cols-2 gap-4 overflow-x-auto h-60">
                                    {imagens.map((imagem, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <img
                                                src={imagem}
                                                alt={`Imagem ${index + 1}`}
                                                className="w-25 h-25 object-cover rounded-full"
                                            />
                                            <button
                                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                                                onClick={() =>
                                                    setImagens(imagens.filter((_, i) => i !== index))
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ))}

                                    {/* Botão para adicionar mais Ornizadores Promovidos */}
                                    {imagens.length < 6 && (
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-20 shadow-md h-20 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300"
                                        >
                                            <Plus className='w-13 h-13 text-[#0F2976]' />
                                        </button>
                                    )}

                                    <PromoteOrganizerModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        usuarios={detalhesViagem.usuario}
                                        onPromote={(id) => {
                                            if (!imagens.includes(`/images-home_page/carousel/${id}.png`)) {
                                                setImagens([...imagens, `/images-home_page/carousel/${id}.png`]);
                                            }
                                            setIsModalOpen(false); // Fecha o modal
                                        }}
                                        onRemove={(id) => {
                                            setImagens(imagens.filter((img) => img !== `/images-home_page/carousel/${id}.png`));
                                        }}
                                    />
                                </div>
                            </div>


                            {/* Div com o gradiente */}
                            <div className="flex flex-col relative items-center justify-center w-full h-100 sm:w-2/3 sm:h-3/3">
                                <div className="absolute top-0 w-3/5 flex items-center justify-center bg-[#D9D9D9] rounded-full h-12 mb-4">
                                    {/* Fundo animado */}
                                    <div
                                        className={`absolute top-0 h-full w-2/4 bg-[#1C4CDC] rounded-full transition-all duration-300 ${activeButton === "convidados" ? "left-0" : "left-1/2"
                                            }`}
                                    ></div>

                                    {/* Botões */}
                                    <div className="relative flex w-2/3">
                                        <button
                                            className={`z-10 flex items-center justify-center w-1/2 py-2 pr-15 text-2xl font-bold transition-all duration-300 ${activeButton === "convidados"
                                                ? "text-white"
                                                : "text-[#0F2976]"
                                                }`}
                                            onClick={() => setActiveButton("convidados")}
                                        >
                                            Convidados
                                        </button>
                                        <button
                                            className={`z-10 w-1/2 py-2 pl-10 text-2xl font-bold transition-all duration-300 ${activeButton === "solicitacoes"
                                                ? "text-white"
                                                : "text-[#0F2976]"
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
                                            scrollbarWidth: "thin", // Para navegadores compatíveis
                                            scrollbarColor: "#fffff #0F2976", // Cor do polegar e do fundo
                                        }}
                                        className="w-3/5 p-4 pr-20 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                                    >
                                        <UserList usuarios={convidados} />
                                    </div>
                                )}

                                {activeButton === "solicitacoes" && (
                                    <div
                                        style={{
                                            scrollbarWidth: "thin", // Para navegadores compatíveis
                                            scrollbarColor: "#fffff #0F2976", // Cor do polegar e do fundo
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
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<List className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Mais Detalhes</p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconTransport.png"
                                                className="w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Transporte</p>

                                    </div>

                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconItinerary.png"
                                                className="w-w-20 h-20" />}
                                            onClick={() => alert("Botão clicado!")}
                                        />
                                        <p className="text-sm text-gray-500 mt-4">Itinerário</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-5">
                                    <div className="flex flex-col items-center">
                                        <IconButton
                                            icon={<img src="\images-travel\Icons\IconBudget.png"
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
                            </div>

                            <div className='w-1/7 text-[#0F2976] absolute bottom-15'>
                                <button className='w-full text-2xl font-bold text-center text-[#0F2976] bg-[#D9D9D9] rounded-full px-4 py-2 mt-4'>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20'></div>
        </div>
    );
}