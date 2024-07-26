'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        // staleTime: 6 * 1000,
        // refetchInterval: 6 * 1000,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton />
      {children}
    </QueryClientProvider>
  )
}
