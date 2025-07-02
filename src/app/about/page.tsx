import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AboutPage() {
  return (
    <main>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      {/* Adiciona padding-top para não cobrir o conteúdo */}
      <div className="pt-20"></div>

      <main className="bg-[#102976]">
        <section
          id="bem-vindo"
          className="flex flex-col items-center justify-start h-[50rem] text-white scroll-mt-20"
        >
          <hr className="border-t border-white opacity-40 mt-3 w-400" />
          <div className="max-w-4xl w-full">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-5xl text-center mb-2 mt-10">
                Bem vindo ao <span className="font-bold">Globix</span>
              </h1>
              <p className="text-center text-lg mb-2"> <br />
                Tudo começou com uma ideia simples:
              </p>
              <p className="text-center text-xl font-bold mb-6">
                Tornar as viagens e excursões mais <br /> fáceis, organizadas e inesquecíveis.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:divide-x divide-blue-300">
              {/* Problemas */}
              <div className="flex-1 px-2 md:px-6 mb-8 md:mb-0">
                <h2 className="text-2xl font-semibold mb-2 text-center">Problemas</h2>
                <p className="mb-4 text-blue-100 text-center">
                  Percebemos que planejar e acompanhar <br /> roteiros podia ser complicado, e muitas <br /> vezes os organizadores sentiam-se perdidos <br /> em meio a tantos detalhes. <br /><br />
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <br /> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
                    Falta de organização
                  </li>
                  <li className="flex items-center">
                    <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
                    <br />Dificuldade para montar roteiros <br /> personalizados <br />
                  </li>
                  <li className="flex items-center">
                    <br /><br /> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
                    <br /> <br /> Perda de tempo com tarefas <br /> repetitivas <br />
                  </li>
                  <li className="flex items-center">
                    <br /><br /> <img src="/images-about/x.svg" alt="X" className="w-6 h-6 mr-2" />
                    Informações em vários ambientes
                  </li>
                </ul>
              </div>

              {/* Solução */}
              <div className="flex-1 px-2 md:px-6">
                <h2 className="text-2xl font-semibold mb-2 text-center">Solução</h2>
                <p className="mb-4 text-center">
                  Um sistema <span className="font-bold">inteligente</span> e <span className="font-bold">acolhedor</span>, <br /> que transforma a maneira como <br /> você organiza suas aventuras. <br /> Assim surge o <span className="font-bold">Globix</span>. <br /><br />
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
                    <span>
                      <span className="font-bold">Centralização de informações:</span> itinerários, localização, transporte, mensagens e muito mais! <br /> <br />
                    </span>
                  </li>
                  <li className="flex items-start">
                    <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
                    <span>
                      <span className="font-bold">Itinerários personalizados:</span> crie e edite seu roteiro em tempo real. <br /><br />
                    </span>
                  </li>
                  <li className="flex items-start">
                    <img src="/images-about/certo.svg" alt="X" className="w-6 h-6 mr-2" />
                    <span>
                      <span className="font-bold">Ambiente unificado:</span> todos os dados integrados em uma interface única. <br /> <br />
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

        <section
          id="globuxo"
          className="flex flex-col items-center justify-center mt-30 text-white relative scroll-mt-70"
        >
          <div className="flex flex-col items-center w-full max-w-4xl relative z-10">
            <h2 className="text-5xl font-normal text-center mb-10">Ajudante</h2>
            <div className="flex flex-row items-center justify-center w-full gap-8">
              {/* Texto da esquerda */}
              <div className="flex-1 text-right pr-4 text-lg">
                Apresentamos o <span className="font-bold">Globuxo</span>, nosso mascote, para encantar todos os viajantes com sua simpatia e fofura.
              </div>
              {/* Imagem central */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <img
                  src="/images-about/globuxo.svg"
                  alt="Globuxo mascote"
                  className="w-48 h-48 mb-2"
                />
              </div>
              {/* Texto da direita */}
              <div className="flex-1 text-left pl-4 text-lg">
                <div>Nome: Globuxo</div>
                <div>Idade: 4,5 bilhões de anos</div>
                <div>Comida favorita: Strogonoff</div>
              </div>
            </div>
          </div>

          {/* Linha horizontal base */}
          <hr className="border-t border-white opacity-40 mt-30 w-400" />
        </section>

        <section
          id="time"
          className="flex flex-col items-center justify-center min-h-screen text-white relative scroll-mt-10"
        >
          <div className="flex flex-col items-center w-full max-w-6xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-normal text-center mb-12 mt-16">
              Nada disso seria possível<br />
              sem o time <span className="font-bold">Palubar</span>
            </h2>
            <div className="flex flex-row items-center justify-center w-full gap-16">
              {/* Quadro de membros */}
              <div className="bg-[#2563eb] bg-opacity-80 rounded-2xl p-8 flex flex-col shadow-lg min-w-[380px] max-w-[420px]">
                <div className="grid grid-cols-2 gap-8 text-[#092064]">
                  {/* Card 1 */}
                  <div className="relative flex flex-col items-center transform -rotate-3">
                    <img
                      src="/images-about/pin.svg"
                      alt="Pin"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 z-10"
                    />
                    <div className="bg-white rounded-md shadow-lg flex flex-col items-center pb-4 pt-2 px-2 w-[170px]">
                      <img
                        src="/images-about/patrick.png"
                        alt="Patrick Machado Cardoso"
                        className="w-[150px] h-[120px] object-cover rounded"
                      />
                      <div className="mt-2 font-bold text-center text-base leading-tight">
                        Patrick Machado Cardoso
                      </div>
                      <div className="text-xs text-center font-semibold">
                        Front-End - Back-End
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="relative flex flex-col items-center transform rotate-2">
                    <img
                      src="/images-about/pin.svg"
                      alt="Pin"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 z-10"
                    />
                    <div className="bg-white rounded-md shadow-lg flex flex-col items-center pb-4 pt-2 px-2 w-[170px]">
                      <img
                        src="/images-about/luan.png"
                        alt="Luan Flôr Gustavo"
                        className="w-[150px] h-[120px] object-cover rounded"
                      />
                      <div className="mt-2 font-bold text-center text-base leading-tight">
                        Luan Flôr Gustavo
                      </div>
                      <div className="text-xs text-center font-semibold">
                        Back-End - DevOps
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="relative flex flex-col items-center transform -rotate-6">
                    <img
                      src="/images-about/pin.svg"
                      alt="Pin"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 z-10"
                    />
                    <div className="bg-white rounded-md shadow-lg flex flex-col items-center pb-4 pt-2 px-2 w-[170px]">
                      <img
                        src="/images-about/barbara.png"
                        alt="Bárbara Gianvechio Cobo"
                        className="w-[150px] h-[120px] object-cover rounded"
                      />
                      <div className="mt-2 font-bold text-center text-base leading-tight">
                        Bárbara Gianvechio Cobo
                      </div>
                      <div className="text-xs text-center font-semibold">
                        UI/UX - Front-End
                      </div>
                    </div>
                  </div>
                  {/* Card 4 */}
                  <div className="relative flex flex-col items-center transform rotate-3">
                    <img
                      src="/images-about/pin.svg"
                      alt="Pin"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 z-10"
                    />
                    <div className="bg-white rounded-md shadow-lg flex flex-col items-center pb-4 pt-2 px-2 w-[170px]">
                      <img
                        src="/images-about/arthur.png"
                        alt="Arthur Da Silva Ramos"
                        className="w-[150px] h-[120px] object-cover rounded"
                      />
                      <div className="mt-2 font-bold text-center text-base leading-tight">
                        Arthur Da Silva Ramos
                      </div>
                      <div className="text-xs text-center font-semibold">
                        DevOps - FullStack
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mascote à direita */}
              <div className="flex flex-col items-center">
                <img
                  src="/images-about/globuxo-grande.svg"
                  alt="Globuxo mascote com óculos"
                  className="w-72 h-72"
                />
              </div>
            </div>
          </div>

          {/* Linha horizontal base */}
          <hr className="border-t border-white opacity-40 w-400 mt-30 mb-25" />
        </section>

        <section
          id="motivos"
          className="flex flex-col items-center justify-center text-white relative scroll-mt-50"
        >
          <div className="flex flex-col items-center max-w-6xl">
            <h2 className="text-3xl font-normal text-center">
              Por que usar o <span className="font-bold text-[#4e8cff]">GLOBIX?</span>
            </h2>
            <div className="flex  flex-wrap justify-center gap-12 mt-20">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-lg px-8 py-8 w-[300px] flex flex-col items-center text-[#0b47b8]">
                <img src="/images-about/por-que-card1.svg" alt="Organização Total" className="w-14 h-14 mb-4" />
                <div className="font-bold text-lg mb-2 text-center">Organização Total</div>
                <div className="text-center text-base font-normal">
                  Tenha todos os detalhes da sua viagem centralizados: itinerário, eventos, listas de tarefas e lembretes.
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-lg px-8 py-8 w-[300px] flex flex-col items-center text-[#0b47b8]">
                <img src="/images-about/por-que-card2.svg" alt="Ambiente unificado" className="w-14 h-14 mb-4" />
                <div className="font-bold text-lg mb-2 text-center">Ambiente unificado</div>
                <div className="text-center text-base font-normal">
                  Nosso sistema foi pensado para reunir tudo isso em um único lugar, de forma organizada e acessível.
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-lg py-8 w-[300px] flex flex-col items-center text-[#0b47b8]">
                <img src="/images-about/por-que-card3.svg" alt="Planejamento prático" className="w-14 h-14 mb-4" />
                <div className="font-bold text-lg mb-2 text-center">Planejamento prático</div>
                <div className="text-center text-base font-normal">
                  Uma plataforma onde você consegue acompanhar tudo em um só lugar, de forma visual, intuitiva e eficiente.
                </div>
              </div>
              <div className="text-2xl text-white font-normal mt-4 mb-15">e muito mais...</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </main>
  );
}