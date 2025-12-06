"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Use useMemo to ensure QueryClient is created only once
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 1 minute to reduce unnecessary refetches
            staleTime: 60 * 1000, // 1 minute
            // Allow refetch on window focus for fresh data, but respect staleTime
            refetchOnWindowFocus: true,
          },
        },
      }),
    []
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}
