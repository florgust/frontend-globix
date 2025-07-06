"use client";
import WhiteBackground from "@/components/create_trip/whiteBackground";
import { HeaderPages } from "@/components/common/Header";
import SidebarMenu from "@/components/common/SidebarMenu";
import React, { useState, useEffect } from "react";
import { ImagePlus, Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation"; 
import api from "@/utils/axios"; 
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import Cookies from "js-cookie"; 
import { Alert } from "@/components/common/Alert";
import RequireAuth from "@/components/auth/RequireAuth";
import { Globe, Lock } from "lucide-react";
import { MapPin, ArrowRight } from "lucide-react";

export default function ExamplePage() {
const [selectedOption, setSelectedOption] = useState("public");
  const [count, setCount] = useState(0);
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cidadeOrigem, setCidadeOrigem] = useState("");
  const [cidadeDestino, setCidadeDestino] = useState("");


  // Função para calcular a duração em dias
  function calculateDuration(start: string, end: string): number {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = endDateObj.getTime() - startDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleCreateTrip = async () => {
    if (!tripName || !tripDescription || !startDate || !endDate || count <= 0) {
      setAlertMessage(
        "Preencha todos os campos obrigatórios antes de prosseguir."
      );
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
      criadorId, 
      tipo: selectedOption === "public" ? "publica" : "privada",
      quantidadeParticipante: count,
      cidadeOrigem: cidadeOrigem,
      cidadeDestino: cidadeDestino,
    };
    console.log("Payload da viagem:", payload);
    try {
      const response = await api.post("/viagem", payload);
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
    router.push("/trip_location");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <SidebarMenu />

        {alertMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
            <Alert message={alertMessage} type="error" />
          </div>
        )}

        <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <HeaderPages />
          <WhiteBackground titulo="Criar Viagem">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Seção 1: Informações Básicas */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Informações Básicas
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="absolute left-4 top-2 text-[#3B4449] text-lg font-bold">
                      Nome da Viagem<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Digite o nome da viagem"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      className="w-full h-20 px-4 pt-8 py-2 rounded-xl bg-white outline-none border border-[#092064] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute left-4 top-2 text-[#3B4449] text-lg font-bold">
                      Descrição da Viagem<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Digite a descrição da viagem"
                      value={tripDescription}
                      onChange={(e) => setTripDescription(e.target.value)}
                      className="w-full h-20 px-4 pt-8 py-2 rounded-xl bg-white outline-none border border-[#092064] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>

              {/* Linha divisória */}
              <div className="flex items-center justify-center mb-16">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Seção 2: Localização */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Origem e Destino
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <label className="block text-[#3B4449] text-lg font-semibold mb-3">
                      <MapPin
                        size={18}
                        className="inline mr-2 text-green-600"
                      />
                      Cidade de Origem
                    </label>
                    <input
                      type="text"
                      value={cidadeOrigem}
                      onChange={(e) => setCidadeOrigem(e.target.value)}
                      placeholder="Ex: São Paulo, SP"
                      className="w-full h-16 px-4 py-2 rounded-xl bg-white border-2 border-[#092064] outline-none focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 text-[#3B4449]"
                    />
                  </div>

                  <div className="flex items-center justify-center mt-8">
                    <ArrowRight size={32} className="text-[#0F2976]" />
                  </div>

                  <div className="flex-1">
                    <label className="block text-[#3B4449] text-lg font-semibold mb-3">
                      <MapPin size={18} className="inline mr-2 text-red-600" />
                      Cidade de Destino
                    </label>
                    <input
                      type="text"
                      value={cidadeDestino}
                      onChange={(e) => setCidadeDestino(e.target.value)}
                      placeholder="Ex: Rio de Janeiro, RJ"
                      className="w-full h-16 px-4 py-2 rounded-xl bg-white border-2 border-[#092064] outline-none focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 text-[#3B4449]"
                    />
                  </div>
                </div>

                {/* Resumo da rota */}
                {cidadeOrigem && cidadeDestino && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border text-center">
                    <p className="text-lg text-[#0F2976] font-medium">
                      Rota: <span className="font-bold">{cidadeOrigem}</span>
                      <ArrowRight size={20} className="inline mx-3" />
                      <span className="font-bold">{cidadeDestino}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Linha divisória */}
              <div className="flex items-center justify-center mb-16">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Seção 3: Configurações */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Configurações da Viagem
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Tipo de Viagem */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#3B4449] mb-6">
                      Tipo de Viagem <span className="text-red-500">*</span>
                    </h3>
                    <div className="flex justify-center gap-6">
                      <button
                        type="button"
                        onClick={() => setSelectedOption("public")}
                        className={`flex flex-col items-center justify-center w-40 h-36 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          selectedOption === "public"
                            ? "bg-[#0F2976] border-[#0F2976] text-white shadow-lg transform scale-105"
                            : "bg-white border-gray-300 text-[#3B4449] hover:border-[#0F2976] hover:shadow-md"
                        }`}
                      >
                        <Globe
                          size={45}
                          className={`mb-3 ${
                            selectedOption === "public"
                              ? "text-[#00FF4D]"
                              : "text-[#0F2976]"
                          }`}
                        />
                        <span className="text-lg font-semibold">Pública</span>
                        <span className="text-sm opacity-75 mt-1">
                          Visível para todos
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedOption("private")}
                        className={`flex flex-col items-center justify-center w-40 h-36 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          selectedOption === "private"
                            ? "bg-[#0F2976] border-[#0F2976] text-white shadow-lg transform scale-105"
                            : "bg-white border-gray-300 text-[#3B4449] hover:border-[#0F2976] hover:shadow-md"
                        }`}
                      >
                        <Lock
                          size={45}
                          className={`mb-3 ${
                            selectedOption === "private"
                              ? "text-[#00FF4D]"
                              : "text-[#0F2976]"
                          }`}
                        />
                        <span className="text-lg font-semibold">Privada</span>
                        <span className="text-sm opacity-75 mt-1">
                          Apenas convidados
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Vagas */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#3B4449] mb-6">
                      Vagas Disponíveis <span className="text-red-500">*</span>
                    </h3>
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            setCount((prev) => Math.max(0, prev - 1))
                          }
                          className="flex items-center justify-center w-14 h-14 bg-[#0F2976] text-white rounded-full hover:bg-[#1C4CDC] transition-colors duration-200 shadow-lg cursor-pointer"
                          disabled={count <= 0}
                        >
                          <Minus size={24} />
                        </button>

                        <div className="flex items-center">
                          <input
                            type="number"
                            value={count}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              setCount(Math.max(0, value));
                            }}
                            className="w-24 h-18 text-center text-3xl font-bold text-[#0F2976] bg-white border-2 border-[#0F2976] rounded-xl outline-none"
                            min="0"
                            max="99"
                          />
                          <span className="ml-4 text-lg text-[#3B4449] font-medium">
                            {count === 1 ? "vaga" : "vagas"}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCount((prev) => prev + 1)}
                          className="flex items-center justify-center w-14 h-14 bg-[#00FF4D] text-[#0F2976] rounded-full hover:bg-green-400 transition-colors duration-200 shadow-lg cursor-pointer"
                        >
                          <Plus size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {count === 0 && "Defina o número de vagas disponíveis"}
                      {count > 0 &&
                        count <= 5 &&
                        "Grupo pequeno - experiências íntimas"}
                      {count > 5 &&
                        count <= 15 &&
                        "Grupo médio - equilibrio ideal"}
                      {count > 15 && "Grupo grande - mais diversão"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Linha divisória */}
              <div className="flex items-center justify-center mb-16">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Seção 4: Datas */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Datas da Viagem
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[#3B4449] text-lg font-semibold mb-3">
                      Data de Início <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-16 px-4 py-2 text-lg text-[#0F2976] bg-white border-2 border-[#092064] rounded-xl outline-none focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-[#3B4449] text-lg font-semibold mb-3">
                      Data Final <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full h-16 px-4 py-2 text-lg text-[#0F2976] bg-white border-2 border-[#092064] rounded-xl outline-none focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200"
                      min={startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Indicadores de data */}
                {startDate && endDate && (
                  <div className="mt-8 text-center">
                    {new Date(startDate) <= new Date(endDate) ? (
                      <div className="p-4 bg-gray-50 rounded-xl border">
                        <p className="text-xl text-[#0F2976] font-bold">
                          📅 Duração: {calculateDuration(startDate, endDate)}{" "}
                          dias
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <p className="text-red-700 font-medium">
                          ⚠️ Data de início deve ser anterior à data final
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Linha divisória */}
              <div className="flex items-center justify-center mb-16">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Seção 5: Imagem */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Foto da Viagem
                    <span className="text-gray-500 text-lg font-normal ml-2">
                      (opcional)
                    </span>
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-lg">
                    {!imagePreview ? (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#0F2976] transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                          <ImagePlus size={52} className="text-gray-400 mb-4" />
                          <p className="text-[#3B4449] text-xl font-medium">
                            Clique para adicionar uma foto
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            PNG, JPG ou JPEG (máx. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview da viagem"
                          className="w-full h-72 object-cover rounded-2xl shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors duration-200 shadow-lg cursor-pointer"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Linha divisória final */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Botão Final */}
              <div className="text-center">
                <button
                  type="button"
                  className="flex items-center bg-[#B1FF91] text-[#0F2976] gap-4 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg cursor-pointer hover:bg-[#9AE670] hover:shadow-xl transform hover:scale-105 mx-auto"
                  onClick={handleCreateTrip}
                >
                  Definir Embarque e Desembarque
                  <ArrowRight size={28} />
                </button>
                <SuccessModal
                  isOpen={showSuccess}
                  message="Detalhes da Viagem criado com sucesso!"
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </WhiteBackground>
          <div className="mt-20" />
        </div>
      </div>
    </RequireAuth>
  );
}
