"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Location() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.openModalButton}
      >
        Mais detalhes
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Botão de Voltar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.backButton}
            >
              <Image
                src="/seta.svg"
                alt="Voltar"
                width={40}
                height={40}
                className={styles.backIcon}
              />
            </button>

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
                { href: "/transporte", icon: "/transporte.svg", label: "Transporte" },
                { href: "/hospedagem", icon: "/hospedagem.svg", label: "Hospedagem" },
                { href: "/itinerarios", icon: "/itinerarios.svg", label: "Itinerários" },
                { href: "/custos", icon: "/custos.svg", label: "Custos" },
                { href: "/alerta", icon: "/alerta.svg", label: "Alerta" },
              ].map((button, index) => (
                <button
                  key={index}
                  onClick={() => (window.location.href = button.href)}
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
          </div>
        </div>
      )}
    </div>
  );
}