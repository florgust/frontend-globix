export type UserRole = "organizador" | "participante";

export interface Trip {
  id: number;
  nome: string;
  imagem: string;
  dataInicio: string;
  dataFim: string;
  cidade: string;
  organizador: string;
  transporte: string;
  papel: UserRole;
}
