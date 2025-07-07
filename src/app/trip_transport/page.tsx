"use client";
import React, { useState, useEffect } from "react";
import WhiteBackground from "@/components/create_trip/whiteBackground";
import { HeaderPages } from "@/components/common/Header";
import SidebarMenu from "@/components/common/SidebarMenu";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { Alert } from "@/components/common/Alert";
import RequireAuth from "@/components/auth/RequireAuth";
import {
  Car,
  Plane,
  Bus,
  Ship,
  Bike,
  MapPin,
  ArrowRight,
  Info,
} from "lucide-react";
import { useTripCreation } from "@/utils/contextAPI";

export default function TripTransport() {
  const router = useRouter();
  const { state, updateTransportInfo, setCurrentStep } = useTripCreation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [confirmedOption, setConfirmedOption] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>(
    {}
  );
  const [openModal, setOpenModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Carregar dados salvos quando a tela abrir
  useEffect(() => {
    if (state.tripData.transportInfo && !dataLoaded) {
      const savedTransport = state.tripData.transportInfo.tipoTransporte;
      const savedDescription = state.tripData.transportInfo.descricao;

      setConfirmedOption(savedTransport);
      setSelectedOption(savedTransport);
      setDescription(savedDescription);
      setDescriptions({
        [savedTransport]: savedDescription,
      });
      setDataLoaded(true);

      console.log("Dados carregados:", { savedTransport, savedDescription });
    } else {
      // Marca como carregado mesmo se não houver dados
      setDataLoaded(true);
    }
  }, [state.tripData.transportInfo, dataLoaded]);

  // Salvar automaticamente quando os dados mudam
  useEffect(() => {
    // Só salva se os dados foram carregados e um transporte foi CONFIRMADO
    if (dataLoaded && confirmedOption) {
      const timer = setTimeout(() => {
        const transportDescription = descriptions[confirmedOption] || "";
        updateTransportInfo({
          tipoTransporte: confirmedOption,
          descricao: transportDescription,
        });

        console.log("Dados salvos:", { confirmedOption, transportDescription });
      }, 500); // Debounce de 500ms

      return () => clearTimeout(timer);
    }
  }, [confirmedOption, descriptions, dataLoaded]); // Mudança aqui: usar confirmedOption e descriptions

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const transportOptions = [
    {
      id: "onibus",
      name: "Ônibus",
      icon: Bus,
      description: "Confortável e econômico para longas distâncias",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "carro",
      name: "Carro",
      icon: Car,
      description: "Flexibilidade e comodidade para o grupo",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: "aviao",
      name: "Avião",
      icon: Plane,
      description: "Rapidez para destinos distantes",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      id: "navio",
      name: "Navio/Barco",
      icon: Ship,
      description: "Experiência única em viagens aquáticas",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
    },
    {
      id: "bicicleta",
      name: "Bicicleta",
      icon: Bike,
      description: "Sustentável e saudável para curtas distâncias",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDescription(descriptions[option] || "");
    setOpenModal(true);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;

    // Salvar a descrição no state de descrições
    const newDescriptions = {
      ...descriptions,
      [selectedOption]: description,
    };
    setDescriptions(newDescriptions);

    setConfirmedOption(selectedOption);
    setOpenModal(false);
  };

  const handleCancel = () => {
    setSelectedOption(confirmedOption);
    setDescription(descriptions[confirmedOption || ""] || "");
    setOpenModal(false);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    // Validações
    if (!confirmedOption) {
      setAlertMessage("Por favor, selecione um tipo de transporte");
      return;
    }

    try {
      // Salvar uma última vez para garantir
      updateTransportInfo({
        tipoTransporte: confirmedOption,
        descricao: descriptions[confirmedOption] || "",
      });

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

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push("/trip_budget");
  };

  const getSelectedTransport = () => {
    return transportOptions.find((opt) => opt.id === confirmedOption);
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
          <WhiteBackground titulo="Definir Transporte">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Seção de Informações */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#0F2976]">
                <div className="flex items-center mb-3">
                  <Info className="text-[#0F2976] mr-3" size={24} />
                  <h3 className="text-[#0F2976] font-bold text-lg">
                    Escolha o Transporte
                  </h3>
                </div>
                <p className="text-[#3B4449] text-sm leading-relaxed">
                  Selecione o meio de transporte que será utilizado na viagem.
                  Você pode adicionar informações específicas sobre o transporte
                  escolhido.
                </p>
              </div>

              {/* Opções de Transporte */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Meios de Transporte
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {transportOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = confirmedOption === option.id;
                    const isPending = selectedOption === option.id && openModal;

                    return (
                      <div
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? `${option.color} border-transparent text-white shadow-lg`
                            : isPending
                            ? "border-yellow-400 bg-yellow-50 shadow-md"
                            : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-md"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                              isSelected
                                ? "bg-white/20"
                                : isPending
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              size={32}
                              className={
                                isSelected
                                  ? "text-white"
                                  : isPending
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                              }
                            />
                          </div>
                          <h3
                            className={`text-xl font-bold mb-2 ${
                              isSelected
                                ? "text-white"
                                : isPending
                                ? "text-yellow-800"
                                : "text-[#3B4449]"
                            }`}
                          >
                            {option.name}
                          </h3>
                          <p
                            className={`text-sm ${
                              isSelected
                                ? "text-white/80"
                                : isPending
                                ? "text-yellow-700"
                                : "text-gray-600"
                            }`}
                          >
                            {option.description}
                          </p>
                        </div>

                        {/* Indicador de seleção */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        )}

                        {/* Indicador de pendente */}
                        {isPending && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transporte Selecionado */}
              {confirmedOption && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
                  <h3 className="text-lg font-bold text-[#3B4449] mb-4 flex items-center">
                    <MapPin className="mr-2 text-[#0F2976]" size={20} />
                    Transporte Selecionado
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {(() => {
                        const transport = getSelectedTransport();
                        if (!transport) return null;
                        const IconComponent = transport.icon;
                        return (
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mr-4 ${transport.color}`}
                          >
                            <IconComponent size={24} className="text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="text-[#0F2976] font-bold text-lg">
                          {getSelectedTransport()?.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {getSelectedTransport()?.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOptionSelect(confirmedOption)}
                      className="text-[#0F2976] hover:text-[#1C4CDC] font-medium text-sm"
                    >
                      Editar
                    </button>
                  </div>

                  {/* Descrição salva */}
                  {descriptions[confirmedOption] && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-[#3B4449] mb-2">
                        Informações Adicionais:
                      </h4>
                      <p className="text-gray-700 text-sm">
                        {descriptions[confirmedOption]}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Botão de Continuar */}
              <div className="text-center">
                <button
                  onClick={handleSave}
                  disabled={!confirmedOption}
                  className={`flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg mx-auto transform hover:scale-105 ${
                    confirmedOption
                      ? "bg-[#B1FF91] text-[#0F2976] hover:bg-[#9AE670] hover:shadow-xl cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continuar para Orçamento
                  <ArrowRight size={28} />
                </button>
              </div>

              <SuccessModal
                isOpen={showSuccess}
                message="Transporte definido com sucesso!"
                onClose={handleCloseModal}
              />
            </div>
          </WhiteBackground>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {openModal && selectedOption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              {(() => {
                const transport = transportOptions.find(
                  (opt) => opt.id === selectedOption
                );
                if (!transport) return null;
                const IconComponent = transport.icon;
                return (
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${transport.color}`}
                  >
                    <IconComponent size={32} className="text-white" />
                  </div>
                );
              })()}
              <h3 className="text-2xl font-bold text-[#3B4449] mb-2">
                {
                  transportOptions.find((opt) => opt.id === selectedOption)
                    ?.name
                }
              </h3>
              <p className="text-gray-600">
                {
                  transportOptions.find((opt) => opt.id === selectedOption)
                    ?.description
                }
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-[#3B4449] font-semibold mb-2">
                Informações Adicionais (opcional)
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Ex: Empresa de ônibus, modelo do carro, horários específicos..."
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-[#0F2976] focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-200 text-[#3B4449] rounded-xl hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-[#0F2976] text-white rounded-xl hover:bg-[#1C4CDC] transition-colors duration-200 font-semibold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </RequireAuth>
  );
}
