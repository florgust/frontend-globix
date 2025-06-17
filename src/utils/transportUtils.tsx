export interface TransportLocation {
    tipoTransporte: string;
    descricao: string;
    ida: {
        dataSaida: string;
        localSaida: string;
        dataChegada: string;
        localChegada: string;
    };
    volta: {
        dataSaida: string;
        localSaida: string;
        dataChegada: string;
        localChegada: string;
    };
}

// Tipos crus vindos do backend
export interface RawTransporte {
    tipoTransporte?: string;
    tipo_transporte?: string;
    descricao?: string;
}

export interface RawLocalizacao {
    idaDataPartida?: string;
    ida_data_partida?: string;
    idaEnderecoPartida?: string;
    ida_endereco_partida?: string;
    idaDataChegada?: string;
    ida_data_chegada?: string;
    idaEnderecoChegada?: string;
    ida_endereco_chegada?: string;
    voltaDataPartida?: string;
    volta_data_partida?: string;
    voltaEnderecoPartida?: string;
    volta_endereco_partida?: string;
    voltaDataChegada?: string;
    volta_data_chegada?: string;
    voltaEnderecoChegada?: string;
    volta_endereco_chegada?: string;
}

export function formatDateTime(dateStr?: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hour = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} às ${hour}:${min}h`;
}

export function mapToTransportLocation(
    transporte: RawTransporte | RawTransporte[],
    localizacao: RawLocalizacao | RawLocalizacao[]
): TransportLocation {
    const t = Array.isArray(transporte) ? transporte[0] : transporte;
    const l = Array.isArray(localizacao) ? localizacao[0] : localizacao;

    // Capitaliza a primeira letra do tipoTransporte
    const tipoTransporteRaw = t?.tipoTransporte || t?.tipo_transporte || "Não informado";
    const tipoTransporte = tipoTransporteRaw.charAt(0).toUpperCase() + tipoTransporteRaw.slice(1).toLowerCase();

    return {
        tipoTransporte,
        descricao: t?.descricao || "",
        ida: {
            dataSaida: formatDateTime(l?.idaDataPartida || l?.ida_data_partida),
            localSaida: l?.idaEnderecoPartida || l?.ida_endereco_partida || "",
            dataChegada: formatDateTime(l?.idaDataChegada || l?.ida_data_chegada),
            localChegada: l?.idaEnderecoChegada || l?.ida_endereco_chegada || "",
        },
        volta: {
            dataSaida: formatDateTime(l?.voltaDataPartida || l?.volta_data_partida),
            localSaida: l?.voltaEnderecoPartida || l?.volta_endereco_partida || "",
            dataChegada: formatDateTime(l?.voltaDataChegada || l?.volta_data_chegada),
            localChegada: l?.voltaEnderecoChegada || l?.volta_endereco_chegada || "",
        },
    };
}