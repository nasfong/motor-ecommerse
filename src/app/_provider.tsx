'use client'
import { useGlobalContext } from '@/lib/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function Provider({ children }: { children: ReactNode }) {
  const { state: { token } } = useGlobalContext()
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

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accept'] = 'application/json'

  // axios.interceptors.request.use(
  //   (config: any) => {
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //     return config
  //   },
  //   (err: any) => Promise.reject(err)
  // )
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton />
      {children}
    </QueryClientProvider>
  )
}
