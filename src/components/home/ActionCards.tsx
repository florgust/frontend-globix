import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ActionCards() {
  const router = useRouter();

  return (
    <div className="flex gap-22">
      {/* Criar Viagem */}
      <button
        className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
        style={{
          background: "linear-gradient(270deg, #366EDB 0%, #36B6CF 89.42%)"
        }}
        onClick={() => router.push("/create_trip")}
      >
        <span className="flex items-center justify-center bg-white rounded-full w-14 h-14 ml-4">
          <Image
            src="/images-home_page/icons/BlueBagIcon.png"
            alt="Criar Viagem"
            width={32}
            height={32}
          />
        </span>
        <span className="text-white font-semibold text-lg">Criar Viagem</span>
      </button>

      {/* Participar de Viagem */}
      <button
        className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
        style={{
          background: "linear-gradient(90deg, #3579D9 0%, #6CB9B0 50.48%, #A7FF84 100%)"
        }}
      // futuramente: onClick={() => router.push("/participar_viagem")}
      >
        <span className="flex items-center justify-center bg-white rounded-full w-14 h-14 ml-4">
          <Image
            src="/images-home_page/icons/BlueAddIcon.png"
            alt="Participar de Viagem"
            width={32}
            height={32}
          />
        </span>
        <span className="text-white font-semibold text-lg">Participar <br /> de Viagem</span>
      </button>

      {/* Explorar Viagens */}
      <button
        className="flex items-center gap-4 rounded-2xl shadow-lg w-[220px] h-[90px] transition hover:scale-105 cursor-pointer"
        style={{
          background: "linear-gradient(90deg, #ACEBA2 18.27%, #3AB660 100%)"
        }}
      // futuramente: onClick={() => router.push("/explorar_viagens")}
      >
        <span className="flex items-center justify-center bg-white rounded-full w-16 h-14 ml-4">
          <Image
            src="/images-home_page/icons/BlueGlobeIcon.png"
            alt="Explorar Viagens"
            width={32}
            height={32}
          />
        </span>
        <span className="text-white font-semibold text-lg">Explorar Viagens</span>
      </button>
    </div>
  );
}