import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
    persist(
      (set) => ({
        darkMode: false,
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      }),
      { name: 'theme-storage' }
    )
  );
  