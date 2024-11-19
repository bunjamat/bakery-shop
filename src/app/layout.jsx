// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sweet Bakery Shop',
  description: 'ร้านเบเกอรี่ออนไลน์ที่อร่อยที่สุด',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto p-4 mb-14">
          {children}
        </main>
        <footer className="bg-orange-100 p-4 mt-8  fixed bottom-0 w-full">
          <div className="container mx-auto text-center text-orange-800">
            © 2024 Sweet Bakery Shop
          </div>
        </footer>
      </body>
    </html>
  )
}