// src/app/layout.js
import { Mali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    <html lang="th">
      <body className={maliFont.className}>
        <Navbar />
        <main className="container mx-auto p-4 mb-14">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <footer className="bg-orange-100 p-4 mt-8  fixed bottom-0 w-full">
          <div className="container mx-auto text-center text-orange-800">
            © 2024 Sweet Bakery Shop
          </div>
        </footer>
      </body>
    </html>
  );
}
