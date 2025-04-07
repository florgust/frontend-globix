"use client";

import React, { useState } from "react";
import Image from "next/image";
import Transporte from "../transporte/page"; // Importa o componente Transporte
import styles from "./styles.module.css";

export default function Detalhes() {
  const [modalContent, setModalContent] = useState("detalhes"); // Estado para controlar o conteúdo do modal
  const [isTransporteOpen, setIsTransporteOpen] = useState(false); // Estado para o modal "Transporte"

  return (
    <div className={styles.container}>
      {/* Modal */}
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          {/* Imagem para fechar o modal */}
          <Image
            src="/seta.svg"
            alt="Voltar"
            width={40}
            height={40}
            className={styles.backIcon}
            onClick={() => setModalContent("detalhes")} // Volta para o conteúdo "Mais Detalhes"
          />

          {/* Renderiza o conteúdo com base no estado */}
          {modalContent === "detalhes" && (
            <>
              {/* Título principal */}
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>Mais Detalhes</h1>
              </div>

              {/* Tabela de informações */}
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td className={styles.tableLabel}>Nome da Viagem</td>
                    <td className={styles.tableValue}>Viagem para Rifaina/SP</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Destino</td>
                    <td className={styles.tableValue}>Uberaba-MG → Rifaina/SP</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Data de Ida</td>
                    <td className={styles.tableValue}>25/03/2025 (19:30h)</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Data de Volta</td>
                    <td className={styles.tableValue}>30/03/2025 (12:00h)</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Status da Viagem</td>
                    <td className={styles.tableValue}>Em andamento</td>
                  </tr>
                </tbody>
              </table>

              {/* Botões de ação */}
              <div className={styles.actionButtons}>
                {[
                  { id: "transporte", icon: "/transporte.svg", label: "Transporte" },
                  { id: "hospedagem", icon: "/hospedagem.svg", label: "Hospedagem" },
                  { id: "itinerarios", icon: "/itinerarios.svg", label: "Itinerários" },
                  { id: "custos", icon: "/custos.svg", label: "Custos" },
                  { id: "alerta", icon: "/alerta.svg", label: "Alerta" },
                ].map((button, index) => (
                  <button
                    key={index}
                    onClick={() => setModalContent(button.id)} // Atualiza o conteúdo do modal
                    className={styles.actionButton}
                  >
                    <div className={styles.actionIcon}>
                      <Image
                        src={button.icon}
                        alt={button.label}
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className={styles.actionLabel}>{button.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Conteúdo do modal "Transporte" */}
          {modalContent === "transporte" && (
            <div>
              <Transporte /> {/* Renderiza o componente Transporte */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}