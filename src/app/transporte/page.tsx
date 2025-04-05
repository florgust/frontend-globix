"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Transporte() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para os campos de descrição
  const [detalhesDescricao, setDetalhesDescricao] = useState(
    "Detalhes:\nÔnibus: Daivid Turismo\nPlaca: ASF345\nAssento: T8"
  );
  const [lembreteDescricao, setLembreteDescricao] = useState(
    "Lembrete:\nTicket: 1654155261\nChegue 15 minutos antes"
  );

  return (
    <div className={styles.container}>
      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.openModalButton}
      >
        Transporte
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

            <br />

            {/* Botões de ação */}
            <div className={styles.actionButtons}>
              {[
                { href: "/detalhes", icon: "/detalhes.svg", label: "Mais Detalhes" },
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