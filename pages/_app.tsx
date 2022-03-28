import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </NextUIProvider>
  )
}

export default MyApp
