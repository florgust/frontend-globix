interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  creationOrder: "criacao-mais-nova" | "criacao-mais-antiga";
  setCreationOrder: (value: "criacao-mais-nova" | "criacao-mais-antiga") => void;
  startOrder: "inicio-mais-perto" | "inicio-mais-distante";
  setStartOrder: (value: "inicio-mais-perto" | "inicio-mais-distante") => void;
  alphaOrder: "a-z" | "z-a";
  setAlphaOrder: (value: "a-z" | "z-a") => void;
  activeSort: "criacao" | "inicio" | "alfabetica";
  setActiveSort: (value: "criacao" | "inicio" | "alfabetica") => void;
}

export default function BarraDePesquisa({
  search,
  setSearch,
  creationOrder,
  setCreationOrder,
  startOrder,
  setStartOrder,
  alphaOrder,
  setAlphaOrder,
  activeSort,
  setActiveSort,
}: SearchBarProps) {
  // Alterna entre mais nova/mais antiga
  const toggleCreationOrder = () => {
    setCreationOrder(
      creationOrder === "criacao-mais-nova"
        ? "criacao-mais-antiga"
        : "criacao-mais-nova"
    );
    setActiveSort("criacao");
  };

  // Alterna entre mais perto/mais distante
  const toggleStartOrder = () => {
    setStartOrder(
      startOrder === "inicio-mais-perto"
        ? "inicio-mais-distante"
        : "inicio-mais-perto"
    );
    setActiveSort("inicio");
  };

  // Alterna entre a-z/z-a
  const toggleAlphaOrder = () => {
    setAlphaOrder(alphaOrder === "a-z" ? "z-a" : "a-z");
    setActiveSort("alfabetica");
  };

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-2 mb-6"
      style={{
        background: "rgba(33, 91, 219, 0.75)",
        boxShadow: "0 2px 8px rgba(33,91,219,0.08)",
      }}
    >
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Pesquisar excursão..."
        className="bg-transparent outline-none text-white placeholder:text-blue-100 flex-1 text-lg"
      />
      <button
        className={`px-4 py-1 rounded-lg font-semibold text-white transition cursor-pointer ${activeSort === "criacao" ? "bg-blue-800" : "bg-blue-600"
          }`}
        onClick={toggleCreationOrder}
        title="Alternar ordenação por criação"
      >
        {creationOrder === "criacao-mais-nova"
          ? "Criação: Mais Nova"
          : "Criação: Mais Antiga"}
      </button>
      <button
        className={`px-4 py-1 rounded-lg font-semibold text-white transition cursor-pointer ${activeSort === "inicio" ? "bg-blue-800" : "bg-blue-600"
          }`}
        onClick={toggleStartOrder}
        title="Alternar ordenação por início"
      >
        {startOrder === "inicio-mais-perto"
          ? "Início: Mais Perto"
          : "Início: Mais Distante"}
      </button>
      <button
        className={`px-4 py-1 rounded-lg font-semibold text-white transition cursor-pointer ${activeSort === "alfabetica" ? "bg-blue-800" : "bg-blue-600"
          }`}
        onClick={toggleAlphaOrder}
        title="Alternar ordem alfabética"
      >
        {alphaOrder === "a-z" ? "A-Z" : "Z-A"}
      </button>
    </div>
  );
}