import React, { useState, useEffect, useRef } from "react";
import { FaFilter, FaSort } from "react-icons/fa";

interface Props {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}

const Filters = ({ sortOrder, setSortOrder, roleFilter, setRoleFilter }: Props) => {
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Fecha as caixas ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        roleRef.current &&
        !roleRef.current.contains(event.target as Node) &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setShowRoleOptions(false);
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Garante que apenas uma caixa esteja aberta por vez
  const toggleRoleOptions = () => {
    setShowRoleOptions(!showRoleOptions);
    if (!showRoleOptions) setShowSortOptions(false);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
    if (!showSortOptions) setShowRoleOptions(false);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4 relative">
        {/* Filtro por papel */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={toggleRoleOptions}
            className="flex items-center gap-2 px-2 py-1 cursor-pointer"
          >
            <FaFilter className="text-white text-4xl mt-4" />
          </button>
          {showRoleOptions && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md z-10">
              <button
                onClick={() => {
                  setRoleFilter("");
                  setShowRoleOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  roleFilter === "" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => {
                  setRoleFilter("organizador");
                  setShowRoleOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  roleFilter === "organizador" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Organizador
              </button>
              <button
                onClick={() => {
                  setRoleFilter("participante");
                  setShowRoleOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  roleFilter === "participante" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Participante
              </button>
            </div>
          )}
        </div>

        {/* Ordenação */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={toggleSortOptions}
            className="flex items-center gap-2 px-2 py-1 cursor-pointer"
          >
            <FaSort className="text-white text-4xl mt-4" />
          </button>
          {showSortOptions && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md z-10">
              <button
                onClick={() => {
                  setSortOrder("recentes");
                  setShowSortOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  sortOrder === "recentes" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Mais recente
              </button>
              <button
                onClick={() => {
                  setSortOrder("a-z");
                  setShowSortOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  sortOrder === "a-z" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Nome (A-Z)
              </button>
              <button
                onClick={() => {
                  setSortOrder("z-a");
                  setShowSortOptions(false);
                }}
                className={`block px-4 py-2 w-full text-left cursor-pointer ${
                  sortOrder === "z-a" ? "bg-gray-300 font-bold" : "hover:bg-gray-300"
                }`}
              >
                Nome (Z-A)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;