"use client";

import React, { useState } from "react";

export default function Location() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Mais detalhes
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative">
            {/* Botão de Voltar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 left-12 z-10"
            >
              <img src="/seta.svg" alt="Voltar" className="w-10 h-10" />
            </button>

            <div className="relative text-center mb-6">
              {/* Título principal */}
              <div className="relative bg-blue-900 text-[#00FF00] font-bold text-2xl py-2 px-4 inline-block">
                Mais Detalhes
              </div>
            </div>
            <table className="w-full max-w-160 border border-gray-300 overflow-hidden mx-auto">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="p-2 font-bold text-gray-700 border border-gray-300">Nome da Viagem</td>
                  <td className="p-2 font-bold text-gray-900 border border-gray-300">Viagem para Rifaina/SP</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-gray-700 border border-gray-300">Destino</td>
                  <td className="p-2 font-bold text-gray-900 border border-gray-300">Uberaba-MG → Rifaina/SP</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-gray-700 border border-gray-300">Data de Ida</td>
                  <td className="p-2 font-bold text-gray-900 border border-gray-300">25/03/2025 (19:30h)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-gray-700 border border-gray-300">Data de Volta</td>
                  <td className="p-2 font-bold text-gray-900 border border-gray-300">30/03/2025 (12:00h)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-gray-700 border border-gray-300">Status da Viagem</td>
                  <td className="p-2 font-bold text-gray-900 border border-gray-300">Em andamento</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-6 space-x-4">
              {/* Botões de ação */}
              <button
                onClick={() => window.location.href = "/transporte"}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-600 text-white p-4 rounded-full flex items-center justify-center">
                  <img src="/transporte.svg" alt="Transporte" className="w-8 h-8" />
                </div>
                <span className="text-sm text-gray-700 mt-2">Transporte</span>
              </button>
              {/* Botão Hospedagem */}
              <button
                onClick={() => window.location.href = "/hospedagem"}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-600 text-white p-4 rounded-full flex items-center justify-center">
                  <img src="/hospedagem.svg" alt="Hospedagem" className="w-8 h-8" /> {/* Ajustado para w-8 h-8 */}
                </div>
                <span className="text-sm text-gray-700 mt-2">Hospedagem</span>
              </button>

              {/* Botão Itinerários */}
              <button
                onClick={() => window.location.href = "/itinerarios"}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-600 text-white p-4 rounded-full flex items-center justify-center">
                  <img src="/itinerarios.svg" alt="Itinerários" className="w-8 h-8" /> {/* Ajustado para w-8 h-8 */}
                </div>
                <span className="text-sm text-gray-700 mt-2">Itinerários</span>
              </button>

              {/* Botão Custos */}
              <button
                onClick={() => window.location.href = "/custos"}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-600 text-white p-4 rounded-full flex items-center justify-center">
                  <img src="/custos.svg" alt="Custos" className="w-8 h-8" /> {/* Ajustado para w-8 h-8 */}
                </div>
                <span className="text-sm text-gray-700 mt-2">Custos</span>
              </button>

              {/* Botão Alerta */}
              <button
                onClick={() => window.location.href = "/alerta"}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-600 text-white p-4 rounded-full flex items-center justify-center">
                  <img src="/alerta.svg" alt="Alerta" className="w-8 h-8" /> {/* Ajustado para w-8 h-8 */}
                </div>
                <span className="text-sm text-gray-700 mt-2">Alerta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}