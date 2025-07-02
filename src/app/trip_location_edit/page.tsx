"use client";
import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import Image from "next/image";
import SuccessModal from "@/components/ui/modals/ModalSuccess";
import { Alert } from '@/components/common/Alert';

export default function TravelLocation() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

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

  const [localizacaoId, setLocalizacaoId] = useState<number | null>(null);

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
      });
  }, []);

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
    if (ida.dataPartida && ida.dataChegada && new Date(ida.dataPartida) > new Date(ida.dataChegada)) {
      setAlertMessage("Na IDA, a data de partida não pode ser depois da data de chegada.");
      return;
    }
    if (volta.dataPartida && volta.dataChegada && new Date(volta.dataPartida) > new Date(volta.dataChegada)) {
      setAlertMessage("Na VOLTA, a data de partida não pode ser depois da data de chegada.");
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
      setShowSuccess(true); // Exibe o modal de sucesso
    } catch (error) {
      console.error("Erro ao salvar a localização:", error);
      setAlertMessage("Ocorreu um erro ao salvar a localização. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.back(); // Volta para a página anterior
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
      <SidebarMenu />

      {alertMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
          <Alert message={alertMessage} type="error" />
        </div>
      )}

      <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <HeaderPages />

        <h1 className="font-bold text-4xl text-left text-white w-full pl-22 mt-2">
          Editar localização da viagem
        </h1>
        <div className="flex flex-col items-center w-9/10 border-2 border-[#092064] mt-3 mb-15" />

        <div className="flex flex-col items-center w-[52.5rem] h-[30rem] p-4 border-2 border-[#00FF4D] rounded-[2rem] shadow-lg ">
          <div className="w-full mt-2 ">
            {/* IDA */}
            <div className="mb-4 ">
              <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center ml-3">
                IDA
              </h2>
              <Image
                src="/images-trip_location/linha.svg"
                alt="Linha decorativa"
                width={200}
                height={8}
                className="mb-4 ml-3"
              />
              <div className="flex flex-col space-y-4 ">
                <div className="flex items-center space-x-4 gap-4">
                  <div className="flex-1">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3"
                      htmlFor="ida-endereco-partida"
                    >
                      Local de Partida <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ida-endereco-partida"
                      type="text"
                      placeholder="Digite o ponto inicial. Ex.: Rodoviária, Aeroporto..."
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                      value={ida.enderecoPartida}
                      onChange={(e) =>
                        handleChange(e, "ida", "enderecoPartida")
                      }
                    />
                  </div>
                  <div className="w-1/3">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block"
                      htmlFor="ida-data-partida"
                    >
                      Data de Partida <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ida-data-partida"
                      type="datetime-local"
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                      value={ida.dataPartida}
                      onChange={(e) => handleChange(e, "ida", "dataPartida")}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 gap-4">
                  <div className="flex-1">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3"
                      htmlFor="ida-endereco-chegada"
                    >
                      Local de Chegada <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ida-endereco-chegada"
                      type="text"
                      placeholder="Digite o ponto final. Ex.: Hotel, Posto..."
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                      value={ida.enderecoChegada}
                      onChange={(e) =>
                        handleChange(e, "ida", "enderecoChegada")
                      }
                    />
                  </div>
                  <div className="w-1/3">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block"
                      htmlFor="ida-data-chegada"
                    >
                      Data de Chegada <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ida-data-chegada"
                      type="datetime-local"
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                      value={ida.dataChegada}
                      onChange={(e) => handleChange(e, "ida", "dataChegada")}
                    />
                  </div>
                </div>
              </div>

              {/* VOLTA */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-[#FFFFFF] font-bold text-4xl mb-2 flex items-center mt-5 ml-3">
                  VOLTA
                </h2>
                <div className="flex items-center space-x-4 gap-4">
                  <div className="flex-1">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3"
                      htmlFor="volta-endereco-partida"
                    >
                      Local de Partida <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="volta-endereco-partida"
                      type="text"
                      placeholder="Digite o ponto inicial. Ex.: Rodoviária, Aeroporto..."
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                      value={volta.enderecoPartida}
                      onChange={(e) =>
                        handleChange(e, "volta", "enderecoPartida")
                      }
                    />
                  </div>
                  <div className="w-1/3">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block"
                      htmlFor="volta-data-partida"
                    >
                      Data de Partida <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="volta-data-partida"
                      type="datetime-local"
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                      value={volta.dataPartida}
                      onChange={(e) => handleChange(e, "volta", "dataPartida")}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 gap-4">
                  <div className="flex-1">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block ml-3"
                      htmlFor="volta-endereco-chegada"
                    >
                      Local de Chegada <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="volta-endereco-chegada"
                      type="text"
                      placeholder="Digite o ponto final. Ex.: Hotel, Posto..."
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] placeholder-[#6B7280] text-sm bg-[#FFFFFF]"
                      value={volta.enderecoChegada}
                      onChange={(e) =>
                        handleChange(e, "volta", "enderecoChegada")
                      }
                    />
                  </div>
                  <div className="w-1/3">
                    <label
                      className="text-[#FFFFFF] font-bold text-base mb-1 block"
                      htmlFor="volta-data-chegada"
                    >
                      Data de Chegada <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="volta-data-chegada"
                      type="datetime-local"
                      className="w-full p-2 border-[0.5px] border-[#0F2976] rounded-[100px] text-[#0F2976] bg-[#FFFFFF]"
                      value={volta.dataChegada}
                      onChange={(e) => handleChange(e, "volta", "dataChegada")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-auto mb-30">
          <button className="absolute mt-5 ml-5 block bg-white rounded-lg w-2/4 h-20" />
          <button
            onClick={handleSave}
            className="absolute bg-[#00FF4D] text-[#0F2976] font-bold rounded-lg w-2/4 h-20 text-3xl cursor-pointer"
          >
            Atualizar
          </button>
        </div>
        <SuccessModal
          isOpen={showSuccess}
          message="Localização atualizada com sucesso!"
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
