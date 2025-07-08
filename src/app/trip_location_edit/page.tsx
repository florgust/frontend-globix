"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { Alert } from "@/components/common/Alert";
import RequireAuth from "@/components/auth/RequireAuth";
import WhiteBackground from "@/components/create_trip/whiteBackground";
import { MapPin, Clock, ArrowRight, Info, Bus } from "lucide-react";
import api from "@/utils/axios";

export default function TravelLocation() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [localizacaoId, setLocalizacaoId] = useState<number | null>(null);

  const [ida, setIda] = useState({
    enderecoPartida: "",
    enderecoChegada: "",
    dataPartida: "",
    dataChegada: "",
  });

  const [volta, setVolta] = useState({
    enderecoPartida: "",
    enderecoChegada: "",
    dataPartida: "",
    dataChegada: "",
  });

  // Buscar localização ao montar
  useEffect(() => {
    const selectedTripStr = localStorage.getItem("selectedTrip");
    if (!selectedTripStr) return;
    const { id } = JSON.parse(selectedTripStr);

    api
      .get(`/localizacao/viagem/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const loc = res.data[0];
          setLocalizacaoId(loc.id);
          setIda({
            enderecoPartida: loc.idaEnderecoPartida,
            enderecoChegada: loc.idaEnderecoChegada,
            dataPartida: loc.idaDataPartida
              ? loc.idaDataPartida.substring(0, 16)
              : "",
            dataChegada: loc.idaDataChegada
              ? loc.idaDataChegada.substring(0, 16)
              : "",
          });
          setVolta({
            enderecoPartida: loc.voltaEnderecoPartida,
            enderecoChegada: loc.voltaEnderecoChegada,
            dataPartida: loc.voltaDataPartida
              ? loc.voltaDataPartida.substring(0, 16)
              : "",
            dataChegada: loc.voltaDataChegada
              ? loc.voltaDataChegada.substring(0, 16)
              : "",
          });
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar localização:", err);
        setAlertMessage("Erro ao carregar dados da localização.");
      });
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "ida" | "volta",
    field: string
  ) => {
    const value = e.target.value;
    if (type === "ida") {
      setIda({ ...ida, [field]: value });
    } else {
      setVolta({ ...volta, [field]: value });
    }
  };

  const handleSave = async () => {
    if (
      ida.dataPartida &&
      ida.dataChegada &&
      new Date(ida.dataPartida) > new Date(ida.dataChegada)
    ) {
      setAlertMessage(
        "Na IDA, a data de partida não pode ser depois da data de chegada."
      );
      return;
    }
    if (
      volta.dataPartida &&
      volta.dataChegada &&
      new Date(volta.dataPartida) > new Date(volta.dataChegada)
    ) {
      setAlertMessage(
        "Na VOLTA, a data de partida não pode ser depois da data de chegada."
      );
      return;
    }

    if (!localizacaoId) {
      setAlertMessage("Localização não encontrada para atualizar.");
      return;
    }

    const payload = {
      idaEnderecoPartida: ida.enderecoPartida,
      idaEnderecoChegada: ida.enderecoChegada,
      idaDataPartida: ida.dataPartida,
      idaDataChegada: ida.dataChegada,
      voltaEnderecoPartida: volta.enderecoPartida,
      voltaEnderecoChegada: volta.enderecoChegada,
      voltaDataPartida: volta.dataPartida,
      voltaDataChegada: volta.dataChegada,
    };

    try {
      await api.put(`/localizacao/${localizacaoId}`, payload);
      setShowSuccess(true);
    } catch (error) {
      console.error("Erro ao salvar a localização:", error);
      setAlertMessage(
        "Ocorreu um erro ao salvar a localização. Tente novamente."
      );
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push("/travels");
  };

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <SidebarMenu />

        {/* ALERTA MODAL */}
        {alertMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
            <Alert message={alertMessage} type="error" />
          </div>
        )}

        <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
          <HeaderPages />

          <WhiteBackground titulo="Definir Pontos de Encontro">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Seção de Informações */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#0F2976]">
                <div className="flex items-center mb-3">
                  <Info className="text-[#0F2976] mr-3" size={24} />
                  <h3 className="text-[#0F2976] font-bold text-lg">
                    Instruções
                  </h3>
                </div>
                <p className="text-[#3B4449] text-sm leading-relaxed">
                  Defina os pontos de encontro para a ida e volta da viagem.
                  Escolha locais de fácil acesso e que todos possam localizar
                  facilmente.
                </p>
              </div>

              {/* IDA */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-4">
                    <ArrowRight className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-[#3B4449] font-bold text-3xl">IDA</h2>
                    <p className="text-gray-600 text-sm">
                      Trajeto de ida da viagem
                    </p>
                  </div>
                </div>
                <hr className="mb-6 border-t-2 border-green-200 w-full" />

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <MapPin className="text-green-600 mr-2" size={18} />
                        Ponto de Encontro para Embarque{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Rodoviária Central, Praça da Sé, Shopping Center..."
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={ida.enderecoPartida}
                        onChange={(e) =>
                          handleChange(e, "ida", "enderecoPartida")
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <Clock className="text-green-600 mr-2" size={18} />
                        Horário de Saída <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={ida.dataPartida}
                        onChange={(e) => handleChange(e, "ida", "dataPartida")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    <div className="md:col-span-2">
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <MapPin className="text-green-600 mr-2" size={18} />
                        Ponto de Encontro para Desembarque{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Hotel, Pousada, Centro da cidade de destino..."
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={ida.enderecoChegada}
                        onChange={(e) =>
                          handleChange(e, "ida", "enderecoChegada")
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <Clock className="text-green-600 mr-2" size={18} />
                        Horário de Chegada{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={ida.dataChegada}
                        onChange={(e) => handleChange(e, "ida", "dataChegada")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Linha divisória com seta */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="px-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#0F2976] rounded-full">
                    <Bus className="text-white" size={24} />
                  </div>
                </div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* VOLTA */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mr-4">
                    <ArrowRight className="text-red-600 rotate-180" size={24} />
                  </div>
                  <div>
                    <h2 className="text-[#3B4449] font-bold text-3xl">VOLTA</h2>
                    <p className="text-gray-600 text-sm">
                      Trajeto de volta da viagem
                    </p>
                  </div>
                </div>
                <hr className="mb-6 border-t-2 border-red-200 w-full" />

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <MapPin className="text-red-600 mr-2" size={18} />
                        Ponto de Encontro para Embarque{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Mesmo local do hotel, centro da cidade..."
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={volta.enderecoPartida}
                        onChange={(e) =>
                          handleChange(e, "volta", "enderecoPartida")
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <Clock className="text-red-600 mr-2" size={18} />
                        Horário de Saída <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={volta.dataPartida}
                        onChange={(e) =>
                          handleChange(e, "volta", "dataPartida")
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    <div className="md:col-span-2">
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <MapPin className="text-red-600 mr-2" size={18} />
                        Ponto de Encontro para Desembarque{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Mesmo local de saída, rodoviária de origem..."
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={volta.enderecoChegada}
                        onChange={(e) =>
                          handleChange(e, "volta", "enderecoChegada")
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[#3B4449] font-bold text-base mb-2 block flex items-center">
                        <Clock className="text-red-600 mr-2" size={18} />
                        Horário de Chegada{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full p-3 border-2 border-[#0F2976] rounded-xl text-[#0F2976] bg-[#FFFFFF] focus:border-[#1C4CDC] focus:ring-2 focus:ring-blue-200 outline-none"
                        value={volta.dataChegada}
                        onChange={(e) =>
                          handleChange(e, "volta", "dataChegada")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dica adicional */}
              <div className="mb-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  <strong>💡 Dica:</strong> Escolha pontos de encontro
                  conhecidos e de fácil acesso para todos os participantes.
                  Considere estacionamento e transporte público no local.
                </p>
              </div>

              {/* Linha divisória final */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Botão */}
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="bg-[#B1FF91] text-[#0F2976] font-bold rounded-xl px-12 py-4 text-xl cursor-pointer hover:bg-[#9AE670] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center mx-auto gap-3"
                >
                  <MapPin size={24} />
                  Definir Pontos de Encontro
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </WhiteBackground>
          <div className="mb-20" />
        </div>

        <SuccessModal
          isOpen={showSuccess}
          message="Pontos de encontro definidos com sucesso!"
          onClose={handleCloseModal}
        />
      </div>
    </RequireAuth>
  );
}
