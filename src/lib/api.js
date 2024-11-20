// src/lib/api.js
const API_URL = 'http://localhost:3001'

export const api = {
  // ดึงรายการสินค้าทั้งหมด
  async getProducts() {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  },

  // ค้นหาสินค้า
  async searchProducts(query) {
    const response = await fetch(`${API_URL}/products/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to search products')
    return response.json()
  },

  // ดึงสินค้าตามหมวดหมู่
  async getProductsByCategory(categoryId) {
    const response = await fetch(`${API_URL}/products/category/${categoryId}`)
    if (!response.ok) throw new Error('Failed to fetch category products')
    return response.json()
  },

  // สร้างออเดอร์ใหม่
  async createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    if (!response.ok) throw new Error('Failed to create order')
    return response.json()
  }
}