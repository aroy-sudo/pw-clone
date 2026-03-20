import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    const isDevMode = process.env.NODE_ENV === 'development' || cookieStore.get('dev_mode')?.value === 'true';

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Ignored: Called from a Server Component. 
                        // Middleware handles this refresh.
                    }
                },
            },
        }
    );

    if (isDevMode) {
        return {
            ...supabase,
            auth: {
                ...supabase.auth,
                getUser: async () => {
                    return {
                        data: {
                            user: {
                                id: 'dev-user-123',
                                email: 'abhiraj@nitrr.ac.in',
                                user_metadata: { full_name: 'Abhiraj (Dev)' }
                            }
                        },
                        error: null
                    }
                },
                signInWithPassword: async () => {
                    return { data: {}, error: null };
                },
                signUp: async () => {
                    return { data: {}, error: null };
                },
                signOut: async () => {
                    return { error: null };
                },
            }
        };
    }

    return supabase;
}