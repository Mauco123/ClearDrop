"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import StatusBadge from "@/components/status-badge"
import CopyableText from "@/components/copyable-text"
import { AlertTriangle, Calendar, Clock, DollarSign, User, Truck, Store } from "lucide-react"

export default function AdminPage() {
  const [status, setStatus] = useState<"delivery-confirmed" | "received" | "funds-released">("received")
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false)
  const [refundDialogOpen, setRefundDialogOpen] = useState(false)

  const handleReleaseFunds = () => {
    setStatus("funds-released")
    setReleaseDialogOpen(false)
  }

  const canReleaseFunds = status === "received"

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🏪 Administrador del servicio</h1>
        <p className="text-gray-600">Consulta y gestiona los pedidos desde el contrato inteligente.</p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Detalles del Pedido</CardTitle>
                <CardDescription>Pedido #12345</CardDescription>
              </div>
              <StatusBadge status={status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Comprador</p>
                    <CopyableText text="0x1a2b...3f4g" className="mt-1" />
                    <p className="text-sm text-gray-500 mt-1">Sophia Anderson</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Repartidor</p>
                    <CopyableText text="0x5e6f...7g8h" className="mt-1" />
                    <p className="text-sm text-gray-500 mt-1">Carlos Rodríguez</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Store className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Vendedor</p>
                    <CopyableText text="0x9i0j...1k2l" className="mt-1" />
                    <p className="text-sm text-gray-500 mt-1">TechStore Inc.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Monto bloqueado</p>
                    <p className="text-green-600 font-semibold">0.15 ETH</p>
                    <p className="text-sm text-gray-500">≈ $450 USD</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fecha de inicio</p>
                    <p className="text-gray-600">3 de mayo, 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Última actualización</p>
                    <p className="text-gray-600">3 de mayo, 2025 - 17:45</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="font-medium">Detalles del contrato</p>
              <CopyableText text="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t" label="Hash de transacción" />
              <CopyableText text="0xabcdef1234567890abcdef1234567890abcdef12" label="Contrato inteligente" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Acciones del Administrador</CardTitle>
            <CardDescription>Gestiona el estado del pedido y los fondos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                size="lg"
                onClick={() => setReleaseDialogOpen(true)}
                disabled={!canReleaseFunds}
              >
                Liberar fondos al repartidor
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setRefundDialogOpen(true)}
                disabled={status === "funds-released"}
              >
                Forzar reembolso al comprador
              </Button>
            </div>

            {status === "funds-released" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800">
                  Los fondos han sido liberados al repartidor. La transacción ha sido completada.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Release Funds Dialog */}
      <Dialog open={releaseDialogOpen} onOpenChange={setReleaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Liberar fondos al repartidor</DialogTitle>
            <DialogDescription>
              Estás a punto de liberar los fondos retenidos en el contrato inteligente al repartidor.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <span className="font-semibold">Información:</span> Ambas partes han confirmado la entrega del pedido. Los
              fondos (0.15 ETH) serán transferidos a la dirección del repartidor.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setReleaseDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleReleaseFunds}>
              Confirmar liberación de fondos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forzar reembolso al comprador</DialogTitle>
            <DialogDescription>
              Esta acción devolverá los fondos retenidos al comprador. Solo debe usarse en casos excepcionales.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-800 text-sm">
              <span className="font-semibold">¡Advertencia!</span> Esta es una acción de emergencia que anulará el
              proceso normal. Solo debe utilizarse en caso de disputas o problemas graves con la entrega.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive">Confirmar reembolso</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
