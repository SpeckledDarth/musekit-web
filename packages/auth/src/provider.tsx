"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { User, Provider } from "@supabase/supabase-js";
import { createBrowserClient } from "./clients";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: Provider) => Promise<{ error: Error | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  redirectTo?: string;
}

export function AuthProvider({ children, redirectTo }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseRef = useRef<ReturnType<typeof createBrowserClient> | null>(null);

  if (typeof window !== "undefined" && !supabaseRef.current) {
    try {
      supabaseRef.current = createBrowserClient();
    } catch {
      // Supabase env vars not configured yet
    }
  }

  const supabase = supabaseRef.current;

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase, redirectTo]
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, [supabase]);

  const signInWithOAuth = useCallback(
    async (provider: Provider) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase, redirectTo]
  );

  const signInWithMagicLink = useCallback(
    async (email: string) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase, redirectTo]
  );

  const resetPassword = useCallback(
    async (email: string) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo ? `${redirectTo}/update-password` : undefined,
      });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase, redirectTo]
  );

  const updatePassword = useCallback(
    async (password: string) => {
      if (!supabase) return { error: new Error("Supabase not initialized") };
      const { error } = await supabase.auth.updateUser({ password });
      return { error: error ? new Error(error.message) : null };
    },
    [supabase]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithOAuth,
        signInWithMagicLink,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
