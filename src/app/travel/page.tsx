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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center">Viagem Rifania</h1>
            <Image
                src="/images/praia.png"
                alt="Imagem"
                width={1210}
                height={208}
                style={{ borderRadius: "0.625rem 0.625rem 0 0" }}
            />
            <div className="bg-white w-[75.625rem] h-[35.438rem] rounded-bl-[3.125rem] rounded-br-[3.125rem] flex justify-between px-8">
                {/* Parte Esquerda - Organizadores */}
                <div className="w-1/4 p-6 flex flex-col items-center mt-8">
                    <h2 className="text-lg font-bold mb-4">Organizadores</h2>
                    <UserCard name="Mauro Borges" image="/images/usuario.png" />
                    <button className="flex flex-col items-center">
                        <div className="hover:scale-110 transition-transform cursor-pointer w-13 h-13 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                            <Image src="/travel/mais.svg" alt="Adicionar" width={24} height={24} />
                        </div>
                        <span>Adicionar Organizador</span>
                    </button>
                </div>

                {/* Parte Central - Convidados e Solicitações */}
                <div className="w-[30rem] p-6 flex-col items-center mt-8">
                    <TabSwitcher
                        tabs={['Convidados', 'Solicitações']}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <div className="bg-blue-600 p-4 rounded-lg text-white h-[15rem] overflow-y-auto">
                        {activeTab === 'Convidados' ? (
                            users.map((user) => <UserCard key={user.name} name={user.name} image={user.image} />)
                        ) : (
                            users.map((user) => (
                                <UserCard
                                    key={user.name}
                                    name={user.name}
                                    image={user.image}
                                    actions={
                                        <>
                                            <button>
                                                <Image src="/travel/aceitar.svg" alt="Aceitar" width={16} height={16} />
                                            </button>
                                            <button>
                                                <Image src="/travel/negar.svg" alt="Negar" width={16} height={16} />
                                            </button>
                                        </>
                                    }
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Parte Direita - Informações */}
                <div className="w-1/4 p-6 flex flex-col items-center mt-8">
                    <h2 className="text-lg font-bold mb-4">Informações</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {actions.map((action) => (
                            <ActionButton key={action.label} icon={action.icon} label={action.label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}