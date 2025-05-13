import styled, { css } from "styled-components"
import * as React from "react"
import { useEffect, useState } from "react"

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
  
  declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 초기 체크
    checkIfMobile()

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", checkIfMobile)

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}


// Button 컴포넌트
type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}

const getVariantStyles = (variant: ButtonVariant = "default") => {
  switch (variant) {
    case "default":
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primaryForeground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary}dd;
        }
      `
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.foreground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accentForeground};
        }
      `
    case "ghost":
      return css`
        background-color: transparent;
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accentForeground};
        }
      `
    case "destructive":
      return css`
        background-color: ${({ theme }) => theme.colors.destructive};
        color: ${({ theme }) => theme.colors.destructiveForeground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.destructive}dd;
        }
      `
    case "link":
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
        &:hover:not(:disabled) {
          text-decoration: none;
        }
      `
  }
}

const getSizeStyles = (size: ButtonSize = "default") => {
  switch (size) {
    case "default":
      return css`
        height: 2.5rem;
        padding: 0 1rem;
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `
    case "sm":
      return css`
        height: 2rem;
        padding: 0 0.75rem;
        font-size: ${({ theme }) => theme.fontSizes.xs};
      `
    case "lg":
      return css`
        height: 3rem;
        padding: 0 1.5rem;
        font-size: ${({ theme }) => theme.fontSizes.md};
      `
    case "icon":
      return css`
        height: 2.5rem;
        width: 2.5rem;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      `
  }
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

// Card 컴포넌트
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.cardForeground};
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.space[6]};
  padding-top: 0;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.space[6]};
  padding-top: 0;
  gap: ${({ theme }) => theme.space[2]};
`

// Badge 컴포넌트
type BadgeVariant = "default" | "secondary" | "outline" | "destructive" | "success"

interface BadgeProps {
  variant?: BadgeVariant
}

const getVariantStylesBadge = (variant: BadgeVariant = "default") => {
  switch (variant) {
    case "default":
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primaryForeground};
      `
    case "secondary":
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.secondaryForeground};
      `
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.foreground};
      `
    case "destructive":
      return css`
        background-color: ${({ theme }) => theme.colors.destructive};
        color: ${({ theme }) => theme.colors.destructiveForeground};
      `
    case "success":
      return css`
        background-color: ${({ theme }) => theme.colors.success};
        color: ${({ theme }) => theme.colors.successForeground};
      `
  }
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  padding: 0 ${({ theme }) => theme.space[2]};
  height: 1.25rem;
  white-space: nowrap;
  
  ${({ variant }) => getVariantStylesBadge(variant)}
`

// Avatar 컴포넌트
export const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.full};
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.muted};
`

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
`

// Progress 컴포넌트
interface ProgressProps {
  value?: number
}

export const ProgressContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  height: 0.5rem;
  width: 100%;
`

export const ProgressIndicator = styled.div<ProgressProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  transition: width 0.2s ease;
  width: ${({ value }) => `${value || 0}%`};
`

export const Progress: React.FC<ProgressProps> = ({ value = 0 }) => {
  return (
    <ProgressContainer>
      <ProgressIndicator value={value} />
    </ProgressContainer>
  )
}

// Table 컴포넌트
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  caption-side: bottom;
`

export const TableHeader = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const TableBody = styled.tbody`
  & > tr:last-child {
    border-bottom: none;
  }
`

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}50;
  }
`

export const TableHead = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  vertical-align: middle;
`

// Input 컴포넌트
export const Input = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  padding: 0 ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Textarea 컴포넌트
export const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  padding: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  min-height: 5rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Label 컴포넌트
export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`

// Sidebar 컴포넌트
// Context
interface SidebarContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  collapsible: boolean
  collapsibleState: "icon" | "expanded"
  setCollapsibleState: React.Dispatch<React.SetStateAction<"icon" | "expanded">>
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

function useSidebarContext() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  defaultCollapsibleState?: "icon" | "expanded"
  collapsible?: boolean
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultOpen = true,
  defaultCollapsibleState = "expanded",
  collapsible = true,
}) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const [collapsibleState, setCollapsibleState] = React.useState<"icon" | "expanded">(defaultCollapsibleState)

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        collapsible,
        collapsibleState,
        setCollapsibleState,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

// Styled Components
interface SidebarStyledProps {
  $collapsibleState?: "icon" | "expanded"
}

export const SidebarContainer = styled.div<SidebarStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  width: ${({ $collapsibleState }) => ($collapsibleState === "icon" ? "4rem" : "16rem")};
  transition: width ${({ theme }) => theme.transitions.default};
`

export const SidebarHeader = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 ${({ theme }) => theme.space[6]};
`

export const SidebarContent = styled.div`
  flex: 1;
  overflow: auto;
`

export const SidebarFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[4]};
`

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[2]};
`

export const SidebarMenuItem = styled.div``

interface SidebarMenuButtonProps {
  isActive?: boolean
}

export const SidebarMenuButtonContainer = styled.div`
  position: relative;
`

export const SidebarMenuButtonStyled = styled.button<SidebarMenuButtonProps>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.default};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.accentForeground : theme.colors.mutedForeground)};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.accent : "transparent")};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`

export const SidebarTooltip = styled.div`
  position: absolute;
  left: 3rem;
  top: 0.5rem;
  z-index: 50;
  display: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.accentForeground};
  
  .sidebar-icon-mode &:hover {
    display: block;
  }
`

export const SidebarTriggerButton = styled.button`
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`

// Component Implementations
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered"
}

export const Sidebar: React.FC<SidebarProps> = ({ children, ...props }) => {
  const { open, collapsible, collapsibleState } = useSidebarContext()

  if (!open) {
    return null
  }

  return (
    <SidebarContainer
      $collapsibleState={collapsible ? collapsibleState : undefined}
      className={collapsible && collapsibleState === "icon" ? "sidebar-icon-mode" : ""}
      {...props}
    >
      {children}
    </SidebarContainer>
  )
}

interface SidebarMenuButtonCompProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
}

export const SidebarMenuButton: React.FC<SidebarMenuButtonCompProps> = ({
  children,
  isActive,
  tooltip,
  asChild = false,
  ...props
}) => {
  if (asChild) {
    return (
      <SidebarMenuButtonContainer>
        {React.cloneElement(children as React.ReactElement, {
          className: `${isActive ? "active" : ""}`,
          ...props,
        })}
        {tooltip && <SidebarTooltip>{tooltip}</SidebarTooltip>}
      </SidebarMenuButtonContainer>
    )
  }

  return (
    <SidebarMenuButtonContainer>
      <SidebarMenuButtonStyled isActive={isActive} {...props}>
        {children}
      </SidebarMenuButtonStyled>
      {tooltip && <SidebarTooltip>{tooltip}</SidebarTooltip>}
    </SidebarMenuButtonContainer>
  )
}

export const SidebarTrigger: React.FC = () => {
  const { setOpen } = useSidebarContext()

  return (
    <SidebarTriggerButton onClick={() => setOpen((prev) => !prev)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </SidebarTriggerButton>
  )
}
