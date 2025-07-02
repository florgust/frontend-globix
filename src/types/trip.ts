export type UserRole = "organizador" | "participante";

export interface Trip {
  id: number;
  nome: string;
  imagem: string;
  dataInicio: string;
  dataFim: string;
  organizador: string;
  transporte: string;
  codigoConvite: number;
  papel: UserRole;
  status: number;
}
