import Image from "next/image";

interface Notification {
  id: number;
  message: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "Ana Costa enviou uma mensagem: ‘Pessoal, lembrem de levar água para o passeio’",
  },
  {
    id: 2,
    message: "Você cancelou a atividade ‘Visita ao Museu’.",
  },
  {
    id: 3,
    message: "Próximo evento: ‘Check-In’ começa em 1 hora.",
  },
  // Adicione mais notificações aqui se quiser testar
];

export default function NotificationsCard() {
  // Pegue as 3 últimas notificações
  const lastNotifications = notifications.slice(-3).reverse();

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg px-6 py-3 w-[85.5%] h-[19vh] flex flex-col">
      <h2 className="text-[#0F2976] text-2xl font-bold mb-2">Notificações Recentes</h2>
      {lastNotifications.length > 0 ? (
        <ul className="text-[#333] text-2sm space-y-1">
          {lastNotifications.map((notification) => (
            <li key={notification.id} className="flex items-center gap-2 py-1">
              <Image
                src="/images-home_page/icons/GreenElipse.png"
                alt="Notificação"
                width={8}
                height={8}
              />
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-sm mt-2">
          Nenhuma notificação recente.
        </div>
      )}
    </div>
  );
}