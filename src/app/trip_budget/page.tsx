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
  DollarSign,
  Car,
  Home,
  Coffee,
  Camera,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Info,
  Calculator,
  Receipt,
} from "lucide-react";
import { useTripCreation } from "@/utils/contextAPI";

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
  value: string;
}

export default function TripBudget() {
  const router = useRouter();
  const { state, updateBudgetInfo, setCurrentStep } = useTripCreation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const initialCategories: Category[] = [
    { id: 1, name: "Transporte", icon: Car, color: "bg-blue-500", value: "0" },
    {
      id: 2,
      name: "Hospedagem",
      icon: Home,
      color: "bg-green-500",
      value: "0",
    },
    {
      id: 3,
      name: "Alimentação",
      icon: Coffee,
      color: "bg-orange-500",
      value: "0",
    },
    {
      id: 4,
      name: "Entretenimento",
      icon: Camera,
      color: "bg-purple-500",
      value: "0",
    },
    {
      id: 5,
      name: "Compras",
      icon: ShoppingBag,
      color: "bg-pink-500",
      value: "0",
    },
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Carregar dados salvos quando a tela abrir
  useEffect(() => {
    if (state.tripData.budgetInfo && !dataLoaded) {
      // Converter formato do Context para o formato da tela
      const savedCategories = [...initialCategories];

      state.tripData.budgetInfo.categorias.forEach((savedCat, index) => {
        if (savedCategories[index]) {
          savedCategories[index].value = savedCat.custo.toString();
        }
      });

      setCategories(savedCategories);
      setNotes(state.tripData.budgetInfo.categorias[0]?.observacao || "");
      setDataLoaded(true);
    } else {
      setDataLoaded(true);
    }
  }, [state.tripData.budgetInfo, dataLoaded]);

  // Salvar automaticamente quando os dados mudam
  useEffect(() => {
    // Só salva se os dados foram carregados e pelo menos uma categoria tem valor
    if (dataLoaded && categories.some((cat) => parseFloat(cat.value) > 0)) {
      const timer = setTimeout(() => {
        const budgetData = {
          categorias: categories.map((cat) => ({
            categoria: cat.name,
            custo: parseFloat(cat.value) || 0,
            observacao: notes,
          })),
        };

        updateBudgetInfo(budgetData);
        console.log("Dados salvos:", budgetData);
      }, 500); // Debounce de 500ms

      return () => clearTimeout(timer);
    }
  }, [categories, notes, dataLoaded]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleValueChange = (id: number, value: string) => {
    // Permitir apenas números e vírgula/ponto
    const numericValue = value.replace(/[^0-9.,]/g, "");

    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, value: numericValue } : cat))
    );
  };

  const handleIncrement = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? { ...cat, value: (parseFloat(cat.value) + 10).toString() }
          : cat
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              value: Math.max(0, parseFloat(cat.value) - 10).toString(),
            }
          : cat
      )
    );
  };

  const calculateTotal = () => {
    return categories.reduce((total, cat) => {
      return total + (parseFloat(cat.value) || 0);
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleSubmit = async () => {
    const total = calculateTotal();

    if (total <= 0) {
      setAlertMessage(
        "Por favor, defina um orçamento para pelo menos uma categoria"
      );
      return;
    }

    try {
      // Salvar uma última vez para garantir
      const budgetData = {
        categorias: categories.map((cat) => ({
          categoria: cat.name,
          custo: parseFloat(cat.value) || 0,
          observacao: notes,
        })),
      };

      updateBudgetInfo(budgetData);

      // Definir que estamos na etapa 4
      setCurrentStep(4);

      // Mostrar sucesso e ir para próxima tela
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/trip_itinerary");
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setAlertMessage("Erro ao salvar dados. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push("/trip_itinerary");
  };

  const getCategoryStyle = (category: Category) => {
    const value = parseFloat(category.value) || 0;
    if (value > 0) {
      return `${category.color} text-white border-transparent shadow-lg`;
    }
    return "bg-white text-gray-700 border-gray-300 hover:border-gray-400";
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
          <WhiteBackground titulo="Definir Orçamento">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Seção de Informações */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#0F2976]">
                <div className="flex items-center mb-3">
                  <Info className="text-[#0F2976] mr-3" size={24} />
                  <h3 className="text-[#0F2976] font-bold text-lg">
                    Planejamento Financeiro
                  </h3>
                </div>
                <p className="text-[#3B4449] text-sm leading-relaxed">
                  Defina o orçamento estimado para cada categoria da viagem.
                  Isso ajudará todos os participantes a se organizarem
                  financeiramente.
                </p>
              </div>

              {/* Categorias de Orçamento */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3B4449] mb-2">
                    Categorias de Gastos
                  </h2>
                  <div className="w-24 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const value = parseFloat(category.value) || 0;

                    return (
                      <div
                        key={category.id}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${getCategoryStyle(
                          category
                        )}`}
                      >
                        <div className="text-center mb-4">
                          <div
                            className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 ${
                              value > 0 ? "bg-white/20" : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              size={28}
                              className={
                                value > 0 ? "text-white" : "text-gray-600"
                              }
                            />
                          </div>
                          <h3
                            className={`text-lg font-bold ${
                              value > 0 ? "text-white" : "text-[#3B4449]"
                            }`}
                          >
                            {category.name}
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {/* Controles de valor */}
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDecrement(category.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                value > 0
                                  ? "bg-white/20 text-white hover:bg-white/30"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              <Minus size={16} />
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="relative">
                                <span
                                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                                    value > 0
                                      ? "text-white/80"
                                      : "text-gray-500"
                                  }`}
                                >
                                  R$
                                </span>
                                <input
                                  type="text"
                                  value={category.value}
                                  onChange={(e) =>
                                    handleValueChange(
                                      category.id,
                                      e.target.value
                                    )
                                  }
                                  className={`w-full pl-8 pr-3 py-2 rounded-lg text-center font-semibold transition-all ${
                                    value > 0
                                      ? "bg-white/20 text-white placeholder-white/60 border-white/30"
                                      : "bg-white text-gray-700 border-gray-300"
                                  } border focus:ring-2 focus:ring-blue-200 outline-none`}
                                  placeholder="0,00"
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => handleIncrement(category.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                value > 0
                                  ? "bg-white/20 text-white hover:bg-white/30"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Valor formatado */}
                          {value > 0 && (
                            <div className="text-center">
                              <p className="text-white/80 text-sm font-medium">
                                {formatCurrency(value)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resumo do Orçamento */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#3B4449] flex items-center">
                    <Calculator className="mr-2 text-[#0F2976]" size={20} />
                    Resumo do Orçamento
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Estimado</p>
                    <p className="text-2xl font-bold text-[#0F2976]">
                      {formatCurrency(calculateTotal())}
                    </p>
                  </div>
                </div>

                {/* Breakdown por categoria */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories
                    .filter((cat) => parseFloat(cat.value) > 0)
                    .map((category) => {
                      const IconComponent = category.icon;
                      const value = parseFloat(category.value);
                      const percentage =
                        calculateTotal() > 0
                          ? (value / calculateTotal()) * 100
                          : 0;

                      return (
                        <div
                          key={category.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${category.color}`}
                            >
                              <IconComponent size={16} className="text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {category.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCurrency(value)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Observações */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#3B4449] mb-2 flex items-center justify-center">
                    <Receipt className="mr-2 text-[#0F2976]" size={20} />
                    Observações Adicionais
                  </h3>
                  <div className="w-16 h-1 bg-[#0F2976] mx-auto rounded-full"></div>
                </div>

                <div className="max-w-2xl mx-auto">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Adicione observações sobre o orçamento, formas de pagamento, divisão de gastos, etc..."
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#0F2976] focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    rows={4}
                  />
                </div>
              </div>

              {/* Dicas */}
              <div className="mb-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">
                  💡 Dicas para o Orçamento:
                </h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>
                    • Considere uma margem de segurança de 10-20% sobre o valor
                    estimado
                  </li>
                  <li>
                    • Pesquise preços antecipadamente para ter estimativas mais
                    precisas
                  </li>
                  <li>
                    • Combine formas de pagamento e divisão de gastos com o
                    grupo
                  </li>
                  <li>• Mantenha controle dos gastos durante a viagem</li>
                </ul>
              </div>

              {/* Botão de Continuar */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={calculateTotal() <= 0}
                  className={`flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg mx-auto transform hover:scale-105 ${
                    calculateTotal() > 0
                      ? "bg-[#B1FF91] text-[#0F2976] hover:bg-[#9AE670] hover:shadow-xl cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <DollarSign size={28} />
                  Continuar para Itinerário
                  <ArrowRight size={28} />
                </button>
              </div>

              <SuccessModal
                isOpen={showSuccess}
                message="Orçamento definido com sucesso!"
                onClose={handleCloseModal}
              />
            </div>
          </WhiteBackground>
        </div>
      </div>
    </RequireAuth>
  );
}
