// src/lib/useCart.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// แยก constants
const STORAGE_KEY = "shopping-cart";
const CURRENT_VERSION = 1;
const MAX_QUANTITY = 99; // ป้องกันการเพิ่มจำนวนมากเกินไป

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      version: CURRENT_VERSION,

      // เพิ่ม validation และ error handling
      addToCart: (product) => {
        if (!product?.id || !product?.price || !product?.stock_quantity) {
          console.error("Invalid product data");
          return;
        }

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            if (existingItem.quantity >= existingItem.stock_quantity) {
              console.warn("Cannot add more than stock_quantity");
              return state;
            }

            return {
              ...state,
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + 1,
                        item.stock_quantity
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            ...state,
            items: [...state.items, { ...product, quantity: 1 }],
          };
        });
      },

      // เพิ่ม safety checks
      removeFromCart: (productId) => {
        if (!productId) return;

        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      // ปรับปรุง quantity validation
      // updateQuantity: (productId, quantity) => {
      //   if (!productId || typeof quantity !== 'number') return;

      //   const safeQuantity = Math.min(Math.max(0, quantity), MAX_QUANTITY);

      //   set((state) => ({
      //     ...state,
      //     items: state.items.map(item =>
      //       item.id === productId
      //         ? { ...item, quantity: safeQuantity }
      //         : item
      //     ).filter(item => item.quantity > 0)
      //   }));
      // },

      updateQuantity: (productId, quantity) => {
        if (!productId || typeof quantity !== "number") return;

        set((state) => {
          const product = state.items.find((item) => item.id === productId);
          if (!product) return state;

          const safeQuantity = Math.min(
            Math.max(0, quantity),
            product.stock_quantity // Ensure quantity does not exceed stock_quantity
          );

          return {
            ...state,
            items: state.items
              .map((item) =>
                item.id === productId
                  ? { ...item, quantity: safeQuantity }
                  : item
              )
              .filter((item) => item.quantity > 0), // Remove items with quantity 0
          };
        });
      },

      // เพิ่ม callback option
      clearCart: (callback) => {
        set({ items: [], version: CURRENT_VERSION }, false, "CLEAR_CART");
        if (callback && typeof callback === "function") {
          callback();
        }
      },

      // ปรับปรุงการคำนวณราคารวม
      getTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const itemTotal = item.price * item.quantity;
          // ป้องกัน floating point errors
          return Number((total + itemTotal).toFixed(2));
        }, 0);
      },

      // เพิ่ม memoization ถ้าจำเป็น
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // เพิ่ม utility functions
      isItemInCart: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: CURRENT_VERSION,

      // ปรับปรุง migration logic
      migrate: (persistedState, version) => {
        if (version < CURRENT_VERSION) {
          // Migration logic for each version
          let migratedState = { ...persistedState };

          if (version === 0) {
            migratedState = {
              ...migratedState,
              version: 1,
              items: migratedState.items || [],
            };
          }

          // Add more version migrations here

          return migratedState;
        }
        return persistedState;
      },

      // เพิ่ม merge strategy
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          items: [...persistedState.items],
        };
      },
    }
  )
);

// Export helper functions
export const getFormattedPrice = (price) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(price);
};

export { useCart };
