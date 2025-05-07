import React from "react";

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  foto: string;
}

interface GradientUserListProps {
  usuarios: User[];
}

const GradientUserList: React.FC<GradientUserListProps> = ({ usuarios }) => {
  return (
        <div className="flex flex-col gap-2 p-4">
          {usuarios.map((usuario) => (
            <div
              key={usuario.id_usuario}
              className="flex bg-white items-center rounded-2xl shadow-md p-1 w-full h-12"
            >
              <img
            src={usuario.foto}
            alt={usuario.nome}
            className="w-9 h-9 object-cover rounded-md ml-1"
          />

          {/* Nome e e-mail */}
          <div className="ml-4 flex flex-col">
            <p className="font-bold text-sm">{usuario.nome}</p>
            <p className="text-xs text-gray-500">{usuario.email}</p>
          </div>
            </div>
          ))}
        </div>
  );
};

export default GradientUserList;