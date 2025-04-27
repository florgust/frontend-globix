"use client";
import React from "react";
import Image from "next/image";

interface DetailsModalProps {
  title: string;
  details: { label: string; value: string }[];
  actions: { icon: string; label: string; onClick: () => void }[];
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ title, details, actions, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start">
      <div
        className="absolute bg-white shadow-lg p-6 w-[65.375rem] h-[46.688rem] rounded-[1.25rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-between items-center mb-4 mt-10">
          <button
            className="ml-10 hover:scale-110 transition-transform cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <Image
              src="/seta.svg"
              alt="Voltar"
              width={80}
              height={80}
              className="w-[5rem] h-[5rem]"
            />
          </button>
          <div className="absolute top-[5.2rem] ml-127 transform -translate-x-1/2 w-[24.375rem] h-[3.75rem] bg-[#1C4CDC]"></div>
          <h2
            className="text-[2.5rem] font-bold text-[#00FF4D] text-center mx-auto w-[24.375rem] h-[3.75rem] bg-[#0F2976] flex items-center justify-center absolute left-1/2 transform -translate-x-1/2"
          >
            {title}
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <table className="w-[55rem] border-collapse border border-gray-300 text-left text-sm mt-10">
            <tbody>
              {details.map((detail) => (
                <tr key={detail.label} className="bg-[#0000000F]">
                  <th className="border border-gray-300 px-4 py-2 font-medium text-[2rem] h-[2rem] w-1/2 whitespace-nowrap">
                    <strong>{detail.label}</strong>
                  </th>
                  <td className="border border-gray-300 px-4 py-2 text-[2rem] h-[2rem] w-1/2 whitespace-nowrap">
                    <strong>{detail.value}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-15 justify-center">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center"
              onClick={action.onClick}
            >
              <div
                className="hover:scale-110 transition-transform cursor-pointer w-[5.625rem] h-[5.625rem] rounded-full flex items-center justify-center bg-gradient-to-b from-[#0F2976] to-[#1C4CDC]"
              >
                <Image
                  src={action.icon}
                  alt={action.label}
                  width={60}
                  height={60}
                  className="w-[3.75rem] h-[3.75rem]"
                />
              </div>
              <span className="text-[0.857rem] text-[#292D32] mt-2">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;