import { useState } from "react";

export default function SearchBarWithFilters() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
        className={`px-4 py-1 rounded-lg font-semibold text-white transition ${
          activeFilter === "recentes"
            ? "bg-blue-800 bg-opacity-80"
            : "bg-blue-600 bg-opacity-60 hover:bg-opacity-80"
        }`}
        onClick={() => setActiveFilter("recentes")}
      >
        Recentes
      </button>
      <button
        className={`px-4 py-1 rounded-lg font-semibold text-white transition ${
          activeFilter === "populares"
            ? "bg-blue-800 bg-opacity-80"
            : "bg-blue-600 bg-opacity-60 hover:bg-opacity-80"
        }`}
        onClick={() => setActiveFilter("populares")}
      >
        Ordem Alfabética
      </button>
    </div>
  );
}