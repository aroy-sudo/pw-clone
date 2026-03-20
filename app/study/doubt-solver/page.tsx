import { SocraticChat } from "@/components/SocraticChat"

export default function DoubtSolverPage() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Doubt Solver</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Socratic tutor — I&apos;ll guide you to the answer, not give it away
          </p>
        </div>

        <SocraticChat />
      </div>
    </div>
  )
}
