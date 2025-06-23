import React from "react";
import { IconButton } from "../button";

interface Orcamento {
  id: number;
  viagemId: number;
  categoria: string;
  custo: string;
  observacao: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface ModalBudgetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: "details" | "itinerary" | "transport") => void;
  orcamentos: Orcamento[];
}

const CATEGORIAS = [
  "Transporte",
  "Hospedagem",
  "Alimentação",
  "Passeio",
  "Outros",
];

const CATEGORIA_CORES = [
  "#00B894", // Transporte
  "#0984E3", // Hospedagem
  "#FDCB6E", // Alimentação
  "#E17055", // Passeio
  "#636E72", // Outros
];

export const ModalBudget: React.FC<ModalBudgetProps> = ({
  isOpen,
  onClose,
  onNavigate,
  orcamentos,
}) => {
  // Agrupa os custos por categoria
  const totaisPorCategoria: Record<string, number> = {
    Transporte: 0,
    Hospedagem: 0,
    Alimentação: 0,
    Passeio: 0,
    Outros: 0,
  };

  orcamentos.forEach((orc) => {
    const cat =
      CATEGORIAS.find((c) => c.toLowerCase() === orc.categoria.toLowerCase()) ||
      "Outros";
    totaisPorCategoria[cat] += parseFloat(orc.custo);
  });

  const totalGeral = Object.values(totaisPorCategoria).reduce(
    (a, b) => a + b,
    0
  );

  // Para o gráfico
  const values = CATEGORIAS.map((cat) => totaisPorCategoria[cat]);

  return (
    isOpen && (
      <div
        style={{ backgroundColor: "rgba(41, 45, 50, 0.6)" }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {" "}
        <div className="bg-white rounded-lg p-8 shadow-lg min-w-[700px] max-w-[900px]">
          <div className="flex items-center justify-between w-full mb-6">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
            </button>
            <div className="relative">
              <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-16 py-2 relative z-10">
                Orçamento
              </h2>
              <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0"></div>
            </div>
            <div className="w-8"></div>
          </div>
          <div className="flex flex-row gap-10">
            {/* Tabela */}
            <table className="min-w-[260px] border shadow-md">
              <thead>
                <tr>
                  <th className="bg-[#0F2976] text-[#FFFFFF] px-6 py-3 text-left text-lg">
                    Descrição
                  </th>
                  <th className="bg-[#0F2976] text-[#FFFFFF] px-6 py-3 text-left text-lg">
                    Valor Estimado
                  </th>
                </tr>
              </thead>
              <tbody className="font-bold text-[#000000]">
                {CATEGORIAS.map((cat) => (
                  <tr key={cat}>
                    <td className="px-6 py-2 border-b border-r text-base">
                      {cat}
                    </td>
                    <td className="px-6 py-2 border-b text-base">
                      R${" "}
                      {totaisPorCategoria[cat].toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-2 border-r text-base">Total</td>
                  <td className="px-6 py-2 text-base">
                    R${" "}
                    {totalGeral.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Gráfico de pizza com legenda */}
            <div className="flex flex-col items-center mt-2 min-w-[220px]">
              <div className="flex flex-row items-start">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {(() => {
                    const total = values.reduce((a, b) => a + b, 0);
                    if (total === 0) {
                      // Nenhum valor: círculo cinza claro
                      return (
                        <circle
                          cx="60"
                          cy="60"
                          r="55"
                          fill="#f3f3f3"
                          stroke="#002B7F"
                          strokeWidth="2"
                        />
                      );
                    }
                    // Só uma categoria com valor: círculo inteiro colorido
                    const idxUnico = values.findIndex((v) => v > 0);
                    if (values.filter((v) => v > 0).length === 1) {
                      return (
                        <circle
                          cx="60"
                          cy="60"
                          r="55"
                          fill={CATEGORIA_CORES[idxUnico]}
                          stroke="#002B7F"
                          strokeWidth="2"
                        />
                      );
                    }
                    // Mais de uma categoria: pizza normal
                    let cumulative = 0;
                    return values.map((value, i) => {
                      if (value === 0) return null;
                      const startAngle = (cumulative / total) * 2 * Math.PI;
                      cumulative += value;
                      const endAngle = (cumulative / total) * 2 * Math.PI;

                      const x1 = 60 + 55 * Math.cos(startAngle - Math.PI / 2);
                      const y1 = 60 + 55 * Math.sin(startAngle - Math.PI / 2);
                      const x2 = 60 + 55 * Math.cos(endAngle - Math.PI / 2);
                      const y2 = 60 + 55 * Math.sin(endAngle - Math.PI / 2);

                      const largeArcFlag =
                        endAngle - startAngle > Math.PI ? 1 : 0;

                      return (
                        <path
                          key={i}
                          d={`
            M60,60
            L${x1},${y1}
            A55,55 0 ${largeArcFlag} 1 ${x2},${y2}
            Z
          `}
                          fill={CATEGORIA_CORES[i]}
                        />
                      );
                    });
                  })()}
                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="#002B7F"
                    strokeWidth="2"
                  />
                </svg>
                {/* Legenda */}
                <div className="flex flex-col gap-2 ml-6 mt-2">
                  {CATEGORIAS.map((cat, i) => (
                    <div key={cat} className="flex items-center gap-2 text-sm">
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: CATEGORIA_CORES[i] }}
                      ></span>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
              {/* Observações abaixo do gráfico+legenda */}
              <div className="flex flex-col w-[380px] mt-8">
                <span className="text-[#102976] font-bold text-lg mb-2">
                  Observações do Organizador
                </span>
                <div className="bg-[#E3FFEB] border border-[#261498] rounded-lg p-3 text-[#000000] text-base">
                  {orcamentos.find((o) => o.observacao)?.observacao ||
                    "Sem observações."}
                </div>
              </div>
            </div>
          </div>
          {/* Botões de navegação, se necessário */}
          <div className="flex justify-center gap-5 mt-7">
            <div className="flex flex-col items-center">
              <IconButton
                icon={
                  <img
                    src="/images-travel/Icons/IconGreenList.png"
                    className="w-16 h-16 cursor-pointer"
                  />
                }
                size="lg"
                shape="circle"
                onClick={() => onNavigate("details")}
              />
              <p className="text-sm text-[#0F2976] mt-2">Mais detalhes</p>
            </div>
            <div className="flex flex-col items-center">
              <IconButton
                icon={
                  <img
                    src="/images-travel/Icons/IconGreenTransport.png"
                    className="w-16 h-16 cursor-pointer"
                  />
                }
                size="lg"
                shape="circle"
                onClick={() => onNavigate("transport")}
              />
              <p className="text-sm text-[#0F2976] mt-2">Transporte</p>
            </div>
            <div className="flex flex-col items-center">
              <IconButton
                icon={
                  <img
                    src="/images-travel/Icons/IconGreenItinerary.png"
                    className="w-16 h-16 cursor-pointer"
                  />
                }
                size="lg"
                shape="circle"
                onClick={() => onNavigate("itinerary")}
              />
              <p className="text-sm text-[#0F2976] mt-2">Itinerário</p>
            </div>
            {/* Ícone de Mensagens */}
            <div className="flex flex-col items-center">
              <IconButton
                icon={
                  <img
                    src="/images-travel/Icons/IconMessage.png"
                    className="w-16 h-16 cursor-pointer"
                  />
                }
                size="lg"
                shape="circle"
                onClick={() => alert("Mensagens clicado!")}
              />
              <p className="text-sm text-[#0F2976] mt-2">Mensagens</p>
            </div>
            {/* Ícone de Aviso */}
            <div className="flex flex-col items-center">
              <IconButton
                icon={
                  <img
                    src="/images-travel/Icons/IconAlert.png"
                    className="w-16 h-16 cursor-pointer"
                  />
                }
                size="lg"
                shape="circle"
                onClick={() => alert("Avisos clicado!")}
              />
              <p className="text-sm text-[#0F2976] mt-2">Avisos</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalBudget;
