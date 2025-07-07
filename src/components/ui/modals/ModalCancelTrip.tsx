import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
  showDetails?: boolean;
  details?: string[];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  type = 'danger',
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: X,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100',
      confirmBg: 'bg-red-500 hover:bg-red-600',
      titleColor: 'text-red-600',
      detailsBg: 'bg-red-50',
      detailsText: 'text-red-700'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-100',
      confirmBg: 'bg-yellow-500 hover:bg-yellow-600',
      titleColor: 'text-yellow-600',
      detailsBg: 'bg-yellow-50',
      detailsText: 'text-yellow-700'
    },
    info: {
      icon: AlertTriangle,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100',
      confirmBg: 'bg-blue-500 hover:bg-blue-600',
      titleColor: 'text-blue-600',
      detailsBg: 'bg-blue-50',
      detailsText: 'text-blue-700'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scaleIn">
        {/* Header com ícone */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center`}>
            <IconComponent size={32} className={config.iconColor} />
          </div>
        </div>
        
        {/* Título */}
        <h2 className={`text-2xl font-bold ${config.titleColor} text-center mb-4`}>
          {title}
        </h2>
        
        {/* Mensagem */}
        <p className="text-[#3B4449] text-center mb-6 leading-relaxed">
          {message}
        </p>        
        
        {/* Botões */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-1 py-3 bg-gray-200 text-[#3B4449] rounded-xl hover:bg-gray-300 transition-colors duration-200 font-semibold"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 ${config.confirmBg} text-white rounded-xl transition-colors duration-200 font-semibold`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;