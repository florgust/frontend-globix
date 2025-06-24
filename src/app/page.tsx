"use client"

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const usuario = Cookies.get("usuario");
    if (usuario) {
      router.replace("/home_page");
    } else {
      router.replace("/initial");
    }
  }, [router]);

  return null;
}