import { useEffect } from "react";
import { io } from "socket.io-client";

interface NovaNotificacao {
  id: number;
  mensagem: string;
  viagemId?: number;
  tipo: string;
  dataCriacao: string;
}

export function useSocket(
  userId: number,
  onNotification: (data: NovaNotificacao) => void
) {
  useEffect(() => {
    const socket = io('https://globix-afaea8fe15ce.herokuapp.com/');

    socket.on("connect", () => {
      console.log("🔌 Socket conectado:", socket.id);
      socket.emit("join", String(userId));
    });

    socket.on("nova-notificacao", (data) => {
      console.log("📣 Nova notificação recebida:", data);
      onNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNotification]);
}