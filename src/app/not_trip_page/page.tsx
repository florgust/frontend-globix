"use client";
import { useRouter } from "next/navigation";

export default function NoTripPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <img src="/images-error_404/error404.svg" alt="Nenhuma viagem" className="w-120 h-80 mb-2" />
        <h2 className="text-2xl font-bold text-[#0F2976] mb-2">Nenhuma viagem selecionada</h2>
        <p className="text-gray-600 mb-6">Selecione uma viagem para acessar esta página.</p>
        <button
          className="bg-[#1C4CDC] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F2976] cursor-pointer"
          onClick={() => router.push("/home_page")}
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}