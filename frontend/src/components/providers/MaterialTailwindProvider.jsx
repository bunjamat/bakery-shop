'use client';
import { ThemeProvider } from "@material-tailwind/react";

export default function MaterialTailwindProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}