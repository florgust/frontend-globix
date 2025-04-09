'use client';

import { useState } from 'react';

export default function DetailsPage() {
  const [activeTab, setActiveTab] = useState('Convidados'); // Estado para alternar entre os botões

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative"></div>
        <div className="absolute top-[7.563rem] left-[48.3rem] w-[24.375rem] h-[3.75rem] bg-[#1C4CDC]"></div> {/* Retângulo de fundo azul */}
        <h1 className="flex justify-center items-center text-3xl font-bold mb-4 text-center bg-[#fffffd] text-[#0F2976] w-[24.375rem] h-[3.75rem] absolute top-[7.063rem]"> {/* Retângulo de fundo branco */}
          Viagem Rifania
        </h1>
        <img
          src="/images/praia.png"
          alt="Imagem"
          className="absolute w-[75.625rem] h-[13rem] top-[12.125rem] rounded-tl-[0.625rem] rounded-tr-[0.625rem]"
        /> {/* Posicionamento da imagem */}

        <div
          className="text-[1.25rem] absolute w-[75.625rem] h-[3.188rem] top-[22rem] left-[22.2rem] flex items-center px-4 text-[#FFFFFD] bg-[#F5EFEF]/30"
        >
          Praia
        </div>

        <div
          className="absolute bg-white w-[75.625rem] h-[35.438rem] top-[25.125rem] rounded-bl-[3.125rem] rounded-br-[3.125rem] flex justify-between px-8"
        >
            {/* Parte Esquerda - Organizadores */}
            <div className="gap-y-[1rem] w-1/4 p-6 flex flex-col items-center mt-8">
            <h2 className="text-lg font-bold mb-4 rounded-full bg-[#D9D9D9] text-[#0F2976] px-3 py-1 text-[1.5rem]">Organizadores</h2>
            <div className="gap-x-[2rem] grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                  src="/images/usuario.png" 
                  alt="Usuário" 
                  className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <p className="text-[#292D32] font-medium text-[0.875rem]">Mauro Borges</p>
              </div>
                <button 
                className="flex flex-col items-center justify-center"
                >
                <div className="hover:scale-110 transition-transform cursor-pointer w-13 h-13 rounded-full bg-gray-200 flex items-center justify-center mb-2 self-center">
                  <img 
                  src="/mais.svg" 
                  alt="Adicionar" 
                  className="w-6 h-6" 
                  />
                </div>
                <span className="text-[#292D32] font-medium text-[0.688rem] whitespace-nowrap">Adicionar Organizador</span>
              </button>
            </div>
            </div>

            {/* Parte Central - Convidados e Solicitações */}
            <div className="w-[30rem] p-6 flex-col items-center mt-8">
            <div className="flex justify-center gap-0 mb-6">
              <button
              className={`text-[1.5rem] cursor-pointer px-4 py-2 font-bold rounded-l-full focus:outline-none ${
              activeTab === 'Convidados'
              ? 'bg-[#1C4CDC] text-white'
              : 'bg-[#D9D9D9] text-[#0F2976]'
              }`}
              onClick={() => setActiveTab('Convidados')}
              >
              Convidados
              </button>
              <button
              className={`text-[1.5rem] cursor-pointer px-4 py-2 font-bold rounded-r-full focus:outline-none ${
              activeTab === 'Solicitações'
              ? 'bg-[#1C4CDC] text-white'
              : 'bg-[#D9D9D9] text-[#0F2976]'
              }`}
              onClick={() => setActiveTab('Solicitações')}
              >
              Solicitações
              </button>
            </div>

            {/* Conteúdo dinâmico com base no botão ativo */}
            <div className="bg-blue-600 p-4 rounded-lg text-white h-[15rem] overflow-y-auto">
              {activeTab === 'Convidados' ? (
              <div>
              <div className="bg-white p-2 rounded-lg mb-2 flex items-center gap-4 w-[20rem]">
                <img 
                  src="/images/usuario.png" 
                  alt="Usuário" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-[#717130] text-[0.875rem]">Luan Glor Fustavo</span>
              </div>
              <div className="bg-white p-2 rounded-lg mb-2 flex items-center gap-4 w-[20rem]">
              <img 
              src="/images/usuario.png" 
              alt="Usuário" 
              className="w-10 h-10 rounded-lg"
              />
              <span className="text-[#717130] text-[0.875rem]">Arthur Ramos da Silva</span>
              </div>
              <div className="bg-white p-2 rounded-lg flex items-center gap-4 w-[20rem]">
              <img 
              src="/images/usuario.png" 
              alt="Usuário" 
              className="w-10 h-10 rounded-lg"
              />
              <span className="text-[#717130] text-[0.875rem]">Bárbara Cabo</span>
              </div>
              </div>
              ) : (
              <div>
              <div className="bg-white p-2 rounded-lg mb-2 flex items-center gap-4">
              <img 
              src="/images/usuario.png" 
              alt="Usuário" 
              className="w-10 h-10 rounded-lg"
              />
              <span className="text-[#717130] text-[0.875rem]">Luan Glor Fustavo</span>
              <div className="flex items-center gap-2 ml-auto">
                <button className="w-8 h-8">
                <img 
                src="/aceitar.svg" 
                alt="Aceitar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
                <button className="w-8 h-8">
                <img 
                src="/negar.svg" 
                alt="Negar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
              </div>
              </div>
              <div className="bg-white p-2 rounded-lg mb-2 flex items-center gap-4">
              <img 
              src="/images/usuario.png" 
              alt="Usuário" 
              className="w-10 h-10 rounded-lg"
              />
              <span className="text-[#717130] text-[0.875rem]">Arthur Ramos da Silva</span>
              <div className="flex items-center gap-2 ml-auto">
                <button className="w-8 h-8">
                <img 
                src="/aceitar.svg" 
                alt="Aceitar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
                <button className="w-8 h-8">
                <img 
                src="/negar.svg" 
                alt="Negar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
              </div>
              </div>
              <div className="bg-white p-2 rounded-lg flex items-center gap-4">
              <img 
              src="/images/usuario.png" 
              alt="Usuário" 
              className="w-10 h-10 rounded-lg"
              />
              <span className="text-[#717130] text-[0.875rem]">Bárbara Cabo</span>
              <div className="flex items-center gap-2 ml-auto">
                <button className="w-8 h-8">
                <img 
                src="/aceitar.svg" 
                alt="Aceitar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
                <button className="w-8 h-8">
                <img 
                src="/negar.svg" 
                alt="Negar" 
                className="w-full h-full cursor-pointer hover:scale-110 transition-transform"
                />
                </button>
              </div>
              </div>
              </div>
              )}
            </div>
            </div>
            {/* Parte Direita - Informações */}
            <div className="gap-y-[1rem] w-1/4 p-6 flex flex-col items-center mt-8">
            <h2 className="text-lg font-bold mb-4 text-[#0F2976] rounded-full bg-[#d9d9d9] px-3 py-1 text-[1.5rem]">Informações</h2>

            <div className="grid grid-cols-3 gap-x-[4rem] gap-y-[1rem]"> {/* Aumentado o espaçamento entre os botões */}
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] flex items-center justify-center text-white rounded-[1rem]">
            <img 
            src="/detalhes.svg" 
            alt="Mais Detalhes"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem] whitespace-nowrap">Mais Detalhes</p>

            </div>
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white">
            <img 
            src="/transporte.svg" 
            alt="Transporte"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">Transporte</p>

            </div>
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white">
            <img 
            src="/hospedagem.svg" 
            alt="Hospedagem"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">Hospedagem</p>

            </div>
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white">
            <img 
            src="/itinerarios.svg" 
            alt="Itinerários"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">Itinerários</p>

            </div>
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white">
            <img 
            src="/custos.svg" 
            alt="Custos"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">Custos</p>

            </div>
            <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white">
            <img 
            src="/alerta.svg" 
            alt="Alerta"
            />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">Alerta</p>
            
            </div>
            </div>
            </div>

          {/* Botão Editar */}
          <button className="text-[1.5rem] hover:scale-110 transition-transform cursor-pointer bg-[#d9d9d9] absolute bottom-4 left-6 px-15 py-3 rounded-full text-[#0F2976] font-bold">
            Editar
          </button>
        </div>
      </div>
  );
}