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
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para pegar a data de criação da viagem formatada
export function getDataCriacao(trip: any): string {
    return formatDate(trip?.dataCriacao || trip?.data_criacao);
}

// Função para pegar a quantidade de participantes
export function getQuantidadeParticipante(trip: any, convidados: any[]): number {
    return trip?.quantidadeParticipante ?? trip?.quantidade_participante ?? convidados.length;
}

// Função para mapear qualquer objeto de viagem para ModalMoreDetailsTrip
export function mapToModalMoreDetailsTrip(
    tripObj: any,
    organizadores: { nome?: string; foto?: string }[] = [],
    convidados: any[] = []
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