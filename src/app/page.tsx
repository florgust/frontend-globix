import { redirect } from "next/navigation";

export default function Home() {
  redirect("/initial");
  return null;
}