import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: 'https://xlafgkujgoaelkhxzzpo.supabase.co',
      supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWZna3VqZ29hZWxraHh6enBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3Mzc2NzAsImV4cCI6MjAwMDMxMzY3MH0.TDJjcR6Hi6a38uZ8EBBGtEja8mJ6_Yh0Q2u3OvXku-I',
    })
  )

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </SessionContextProvider>
    </ThemeProvider>
  )
}
