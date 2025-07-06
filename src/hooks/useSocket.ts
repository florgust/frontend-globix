// src/hooks/useSocket.ts
import { useEffect } from "react";
import { io } from "socket.io-client";

export function useSocket(userId: number) {
  useEffect(() => {
    const socket = io("https://globix-afaea8fe15ce.herokuapp.com"); // ajuste sua URL

    socket.on("connect", () => {
      console.log("🔌 Socket conectado:", socket.id);

      // 🔑 Entra na sala do userId
      socket.emit("join", String(userId));
    });

    socket.on("nova-notificacao", (data) => {
      console.log("📣 Nova notificação recebida:", data);
      // Aqui você pode chamar um toast, atualizar estado global etc.
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket desconectado");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
}