"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { AlertCircle, FileText, X } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0] || null

    if (file) {
      const fileType = file.type
      const fileName = file.name.toLowerCase()

      // Verificar el tipo de archivo
      if (
        fileType.includes("text") ||
        fileName.endsWith(".txt") ||
        fileName.endsWith(".md") ||
        fileType.includes("pdf") ||
        fileName.endsWith(".pdf") ||
        fileType.includes("word") ||
        fileType.includes("document") ||
        fileName.endsWith(".docx") ||
        fileName.endsWith(".doc")
      ) {
        setSelectedFile(file)
        onFileSelect(file)

        // Mostrar advertencia para archivos PDF
        if (fileType.includes("pdf") || fileName.endsWith(".pdf")) {
          setError(
            "Nota: El procesamiento de archivos PDF es limitado. Para mejores resultados, copia y pega el texto directamente.",
          )
        }
      } else {
        setError("Formato de archivo no soportado. Por favor, sube un archivo de texto, PDF o Word.")
        setSelectedFile(null)
        onFileSelect(null)
      }
    } else {
      setSelectedFile(null)
      onFileSelect(null)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setError(null)
    onFileSelect(null)
    // Resetear el input de archivo
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept=".txt,.md,.pdf,.doc,.docx,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="flex-1"
        />
        {selectedFile && (
          <Button variant="ghost" size="icon" onClick={clearFile} aria-label="Eliminar archivo">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span className="truncate">{selectedFile.name}</span>
          <span className="text-xs">({Math.round(selectedFile.size / 1024)} KB)</span>
        </div>
      )}

      {error && (
        <Alert variant="warning" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

