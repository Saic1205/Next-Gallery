"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSession } from "../lib/client/session";
import { useRouter, usePathname } from "next/navigation";
import { toast } from 'react-toastify';

type SessionContextType = {
  session: any | null;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const sessionData = await fetchSession();
      setSession(sessionData);
      setLoading(false);

      if (sessionData) {
        // If there's an active session
        if (pathname === '/login' || pathname === '/signup') {
          // Redirect to gallery if trying to access login or signup
          toast.info('You are already logged in.');
          router.push('/gallery');
        }
      } else {
        // If there's no active session
        if (!["/", "/login", "/signup"].includes(pathname)) {
          // Redirect to login for protected routes
          router.push("/login");
        }
      }
    };

    getSession();
  }, [router, pathname]);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
}