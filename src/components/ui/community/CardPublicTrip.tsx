import React from "react";

interface CardProps {
  topImage: string;
  userImage: string;
  tripName: string;
  location: string;
  cidadeOrigem: string;
  cidadeDestino: string;
  createdAt: string; // Ex: "há 2 dias"
  duration: string;  // Ex: "5 dias"
  startDate?: string;
  endDate?: string;
  onParticipar?: () => void;
  isPendente?: boolean;
}

const Card: React.FC<CardProps> = ({
  topImage,
  userImage,
  tripName,
  location,
  cidadeOrigem,
  cidadeDestino,
  createdAt,
  duration,
  startDate,
  endDate,
  onParticipar,
  isPendente = false,
}) => (
  <div className="bg-[#102976] rounded-xl w-80 shadow-lg overflow-hidden text-white font-sans">
    <div className="relative flex flex-col items-start px-4 pt-4">
      <img
        src={topImage}
        alt="Imagem da viagem"
        className="w-full h-32 object-cover rounded-lg mx-auto"
      />
      <img
        src={userImage}
        alt="Foto do usuário"
        className="w-12 h-12 rounded-full border-2 border-white absolute left-6 top-30 bg-gray-200"
      />
    </div>

    <div className="pt-8 pb-4 px-6">
      <div>
        <div className="font-bold text-lg text-left truncate max-w-[27ch]">{tripName}</div>
        <div className="flex justify-between gap-2 mt-1 mb-2">
          <span className="text-blue-300 text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-blue-200">Destino:</span>
          <span className="text-xs font-semibold text-white truncate">
            {cidadeOrigem} &rarr; {cidadeDestino}
          </span>
        </div>
        {(startDate || endDate) && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-blue-200">Período:</span>
            <span className="text-xs font-semibold text-white">
              {startDate} {endDate && <>até {endDate}</>}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-blue-200">Duração:</span>
          <span className="text-xs font-semibold text-white">{duration}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-200 text-xs">
            Criada: {createdAt}
          </span>
          {isPendente ? (
            <button
              className="bg-gray-400 cursor-not-allowed rounded px-4 py-2 font-semibold text-[#102976] opacity-70"
              disabled
            >
              Pendente
            </button>
          ) : (
            <button
              className="bg-[#A7FF84] hover:bg-green-200 transition rounded px-4 py-2 font-semibold text-[#102976] cursor-pointer"
              onClick={onParticipar}
            >
              Participar
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Card;