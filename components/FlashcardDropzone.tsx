"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { generateFlashcards } from "@/app/study/flashcards/actions"
import type { Flashcard } from "@/lib/schemas/flashcard"
import { cn } from "@/lib/utils"

interface FlashcardDropzoneProps {
  onCardsGenerated: (cards: Flashcard[]) => void
}

export function FlashcardDropzone({ onCardsGenerated }: FlashcardDropzoneProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsLoading(true)
      setError(null)
      setFileName(file.name)

      try {
        const formData = new FormData()
        formData.append("file", file)
        const cards = await generateFlashcards(formData)
        onCardsGenerated(cards)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to generate flashcards")
      } finally {
        setIsLoading(false)
      }
    },
    [onCardsGenerated]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: isLoading,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
        isLoading && "pointer-events-none opacity-60"
      )}
    >
      <input {...getInputProps()} />

      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold">Generating flashcards…</p>
            <p className="text-sm text-muted-foreground mt-1">
              Analyzing <span className="font-medium">{fileName}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {isDragActive ? "Drop your PDF here" : "Drag & drop a PDF"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse • PDF files only
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}
