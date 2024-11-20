// src/lib/useCart.js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      version: 1, // เพิ่ม version เพื่อติดตามการเปลี่ยนแปลงโครงสร้าง
      
      addToCart: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)
        
        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }
        
        return {
          ...state,
          items: [...state.items, { ...product, quantity: 1 }]
        }
      }),
      
      removeFromCart: (productId) => set((state) => ({
        ...state,
        items: state.items.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        ...state,
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),
      
      clearCart: () => set({ items: [], version: 1 }),

      getTotal: () => {
        const state = get()
        return state.items.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        )
      },
      
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        )
      }
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      version: 1, // กำหนดเวอร์ชันปัจจุบัน
      migrate: (persistedState, version) => {
        if (version === 0) {
          // ถ้าเป็น state เวอร์ชันเก่า (version 0)
          return {
            ...persistedState,
            version: 1,
            items: persistedState.items || []
          }
        }
        return persistedState
      }
    }
  )
)

export { useCart }