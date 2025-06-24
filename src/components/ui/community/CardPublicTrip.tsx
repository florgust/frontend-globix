// Card.tsx
import React from "react";

interface CardProps {
  topImage: string;
  userImage: string;
  tripName: string;
  location: string;
  createdAt: string;
  duration: string;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const Card: React.FC<CardProps> = ({
  topImage,
  userImage,
  tripName,
  location,
  createdAt,
  duration,
  onButtonClick,
  buttonLabel = "Ver detalhes",
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
        <div className="font-bold text-lg text-left">{tripName}</div>
        <div className="flex justify-between gap-2 mt-1 mb-5">
          <span className="text-blue-300 text-sm ">{location}</span>
          <span className="bg-blue-800 rounded px-2 py-1 text-sm">{duration}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
            <span className="text-blue-200 text-xs">{createdAt}</span>

          <button
            onClick={onButtonClick}
            className="bg-[#A7FF84] hover:bg-green-200 transition rounded px-4 py-2 font-semibold text-[#102976] cursor-pointer"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;