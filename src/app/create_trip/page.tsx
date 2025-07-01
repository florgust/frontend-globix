"use client"
import { HeaderPages } from '@/components/ui/header';
import SidebarMenu from '@/components/ui/SidebarMenu';
import React, { useState, useEffect } from 'react';
import { ImagePlus, Minus, Plus } from 'lucide-react';
import { useRouter } from "next/navigation"; // Importa o useRouter
import DatePickerHtml from '@/components/ui/DatePickerHtml';
import api from "@/utils/axios"; // Importa o axios configurado
import SuccessModal from '@/components/ui/modals/ModalSuccess';
import Cookies from "js-cookie"; // Adicione este import
import { Alert } from '@/components/ui/Alert';
import RequireAuth from "@/components/auth/RequireAuth";


export default function CreateTripPage() {
    const [selectedOption, setSelectedOption] = useState("public");
    const [count, setCount] = useState(0);
    const [tripName, setTripName] = useState("");
    const [tripDescription, setTripDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");


    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    const handleCreateTrip = async () => {
        if (!tripName || !tripDescription || !startDate || !endDate || count <= 0) {
            setAlertMessage("Preencha todos os campos obrigatórios antes de prosseguir.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setAlertMessage("A data de início não pode ser depois da data final.");
            return;
        }

        // Pegue o usuário do cookie
        const usuarioCookie = Cookies.get("usuario");
        if (!usuarioCookie) {
            alert("Usuário não autenticado.");
            return;
        }
        const usuarioObj = JSON.parse(usuarioCookie);
        const criadorId = usuarioObj.id;

        const payload = {
            nome: tripName,
            descricao: tripDescription,
            dataInicio: startDate,
            dataFim: endDate,
            criadorId, // Agora usando o ID do usuário autenticado
            tipo: selectedOption === "public" ? "publica" : "privada",
            quantidadeParticipante: count,
        };

        try {
            const response = await api.post('/viagem', payload);
            localStorage.setItem("viagemEmCriacao", JSON.stringify(response.data));

            const idViagem = response.data.id; // Ajuste conforme o nome do campo retornado
            await api.post(`/solicitacao/criador/${criadorId}/${idViagem}`);
            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao criar viagem:", error);
            alert("Ocorreu um erro ao criar a viagem. Tente novamente.");
        }
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
        router.push("/travel_location");
    };

    return (
        <RequireAuth>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
                <SidebarMenu />

            {alertMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert message={alertMessage} type="error" />
                </div>
            )}
            <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
                <HeaderPages />
                <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">Criar Viagem</h1>
                <div className='flex flex-col items-center w-9/10 border border-white mt-3' />

                    <div className="flex flex-col items-center w-3/4 h-230 mt-8 p-4 border border-[#00FF4D] rounded-4xl shadow-lg">

                        <div className="relative w-[98%]">
                            <label
                                htmlFor="nome-viagem"
                                className="absolute left-4 top-6 text-[#3B4449] text-1xl font-bold"
                            >
                                Nome da Viagem <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nome-viagem"
                                placeholder="Digite o nome da viagem"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                            />

                            <label
                                htmlFor="descricao-viagem"
                                className="absolute left-4 top-32 text-[#3B4449] text-1xl font-bold"
                            >
                                Descrição da Viagem <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="descricao-viagem"
                                placeholder="Digite a descrição da viagem"
                                value={tripDescription}
                                onChange={(e) => setTripDescription(e.target.value)}
                                className="w-full h-20 px-4 pt-7 py-2 mt-5 rounded-xl bg-white outline-none"
                            />

                            <div className="flex items-center w-full mt-5 justify-between">
                                <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>A Viagem será pública ou privada? <span className="text-red-500">*</span></h1>

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
                                            className={`px-10 py-4 rounded-tl-3xl rounded-bl-3xl font-medium cursor-pointer ${selectedOption === "public" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"
                                                }`}
                                        >
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
                                            className={`px-10 py-4 rounded-tr-3xl rounded-br-3xl font-medium cursor-pointer ${selectedOption === "private" ? "bg-[#0F2976] text-[#00FF4D]" : "bg-white text-[#0F2976]"
                                                }`}
                                        >
                                            Privada
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full mt-15">
                                <h1 className='font-bold text-3xl text-left text-white mt-5 pl-2'>Quantas vagas disponíveis <span className="text-red-500">*</span></h1>

                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                        className="flex items-center justify-center w-12 h-12 mt-10 bg-[#00FF4D] text-white text-4xl font-bold rounded-full cursor-pointer hover:bg-green-600"
                                    >
                                        <Minus className='w-10 h-10 text-[#0F2976]' />
                                    </button>

                                    <span className="text-8xl text-white font-bold">{count}</span>

                                    <button
                                        onClick={() => setCount((prev) => prev + 1)}
                                        className="flex items-center justify-center w-12 h-12 mt-10 bg-[#00FF4D] text-white font-bold rounded-full cursor-pointer hover:bg-green-600"
                                    >
                                        <Plus className='w-10 h-10 text-[#0F2976]' />
                                    </button>
                                </div>
                            </div>

                            <h1 className="font-bold text-3xl text-left text-white mt-15 pl-5 w-full">
                                Qual será a Data Inicial e a Data Final da Viagem <span className="text-red-500">*</span></h1>

                            <div className="flex mt-10 h-15">
                                <p className='flex items-center justify-center bg-white w-30 rounded-tl-2xl rounded-bl-2xl font-bold text-[#3B4449] ml-5'>Data de Inicio</p>
                                <DatePickerHtml onChange={(date) => setStartDate(date)} />
                                <p className='flex items-center justify-center bg-white w-30 rounded-tl-2xl rounded-bl-2xl font-bold text-[#3B4449] ml-150'>Data Final</p>
                                <DatePickerHtml onChange={(date) => setEndDate(date)} />
                            </div>

                        <div className="w-full flex flex-col relative items-center justify-center mt-15  cursor-pointer">
                            <div className='absolute bg-white w-3/5 h-40 rounded-md'></div>

                                <ImagePlus className='absolute w-25 h-25 mb-12' />

                            <label
                                htmlFor="file-upload"
                                className="absolute mt-25 text-[#0F2976] text-3xl cursor-pointer" 
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

                    <div className='w-full flex flex-col items-center justify-center mt-15'>
                        <button
                            onClick={handleCreateTrip}
                            className="absolute bg-[#00FF4D] text-[#0F2976] font-bold rounded-lg w-3/5 h-20 text-3xl cursor-pointer"
                        >
                            Próximo
                        </button>
                        <SuccessModal
                            isOpen={showSuccess}
                            message="Viagem criada com sucesso!"
                            onClose={handleCloseModal}
                        />
                    </div>

                    <div className='flex flex-col items-center mt-20' />
                </div>
            </div>
        </RequireAuth>
    )
}