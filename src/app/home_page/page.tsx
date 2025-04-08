import React from "react";
import { Briefcase } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  const carouselImages = [
    "/images/carousel1.jpg",
    "/images/carousel2.jpg",
    "/images/carousel3.jpg",
  ];

export default function HomePage() {
    return (
        
      <div className="flex min-h-screen items-center justify-center bg-blue-500">

        <button className="block items-center gap-3 px-16 py-10 bg-gray-200 text-gray-800 rounded-lg shadow-lg hover:bg-gray-300 transition">           
            <Briefcase className="h-12 w-12 text-blue-800" />
            Criar Viagem
        </button>
            
        <button className="block items-center gap-3 px-16 py-10 bg-green-200 text-gray-800 rounded-lg shadow-lg hover:bg-green-300 transition">           
            <UserRoundPlus className="h-12 w-12 text-blue-800" />
            Participar de Viagem
        </button>

        <div className="text-center">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate-bounce">
                Viagens Disponíveis para Você
            </h1>

            <Carousel>
                <CarouselContent>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
      </div>
    );
  }
  