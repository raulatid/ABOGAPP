// Respuestas simuladas para usar cuando la API de OpenAI no está disponible
export const getMockResponse = (rol: string, contexto: string): string => {
  // Extraer algunas palabras clave del contexto para personalizar la respuesta
  const contextKeywords = extractKeywords(contexto)
  const contextMention =
    contextKeywords.length > 0 ? `Respecto a los aspectos mencionados sobre ${contextKeywords.join(", ")}, ` : ""

  console.log(`Generando respuesta simulada para rol: "${rol}" con ${contextKeywords.length} palabras clave`)

  // Normalizar el rol para asegurarnos de que coincide con una de las claves
  let rolKey = "generic"

  if (rol) {
    const rolLower = rol.toLowerCase().trim()
    if (rolLower === "plaintiff" || rolLower === "demandante") {
      rolKey = "plaintiff"
    } else if (rolLower === "defendant" || rolLower === "demandado") {
      rolKey = "defendant"
    } else if (rolLower === "judge" || rolLower === "juez") {
      rolKey = "judge"
    }
  }

  console.log(`Rol normalizado: "${rolKey}"`)

  // Respuesta genérica basada en el rol
  const respuestas = {
    plaintiff: `
Como abogado representando al demandante, he analizado tu caso y puedo ofrecerte las siguientes consideraciones:

1. **Análisis preliminar**: ${contextMention}basado en la información proporcionada, parece que tienes elementos para una posible reclamación. Sin embargo, necesitaríamos documentación adicional para fortalecer tu posición.

2. **Estrategia recomendada**: 
  - Recopilar toda la documentación relevante
  - Considerar una carta formal de reclamación antes de iniciar un proceso judicial
  - Evaluar la posibilidad de una negociación previa

3. **Próximos pasos**:
  - Preparar un expediente completo con todas las pruebas
  - Redactar un borrador de demanda
  - Calcular la cuantía de la indemnización que se solicitará

Recuerda que este es un análisis preliminar. Para avanzar, necesitaríamos revisar documentación adicional y detallar más aspectos del caso.
`,
    defendant: `
Como abogado representando a la parte demandada, he analizado la situación y puedo ofrecerte las siguientes consideraciones:

1. **Análisis preliminar**: ${contextMention}basado en la información proporcionada, existen varios elementos que podrían constituir una defensa sólida. Es importante identificar posibles debilidades en la reclamación del demandante.

2. **Estrategia recomendada**: 
  - Analizar detalladamente la demanda para identificar inconsistencias
  - Recopilar pruebas que contradigan las alegaciones del demandante
  - Considerar posibles contrademandas si existen fundamentos

3. **Próximos pasos**:
  - Preparar un escrito de contestación a la demanda
  - Evaluar la posibilidad de una negociación para evitar el litigio
  - Preparar una estrategia para la fase probatoria

Este análisis es preliminar y general. Para una defensa efectiva, necesitaríamos revisar la demanda completa y toda la documentación relacionada con el caso.
`,
    judge: `
Como asesor legal con perspectiva judicial, puedo ofrecer las siguientes consideraciones imparciales sobre el caso:

1. **Análisis preliminar**: ${contextMention}la información proporcionada presenta elementos que ambas partes deberán probar adecuadamente durante el proceso. Es fundamental evaluar la solidez de las pruebas y argumentos jurídicos.

2. **Consideraciones procesales**: 
  - Verificar que se cumplan todos los requisitos formales del procedimiento
  - Asegurar que ambas partes tengan oportunidad de presentar sus argumentos
  - Evaluar la aplicabilidad de jurisprudencia relevante al caso

3. **Aspectos a considerar**:
  - La carga de la prueba y cómo se distribuye entre las partes
  - Posibles soluciones alternativas al litigio
  - Precedentes judiciales en casos similares

Esta evaluación es general y preliminar. Un análisis judicial completo requeriría conocer todos los hechos probados y argumentos jurídicos de ambas partes.
`,
    generic: `
Como asistente legal, puedo ofrecer las siguientes consideraciones generales:

1. **Análisis preliminar**: ${contextMention}para cualquier caso legal, es fundamental recopilar toda la documentación relevante y establecer una cronología clara de los hechos.

2. **Recomendaciones generales**:
  - Consultar con un abogado especializado en la materia específica de tu caso
  - Mantener un registro ordenado de todas las comunicaciones y documentos
  - Considerar métodos alternativos de resolución de conflictos antes de iniciar un litigio

3. **Consideraciones importantes**:
  - Los plazos legales son críticos y su incumplimiento puede afectar seriamente tu caso
  - La carga de la prueba varía según el tipo de procedimiento
  - La transparencia y honestidad con tu representante legal es esencial

Para un análisis más detallado, sería necesario conocer los detalles específicos de tu situación legal.
`,
  }

  // Obtener la respuesta según el rol normalizado
  const respuesta = respuestas[rolKey as keyof typeof respuestas]
  console.log(`Devolviendo respuesta simulada para rol: "${rolKey}"`)

  return respuesta
}

// Función para extraer palabras clave del contexto
function extractKeywords(contexto: string): string[] {
  if (!contexto || contexto.length < 10) return []

  // Lista de palabras legales comunes para buscar en el contexto
  const legalKeywords = [
    "contrato",
    "demanda",
    "juicio",
    "sentencia",
    "recurso",
    "apelación",
    "herencia",
    "testamento",
    "propiedad",
    "alquiler",
    "arrendamiento",
    "divorcio",
    "custodia",
    "pensión",
    "indemnización",
    "despido",
    "accidente",
    "lesiones",
    "daños",
    "perjuicios",
    "incumplimiento",
    "deuda",
    "préstamo",
    "hipoteca",
    "impuestos",
    "fiscal",
    "sociedad",
    "empresa",
    "mercantil",
    "laboral",
    "administrativo",
  ]

  // Buscar palabras clave en el contexto
  const foundKeywords = legalKeywords.filter((keyword) => contexto.toLowerCase().includes(keyword.toLowerCase()))

  // Limitar a máximo 3 palabras clave
  return foundKeywords.slice(0, 3)
}

