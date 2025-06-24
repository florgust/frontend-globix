"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // ou decodifique o token JWT para pegar a role
    if (!token) {
      router.replace("/not_authenticated");
    } else if (role !== "admin") {
      router.replace("/not_authorized");
    }
  }, [router]);

  return <>{children}</>;
}