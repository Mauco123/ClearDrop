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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatusBadge from "@/components/status-badge"
import CopyableText from "@/components/copyable-text"
import ImageUpload from "@/components/image-upload"
import QrScanner from "@/components/qr-scanner"
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react"

export default function BuyerPage() {
  const [status, setStatus] = useState<"waiting" | "delivery-confirmed" | "received" | "funds-released" | "cancelled">(
    "delivery-confirmed",
  )
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [confirmMethod, setConfirmMethod] = useState<"qr" | "selfie">("qr")

  const handleConfirmDelivery = () => {
    setStatus("received")
    setConfirmDialogOpen(false)
  }

  const handleCancelOrder = () => {
    setStatus("cancelled")
    setCancelDialogOpen(false)
  }

  const canCancel = status === "waiting"

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🛡️ ClearDrop – Vista del Comprador</h1>
        <p className="text-gray-600">
          Controla tu pedido y asegura que tu dinero solo se libere al confirmar la entrega.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Estado del Pedido</CardTitle>
            <CardDescription>Información actualizada sobre tu pedido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <StatusBadge status={status} />
              <div className="font-semibold text-lg">
                Monto retenido: <span className="text-green-600">0.15 ETH</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Fecha del pedido</p>
                  <p className="text-gray-600">3 de mayo, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Hora estimada de entrega</p>
                  <p className="text-gray-600">Entre 17:00 - 19:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Dirección de entrega</p>
                  <p className="text-gray-600">Calle Principal 123, Piso 4, Ciudad</p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <p className="font-medium">Detalles del contrato</p>
              <CopyableText text="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t" label="Hash de transacción" />
              <CopyableText text="0xabcdef1234567890abcdef1234567890abcdef12" label="Contrato inteligente" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Acciones del Comprador</CardTitle>
            <CardDescription>Gestiona tu pedido y confirma la recepción</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                size="lg"
                onClick={() => setConfirmDialogOpen(true)}
                disabled={status === "received" || status === "funds-released" || status === "cancelled"}
              >
                ✅ Confirmar recepción
              </Button>
              <Button variant="destructive" size="lg" onClick={() => setCancelDialogOpen(true)} disabled={!canCancel}>
                ❌ Cancelar pedido
              </Button>
            </div>

            {status === "received" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800">
                  Has confirmado la recepción del pedido. Los fondos serán liberados al repartidor en breve.
                </p>
              </div>
            )}

            {status === "cancelled" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-800">
                  Has cancelado el pedido. Los fondos serán devueltos a tu cuenta en breve.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirm Delivery Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar recepción del pedido</DialogTitle>
            <DialogDescription>
              Para confirmar la recepción del pedido, elige uno de los siguientes métodos.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="qr" onValueChange={(value) => setConfirmMethod(value as "qr" | "selfie")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr">Escanear QR</TabsTrigger>
              <TabsTrigger value="selfie">Selfie con producto</TabsTrigger>
            </TabsList>
            <TabsContent value="qr" className="mt-4">
              <QrScanner />
            </TabsContent>
            <TabsContent value="selfie" className="mt-4">
              <ImageUpload label="Tomar selfie con el producto" cameraMode={true} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelivery}>Confirmar recepción</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar pedido</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cancelar el pedido y recuperar tus fondos?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Solo puedes cancelar el pedido si el repartidor aún no ha confirmado la entrega. Una vez confirmada la
              entrega por el repartidor, no podrás cancelar el pedido.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Volver
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              Sí, cancelar pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
