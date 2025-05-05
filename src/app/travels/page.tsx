'use client';

import SidebarMenu from '@/components/ui/SidebarMenu';
import { IconButton } from '@/components/ui/button';
import { List, Plus } from 'lucide-react';
import { useState } from 'react';

export default function DetailsPage() {

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
                nome: "Lucas Silva",
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
                        {/* Div com o gradiente */}
                        <div className="flex items-center justify-center w-full h-2/3">
                            <div className="w-1/2 h-1/2 bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] rounded-lg">

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