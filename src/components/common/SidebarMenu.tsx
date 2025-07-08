"use client";

import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { House, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ModalLogout from "../ui/modals/ModalLogout";

const user = "/images-home_page/sidebar-menu/user.svg";
const about = "/images-home_page/sidebar-menu/about.svg";
const community = "/images-home_page/sidebar-menu/comunity.svg";

// Adicione spacer: true ao item "Perfil"
const menuItems = [
  { icon: (active: boolean) => <House size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Página Principal", path: "/home_page" },
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
    ), text: "Comunidade", path: "/community"
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
    ), text: "Perfil", path: "/profile", spacer: true // <-- Aqui!
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
    ), text: "Sobre", path: "/about"
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
              {item.spacer ? <div className="my-20" /> : null}
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