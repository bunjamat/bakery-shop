"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/useCart";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { items } = useCart();
  console.log("🚀 ~ ProductsPage ~ items:", items)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>

      {/* Filter Categories */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "all"
              ? "bg-orange-500 text-white"
              : "bg-orange-100"
          }`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => setSelectedCategory("bread")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "bread"
              ? "bg-orange-500 text-white"
              : "bg-orange-100"
          }`}
        >
          ขนมปัง
        </button>
        <button
          onClick={() => setSelectedCategory("cake")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "cake"
              ? "bg-orange-500 text-white"
              : "bg-orange-100"
          }`}
        >
          เค้ก
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter(
            (product) =>
              selectedCategory === "all" ||
              product.category === selectedCategory
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "เค้กช็อกโกแลต",
    price: 450.0,
    image_url: "/images/chocolate-cake.webp",
    category_id: 1,
    description: "เค้กช็อกโกแลตเนื้อนุ่ม หอมกลิ่นโกโก้แท้",
    is_available: 1,
    stock_quantity: 10,
  },
  {
    id: 2,
    name: "เค้กวานิลลา",
    price: 400.0,
    image_url: "/images/vanilla-cake.webp",
    category_id: 1,
    description: "เค้กวานิลลาเนื้อนุ่มละมุน",
    is_available: 1,
    stock_quantity: 0,
  },
  {
    id: 3,
    name: "เค้กส้ม",
    price: 420.0,
    image_url: "/images/orange-cake.webp",
    category_id: 1,
    description: "เค้กเนื้อนุ่มหอมกลิ่นส้มสดจากธรรมชาติ",
    is_available: 1,
    stock_quantity: 0,
  },
  {
    id: 4,
    name: "เค้กเรดเวลเวท",
    price: 480.0,
    image_url: "/images/red-velvet.webp",
    category_id: 1,
    description: "เค้กสีแดงสวยงาม พร้อมครีมชีสนุ่มละมุน",
    is_available: 1,
    stock_quantity: 12,
  },
  {
    id: 5,
    name: "ขนมปังโฮลวีต",
    price: 45.0,
    image_url: "/images/wheat-bread.webp",
    category_id: 2,
    description: "ขนมปังโฮลวีตเพื่อสุขภาพ",
    is_available: 1,
    stock_quantity: 20,
  },
  {
    id: 6,
    name: "ขนมปังชีสกระเทียม",
    price: 55.0,
    image_url: "/images/cheese-garlic-bread.webp",
    category_id: 2,
    description: "ขนมปังกระเทียมสอดไส้ชีส หอมกรุ่น",
    is_available: 1,
    stock_quantity: 25,
  },
  {
    id: 7,
    name: "ขนมปังนมสด",
    price: 35.0,
    image_url: "/images/milk-bread.webp",
    category_id: 2,
    description: "ขนมปังเนื้อนุ่ม หอมกลิ่นนมสด",
    is_available: 1,
    stock_quantity: 30,
  },
  {
    id: 8,
    name: "ขนมปังไส้ครีมคัสตาร์ด",
    price: 40.0,
    image_url: "/images/custard-bread.webp",
    category_id: 2,
    description: "ขนมปังสอดไส้ครีมคัสตาร์ดสูตรพิเศษ",
    is_available: 1,
    stock_quantity: 18,
  },
  {
    id: 9,
    name: "คุกกี้ช็อกโกแลตชิพ",
    price: 35.0,
    image_url: "/images/choc-chip-cookie.webp",
    category_id: 3,
    description: "คุกกี้หอมกรุ่น เต็มไปด้วยช็อกโกแลตชิพ",
    is_available: 1,
    stock_quantity: 40,
  },
  {
    id: 10,
    name: "คุกกี้อัลมอนด์",
    price: 45.0,
    image_url: "/images/almond-cookie.webp",
    category_id: 3,
    description: "คุกกี้อัลมอนด์กรอบ หอมกลิ่นเนยสด",
    is_available: 1,
    stock_quantity: 35,
  },
  {
    id: 11,
    name: "คุกกี้โอตมีล",
    price: 40.0,
    image_url: "/images/oatmeal-cookie.webp",
    category_id: 3,
    description: "คุกกี้โอตมีลเพื่อสุขภาพ หวานน้อย",
    is_available: 1,
    stock_quantity: 30,
  },
  {
    id: 12,
    name: "คุกกี้แมคคาเดเมีย",
    price: 50.0,
    image_url: "/images/macadamia-cookie.webp",
    category_id: 3,
    description: "คุกกี้สอดไส้แมคคาเดเมียนัท",
    is_available: 1,
    stock_quantity: 25,
  },
  {
    id: 13,
    name: "ครัวซองต์เนย",
    price: 65.0,
    image_url: "/images/croissant.webp",
    category_id: 4,
    description: "ครัวซองต์เนยสไตล์ฝรั่งเศสแท้",
    is_available: 1,
    stock_quantity: 25,
  },
  {
    id: 14,
    name: "ครัวซองต์อัลมอนด์",
    price: 75.0,
    image_url: "/images/almond-croissant.webp",
    category_id: 4,
    description: "ครัวซองต์สอดไส้ครีมอัลมอนด์ โรยด้วยอัลมอนด์สไลด์",
    is_available: 1,
    stock_quantity: 20,
  },
  {
    id: 15,
    name: "ครัวซองต์ช็อกโกแลต",
    price: 70.0,
    image_url: "/images/chocolate-croissant.webp",
    category_id: 4,
    description: "ครัวซองต์สอดไส้ช็อกโกแลตเบลเยียม",
    is_available: 1,
    stock_quantity: 22,
  },
];
