import React from "react";
import { IconButton } from "@/components/ui/button";

interface ModalBudgetProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (target: 'details' | 'itinerary' | 'transport') => void;
}

const ModalBudget: React.FC<ModalBudgetProps> = ({ isOpen, onClose, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(41,45,50,0.6)]">
            <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-5xl p-8 relative">
                <div className="flex items-center justify-between w-full mb-6">
                    {/* Botão com a seta para a esquerda */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                    >
                        <img src="/images-modals/Icons/BackIcon.png" alt="Voltar" className="w-14 h-14 cursor-pointer" />
                    </button>

                    {/* Título "Transporte" */}
                    <div className="relative flex-1 flex justify-center">
                        <div className="relative inline-block">
                            <h2 className="text-4xl font-bold text-[#00FF4D] bg-[#0F2976] px-16 py-2 relative z-10">
                                Orçamento
                            </h2>
                            <div className="absolute top-2 left-2 w-full h-full bg-[#1C4CDC] z-0 rounded"></div>
                        </div>
                    </div>

                    {/* Espaço vazio para alinhar o título ao centro */}
                    <div className="w-8"></div>
                </div>

                {/* CONTEÚDO CENTRAL AJUSTADO */}
                <div className="flex flex-row gap-8 justify-start items-start mb-20 mt-20 ml-16">
                    {/* Tabela */}
                    <table className="min-w-[260px] border shadow-md">
                        <thead>
                            <tr>
                                <th className="bg-[#0F2976] text-[#FFFFFF] px-6 py-3 text-left text-lg">Descrição</th>
                                <th className="bg-[#0F2976] text-[#FFFFFF] px-6 py-3 text-left text-lg">Valor Estimado</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold text-[#000000]">
                            <tr>
                                <td className="px-6 py-2 border-b border-r text-base">Transporte</td>
                                <td className="px-6 py-2 border-b text-base">R$ 1.200,00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2 border-b border-r text-base">Hospedagem</td>
                                <td className="px-6 py-2 border-b text-base">R$ 2.500,00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2 border-b border-r text-base">Alimentação</td>
                                <td className="px-6 py-2 border-b text-base">R$ 800,00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2 border-b border-r text-base">Passeios</td>
                                <td className="px-6 py-2 border-b text-base">R$ 600,00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2 border-b border-r text-base">Outros</td>
                                <td className="px-6 py-2 border-b text-base">R$ 150,00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2 border-r text-base">Total</td>
                                <td className="px-6 py-2 text-base">R$ 5.250,00</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Gráfico de pizza com legenda e observações abaixo */}
                    <div className="flex flex-col items-center mt-2 min-w-[220px]">
                        {/* Gráfico + legenda */}
                        <div className="flex flex-row items-start">
                            {/* Gráfico */}
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                {(() => {
                                    // Dados e cores
                                    const values = [1200, 2500, 800, 600, 150];
                                    const colors = [
                                        "#00B894", // Transporte
                                        "#0984E3", // Hospedagem
                                        "#FDCB6E", // Alimentação
                                        "#E17055", // Passeios
                                        "#636E72"  // Outros
                                    ];
                                    const total = values.reduce((a, b) => a + b, 0);

                                    let cumulative = 0;
                                    return values.map((value, i) => {
                                        const startAngle = (cumulative / total) * 2 * Math.PI;
                                        cumulative += value;
                                        const endAngle = (cumulative / total) * 2 * Math.PI;

                                        const x1 = 60 + 55 * Math.cos(startAngle - Math.PI / 2);
                                        const y1 = 60 + 55 * Math.sin(startAngle - Math.PI / 2);
                                        const x2 = 60 + 55 * Math.cos(endAngle - Math.PI / 2);
                                        const y2 = 60 + 55 * Math.sin(endAngle - Math.PI / 2);

                                        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

                                        return (
                                            <path
                                                key={i}
                                                d={`
                                                    M60,60
                                                    L${x1},${y1}
                                                    A55,55 0 ${largeArcFlag} 1 ${x2},${y2}
                                                    Z
                                                `}
                                                fill={colors[i]}
                                            />
                                        );
                                    });
                                })()}
                                
                                {/* Borda externa */}
                                <circle cx="60" cy="60" r="55" fill="none" stroke="#002B7F" strokeWidth="2" />
                            </svg>

                            {/* Legenda ao lado direito do gráfico */}
                            <div className="flex flex-col gap-2 ml-6 mt-2">
                                {[
                                    { label: "Transporte", color: "bg-[#00B894]" },
                                    { label: "Hospedagem", color: "bg-[#0984E3]" },
                                    { label: "Alimentação", color: "bg-[#FDCB6E]" },
                                    { label: "Passeios", color: "bg-[#E17055]" },
                                    { label: "Outros", color: "bg-[#636E72]" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-2 text-sm">
                                        <span className={`inline-block w-4 h-4 rounded-full ${item.color}`}></span>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Observações abaixo do gráfico+legenda */}
                        <div className="flex flex-col w-[380px] mt-8">
                            <span className="text-[#102976] font-bold text-lg mb-2">Observações do Organizador</span>
                            <div className="bg-[#E3FFEB] border border-[#261498] rounded-lg p-3 text-[#000000] text-base">
                                Seguinte não quero ninguém gastando mais que o permitido, se o budget estourar eu vou matar um.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ícones de ações */}
                <div className="flex justify-center gap-5 mt-7">
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenList.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('details')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mais Detalhes</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenItinerary.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('itinerary')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Itinerário</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconGreenTransport.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => onNavigate('transport')}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Transporte</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconMessage.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => alert("Mensagens clicado!")}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Mensagens</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <IconButton
                            icon={<img src="/images-travel/Icons/IconAlert.png" className="w-16 h-16 cursor-pointer" />}
                            size="lg"
                            shape="circle"
                            onClick={() => alert("Avisos clicado!")}
                        />
                        <p className="text-sm text-[#0F2976] mt-2">Avisos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBudget;