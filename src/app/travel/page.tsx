'use client';

import { useState } from 'react';
import Image from 'next/image';
import UserCard from '../components/UserCards';
import TabSwitcher from '../components/TabSwitcher';
import ActionButton from '../components/ActionButtons';

export default function DetailsPage() {
    const [activeTab, setActiveTab] = useState('Convidados');

    const users = [
        { name: 'Luan Glor Fustavo', image: '/images/usuario.png' },
        { name: 'Arthur Ramos da Silva', image: '/images/usuario.png' },
        { name: 'Bárbara Cabo', image: '/images/usuario.png' },
    ];

    const actions = [
        { icon: '/details/detalhes.svg', label: 'Mais Detalhes' },
        { icon: '/details/transporte.svg', label: 'Transporte' },
        { icon: '/details/hospedagem.svg', label: 'Hospedagem' },
        { icon: '/details/itinerarios.svg', label: 'Itinerários' },
        { icon: '/details/custos.svg', label: 'Custos' },
        { icon: '/details/alerta.svg', label: 'Alerta' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative bg-[#0F2976]">
            {/* Título com fundo azul */}
            <div className="flex flex-col items-center w-full mt-6 mb-4">
                <div className="relative flex items-center justify-center w-[24.375rem] h-[3.75rem]">
                    <div className="absolute w-full h-full bg-[#1C4CDC] rounded-lg"></div>
                    <h1 className="relative text-3xl font-bold text-center bg-[#fffffd] text-[#0F2976] border-2 border-[#1C4CDC] rounded-lg w-full h-full flex items-center justify-center">
                        Viagem Rifania
                    </h1>
                </div>
            </div>

            {/* Imagem principal */}
            <Image
                src="/images/praia.png"
                alt="Imagem"
                width={1210}
                height={208}
                className="absolute top-[12.125rem] w-[75.625rem] h-[13rem] rounded-tl-[0.625rem] rounded-tr-[0.625rem]"
            />
            <div className="absolute top-[22rem] left-[50%] translate-x-[-50%] w-[75.625rem] h-[3.188rem] flex items-center px-4 text-[#FFFFFD] bg-[#F5EFEF]/30">
                Praia
            </div>

            {/* Conteúdo principal */}
            <div className="absolute top-[25.125rem] bg-white w-[75.625rem] h-[35.438rem] rounded-bl-[3.125rem] rounded-br-[3.125rem] flex justify-between px-8">
                {/* Parte Esquerda - Organizadores */}
                <div className="w-1/4 p-6 flex flex-col items-center mt-8">
                    <h2 className="text-lg font-bold mb-4 rounded-full bg-[#D9D9D9] text-[#0F2976] px-3 py-1 text-[1.5rem]">
                        Organizadores
                    </h2>
                    <UserCard name="Mauro Borges" image="/images/usuario.png" />
                    <button className="flex flex-col items-center mt-4">
                        <div className="hover:scale-110 transition-transform cursor-pointer w-13 h-13 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                            <Image src="/travel/mais.svg" alt="Adicionar" width={24} height={24} />
                        </div>
                        <span className="text-[#292D32] font-medium text-[0.688rem] whitespace-nowrap">
                            Adicionar Organizador
                        </span>
                    </button>
                </div>

                {/* Parte Central - Convidados e Solicitações */}
                <div className="w-[30rem] p-6 flex flex-col items-center mt-8">
                    <TabSwitcher
                        tabs={['Participante', 'Solicitações']}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <div className="bg-blue-600 p-4 rounded-lg text-white h-[15rem] overflow-y-auto">
                        {activeTab === 'Participante' ? (
                            users.map((user) => (
                                <UserCard key={user.name} name={user.name} image={user.image} />
                            ))
                        ) : (
                            users.map((user) => (
                                <UserCard
                                    key={user.name}
                                    name={user.name}
                                    image={user.image}
                                    actions={
                                        <div className="flex gap-2 mt-2">
                                            <button className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md shadow-md transition-all">
                                                <Image
                                                    src="/travel/aceitar.svg"
                                                    alt="Aceitar"
                                                    width={16}
                                                    height={16}
                                                />
                                            </button>
                                            <button className=" cursor-pointer flex items-center gap-2 bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-md shadow-md transition-all">
                                                <Image
                                                    src="/travel/negar.svg"
                                                    alt="Negar"
                                                    width={16}
                                                    height={16}
                                                />
                                            </button>
                                        </div>
                                    }
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Parte Direita - Informações */}
                <div className="w-1/4 p-6 flex flex-col items-center mt-8">
                    <h2 className="text-lg font-bold mb-4 text-[#0F2976] rounded-full bg-[#D9D9D9] px-3 py-1 text-[1.5rem]">
                        Informações
                    </h2>
                    <div className="grid grid-cols-3 gap-x-[4rem] gap-y-[1rem]">
                        {actions.map((action) => (
                            <ActionButton key={action.label} icon={action.icon} label={action.label} />
                        ))}
                    </div>
                </div>

                {/* Botão Editar */}
                <button className="text-[1.5rem] hover:scale-110 transition-transform cursor-pointer bg-[#D9D9D9] absolute bottom-4 left-6 px-15 py-3 rounded-full text-[#0F2976] font-bold">
                    Editar
                </button>
            </div>
        </div>
    );
}