"use client";
import React from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import Card from "@/components/ui/community/CardPublicTrip";
import BarraDePesquisa from "@/components/ui/community/SearchBar";

export default function HomePage() {
    
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            {/* Sidebar */}
            <SidebarMenu />

            {/* Main Content */}
            <div className="flex flex-col w-full overflow-hidden">
                <HeaderPages />

                <main className="flex flex-col items-center w-full max-w-[90%] mx-auto pt-10 px-5 gap-8">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-white text-4xl font-bold ">Comunidade Globix</h1>
                    </div>

                    <div>
                        <h2 className="text-white text-lg">Participe de Excursões criados por outros viajantes </h2>
                    </div>

                    <BarraDePesquisa />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        <Card
                            topImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                            userImage="https://randomuser.me/api/portraits/men/32.jpg"
                            tripName="Aventura nas Montanhas"
                            location="Serra do Cipó, MG"
                            createdAt="há 2 dias"
                            duration="5 dias"
                        />

                        <Card
                            topImage="https://images.unsplash.com/photo-1465156799763-2c087c332922"
                            userImage="https://randomuser.me/api/portraits/women/44.jpg"
                            tripName="Praias do Nordeste"
                            location="Porto de Galinhas, PE"
                            createdAt="há 5 dias"
                            duration="7 dias"
                        />

                        <Card
                            topImage="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
                            userImage="https://randomuser.me/api/portraits/men/65.jpg"
                            tripName="Explorando a Amazônia"
                            location="Manaus, AM"
                            createdAt="há 1 semana"
                            duration="10 dias"
                        />

                        <Card
                            topImage="https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
                            userImage="https://randomuser.me/api/portraits/women/68.jpg"
                            tripName="Caminho das Águas"
                            location="Foz do Iguaçu, PR"
                            createdAt="há 3 dias"
                            duration="4 dias"
                        />

                        <Card
                            topImage="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
                            userImage="https://randomuser.me/api/portraits/men/23.jpg"
                            tripName="Trilhas no Sul"
                            location="Gramado, RS"
                            createdAt="há 2 semanas"
                            duration="6 dias"
                        />

                        <Card
                            topImage="https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
                            userImage="https://randomuser.me/api/portraits/women/12.jpg"
                            tripName="Rota das Cachoeiras"
                            location="Chapada dos Veadeiros, GO"
                            createdAt="há 4 dias"
                            duration="8 dias"
                        />



                        <Card
                            topImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                            userImage="https://randomuser.me/api/portraits/women/55.jpg"
                            tripName="Sabores da Itália"
                            location="Roma, Itália"
                            createdAt="há 4 dias"
                            duration="6 dias"
                        />


                    </div>
                    <div className="mb-20" />

                </main>
            </div>
        </div>
    );
}