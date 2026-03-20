"use client"

import { useState, useEffect } from "react"

const TARGET_DATE = new Date("2026-01-28T09:00:00+05:30")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = TARGET_DATE.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  const isExamPassed = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-primary/5 p-8 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">JEE Mains 2026</h2>
        <p className="text-sm text-muted-foreground">January 28, 2026</p>
      </div>

      {isExamPassed ? (
        <div className="text-center py-4">
          <p className="text-2xl font-bold text-primary">Exam Day Has Arrived! 🎯</p>
          <p className="text-sm text-muted-foreground mt-2">You&apos;ve got this!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {blocks.map((block) => (
            <div key={block.label} className="text-center">
              <div className="relative rounded-xl border bg-card px-2 py-4 shadow-sm">
                <span className="text-3xl font-bold tabular-nums tracking-tight md:text-4xl">
                  {String(block.value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
