"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("usuario"); 
    if (!token) {
      router.replace("/not-authenticated");
    }
  }, [router]);

  return <>{children}</>;
}