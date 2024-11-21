// src/app/layout.js
import { Mali } from "next/font/google";
import "./globals.css";

import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mali = Mali({
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-mali",
});

export const metadata = {
  title: "Sweet Bakery Shop",
  description: "ร้านเบเกอรี่ออนไลน์ที่อร่อยที่สุด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${mali.variable}`}>
      <body>
        <Header />
        <main className="container mx-auto p-4 mb-14">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}
