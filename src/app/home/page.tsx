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

                <main className="flex flex-col w-full items-center pt-10 px-10">
                    {/* Linha 1 */}
                    <div className="flex w-full max-w-[1400px] justify-between mb-8">
                        <GreetingCard />
                        <CalendarCard />
                    </div>

                    {/* Linha 2 */}
                    <div className="flex w-full max-w-[1400px] justify-between mb-8">
                        <ActionCards />
                        <WeatherCard />
                    </div>

                    {/* Linha 3 */}
                    <div className="flex w-full max-w-[1400px] gap-8 mb-8">
                        <NotificationsCard />
                        <NextTripCard />
                    </div>

                    {/* Linha 4 */}
                    <div className="flex w-full max-w-[1400px] gap-8">
                        <TravelTipsCard />
                        <TravelSummariesCard />
                    </div>
                </main>
            </div>
        </div>
    );
}