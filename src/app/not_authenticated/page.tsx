"use client";
import React from "react";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useRouter } from "next/navigation";

export default function NotAuthenticated() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#102976] flex-col">
            <Header />

            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#102976] flex-1 relative">
                <div className="mt-25 text-[#A7FF84] text-center z-10">
                    <p className="font-bold text-[1.3rem]">Você precisa estar autenticado para acessar esta página</p>
                    <p className="pt-3">NÃO AUTENTICADO</p>
                </div>

                <div className="absolute flex justify-center items-center mt-5 left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                    <img
                        src="/images-error_401/error401.svg"
                        alt="Não autenticado"
                        className="w-[50rem] h-[25rem] drop-shadow-xl max-w-full"
                    />
                </div>

                <div className="flex justify-center mt-90 mb-20 z-10">
                    <button
                        className="w-96 h-14 border-2 border-[#FFFFFF] rounded-[6.25rem] cursor-pointer hover:scale-110 flex items-center justify-center gap-2 text-[#FFFFFF] text-lg bg-transparent shadow transition"
                        onClick={() => router.push("/login")}
                        type="button"
                    >
                        <span>Faça login para acessar esta página</span>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}