"use client"
import { HeaderPages } from '@/components/ui/header';
import SidebarMenu from '@/components/ui/SidebarMenu';
import React, { useState } from 'react';
import { Earth, EarthLock, ImagePlus, Minus, Plus } from 'lucide-react';
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CreateTripPage() {
    const [selectedOption, setSelectedOption] = useState("public");
    const [count, setCount] = useState(0);
    const [dataInicial, setDataInicial] = React.useState<Date>()
    const [dataFinal, setDataFinal] = React.useState<Date>()

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
            <div className="flex flex-col h-auto">
            <SidebarMenu />
        </div>
            <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages/>
                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem</h1>
                <div className='flex flex-col items-center w-9/10 border border-white mt-3'/>

                    <div className="flex flex-col items-center w-3/4 h-230 mt-8 p-4 border border-[#00FF4D] rounded-4xl shadow-lg">
                    
                    <div className="relative w-[98%]">
                        <label
                            htmlFor="nome-viagem"
                            className="absolute left-4 top-6 text-[#3B4449] text-1xl font-bold"
                        >
                            Nome da Viagem *
                        </label>
                        <input
                            type="text"
                            id="nome-viagem"
                            placeholder="Digite o nome da viagem"
                            className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                        />
                        
                        <label
                            htmlFor="nome-viagem"
                            className="absolute left-4 top-32 text-[#3B4449] text-1xl font-bold"
                        >
                            Descrição da Viagem *
                        </label>
                        <input
                            type="text"
                            id="nome-viagem"
                            placeholder="Digite o nome da viagem"
                            className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                        />

                        <div className="flex items-center gap-95 w-full mt-5">
                            <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>A Viagem será pública ou privada? *</h1>
                            
                            <div className="flex mt-4">

                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    className="hidden"
                                    onChange={() => setSelectedOption("public")}
                                    />
                                    <span
                                    className={`px-10 py-4 rounded-tl-3xl rounded-bl-3xl font-medium cursor-pointer ${
                                        selectedOption === "public" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"
                                    }`}
                                    >
                                    {selectedOption === "public" ? (
                                        <Earth className="flex inline-block mr-2 w-5 h-5" />
                                    ) : (
                                        <span className="w-5 h-5 inline-block" />
                                    )}
                                    Pública
                                    </span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        className="hidden"
                                        onChange={() => setSelectedOption("private")}
                                    />
                                    <span
                                    className={`px-10 py-4 rounded-tr-3xl rounded-br-3xl font-medium cursor-pointer ${
                                        selectedOption === "private" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"
                                    }`}
                                    >
                                    Privada
                                    {selectedOption === "private" ? (
                                        <EarthLock className="flex inline-block ml-2 w-5 h-5" />
                                    ) : (
                                        <span className="w-5 h-5 inline-block" />
                                    )}
                                    </span>
                                </label>
                            </div>

                        </div>

                        <div className="flex items-center gap-139 w-full mt-15">
                            <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>Quantas vagas disponíveis *</h1>

                            <div className="flex justify-center gap-4">
                                {/* Botão de diminuir */}
                                <button
                                    onClick={() => setCount((prev) => Math.max(prev - 1, 0))} // Evita valores negativos
                                    className="flex items-center justify-center w-12 h-12 mt-10 bg-[#00FF4D] text-white text-4xl font-bold rounded-full cursor-pointer hover:bg-green-600"
                                >
                                    <Minus className='w-10 h-10 text-[#0F2976]'/>
                                </button>

                                {/* Valor do contador */}
                                <span className="text-8xl text-white font-bold">{count}</span>

                                <img 
                                    src='../images-home_page/walking.png'
                                    className='w-15 h-15 mt-8'    
                                >
                                </img>

                                {/* Botão de aumentar */}
                                <button
                                    onClick={() => setCount((prev) => prev + 1)}
                                    className="flex items-center justify-center w-12 h-12 mt-10 bg-[#00FF4D] text-white font-bold rounded-full hover:bg-green-600"
                                >
                                    <Plus className='w-10 h-10 text-[#0F2976]'/>
                                </button>
                            </div>

                        </div>
                        <div className="w-[12%] ml-255 border-t border-1 border-white"></div>
                    </div>

                    <h1 className="font-bold text-3xl text-left text-white mt-15 pl-5 w-full">
                    Qual será a Data Inicial e a Data Final da Viagem *</h1>

                    <div className="flex mt-10">

                        <p className='flex items-center justify-center bg-white w-30 rounded-tl-2xl rounded-bl-2xl font-bold text-[#3B4449]'>Data de Inicio</p>       

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal bg-[#A7FF84] rounded-tr-2xl rounded-br-2xl",
                                        !dataInicial && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4 text-[#0F2976]" />
                                {dataInicial ? format(dataInicial, "PPP", { locale: ptBR }) : <span className='text-[#0F2976]'>Insira a data inicial</span>}
                                </Button>
                            </PopoverTrigger>
                            
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={dataInicial}
                                onSelect={setDataInicial}
                                initialFocus
                                locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>    

                        <p className='flex items-center justify-center bg-white w-30 rounded-tl-2xl rounded-bl-2xl ml-100 font-bold text-[#3B4449]'>Data Final</p>       

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal bg-[#A7FF84] rounded-tr-2xl rounded-br-2xl",
                                        !dataFinal && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="text-[#0F2976] mr-2 h-4 w-4" />
                                {dataFinal ? format(dataFinal, "PPP", { locale: ptBR }) : <span className='text-[#0F2976]'>Insira a data final</span>}                                </Button>
                            </PopoverTrigger>
                            
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={dataFinal}
                                onSelect={setDataFinal}
                                initialFocus
                                locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>    
                    </div>
                    
                 <div className="w-full flex flex-col items-center justify-center mt-15">
                        <ImagePlus className='absolute w-25 h-25 text-[#0F2976] mb-12'/>

                        <label
                            htmlFor="file-upload"
                            className="absolute mt-20 text-[#0F2976] font-bold text-2xl"
                        >
                            Insira foto da Viagem                        
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="block text-sm file:h-40 file:w-full file:mr-4 file:py-6 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-white"
                            />
                    </div>                   
                </div>
            </div>
        </div>
    )
}