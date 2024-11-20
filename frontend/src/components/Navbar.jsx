"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import Image from "next/image";

function CartCounter() {
  const getTotalItems = useCart((state) => state.getTotalItems);
  const items = useCart((state) => state.items);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [items]);

  const totalItems = getTotalItems();

  useEffect(() => {
    setCartItems(totalItems);
  }, [totalItems]);

  return cartItems > 0 ? (
    <span
      className={`inline-block transition-transform duration-300 ${
        isUpdating ? "scale-125" : "scale-100"
      }`}
    >
      ({cartItems})
    </span>
  ) : null;
}

export default function Navbar() {
  return (
    <nav className="bg-orange-500 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold flex gap-2 items-center"
        >
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={70}
            height={70}
            className="rounded-full"
          />{" "}
          Sweet Bakery
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-white hover:text-orange-200">
            หน้าแรก
          </Link>
          <Link href="/products" className="text-white hover:text-orange-200">
            สินค้า
          </Link>
          <Link href="/cart" className="text-white hover:text-orange-200">
            🛒 ตะกร้า <CartCounter />
          </Link>
        </div>
      </div>
    </nav>
  );
}
