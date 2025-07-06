import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalJoinTrip from "@/components/ui/modals/ModalJoinTrip";
import Cookies from "js-cookie";
import api from "@/utils/axios";
import axios from "axios";

export default function ActionCards() {
  const router = useRouter();

  // Estado do modal e do input
  const [openModal, setOpenModal] = useState(false);
  const [tripCode, setTripCode] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleJoinTrip = async () => {
    if (!tripCode.trim()) {
      setAlertMessage("Por favor, insira um código válido.");
      return;
    }

    try {
      // 1. Verificar se a viagem existe
      const { data: viagem } = await api.get(`/viagem/codigo/${tripCode}`);

      // 2. Pegar usuário do cookie
      const usuarioCookie = Cookies.get("usuario");
      if (!usuarioCookie) {
        setAlertMessage("Usuário não autenticado.");
        return;
      }
      const usuarioObj = JSON.parse(usuarioCookie);
      const userId = usuarioObj.id;

      // 3. Enviar solicitação de participação
      await api.post(`/solicitacao/${userId}/${viagem.id}`);
      setAlertMessage("");
      setTripCode("");
      setOpenModal(false);

      // Exibe o modal de sucesso por 3 segundos
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setAlertMessage("Viagem não encontrada. Verifique o código inserido.");
          return;
        }
        const message = error.response?.data?.error ?? "Erro ao participar da viagem.";
        setAlertMessage(message);
        return;
      }
      setAlertMessage("Erro inesperado. Tente novamente.");
      return;
    }
  };

  function SuccessModal() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-2xl shadow-lg px-12 py-10 flex flex-col items-center min-w-[24rem]">
          <span className="text-3xl text-[#00FF4D] font-bold mb-2">Sucesso!</span>
          <span className="text-[#0F2976] text-xl text-center">Solicitação enviada.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-22">
        {/* Criar Viagem */}
        <button
          className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(270deg, #366EDB 0%, #36B6CF 89.42%)"
          }}
          onClick={() => router.push("/create_trip")}
        >
          <span className="flex items-center justify-center bg-white rounded-full w-14 h-14 ml-4">
            <Image
              src="/images-home_page/icons/BlueBagIcon.png"
              alt="Criar Viagem"
              width={32}
              height={32}
            />
          </span>
          <span className="text-white font-semibold text-lg">Criar Viagem</span>
        </button>

        {/* Participar de Viagem */}
        <button
          className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #3579D9 0%, #6CB9B0 50.48%, #A7FF84 100%)"
          }}
          onClick={() => setOpenModal(true)}
        >
          <span className="flex items-center justify-center bg-white rounded-full w-14 h-14 ml-4">
            <Image
              src="/images-home_page/icons/BlueAddIcon.png"
              alt="Participar de Viagem"
              width={32}
              height={32}
            />
          </span>
          <span className="text-white font-semibold text-lg">Participar <br /> de Viagem</span>
        </button>

        {/* Explorar Viagens */}
        <button
          className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #ACEBA2 18.27%, #3AB660 100%)"
          }}
        // futuramente: onClick={() => router.push("/explorar_viagens")}
        >
          <span className="flex items-center justify-center bg-white rounded-full w-16 h-14 ml-4">
            <Image
              src="/images-home_page/icons/BlueGlobeIcon.png"
              alt="Explorar Viagens"
              width={32}
              height={32}
            />
          </span>
          <span className="text-white font-semibold text-lg">Explorar Viagens</span>
        </button>
      </div>

      {/* Modal para inserir o código da viagem */}
      <ModalJoinTrip
        isOpen={openModal}
        tripCode={tripCode}
        setTripCode={setTripCode}
        alertMessage={alertMessage}
        onConfirm={handleJoinTrip}
        onClose={() => {
          setOpenModal(false);
          setAlertMessage("");
          setTripCode("");
        }}
      />
      {showSuccess && <SuccessModal />}
    </>
  );
}