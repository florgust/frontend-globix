import React from "react";
import { Briefcase } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import SidebarMenu from "../../components/ui/SidebarMenu";

const minhasViagens = "/images/minhas-viagens.svg";
const user = "/images/user.svg";
const message = "/images/message.svg";
const setting = "/images/setting.svg";
const mapa = "/images/mapa.svg";
const about = "/images/about.svg";
const community = "/images/comunidade.svg";

  const carrosselImages = [
    "/images/carousel/rifaina-capa.svg",
    "/images/carousel/carrossel.png",
    "/images/carousel/carrossel2.jpg",
  ];

export default function HomePage() {
    return (
        
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
        <SidebarMenu />

        <div className="absolute top-40 left-105 flex space-x-6">
          <button className="block mb-180 items-center gap-3 px-16 py-10 bg-[#F0F9FF] text-[#6C6C6C] rounded-lg shadow-lg hover:bg-gray-300 transition">           
              <Briefcase className="h-12 w-12 text-blue-800" />
              Criar Viagem
          </button>
              
          <button className="block mb-180 items-center gap-3 px-16 py-10 bg-[#B0FAC6] text-[#6C6C6C] rounded-lg shadow-lg hover:bg-green-300 transition">           
              <UserRoundPlus className="h-12 w-12 text-blue-800" />
              Participar de Viagem
          </button>
        </div>

  
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
          <h1 className="text-6xl mb-10 font-extrabold text-white drop-shadow-lg">
            Viagens Disponíveis para Você
          </h1>

            {/* <Carousel className="flex flex-col items-center">
                <CarouselContent>
                  {carrosselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-gradient-to-b from-[#0F2976] to-[#194DE8] w-[75rem] h-[34rem] mx-auto rounded-lg flex items-center justify-center">
                        <img
                          src={image}
                          alt={`Imagem ${index + 1}`}
                          className="w-[61rem] h-[29.875rem] mx-auto rounded-lg "
                          />
                      </div>

                     
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition" />
                <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition" />
            </Carousel> */}

        </div>
      </div>
    );
  }
  