"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Truck, Store, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { name: "Inicio", path: "/", icon: null },
    { name: "Comprador", path: "/buyer", icon: <Shield className="h-4 w-4" /> },
    { name: "Repartidor", path: "/delivery", icon: <Truck className="h-4 w-4" /> },
    { name: "Administrador", path: "/admin", icon: <Store className="h-4 w-4" /> },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              🛡️ ClearDrop
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium",
                  pathname === route.path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium",
                pathname === route.path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
