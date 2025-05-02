"use client";

import { useEffect, useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Header from "@/components/ui/header";
import TripList from "@/components/ui/TripList";
import Filters from "@/components/ui/Filters";
import { Trip } from "@/types/trip";

const Page = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filtered, setFiltered] = useState<Trip[]>([]);
  const [sortOrder, setSortOrder] = useState("recentes");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const data: Trip[] = [
      {
        id: 1,
        nome: "Viagem Rifaina",
        imagem: "/images-my_trips/rifaina.png",
        dataInicio: "2025-06-01",
        dataFim: "2025-06-05",
        cidade: "Rifaina",
        organizador: "João Silva",
        transporte: "Ônibus",
        papel: "organizador",
      },
      {
        id: 2,
        nome: "Viagem Campos do Jordão",
        imagem: "/images-my_trips/londres.png",
        dataInicio: "2025-04-17",
        dataFim: "2025-04-25",
        cidade: "Campos do Jordão",
        organizador: "Maria Oliveira",
        transporte: "Van",
        papel: "participante",
      },
      {
        id: 3,
        nome: "Viagem Rio de Janeiro",
        imagem: "/images-my_trips/rj.png",
        dataInicio: "2025-08-20",
        dataFim: "2025-08-25",
        cidade: "Rio de Janeiro",
        organizador: "Carlos Souza",
        transporte: "Carro",
        papel: "organizador",
      },
      {
        id: 4,
        nome: "Caldas Novas",
        imagem: "/images-my_trips/caldas.png",
        dataInicio: "2025-09-15",
        dataFim: "2025-09-20",
        cidade: "Caldas Novas",
        organizador: "Ana Paula",
        transporte: "Avião",
        papel: "participante",
      },
    ];
    setTrips(data);
  }, []);

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

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <div className="flex flex-col w-full bg-gradient-to-b from-[#1C4CDC] to-[#0F2976]">
        {/* Header */}
        <Header />

        {/* Title and Filters */}
        <div className="flex justify-between items-center px-17 mt-4">
          <h1 className="font-bold text-4xl text-white">Lista de Minhas Viagens</h1>
          <Filters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        </div>
        <hr className="mt-2 mb-6 w-[92%] border-t-2 border-[#092064] mx-auto" />

        {/* Trip List */}
        <div className="px-60 h-[calc(100vh-250px)] overflow-y-auto scrollbar-thin">
          <TripList trips={filtered} />
        </div>
      </div>
    </div>
  );
};

export default Page;