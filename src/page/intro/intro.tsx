"use client";

import { ThemeProvider } from "styled-components";
import HeroCover from "./introStyled";

// Define theme for styled-components
const theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#ffffff",
    backgroundDark: "#f3f4f6",
    text: "#1f2937",
    textLight: "#6b7280",
    border: "#e5e7eb",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
};

export default function HeroDemoPage() {
  return (
    <ThemeProvider theme={theme}>
      <HeroCover />
    </ThemeProvider>
  );
}
