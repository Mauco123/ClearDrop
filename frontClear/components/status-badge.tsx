import { cn } from "@/lib/utils"

type OrderStatus = "waiting" | "delivery-confirmed" | "received" | "funds-released" | "cancelled"

interface StatusBadgeProps {
  status: OrderStatus
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    waiting: {
      label: "🕒 Esperando entrega",
      color: "bg-yellow-100 text-yellow-800",
    },
    "delivery-confirmed": {
      label: "📦 Entrega confirmada por repartidor",
      color: "bg-blue-100 text-blue-800",
    },
    received: {
      label: "✅ Recepción confirmada",
      color: "bg-green-100 text-green-800",
    },
    "funds-released": {
      label: "💰 Fondos liberados",
      color: "bg-purple-100 text-purple-800",
    },
    cancelled: {
      label: "❌ Pedido cancelado",
      color: "bg-red-100 text-red-800",
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn("inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium", config.color, className)}
    >
      {config.label}
    </span>
  )
}
