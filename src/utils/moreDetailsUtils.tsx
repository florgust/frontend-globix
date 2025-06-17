export interface ModalMoreDetailsTrip {
    nome: string;
    descricao: string;
    destino: string;
    dataInicio: string;
    dataFim: string;
    tipo: string;
    quantidadeParticipante: number;
    organizador: string;
    dataCriacao: string;
    imagemOrganizador?: string;
}

// Tipo para os dados crus da viagem vindos do backend
export interface RawTrip {
    nome: string;
    descricao?: string;
    data_inicio?: string;
    dataInicio?: string;
    data_fim?: string;
    dataFim?: string;
    tipo?: string;
    quantidadeParticipante?: number;
    quantidade_participante?: number;
    dataCriacao?: string;
    data_criacao?: string;
    // Outros campos que possam vir do backend...
}

// Função utilitária para extrair destino
export function extractDestino(nomeViagem: string): string {
    if (!nomeViagem) return "";
    const match = nomeViagem.match(/para\s+(.+)/i);
    if (match) return match[1].trim();
    return nomeViagem.replace(/^viagem\s*/i, "").trim();
}

// Função para formatar datas do backend para dd/MM/yyyy
export function formatDate(dateStr?: string): string {
    if (!dateStr) return "";
    let date: Date;
    // Se vier só a data (yyyy-mm-dd), cria como local
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split("-").map(Number);
        date = new Date(year, month - 1, day);
    } else {
        date = new Date(dateStr);
    }
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para pegar a data de criação da viagem formatada
export function getDataCriacao(trip: RawTrip): string {
    return formatDate(trip.dataCriacao || trip.data_criacao);
}

// Função para pegar a quantidade de participantes
export function getQuantidadeParticipante(trip: RawTrip, convidados: { id: number }[]): number {
    return trip.quantidadeParticipante ?? trip.quantidade_participante ?? convidados.length;
}

// Função para mapear qualquer objeto de viagem para ModalMoreDetailsTrip
export function mapToModalMoreDetailsTrip(
    tripObj: RawTrip,
    organizadores: { nome?: string; foto?: string }[] = [],
    convidados: { id: number }[] = []
): ModalMoreDetailsTrip {
    const organizador = organizadores[0];
    const tipo =
        (tripObj.tipo
            ? tripObj.tipo.charAt(0).toUpperCase() + tripObj.tipo.slice(1).toLowerCase()
            : "Pública");
    return {
        nome: tripObj.nome,
        descricao: tripObj.descricao || "",
        destino: extractDestino(tripObj.nome),
        dataInicio: formatDate(tripObj.data_inicio || tripObj.dataInicio),
        dataFim: formatDate(tripObj.data_fim || tripObj.dataFim),
        tipo,
        quantidadeParticipante: getQuantidadeParticipante(tripObj, convidados),
        organizador: organizador?.nome || "",
        dataCriacao: getDataCriacao(tripObj),
        imagemOrganizador: organizador?.foto || "/images-profile/mauro.svg",
    };
}