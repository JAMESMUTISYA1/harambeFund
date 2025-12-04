import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import ReactQueryProvider from '@/providers/ReactQueryProvider'  // ✅ import

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Harambee - Donate for Kenya',
  description: 'Support Kenyan harambees and make a difference in your community',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
