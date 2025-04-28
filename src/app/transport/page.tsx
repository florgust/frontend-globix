"use client";

import React from "react";

const AlertModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start">
      <div
        className="absolute bg-white shadow-lg p-6 w-[65.375rem] h-[46.688rem] rounded-[1.25rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-between items-center mb-4 mt-10">
          <button
            className="ml-10 hover:scale-110 transition-transform cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => (window.location.href = "/travel")}
          >
            <img
              src="seta.svg"
              alt="Voltar"
              className="w-[5rem] h-[5rem]" // 80px em rem
            />
          </button>
          <div className="absolute top-[5.2rem] ml-127 transform -translate-x-1/2 w-[24.375rem] h-[3.75rem] bg-[#1C4CDC]"></div>
          <h2
            className="text-[2.5rem] font-bold text-[#00FF4D] text-center mx-auto w-[24.375rem] h-[3.75rem] bg-[#0F2976] flex items-center justify-center absolute left-1/2 transform -translate-x-1/2"
          >
            Transporte
          </h2>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex justify-between mt-10">
          {/* Detalhes do Transporte */}
          <div className="flex items-start w-1/2 ml-15">
            <img
              src="/icone-pag-transporte.svg"
              alt="Ícone Transporte"
              className="mr-4 flex-shrink-0"
            />
            <img
              src="/onibus.svg"
              alt="Ônibus"
              className="absolute left-22 w-[7rem] h-[10rem]"
            />
            <img
              src="/linha-branca.svg"
              alt="Linha Branca"
              className="absolute left-22 top-[18.4rem] w-[7rem] h-[1rem]"
            />
            <div className="flex flex-col ml-[-2rem] z-[-1]">
              <div className="bg-[#EAF2FF] p-2 rounded-lg shadow-md mt-5 w-[16rem] whitespace-nowrap">
                <div className="ml-4 text-left">
                  <h3 className="text-[1.25rem] font-bold">Detalhes</h3>
                  <p className="text-[1.125rem]">Ônibus: Daivid Turismo</p>
                  <p className="text-[1.125rem]">Placa: ASF345</p>
                  <p className="text-[1.125rem]">Assento: T8</p>
                </div>
              </div>
              <div className="absolute left-25 top-0 mt-95 flex">
                <img src="/origem-azul.svg" alt="Origem" className="w-[3rem] h-[3rem] mr-4 flex-shrink-0" />
                <div className="text-left flex-grow">
                  <p className="text-[1.25rem] font-bold">Saída da Cidade Origem</p>
                  <p className="text-[1.125rem]">Posto Graal Antares | Uberaba - MG</p>
                  <p className="text-[1.125rem] font-bold">25/03/25 - 19:30h</p>
                </div>
              </div>
              <div className="absolute left-25 top-[6rem] mt-95 flex items-start">
                <img src="/destino-azul.svg" alt="Destino" className="w-[3rem] h-[3rem] mr-4 flex-shrink-0" />
                <div className="text-left flex-grow">
                  <p className="text-[1.25rem] font-bold">Chegada na Cidade Destino</p>
                  <p className="text-[1.125rem]">Rua Rifaina | Rifaina - SP</p>
                  <p className="text-[1.125rem] font-bold">25/03/25 - 22:00h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lembrete */}
          <div className="flex items-start w-1/2 relative ml-20">
            <img
              src="/icone-pag-transporte.svg"
              alt="Ícone Transporte"
              className="mr-4 flex-shrink-0"
            />
            <img
              src="/lembrete.svg"
              alt="Lembrete"
              className="absolute left-3 w-[6rem] h-[10rem]"
            />
            <div className="flex flex-col ml-[-2rem] z-[-1]">
              <div className="flex items-center bg-[#EAF2FF] p-2 rounded-lg shadow-md w-[16rem] mt-8">
                <div className="ml-4 text-left">
                  <h3 className="text-[1.25rem] font-bold">Lembrete</h3>
                  <p className="text-[1.125rem]">Ticket: 1654155261</p>
                  <p className="text-[1.125rem] font-bold">Chegue 15 minutos antes</p>
                </div>
              </div>
              <div className="absolute left-1 top-[6rem] mt-25 flex items-start">
                <img
                  src="/origem-verde.svg"
                  alt="Origem"
                  className="w-[3rem] h-[3rem] mr-4 flex-shrink-0"
                />
                <div className="text-left flex-grow">
                  <p className="text-[1.25rem] font-bold">Saída da Cidade Destino</p>
                  <p className="text-[1.125rem]">Rua Rifaina | Rifaina - SP</p>
                  <p className="text-[1.125rem] font-bold">30/03/25 - 12:00h</p>
                </div>
              </div>
              <div className="absolute left-1 top-[6rem] mt-50 flex items-start">
                <img
                  src="/destino-verde.svg"
                  alt="Destino"
                  className="w-[3rem] h-[3rem] mr-4 flex-shrink-0"
                />
                <div className="text-left flex-grow">
                  <p className="text-[1.25rem] font-bold">Chegada na Cidade Origem</p>
                  <p className="text-[1.125rem]">Posto Graal Antares | Uberaba - MG</p>
                  <p className="text-[1.125rem] font-bold">30/03/25 - 14:00h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ícones de Navegação */}
        <div className="flex mt-60 justify-center">
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
                src="detalhes.svg"
                alt="Detalhes"
                className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2">Mais Detalhes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
                src="hospedagem.svg"
                alt="Hospedagem"
                className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2 ml-6">Hospedagem</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
                src="itinerarios.svg"
                alt="Itinerários"
                className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2 ml-6">Itinerários</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
                src="custos.svg"
                alt="Custos"
                className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2 ml-6">Custos</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
                src="alerta.svg"
                alt="Alerta"
                className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2 ml-6">Alerta</span>
          </div>
        </div>

        {/* Linha preta vertical */}
        <div
          className="absolute bg-black w-[12rem] h-[0.0625rem] top-[29.5rem] left-[26.7rem] rotate-90"
        ></div>
      </div>
    </div>
  );
};

export default AlertModal;