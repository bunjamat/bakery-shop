import pool from "../db";

const OrderModel = {
  // สร้างออเดอร์ใหม่
  async create(customerInfo, items, totalAmount) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // สร้างออเดอร์
      const [orderResult]: any = await connection.query(
        `INSERT INTO orders (customer_name, email, phone, address,payment_method, total_amount)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          customerInfo.name,
          customerInfo.email,
          customerInfo.phone,
          customerInfo.address,
          customerInfo.payment_method,
          totalAmount,
        ]
      );
      const orderId = orderResult.insertId;

      // เพิ่มรายการสินค้า
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
           VALUES (?, ?, ?, ?, ?)`,
          [
            orderId,
            item.id,
            item.quantity,
            item.price,
            item.price * item.quantity,
          ]
        );

        // อัพเดท stock
        await connection.query(
          `UPDATE products
           SET stock_quantity = stock_quantity - ?
           WHERE id = ?`,
          [item.quantity, item.id]
        );
      }

      await connection.commit();

      const [order]: any = await connection.query(
        "SELECT * FROM orders WHERE id = ?",
        [orderId]
      );
      return order[0];
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // ดึงข้อมูลออเดอร์และรายละเอียด
  async findById(id) {
    const [orders]: any = await pool.query(
      "SELECT * FROM orders WHERE id = ?",
      [id]
    );
    if (orders.length === 0) return null;

    const order = orders[0];
    const [items] = await pool.query(
      `SELECT oi.*, p.name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    return {
      ...order,
      items,
    };
  },

  // อัพเดทสถานะออเดอร์
  async updateStatus(id, status) {
    const [result]: any = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) return null;

    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [
      id,
    ]);
    return orders[0];
  },
};

export default OrderModel;
