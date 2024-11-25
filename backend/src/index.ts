import { Elysia } from "elysia";
import ProductModel from "./models/product";
import OrderModel from "./models/order";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const app = new Elysia();

// Middleware จัดการ errors
app
  .use(swagger())
  .use(cors())
  .onError(({ code, error, set }) => {
    console.error(`Error: ${error.message}`);
    set.status = code === "NOT_FOUND" ? 404 : 500;
    return { error: error.message };
  })

  // Routes สำหรับสินค้า
  .get("/products", async () => {
    try {
      const products = await ProductModel.findAll();
      return { success: true, data: products };
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", error);
      throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
    }
  })

  .get("/products/:id", async ({ params: { id } }) => {
    try {
      const product = await ProductModel.findById(Number(id));
      if (!product) throw new Error("ไม่พบสินค้า");
      return { success: true, data: product };
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าที่มี ID ${id}:`, error);
      throw new Error(error.message);
    }
  })

  .get("/products/category/:categoryId", async ({ params: { categoryId } }) => {
    try {
      const products = await ProductModel.findByCategory(Number(categoryId));
      return { success: true, data: products };
    } catch (error) {
      console.error(
        `เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าตามหมวดหมู่ ${categoryId}:`,
        error
      );
      throw new Error("ไม่สามารถดึงข้อมูลสินค้าตามหมวดหมู่ได้");
    }
  })

  .post("/orders", async ({ body }) => {
    try {
      const { customerInfo, items, totalAmount }: any = body;
      const newOrder = await OrderModel.create(
        customerInfo,
        items,
        totalAmount
      );
      return { success: true, message: "สร้างออเดอร์สำเร็จ", data: newOrder };
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างออเดอร์:", error);
      throw new Error("ไม่สามารถสร้างออเดอร์ได้ กรุณาตรวจสอบข้อมูลที่ส่งมา");
    }
  })

  .get("/orders/:id", async ({ params: { id } }) => {
    try {
      const order = await OrderModel.findById(Number(id));
      if (!order) throw new Error("ไม่พบออเดอร์");
      return { success: true, data: order };
    } catch (error) {
      console.error(
        `เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์ที่มี ID ${id}:`,
        error
      );
      throw new Error(error.message);
    }
  })

  .put("/orders/:id/status", async ({ params: { id }, body }) => {
    try {
      const { status }: any = body;
      const updatedOrder = await OrderModel.updateStatus(Number(id), status);
      if (!updatedOrder) throw new Error("ไม่พบออเดอร์");
      return {
        success: true,
        message: "อัพเดทสถานะออเดอร์สำเร็จ",
        data: updatedOrder,
      };
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการอัพเดทสถานะออเดอร์ ${id}:`, error);
      throw new Error(error.message);
    }
  })

  .listen(8000);

console.log("🚀 Server is running at http://localhost:8000");
