import { useEffect, useState } from "react";
import Image from "next/image";

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

const icons = [
  "/images-home_page/icons/PassportIcon.png",
  "/images-home_page/icons/TripIcon.png",
];

function getRandomTips(arr: string[], n: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function TravelTipsCard() {
  const [randomTips, setRandomTips] = useState<string[]>([]);

  useEffect(() => {
    setRandomTips(getRandomTips(tips, 2));
  }, []);

  return (
    <div
      className="rounded-2xl shadow-lg px-6 py-5 w-[85.5%] h-[20vh] flex flex-col"
      style={{
        background: "linear-gradient(360deg, #4182F9 0%, #90B6FB 0.01%, #BDD4FD 0.02%, #FFFFFF 100%)"
      }}
    >
      <h2 className="text-[#0F2976] text-2xl font-bold mb-1">Dicas de Viagem</h2>
      <ul className="text-[#333] text-2sm">
        {randomTips.map((tip, idx) => (
          <li key={idx} 
      className={`flex items-center gap-3 py-3 ${idx !== randomTips.length - 1 ? "border-b border-[#BDD4FD]" : ""}`}>
            <Image
              src={icons[idx] || icons[0]}
              alt="Ícone dica"
              width={42}
              height={42}
            />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}