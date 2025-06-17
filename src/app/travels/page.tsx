"use client";

import SidebarMenu from "@/components/ui/SidebarMenu";
import { UserList, RequestList } from "@/components/ui/UserList";
import { IconButton } from "@/components/ui/button";
import ModalEditTrip from "@/components/ui/modals/ModalEditTrip";
import { ModalItinerary } from "@/components/ui/modals/ModalItinerary";
import ModalMoreDetails from "@/components/ui/modals/ModalMoreDetails";
import { ModalPromoteOrganizer } from "@/components/ui/modals/ModalPromoteOrganizer";
import ModalTransport from "@/components/ui/modals/ModalTransport";
import ModalBudget from "@/components/ui/modals/ModalBudget";
import { List, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import {
  mapApiToItineraries,
  ItineraryDay,
  ItineraryItem,
} from "@/utils/itineraryUtils";
import {
  ModalMoreDetailsTrip,
  mapToModalMoreDetailsTrip,
} from "@/utils/moreDetailsUtils";
import {
  TransportLocation,
  mapToTransportLocation,
} from "@/utils/transportUtils";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  status: number;
  tipo: string;
  foto?: string;
}

interface SolicitacaoViagem {
  idUsuario: number;
  papel: string;
  status: number;
}

interface Itinerario {
  id: number;
  idViagem: number;
  tipoEvento: string;
  titulo: string;
  dataHora: string;
  descricao: string;
}

