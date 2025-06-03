import { Header } from "@/components/ui/header";
import Footer from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <main>
      <Header />

    <section
      id="bem-vindo"
      className="flex flex-col items-center justify-start h-[50rem] bg-gradient-to-b from-blue-900 to-blue-700 text-white"
    >
     {/* <hr className="border-t border-white opacity-40 mt-1 w-400" */>}
      <div className="max-w-4xl w-full">
        <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl text-center mb-2 mt-10">
          Bem vindo ao <span className="font-bold">Globix</span>
        </h1>
        <p className="text-center text-lg mb-2"> <br/>
          Tudo começou com uma ideia simples:
        </p>
        <p className="text-center text-xl font-bold mb-6">
          Tornar as viagens e excursões mais <br/> fáceis, organizadas e inesquecíveis.
        </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:divide-x divide-blue-300">
        {/* Problemas */}
        <div className="flex-1 px-2 md:px-6 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-2 text-center">Problemas</h2>
          <p className="mb-4 text-blue-100 text-center">
            Percebemos que planejar e acompanhar <br/> roteiros podia ser complicado, e muitas <br/> vezes os organizadores sentiam-se perdidos <br/> em meio a tantos detalhes. <br/><br/>
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
            <br/> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
            Falta de organização
            </li>
            <li className="flex items-center">
            <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
            <br/>Dificuldade para montar roteiros <br/> personalizados <br/>
            </li>
            <li className="flex items-center">
            <br/><br/> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
            <br/>Perda de tempo com tarefas <br/> repetitivas <br/>
            </li>
            <li className="flex items-center">
            <br/><br/> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
            Informações em vários ambientes
            </li>
          </ul>
        </div>

        {/* Solução */}
        <div className="flex-1 px-2 md:px-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">Solução</h2>
          <p className="mb-4 text-center">
            Um sistema <span className="font-bold">inteligente</span> e <span className="font-bold">acolhedor</span>, <br/> que transforma a maneira como <br/> você organiza suas aventuras. <br/> Assim surge o <span className="font-bold">Globix</span>. <br/><br/>
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
            <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
            <span>
              <span className="font-bold">Centralização de informações:</span> itinerários, localização, transporte, mensagens e muito mais! <br/> <br/>
            </span>
            </li>
            <li className="flex items-start">
            <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
            <span>
              <span className="font-bold">Itinerários personalizados:</span> crie e edite seu roteiro em tempo real. <br/><br/>
            </span>
            </li>
            <li className="flex items-start">
            <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
            <span>
              <span className="font-bold">Ambiente unificado:</span> todos os dados integrados em uma interface única. <br/> <br/>
            </span>
            </li>
            <li className="flex items-start">
            <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
            <span>
              <span className="font-bold">Automação de tarefas repetitivas:</span> checklists e notificações gerados automaticamente
            </span>
            </li>
          </ul>
        </div>
        </div>
      </div>
      {/* Linha horizontal branca ao final da section */}
      <hr className="border-t border-white opacity-40 mt-12 w-400" />
    </section>

    <Footer />
    </main>
  );
}