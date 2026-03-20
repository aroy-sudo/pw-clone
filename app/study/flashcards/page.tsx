"use client"

import { useState } from "react"
import { FlashcardDropzone } from "@/components/FlashcardDropzone"
import { FlashcardViewer } from "@/components/FlashcardViewer"
import type { Flashcard } from "@/lib/schemas/flashcard"

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([])

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h10" />
              <path d="M7 12h10" />
              <path d="M7 17h10" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcard Generator</h1>
          <p className="mt-2 text-muted-foreground">
            Upload a PDF and let AI create study flashcards for you
          </p>
        </div>

        {/* Main content */}
        {cards.length === 0 ? (
          <FlashcardDropzone onCardsGenerated={setCards} />
        ) : (
          <div className="space-y-8">
            <FlashcardViewer cards={cards} />
            <div className="text-center">
              <button
                onClick={() => setCards([])}
                className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
              >
                ← Upload a different PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
