"use client"
import { HeaderPages } from '@/components/ui/header';
import SidebarMenu from '@/components/ui/SidebarMenu';
import React, { useState } from 'react';
import { Earth, EarthLock, ImagePlus, Minus, Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import DatePickerHtml from '@/components/ui/DatePickerHtml';
import axios from 'axios';

export default function CreateTripPage() {
    const [selectedOption, setSelectedOption] = useState("public");
    const [count, setCount] = useState(0);
    const [tripName, setTripName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            // Exemplo sem upload de imagem
            await axios.post("http://localhost:3000/trip", {
                nome: tripName,
                descricao: description,
                status: selectedOption,
                qtd_vagas: count,
                data_inicio: startDate,
                data_fim: endDate
            });

            router.push("/travel_location"); // Redireciona após criação
        } catch (error) {
            console.error("Erro ao criar viagem:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
            <SidebarMenu />
            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />
                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem</h1>
                <div className='flex flex-col items-center w-9/10 border border-white mt-3' />

                <div className="flex flex-col items-center w-3/4 h-230 mt-8 p-4 border border-[#00FF4D] rounded-4xl shadow-lg">
                    <div className="relative w-[98%]">
                        {/* Nome da viagem */}
                        <label className="absolute left-4 top-6 text-[#3B4449] text-1xl font-bold">
                            Nome da Viagem <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            placeholder="Digite o nome da viagem"
                            className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                        />

                        {/* Descrição */}
                        <label className="absolute left-4 top-32 text-[#3B4449] text-1xl font-bold">
                            Descrição da Viagem <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Digite a descrição da viagem"
                            className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                        />

                        {/* Pública/Privada */}
                        <div className="flex items-center w-full mt-5 justify-between">
                            <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>
                                A Viagem será pública ou privada? <span className="text-red-500">*</span>
                            </h1>

                            <div className="flex mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        className="hidden"
                                        checked={selectedOption === "public"}
                                        onChange={() => setSelectedOption("public")}
                                    />
                                    <span className={`px-10 py-4 rounded-tl-3xl rounded-bl-3xl font-medium cursor-pointer ${selectedOption === "public" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"}`}>
                                        <Earth className="inline-block mr-2 w-5 h-5" />
                                        Pública
                                    </span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        className="hidden"
                                        checked={selectedOption === "private"}
                                        onChange={() => setSelectedOption("private")}
                                    />
                                    <span className={`px-10 py-4 rounded-tr-3xl rounded-br-3xl font-medium cursor-pointer ${selectedOption === "private" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"}`}>
                                        Privada
                                        <EarthLock className="inline-block ml-2 w-5 h-5" />
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Quantidade de vagas */}
                        <div className="flex items-center justify-between w-full mt-15">
                            <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>
                                Quantas vagas disponíveis <span className="text-red-500">*</span>
                            </h1>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                    className="w-12 h-12 mt-10 bg-[#00FF4D] rounded-full hover:bg-green-600"
                                >
                                    <Minus className='w-10 h-10 text-[#0F2976]' />
                                </button>

                                <span className="text-8xl text-white font-bold">{count}</span>

                                <img src='../images-home_page/walking.png' className='w-15 h-15 mt-8' />

                                <button
                                    onClick={() => setCount((prev) => prev + 1)}
                                    className="w-12 h-12 mt-10 bg-[#00FF4D] rounded-full hover:bg-green-600"
                                >
                                    <Plus className='w-10 h-10 text-[#0F2976]' />
                                </button>
                            </div>
                        </div>

                        {/* Datas */}
                        <div className="w-[25%] ml-auto border-t border-1 border-white justify-between"></div>

                        <h1 className="font-bold text-3xl text-left text-white mt-15 pl-5 w-full">
                            Qual será a Data Inicial e a Data Final da Viagem <span className="text-red-500">*</span>
                        </h1>

                        <div className="flex mt-10 h-15">
                            <p className='bg-white w-30 rounded-tl-2xl rounded-bl-2xl font-bold text-[#3B4449] ml-5'>Data de Inicio</p>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="ml-2 px-3 py-2 rounded-md"
                            />

                            <p className='bg-white w-30 rounded-tl-2xl rounded-bl-2xl font-bold text-[#3B4449] ml-20'>Data Final</p>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="ml-2 px-3 py-2 rounded-md"
                            />
                        </div>

                        {/* Imagem */}
                        <div className="w-full flex flex-col relative items-center justify-center mt-15">
                            <div className='absolute bg-white w-3/5 h-40 rounded-md'></div>
                            <ImagePlus className='absolute w-25 h-25 mb-12'/>
                            <label htmlFor="file-upload" className="absolute mt-25 text-[#0F2976] text-3xl cursor-pointer">
                                Insira foto da Viagem
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Botão de submit */}
                <div className='w-full flex flex-col items-center justify-center mt-15'>
                    <button
                        onClick={handleSubmit}
                        className="bg-[#00FF4D] text-[#0F2976] font-bold text-2xl rounded-lg w-3/5 h-20 text-3xl cursor-pointer"
                    >
                        Próximo
                    </button>
                </div>

                <div className='flex flex-col items-center mt-20' />
            </div>
        </div>
    );
}
