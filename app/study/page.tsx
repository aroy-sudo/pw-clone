import Link from "next/link"
import { ExamCountdown } from "@/components/ExamCountdown"
import { ConsistencyHeatmap } from "@/components/ConsistencyHeatmap"

const quickLinks = [
  {
    title: "Flashcard Generator",
    description: "Upload a PDF and generate AI-powered flashcards instantly",
    href: "/study/flashcards",
    emoji: "🗂️",
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Doubt Solver",
    description: "Get Socratic guidance on JEE/NEET problems — no spoon-feeding",
    href: "/study/doubt-solver",
    emoji: "🤔",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Rewards Store",
    description: "Redeem your study points for avatars, themes, and boosts",
    href: "/store",
    emoji: "🏪",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
]

export default function StudyDashboard() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Study Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Track your progress and access study tools
          </p>
        </div>

        <div className="space-y-8">
          {/* Exam Countdown */}
          <ExamCountdown />

          {/* Consistency Heatmap */}
          <ConsistencyHeatmap />

          {/* Quick Access Cards */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Quick Access</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group rounded-2xl border bg-gradient-to-br ${link.gradient} p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <span className="text-3xl">{link.emoji}</span>
                  <h3 className="mt-3 text-base font-semibold group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
