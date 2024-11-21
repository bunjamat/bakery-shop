"use client";
import { useCart, getFormattedPrice } from "@/hooks/useCart";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Input,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  ShoppingBasket,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(itemId, newQuantity);
    }
  };

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
          customerInfo: {},
        }),
      });

      if (response.ok) {
        setShowAlert({
          show: true,
          message: 'สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ',
          type: 'success'
        });
        clearCart();
      } else {
        throw new Error("เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    } catch (error) {
      setShowAlert({
        show: true,
        message: error.message,
        type: 'error'
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="max-w-lg mx-auto mt-12">
        <CardBody className="text-center">
          <ShoppingBasket className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            ตะกร้าสินค้าว่างเปล่า
          </Typography>
          <Typography color="gray" className="mb-6">
            กรุณาเลือกสินค้าที่ต้องการก่อน
          </Typography>
          <Link href="/products">
            <Button
              variant="gradient"
              color="orange"
              className="flex items-center gap-2 mx-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              กลับไปเลือกสินค้า
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showAlert.show && (
        <Alert
          color={showAlert.type === 'success' ? "green" : "red"}
          icon={<AlertCircle className="w-4 h-4" />}
          dismissible
          onClose={() => setShowAlert({ show: false })}
          className="mb-4"
        >
          {showAlert.message}
        </Alert>
      )}

      <Typography variant="h3" className="mb-6">
        ตะกร้าสินค้า
      </Typography>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <CardBody className="flex items-center gap-4 p-0">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  priority
                  sizes="96px"
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1">
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="orange" className="font-bold">
                  {getFormattedPrice(item.price)}
                </Typography>
              </div>

              <div className="flex items-center gap-2">
                <IconButton
                  variant="text"
                  color="orange"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </IconButton>
                
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="!w-16 text-center"
                  containerProps={{ className: "!min-w-0" }}
                />

                <IconButton
                  variant="text"
                  color="orange"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </IconButton>
              </div>

              <IconButton
                variant="text"
                color="red"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </IconButton>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="bg-orange-50">
        <CardBody>
          <div className="flex justify-between mb-4">
            <Typography>ยอดรวม</Typography>
            <Typography className="font-bold">
              {getFormattedPrice(getTotal())}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            size="lg"
            variant="gradient"
            color="orange"
            fullWidth
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="flex items-center justify-center gap-2"
          >
            {isCheckingOut ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
            {isCheckingOut ? "กำลังดำเนินการ..." : "ยืนยันการสั่งซื้อ"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}