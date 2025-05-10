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
                        <div className="relative bg-[#0F2976] rounded-lg shadow-lg h-72">
                            <div className="relative">
                                <img
                                    src="/images-profile/corinthians.png"
                                    alt="Banner"
                                    className="w-full h-42 object-cover rounded-t-lg"
                                />
                                <button className="opacity-40 absolute top-27 right-7 bg-white text-base px-4 py-2 rounded-full shadow-md text-[#FFFFFF]">
                                    Editar Capa
                                </button>
                            </div>
                            <div className="flex items-center p-6 relative -top-15 left-10">
                                <img
                                    src="/images-profile/mauro.svg"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover object-center scale-200"
                                />
                                <div className="ml-20 mt-18 text-white">
                                    <h2 className="text-2xl font-bold">Mauro Borges</h2>
                                    <p className="text-sm opacity-50">Professor</p>
                                </div>
                                <button className="ml-154 mt-17 bg-[#29B943] text-white px-4 py-2 rounded-md shadow-md hover:scale-110 transition-transform cursor-pointer">
                                    Editar Perfil
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 relative bg-[#0F2976] rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <h3 className="text-white text-xl bg-[#499BFC] rounded-md px-4 py-2 mt-7 ml-8">
                                    Recentes
                                </h3>
                                <button className="bg-[#A7FF84] text-[#0F2976] font-bold text-lg px-1 py-2 rounded-md shadow-md mt-7 ml-205 hover:scale-110 transition-transform cursor-pointer">
                                    CRIAR VIAGEM
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 p-7">
                                {[
                                    { title: "Rifaina", location: "São Paulo, Rifaina", price: "R$200/diária", image: "/images-profile/rifania.png" },
                                    { title: "Manoel Mendes", location: "Nova York, Uberaba", price: "R$1000/diária", image: "/images-profile/manoel_mendes.png" },
                                    { title: "Delta", location: "Casa do Luan", price: "R$50/noite", image: "/images-profile/delta.png" },
                                    { title: "Caldas Novas", location: "dj topo", price: "R$300/noite", image: "/images-profile/caldas_novas.png" },
                                ].map((trip, index) => (
                                    <div key={index} className="bg-black rounded-lg shadow-lg overflow-hidden">
                                        <div className="p-2">
                                            <img
                                                src={trip.image}
                                                alt={trip.title}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white text-lg font-bold">{trip.title}</h4>
                                            <div className="flex items-center mt-2">
                                                <img
                                                    src="/images-profile/localizacao.svg"
                                                    alt="Location Icon"
                                                    className="w-4 h-4 mr-2"
                                                />
                                                <p className="text-white text-sm opacity-50">{trip.location}</p>
                                            </div>
                                            <p className="text-[#499BFC] font-bold mt-2">{trip.price}</p>
                                            <hr className="border-gray-600 my-2" />
                                            <button className="mt-4 text-[#499BFC] text-sm font-bold flex justify-center w-full hover:scale-110 transition-transform cursor-pointer">
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