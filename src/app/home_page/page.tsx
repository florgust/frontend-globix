"use client";
import React, { useState } from "react";
import { Briefcase, UserRoundPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, NextCarousel, PreviousCarousel } from "@/components/ui/carousel"
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { Modal } from "@/components/ui/modal";
import api, { axios } from "@/utils/axios"; // Importa o axios configurado
import Cookies from "js-cookie";
import Image from "next/image";

const viagens = [
  {
    id: 1,
    titulo: "Rifaina - SP",
    diaViagem: "22/04/2025",
    cidadeDestino: "Rifaina",
    organizador: "Bárbara",
    tipoTransporte: "Micro-ônibus",
    duracao: "2 dias",
    imagem: "/images-home_page/carousel/rifaina-capa.png"
  },
  {
    id: 2,
    titulo: "Viagem para o Rio de Janeiro",
    diaViagem: "20/05/2025",
    cidadeDestino: "Rio de Janeiro",
    organizador: "Patrick e Arthur",
    tipoTransporte: "Carro",
    duracao: "5 dias",
    imagem: "/images-home_page/carousel/carrossel.png"
  },
  {
    id: 3,
    titulo: "Viagem para o Nordeste",
    diaViagem: "02/10/2025",
    cidadeDestino: "Recife - PE",
    organizador: "Luan",
    tipoTransporte: "Avião",
    duracao: "7 dias",
    imagem: "/images-home_page/carousel/carrossel2.jpg"
  }
];

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [tripCode, setTripCode] = useState(""); // Estado para o código da viagem
  const [alertMessage, setAlertMessage] = useState(""); // Estado para mensagens de erro
  const [showSuccess, setShowSuccess] = useState(false); // Estado para o modal de sucesso
  const router = useRouter();

  const handleJoinTrip = async () => {
    if (!tripCode) {
      setAlertMessage("Por favor, insira o código da viagem.");
      return;
    }

    try {
      // Passo 2: Verificar se a viagem existe
      console.log("Trip Code:", tripCode);
      const { data: viagem } = await api.get(`/viagem/codigo/${tripCode}`);

      // Passo 4: Enviar solicitação de participação
      const usuarioCookie = Cookies.get("usuario");
      if (!usuarioCookie) {
        setAlertMessage("Usuário não autenticado.");
        return;
      }
      const usuarioObj = JSON.parse(usuarioCookie);
      const userId = usuarioObj.id;

      await api.post(`/solicitacao/${userId}/${viagem.id}`);
      setAlertMessage(""); // limpa erros antigos
      setShowSuccess(true);
      setTripCode(""); // Limpa o campo de entrada
      setOpenModal(false); // Fecha o modal
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setAlertMessage("Viagem não encontrada. Verifique o código inserido.");
          return;
        }
        const message = error.response?.data?.error ?? "Erro ao participar da viagem.";
        setAlertMessage(message);
        return;
      }

      setAlertMessage("Erro inesperado. Tente novamente.");
      return;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
      <SidebarMenu />
      <HeaderPages />

      <div className="absolute top-40 left-105 flex space-x-6">
        <button
          onClick={() => router.push("/create_trip")}
          className="mb-180 px-16 py-10 bg-[#F0F9FF] text-[#6C6C6C] rounded-lg shadow-lg hover:bg-gray-300 transition cursor-pointer"
        >
          <Briefcase className="h-12 w-12 text-[#0F2976]" />
          Criar Viagem
        </button>

        <button
          onClick={() => setOpenModal(true)}
          className="mb-180 ml-10 px-10 py-10 bg-[#B0FAC6] text-[#6C6C6C] rounded-lg shadow-lg hover:bg-green-300 transition cursor-pointer"
        >
          <UserRoundPlus className="h-12 w-12 text-[#0F2976]" />
          Participar de Viagem
        </button>

        {/* Modal para inserir o código da viagem */}
        <Modal isOpen={openModal}>
          <h1 className="text-[#0F2976] text-4xl text-center mb-10">
            Insira o código da Viagem que você <br /> quer participar
          </h1>

          {alertMessage && (
            <div className="mb-6 px-6 py-4 rounded-lg text-white text-center text-xl font-medium bg-red-600">
              {alertMessage}
            </div>
          )}

          {showSuccess && (
            <div className="mb-6 px-6 py-4 rounded-lg text-white text-center text-xl font-medium bg-green-600">
              Solicitação enviada com sucesso!
            </div>
          )}

          <input
            type="text"
            placeholder="Insira o código da viagem"
            value={tripCode}
            onChange={(e) => setTripCode(e.target.value)}
            className="w-[30rem] h-[6rem] p-2 rounded-full bg-[#0F2976] focus:outline-none text-white placeholder-gray-200 text-2xl text-center"
          />

          <button
            onClick={handleJoinTrip}
            className="mt-5 px-10 py-4 bg-[#00FF4D] text-white rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Confirmar
          </button>

          <button onClick={() => {
            setOpenModal(false);
            setAlertMessage(""); // limpa mensagens ao fechar
            setShowSuccess(false);
          }}>
            <X className="absolute top-10 right-10 w-12 h-12 text-[#6C727F] cursor-pointer" />
          </button>
        </Modal>

      </div>

      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
        <h1 className="text-6xl mb-10 font-extrabold text-white drop-shadow-lg">
          Viagens Disponíveis para Você
        </h1>

        <Carousel className="flex flex-col items-center w-full max-w-[75rem] mx-auto">
          <CarouselContent >
            {viagens.map((viagem) => (
              <CarouselItem key={viagem.id}>
                <div className="relative bg-gradient-to-b from-[#0F2976] to-[#194DE8] w-full h-[25rem] mx-auto rounded-lg flex items-center justify-center">
                  <Image
                    src={viagem.imagem}
                    alt={viagem.titulo}
                    width={880}
                    height={334}
                    className="w-[55rem] h-[20.875rem] mx-auto rounded-lg"
                    priority
                  />
                  <div className="w-[55rem] absolute top-40 left-18 bottom-8 bg-white bg-opacity-50 text-white flex flex-col opacity-0 hover:opacity-85 transition-opacity rounded-lg p-4">
                    <h1 className="text-[#0F2976] text-3xl font-bold mb-3">{viagem.titulo}</h1>
                    <p className="text-black">Dia da Viagem: {viagem.diaViagem}</p>
                    <p className="text-black">Organizador: {viagem.organizador}</p>
                    <p className="text-black">Tipo de Transporte: {viagem.tipoTransporte}</p>
                    <p className="text-black mb-2">Duração: {viagem.duracao}</p>

                    <button className="flex justify-center items-center w-30 h-5 bg-[#102976] text-white rounded-lg mt-2 cursor-pointer">Mais detalhes</button>
                    <button className="absolute right-3 top-18 w-45 h-10 bg-[#3978EA] text-white text-2xl rounded-full mt-2 pl-5 pb-1 cursor-pointer">Quero Viajar</button>
                    <button className="absolute right-40 top-15 w-[5rem] h-[5rem] bg-[#0F2976] rounded-full flex items-center justify-center cursor-pointer">
                      <UserRoundPlus className="pl-2 h-[4rem] w-[4rem] text-white" />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <PreviousCarousel className="absolute top-1/2 transform -translate-y-1/2 p-2 transition mr-235 cursor-pointer">
          </PreviousCarousel>
          <NextCarousel className="absolute top-1/2 transform -translate-y-1/2 p-2 transition ml-235 cursor-pointer">
          </NextCarousel>
        </Carousel>
      </div>
    </div>
  );
}
