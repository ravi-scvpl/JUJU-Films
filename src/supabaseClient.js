import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Extremely robust client mock that handles all expected client-side database, auth, and storage calls without throwing exceptions
const createMockClient = () => {
  const dummyPromise = Promise.resolve({ data: null, error: null });
  
  const mockAuth = {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    }),
    signInWithPassword: () => dummyPromise,
    signOut: () => dummyPromise,
    signInWithOtp: () => dummyPromise,
    verifyOtp: () => dummyPromise,
  };

  const mockStorageFrom = {
    upload: () => dummyPromise,
    getPublicUrl: () => ({ data: { publicUrl: '' } }),
  };

  const mockStorage = {
    from: () => mockStorageFrom,
  };

  const mockFromChain = {
    select: () => mockFromChain,
    eq: () => mockFromChain,
    order: () => mockFromChain,
    limit: () => mockFromChain,
    insert: () => dummyPromise,
    update: () => dummyPromise,
    delete: () => dummyPromise,
    then: (resolve) => resolve({ data: null, error: null }) // allows direct await of the chain
  };

  return {
    auth: mockAuth,
    storage: mockStorage,
    from: () => mockFromChain,
  };
};

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

