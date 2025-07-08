"use client";
import React, { useEffect, useState, useMemo } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import Card from "@/components/ui/community/CardPublicTrip";
import BarraDePesquisa from "@/components/ui/community/SearchBar";
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
  dataCriacao?: string;
}

export default function CommunityPage() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creationOrder, setCreationOrder] = useState<"criacao-mais-nova" | "criacao-mais-antiga">("criacao-mais-nova");
  const [startOrder, setStartOrder] = useState<"inicio-mais-perto" | "inicio-mais-distante">("inicio-mais-perto");
  const [alphaOrder, setAlphaOrder] = useState<"a-z" | "z-a">("a-z");
  const [activeSort, setActiveSort] = useState<"criacao" | "inicio" | "alfabetica">("criacao");
  const router = useRouter();

  // Buscar viagens públicas
  const buscarViagensPublicas = async () => {
    try {
      setLoading(true);
      const { data: todasViagens } = await api.get('/viagens');
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
    const viagemSelecionada = viagens.find(v => v.id === viagemId);
    if (viagemSelecionada) {
      localStorage.setItem('selectedTrip', JSON.stringify(viagemSelecionada));
    }
    router.push('/travels');
  };

  // Filtragem e ordenação
  const viagensFiltradas = useMemo(() => {
    let result = viagens;

    if (search.trim()) {
      const termo = search.trim().toLowerCase();
      result = result.filter(v => v.nome.toLowerCase().includes(termo));
    }

    if (activeSort === "criacao") {
      if (creationOrder === "criacao-mais-nova") {
        result = [...result].sort((a, b) => new Date(b.dataCriacao ?? b.dataInicio).getTime() - new Date(a.dataCriacao ?? a.dataInicio).getTime());
      } else {
        result = [...result].sort((a, b) => new Date(a.dataCriacao ?? a.dataInicio).getTime() - new Date(b.dataCriacao ?? b.dataInicio).getTime());
      }
    } else if (activeSort === "inicio") {
      if (startOrder === "inicio-mais-perto") {
        result = [...result].sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
      } else {
        result = [...result].sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime());
      }
    } else if (activeSort === "alfabetica") {
      if (alphaOrder === "a-z") {
        result = [...result].sort((a, b) => a.nome.localeCompare(b.nome));
      } else {
        result = [...result].sort((a, b) => b.nome.localeCompare(a.nome));
      }
    }

    return result;
  }, [viagens, search, creationOrder, startOrder, alphaOrder, activeSort]);

  return (
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        <SidebarMenu />
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
            <BarraDePesquisa
              search={search}
              setSearch={setSearch}
              creationOrder={creationOrder}
              setCreationOrder={setCreationOrder}
              startOrder={startOrder}
              setStartOrder={setStartOrder}
              alphaOrder={alphaOrder}
              setAlphaOrder={setAlphaOrder}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
            {loading ? (
              <div className="text-white text-xl">Carregando viagens...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {viagensFiltradas.length > 0 ? (
                  viagensFiltradas.map((viagem) => (
                    <Card
                      key={viagem.id}
                      topImage={viagem.foto || getDefaultImage('trip')}
                      userImage={viagem.organizador?.foto || getDefaultImage('user')}
                      tripName={viagem.nome}
                      location={viagem.destino}
                      createdAt={calcularTempoDecorrido(viagem.dataInicio)}
                      duration={calcularDuracao(viagem.dataInicio, viagem.dataFim)}
                      onVerDetalhes={() => handleVerDetalhes(viagem.id)}
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
  );
}