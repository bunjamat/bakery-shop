import Image from "next/image";
import { getFormattedPrice, useCart } from "@/hooks/useCart";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
  Tooltip,
} from "@material-tailwind/react";
import { ShoppingCart, AlertCircle } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();

  // ตรวจสอบจำนวนในตะกร้าปัจจุบัน
  const currentQuantityInCart =
    items.find((item) => item.id === product.id)?.quantity || 0;

  // ตรวจสอบว่ายังสามารถเพิ่มได้อีกไหม
  const canAddMore = currentQuantityInCart < product.stock_quantity;

  // คำนวณสถานะสินค้าคงเหลือ
  const stockStatus = () => {
    const remainingStock = product.stock_quantity - currentQuantityInCart;
    if (remainingStock === 0) return { color: "red", text: "สินค้าหมด" };
    if (remainingStock <= 5) return { color: "amber", text: "เหลือน้อย" };
    return { color: "green", text: "พร้อมจำหน่าย" };
  };

  const { color: stockColor, text: stockText } = stockStatus();

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        floated={false} 
        className="relative h-80 m-0"
      >
        <Badge
          content={stockText}
          color={stockColor}
          className="absolute top-4 right-4 z-10"
        />
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </CardHeader>

      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {product.name}
          </Typography>
          <Typography 
            color="orange" 
            className="flex gap-1 font-bold"
          >
            {getFormattedPrice(product.price)}
          </Typography>
        </div>

        <Typography
          color="gray"
          className="line-clamp-2 font-normal"
        >
          {product.description}
        </Typography>
      </CardBody>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between">
          {currentQuantityInCart > 0 && (
            <Tooltip content="จำนวนในตะกร้า">
              <Badge 
                content={currentQuantityInCart}
                color="orange"
              >
                <ShoppingCart className="h-5 w-5" />
              </Badge>
            </Tooltip>
          )}

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
      </CardFooter>
    </Card>
  );
}