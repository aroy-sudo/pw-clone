import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/actions/auth'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="w-full border-b border-zinc-800 bg-zinc-950 px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white tracking-tighter">
                    Antigravity<span className="text-blue-500">IDE</span>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <form action={signout}>
                                <button className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}