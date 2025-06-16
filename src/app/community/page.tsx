"use client";
import React from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import SearchBarWithFilters from "@/components/ui/community/SearchBar";

export default function HomePage() {
    return (
        <div className="flex h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
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
                        <p>Participe de Excursões criados por outros viajantes </p>
                    </div>

                    <SearchBarWithFilters />
                </main>
            </div>
        </div>
    );
}