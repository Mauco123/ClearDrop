"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyableTextProps {
  text: string
  label?: string
  className?: string
}

export default function CopyableText({ text, label, className }: CopyableTextProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex items-center gap-2 font-mono text-sm", className)}>
      {label && <span className="text-gray-500">{label}:</span>}
      <code className="bg-gray-100 px-2 py-1 rounded">{text}</code>
      <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-gray-500 hover:text-gray-700">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copiar al portapapeles</span>
      </Button>
    </div>
  )
}
