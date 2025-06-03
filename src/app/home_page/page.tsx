"use client";
import React from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import GreetingCard from "@/components/home/GreetingCard";
import ActionCards from "@/components/home/ActionCards";
import CalendarCard from "@/components/home/CalendarCard";
import WeatherCard from "@/components/home/WeatherCard";
import NotificationsCard from "@/components/home/NotificationsCard";
import TravelTipsCard from "@/components/home/TravelTipsCard";
import NextTripCard from "@/components/home/NextTripCard";
import TravelSummariesCard from "@/components/home/TravelSummariesCard";

export default function HomePage() {
    return (
        <div className="flex h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            {/* Sidebar */}
            <SidebarMenu />

            {/* Main Content */}
            <div className="flex flex-col w-full overflow-hidden">
                <HeaderPages />

                <main className="flex w-full max-w-[90%] mx-auto pt-10 px-5 gap-8">
                    {/* Coluna Esquerda */}
                    <div className="flex flex-col gap-8 w-[80%]">
                        <GreetingCard />
                        <ActionCards />

                        {/* Linha para Notificações, Dicas e Próxima Viagem */}
                        <div className="flex w-full">
                            {/* Coluna: Notificações + Dicas */}
                            <div className="flex flex-col gap-8 w-[53%]">
                                <NotificationsCard />
                                <TravelTipsCard />
                            </div>
                            {/* Coluna: Próxima Viagem */}
                            <div className="w-[48%] flex flex-col">
                                <NextTripCard />
                            </div>
                        </div>
                    </div>
                    {/* Coluna Direita */}
                    <div className="flex flex-col gap-8 w-[20%]">
                        <CalendarCard />
                        <WeatherCard />
                        <TravelSummariesCard />
                    </div>
                </main>
            </div>
        </div>
    );
}