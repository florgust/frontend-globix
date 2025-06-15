"use client";
import React from "react";
import SidebarMenu from "../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";


export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            <SidebarMenu />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />

                <div className="mt-45 text-[#A7FF84] text-center">
                    <p className="font-bold text-[1.3rem]">A página que você procura não pode ser encontrada</p>
                    <p className="pt-3">ERRO 404</p>
                </div>

                <div className="absolute flex justify-center items-center mt-35 pointer-events-none">
                    <img
                        src="/images-error_404/error404.svg"
                        alt="Erro 404"
                        className="w-180 h-180"
                    />
                </div>

                <div className="flex justify-center space-x-4 gap-5 text-[#FFFFFF] mt-87 mb-40">
                    <button
                        className="w-70 h-14 border-2 border-[#FFFFFF] rounded-[6.25rem] cursor-pointer hover:scale-110 flex items-center justify-center gap-2"
                        onClick={() => router.push("/home_page")}
                    >
                        <img
                            src="/images-error_404/seta.svg"
                            alt="Seta"
                            className="w-5 h-5"
                        />
                        <span className="text-lg">Voltar para Página Inicial</span>
                    </button>
                    <button
                        className="w-72 h-14 border-2 border-[#FFFFFF] rounded-[6.25rem] cursor-pointer hover:scale-110 flex items-center justify-center gap-2 bg-transparent"
                        onClick={() => router.back()}
                    >
                        <span className="text-lg">Voltar para página anterior</span>
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    );
}