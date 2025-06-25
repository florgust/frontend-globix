import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Activity {
  time: string;
  title: string;
  description: string;
  type: string;
}

interface ItineraryType {
  day: number;
  date: string;
  activities: Activity[];
}

interface ItineraryProps {
  itineraries: ItineraryType[];
  currentPage: number;
  handleRemoveDay: (dayIdx: number) => void;
  handleRemoveActivity: (activityIdx: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  setCurrentPage: (idx: number) => void;
  onSelectActivity?: (dayIdx: number, activityIdx: number) => void; // Adicionado
}

export function Itinerary({
  itineraries,
  currentPage,
  handleRemoveDay,
  handleRemoveActivity,
  handlePrev,
  handleNext,
  setCurrentPage,
  onSelectActivity, // Adicionado
}: ItineraryProps) {
  if (!itineraries.length) {
    return (
      <div className="flex flex-col w-1/2">
        <div className="font-bold text-[#292D32] text-lg mb-2">Atividades</div>
        <div className="rounded-xl mb-2 border-2 border-[#00FF4D] p-0">
          <div className="flex items-center justify-between bg-[#A7FF84] rounded-t-xl px-4 py-2 m-0">
            <span className="font-bold text-[#0F2976] text-base">
              Nenhum dia cadastrado
            </span>
          </div>
          <div className="flex flex-col px-0 py-0 max-h-[22rem] overflow-y-auto">
            <span className="text-[#0F2976] text-center py-4">
              Nenhuma atividade cadastrada.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-1/2">
      <div className="font-bold text-[#292D32] text-lg mb-2">Atividades</div>
      <div className="rounded-xl mb-2 border-2 border-[#00FF4D] p-0">
        <div className="flex items-center justify-between bg-[#A7FF84] rounded-t-xl px-4 py-2 m-0">
          <span className="font-bold text-[#0F2976] text-base">
            Dia {itineraries[currentPage].day} - {itineraries[currentPage].date}
          </span>
          <button
            className="text-[#0F2976] hover:text-red-600 cursor-pointer"
            title="Remover dia"
            onClick={() => handleRemoveDay(currentPage)}
          >
            <FiTrash2 />
          </button>
        </div>
        <div className="flex flex-col px-0 py-0 max-h-[22rem] overflow-y-auto">
          {itineraries[currentPage].activities.length === 0 && (
            <span className="text-[#0F2976] text-center py-4">
              Nenhuma atividade cadastrada para este dia.
            </span>
          )}
          {itineraries[currentPage].activities.map((act, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between bg-white rounded-none px-4 py-2 shadow 
                                ${idx !== 0 ? "border-t border-[#0F2976]" : ""} 
                                ${
                                  onSelectActivity
                                    ? "cursor-pointer hover:bg-gray-100"
                                    : ""
                                }`}
              onClick={
                onSelectActivity
                  ? () => onSelectActivity(currentPage, idx)
                  : undefined
              }
            >
              <div>
                <div className="font-bold text-[#0F2976] text-sm">
                  {act.time} - {act.title}
                </div>
                <div className="text-[#0F2976] text-xs">{act.description}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#0F2976] text-xs">{act.type}</span>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Remover atividade"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveActivity(idx);
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Linha azul escura acima dos botões de navegação */}
        <div className="border-t border-[#0F2976] w-full" />
        {/* Paginação DENTRO da borda verde */}
        <div className="flex items-center justify-center gap-4 mt-2 px-4 pb-3">
          <button
            className={`p-2 rounded-full text-[#0F2976] ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={currentPage === 0 ? undefined : handlePrev}
            disabled={currentPage === 0}
            tabIndex={currentPage === 0 ? -1 : 0}
          >
            <FaChevronLeft />
          </button>
          {itineraries.map((_, idx) => (
            <button
              key={idx}
              className={`w-8 h-8 font-bold rounded-md cursor-pointer ${
                idx === currentPage
                  ? "bg-[#092064] text-[#A7FF84]"
                  : "bg-[#A7FF84] text-[#0F2976] hover:bg-[#86EE60]"
              }`}
              onClick={() => setCurrentPage(idx)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className={`p-2 rounded-full text-[#0F2976] ${
              currentPage === itineraries.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              currentPage === itineraries.length - 1 ? undefined : handleNext
            }
            disabled={currentPage === itineraries.length - 1}
            tabIndex={currentPage === itineraries.length - 1 ? -1 : 0}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
