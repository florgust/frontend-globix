"use client";
import React, { useEffect, useState, useMemo } from "react";
import SidebarMenu from "../../components/common/SidebarMenu";
import { HeaderPages } from "@/components/common/Header";
import { Header } from "@/components/common/Header";
import Card from "@/components/ui/community/CardPublicTrip";
import BarraDePesquisa from "@/components/ui/community/SearchBar";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { getDefaultImage } from '@/utils/imageUtils';
import Cookies from "js-cookie";

interface ViagemApi {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  criadorId: number;
  codigoConvite: number;
  status: number;
  tipo: string;
  quantidadeParticipante: number;
  dataCriacao: string;
  dataAtualizacao: string;
  cidadeOrigem: string;
  cidadeDestino: string;
  fotoCapa?: { id: number; url: string } | null;
  url?: string | null;
}

interface Organizador {
  id: number;
  nome: string;
  foto?: string | null;
}

interface Viagem {
  id: number;
  nome: string;
  destino?: string;
  cidadeOrigem: string;
  cidadeDestino: string;
  dataInicio: string;
  dataFim: string;
  tipo: string;
  foto?: string | null;
  dataCriacao?: string;
  organizador: Organizador;
}

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#0F2976] mb-4 text-center">Você precisa estar logado</h2>
        <p className="text-gray-600 mb-6 text-center">Faça login para acessar esta funcionalidade.</p>
        <button
          className="bg-[#00FF4D] text-[#0F2976] px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-[#1C4CDC] hover:text-white transition cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Ir para Login
        </button>
        <button
          className="mt-4 text-[#0F2976] underline cursor-pointer"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creationOrder, setCreationOrder] = useState<"criacao-mais-nova" | "criacao-mais-antiga">("criacao-mais-nova");
  const [startOrder, setStartOrder] = useState<"inicio-mais-perto" | "inicio-mais-distante">("inicio-mais-perto");
  const [alphaOrder, setAlphaOrder] = useState<"a-z" | "z-a">("a-z");
  const [activeSort, setActiveSort] = useState<"criacao" | "inicio" | "alfabetica">("criacao");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendentes, setPendentes] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Pega o id do usuário logado do cookie
  const usuarioCookie = typeof window !== "undefined" ? Cookies.get("usuario") : null;
  const usuarioObj = usuarioCookie ? JSON.parse(usuarioCookie) : null;
  const userId = usuarioObj?.id;

  // Checa se está logado
  const isLoggedIn = !!userId;

  // Buscar viagens públicas
  const buscarViagensPublicas = async () => {
    try {
      setLoading(true);
      const { data: todasViagens } = await api.get<ViagemApi[]>('/viagens/fotos');
      const viagensPublicas: Viagem[] = todasViagens
        .filter((viagem) => viagem.tipo?.toLowerCase() === 'publica')
        .map((viagem) => ({
          id: viagem.id,
          nome: viagem.nome,
          destino: viagem.cidadeDestino,
          dataInicio: viagem.dataInicio,
          dataFim: viagem.dataFim,
          tipo: viagem.tipo,
          foto: viagem.fotoCapa?.url || viagem.url || null,
          dataCriacao: viagem.dataCriacao,
          cidadeDestino: viagem.cidadeDestino,
          cidadeOrigem: viagem.cidadeOrigem,
          organizador: {
            id: viagem.criadorId,
            nome: "Organizador",
            foto: null // será preenchido depois
          }
        }));

      // Buscar as fotos de perfil dos organizadores
      const viagensComFotoOrganizador = await Promise.all(
        viagensPublicas.map(async (viagem) => {
          try {
            const { data } = await api.get<{ url: string }>(`/foto/perfil/${viagem.organizador.id}`);
            return {
              ...viagem,
              organizador: {
                ...viagem.organizador,
                foto: data?.url || null
              }
            };
          } catch {
            return viagem;
          }
        })
      );
      setViagens(viagensComFotoOrganizador);
    } catch (error) {
      console.error('Erro ao buscar viagens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarViagensPublicas();
  }, []);

  // Carrega pendentes do localStorage ao montar, por usuário
  useEffect(() => {
    if (!userId) return;
    const pendentesStorage = localStorage.getItem(`viagensPendentes_${userId}`);
    if (pendentesStorage) {
      setPendentes(JSON.parse(pendentesStorage));
    } else {
      setPendentes([]);
    }
  }, [userId]);

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

  // Handler para qualquer ação que exija login
  const handleProtectedAction = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    callback();
  };

  // Handler para participar da viagem (faz POST e salva por usuário)
  const handleParticipar = async (viagemId: number) => {
    handleProtectedAction(async () => {
      if (pendentes.includes(viagemId)) return;
      try {
        await api.post(`/solicitacao/${userId}/${viagemId}`);
        const updated = [...pendentes, viagemId];
        setPendentes(updated);
        if (userId) {
          localStorage.setItem(`viagensPendentes_${userId}`, JSON.stringify(updated));
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        setAlertMessage("Erro ao solicitar participação. Tente novamente.");
        setTimeout(() => setAlertMessage(""), 3000);
      }
    });
  };

  function parseDateLocal(dateStr: string): Date {
    // Espera "yyyy-mm-dd"
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

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
      {isLoggedIn && <SidebarMenu />}
      <div className="flex flex-col w-full overflow-hidden">
        {isLoggedIn ? <HeaderPages /> : <Header />}
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
          {alertMessage && (
            <div className="w-full flex justify-center">
              <div className="bg-red-500 text-white px-6 py-3 rounded-lg mb-4 text-center text-lg font-medium">
                {alertMessage}
              </div>
            </div>
          )}
          {loading ? (
            <div className="text-white text-xl">Carregando viagens...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {viagensFiltradas.length > 0 ? (
                viagensFiltradas.map((viagem) => (
                  <Card
                    key={viagem.id}
                    topImage={viagem.foto || getDefaultImage('trip')}
                    userImage={getDefaultImage('user')}
                    tripName={viagem.nome}
                    location={viagem.destino || ""}
                    cidadeOrigem={viagem.cidadeOrigem}
                    cidadeDestino={viagem.cidadeDestino}
                    createdAt={calcularTempoDecorrido(viagem.dataInicio)}
                    duration={calcularDuracao(viagem.dataInicio, viagem.dataFim)}
                    startDate={parseDateLocal(viagem.dataInicio).toLocaleDateString("pt-BR")}
                    endDate={parseDateLocal(viagem.dataFim).toLocaleDateString("pt-BR")}
                    isPendente={pendentes.includes(viagem.id)}
                    onParticipar={() => handleParticipar(viagem.id)}
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
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg px-12 py-10 flex flex-col items-center min-w-[24rem]">
            <span className="text-3xl text-[#00FF4D] font-bold mb-2">Sucesso!</span>
            <span className="text-[#0F2976] text-xl text-center">Solicitação enviada.</span>
          </div>
        </div>
      )}
    </div>
  );
}