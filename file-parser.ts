/**
 * Utilidad para extraer texto de diferentes tipos de archivos
 */
import mammoth from "mammoth"

// Función para extraer texto de un archivo según su tipo
export async function extractTextFromFile(file: File | Blob | null): Promise<string> {
  // Verificar si el archivo existe
  if (!file) {
    throw new Error("No se proporcionó ningún archivo")
  }

  // Intentar acceder a las propiedades del archivo
  const fileType = (file as any).type || ""
  const fileName = (file as any).name || "archivo"

  console.log(`Procesando archivo: ${fileName}, tipo: ${fileType}`)

  // Manejar archivos PDF
  if (fileType.includes("pdf") || fileName.toLowerCase().endsWith(".pdf")) {
    // Para PDFs, usamos un enfoque simple en el cliente
    try {
      // En el cliente, intentamos leer como texto plano (funcionará para algunos PDFs)
      if (typeof file.text === "function") {
        const text = await file.text()
        if (text && text.length > 0) {
          console.log(`Texto extraído del PDF como texto plano (${text.length} caracteres)`)
          return text
        }
      }

      // Si estamos en el servidor, utilizamos Buffer
      if (typeof file.arrayBuffer === "function") {
        try {
          const buffer = Buffer.from(await file.arrayBuffer())
          const text = buffer.toString("utf-8")
          if (text && text.length > 0) {
            console.log(`Texto extraído del PDF usando buffer (${text.length} caracteres)`)
            return text
          }
        } catch (bufferError) {
          console.error("Error al procesar PDF con buffer:", bufferError)
        }
      }

      throw new Error("No se pudo extraer texto del PDF")
    } catch (error) {
      console.error("Error al procesar archivo PDF como texto:", error)
      return `[No se pudo extraer texto del PDF. Por favor, copia y pega el texto del documento directamente en el chat.]`
    }
  }

  // Manejar archivos de Word
  if (
    fileType.includes("word") ||
    fileType.includes("document") ||
    fileName.toLowerCase().endsWith(".docx") ||
    fileName.toLowerCase().endsWith(".doc")
  ) {
    return extractTextFromWord(file)
  }

  // Para archivos de texto plano y otros formatos
  try {
    // Intentar usar el método text() si está disponible (en el cliente)
    if (typeof file.text === "function") {
      return await file.text()
    }

    // En el servidor, usar Buffer
    if (typeof file.arrayBuffer === "function") {
      const buffer = Buffer.from(await file.arrayBuffer())
      return buffer.toString("utf-8")
    }

    throw new Error("No se pudo leer el archivo con los métodos disponibles")
  } catch (error) {
    console.error("Error al leer el archivo como texto:", error)
    throw new Error(`No se pudo extraer texto del archivo ${fileName}. Formato no soportado o archivo dañado.`)
  }
}

// Función para extraer texto de archivos Word
export async function extractTextFromWord(file: File | Blob): Promise<string> {
  try {
    // Convertir el archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Extraer el texto del documento Word
    const result = await mammoth.extractRawText({ arrayBuffer })
    const text = result.value

    console.log(`Texto extraído del documento Word (${text.length} caracteres)`)
    return text
  } catch (error) {
    console.error("Error al procesar archivo Word:", error)

    // Intentar leer como texto plano como fallback
    try {
      if (typeof file.text === "function") {
        const text = await file.text()
        if (text && text.length > 0) {
          return text
        }
      }

      // En el servidor, usar Buffer
      if (typeof file.arrayBuffer === "function") {
        const buffer = Buffer.from(await file.arrayBuffer())
        const text = buffer.toString("utf-8")
        if (text && text.length > 0) {
          return text
        }
      }
    } catch (e) {
      console.error("Error al leer Word como texto:", e)
    }

    return `[Error al procesar el documento Word: ${error instanceof Error ? error.message : "Error desconocido"}. Por favor, copia y pega el texto del documento directamente en el chat.]`
  }
}

