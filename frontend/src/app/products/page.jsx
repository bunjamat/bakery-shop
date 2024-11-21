"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/prducts";
import SearchBar from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetcher } from "@/lib/fetch";

const caterories = [
  { id: 1, name: "เค้ก" },
  { id: 2, name: "ขนมปัง" },
  { id: 3, name: "คุกกี้" },
  { id: 4, name: "ครัวซองต์" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products, isLoading } = useSWR("/products", fetcher);

  // throw new Error("Function not implemented.");

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      <SearchBar />
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

        {caterories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.name
                ? "bg-orange-500 text-white"
                : "bg-orange-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products?.data
          ?.filter(
            (product) =>
              selectedCategory === "all" ||
              product.category_name === selectedCategory
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
