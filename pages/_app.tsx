import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider, QueryClient } from 'react-query';

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
      </QueryClientProvider>

  )
}

export default MyApp
