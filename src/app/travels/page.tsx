'use client';

import SidebarMenu from '@/components/ui/SidebarMenu';
import { IconButton } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
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
            },
            {
                id_usuario: 2,
                nome: "Lucas Silva Souza",
                email: "lucas@email.com.br",
                tipo: "Participante",
            },
            {
                id_usuario: 3,
                nome: "Joana",
                email: "joana@email.com.br",
                tipo: "Participante",
            },
        ],

    };

    const [imagens, setImagens] = useState([
        "/images-home_page/carousel/rifaina-capa.png", // Imagem inicial
    ]);

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-[#0F2976]">
                <div className="absolute top-22 ml-5 items-center justify-center w-1/5 h-18 p-4 bg-[#1C4CDC]" />

                <div className="absolute top-20 items-center justify-center w-1/5 h-18 p-4 bg-white">
                    <h1 className="text-2xl font-bold text-center text-[#0F2976]">{detalhesViagem.viagem.nome}</h1>
                </div>

                <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 mt-50 w-4/5 h-4/5">

                    <div className="flex flex-row w-full h-full justify-between items-center">

                        <div className="grid grid-cols-2 gap-4 overflow-x-auto">
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
                                    className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300"
                                >
                                    <Plus />
                                </button>
                            )}

                            {isModalOpen && (
                                <Modal isOpen={isModalOpen}>
                                    <div className='relative w-full h-20 items-centes'>
                                        {/* Primeira div */}
                                        <div className="absolute mt-5 ml-10 w-1/3 h-18 p-4 bg-[#1C4CDC]" />

                                        {/* Segunda div sobreposta */}
                                        <div className=" absolute h-18  w-1/3 p-4 bg-[#0F2976]">
                                            <h1 className="text-md font-bold text-center text-white">Promover Organizador</h1>
                                        </div>
                                    </div>
                                    

                                    <div className="flex flex-col p-6 rounded-lg w-full">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="w-8 h-8" />
                                        </button>

                                        {/* Lista de usuários */}
                                        <div className="flex flex-col gap-4">
                                            {detalhesViagem.usuario.map((usuario) => (
                                                <div
                                                    key={usuario.id_usuario}
                                                    className="flex items-center justify-between border-b pb-2"
                                                >
                                                    <div>
                                                        <p className="font-bold">{usuario.nome}</p>
                                                        <p className="text-sm text-gray-500">{usuario.email}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {/* Botão para promover */}
                                                        <button
                                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                            onClick={() => {
                                                                if (!imagens.includes(`/images-home_page/carousel/${usuario.nome}.png`)) {
                                                                    setImagens([
                                                                        ...imagens,
                                                                        `/images-home_page/carousel/${usuario.nome}.png`,
                                                                    ]);
                                                                }
                                                                setIsModalOpen(false); // Fecha o modal
                                                            }}
                                                        >
                                                            Promover
                                                        </button>

                                                        {/* Botão para remover */}
                                                        <button
                                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                            onClick={() => {
                                                                setImagens(
                                                                    imagens.filter(
                                                                        (img) => img !== `/images-home_page/carousel/${usuario.nome}.png`
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Modal>
                            )}
                        </div>

                        {/* Div com o gradiente */}
                        <div className="flex items-center justify-center w-2/3 h-2/3">
                            <div className="w-3/4 h-1/2 justify-center bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] rounded-lg">

                            </div>
                        </div>

                        {/* Div com os botões */}
                        <div className="flex flex-col h-full justify-center ">
                            <div className="flex gap-4">
                                <IconButton
                                    icon={<List className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                                <IconButton
                                    icon={<img src="\images-travel\Icons\IconTransport.png" className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                                <IconButton
                                    icon={<img src="\images-travel\Icons\IconItinerary.png" className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                            </div>

                            <div className="flex gap-4 mt-4">
                                <IconButton
                                    icon={<img src="\images-travel\Icons\IconBudget.png" className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                                <IconButton
                                    icon={<img src="\images-travel\Icons\IconMessage.png" className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                                <IconButton
                                    icon={<img src="\images-travel\Icons\IconAlert.png" className="w-12 h-12" />}
                                    onClick={() => alert("Botão clicado!")}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='mt-20'></div>
        </div>
    );
}