export const lightTheme = {
	colors: {
	  background: "#ffffff",
	  foreground: "#111827",
	  backgroundSecondary: "#f9fafb",
  
	  primary: "#111827",
	  primaryForeground: "#ffffff",
  
	  secondary: "#f3f4f6",
	  secondaryForeground: "#111827",
  
	  muted: "#f3f4f6",
	  mutedForeground: "#6b7280",
  
	  accent: "#f3f4f6",
	  accentForeground: "#111827",
  
	  destructive: "#ef4444",
	  destructiveForeground: "#ffffff",
  
	  success: "#10b981",
	  successForeground: "#ffffff",
  
	  border: "#e5e7eb",
	  input: "#e5e7eb",
  
	  card: "#ffffff",
	  cardForeground: "#111827",
	},
  
	fontSizes: {
	  xs: "0.75rem",
	  sm: "0.875rem",
	  md: "1rem",
	  lg: "1.125rem",
	  xl: "1.25rem",
	  "2xl": "1.5rem",
	  "3xl": "1.875rem",
	  "4xl": "2.25rem",
	},
  
	space: {
	  1: "0.25rem",
	  2: "0.5rem",
	  3: "0.75rem",
	  4: "1rem",
	  5: "1.25rem",
	  6: "1.5rem",
	  8: "2rem",
	  10: "2.5rem",
	  12: "3rem",
	  16: "4rem",
	  20: "5rem",
	},
  
	radii: {
	  sm: "0.125rem",
	  md: "0.375rem",
	  lg: "0.5rem",
	  xl: "0.75rem",
	  full: "9999px",
	},
  
	shadows: {
	  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
	  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
	  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
	},
  
	breakpoints: {
	  sm: "640px",
	  md: "768px",
	  lg: "1024px",
	  xl: "1280px",
	  "2xl": "1536px",
	},
  
	transitions: {
	  default: "0.15s ease",
	  fast: "0.1s ease",
	  slow: "0.3s ease",
	},
  }
  
  export const darkTheme = {
	colors: {
	  background: "#111827",
	  foreground: "#f9fafb",
	  backgroundSecondary: "#1f2937",
  
	  primary: "#f9fafb",
	  primaryForeground: "#111827",
  
	  secondary: "#1f2937",
	  secondaryForeground: "#f9fafb",
  
	  muted: "#1f2937",
	  mutedForeground: "#9ca3af",
  
	  accent: "#1f2937",
	  accentForeground: "#f9fafb",
  
	  destructive: "#ef4444",
	  destructiveForeground: "#f9fafb",
  
	  success: "#10b981",
	  successForeground: "#f9fafb",
  
	  border: "#374151",
	  input: "#374151",
  
	  card: "#1f2937",
	  cardForeground: "#f9fafb",
	},
  
	fontSizes: {
	  xs: "0.75rem",
	  sm: "0.875rem",
	  md: "1rem",
	  lg: "1.125rem",
	  xl: "1.25rem",
	  "2xl": "1.5rem",
	  "3xl": "1.875rem",
	  "4xl": "2.25rem",
	},
  
	space: {
	  1: "0.25rem",
	  2: "0.5rem",
	  3: "0.75rem",
	  4: "1rem",
	  5: "1.25rem",
	  6: "1.5rem",
	  8: "2rem",
	  10: "2.5rem",
	  12: "3rem",
	  16: "4rem",
	  20: "5rem",
	},
  
	radii: {
	  sm: "0.125rem",
	  md: "0.375rem",
	  lg: "0.5rem",
	  xl: "0.75rem",
	  full: "9999px",
	},
  
	shadows: {
	  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.25)",
	  md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.26)",
	  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.25)",
	},
  
	breakpoints: {
	  sm: "640px",
	  md: "768px",
	  lg: "1024px",
	  xl: "1280px",
	  "2xl": "1536px",
	},
  
	transitions: {
	  default: "0.15s ease",
	  fast: "0.1s ease",
	  slow: "0.3s ease",
	},
  }
  
  export type Theme = typeof lightTheme
  