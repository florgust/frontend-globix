"use client";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation"; // ← Corrigido o import
import React, { useState } from "react";
import ConfirmationModal from '@/components/ui/modals/ModalCancelTrip';

interface FormContainerProps {
  titulo: string;
  children: React.ReactNode;
  className?: string;
}

export default function WhiteBackground({
  titulo,
  children,
  className = ""
}: FormContainerProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const router = useRouter(); 

  const handleVoltar = () => {
    router.back();
  };

  const handleCancelar = () => {
    setShowCancelModal(true);
  };

  const confirmCancelar = () => {
    localStorage.removeItem("tripFormData");
    localStorage.removeItem('viagemEmCriacao');
    setShowCancelModal(false);
    router.push("/home_page");
  };

  const cancelCancelar = () => { 
    setShowCancelModal(false);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center w-3/4 mt-10 rounded-4xl shadow-lg ${className}`}
      >
        <div className="w-full bg-[#0F2976] rounded-t-4xl py-6 px-6 relative">
          <button
            onClick={handleVoltar} // ← Corrigido (remover arrow function)
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-20 h-10 text-white rounded-full hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft size={35} />
          </button>

          <h1 className="font-bold text-4xl text-center text-white">{titulo}</h1>

          <button
            onClick={handleCancelar} // ← Corrigido o nome da função
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-50 h-10 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <X size={20} className="mr-4" />
            Cancelar Viagem
          </button>
        </div>

        <div className="bg-white w-full rounded-b-4xl p-8">{children}</div>
      </div>

      {/* Modal movido para fora da div do header */}
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancelar Criação da Viagem?"
        message="Tem certeza que deseja cancelar a criação da viagem? Todos os dados preenchidos serão perdidos."
        confirmText="Sim, Cancelar"
        cancelText="Continuar Editando"
        onConfirm={confirmCancelar}
        onCancel={cancelCancelar}
        type="danger"
        showDetails={true}
      />
    </>
  );
}