"use client";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

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

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 font-normal text-white hover:text-orange-900 "
      >
        <Link href="/" className="flex items-center">
          หน้าแรก
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 font-normal text-white hover:text-orange-900 "
      >
        <Link href="/products" className="flex items-center">
          สินค้า
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 font-normal text-white hover:text-orange-900 "
      >
        <Link href="/cart" className="flex items-center">
          ตะกร้า <CartCounter />
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none border-none bg-orange-500 px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={70}
            height={70}
            className="rounded-full"
          />
          <Typography variant="h4" className="font-bold text-white">
            Sweet Bakery
          </Typography>
        </Link>

        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
