import Image from "next/image";

export default function GreetingCard() {
  return (
    <div className="flex items-center justify-between bg-white/85 rounded-2xl shadow-lg px-8 py-10 w-[88%] h-[25vh]">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-[#1C4CDC] tracking-wide">
          Olá, Mauro. <span className="text-[#00C86B] tracking-widest">Eu sou o Globuxo!</span>
        </h1>
        <p className="text-3xl text-[#333] mt-2 font-normal tracking-widest">
          Pronto para planejar sua próxima viagem?
        </p>
        <span className="text-[#1C4CDC] text-1xl mt-6 font-normal tracking-wide">
          Tudo o que você precisa saber da sua viagem, em um único lugar.
        </span>
      </div>
      <div className="flex items-center h-full">
        <Image
          src="/images-home_page/globuxo.png"
          alt="Globuxo"
          width={165}
          height={170}
          className="object-contain"
        />
      </div>
    </div>
  );
}