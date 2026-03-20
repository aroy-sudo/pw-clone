import { login, signup } from '@/app/actions/auth'

export default function LoginPage(props: { searchParams: { message: string } }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-950">
            <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Access Portal</h2>
                    <p className="mt-2 text-sm text-zinc-400">Sign in to your account or create a new one.</p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Render errors if auth fails */}
                    {props.searchParams?.message && (
                        <p className="text-sm text-red-500 text-center bg-red-500/10 p-2 rounded">{props.searchParams.message}</p>
                    )}

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            formAction={login}
                            className="flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 focus:outline-none"
                        >
                            Sign In
                        </button>
                        <button
                            formAction={signup}
                            className="flex w-full justify-center rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 focus:outline-none"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}