"use client";

import React from "react";
import Sidebar, { SidebarItem } from "./sidebar";
import { House, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const minhasViagens = "/images-home_page/sidebar-menu/my-travels.svg";
const user = "/images-home_page/sidebar-menu/user.svg";
const message = "/images-home_page/sidebar-menu/message.svg";
const setting = "/images-home_page/sidebar-menu/setting.svg";
const about = "/images-home_page/sidebar-menu/about.svg";
const community = "/images-home_page/sidebar-menu/comunity.svg";

const menuItems = [
  { icon: (active: boolean) => <House size={20} color={active ? "#0F2976" : "#D1D5DB"} />, text: "Página Principal", path: "/home" },
  { icon: (active: boolean) => <img src={minhasViagens} alt="Minhas Viagens" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Minhas Viagens", path: "/my_trips" },
  { icon: (active: boolean) => <img src={community} alt="Comunidade" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Comunidade", path: "/comunidade" },
  { icon: (active: boolean) => <img src={user} alt="Perfil" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Perfil", path: "/profile" },
  { icon: (active: boolean) => <img src={message} alt="Mensagens" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Mensagens", path: "/mensagens" },
  { icon: (active: boolean) => <img src={setting} alt="Configurações" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Configurações", path: "/configuracoes", spacer: true },
  { icon: (active: boolean) => <img src={about} alt="Sobre" className={`h-6 w-6 ${active ? "" : "grayscale opacity-40"}`} />, text: "Sobre", path: "/sobre" },
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