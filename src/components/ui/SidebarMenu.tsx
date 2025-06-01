"use client";

import React from "react";
import Sidebar, { SidebarItem } from "./sidebar";
import { House, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const minhasViagens = "/images-home_page/sidebar-menu/my-travels.svg";
const user = "/images-home_page/sidebar-menu/user.svg";
const message = "/images-home_page/sidebar-menu/message.svg";
const setting = "/images-home_page/sidebar-menu/setting.svg";
const about = "/images-home_page/sidebar-menu/about.svg";
const community = "/images-home_page/sidebar-menu/comunity.svg";

const menuItems = [
  { icon: (active: boolean) => <House size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Página Principal", path: "/home_page" },
  { icon: (active: boolean) => (
      <Image
        src={minhasViagens}
        alt="Minhas Viagens"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Minhas Viagens", path: "/my_trips" },
  { icon: (active: boolean) => (
      <Image
        src={community}
        alt="Comunidade"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Comunidade", path: "/comunidade" },
  { icon: (active: boolean) => (
      <Image
        src={user}
        alt="Perfil"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Perfil", path: "/profile" },
  { icon: (active: boolean) => (
      <Image
        src={message}
        alt="Mensagens"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Mensagens", path: "/mensagens" },
  { icon: (active: boolean) => (
      <Image
        src={setting}
        alt="Configurações"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Configurações", path: "/configuracoes", spacer: true },
  { icon: (active: boolean) => (
      <Image
        src={about}
        alt="Sobre"
        width={24}
        height={24}
        className={`${active ? "" : "grayscale opacity-40"}`}
        priority
      />
    ), text: "Sobre", path: "/sobre" },
  { icon: (active: boolean) => <LogOut size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Sair", path: "/logout" },
];

export default function SidebarMenu() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {menuItems.map((item, index) => {
        const active = pathname === item.path;
        return (
          <React.Fragment key={index}>
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
  );
}