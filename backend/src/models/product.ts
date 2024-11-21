import pool from "../db";

const ProductModel = {
  // ดึงสินค้าทั้งหมด
  async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_available = true
    `);
    return rows;
  },

  // ดึงสินค้าตาม ID
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ? AND is_available = true",
      [id]
    );
    return rows[0] || null;
  },

  // ดึงสินค้าตามหมวดหมู่
  async findByCategory(categoryId) {
    const [rows] = await pool.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.category_id = ? AND p.is_available = true`,
      [categoryId]
    );
    return rows;
  },

  // ค้นหาสินค้า
  async search(query) {
    const [rows] = await pool.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE (p.name LIKE ? OR p.description LIKE ?)
       AND p.is_available = true`,
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  },
};

export default ProductModel;
