import React from "react";

const Modal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start">
      <div
        className="absolute bg-white shadow-lg p-6 w-[65.375rem] h-[46.688rem] rounded-[1.25rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-between items-center mb-4 mt-10">
          <button className="text-gray-500 hover:text-gray-700">
            <img
              src="seta.svg"
              alt="Voltar"
              className="w-[5rem] h-[5rem]" // 80px em rem
            />
          </button>
          <h2
            className="text-[2.5rem] font-bold text-[#00FF4D] text-center mx-auto w-[24.375rem] h-[3.75rem] bg-[#0F2976] flex items-center justify-center"
          >
            Mais Detalhes
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <table className="w-[55rem] border-collapse border border-gray-300 text-left text-sm mt-10">
            <tbody>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem]">
                  <strong>Nome da Viagem</strong>
                </th>
                <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem]">
                  <strong>Viagem para Rifaina/SP</strong>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem]">
                  <strong>Destino</strong>
                </th>
                <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem]">
                  <strong>Uberaba-MG → Rifaina/SP</strong>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem]">
                  <strong>Data de Ida</strong>
                </th>
                <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem]">
                  <strong>25/03/2025 (19:30h)</strong>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem]">
                  <strong>Data de Volta</strong>
                </th>
                <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem]">
                  <strong>30/03/2025 (12:00h)</strong>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem]">
                  <strong>Status da Viagem</strong>
                </th>
                <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem]">
                  <strong>Em andamento</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex mt-15 justify-center">
          <div className="flex flex-col items-center">
            <div className="w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
            src="transporte.svg"
            alt="Transporte"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-sm mt-2">Transporte</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
            src="hospedagem.svg"
            alt="Hospedagem"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-sm mt-2">Hospedagem</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
            src="itinerarios.svg"
            alt="Itinerários"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-sm mt-2">Itinerários</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
            src="custos.svg"
            alt="Custos"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-sm mt-2">Custos</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="ml-5 w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]">
              <img
            src="alerta.svg"
            alt="Alerta"
            className="w-[3.75rem] h-[3.75rem]"
              />
            </div>
            <span className="text-sm mt-2">Alerta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;