"use client";
import React from "react";

const AccommodationModal = () => {
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
            Hospedagem
            </h2>
        </div>

        <div className="flex mt-15 justify-center">
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
            src="transporte.svg"
            alt="Transporte"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-[0.857rem] text-[#292D32] mt-2 ml-6">Transporte</span>
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
      </div>
    </div>
  );
};

export default AccommodationModal;