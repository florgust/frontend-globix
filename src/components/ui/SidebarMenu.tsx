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
  { icon: <House size={20} />, text: "Página Principal", path: "/home_page" },
  { icon: <img src={minhasViagens} alt="Minhas Viagens" className="h-6 w-6" />, text: "Minhas Viagens", path: "/my_trips" },
  { icon: <img src={community} alt="Comunidade" className="h-6 w-6" />, text: "Comunidade", path: "/comunidade" },
  { icon: <img src={user} alt="Perfil" className="h-6 w-6" />, text: "Perfil", path: "/perfil" },
  { icon: <img src={message} alt="Mensagens" className="h-6 w-6" />, text: "Mensagens", path: "/mensagens" },
  { icon: <img src={setting} alt="Configurações" className="h-6 w-6" />, text: "Configurações", path: "/configuracoes", spacer: true },
  { icon: <img src={about} alt="Sobre" className="h-6 w-6" />, text: "Sobre", path: "/sobre" },
  { icon: <LogOut size={20} />, text: "Sair", path: "/logout" },
];

export default function SidebarMenu() {
  const pathname = usePathname(); // Obtém a rota atual

  return (
    <Sidebar>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <SidebarItem
            icon={item.icon}
            text={item.text}
            alert={false}
            active={pathname === item.path} // Marca como ativo se a rota atual corresponder
            href={item.path} // Passa o caminho para o SidebarItem
          />
          {item.spacer && <div className="my-20" />}
        </React.Fragment>
      ))}
    </Sidebar>
  );
}