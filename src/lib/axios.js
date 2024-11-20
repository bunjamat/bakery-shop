// src/lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// src/lib/api.js
export const api = {
  // ดึงรายการสินค้าทั้งหมด
  getProducts: () => 
    axiosInstance.get('/products'),

  // ค้นหาสินค้า
  searchProducts: (query) => 
    axiosInstance.get(`/products/search?q=${query}`),

  // ดึงสินค้าตามหมวดหมู่
  getProductsByCategory: (categoryId) => 
    axiosInstance.get(`/products/category/${categoryId}`),

  // สร้างออเดอร์ใหม่
  createOrder: (orderData) => 
    axiosInstance.post('/orders', orderData),
};

