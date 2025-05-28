import { CheckSquare } from "lucide-react";

export default function NextTripCard() {
  return (
    <div className="bg-gradient-to-br from-[#F0F9FF] to-[#B0FAC6] rounded-2xl shadow-lg px-6 py-5 w-[420px] h-[120px] flex flex-col">
      <h2 className="text-[#1C4CDC] text-lg font-bold mb-1">Próxima Viagem</h2>
      <div className="text-[#1C4CDC] text-2xl font-extrabold mb-2">Faltam 10 dias para a viagem!</div>
      <div className="text-[#333] text-xs mb-1">Antes de partir, não esqueça de:</div>
      <ul className="text-[#333] text-sm space-y-1 pl-1">
        <li className="flex items-center gap-2">
          <CheckSquare className="text-[#00C86B]" size={18} />
          Verificar documentos (passaporte, RG/CNH e visto)
        </li>
        <li className="flex items-center gap-2">
          <CheckSquare className="text-[#00C86B]" size={18} />
          Confirmar passagens e reservas de hospedagem
        </li>
        <li className="flex items-center gap-2">
          <CheckSquare className="text-[#00C86B]" size={18} />
          Baixar mapas e apps de navegação offline
        </li>
        <li className="flex items-center gap-2">
          <CheckSquare className="text-[#00C86B]" size={18} />
          Preparar mala (roupas, remédios e carregadores)
        </li>
        <li className="flex items-center gap-2">
          <CheckSquare className="text-[#00C86B]" size={18} />
          Baixar músicas, filmes ou e-books para viagem
        </li>
      </ul>
    </div>
  );
}