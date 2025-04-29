"use client";
import React from "react";
import { Briefcase, UserRoundPlus, X } from "lucide-react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Header from "@/components/ui/header";
import Modal from "@/components/ui/modal";


export default function TravelTransport() {
  const [openModal, setOpenModal] = React.useState(false);


    return (
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
        <SidebarMenu />
        <Header/>
        
        <h1
            className="absolute w-[34.5rem] h-[3.125rem] top-[8.625rem] left-[17.1875rem] text-white font-quicksand font-bold text-[2.5rem] leading-[1] tracking-[0px] text-center"
        >
            Criar Viagem - TRANSPORTE
        </h1>

        <div
            className="absolute w-[70.6875rem] top-[12.625rem] left-[17.1875rem] border-2 border-[#092064]"
        ></div>

        <div
            className="absolute w-[55.5rem] h-[24rem] top-[18rem] left-[20.9375rem] border-[0.125rem] border-[#00FF4D] rounded-[3.125rem]"
        >
            <div
              className="absolute w-[40.875rem] h-[6.25rem] top-[2rem] left-[7rem] text-center"
            >
            <h2 
              className="text-white font-quicksand font-bold text-[2.5rem] leading-[1] tracking-[0] text-center"
            >
              Qual será o transporte utilizado <br></br> na viagem?
            </h2>


            </div>
            
        </div>

        <div
            className="cursor-pointer absolute w-[52.5rem] h-[4.741rem] top-[47rem] left-[23.75rem] border-[0.03125rem] border-[#C4C4C4] rounded-[0.5rem] p-[0.625rem] gap-[0.625rem] bg-[#00FF4D] z-10"
        >
            <h2 className="text-center text-[#0F2976] font-quicksand font-bold text-[2.5rem] leading-[1.2] tracking-[0]">
              Próximo
            </h2>
        </div>

        <div
            className="absolute w-[52.5rem] h-[4.741rem] top-[47.5rem] left-[24.25rem] border-[0.03125rem] border-[#C4C4C4] rounded-[0.5rem] bg-[#FFFFFF] z-0"
        ></div>

        <div className="absolute top-40 left-105 flex space-x-6">

            <Modal isOpen={openModal}>
            <h1 className="text-[#0F2976] text-4xl mb-3 text-center mb-10">Insira a descrição do Transporte:</h1>
            <input
              type="text"
              placeholder="Insira mais detalhes sobre o transporte, como: Empresa do transporte, Identificação do transporte e Número da passagem."
              className="w-[38rem] h-[12rem] p-2 bg-[#0F2976] text-white placeholder-gray-200 rounded-[4.375rem] resize-none"
            />
            <button onClick={() => { setOpenModal(false); }}>
              <X className="absolute top-10 right-10 w-12 h-12 text-[#6C727F]" />
            </button>
            </Modal>

            <div
            className="absolute top-[19rem] flex space-x-6"
            >
            {["avião", "ônibus", "carro", "trem", "navio", "outro"].map((item, index) => (
              <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => {
              setOpenModal(true);
                const selectedOption = item; // Guarda o nome da opção na variável
              }}
              >
              <div className="hover:scale-110 transition-transform cursor-pointer w-[6.125rem] h-[6.125rem] bg-white rounded-full flex items-center justify-center">
              <img
              src={`/images-travel_transport/${item}.svg`}
              alt={item.charAt(0).toUpperCase() + item.slice(1)}
              className="w-[4.375rem] h-[4.375rem]"
              />
              </div>
              <span className="text-white mt-2">
              {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
              </div>
            ))}
            </div>

        </div>

      </div>
    );
  }
  