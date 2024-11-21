import Image from "next/image";
import { getFormattedPrice, useCart } from "@/hooks/useCart";
import {
  Typography,
  Button,
  Badge,
  Tooltip,
} from "@material-tailwind/react";
import { ShoppingCart, AlertCircle } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();

  const currentQuantityInCart =
    items.find((item) => item.id === product.id)?.quantity || 0;

  const canAddMore = currentQuantityInCart < product.stock_quantity;

  const stockStatus = () => {
    const remainingStock = product.stock_quantity - currentQuantityInCart;
    if (remainingStock === 0) return { 
      color: "bg-red-100 text-red-700", 
      text: "สินค้าหมด" 
    };
    if (remainingStock <= 5) return { 
      color: "bg-amber-100 text-amber-700", 
      text: "เหลือน้อย" 
    };
    return { 
      color: "bg-green-100 text-green-700", 
      text: "พร้อมจำหน่าย" 
    };
  };

  const { color: statusColor, text: statusText } = stockStatus();

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden !font-mali hover:border-orange-200 transition-colors">
      <div className="relative h-80">
        <div className={`absolute top-2 left-2 z-10 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {statusText}
        </div>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-mali">
            {product.name}
          </Typography>
          <Typography color="orange" className="flex gap-1 font-bold">
            {getFormattedPrice(product.price)}
          </Typography>
        </div>

        <Typography color="gray" className="line-clamp-2 font-normal">
          {product.description}
        </Typography>

        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              {currentQuantityInCart > 0 && (
                <Tooltip content="จำนวนในตะกร้า">
                  <Badge content={currentQuantityInCart} color="orange">
                    <ShoppingCart className="h-5 w-5" />
                  </Badge>
                </Tooltip>
              )}
            </div>

            <Button
              size="sm"
              disabled={!canAddMore}
              onClick={() => canAddMore && addToCart(product)}
              className={`flex items-center gap-2 ${
                !canAddMore 
                  ? "bg-gray-300" 
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {canAddMore ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  เพิ่มลงตะกร้า
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  สินค้าหมด
                </>
              )}
            </Button>
          </div>

          {product.stock_quantity <= 5 && (
            <Typography
              variant="small"
              color="red"
              className="flex items-center gap-1 mt-2"
            >
              <AlertCircle className="h-4 w-4" />
              เหลือสินค้าอีก {product.stock_quantity} ชิ้น
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}