'use client'
import { useGlobalContext } from '@/lib/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Toaster } from '@/components/ui/sonner'

export default function Provider({ children, ...props }: ThemeProviderProps) {
  const { state: { token } } = useGlobalContext()
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  }))

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accept'] = 'application/json'

  axios.interceptors.request.use(
    (config: any) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <Toaster richColors closeButton />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
