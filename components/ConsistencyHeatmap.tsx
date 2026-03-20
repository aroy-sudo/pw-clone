"use client"

import { useMemo, useState, useEffect } from "react"
import { ActivityCalendar } from "react-activity-calendar"
import { generateDummyActivityData, getTotalSessions } from "@/lib/dummyActivityData"

export function ConsistencyHeatmap() {
  const [isMounted, setIsMounted] = useState(false)
  const data = useMemo(() => generateDummyActivityData(), [])
  const totalSessions = useMemo(() => getTotalSessions(data), [data])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Study Consistency</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">...</span>{" "}
            sessions in the last year
          </p>
        </div>

        <div className="overflow-x-auto min-h-[140px]" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Study Consistency</h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{totalSessions}</span>{" "}
          sessions in the last year
        </p>
      </div>

      <div className="overflow-x-auto min-h-[140px]">
        <ActivityCalendar
          data={data}
          theme={{
            dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          }}
          blockSize={13}
          blockMargin={3}
          fontSize={13}
        />
      </div>
    </div>
  )
}
