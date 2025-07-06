"use client";
import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import Card from "@/components/ui/community/CardPublicTrip";
import BarraDePesquisa from "@/components/ui/community/SearchBar";
import RequireAuth from "@/components/auth/RequireAuth";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { getDefaultImage } from '@/utils/imageUtils';

interface Organizador {
  id: number;
  nome: string;
  foto?: string;
}
interface Viagem {
  id: number;
  nome: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  tipo: string;
  foto?: string;
  organizador?: Organizador;
}

export default function CommunityPage() {
    const [viagens, setViagens] = useState<Viagem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    // Função para buscar viagens públicas
    const buscarViagensPublicas = async () => {
        try {
            setLoading(true);
            const { data: todasViagens } = await api.get('/viagens');
            
            // Filtrar apenas públicas
            const viagensPublicas = todasViagens.filter((viagem: Viagem) => 
                viagem.tipo?.toLowerCase() === 'publica'
            );
            
            setViagens(viagensPublicas);
        } catch (error) {
            console.error('Erro ao buscar viagens:', error);
        } finally {
            setLoading(false);
        }
    };

    // Buscar viagens quando o componente carregar
    useEffect(() => {
        buscarViagensPublicas();
    }, []);

    // Função para calcular duração
    const calcularDuracao = (dataInicio: string, dataFim: string) => {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffTime = Math.abs(fim.getTime() - inicio.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} dias`;
    };

    // Função para calcular tempo desde criação
    const calcularTempoDecorrido = (dataInicio: string) => {
        const agora = new Date();
        const inicio = new Date(dataInicio);
        const diffTime = Math.abs(agora.getTime() - inicio.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "hoje";
        if (diffDays === 1) return "há 1 dia";
        if (diffDays < 7) return `há ${diffDays} dias`;
        if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        return `há ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
    };

    const handleVerDetalhes = (viagemId: number) => {
        // Salvar a viagem no localStorage para a página de detalhes
        const viagemSelecionada = viagens.find(v => v.id === viagemId);
        if (viagemSelecionada) {
            localStorage.setItem('selectedTrip', JSON.stringify(viagemSelecionada));
        }
        
        // Redirecionar para a página de detalhes
        router.push('/travels');
    };

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Main Content */}
        <div className="flex flex-col w-full overflow-hidden">
          <HeaderPages />

          <main className="flex flex-col items-center w-full max-w-[90%] mx-auto pt-10 px-5 gap-8">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white text-4xl font-bold ">
                Comunidade Globix
              </h1>
            </div>

            <div>
              <h2 className="text-white text-lg">
                Participe de Excursões criados por outros viajantes{" "}
              </h2>
            </div>

            <BarraDePesquisa />

            {loading ? (
                            <div className="text-white text-xl">Carregando viagens...</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {viagens.length > 0 ? (
                                    viagens.map((viagem) => (
                                        <Card
                                            key={viagem.id}
                                            topImage={viagem.foto || getDefaultImage('trip')}
                                            userImage={viagem.organizador?.foto || getDefaultImage('user')}
                                            tripName={viagem.nome}
                                            location={viagem.destino}
                                            createdAt={calcularTempoDecorrido(viagem.dataInicio)}
                                            duration={calcularDuracao(viagem.dataInicio, viagem.dataFim)}
                                            onVerDetalhes={() => handleVerDetalhes(viagem.id)} // ← Adicionar esta prop
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-white text-center text-xl">
                                        Nenhuma viagem pública encontrada
                                    </div>
                                )}
                            </div>
                        )}
            <div className="mb-20" />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
