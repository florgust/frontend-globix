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
  Calendar,
  Clock,
  MapPin,
  Camera,
  Coffee,
  Car,
  Plus,
  ArrowRight,
  Info,
  Star,
  Users,
  X,
} from "lucide-react";
import { useTripCreation } from "@/utils/contextAPI";

interface ItineraryItem {
  id: number;
  tipoEvento: string;
  titulo: string;
  dataHora: string;
  descricao: string;
  icon: React.ElementType;
  color: string;
}

export default function TripItinerary() {
  const router = useRouter();
  const { state, updateItineraryInfo, setCurrentStep, createTrip } =
    useTripCreation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
  const [nextId, setNextId] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);

  const eventTypes = [
    { value: "Turismo", icon: Camera, color: "bg-emerald-400" },
    { value: "Alimentação", icon: Coffee, color: "bg-emerald-600" },
    { value: "Transporte", icon: Car, color: "bg-green-600" },
    { value: "Hospedagem", icon: MapPin, color: "bg-teal-500" },
    { value: "Entretenimento", icon: Star, color: "bg-cyan-500" },
    { value: "Reunião", icon: Users, color: "bg-blue-500" },
  ];
  
  // Carregar dados salvos quando a tela abrir
  useEffect(() => {
    if (state.tripData.itineraryInfo && !dataLoaded) {
      const savedItineraries = state.tripData.itineraryInfo.itinerarios.map(
        (item, index) => {
          const eventType = eventTypes.find(
            (type) => type.value === item.tipoEvento
          );
          return {
            id: index + 1,
            tipoEvento: item.tipoEvento,
            titulo: item.titulo,
            dataHora: item.dataHora,
            descricao: item.descricao,
            icon: eventType?.icon || Camera,
            color: eventType?.color || "bg-blue-500",
          };
        }
      );

      setItineraryItems(savedItineraries);
      setNextId(savedItineraries.length + 1);
      setDataLoaded(true);
    } else {
      setDataLoaded(true);
    }
  }, [state.tripData.itineraryInfo, dataLoaded]);

  // Salvar automaticamente quando os dados mudam
  useEffect(() => {
    if (dataLoaded && itineraryItems.length > 0) {
      const timer = setTimeout(() => {
        const itineraryData = {
          itinerarios: itineraryItems.map((item) => ({
            tipoEvento: item.tipoEvento,
            titulo: item.titulo,
            dataHora: item.dataHora,
            descricao: item.descricao,
          })),
        };

        updateItineraryInfo(itineraryData);
        console.log("Dados salvos:", itineraryData);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [itineraryItems, dataLoaded, updateItineraryInfo]);

  // ...existing code...

  const [newItem, setNewItem] = useState({
    tipoEvento: "",
    titulo: "",
    dataHora: "",
    descricao: "",
  });

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleAddItem = () => {
    if (
      !newItem.tipoEvento ||
      !newItem.titulo ||
      !newItem.dataHora ||
      !newItem.descricao
    ) {
      setAlertMessage("Por favor, preencha todos os campos");
      return;
    }

    const eventType = eventTypes.find(
      (type) => type.value === newItem.tipoEvento
    );

    const item: ItineraryItem = {
      id: nextId,
      tipoEvento: newItem.tipoEvento,
      titulo: newItem.titulo,
      dataHora: newItem.dataHora,
      descricao: newItem.descricao,
      icon: eventType?.icon || Camera,
      color: eventType?.color || "bg-blue-500",
    };

    setItineraryItems([...itineraryItems, item]);
    setNextId(nextId + 1);
    setNewItem({ tipoEvento: "", titulo: "", dataHora: "", descricao: "" });
    setShowModal(false);
  };

  const handleEditItem = (item: ItineraryItem) => {
    setEditingItem(item);
    setNewItem({
      tipoEvento: item.tipoEvento,
      titulo: item.titulo,
      dataHora: item.dataHora,
      descricao: item.descricao,
    });
    setShowModal(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    if (
      !newItem.tipoEvento ||
      !newItem.titulo ||
      !newItem.dataHora ||
      !newItem.descricao
    ) {
      setAlertMessage("Por favor, preencha todos os campos");
      return;
    }

    const eventType = eventTypes.find(
      (type) => type.value === newItem.tipoEvento
    );

    setItineraryItems(
      itineraryItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              tipoEvento: newItem.tipoEvento,
              titulo: newItem.titulo,
              dataHora: newItem.dataHora,
              descricao: newItem.descricao,
              icon: eventType?.icon || Camera,
              color: eventType?.color || "bg-blue-500",
            }
          : item
      )
    );

    setEditingItem(null);
    setNewItem({ tipoEvento: "", titulo: "", dataHora: "", descricao: "" });
    setShowModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setItineraryItems(itineraryItems.filter((item) => item.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setNewItem({ tipoEvento: "", titulo: "", dataHora: "", descricao: "" });
  };

  const handleSubmit = async () => {
    if (itineraryItems.length === 0) {
      setAlertMessage("Por favor, adicione pelo menos um item ao itinerário");
      return;
    }

    try {
      // Salvar uma última vez para garantir
      const itineraryData = {
        itinerarios: itineraryItems.map((item) => ({
          tipoEvento: item.tipoEvento,
          titulo: item.titulo,
          dataHora: item.dataHora,
          descricao: item.descricao,
        })),
      };

      updateItineraryInfo(itineraryData);

      // Definir que estamos na etapa 5
      setCurrentStep(5);

      // Mostrar sucesso e ir para próxima tela
      const succes = await createTrip();
      if (!succes) {
        setAlertMessage("Erro ao criar a viagem. Tente novamente.");
        return;
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/create_trip_successful");
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setAlertMessage("Erro ao salvar dados. Tente novamente.");
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccess(false);
    router.push("/create_trip_successful");
  };

  const sortedItems = [...itineraryItems].sort(
    (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
  );

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
          <WhiteBackground titulo="Criar Itinerário">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Seção de Informações */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#0F2976]">
                <div className="flex items-center mb-3">
                  <Info className="text-[#0F2976] mr-3" size={24} />
                  <h3 className="text-[#0F2976] font-bold text-lg">
                    Planejamento do Itinerário
                  </h3>
                </div>
                <p className="text-[#3B4449] text-sm leading-relaxed">
                  Crie um itinerário detalhado com todas as atividades, pontos
                  turísticos e compromissos da viagem. Organize por data e
                  horário para melhor planejamento.
                </p>
              </div>

              {/* Botão para adicionar item */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#0F2976] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1C4CDC] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center mx-auto gap-3"
                >
                  <Plus size={24} />
                  Adicionar Item ao Itinerário
                </button>
              </div>

              {/* Lista de itens */}
              <div className="mb-8">
                {sortedItems.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                        Itinerário da Viagem
                      </h2>
                      <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                    </div>

                    {sortedItems.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#0F2976] hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} flex-shrink-0`}
                              >
                                <IconComponent
                                  size={24}
                                  className="text-white"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-[#0F2976] text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {item.tipoEvento}
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    #{index + 1}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#3B4449] mb-2">
                                  {item.titulo}
                                </h3>
                                <div className="flex items-center gap-4 mb-3 text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    <span className="text-sm">
                                      {new Date(
                                        item.dataHora
                                      ).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span className="text-sm">
                                      {new Date(
                                        item.dataHora
                                      ).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {item.descricao}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                title="Editar"
                              >
                                <Plus size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="Excluir"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar
                      size={64}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Nenhum item no itinerário
                    </h3>
                    <p className="text-gray-500">
                      Adicione atividades, pontos turísticos e compromissos para
                      organizar sua viagem.
                    </p>
                  </div>
                )}
              </div>

              {/* Dicas */}
              <div className="mb-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">
                  💡 Dicas para o Itinerário:
                </h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Organize as atividades por data e horário</li>
                  <li>• Considere tempo de deslocamento entre locais</li>
                  <li>• Inclua intervalos para descanso e alimentação</li>
                  <li>• Mantenha flexibilidade para mudanças</li>
                </ul>
              </div>

              {/* Botão de Continuar */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={itineraryItems.length === 0}
                  className={`flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg mx-auto transform hover:scale-105 ${
                    itineraryItems.length > 0
                      ? "bg-[#B1FF91] text-[#0F2976] hover:bg-[#9AE670] hover:shadow-xl cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Calendar size={28} />
                  Finalizar viagem!!
                  <ArrowRight size={28} />
                </button>
              </div>

              <SuccessModal
                isOpen={showSuccess}
                message="Itinerário criado com sucesso!"
                onClose={handleSuccessModalClose}
              />
            </div>
          </WhiteBackground>
        </div>
      </div>

      {/* Modal para adicionar/editar item */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#3B4449]">
                {editingItem ? "Editar Item" : "Adicionar Item"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Tipo de Evento */}
              <div>
                <label className="block text-[#3B4449] font-semibold mb-3">
                  Tipo de Evento <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {eventTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() =>
                          setNewItem({ ...newItem, tipoEvento: type.value })
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          newItem.tipoEvento === type.value
                            ? `${type.color} border-transparent text-white`
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="text-center">
                          <IconComponent
                            size={24}
                            className={`mx-auto mb-2 ${
                              newItem.tipoEvento === type.value
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {type.value}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-[#3B4449] font-semibold mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newItem.titulo}
                  onChange={(e) =>
                    setNewItem({ ...newItem, titulo: e.target.value })
                  }
                  placeholder="Ex: Visita ao Cristo Redentor"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-[#0F2976] focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              {/* Data e Hora */}
              <div>
                <label className="block text-[#3B4449] font-semibold mb-2">
                  Data e Hora <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={newItem.dataHora}
                  onChange={(e) =>
                    setNewItem({ ...newItem, dataHora: e.target.value })
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-[#0F2976] focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-[#3B4449] font-semibold mb-2">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newItem.descricao}
                  onChange={(e) =>
                    setNewItem({ ...newItem, descricao: e.target.value })
                  }
                  placeholder="Descreva a atividade, localização, informações importantes..."
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-[#0F2976] focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-6 py-3 bg-gray-200 text-[#3B4449] rounded-xl hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={editingItem ? handleUpdateItem : handleAddItem}
                className="flex-1 px-6 py-3 bg-[#0F2976] text-white rounded-xl hover:bg-[#1C4CDC] transition-colors duration-200 font-semibold"
              >
                {editingItem ? "Atualizar" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </RequireAuth>
  );
}
