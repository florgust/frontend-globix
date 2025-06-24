"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RequireTripSelected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const selectedTripStr = localStorage.getItem("selectedTrip");
    if (!selectedTripStr) {
      router.replace("/not_trip_page");
      return;
    }
    const selectedTrip = JSON.parse(selectedTripStr);
    // Ajuste conforme o campo do backend: tipo, papel, etc
    const papel = selectedTrip.papel || selectedTrip.tipo || selectedTrip.role || "";

    // Se está em /trip e é organizador, redireciona para /travels
    if (pathname === "/trip" && ["organizador", "organizadorpromovido"].includes(papel.toLowerCase())) {
      router.replace("/travels");
      return;
    }
    // Se está em /travels e NÃO é organizador, redireciona para /trip
    if (pathname === "/travels" && !["organizador", "organizadorpromovido"].includes(papel.toLowerCase())) {
      router.replace("/trip");
      return;
    }
  }, [router, pathname]);

  return <>{children}</>;
}