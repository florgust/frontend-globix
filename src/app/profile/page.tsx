"use client";
import React from "react";
import { X } from "lucide-react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import { HeaderPages } from "@/components/ui/header";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";


export default function Profile() {
    return (
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
                <SidebarMenu />
    
                <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                    <HeaderPages />
    
                    <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Meu perfil</h1>

                    <div className="w-full max-w-6xl mt-6">
                        <div className="relative bg-[#0F2976] rounded-lg shadow-lg">
                            <div className="relative">
                                <img
                                    src="/images-profile/corinthians.png"
                                    alt="Banner"
                                    className="w-full h-42 object-cover rounded-t-lg"
                                />
                                <button className="absolute top-27 right-7 bg-white text-sm px-3 py-1 rounded-full shadow-md">
                                    Editar Capa
                                </button>
                            </div>
                            <div className="flex items-center p-6 relative -top-11 left-10">
                                <img
                                    src="/images-profile/mauro.svg"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover object-center scale-200"
                                />
                                <div className="ml-20">
                                    <h2 className="text-white text-2xl font-bold">Mauro Borges</h2>
                                    <p className="text-gray-300 text-sm">Professor</p>
                                </div>
                                <button className="ml-auto bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                                    Editar Perfil
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 relative bg-[#0F2976] rounded-lg shadow-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-white text-xl font-bold">Recentes</h3>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                                    CRIAR VIAGEM
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                                {[
                                    { title: "Rifaina", location: "São Paulo, Rifaina", price: "R$200/dia", image: "/path-to-image1.jpg" },
                                    { title: "Manoel Mendes", location: "Nova York, Uberaba", price: "R$1000/dia", image: "/path-to-image2.jpg" },
                                    { title: "Delta", location: "Casa do Luan", price: "R$50/noite", image: "/path-to-image3.jpg" },
                                    { title: "Caldas Novas", location: "dj topo", price: "R$300/noite", image: "/path-to-image4.jpg" },
                                ].map((trip, index) => (
                                    <div key={index} className="bg-[#0F2976] rounded-lg shadow-lg overflow-hidden">
                                        <img
                                            src={trip.image}
                                            alt={trip.title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="text-white text-lg font-bold">{trip.title}</h4>
                                            <p className="text-gray-300 text-sm">{trip.location}</p>
                                            <p className="text-green-400 text-sm font-bold mt-2">{trip.price}</p>
                                            <button className="mt-4 text-blue-400 text-sm font-bold">
                                                Mais detalhes
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
    )
}