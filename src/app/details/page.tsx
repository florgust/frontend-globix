"use client";
import React from "react";
import DetailsModal from "../components/DetailsModal";

const DetailsPage = () => {
  const details = [
    { label: "Nome da Viagem", value: "Viagem para Rifaina/SP" },
    { label: "Destino", value: "Uberaba-MG → Rifaina/SP" },
    { label: "Data de Ida", value: "25/03/2025 (19:30h)" },
    { label: "Data de Volta", value: "30/03/2025 (12:00h)" },
    { label: "Status da Viagem", value: "Em andamento" },
  ];

  const actions = [
    { icon: "/details/transporte.svg", label: "Transporte", onClick: () => alert("Transporte clicado") },
    { icon: "/details/hospedagem.svg", label: "Hospedagem", onClick: () => alert("Hospedagem clicada") },
    { icon: "/details/itinerarios.svg", label: "Itinerários", onClick: () => alert("Itinerários clicados") },
    { icon: "/details/custos.svg", label: "Custos", onClick: () => alert("Custos clicados") },
    { icon: "/details/alerta.svg", label: "Alerta", onClick: () => alert("Alerta clicado") },
  ];

  return (
    <DetailsModal
      title="Mais Detalhes"
      details={details}
      actions={actions}
      onClose={() => (window.location.href = "/travel")}
    />
  );
};

export default DetailsPage;