"use client";
import { useCart } from "@/lib/useCart";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total: getTotal(),
          customerInfo: {
            // ในโปรเจคจริงควรเพิ่มข้อมูลลูกค้าที่นี่
          },
        }),
      });

      if (response.ok) {
        alert("สั่งซื้อสำเร็จ!");
        clearCart();
      } else {
        throw new Error("เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้าว่างเปล่า</h2>
        <p className="text-gray-600 mb-4">กรุณาเลือกสินค้าที่ต้องการก่อน</p>
        <a href="/products" className="text-orange-500 hover:text-orange-600">
          กลับไปเลือกสินค้า
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า</h1>

      {/* รายการสินค้า */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-lg p-4"
          >
            <div className="relative w-24 h-24">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.price} บาท</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      {/* สรุปยอด */}
      <div className="bg-orange-50 rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <span>ยอดรวม</span>
          <span className="font-bold">{getTotal()} บาท</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          {isCheckingOut ? "กำลังดำเนินการ..." : "ยืนยันการสั่งซื้อ"}
        </button>
      </div>
    </div>
  );
}
