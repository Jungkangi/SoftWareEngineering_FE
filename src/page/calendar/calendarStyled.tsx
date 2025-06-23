import styled, { css } from "styled-components"
import { useEffect, useState } from "react"

// 테마 정의
export const theme = {
  colors: {
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    secondary: "#f3f4f6",
    secondaryForeground: "#1f2937",
    accent: "#f3f4f6",
    accentForeground: "#1f2937",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    success: "#10b981",
    successForeground: "#ffffff",
    warning: "#f59e0b",
    warningForeground: "#ffffff",
    muted: "#f3f4f6",
    mutedForeground: "#6b7280",
    border: "#e5e7eb",
    input: "#e5e7eb",
    background: "#ffffff",
    backgroundSecondary: "#f9fafb",
    foreground: "#1f2937",
    card: "#ffffff",
    cardForeground: "#1f2937",
    // Jira 스타일 상태 색상
    todo: "#ddd6fe",
    todoForeground: "#5b21b6",
    inProgress: "#bfdbfe",
    inProgressForeground: "#1e40af",
    review: "#fed7aa",
    reviewForeground: "#c2410c",
    done: "#bbf7d0",
    doneForeground: "#166534",
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
  },
  radii: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  transitions: {
    default: "0.2s ease",
  },
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
}

// 타입 정의
export type Theme = typeof theme

type ExtendedColors = typeof theme.colors & {
  todo: string
  todoForeground: string
  inProgress: string
  inProgressForeground: string
  review: string
  reviewForeground: string
  done: string
  doneForeground: string
}

declare module "styled-components" {
  export interface DefaultTheme extends Omit<Theme, "colors"> {
    colors: ExtendedColors
  }
}

// 기본 레이아웃 컴포넌트
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Header = styled.header`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ theme }) => theme.space[6]};
`

export const Main = styled.main`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.space[6]};
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  letter-spacing: -0.025em;
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

// 필터 컨트롤
export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

export const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`

// 버튼 컴포넌트
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
  border: none;
  
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

// 셀렉트 컴포넌트
export const Select = styled.select`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`

// 카드 컴포넌트
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.space[6]};
`

// Calendar 컴포넌트들
export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // 가운데 정렬로 변경
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const CalendarNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  width: 100%; // 전체 너비 사용
  justify-content: center; // 가운데 정렬
`

export const MonthYearDisplay = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin: 0 ${({ theme }) => theme.space[4]};
  min-width: 200px;
  text-align: center;
`

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`

export const CalendarHeaderCell = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.space[3]};
  text-align: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondaryForeground};
`

interface CalendarCellProps {
  isToday?: boolean
  isSelected?: boolean
  isOtherMonth?: boolean
  hasEvents?: boolean
}

export const CalendarCell = styled.div<CalendarCellProps>`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 120px;
  padding: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  
  ${({ isOtherMonth, theme }) =>
    isOtherMonth &&
    css`
      background-color: ${theme.colors.muted};
      color: ${theme.colors.mutedForeground};
    `}
  
  ${({ isToday, theme }) =>
    isToday &&
    css`
      background-color: ${theme.colors.primary}20;
      border: 2px solid ${theme.colors.primary};
    `}
  
  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background-color: ${theme.colors.primary}40;
    `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 80px;
  }
`

export const CalendarCellDate = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[1]};
`

export const CalendarCellEvents = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  max-height: 80px;
  overflow: hidden;
`

// Jira 스타일 이슈 아이템
interface IssueItemProps {
  status?: "todo" | "inProgress" | "review" | "done"
  priority?: "high" | "medium" | "low"
}

export const IssueItem = styled.div<IssueItemProps>`
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "todo":
        return theme.colors.todo
      case "inProgress":
        return theme.colors.inProgress
      case "review":
        return theme.colors.review
      case "done":
        return theme.colors.done
      default:
        return theme.colors.secondary
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "todo":
        return theme.colors.todoForeground
      case "inProgress":
        return theme.colors.inProgressForeground
      case "review":
        return theme.colors.reviewForeground
      case "done":
        return theme.colors.doneForeground
      default:
        return theme.colors.secondaryForeground
    }
  }};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  border-left: 3px solid ${({ priority, theme }) => {
    switch (priority) {
      case "high":
        return theme.colors.destructive
      case "medium":
        return theme.colors.warning
      case "low":
        return theme.colors.success
      default:
        return "transparent"
    }
  }};
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

export const IssueId = styled.span`
  font-weight: 600;
  opacity: 0.8;
`

export const IssueTitle = styled.span`
  margin-left: ${({ theme }) => theme.space[1]};
`

export const EventsOverflow = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-align: center;
  padding: ${({ theme }) => theme.space[1]};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

// 스프린트 타임라인
export const SprintTimeline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.success});
  border-radius: ${({ theme }) => theme.radii.sm};
  opacity: 0.7;
`

// 범례 컴포넌트
export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

export const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ color }) => color};
`

export const LegendLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
`

// 유틸리티 훅
export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [filters, setFilters] = useState({
    assignee: "all",
    status: "all",
    priority: "all",
  })

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  return {
    currentDate,
    selectedDate,
    filters,
    setSelectedDate,
    setFilters,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}