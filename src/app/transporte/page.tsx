"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Transporte() {
  const [activeModal, setActiveModal] = useState("transporte"); // Estado para controlar o conteúdo do modal

  // Estados para os campos de descrição
  const [detalhesDescricao, setDetalhesDescricao] = useState(
    "Detalhes:\nÔnibus: Daivid Turismo\nPlaca: ASF345\nAssento: T8"
  );
  const [lembreteDescricao, setLembreteDescricao] = useState(
    "Lembrete:\nTicket: 1654155261\nChegue 15 minutos antes"
  );

  return (
    <div className={styles.container}>
      {/* Modal */}
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          {/* Botão de Voltar */}
          <Image
            src="/seta.svg"
            alt="Voltar"
            width={40}
            height={40}
            className={styles.backIcon}
            onClick={() => setActiveModal("transporte")} // Volta para o conteúdo "Transporte"
          />

          {/* Renderiza o conteúdo com base no estado */}
          {activeModal === "transporte" && (
            <>
              {/* Título principal */}
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>Transporte</h1>
              </div>

              {/* Novo layout substituindo a tabela */}
              <div className={styles.infoContainer}>
                {/* Coluna 1: Detalhes */}
                <div className={styles.infoBox}>
                  <div className={styles.imageContainer}>
                    <Image
                      src="/icone-pag-transporte.svg"
                      alt="Ícone de Transporte"
                      width={80}
                      height={80}
                      className={styles.baseImage}
                    />
                    <Image
                      src="/onibus.svg"
                      alt="Ônibus"
                      width={40}
                      height={40}
                      className={styles.overlayImage}
                    />
                    <Image
                      src="/linha-branca.svg"
                      alt="Linha Branca"
                      width={60}
                      height={10}
                      className={styles.lineImage}
                    />
                  </div>
                  <textarea
                    className={styles.textArea}
                    value={detalhesDescricao}
                    onChange={(e) => setDetalhesDescricao(e.target.value)}
                  />
                </div>

                {/* Coluna 2: Lembrete */}
                <div className={styles.infoBox}>
                  <div className={styles.imageContainer}>
                    <Image
                      src="/icone-pag-transporte.svg"
                      alt="Ícone de Transporte"
                      width={80}
                      height={80}
                      className={styles.baseImage}
                    />
                    <Image
                      src="/lembrete.svg"
                      alt="Lembrete"
                      width={40}
                      height={40}
                      className={styles.overlayImage}
                    />
                  </div>
                  <textarea
                    className={styles.textArea}
                    value={lembreteDescricao}
                    onChange={(e) => setLembreteDescricao(e.target.value)}
                  />
                </div>
              </div>

              {/* Nova seção abaixo */}
              <div className={styles.routeContainer}>
                {/* Coluna 1 */}
                <div className={styles.routeColumn}>
                  <div className={styles.routeItem}>
                    <Image src="/origem-azul.svg" alt="Origem" width={24} height={24} />
                    <div>
                      <h3 className={styles.routeTitle}>Saída da Cidade Origem</h3>
                      <p>Posto Graal Antares | Uberaba - MG</p>
                      <p>25/03/25 - 19:30h</p>
                    </div>
                  </div>
                  <div className={styles.routeItem}>
                    <Image src="/destino-azul.svg" alt="Destino" width={24} height={24} />
                    <div>
                      <h3 className={styles.routeTitle}>Chegada na Cidade Destino</h3>
                      <p>Rua Rifaina | Rifaina - SP</p>
                      <p>25/03/25 - 22:00h</p>
                    </div>
                  </div>
                </div>

                {/* Coluna 2 */}
                <div className={styles.routeColumn}>
                  <div className={styles.routeItem}>
                    <Image src="/origem-verde.svg" alt="Destino" width={24} height={24} />
                    <div>
                      <h3 className={styles.routeTitle}>Saída da Cidade Destino</h3>
                      <p>Rua Rifaina | Rifaina - SP</p>
                      <p>30/03/25 - 12:00h</p>
                    </div>
                  </div>
                  <div className={styles.routeItem}>
                    <Image src="/destino-verde.svg" alt="Origem" width={24} height={24} />
                    <div>
                      <h3 className={styles.routeTitle}>Chegada na Cidade Origem</h3>
                      <p>Posto Graal Antares | Uberaba - MG</p>
                      <p>30/03/25 - 14:00h</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeModal === "detalhes" && (
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
            </>
          )}

          {/* Botões de ação */}
          <div className={styles.actionButtons}>
            {[
              { id: "detalhes", icon: "/detalhes.svg", label: "Mais Detalhes" },
              { id: "hospedagem", icon: "/hospedagem.svg", label: "Hospedagem" },
              { id: "itinerarios", icon: "/itinerarios.svg", label: "Itinerários" },
              { id: "custos", icon: "/custos.svg", label: "Custos" },
              { id: "alerta", icon: "/alerta.svg", label: "Alerta" },
            ].map((button, index) => (
              <button
                key={index}
                onClick={() => setActiveModal(button.id)} // Atualiza o conteúdo do modal
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
    </div>
  );
}