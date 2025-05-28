import Image from "next/image";

export default function GreetingCard() {
  return (
    <div className="flex items-center justify-between bg-white/90 rounded-2xl shadow-lg px-10 py-6 w-[650px] h-[160px]">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-[#1C4CDC]">
          Olá, Mauro. <span className="text-[#00C86B]">Eu sou o Globuxo!</span>
        </h1>
        <p className="text-xl text-[#333] mt-1">
          Pronto para planejar sua próxima viagem?
        </p>
        <span className="text-[#1C4CDC] text-sm mt-4">
          Tudo o que você precisa saber da sua viagem, em um único lugar.
        </span>
      </div>
      <div className="flex items-center h-full">
        <Image
          src="/images-home_page/globuxo.png"
          alt="Globuxo"
          width={110}
          height={110}
          className="object-contain"
        />
      </div>
    </div>
  );
}