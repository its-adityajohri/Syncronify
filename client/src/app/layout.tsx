import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { AuthProvider } from '@/context/AuthContext'
import ContextWrapper from './contextWrapper'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Syncronify',
  description: 'An emerging platform for management of your all Events.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head >
      <link
        rel="icon"
        href="/icons/sample-icon.svg"
        type="image/<generated>"
        sizes="<generated>"
/>
      </Head>
      <body className={inter.className}>
        <ContextWrapper>
        {children}
        </ContextWrapper>
      </body>
    </html>
  )
}
