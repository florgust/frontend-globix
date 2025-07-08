import { useState, useEffect } from "react";
import { Trip } from "@/types/trip";

interface UseTripsProps {
  initialTrips: Trip[];
}

// Função para normalizar papel para filtro
function papelParaFiltro(papel: string) {
  if (!papel) return "";
  const papelLower = papel.toLowerCase();
  if (papelLower === "organizador" || papelLower === "organizadorpromovido") return "organizador";
  if (papelLower === "participante") return "participante";
  return papelLower;
}

export const useTrips = ({ initialTrips }: UseTripsProps) => {
  const [trips] = useState<Trip[]>(initialTrips);
  const [filtered, setFiltered] = useState<Trip[]>(initialTrips);
  const [sortOrder, setSortOrder] = useState("recentes");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    let result = [...trips];

    if (roleFilter) {
      result = result.filter((trip) => papelParaFiltro(trip.papel) === roleFilter);
    }

    if (sortOrder === "a-z") {
      result.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (sortOrder === "z-a") {
      result.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (sortOrder === "recentes") {
      // Ordena por data de início mais próxima do momento atual
      const now = new Date().getTime();
      result.sort((a, b) => {
        const dateA = new Date(a.dataInicio).getTime();
        const dateB = new Date(b.dataInicio).getTime();
        return Math.abs(dateA - now) - Math.abs(dateB - now);
      });
    }

    setFiltered(result);
  }, [trips, sortOrder, roleFilter]);

  return {
    trips,
    filtered,
    sortOrder,
    setSortOrder,
    roleFilter,
    setRoleFilter,
  };
};