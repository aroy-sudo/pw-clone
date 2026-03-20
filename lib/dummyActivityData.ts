export interface ActivityDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

/**
 * Generates ~365 days of deterministic dummy activity data.
 * Uses a simple seeded pseudo-random to keep output stable between renders.
 */
export function generateDummyActivityData(): ActivityDay[] {
  const data: ActivityDay[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  // Simple deterministic hash
  function hash(seed: number): number {
    let h = seed
    h = ((h >> 16) ^ h) * 0x45d9f3b
    h = ((h >> 16) ^ h) * 0x45d9f3b
    h = (h >> 16) ^ h
    return Math.abs(h)
  }

  const current = new Date(oneYearAgo)
  while (current <= today) {
    const dateStr = current.toISOString().split("T")[0]
    const dayOfWeek = current.getDay()
    const seed = current.getFullYear() * 10000 + (current.getMonth() + 1) * 100 + current.getDate()
    const h = hash(seed)

    // Weekdays more likely to have activity
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5
    const activityChance = isWeekday ? 0.7 : 0.35

    let count = 0
    let level: 0 | 1 | 2 | 3 | 4 = 0

    if ((h % 100) / 100 < activityChance) {
      count = (h % 8) + 1
      if (count <= 2) level = 1
      else if (count <= 4) level = 2
      else if (count <= 6) level = 3
      else level = 4
    }

    data.push({ date: dateStr, count, level })
    current.setDate(current.getDate() + 1)
  }

  return data
}

export function getTotalSessions(data: ActivityDay[]): number {
  return data.reduce((sum, d) => sum + d.count, 0)
}
