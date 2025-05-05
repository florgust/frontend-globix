"use client";
import React from "react";
import { Briefcase, UserRoundPlus, X } from "lucide-react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Header from "@/components/ui/header";
import Modal from "@/components/ui/modal";


export default function TripTransport() {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <Header />

                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem - Transporte</h1>
                <div className='flex flex-col items-center w-9/10 border border-2 border-[#092064] mt-3 mb-20' />

                <div className="flex flex-col items-center w-3/5 h-2/5 mt-8 p-4 border-2 border-[#00FF4D] rounded-4xl shadow-lg">

                    <h1 className="text-white font-quicksand font-bold text-[2.5rem] leading-[1] tracking-[0] text-center mt-5">Qual será o Transporte utilizado <br/> na Viagem?</h1>

                    <div className="flex items-center justify-center space-x-6 mt-auto mb-10">

                        <Modal isOpen={openModal}>
                            <h1 className="text-[#0F2976] text-4xl mb-3 text-center mb-10">Insira a descrição do Transporte:</h1>
                            <textarea
                                placeholder="Insira mais detalhes sobre o transporte, como: Empresa do transporte, Identificação do transporte e Número da passagem."
                                className="w-[38rem] h-[12rem] pl-10 pr-10 pt-5 bg-[#0F2976] text-white placeholder-gray-300 rounded-[4.375rem] placeholder:text-2xl placeholder:leading-8 rounded-[4.375rem] resize-none"
                                style={{ fontSize: "1.5rem" }} // Tamanho inicial da fonte
                                onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.fontSize = "1.5rem"; // Aumenta a fonte quando o usuário digita
                                }}
                            />
                            <button onClick={() => { setOpenModal(false); }}>
                                <X className="absolute top-10 right-10 w-12 h-12 text-[#6C727F] cursor-pointer" />
                            </button>
                        </Modal>

                        <div
                            className="flex space-x-6"
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
                                            src={`/images-trip_transport/${item}.svg`}
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

                <div className='w-full flex flex-col items-center justify-center mt-auto mb-30'>
                    <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20"/>

                    <button className="absolute bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-2/4 h-20 text-3xl cursor-pointer">
                        Próximo
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
