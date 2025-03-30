export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: {
    name: string
    type: string
    content?: string
    originalFile?: File
  }[]
}

