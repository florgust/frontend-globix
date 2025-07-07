"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import api from "@/utils/axios";

interface TripData {
  // Dados da primeira tela
  basicInfo: {
    nome: string;
    descricao: string;
    cidadeOrigem: string;
    cidadeDestino: string;
    tipo: string;
    quantidadeParticipante: number;
    dataInicio: string;
    dataFim: string;
    criadorId: number;
  } | null;

  // Dados das próximas telas
  locationInfo: {
    idaEnderecoPartida: string;
    idaEnderecoChegada: string;
    idaDataPartida: string;
    idaDataChegada: string;
    voltaEnderecoPartida: string;
    voltaEnderecoChegada: string;
    voltaDataPartida: string;
    voltaDataChegada: string;
  } | null;

  transportInfo: {
    tipoTransporte: string;
    descricao: string;
  } | null;

  budgetInfo: {
    categorias: Array<{
      categoria: string;
      custo: number;
      observacao: string;
    }>;
  } | null;

  itineraryInfo: {
    itinerarios: Array<{
      tipoEvento: string;
      titulo: string;
      dataHora: string;
      descricao: string;
    }>;
  } | null;

  currentStep: number;
}

interface TripCreationState {
  tripData: TripData;
  isLoading: boolean;
}

type TripCreationAction =
  | { type: "UPDATE_BASIC_INFO"; data: TripData["basicInfo"] }
  | { type: "UPDATE_LOCATION_INFO"; data: TripData["locationInfo"] }
  | { type: "UPDATE_TRANSPORT_INFO"; data: TripData["transportInfo"] }
  | { type: "UPDATE_BUDGET_INFO"; data: TripData["budgetInfo"] }
  | { type: "UPDATE_ITINERARY_INFO"; data: TripData["itineraryInfo"] }
  | { type: "SET_CURRENT_STEP"; step: number }
  | { type: "LOAD_FROM_STORAGE"; data: TripCreationState }
  | { type: "RESET" }
  | { type: "SET_LOADING"; loading: boolean };

const initialState: TripCreationState = {
  tripData: {
    basicInfo: null,
    locationInfo: null,
    transportInfo: null,
    budgetInfo: null,
    itineraryInfo: null,
    currentStep: 1,
  },
  isLoading: false,
};

function tripCreationReducer(
  state: TripCreationState,
  action: TripCreationAction
): TripCreationState {
  switch (action.type) {
    case "UPDATE_BASIC_INFO":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          basicInfo: action.data,
        },
      };
    case "UPDATE_LOCATION_INFO":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          locationInfo: action.data,
        },
      };
    case "UPDATE_TRANSPORT_INFO":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          transportInfo: action.data,
        },
      };
    case "UPDATE_BUDGET_INFO":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          budgetInfo: action.data,
        },
      };
    case "UPDATE_ITINERARY_INFO":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          itineraryInfo: action.data,
        },
      };
    case "SET_CURRENT_STEP":
      return {
        ...state,
        tripData: {
          ...state.tripData,
          currentStep: action.step,
        },
      };
    case "LOAD_FROM_STORAGE":
      return action.data;
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.loading,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface TripCreationContextValue {
  state: TripCreationState;
  updateBasicInfo: (data: TripData["basicInfo"]) => void;
  updateLocationInfo: (data: TripData["locationInfo"]) => void;
  updateTransportInfo: (data: TripData["transportInfo"]) => void;
  updateBudgetInfo: (data: TripData["budgetInfo"]) => void;
  updateItineraryInfo: (data: TripData["itineraryInfo"]) => void;
  setCurrentStep: (step: number) => void;
  createTrip: () => Promise<boolean>;
  clearTripData: () => void;
  setLoading: (loading: boolean) => void;
}

const TripCreationContext = createContext<TripCreationContextValue | undefined>(
  undefined
);

