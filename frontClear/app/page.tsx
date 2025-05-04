import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, Truck, Store } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-center mb-6">🛡️ ClearDrop</h1>
      <p className="text-xl text-center text-gray-600 max-w-2xl mb-12">
        Plataforma segura de pagos en custodia mediante contratos inteligentes en zkSync para evitar estafas en entregas
        o compras en línea.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              Vista del Comprador
            </CardTitle>
            <CardDescription>Controla tu pedido y asegura tus fondos</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-6">
              Gestiona tus compras y confirma la recepción para liberar los fondos al repartidor.
            </p>
            <Link href="/buyer" className="w-full">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Acceder como Comprador</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-green-500" />
              Vista del Repartidor
            </CardTitle>
            <CardDescription>Confirma entregas y recibe pagos</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-6">
              Sube pruebas visuales para validar la entrega y recibir los fondos del contrato.
            </p>
            <Link href="/delivery" className="w-full">
              <Button className="w-full bg-green-500 hover:bg-green-600">Acceder como Repartidor</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Store className="h-6 w-6 text-purple-500" />
              Vista del Administrador
            </CardTitle>
            <CardDescription>Gestiona pedidos y contratos</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-6">
              Consulta y gestiona los pedidos desde el contrato inteligente en zkSync.
            </p>
            <Link href="/admin" className="w-full">
              <Button className="w-full bg-purple-500 hover:bg-purple-600">Acceder como Admin</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
