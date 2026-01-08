"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache de datos por 5 minutos
            staleTime: 1000 * 60 * 5,
            // Mantener datos en caché por 10 minutos
            gcTime: 1000 * 60 * 10,
            // Reintentar 2 veces en caso de error
            retry: 2,
            // No refetch al enfocar la ventana (para evitar requests innecesarios)
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
