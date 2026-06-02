import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Safe client fallback to prevent build crashes in environments (e.g. CI/CD or Vercel) without env variables
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({}, {
      get: (target, prop) => {
        // Return dummy methods that resolve safely to prevent build crashes
        if (prop === 'from') {
          return () => ({
            select: () => ({
              eq: () => Promise.resolve({ data: null, error: null }),
              order: () => Promise.resolve({ data: null, error: null }),
              limit: () => Promise.resolve({ data: null, error: null })
            }),
            insert: () => Promise.resolve({ data: null, error: null }),
            update: () => Promise.resolve({ data: null, error: null }),
            delete: () => Promise.resolve({ data: null, error: null })
          });
        }
        return () => Promise.resolve({ data: null, error: null });
      }
    });
