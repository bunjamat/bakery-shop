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
  Alert,
  Spinner,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  ShoppingBasket,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
} from "lucide-react";

const PAYMENT_METHODS = [
  {
    id: "บัตรเครดิต",
    title: "บัตรเครดิต/เดบิต",
    subtitle: "รองรับ Visa, Mastercard, JCB",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: "พร้อมเพย์",
    title: "พร้อมเพย์",
    subtitle: "สแกน QR Code เพื่อชำระเงิน",
    icon: <QrCode className="w-6 h-6" />,
  },
  {
    id: "โอนเงิน",
    title: "โอนผ่านธนาคาร",
    subtitle: "โอนเงินผ่านธนาคาร",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "เงินสด",
    title: "ทรูมันนี่ วอลเล็ท",
    subtitle: "ชำระผ่าน TrueMoney Wallet",
    icon: <Wallet className="w-6 h-6" />,
  },
];

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePaymentSelect = (method) => {
    setCustomerInfo((prev) => ({
      ...prev,
      payment_method: method,
    }));
  };

  const validateForm = () => {
    const required = ["name", "email", "phone", "address", "payment_method"];
    const missing = required.filter((field) => !customerInfo[field]);
    if (missing.length > 0) {
      setShowAlert({
        show: true,
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo,
          items,
          totalAmount: getTotal(),
        }),
      });

      if (response.ok) {
        setShowAlert({
          show: true,
          message: "สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ",
          type: "success",
        });
        clearCart();
        setShowPaymentModal(false);
      } else {
        throw new Error("เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    } catch (error) {
      setShowAlert({
        show: true,
        message: error.message,
        type: "error",
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
      <Typography variant="h3" className="mb-6">
        ตะกร้าสินค้า
      </Typography>
      {showAlert.show && (
        <Alert
          color={showAlert.type === "success" ? "green" : "red"}
          icon={<AlertCircle className="w-4 h-4" />}
          dismissible
          onClose={() => setShowAlert({ show: false })}
          className="mb-4"
        >
          {showAlert.message}
        </Alert>
      )}
      {showPaymentModal ? (
        <div className="space-y-6">
          <Card className="p-6">
            <Typography variant="h5" className="mb-4">
              ข้อมูลการจัดส่ง
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="ชื่อ-นามสกุล"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                label="อีเมล"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
              />
              <Input
                type="tel"
                label="เบอร์โทรศัพท์"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
              />
              <Textarea
                label="ที่อยู่จัดส่ง"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
              />
            </div>
          </Card>

          <Card className="p-6">
            <Typography variant="h5" className="mb-4">
              เลือกวิธีชำระเงิน
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    customerInfo.payment_method === method.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {method.icon}
                    <div>
                      <Typography variant="h6">{method.title}</Typography>
                      <Typography variant="small" color="gray">
                        {method.subtitle}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-orange-50">
            <CardBody>
              <div className="flex justify-between mb-4">
                <Typography>ยอดรวมทั้งสิ้น</Typography>
                <Typography className="font-bold">
                  {getFormattedPrice(getTotal())}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  variant="text"
                  color="gray"
                  onClick={() => {
                    setShowAlert({ show: false });
                    setShowPaymentModal(false);
                  }}
                  className="flex-1"
                >
                  ย้อนกลับ
                </Button>
                <Button
                  size="lg"
                  variant="gradient"
                  color="orange"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      กำลังดำเนินการ...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      ยืนยันการสั่งซื้อ
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <>
          {" "}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={removeFromCart}
                getFormattedPrice={getFormattedPrice}
              />
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
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                ดำเนินการสั่งซื้อ
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}

const CartItem = ({ item, onQuantityChange, onRemove, getFormattedPrice }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= item.stock_quantity) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <Card className="p-4">
      <CardBody className="flex items-center gap-4 p-0 flex-col md:flex-row">
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
          <Typography color="gray" className="text-sm">
            สต็อก: {item.stock_quantity}
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            variant="filled"
            color="orange"
            size="sm"
            className="rounded-full w-8 h-8 p-0 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </IconButton>

          <Typography className="font-bold w-16 text-center">
            {item.quantity}
          </Typography>

          <IconButton
            variant="filled"
            color="orange"
            size="sm"
            className="rounded-full w-8 h-8 p-0 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.stock_quantity}
          >
            <Plus className="w-4 h-4" />
          </IconButton>
        </div>

        <IconButton
          variant="text"
          color="red"
          onClick={() => onRemove(item.id)}
          className="hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-6 h-6" />
        </IconButton>
      </CardBody>
    </Card>
  );
};
