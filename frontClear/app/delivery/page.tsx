"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import StatusBadge from "@/components/status-badge"
import ImageUpload from "@/components/image-upload"
import QrScanner from "@/components/qr-scanner"
import { Package, CheckCircle, AlertTriangle } from "lucide-react"

export default function DeliveryPage() {
  const [status, setStatus] = useState<"waiting" | "delivery-confirmed" | "received" | "funds-released">("waiting")
  const [confirmMethod, setConfirmMethod] = useState<"photo" | "qr">("photo")
  const [hasImage, setHasImage] = useState(false)

  const handleConfirmDelivery = () => {
    setStatus("delivery-confirmed")
  }

  const handleImageSelected = (file: File) => {
    setHasImage(true)
  }

  const handleQrScanned = (result: string) => {
    // In a real app, we would validate the QR code
    setHasImage(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🚚 Repartidor – Confirmación de Entrega</h1>
        <p className="text-gray-600">Sube una prueba visual para validar la entrega del pedido.</p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Estado del Pedido</CardTitle>
                <CardDescription>Pedido #12345</CardDescription>
              </div>
              <StatusBadge status={status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Package className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800">Detalles del producto</p>
                  <p className="text-blue-700">Paquete mediano (2kg) - Electrónica</p>
                  <p className="text-blue-600 text-sm mt-1">Dirección: Calle Principal 123, Piso 4, Ciudad</p>
                </div>
              </div>
            </div>

            {status === "delivery-confirmed" && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Entrega confirmada</AlertTitle>
                <AlertDescription className="text-green-700">
                  Has confirmado la entrega del pedido. Ahora debes esperar a que el comprador confirme la recepción
                  para recibir los fondos.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Confirmación de entrega</CardTitle>
            <CardDescription>Sube una prueba visual para validar la entrega del pedido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="photo" onValueChange={(value) => setConfirmMethod(value as "photo" | "qr")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo">Subir foto</TabsTrigger>
                <TabsTrigger value="qr">Escanear QR</TabsTrigger>
              </TabsList>
              <TabsContent value="photo" className="mt-4">
                <ImageUpload
                  label="Subir foto del producto en el lugar de entrega"
                  onImageSelected={handleImageSelected}
                />
              </TabsContent>
              <TabsContent value="qr" className="mt-4">
                <QrScanner onScanComplete={handleQrScanned} />
              </TabsContent>
            </Tabs>

            {status === "waiting" && (
              <Alert variant="default" className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Importante</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Una vez confirmada la entrega, el comprador deberá validarla para que se liberen los fondos.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              size="lg"
              onClick={handleConfirmDelivery}
              disabled={!hasImage || status !== "waiting"}
            >
              Confirmar entrega (repartidor)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
