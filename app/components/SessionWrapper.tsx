"use client";
import { SessionProvider, useSession } from "../Context/sessionContext";
import Loading from "../loading";

function SessionContent({ children }: { children: React.ReactNode }) {
  const { loading } = useSession();

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionContent>{children}</SessionContent>
    </SessionProvider>
  );
}