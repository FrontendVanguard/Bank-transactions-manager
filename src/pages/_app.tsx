import type { AppProps } from 'next/app'
import Head from 'next/head'

import GlobalStyles from '@/globalStyles'
import { DataProvider } from '@/contexts/DataContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bank Transactions</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </QueryClientProvider>
    </>
  )
}
