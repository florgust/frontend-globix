"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/common/Modal";
import {
  X,
  Bus,
  Plane,
  Car,
  Train,
  Ship,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import api from "@/utils/axios";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import RequireAuth from "@/components/auth/RequireAuth";
import WhiteBackground from "@/components/create_trip/whiteBackground";
import { Alert } from "@/components/common/Alert";
import { useTripCreation } from "@/utils/contextAPI";

export default function TravelTransport() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [confirmedOption, setConfirmedOption] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>(
    {}
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { state, updateTransportInfo, setCurrentStep } = useTripCreation();

  const [placeholders] = useState({
    avião:
      "Informe dados importantes sobre o transporte aéreo, como: Nome da companhia aérea, modelo da aeronave e serviços disponíveis a bordo.",
    ônibus:
      "Informe dados importantes sobre o transporte de ônibus, como: Nome da empresa de transporte, tipo de veículo e comodidades disponíveis.",
    carro:
      "Informe dados importantes sobre o carro, como: Modelo, marca, cor, capacidade de passageiros e condições gerais do veículo.",
    trem: "Informe dados importantes sobre o transporte ferroviário, como: Nome da companhia ferroviária, tipo de trem e serviços disponíveis.",
    navio:
      "Informe dados importantes sobre o transporte marítimo, como: Nome da companhia marítima, tipo de embarcação e comodidades disponíveis.",
  });

  // Mapeamento de ícones para cada transporte
  const transportIcons = {
    avião: Plane,
    ônibus: Bus,
    carro: Car,
    trem: Train,
    navio: Ship,
  };


  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (state.tripData.transportInfo && !dataLoaded) {
      setConfirmedOption(state.tripData.transportInfo.tipoTransporte || "");
      setDescriptions({
        [state.tripData.transportInfo.tipoTransporte]:
          state.tripData.transportInfo.descricao || "",
      });
      setDataLoaded(true);
    }
  }, [state.tripData.transportInfo, dataLoaded]);

  // Salvar automaticamente quando os dados mudam
  useEffect(() => {
    // Só salva se pelo menos um transporte foi selecionado e tem descrição
    if (confirmedOption && descriptions[confirmedOption]) {
      updateTransportInfo({
        tipoTransporte: confirmedOption,
        descricao: descriptions[confirmedOption],
      });
    }
  }, [confirmedOption, descriptions, updateTransportInfo]);

  // Função para buscar transporte do back-end
  const fetchTransporte = async () => {
    try {
      const response = await api.get("/transportes");
      const transporte = response.data;

      if (transporte) {
        setConfirmedOption(transporte.tipoTransporte);
        setDescriptions({ [transporte.tipoTransporte]: transporte.descricao });
      }
    } catch (error) {
      console.error("Erro ao buscar transporte:", error);
    }
  };

  // Função para salvar transporte no back-end
  const handleSave = async () => {
    // Validações
    if (!confirmedOption) {
      setAlertMessage("Por favor, selecione um tipo de transporte");
      return;
    }

    if (!descriptions[confirmedOption]) {
      setAlertMessage("Por favor, preencha a descrição do transporte");
      return;
    }

    try {
      // Dados já foram salvos automaticamente no useEffect
      // Definir que estamos na etapa 3
      setCurrentStep(3);

      // Mostrar sucesso e ir para próxima tela
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/trip_budget");
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setAlertMessage("Erro ao salvar dados. Tente novamente.");
    }
  };

  const handleCloseModalSuccess = () => {
    setShowSuccess(false);
    router.push("/trip_budget");
  };

  useEffect(() => {
    fetchTransporte();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleTransportClick = (item: string) => {
    setSelectedOption(item);
    setDescription(descriptions[item] || "");
    setOpenModal(true);
  };

  const handleSaveAndExit = () => {
    if (selectedOption) {
      setDescriptions({
        [selectedOption]: description,
      });
      setConfirmedOption(selectedOption);
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDescription("");
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

        {alertMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
            <Alert message={alertMessage} type="error" />
          </div>
        )}

        <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <HeaderPages />

          <WhiteBackground titulo="Escolher Transporte">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Título principal */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#3B4449] mb-4">
                  Qual será o Transporte utilizado na Viagem?
                </h2>
                <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
              </div>

              <Modal isOpen={openModal}>
                <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-[#0F2976] text-4xl text-center mb-10">
                    Insira a descrição do Transporte:
                  </h1>
                  <textarea
                    placeholder={
                      selectedOption
                        ? placeholders[
                        selectedOption as keyof typeof placeholders
                        ]
                        : ""
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-[38rem] h-[12rem] pl-10 pr-10 pt-5 bg-[#0F2976] text-white placeholder-gray-300 rounded-[4.375rem] placeholder:text-2xl placeholder:leading-8 resize-none"
                    style={{ fontSize: "1.5rem" }}
                  />
                  <button
                    onClick={handleSaveAndExit}
                    disabled={description.trim().length === 0}
                    className={`mt-5 font-bold text-xl px-6 py-3 rounded-lg ${description.trim().length > 0
                        ? "bg-[#00FF4D] text-[#0F2976] cursor-pointer"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
                  >
                    Salvar e Sair
                  </button>
                  <button onClick={handleCloseModal}>
                    <X className="absolute top-10 right-10 w-12 h-12 text-[#6C727F] cursor-pointer" />
                  </button>
                </div>
              </Modal>

              {/* Opções de Transporte */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                {["avião", "ônibus", "carro", "trem", "navio"].map((item) => {
                  const IconComponent =
                    transportIcons[item as keyof typeof transportIcons];
                  const isSelected = confirmedOption === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      className={`group relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer ${isSelected
                          ? "bg-[#0F2976] border-[#0F2976] text-white shadow-lg"
                          : "bg-white border-gray-200 text-[#3B4449] hover:border-[#0F2976] hover:shadow-md"
                        }`}
                      onClick={() => handleTransportClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleTransportClick(item);
                        }
                      }}
                    >
                      {/* Ícone de confirmação */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00FF4D] rounded-full flex items-center justify-center">
                          <CheckCircle className="text-[#0F2976]" size={16} />
                        </div>
                      )}

                      {/* Ícone do transporte */}
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isSelected
                            ? "bg-[#00FF4D]"
                            : "bg-gray-100 group-hover:bg-gray-200"
                          }`}
                      >
                        <IconComponent
                          size={32}
                          className={
                            isSelected ? "text-[#0F2976]" : "text-[#3B4449]"
                          }
                        />
                      </div>

                      {/* Nome do transporte */}
                      <span
                        className={`text-lg font-semibold capitalize ${isSelected ? "text-white" : "text-[#3B4449]"
                          }`}
                      >
                        {item}
                      </span>

                      {/* Indicador de descrição */}
                      {descriptions[item] && (
                        <div className="mt-2 text-xs opacity-75">
                          ✓ Descrição adicionada
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Transporte selecionado */}
              {confirmedOption && (
                <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="text-green-600 mr-3" size={24} />
                    <h3 className="text-green-800 font-bold text-lg">
                      Transporte Selecionado:{" "}
                      {confirmedOption.charAt(0).toUpperCase() +
                        confirmedOption.slice(1)}
                    </h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    {descriptions[confirmedOption]}
                  </p>
                </div>
              )}

              {/* Linha divisória */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Botão */}
              <div className="text-center">
                <button
                  onClick={handleSave}
                  disabled={!confirmedOption || !descriptions[confirmedOption]}
                  className={`flex items-center gap-3 px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg mx-auto cursor-pointer ${!confirmedOption || !descriptions[confirmedOption]
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-[#B1FF91] text-[#0F2976] cursor-pointer hover:bg-[#9AE670] hover:shadow-xl transform hover:scale-105"
                    }`}
                >
                  <CheckCircle size={24} />
                  Confirmar Transporte
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </WhiteBackground>
        </div>

        <SuccessModal
          isOpen={showSuccess}
          message="Transporte salvo com sucesso!"
          onClose={handleCloseModalSuccess}
        />
      </div>
    </RequireAuth>
  );
}
