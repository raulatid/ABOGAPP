export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { getMockResponse } from "@/app/utils/mock-responses"

const normalizeRole = (rol: string): string => {
  const r = rol.toLowerCase().trim()
  if (r === "demandante" || r === "plaintiff") return "plaintiff"
  if (r === "demandado" || r === "defendant") return "defendant"
  if (r === "juez" || r === "judge") return "judge"
  return "generic"
}

async function extractTextFromFile(file: Blob): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  return buffer.toString("utf-8")
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const rolOriginal = formData.get("rol") as string
    const rol = normalizeRole(rolOriginal)
    let contexto = (formData.get("contexto") as string) || ""
    const file = formData.get("file") as Blob | null

    if (!rolOriginal) {
      return NextResponse.json({ error: "Rol no especificado" }, { status: 400 })
    }

    if (file) {
      const fileText = await extractTextFromFile(file)
      if (fileText && fileText.length > 0) {
        contexto = fileText
      }
    }

    const MAX_CONTEXT_LENGTH = 4000
    if (contexto.length > MAX_CONTEXT_LENGTH) {
      contexto = contexto.substring(0, MAX_CONTEXT_LENGTH) + "... [Texto truncado por longitud]"
    }

    const openai = new OpenAI({
      apiKey: "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",
    })

    const prompt = `
Actúa como el mejor abogado del mundo. Eres una autoridad legal internacional, reconocido por tu dominio absoluto del Derecho comparado, el análisis crítico de casos históricos, jurisprudencia actualizada y la creación de estrategias jurídicas inquebrantables.

Has estudiado y aplicado las técnicas y métodos de los bufetes más prestigiosos del mundo y te especializas en diseñar soluciones efectivas para litigios complejos.

Según el rol seleccionado por el usuario (${rolOriginal}), debes actuar de la siguiente forma:

🔹 Como parte esencial del análisis jurídico, debes identificar y aprovechar cualquier vacío legal, contradicción normativa, ausencia de jurisprudencia aplicable o ambigüedad regulatoria que pueda beneficiar a tu cliente o condicionar la decisión del juez. Señala claramente:
- Normas en conflicto
- Supuestos no regulados
- Ambigüedades interpretativas

1. Análisis jurídico profundo del caso
2. Desarrollo de estrategia o evaluación según el rol (demandante, demandado o juez)
3. Recomendaciones claras y fundamentadas
4. Redacción de documentos legales necesarios
5. Anticipación de objeciones o ataques del adversario (si aplica)

Información del caso:
Rol del usuario: ${rolOriginal}
Contexto o documentación proporcionada:
${contexto}

Comienza ahora con el análisis completo.
`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    })

    const result = response.choices?.[0]?.message?.content || ""
    if (!result) throw new Error("Respuesta vacía de OpenAI")

    return NextResponse.json({ respuesta: result })
  } catch (error: any) {
    console.error("Error en /api/legal_assistant:", error)
    const mockResponse = getMockResponse("generic", "")
    return NextResponse.json({ respuesta: mockResponse, isMock: true })
  }
}
