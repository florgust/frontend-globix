"use client";

import SidebarMenu from "@/components/common/SidebarMenu";
import { UserList, RequestList } from "@/components/ui/UserList";
import { IconButton } from "@/components/common/Button";
import ModalEditTrip from "@/components/ui/modals/ModalEditTrip";
import { ModalItinerary } from "@/components/ui/modals/ModalItinerary";
import ModalMoreDetails from "@/components/ui/modals/ModalMoreDetails";
import { ModalPromoteOrganizer } from "@/components/ui/modals/ModalPromoteOrganizer";
import ModalTransport from "@/components/ui/modals/ModalTransport";
import ModalBudget from "@/components/ui/modals/ModalBudget";
import { List, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import RequireAuth from "@/components/auth/RequireAuth";
import RequireTripSelected from "@/components/auth/RequireTripSelected";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  status: number;
  papel: string;
  foto?: string;
}

interface SolicitacaoViagem {
  idUsuario: number;
  papel: string;
  status: number;
  inseridoNaViagem: number;
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
  codigoConvite?: number;
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
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
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

  const router = useRouter();
  const [isEndTripModalOpen, setIsEndTripModalOpen] = useState(false);


  // ...existing code...
  const handleEndTrip = async () => {
    if (!trip?.id) return;
    try {
      // Primeiro encerra todas as solicitações da viagem
      await api.put(`/solicitacao/encerrar/${trip.id}`);

      setIsEndTripModalOpen(false);
      router.push("/profile");
    } catch (error) {
      alert("Erro ao encerrar viagem." + error);
    }
  };
  // ...existing code...

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== "undefined") {
        const storedTrip = localStorage.getItem("selectedTrip");
        if (storedTrip) {
          const tripObj = JSON.parse(storedTrip);
          setTrip({
            ...tripObj,
            codigoConvite: tripObj.codigoConvite ?? tripObj.codigo_convite,
          });

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
                inseridoNaViagem: sol.inseridoNaViagem,
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
                  u.inseridoNaViagem == 1 &&
                  !["organizador", "organizadorpromovido"].includes(
                    (u.papel ?? "").toLowerCase()
                  )
              )
              .map((u) => ({
                ...u,
                foto: u.foto ?? "/user2.png",
              }))
          );
          setSolicitacoes(
            usuariosCompletos
              .filter((u) => u.inseridoNaViagem == 0)
              .map((u) => ({
                ...u,
                foto: u.foto ?? "/user2.png",
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

  async function PromoverOuRebaixarOrganizador(tripId: number, id_usuario: number) {

    const organizadorPrincipal = organizadores.find(org =>
      org.papel?.toLowerCase() === "organizador"
    );
    const idOrganizador = organizadorPrincipal?.id;
    console.log("Promovendo/Rebaixando organizador:", tripId, id_usuario, idOrganizador);

    await api.post(`/solicitacao/promocao/${tripId}/${idOrganizador}`, {
      idUsuarioSolicitante: id_usuario,
    });
  }

  const handleAccept = async (id: number) => {
    await api.put(`solicitacao/${trip?.id}/${id}/inserido`, {
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

  const handleDeny = async (id: number) => {
    try {
      // Chama a API para excluir a solicitação
      await api.delete(`/solicitacao/${trip?.id}/${id}`);

      // Remove das solicitações na interface
      setSolicitacoes(
        solicitacoes.filter((solicitacao) => solicitacao.id !== id)
      );
    } catch (error) {
      console.error("Erro ao negar solicitação:", error);
      alert("Erro ao negar solicitação");
    }
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
  console.log("Dados enviados pro modal:", [...organizadores, ...convidados]);

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

  function ConfirmEndTripModal({ open, onClose, onConfirm }: { open: boolean, onClose: () => void, onConfirm: () => void }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-[#0F2976]">Encerrar Viagem</h2>
          <p className="mb-6 text-center text-gray-700">
            Tem certeza que deseja encerrar esta viagem? <br />
            <span className="font-semibold text-red-600">Esta ação é irreversível.</span>
          </p>
          <div className="flex gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Encerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>

      <RequireTripSelected>
        <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976] ">
          <SidebarMenu />

          <div className="flex flex-col items-center w-full bg-[#0F2976]">
            <img
              src="/images-home_page/logo-globix.png"
              className="ml-auto mr-5 mt-5"
            />

            <div className="absolute top-17 ml-5 items-center justify-center w-2/6 h-20 p-4 bg-[#1C4CDC]" />

            <div className="absolute top-15 items-center justify-center w-2/6 h-20 p-4 bg-white">
              <h1 className="text-4xl font-bold text-center text-[#0F2976] truncate">
                {trip?.nome}
              </h1>
            </div>

            {/* div branca */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-210 mt-25 mb-30">
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
                        usuarios={[...organizadores, ...convidados]}
                        onPromote={async (id) => {
                          console.log("Promovendo organizador:", trip?.id ?? 0, id);
                          await PromoverOuRebaixarOrganizador(trip?.id ?? 0, id);
                          setConvidados(
                            convidados.map((usuario) =>
                              usuario.id === id
                                ? { ...usuario, papel: "OrganizadorPromovido" }
                                : usuario
                            )
                          );
                          setOrganizadores(prev =>
                            prev.map(usuario =>
                              usuario.id === id
                                ? { ...usuario, papel: "organizadorpromovido" }
                                : usuario
                            )
                          );
                        }}
                        onRemove={async (id) => {
                          await PromoverOuRebaixarOrganizador(trip?.id ?? 0, id);

                          setConvidados(
                            convidados.map((usuario) =>
                              usuario.id === id
                                ? { ...usuario, papel: "Participante" }
                                : usuario
                            )
                          );
                          setOrganizadores(prev =>
                            prev.map(usuario =>
                              usuario.id === id
                                ? { ...usuario, papel: "participante" }
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
                            foto: s.foto ?? "/user.png",
                            papel: 1,
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
                        <p className="text-sm text-gray-500 mt-4">Mensagem</p>
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
                        <p className="text-sm text-gray-500 mt-4">Avisos</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between mt-5">
                  <button
                    className="text-2xl font-bold bg-[#D9D9D9] text-[#0F2976] rounded-full w-60 py-3 hover:bg-gray-300 cursor-pointer"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    Editar
                  </button>

                  {trip?.codigoConvite !== undefined && trip?.codigoConvite !== null && (
                    <div className="relative flex flex-col items-center">
                      <div className="flex items-center">
                        <button
                          className="flex items-center justify-center text-2xl font-bold bg-[#D9D9D9] text-[#0F2976] rounded-full px-6 py-3 hover:bg-gray-300 cursor-pointer transition"
                          onClick={() => {
                            navigator.clipboard.writeText(String(trip.codigoConvite));
                            setShowCopied(true);
                            setTimeout(() => setShowCopied(false), 1500);
                          }}
                          style={{ position: "relative" }}
                        >
                          Código da Viagem
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-3 text-[#0F2976]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" />
                            <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" />
                          </svg>
                        </button>
                      </div>
                      {showCopied && (
                        <span className="absolute top-full text-green-600 font-semibold bg-white px-3  rounded shadow">
                          Copiado com sucesso!
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    className="text-2xl font-bold bg-blue-900 text-white rounded-full w-60 py-3 hover:bg-blue-800 cursor-pointer"
                    onClick={() => setIsEndTripModalOpen(true)}
                  >
                    Encerrar Viagem
                  </button>
                  <ConfirmEndTripModal
                    open={isEndTripModalOpen}
                    onClose={() => setIsEndTripModalOpen(false)}
                    onConfirm={handleEndTrip}
                  />
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
      </RequireTripSelected>
    </RequireAuth>
  );
}
