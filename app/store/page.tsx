"use client"

import { usePoints } from "@/context/PointsContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const storeItems = [
  {
    id: "avatar-astronaut",
    name: "Astronaut Avatar",
    description: "Stand out with a premium space-themed profile avatar",
    cost: 500,
    category: "Avatar",
    emoji: "🧑‍🚀",
  },
  {
    id: "avatar-ninja",
    name: "Ninja Avatar",
    description: "A stealthy ninja avatar for the silent grinder",
    cost: 500,
    category: "Avatar",
    emoji: "🥷",
  },
  {
    id: "theme-midnight",
    name: "Midnight Theme",
    description: "Ultra-dark AMOLED theme for late-night study sessions",
    cost: 750,
    category: "Theme",
    emoji: "🌙",
  },
  {
    id: "theme-ocean",
    name: "Ocean Theme",
    description: "Calm blue gradient theme for focused studying",
    cost: 750,
    category: "Theme",
    emoji: "🌊",
  },
  {
    id: "boost-streak",
    name: "Streak Shield",
    description: "Protect your study streak for one missed day",
    cost: 300,
    category: "Boost",
    emoji: "🛡️",
  },
  {
    id: "boost-2x",
    name: "2× Point Multiplier",
    description: "Double your points earned for 24 hours",
    cost: 1000,
    category: "Boost",
    emoji: "⚡",
  },
  {
    id: "badge-gold",
    name: "Gold Scholar Badge",
    description: "A prestigious badge displayed on your profile",
    cost: 1200,
    category: "Badge",
    emoji: "🏅",
  },
  {
    id: "boost-hint",
    name: "Hint Token (×5)",
    description: "Get 5 extra hints in practice tests",
    cost: 400,
    category: "Boost",
    emoji: "💡",
  },
]

export default function StorePage() {
  const { points, deductPoints } = usePoints()

  const handleRedeem = (item: (typeof storeItems)[number]) => {
    const success = deductPoints(item.cost)
    if (success) {
      toast.success(`Redeemed "${item.name}"!`, {
        description: `${item.cost} points deducted from your balance.`,
      })
    } else {
      toast.error("Not enough points!", {
        description: `You need ${item.cost - points} more points to redeem this item.`,
      })
    }
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rewards Store</h1>
            <p className="mt-1 text-muted-foreground">
              Redeem your study points for avatars, themes, and boosts
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border bg-card px-5 py-3 shadow-sm">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Balance</p>
              <p className="text-xl font-bold tabular-nums">{points.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {storeItems.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{item.emoji}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm font-bold tabular-nums">
                  {item.cost.toLocaleString()} pts
                </span>
                <Button
                  size="sm"
                  onClick={() => handleRedeem(item)}
                  disabled={points < item.cost}
                  className="transition-all active:scale-95"
                >
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