export function TripCreationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripCreationReducer, initialState);

  // Carregar dados do sessionStorage ao inicializar
  useEffect(() => {
    const savedData = sessionStorage.getItem("tripCreationData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "LOAD_FROM_STORAGE", data: parsedData });
      } catch (error) {
        console.error("Erro ao carregar dados do sessionStorage:", error);
      }
    }
  }, []);

  // Salvar no sessionStorage sempre que o estado mudar
  useEffect(() => {
    sessionStorage.setItem("tripCreationData", JSON.stringify(state));
  }, [state]);

  // Memorizar as funções com useCallback
  const updateBasicInfo = useCallback((data: TripData["basicInfo"]) => {
    dispatch({ type: "UPDATE_BASIC_INFO", data });
  }, []);

  const updateLocationInfo = useCallback((data: TripData["locationInfo"]) => {
    dispatch({ type: "UPDATE_LOCATION_INFO", data });
  }, []);

  const updateTransportInfo = useCallback((data: TripData["transportInfo"]) => {
    dispatch({ type: "UPDATE_TRANSPORT_INFO", data });
  }, []);

  const updateBudgetInfo = useCallback((data: TripData["budgetInfo"]) => {
    dispatch({ type: "UPDATE_BUDGET_INFO", data });
  }, []);

  const updateItineraryInfo = useCallback((data: TripData["itineraryInfo"]) => {
    dispatch({ type: "UPDATE_ITINERARY_INFO", data });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: "SET_CURRENT_STEP", step });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", loading });
  }, []);

  const createTrip = useCallback(async (): Promise<boolean> => {
    const {
      basicInfo,
      locationInfo,
      transportInfo,
      budgetInfo,
      itineraryInfo,
    } = state.tripData;

    if (!basicInfo) {
      throw new Error("Dados básicos da viagem são obrigatórios");
    }

    try {
      setLoading(true);

      // 1. Criar a viagem
      const response = await api.post("/viagem", basicInfo);
      const viagemId = response.data.id;

      // 2. Criar solicitação do criador
      await api.post(`/solicitacao/criador/${basicInfo.criadorId}/${viagemId}`);

      // 3. Salvar localização se existir
      if (locationInfo) {
        await api.post("/localizacao", {
          idViagem: viagemId,
          nome: "Pontos de Encontro",
          ...locationInfo,
        });
      }

      // 4. Salvar transporte se existir
      if (transportInfo) {
        await api.post("/transporte", {
          viagemId,
          ...transportInfo,
        });
      }

      // 5. Salvar orçamento se existir
      if (budgetInfo && budgetInfo.categorias.length > 0) {
        for (const categoria of budgetInfo.categorias) {
          await api.post("/orcamento", {
            viagemId,
            ...categoria,
          });
        }
      }

      // 6. Salvar itinerário se existir
      if (itineraryInfo && itineraryInfo.itinerarios.length > 0) {
        for (const item of itineraryInfo.itinerarios) {
          await api.post("/itinerario", {
            viagemId,
            ...item,
          });
        }
      }

      // Salvar no localStorage para a tela de sucesso
      localStorage.setItem("viagemEmCriacao", JSON.stringify(response.data));

      // Limpar dados do sessionStorage após sucesso
      clearTripData();

      return true;
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [state.tripData]);

  const clearTripData = useCallback(() => {
    sessionStorage.removeItem("tripCreationData");
    dispatch({ type: "RESET" });
  }, []);

  // Memorizar o valor do contexto
  const contextValue = useMemo(
    () => ({
      state,
      updateBasicInfo,
      updateLocationInfo,
      updateTransportInfo,
      updateBudgetInfo,
      updateItineraryInfo,
      setCurrentStep,
      createTrip,
      clearTripData,
      setLoading,
    }),
    [
      state,
      updateBasicInfo,
      updateLocationInfo,
      updateTransportInfo,
      updateBudgetInfo,
      updateItineraryInfo,
      setCurrentStep,
      createTrip,
      clearTripData,
      setLoading,
    ]
  );

  return (
    <TripCreationContext.Provider value={contextValue}>
      {children}
    </TripCreationContext.Provider>
  );
}

export const useTripCreation = () => {
  const context = useContext(TripCreationContext);
  if (context === undefined) {
    throw new Error(
      "useTripCreation deve ser usado dentro de um TripCreationProvider"
    );
  }
  return context;
};
