"use client"

import { useState } from "react"
import { QrCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QrScannerProps {
  onScanComplete?: (result: string) => void
  className?: string
}

export default function QrScanner({ onScanComplete, className }: QrScannerProps) {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  const startScanning = () => {
    setScanning(true)

    // Simulate QR scanning after 2 seconds
    setTimeout(() => {
      setScanning(false)
      setScanned(true)

      if (onScanComplete) {
        onScanComplete("QR-CODE-123456789")
      }
    }, 2000)
  }

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          {scanned ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-green-600 font-medium">¡Código QR escaneado correctamente!</p>
            </div>
          ) : scanning ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/20" />
                <div className="absolute top-1/2 w-full h-0.5 bg-red-500 animate-scan" />
              </div>
              <p className="text-center text-gray-600">Escaneando código QR...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <QrCode className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-center text-gray-600">
                Escanea el código QR proporcionado por el comprador o repartidor
              </p>
              <Button onClick={startScanning} className="mt-2">
                Iniciar escaneo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
