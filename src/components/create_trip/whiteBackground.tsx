"use client";
import { ArrowLeft, X } from "lucide-react";
import router from "next/router";
import React, { useState } from "react";

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

  const handleVoltar = () => {
    router.back(); // Volta para página anterior
  };

  const handleCancelar = () => {
    setShowCancelModal(true);
  };

  const confirmCancelar = () => {
    // Limpar dados salvos
    localStorage.removeItem("tripFormData");
    router.push("/home_page");
  };

  function handleNextPage(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className={`flex flex-col items-center w-3/4 mt-10 rounded-4xl shadow-lg ${className}`}
    >
      <div className="w-full bg-[#0F2976] rounded-t-4xl py-6 px-6 relative">
        <button
          onClick={() => handleVoltar}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-20 h-10 text-white rounded-full hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={35} />
        </button>

        <h1 className="font-bold text-4xl text-center text-white">{titulo}</h1>

        <button
          onClick={() => {
            if (confirm("Deseja cancelar a criação da viagem?")) {
                confirmCancelar();
            }
          }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-50 h-10 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <X size={20} className="mr-4" />
          Cancelar Viagem
        </button>
      </div>

      <div className="bg-white w-full rounded-b-4xl p-8">{children}</div>
    </div>
  );
}
