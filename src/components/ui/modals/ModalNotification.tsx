import React from "react";
import { IconButton } from "@/components/common/Button";

interface Notificacao {
  id: number;
  mensagem: string;
  tipo: string;
  viagemId?: number;
  dataCriacao: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: "details" | "transport" | "itinerary" | "budget") => void;
  notifications: Notificacao[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  notifications,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-5xl p-8 relative">
        {/* Header padrão dos modais */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
          </button>
          <div className="relative">
            <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-16 py-2 relative z-10">
              Notificações
            </h2>
            <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0"></div>
          </div>
          <div className="w-8"></div>
        </div>
        {/* Lista de notificações */}
        <div className="bg-[#E3FFEB] border border-[#0F2976] rounded-lg shadow-md px-6 py-4 w-full max-w-3xl mx-auto mb-8 min-h-[200px] max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">Sem novas notificações</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="p-3 border-b last:border-b-0 hover:bg-gray-100 rounded transition"
                >
                  <p className="text-base text-[#0F2976]">{n.mensagem}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {new Date(n.dataCriacao).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Ícones de ações */}
        <div className="flex justify-center gap-5 mt-7">
          <div className="flex flex-col items-center">
            <IconButton
              icon={<img src="/images-travel/Icons/IconGreenList.png" className="w-16 h-16 cursor-pointer" />}
              size="lg"
              shape="circle"
              onClick={() => onNavigate("details")}
            />
            <p className="text-sm text-[#0F2976] mt-2">Mais Detalhes</p>
          </div>
          <div className="flex flex-col items-center">
            <IconButton
              icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-16 h-16 cursor-pointer" />}
              size="lg"
              shape="circle"
              onClick={() => onNavigate("transport")}
            />
            <p className="text-sm text-[#0F2976] mt-2">Transporte</p>
          </div>
          <div className="flex flex-col items-center">
            <IconButton
              icon={<img src="/images-travel/Icons/IconGreenItinerary.png" className="w-16 h-16 cursor-pointer" />}
              size="lg"
              shape="circle"
              onClick={() => onNavigate("itinerary")}
            />
            <p className="text-sm text-[#0F2976] mt-2">Itinerário</p>
          </div>
          <div className="flex flex-col items-center">
            <IconButton
              icon={<img src="/images-travel/Icons/IconGreenBudget.png" className="w-16 h-16 cursor-pointer" />}
              size="lg"
              shape="circle"
              onClick={() => onNavigate("budget")}
            />
            <p className="text-sm text-[#0F2976] mt-2">Orçamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;