interface Trip {
  id: number;
  nome: string;
  descricao?: string;
  imagem?: string;
  data_inicio?: string;
  data_fim?: string;
  itinerario?: Itinerario[]; // Tipar se desejar
}
interface Orcamento {
  id: number;
  viagemId: number;
  categoria: string;
  custo: string;
  observacao: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export default function DetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMoreDetailsOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isItineraryOpen, setIsItineraryModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false); // ADICIONE ESTA LINHA
  const [moreDetailsTrip, setMoreDetailsTrip] = useState<ModalMoreDetailsTrip | null>(null);
  const [transportData, setTransportData] = useState<TransportLocation | null>(null);
  const [itineraries, setItineraries] = useState<ItineraryDay[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

  const [trip, setTrip] = useState<Trip | null>(null);
  const [convidados, setConvidados] = useState<Usuario[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<Usuario[]>([]);
  const [organizadores, setOrganizadores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("convidados");
  const [imagens] = useState(["/images-home_page/carousel/carrossel.png"]);

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== "undefined") {
        const storedTrip = localStorage.getItem("selectedTrip");
        if (storedTrip) {
          const tripObj = JSON.parse(storedTrip);
          setTrip(tripObj);

          // Buscar solicitações da viagem
          const { data: solicitacoesData } = await api.get(
            `/solicitacoes/viagem/${tripObj.id}`
          );
          // Buscar dados completos dos usuários
          const usuariosPromises = solicitacoesData.map(
            async (sol: SolicitacaoViagem) => {
              const { data: usuario } = await api.get(
                `/usuario/${sol.idUsuario}`
              );
              return {
                ...usuario,
                papel: sol.papel,
                status: sol.status,
              };
            }
          );
          const usuariosCompletos = await Promise.all(usuariosPromises);

          setOrganizadores(
            usuariosCompletos.filter((u) =>
              ["organizador", "organizadorpromovido"].includes(
                (u.papel ?? "").toLowerCase()
              )
            )
          );
          setConvidados(
            usuariosCompletos
              .filter(
                (u) =>
                  u.status == 1 &&
                  !["organizador", "organizadorpromovido"].includes(
                    (u.papel ?? "").toLowerCase()
                  )
              )
              .map((u) => ({
                ...u,
                foto: u.foto ?? "/user.png",
              }))
          );
          setSolicitacoes(
            usuariosCompletos
              .filter((u) => u.status === 0)
              .map((u) => ({
                ...u,
                foto: u.foto ?? "/user.png",
              }))
          );
        }
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const closeAllModals = () => {
    setIsTransportModalOpen(false);
    setIsMoreDetailsModalOpen(false);
    setIsItineraryModalOpen(false);
    setIsBudgetModalOpen(false);
  };

  // async function promoverUsuario(id_usuario: number) {
  //     await fetch(`/api/usuarios/${id_usuario}/promover`, {
  //         method: "POST",
  //     });
  // }

  // async function removerUsuario(id_usuario: number) {
  //     await fetch(`/api/usuarios/${id_usuario}/remover`, {
  //         method: "POST",
  //     });
  // }

  // const handleEdit = (option: string) => {
  //     console.log(`Opção selecionada para edição: ${option}`);
  //     setIsEditModalOpen(false);
  // };

  const handleAccept = async (id: number) => {
    await api.put(`solicitacao/${trip?.id}/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const usuarioAceito = solicitacoes.find(
      (solicitacao) => solicitacao.id === id
    );
    if (usuarioAceito) {
      setConvidados([...convidados, usuarioAceito]);
      setSolicitacoes(
        solicitacoes.filter((solicitacao) => solicitacao.id !== id)
      );
    }
  };

  const handleDeny = (id: number) => {
    setSolicitacoes(
      solicitacoes.filter((solicitacao) => solicitacao.id !== id)
    ); // Remove das solicitações
  };

  useEffect(() => {
    const fetchMoreDetails = async () => {
      const storedTrip = localStorage.getItem("selectedTrip");
      if (!storedTrip) return;
      const tripObj = JSON.parse(storedTrip);
      const viagemId = tripObj.id;

      try {
        // Busca os dados atualizados da viagem pelo ID
        const { data } = await api.get(`/viagem/${viagemId}`);

        // Monta o objeto para o modal usando apenas os campos necessários
        setMoreDetailsTrip(
          mapToModalMoreDetailsTrip(data, organizadores, convidados)
        );
      } catch (error) {
        console.error("Erro ao buscar detalhes da viagem:", error);
      }
    };
    fetchMoreDetails();
  }, [organizadores, convidados]);

  useEffect(() => {
    const fetchTransportAndLocation = async () => {
      const storedTrip = localStorage.getItem("selectedTrip");
      if (!storedTrip) return;
      const tripObj = JSON.parse(storedTrip);
      const viagemId = tripObj.id;

      try {
        const { data: transporte } = await api.get(`/transporte/viagem/${viagemId}`);
        const { data: localizacao } = await api.get(`/localizacao/viagem/${viagemId}`);
        setTransportData(mapToTransportLocation(transporte, localizacao));
      } catch (error) {
        console.error("Erro ao buscar transporte/localização:", error);
      }
    };
    fetchTransportAndLocation();
  }, []);

  useEffect(() => {
    const fetchItinerarios = async () => {
      const selectedTripStr = localStorage.getItem("selectedTrip");
      if (!selectedTripStr) return;
      const selectedTrip = JSON.parse(selectedTripStr);
      const viagemId = selectedTrip.id;
      try {
        const response = await api.get(`/itinerarios/viagem/${viagemId}`);
        setItineraries(mapApiToItineraries(response.data));
      } catch (error) {
        console.error("Erro ao buscar itinerários:", error);
      }
    };
    fetchItinerarios();
  }, []);

  useEffect(() => {
    async function fetchOrcamentos() {
      const storedTrip = localStorage.getItem("selectedTrip");
      if (storedTrip) {
        const tripObj = JSON.parse(storedTrip);
        try {
          const { data } = await api.get(`/orcamentos/viagem/${tripObj.id}`);
          setOrcamentos(data);
        } catch (error) {
          console.error("Erro ao buscar orçamentos:", error);
        }
      }
    }
    fetchOrcamentos();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] items-center justify-center">
        <span className="text-white text-xl">Carregando...</span>
      </div>
    );
  }

  const eventos: ItineraryItem[] = itineraries.flatMap((day) =>
    day.activities.map((activity) => ({
      id: activity.id ?? 0,
      idViagem: 0, // ajuste se tiver esse dado
      tipoEvento: activity.type,
      titulo: activity.title,
      dataHora: `${day.date.split("/").reverse().join("-")}T${activity.time}`,
      descricao: activity.description,
    }))
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
      <SidebarMenu />

      <div className="flex flex-col items-center w-full bg-[#0F2976]">
        <img
          src="/images-home_page/logo-globix.png"
          className="ml-auto mr-5 mt-5"
        />

        <div className="absolute top-17 ml-5 items-center justify-center w-1/5 h-18 p-4 bg-[#1C4CDC]" />

        <div className="absolute top-15 items-center justify-center w-1/5 h-18 p-4 bg-white">
          <h1 className="text-4xl font-bold text-center text-[#0F2976]">
            {trip?.nome}
          </h1>
        </div>

        {/* div branca */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-190 mt-25 mb-30">
          {/* capa */}
          <img
            src={trip?.imagem || "/images-travel/capa.png"}
            alt={trip?.nome || "Capa da viagem"}
            className="w-full h-80"
          />

          <div className="p-10 w-full h-full">
            <div className="flex flex-row w-full justify-between">
              {/* Div com o Organizador */}
              <div className="flex relative flex-col items-center w-1/4">
                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold mb-10">
                  Organizadores
                </h2>
                <div className="grid grid-cols-2 gap-2 overflow-x-auto h-60">
                  {organizadores.map((usuario) => (
                    <div
                      key={usuario.id}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={usuario.foto || "/user.png"}
                        alt={usuario.nome}
                        className="w-23 h-23 object-cover rounded-full"
                      />
                      <p className="mt-2 text-sm text-[#292D32]">
                        {usuario.nome}
                      </p>
                    </div>
                  ))}
                  {/* Botão para adicionar mais Organizadores Promovidos */}
                  {imagens.length < 6 && (
                    <div className="flex flex-col w-full items-center">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-19 shadow-md h-19 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300 cursor-pointer"
                      >
                        <Plus className="w-12 h-12 text-[#0F2976]" />
                      </button>
                      <p className="mt-2 text-xs text-[#292D32] whitespace-nowrap">
                        Adicionar Organizador
                      </p>
                    </div>
                  )}
                  <ModalPromoteOrganizer
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    usuarios={convidados}
                    onPromote={async (id) => {
                      // Atualiza o tipo do usuário para "OrganizadorPromovido"
                      // await promoverUsuario(id); // Implemente se necessário
                      setConvidados(
                        convidados.map((usuario) =>
                          usuario.id === id
                            ? { ...usuario, tipo: "OrganizadorPromovido" }
                            : usuario
                        )
                      );
                      setIsModalOpen(false);
                    }}
                    onRemove={async (id) => {
                      // await removerUsuario(id); // Implemente se necessário
                      setConvidados(
                        convidados.map((usuario) =>
                          usuario.id === id
                            ? { ...usuario, tipo: "Participante" }
                            : usuario
                        )
                      );
                    }}
                  />
                </div>
              </div>

              {/* Div com o gradiente */}
              <div className="flex flex-col relative items-center justify-center w-full h-100 sm:w-2/3 sm:h-3/3">
                <div className="relative w-3/5 flex items-center justify-center bg-[#D9D9D9] rounded-full h-12 mb-10">
                  <div
                    className={`absolute top-0 left-0 h-12 w-1/2 bg-[#1C4CDC] transition-all duration-300
                                        ${activeButton === "convidados"
                        ? "rounded-l-full"
                        : "left-1/2 rounded-r-full"
                      }`}
                  ></div>
                  <div className="relative flex w-full">
                    <button
                      className={`z-10 w-1/2 py-2 text-2xl font-bold transition-all duration-300  ${activeButton === "convidados"
                        ? "text-white "
                        : "text-[#0F2976] cursor-pointer"
                        }`}
                      onClick={() => setActiveButton("convidados")}
                    >
                      Convidados
                    </button>
                    <button
                      className={`z-10 w-1/2 py-2 text-2xl font-bold transition-all duration-300 ${activeButton === "solicitacoes"
                        ? "text-white"
                        : "text-[#0F2976] cursor-pointer"
                        }`}
                      onClick={() => setActiveButton("solicitacoes")}
                    >
                      Solicitações
                    </button>
                  </div>
                </div>
                {activeButton === "convidados" && (
                  <div
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#fffff #0F2976",
                    }}
                    className="w-3/5 p-4 pr-20 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                  >
                    <UserList usuarios={convidados} />
                  </div>
                )}
                {activeButton === "solicitacoes" && (
                  <div
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#fffff #0F2976",
                    }}
                    className="w-3/5 p-4 h-65 bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-2xl overflow-y-auto"
                  >
                    <RequestList
                      solicitacoes={solicitacoes.map((s) => ({
                        id: s.id,
                        nome: s.nome,
                        email: s.email,
                        foto: s.foto ?? "/user.png", // garante que nunca será undefined
                        tipo: 1, // ou outro valor adequado
                      }))}
                      onAccept={handleAccept}
                      onDeny={handleDeny}
                    />
                  </div>
                )}
              </div>

              {/* Div com os botões */}
              <div className="flex relative flex-col items-center h-full w-1/4">
                <h2 className="flex items-center justify-center bg-[#D9D9D9] text-[#0F2976] rounded-full py-2 p-5 text-2xl font-bold mb-10">
                  Informações
                </h2>
                <div className="flex gap-4">
                  <div>
                    <div className="flex flex-col items-center">
                      <IconButton
                        icon={<List className="w-20 h-20" />}
                        onClick={() => setIsMoreDetailsModalOpen(true)}
                      />
                      <p className="text-sm text-gray-500 mt-4">
                        Mais Detalhes
                      </p>
                    </div>
                    <ModalMoreDetails
                      isOpen={isMoreDetailsOpen}
                      onClose={() => setIsMoreDetailsModalOpen(false)}
                      onNavigate={(target) => {
                        closeAllModals();
                        if (target === "itinerary") setIsItineraryModalOpen(true);
                        if (target === "transport") setIsTransportModalOpen(true);
                        if (target === "budget") setIsBudgetModalOpen(true);
                      }}
                      trip={moreDetailsTrip}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <IconButton
                      icon={
                        <img
                          src="/images-travel/Icons/IconGreenTransport.png"
                          className="w-20 h-20"
                        />
                      }
                      onClick={() => {
                        closeAllModals();
                        setIsTransportModalOpen(true);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-4">Transporte</p>
                    <ModalTransport
                      isOpen={isTransportModalOpen}
                      onClose={() => setIsTransportModalOpen(false)}
                      onNavigate={(target) => {
                        closeAllModals();
                        if (target === "itinerary") setIsItineraryModalOpen(true);
                        if (target === "details") setIsMoreDetailsModalOpen(true);
                        if (target === "budget") setIsBudgetModalOpen(true);
                      }}
                      transportData={transportData}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <IconButton
                      icon={
                        <img
                          src="/images-travel/Icons/IconGreenItinerary.png"
                          className="w-w-20 h-20"
                        />
                      }
                      onClick={() => setIsItineraryModalOpen(true)}
                    />
                    <p className="text-sm text-gray-500 mt-4">Itinerário</p>
                    <ModalItinerary
                      isOpen={isItineraryOpen}
                      onClose={() => setIsItineraryModalOpen(false)}
                      onNavigate={(target) => {
                        closeAllModals();
                        if (target === "transport")
                          setIsTransportModalOpen(true);
                        if (target === "details")
                          setIsMoreDetailsModalOpen(true);
                        if (target === "budget") setIsBudgetModalOpen(true);
                      }}
                      itinerario={eventos}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-5">
                  <div>
                    <div className="flex flex-col items-center">
                      <IconButton
                        icon={
                          <img
                            src="\images-travel\Icons\IconGreenBudget.png"
                            className="w-w-20 h-20"
                          />
                        }
                        onClick={() => setIsBudgetModalOpen(true)}
                      />
                      <p className="text-sm text-gray-500 mt-4">Orçamento</p>
                    </div>

                    <ModalBudget
                      isOpen={isBudgetModalOpen}
                      onClose={() => setIsBudgetModalOpen(false)}
                      onNavigate={(target) => {
                        closeAllModals();
                        if (target === "itinerary")
                          setIsItineraryModalOpen(true);
                        if (target === "transport")
                          setIsTransportModalOpen(true);
                        if (target === "details")
                          setIsMoreDetailsModalOpen(true);
                      }}
                      orcamentos={orcamentos}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <IconButton
                      icon={
                        <img
                          src="/images-travel/Icons/IconMessage.png"
                          className="w-20 h-20"
                        />
                      }
                      onClick={() => alert("Botão clicado!")}
                    />
                    <p className="text-sm text-gray-500 mt-2">Mensagem</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <IconButton
                      icon={
                        <img
                          src="/images-travel/Icons/IconAlert.png"
                          className="w-20 h-20"
                        />
                      }
                      onClick={() => alert("Botão clicado!")}
                    />
                    <p className="text-sm text-gray-500 mt-2">Avisos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between mt-8">
              <button
                className="text-2xl font-bold bg-[#D9D9D9] text-[#0F2976] rounded-full w-60 py-3 hover:bg-gray-300 cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                Editar
              </button>
              <button className="text-2xl font-bold bg-blue-900 text-white rounded-full w-60 py-3 hover:bg-blue-800 cursor-pointer">
                Encerrar Viagem
              </button>
              <ModalEditTrip
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEdit={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"></div>
    </div>
  );
}
