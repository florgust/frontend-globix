"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function ViagemRifaina() {
  const [activeTab, setActiveTab] = useState("Convidados"); // Estado para alternar entre as abas

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <h1 className={styles.title}>Viagem Rifaina</h1>
      </header>

      {/* Imagem da Praia */}
      <div className={styles.imageContainer}>
        <Image
          src="/praia.jpg"
          alt="Praia"
          width={1200}
          height={400}
          className={styles.praiaImage}
        />
        <div className={styles.imageLabelContainer}>
          <Image
            src="/praia-icon.svg" /* Ícone representando praia */
            alt="Ícone de Praia"
            width={24}
            height={24}
            className={styles.imageIcon}
          />
          <span className={styles.imageLabel}>Praia</span>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.mainContent}>
        {/* Organizadores */}
        <div className={styles.organizers}>
          <h2 className={styles.sectionTitle}>Organizadores</h2>
          <div className={styles.organizerList}>
            <div className={styles.organizerItem}>
              <Image
                src="/organizador1.jpg"
                alt="Mauro Borges"
                width={60}
                height={60}
                className={styles.organizerImage}
              />
              <p>Mauro Borges</p>
            </div>
            <div className={styles.addOrganizer}>
              <div className={styles.addIcon}>+</div>
              <p>Adicionar Organizador</p>
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
                    src="/convidado1.jpg"
                    alt="Luan Glor Fustavo"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Luan Glor Fustavo</p>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/convidado2.jpg"
                    alt="Arthur Ramos da Silva"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Arthur Ramos da Silva</p>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/convidado3.jpg"
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
                    src="/solicitacao1.jpg"
                    alt="Solicitação 1"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Solicitação 1</p>
                </div>
                <div className={styles.guestItem}>
                  <Image
                    src="/solicitacao2.jpg"
                    alt="Solicitação 2"
                    width={40}
                    height={40}
                    className={styles.guestImage}
                  />
                  <p>Solicitação 2</p>
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
              <Link href="/detalhes">
                <div className={styles.infoBackground}>
                  <Image
                    src="/detalhes.svg"
                    alt="Mais Detalhes"
                    width={50}
                    height={50}
                  />
                </div>
                <p>Mais Detalhes</p>
              </Link>
            </div>
            <div className={styles.infoItem}>
              <Link href="/transporte">
                <div className={styles.infoBackground}>
                  <Image
                    src="/transporte.svg"
                    alt="Transporte"
                    width={50}
                    height={50}
                  />
                </div>
                <p>Transporte</p>
              </Link>
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
      </div>

      {/* Botão Editar */}
      <div className={styles.editButtonContainer}>
        <button className={styles.editButton}>Editar</button>
      </div>
    </div>
  );
}