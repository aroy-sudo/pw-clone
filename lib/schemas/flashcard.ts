import { z } from "zod"

export const flashcardSchema = z.object({
  cards: z.array(
    z.object({
      front: z.string().describe("The question or prompt side of the flashcard"),
      back: z.string().describe("The answer or explanation side of the flashcard"),
    })
  ),
})

export type FlashcardSet = z.infer<typeof flashcardSchema>
export type Flashcard = FlashcardSet["cards"][number]
