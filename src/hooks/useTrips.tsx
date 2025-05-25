import { useState, useEffect } from "react";
import { Trip } from "@/types/trip";

interface UseTripsProps {
  initialTrips: Trip[];
}

export const useTrips = ({ initialTrips }: UseTripsProps) => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [filtered, setFiltered] = useState<Trip[]>(initialTrips);
  const [sortOrder, setSortOrder] = useState("recentes");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    let result = [...trips];

    if (roleFilter) {
      result = result.filter((trip) => trip.papel === roleFilter);
    }

    if (sortOrder === "a-z") {
      result.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (sortOrder === "z-a") {
      result.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (sortOrder === "recentes") {
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