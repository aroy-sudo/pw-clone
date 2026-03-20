"use server"

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
// pdf-parse is a CommonJS module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse")
import { flashcardSchema } from "@/lib/schemas/flashcard"

export async function generateFlashcards(formData: FormData) {
  const file = formData.get("file") as File | null
  if (!file) {
    throw new Error("No file uploaded")
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const pdf = await pdfParse(buffer)
  const text = pdf.text.slice(0, 15000) // Limit to ~15k chars for token budget

  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: flashcardSchema,
    prompt: `You are an expert study assistant. Analyze the following text from a PDF document and create a set of high-quality flashcards for studying.

Rules:
- Create between 5 and 15 flashcards depending on content density
- Each card's "front" should be a clear, specific question
- Each card's "back" should be a concise but complete answer
- Focus on key concepts, definitions, formulas, and important facts
- Use LaTeX notation (wrapped in $...$) for any mathematical expressions
- Make cards that test understanding, not just recall

Text to analyze:
${text}`,
  })

  return object.cards
}
