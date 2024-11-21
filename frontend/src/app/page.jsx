import { products } from "@/data/prducts";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-orange-50 rounded-lg">
        <h1 className="text-4xl font-bold text-orange-800 mb-4">
          ยินดีต้อนรับสู่ Sweet Bakery
        </h1>
        <p className="text-lg text-orange-600 mb-8">
          เบเกอรี่สดใหม่ ทำด้วยใจ ส่งตรงถึงคุณ
        </p>
        <Link
          href="/products"
          className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600"
        >
          ดูสินค้าทั้งหมด
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold text-orange-800 mb-6">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg"
            >
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
              <p className="text-orange-500 font-bold">{product.price} บาท</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
