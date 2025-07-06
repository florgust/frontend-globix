"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import api from "@/utils/axios";

interface Notification {
  id: number;
  mensagem: string;
  read: boolean;
  dataCriacao: string;
}

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const usuarioCookie = Cookies.get("usuario");
  const userId = usuarioCookie ? JSON.parse(usuarioCookie).id : null;

  useEffect(() => {
    if (!userId) return;
    api
      .get<Notification[]>(`/notificacoes/last/${userId}`)
      .then(({ data }) => setNotifications(data))
      .catch((err) => console.error("Erro ao carregar notificações:", err));
  }, [userId]);

  const lastNotifications = notifications; // já vem limitado a 3 pelo back

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg px-6 py-3 w-[85.5%] h-[19vh] flex flex-col">
      <h2 className="text-[#0F2976] text-2xl font-bold mb-2">
        Notificações Recentes
      </h2>
      {lastNotifications.length > 0 ? (
        <ul className="text-[#333] text-2sm space-y-1 overflow-y-auto">
          {lastNotifications.map((notif) => (
            <li key={notif.id} className="flex items-center gap-2 py-1">
              <Image
                src="/images-home_page/icons/GreenElipse.png"
                alt="Notificação"
                width={8}
                height={8}
              />
              <span>{notif.mensagem}</span>
              {!notif.read && (
                <span className="text-xs text-gray-400 italic ml-auto">
                  nova mensagem
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-sm mt-2">
          Nenhuma notificação recente.
        </div>
      )}
    </div>
  );
}