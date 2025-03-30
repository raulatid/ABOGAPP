import { getMockResponse } from "./mock-responses"
import { extractTextFromFile } from "./file-parser"

const MAX_CONTEXT_LENGTH = 4000

export async function sendToLegalAI(
  rol: string,
  contexto: string,
  fileContent: string | null = null,
  uploadedFile: File | Blob | null = null,
): Promise<string> {
  try {
    console.log("Iniciando consulta legal")
    console.log(`Rol: "${rol}"`)

    // Validar entrada
    if (!rol) {
      console.error("Error: Rol no especificado")
      return "Error: Debes especificar un rol (demandante, demandado o juez)."
    }

    // Procesar el archivo si existe pero no tenemos su contenido
    if (!fileContent && uploadedFile) {
      try {
        console.log("Extrayendo texto del archivo...")
        fileContent = await extractTextFromFile(uploadedFile)
        console.log(`Texto extraído: ${fileContent.substring(0, 100)}...`)
      } catch (error) {
        console.error("Error al extraer texto del archivo:", error)
        fileContent = `[No se pudo extraer texto del archivo. ${error instanceof Error ? error.message : "Error desconocido"}]`
      }
    }

    // Limitar el tamaño del contexto para evitar problemas
    let contextoLimitado = contexto || ""
    if (contexto && contexto.length > MAX_CONTEXT_LENGTH) {
      console.warn(`Contexto demasiado largo (${contexto.length} caracteres), limitando a ${MAX_CONTEXT_LENGTH}`)
      contextoLimitado = contexto.substring(0, MAX_CONTEXT_LENGTH) + "... [Texto truncado por longitud]"
    }

    // Si tenemos contenido de archivo, usarlo como contexto principal
    if (fileContent) {
      let fileContentLimitado = fileContent
      if (fileContent.length > MAX_CONTEXT_LENGTH) {
        console.warn(
          `Contenido de archivo demasiado largo (${fileContent.length} caracteres), limitando a ${MAX_CONTEXT_LENGTH}`,
        )
        fileContentLimitado = fileContent.substring(0, MAX_CONTEXT_LENGTH) + "... [Texto truncado por longitud]"
      }
      contextoLimitado = fileContentLimitado
    }

    // Preparar FormData
    const formData = new FormData()
    formData.append("rol", rol)
    formData.append("contexto", contextoLimitado)

    // Si tenemos el archivo original, adjuntarlo
    if (uploadedFile && !fileContent) {
      console.log("Adjuntando archivo original para procesar en el servidor")
      formData.append("file", uploadedFile)
    }

    console.log(`Enviando consulta con rol: "${rol}" y contexto de ${contextoLimitado.length} caracteres`)

    try {
      // Realizar la solicitud a la API
      const res = await fetch("/api/legal_assistant/route", {
        method: "POST",
        body: formData,
      })

      // Manejar errores de respuesta HTTP
      if (!res.ok) {
        let errorMessage = `Error ${res.status}: ${res.statusText || "Error en la comunicación con el servidor"}`
        console.error(`Respuesta no OK: ${res.status} ${res.statusText}`)

        try {
          // Intentar obtener el mensaje de error del cuerpo de la respuesta
          const contentType = res.headers.get("content-type")

          if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json()
            console.error("Error en la respuesta del servidor (JSON):", errorData)
            errorMessage = errorData.error || errorMessage
          } else {
            const errorText = await res.text()
            console.error("Error en la respuesta del servidor (texto):", errorText)

            if (errorText && errorText.length > 0 && errorText.length < 200) {
              errorMessage = errorText
            }
          }
        } catch (parseError) {
          console.error("Error al parsear la respuesta de error:", parseError)
        }

        throw new Error(errorMessage)
      }

      // Procesar la respuesta exitosa
      try {
        // Primero verificar el tipo de contenido
        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.error("La respuesta no es JSON:", contentType)
          // Intentar obtener el texto para diagnóstico
          const text = await res.text()
          console.error("Contenido de la respuesta:", text.substring(0, 500))
          throw new Error(
            "El servidor no devolvió un JSON válido. Tipo de contenido: " + (contentType || "desconocido"),
          )
        }

        // Ahora intentar parsear el JSON
        const data = await res.json()
        console.log("Respuesta JSON recibida:", data)

        if (data.error) {
          console.error("Error recibido del servidor:", data.error)
          throw new Error(data.error)
        }

        if (!data.respuesta) {
          console.error("Respuesta vacía del servidor")
          throw new Error("No se recibió respuesta del asistente legal. Por favor, inténtalo de nuevo.")
        }

        console.log("Respuesta recibida correctamente")

        if (data.isMock) {
          console.log("La respuesta es simulada (fallback)")
        }

        return data.respuesta
      } catch (jsonError) {
        console.error("Error al procesar la respuesta JSON:", jsonError)
        throw new Error(
          `Error al procesar la respuesta del servidor: ${jsonError.message}. Por favor, inténtalo de nuevo.`,
        )
      }
    } catch (fetchError: any) {
      console.error("Error en la solicitud:", fetchError)
      throw fetchError
    }
  } catch (error: any) {
    console.error("Error al enviar consulta legal:", error)

    // Proporcionar un mensaje de error más amigable
    let errorMessage = "Error desconocido"

    // Definir contextoLimitado para usar en la respuesta simulada
    let contextoLimitado = contexto || ""
    if (contexto && contexto.length > MAX_CONTEXT_LENGTH) {
      contextoLimitado = contexto.substring(0, MAX_CONTEXT_LENGTH) + "... [Texto truncado por longitud]"
    }

    if (error.message) {
      errorMessage = error.message

      // Simplificar algunos mensajes de error comunes
      if (
        errorMessage.includes("fetch failed") ||
        errorMessage.includes("network") ||
        errorMessage.includes("Failed to fetch")
      ) {
        errorMessage = "Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo."
      }

      if (errorMessage.includes("timeout") || errorMessage.includes("timed out")) {
        errorMessage = "La solicitud ha tardado demasiado tiempo. Por favor, inténtalo de nuevo más tarde."
      }

      if (errorMessage.includes("authentication") || errorMessage.includes("API key")) {
        errorMessage = "Error de autenticación con el servicio de IA. Por favor, contacte al administrador."
      }
    }

    // Usar respuestas simuladas como fallback en caso de error
    console.log("Usando respuesta simulada como fallback debido a error")
    console.log(`Rol utilizado para la respuesta simulada: "${rol}"`)
    const mockResponse = getMockResponse(rol, contextoLimitado)
    return mockResponse
  }
}

