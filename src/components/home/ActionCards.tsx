import { Briefcase, UserRoundPlus, Search } from "lucide-react";

export default function ActionCards() {
  return (
    <div className="flex gap-8">
      <button className="flex flex-col items-center justify-center bg-[#F0F9FF] hover:bg-[#e0f2fe] transition rounded-xl shadow-lg w-56 h-24">
        <Briefcase className="text-[#1C4CDC] mb-2" size={32} />
        <span className="text-[#1C4CDC] font-semibold">Criar Viagem</span>
      </button>
      <button className="flex flex-col items-center justify-center bg-[#B0FAC6] hover:bg-[#7ff9a9] transition rounded-xl shadow-lg w-56 h-24">
        <UserRoundPlus className="text-[#1C4CDC] mb-2" size={32} />
        <span className="text-[#1C4CDC] font-semibold">Participar de Viagem</span>
      </button>
      <button className="flex flex-col items-center justify-center bg-[#00C86B] hover:bg-[#00a95a] transition rounded-xl shadow-lg w-56 h-24">
        <Search className="text-white mb-2" size={32} />
        <span className="text-white font-semibold">Explorar Viagens</span>
      </button>
    </div>
  );
}