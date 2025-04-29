import React from "react";
import Sidebar, { SidebarItem } from "./sidebar";
import { House, LogOut } from "lucide-react";
// import { useRouter } from "next/router";

const minhasViagens = "/images-home_page/sidebar-menu/my-travels.svg";
const user = "/images-home_page/sidebar-menu/user.svg";
const message = "/images-home_page/sidebar-menu/message.svg";
const setting = "/images-home_page/sidebar-menu/setting.svg";
const about = "/images-home_page/sidebar-menu/about.svg";
const community = "/images-home_page/sidebar-menu/comunity.svg";

const menuItems = [
    { icon: <House size={20} />, text: "Página Principal", active: true },
    { icon: <img src={minhasViagens} alt="Minhas Viagens" className="h-6 w-6" />, text: "Minhas Viagens", active: false },
    { icon: <img src={community} alt="Comunidade" className="h-6 w-6" />, text: "Comunidade", active: false },
    { icon: <img src={user} alt="Perfil" className="h-6 w-6" />, text: "Perfil", active: false },
    { icon: <img src={message} alt="Mensagens" className="h-6 w-6" />, text: "Mensagens", active: false },
    { icon: <img src={setting} alt="Configurações" className="h-6 w-6" />, text: "Configurações", active: false, spacer: true }, // Adiciona espaçamento após este item
    { icon: <img src={about} alt="Sobre" className="h-6 w-6" />, text: "Sobre", active: false },
    { icon: <LogOut size={20} />, text: "Sair", active: false },
  ];

export default function SidebarMenu() {
    // const router = useRouter(); // Hook para obter a rota atual

  return (
    <Sidebar>
      {menuItems.map((item, index) => (
         <React.Fragment key={index}>
         <SidebarItem
           icon={item.icon}
           text={item.text}
           alert={false}
           active={item.active}
        //   active={router.pathname === item.path} // Verifica se a rota atual corresponde ao item
        />
       {item.spacer && <div className="my-20" />}
        </React.Fragment>
      ))}
    </Sidebar>
  );
}