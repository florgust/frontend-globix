import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function NotificationsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-5 w-[420px] h-[120px] flex flex-col">
      <h2 className="text-[#1C4CDC] text-lg font-bold mb-2">Notificações Recentes</h2>
      <ul className="text-[#333] text-sm space-y-1">
        <li className="flex items-center gap-2">
          <AlertCircle className="text-[#00C86B]" size={18} />
          Ana Costa enviou uma mensagem: ‘Pessoal, lembrem de levar água para o passeio’
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="text-[#00C86B]" size={18} />
          Você cancelou a atividade ‘Visita ao Museu’.
        </li>
        <li className="flex items-center gap-2">
          <Clock className="text-[#00C86B]" size={18} />
          Próximo evento: ‘Check-In’ começa em 1 hora.
        </li>
      </ul>
    </div>
  );
}