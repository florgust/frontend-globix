"use client";

import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./sidebar";
import { House, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ModalLogout from "./modals/ModalLogout";

const minhasViagens = "/images-home_page/sidebar-menu/my-travels.svg";
const user = "/images-home_page/sidebar-menu/user.svg";
const message = "/images-home_page/sidebar-menu/message.svg";
const setting = "/images-home_page/sidebar-menu/setting.svg";
const about = "/images-home_page/sidebar-menu/about.svg";
const community = "/images-home_page/sidebar-menu/comunity.svg";

const menuItems = [
  { icon: (active: boolean) => <House size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Página Principal", path: "/home_page" },
  {
    icon: (active: boolean) => (
      <Image
        src={minhasViagens}
        alt="Minhas Viagens"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Minhas Viagens", path: "/my_trips"
  },
  {
    icon: (active: boolean) => (
      <Image
        src={community}
        alt="Comunidade"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Comunidade", path: "/comunidade"
  },
  {
    icon: (active: boolean) => (
      <Image
        src={user}
        alt="Perfil"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Perfil", path: "/profile"
  },
  {
    icon: (active: boolean) => (
      <Image
        src={message}
        alt="Mensagens"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Mensagens", path: "/mensagens"
  },
  {
    icon: (active: boolean) => (
      <Image
        src={setting}
        alt="Configurações"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Configurações", path: "/configuracoes", spacer: true
  },
  {
    icon: (active: boolean) => (
      <Image
        src={about}
        alt="Sobre"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Sobre", path: "/sobre"
  },
  { icon: (active: boolean) => <LogOut size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Sair", path: "/logout", isLogout: true },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  // Função para limpar todos os cookies
  function clearAllCookies() {
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  }

  function handleLogout() {
    clearAllCookies();
    setShowLogout(false);
    router.replace("/initial");
  }

  return (
    <>
      <Sidebar>
        {menuItems.map((item) => {
          const active = pathname === item.path;
          const key = item.path || item.text; // Usa path como chave única

          if (item.isLogout) {
            return (
              <React.Fragment key={key}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLogout(true);
                  }}
                  style={{ cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}
                  tabIndex={0}
                  aria-label="Sair"
                >
                  <SidebarItem
                    icon={item.icon(active)}
                    text={item.text}
                    alert={false}
                    active={active}
                    href="#"
                  />
                </button>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={key}>
              <SidebarItem
                icon={item.icon(active)}
                text={item.text}
                alert={false}
                active={active}
                href={item.path}
              />
              {item.spacer && <div className="my-20" />}
            </React.Fragment>
          );
        })}
      </Sidebar>
      <ModalLogout
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onLogout={handleLogout}
      />
    </>
  );
}