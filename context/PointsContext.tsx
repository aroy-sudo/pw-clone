"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface PointsContextType {
  points: number
  deductPoints: (amount: number) => boolean
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(2500)

  const deductPoints = useCallback((amount: number) => {
    let success = false
    setPoints((prev) => {
      if (prev >= amount) {
        success = true
        return prev - amount
      }
      return prev
    })
    return success
  }, [])

  return (
    <PointsContext.Provider value={{ points, deductPoints }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider")
  }
  return context
}
