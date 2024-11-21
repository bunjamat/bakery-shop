// src/app/layout.js
import { Mali } from "next/font/google";
import "./globals.css";

import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeProvider from "@/components/ThemeProvider";
import MaterialTailwindProvider from "@/components/providers/MaterialTailwindProvider";
import NavbarComponent from "@/components/Navbar";

const maliFont = Mali({
  subsets: ["thai"],
  weight: ["400", "500", "700"], // or alternatively use numbers: [400, 700]
});

export const metadata = {
  title: "Sweet Bakery Shop",
  description: "ร้านเบเกอรี่ออนไลน์ที่อร่อยที่สุด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${maliFont.className} dark:bg-gray-900 dark:text-white transition-colors`}>
      <MaterialTailwindProvider>
          <NavbarComponent />
          <main className="container mx-auto p-4 mb-14">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <footer className="bg-orange-100 dark:bg-gray-800 p-4 mt-8 fixed bottom-0 w-full">
            <div className="container mx-auto text-center text-orange-800 dark:text-orange-200">
              © 2024 Sweet Bakery Shop
            </div>
          </footer>
        </MaterialTailwindProvider>
      </body>
    </html>
  );
}
