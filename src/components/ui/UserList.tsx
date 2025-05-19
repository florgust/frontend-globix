import { Check, X } from "lucide-react";
import React from "react";

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  foto: string;
}

interface RequestUser {
  id_usuario: number;
  nome: string;
  email: string;
  foto: string;
  tipo_solicitacao: number;
}

interface RequestListProps {
  solicitacoes: RequestUser[];
  onAccept: (id_usuario: number) => void;
  onDeny: (id_usuario: number) => void;
}

interface UserListProps {
  usuarios: User[];
}

const UserList: React.FC<UserListProps> = ({ usuarios }) => {
  return (
        <div className="flex flex-col gap-3 p-4">
          {usuarios.map((usuario) => (
            <div
              key={usuario.id_usuario}
              className="flex bg-white items-center rounded-2xl shadow-md p-1 w-full h-15"
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

const RequestList: React.FC<RequestListProps> = ({ solicitacoes, onAccept, onDeny }) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {solicitacoes.map((solicitacao) => (
        <div
          key={solicitacao.id_usuario}
          className="flex bg-white items-center rounded-2xl shadow-md p-2 w-full h-20"
        >
          <img
            src={solicitacao.foto}
            alt={solicitacao.nome}
            className="w-12 h-12 object-cover rounded-md ml-2"
          />

          {/* Nome, e-mail e mensagem */}
          <div className="ml-4 flex flex-col flex-grow">
            <p className="font-bold text-sm">{solicitacao.nome}</p>
            <p className="text-xs text-gray-500">{solicitacao.email}</p>
          </div>

          {/* Botões de aceitar e negar */}
          <div className="flex gap-2">
            <button
              className="bg-green-500 rounded-full p-2 hover:bg-green-600 cursor-pointer"
              onClick={() => onAccept(solicitacao.id_usuario)}
            >
              <Check className="text-white w-5 h-5 "/>
            </button>
            <button
              className="bg-red-400 rounded-full p-2 hover:bg-red-600 cursor-pointer"
              onClick={() => onDeny(solicitacao.id_usuario)}
            >
              <X className="text-white w-5 h-5 "/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { UserList, RequestList };