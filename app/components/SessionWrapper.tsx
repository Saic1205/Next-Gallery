"use client";
import { fetchSession } from "../lib/client/session";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const sessionData = await fetchSession();
      setSession(sessionData);
      setLoading(false);
      if (sessionData === null && !["/", "/login", "/signup"].includes(pathname)) {
        router.push("/login");
      }
    };

    getSession();
  }, [router, pathname]);

  if (loading) {
    return <Loading/>;
  }

  console.log("Session in SessionWrapper:", session); // Debugging line

  return (
    <>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { session } as { session: any }) 
          : child
      )}
    </>
  );
}
