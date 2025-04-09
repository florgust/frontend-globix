import React from "react";
import { Briefcase } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Sidebar, { SidebarItem } from "../../components/ui/sidebar";
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";

  const carrosselImages = [
    "/images/rifaina-capa.svg",
    "/images/carrossel.png",
    "/images/marco.jpg",
  ];

export default function HomePage() {
    return (
        
      <div className="flex min-h-screen items-center justify-center bg-blue-500">

        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<Receipt size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<Boxes size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<Package size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Dashboard"
            alert
            active={true}
          />
          

        </Sidebar>


        <div className="absolute top-40 left-105 flex space-x-6">
          <button className="block mb-180 items-center gap-3 px-16 py-10 bg-gray-200 text-gray-800 rounded-lg shadow-lg hover:bg-gray-300 transition">           
              <Briefcase className="h-12 w-12 text-blue-800" />
              Criar Viagem
          </button>
              
          <button className="block mb-180 items-center gap-3 px-16 py-10 bg-green-200 text-gray-800 rounded-lg shadow-lg hover:bg-green-300 transition">           
              <UserRoundPlus className="h-12 w-12 text-blue-800" />
              Participar de Viagem
          </button>
        </div>

  
        <div className="text-center mt-20">
            <h1 className="text-6xl mb-10 font-extrabold text-white drop-shadow-lg">
                Viagens Disponíveis para Você
            </h1>

            <Carousel className="flex flex-col items-center">
                <CarouselContent>
                  {carrosselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-gradient-to-b from-blue-700 via-blue-600 to-blue-400 w-[75rem] h-[34rem] mx-auto rounded-lg flex items-center justify-center">
                        <img
                          src={image}
                          alt={`Imagem ${index + 1}`}
                          className="w-[61rem] h-[29.875rem] mx-auto rounded-lg "
                          />
                      </div>

                     
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-260 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition" />
                <CarouselNext className="absolute right-260 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition" />
            </Carousel>
        </div>
      </div>
    );
  }
  