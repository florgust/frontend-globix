import React from "react";
import { X } from "lucide-react";

interface Notificacao {
  id: number;
  mensagem: string;
  tipo: string;
  viagemId?: number;
  dataCriacao: string;
}

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
}: {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notificacao[];
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 max-h-[80vh] overflow-y-auto rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notificações</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">Sem novas notificações</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="p-2 border-b last:border-b-0 hover:bg-gray-100 rounded"
              >
                <p className="text-sm">{n.mensagem}</p>
                <span className="text-xs text-gray-400">
                  {new Date(n.dataCriacao).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}