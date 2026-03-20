"use client";
import Link from 'next/link'
import { BookOpen, BrainCircuit, Trophy, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LandingPage() {
  const router = useRouter();

  const handleDevAccess = () => {
    Cookies.set('dev_mode', 'true');
    router.push('/store');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-20">

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-24 mt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Don't Just Memorize.<br /> Understand.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Upload your textbooks, get instant AI flashcards, and resolve complex Physics and Math doubts with a Socratic tutor that guides you to the answer instead of just giving it.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            Start Learning <ArrowRight size={20} />
          </Link>
          <button
            onClick={handleDevAccess}
            className="flex items-center gap-2 bg-transparent border border-zinc-700 text-zinc-400 px-8 py-4 rounded-full font-bold hover:bg-zinc-800 hover:text-white transition-all"
          >
            Dev Access
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">

        {/* Feature 1 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors">
          <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="text-blue-400" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Instant Flashcards</h3>
          <p className="text-zinc-400 leading-relaxed">
            Drop your chapter PDFs here. Our AI instantly reads the material and generates high-yield revision flashcards using intelligent extraction.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors">
          <div className="bg-purple-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
            <BrainCircuit className="text-purple-400" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Socratic Doubt Solver</h3>
          <p className="text-zinc-400 leading-relaxed">
            Stuck on a JEE problem? Upload a photo. The AI won't spoon-feed you the answer—it provides step-by-step hints to help you solve it yourself.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors">
          <div className="bg-green-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
            <Trophy className="text-green-400" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Gamified Progression</h3>
          <p className="text-zinc-400 leading-relaxed">
            Maintain your daily streak on the consistency heatmap. Earn points for solving questions and redeem them in the store.
          </p>
        </div>

      </section>
    </div>
  )
}