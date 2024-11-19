import Image from "next/image";
import { useCart } from "@/lib/useCart"; // เราจะสร้างในขั้นตอนถัดไป

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();

  // ตรวจสอบจำนวนในตะกร้าปัจจุบัน
  const currentQuantityInCart =
    items.find((item) => item.id === product.id)?.quantity || 0;

  // ตรวจสอบว่ายังสามารถเพิ่มได้อีกไหม
  const canAddMore = currentQuantityInCart < product.stock_quantity;

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg">
      <div className="aspect-square relative mb-4">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-orange-500 font-bold">{product.price} บาท</p>
        <button
          onClick={() => canAddMore && addToCart(product)}
          disabled={!canAddMore}
          className={`px-4 py-2 rounded ${
            canAddMore
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {canAddMore ? "เพิ่มลงตะกร้า" : "สินค้าหมด"}
        </button>
      </div>
    </div>
  );
}
