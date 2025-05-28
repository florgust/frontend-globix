import { useMemo } from "react";
import { Info } from "lucide-react";

const tips = [
  "Verifique se todos os documentos necessários para a viagem estão em ordem.",
  "Sempre chegue adiantado uma hora para prevenir acontecimentos inesperados.",
  "Leve uma garrafa de água reutilizável.",
  "Faça backup digital dos seus documentos.",
  "Tenha um kit de primeiros socorros.",
  "Use etiquetas de identificação nas malas.",
  "Baixe mapas offline do destino.",
  "Leve roupas adequadas ao clima.",
  "Tenha sempre um carregador portátil.",
  "Avise familiares sobre seu roteiro.",
  "Confira restrições de bagagem.",
  "Leve snacks para o trajeto.",
  "Tenha seguro viagem.",
  "Pesquise sobre a cultura local.",
  "Leve dinheiro trocado.",
  "Confirme reservas de hospedagem.",
  "Tenha cópias impressas dos bilhetes.",
  "Use protetor solar.",
  "Leve adaptador de tomada.",
  "Mantenha remédios de uso contínuo à mão.",
  "Evite excesso de bagagem.",
  "Baixe músicas, filmes ou e-books para o caminho.",
  "Tenha um plano B para imprevistos.",
  "Verifique a previsão do tempo.",
  "Leve máscara e álcool em gel."
];

function getRandomTips(arr: string[], n: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function TravelTipsCard() {
  const randomTips = useMemo(() => getRandomTips(tips, 2), []);
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-5 w-[420px] h-[120px] flex flex-col">
      <h2 className="text-[#1C4CDC] text-lg font-bold mb-2">Dicas de Viagem</h2>
      <ul className="text-[#333] text-sm space-y-1">
        {randomTips.map((tip, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Info className="text-[#1C4CDC]" size={18} />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}