"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageSelected?: (file: File) => void
  className?: string
  label?: string
  cameraMode?: boolean
}

export default function ImageUpload({
  onImageSelected,
  className,
  label = "Subir imagen",
  cameraMode = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
      if (onImageSelected) onImageSelected(file)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreview(null)
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {preview ? (
        <div className="relative w-full">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-auto rounded-lg object-cover max-h-64"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Eliminar imagen</span>
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {cameraMode ? (
              <Camera className="w-10 h-10 mb-3 text-gray-400" />
            ) : (
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG o WEBP (Max. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            capture={cameraMode ? "environment" : undefined}
          />
        </label>
      )}
    </div>
  )
}
