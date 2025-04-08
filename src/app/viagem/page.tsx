"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Detalhes from "../detalhes/page"; // Importa o componente Detalhes
import Transporte from "../transporte/page"; // Importa o componente Transporte
import styles from "./styles.module.css";

export default function Viagem() {
  const [activeTab, setActiveTab] = useState("Convidados"); // Estado para alternar entre as abas
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false); // Estado para o modal "Mais Detalhes"
  const [isTransporteOpen, setIsTransporteOpen] = useState(false); // Estado para o modal "Transporte"

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <h1 className={`${styles.title} ${styles.sectionTitle}`}>Viagem Rifaina</h1>
      </header>

      {/* Conteúdo Principal */}
      <div className={styles.mainContent}>
        {/* Organizadores */}
        <div className={styles.organizers}>
          <h2 className={styles.sectionTitle}>Organizadores</h2>
          <div className={styles.organizerList}>
            <div className={styles.organizerItem}>
              <Image
                src="/images/usuario.svg"
                alt="Mauro Borges"
                width={60}
                height={60}
                className={styles.organizerImage}
              />
              <p>Mauro Borges</p>
            </div>
            <div className={styles.addOrganizer}>
              <button className={styles.addOrganizerButton}>
                <div className={styles.addIcon}>+</div>
                <p>Adicionar Organizador</p>
              </button>
            </div>
          </div>
        </div>

        {/* Convidados e Solicitações */}
        <div className={styles.guests}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "Convidados" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Convidados")}
            >
              Convidados
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "Solicitações" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Solicitações")}
            >
              Solicitações
            </button>
          </div>
          <div className={styles.guestList}>
            {activeTab === "Convidados" && (
              <>
                <div className={styles.guestItem}>
                  <Image
                    src="/images/usuario.svg"
                    alt="Luan Glor Fustavo"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Luan Glor Fustavo</p>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/images/usuario.svg"
                    alt="Arthur Ramos da Silva"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Arthur Ramos da Silva</p>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/images/usuario.svg"
                    alt="Bárbara Cabo"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Bárbara Cabo</p>
                </div>
              </>
            )}
            {activeTab === "Solicitações" && (
              <>
                <div className={styles.guestItem}>
                  <Image
                    src="/images/usuario.svg"
                    alt="Solicitação 1"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Solicitação 1</p>
                  <div className={styles.actionButtons}>
                    <Image
                      src="/botao_aceitar.svg"
                      alt="Aceitar"
                      width={30}
                      height={30}
                      className={styles.actionButton}
                    />
                    <Image
                      src="/botao_negar.svg"
                      alt="Negar"
                      width={30}
                      height={30}
                      className={styles.actionButton}
                    />
                  </div>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/images/usuario.svg"
                    alt="Solicitação 2"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Solicitação 2</p>
                  <div className={styles.actionButtons}>
                    <Image
                      src="/botao_aceitar.svg"
                      alt="Aceitar"
                      width={30}
                      height={30}
                      className={styles.actionButton}
                    />
                    <Image
                      src="/botao_negar.svg"
                      alt="Negar"
                      width={30}
                      height={30}
                      className={styles.actionButton}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Informações */}
        <div className={styles.information}>
          <h2 className={styles.sectionTitle}>Informações</h2>
          <div className={styles.infoIcons}>
            <div className={styles.infoItem}>
              <div
                className={styles.infoBackground}
                onClick={() => setIsDetalhesOpen(true)} // Abre o modal ao clicar no ícone
              >
                <Image
                  src="/detalhes.svg"
                  alt="Mais Detalhes"
                  width={50}
                  height={50}
                />
              </div>
              <p>Mais Detalhes</p>
            </div>
            <div className={styles.infoItem}>
              <div
                className={styles.infoBackground}
                onClick={() => setIsTransporteOpen(true)} // Abre o modal "Transporte"
              >
                <Image
                  src="/transporte.svg"
                  alt="Transporte"
                  width={50}
                  height={50}
                />
              </div>
              <p>Transporte</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoBackground}>
                <Image
                  src="/hospedagem.svg"
                  alt="Hospedagem"
                  width={50}
                  height={50}
                />
              </div>
              <p>Hospedagem</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoBackground}>
                <Image
                  src="/itinerarios.svg"
                  alt="Itinerários"
                  width={50}
                  height={50}
                />
              </div>
              <p>Itinerários</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoBackground}>
                <Image
                  src="/custos.svg"
                  alt="Custos"
                  width={50}
                  height={50}
                />
              </div>    
              <p>Custos</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoBackground}>
                <Image
                  src="/alerta.svg"
                  alt="Alerta"
                  width={50}
                  height={50}
                />
              </div>
              <p>Alerta</p>
            </div>
          </div>
        </div>

        {/* Botão Editar */}
        <div className={styles.editButtonContainer}>
          <button className={styles.editButton}>Editar</button>
        </div>
      </div>

      {/* Modal "Mais Detalhes" */}
      {isDetalhesOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsDetalhesOpen(false)}>
          <Detalhes />
        </div>
      )}

      {/* Modal "Transporte" */}
      {isTransporteOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsTransporteOpen(false)}>
          <Transporte />
        </div>
      )}
    </div>
  );
}