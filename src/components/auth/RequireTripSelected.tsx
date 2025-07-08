"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function RequireTripSelected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const selectedTripStr = localStorage.getItem("selectedTrip");
    if (!selectedTripStr) {
      router.replace("/not_trip_page");
      return;
    }
    try {
      const selectedTrip = JSON.parse(selectedTripStr);

      // Pegar o papel do usuário do cookie, não da viagem
      const usuarioCookie = Cookies.get("usuario");
      if (!usuarioCookie) {
        router.replace("/not_authenticated");
        return;
      }

      const usuario = JSON.parse(usuarioCookie);

      // Verificar se o usuário é criador da viagem ou organizador
      const isOrganizador =
        selectedTrip.criadorId === usuario.id ||
        usuario.papel === "organizador" ||
        usuario.papel === "organizadorpromovido";

      // Se está em /trip e é organizador, redireciona para /travels
      if (pathname === "/trip" && isOrganizador) {
        router.replace("/travels");
        return;
      }

      // Se está em /travels e NÃO é organizador, redireciona para /trip
      if (pathname === "/travels" && !isOrganizador) {
        router.replace("/trip");
        return;
      }
    } catch (error) {
      console.error("Erro ao validar viagem selecionada:", error);
      router.replace("/not_trip_page");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
