"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Flashcard } from "@/lib/schemas/flashcard"
import { cn } from "@/lib/utils"

interface FlashcardViewerProps {
  cards: Flashcard[]
}

export function FlashcardViewer({ cards }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const card = cards[currentIndex]

  const goToPrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false)
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Card counter */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Card {currentIndex + 1} of {cards.length}
        </span>
        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFlipped(false)
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Flashcard with 3D flip */}
      <div
        className="relative w-full max-w-lg cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="relative h-72 w-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card p-8 shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  Question
                </span>
                <p className="text-center text-lg font-medium leading-relaxed">
                  {card.front}
                </p>
                <span className="mt-6 text-xs text-muted-foreground">
                  Click to reveal answer
                </span>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-primary/5 p-8 shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  Answer
                </span>
                <p className="text-center text-base leading-relaxed">
                  {card.back}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200",
            currentIndex === 0
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-muted hover:shadow-md active:scale-95"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleFlip}
          className="rounded-xl border bg-muted/50 px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted hover:shadow-md active:scale-95"
        >
          {isFlipped ? "Show Question" : "Show Answer"}
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200",
            currentIndex === cards.length - 1
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-muted hover:shadow-md active:scale-95"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
