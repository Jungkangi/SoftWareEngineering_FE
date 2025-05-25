import styled from "styled-components"
import { useEffect, useState } from "react"

// 기본 컨테이너 및 레이아웃 컴포넌트
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

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
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

// BoardColumn, IssueCard, SprintCard 등 도메인 특화 스타일은 그대로 유지
export const BoardColumn = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border || "#e5e7eb"};
  border-radius: ${({ theme }) => theme.radii.lg || "12px"};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f9fafb"};
  padding: ${({ theme }) => theme.space[4] || "16px"};
  // testSprint 스타일과 유사하게 grid 사용시 float 제거
  width: 100%;
  margin-right: 0;
`

export const BoardColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[4]};
`

export const BoardColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`

export const BoardColumnCount = styled.div`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const BoardColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

// 이슈 카드 컴포넌트
export const IssueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[3]};
`

export const IssueCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const IssueCardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`

export const IssueCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const IssueCardId = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const IssueCardAssignee = styled.div`
  display: flex;
  align-items: center;
`

export const EmptyColumnMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[4]} 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

// 분석 컴포넌트
export const AnalyticsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`

export const AnalyticsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const AnalyticsChart = styled.div`
  height: 200px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[2]};
`

export const AnalyticsCard = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  text-align: center;
`

export const AnalyticsCardValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
`

export const AnalyticsCardLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

// 팀 멤버 컴포넌트
export const TeamMemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`

export const TeamMemberInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.space[1]};
  }
`

export const TeamMemberStats = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

// 스프린트 리스트 컴포넌트
export const SprintListItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space[4]};
  overflow: hidden;
`

interface SprintStatusIndicatorProps {
  status: string;
}

export const SprintStatusIndicator = styled.div<SprintStatusIndicatorProps>`
  width: 4px;
  background-color: ${({ status, theme }) => 
    status === "Completed" 
      ? theme.colors.success 
      : status === "In Progress" 
        ? theme.colors.primary 
        : theme.colors.secondary
  };
`

export const SprintCard = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: none;
  border-top-right-radius: ${({ theme }) => theme.radii.lg};
  border-bottom-right-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`

export const SprintCardHeader = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.space[1]};
  }
`

export const SprintCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
`

interface SprintStatusBadgeProps {
  status: string;
}

export const SprintStatusBadge = styled.div<SprintStatusBadgeProps>`
  background-color: ${({ status, theme }) => 
    status === "Completed" 
      ? theme.colors.success 
      : status === "In Progress" 
        ? theme.colors.primary 
        : theme.colors.secondary
  };
  color: ${({ status, theme }) => 
    status === "Completed" 
      ? theme.colors.successForeground 
      : status === "In Progress" 
        ? theme.colors.primaryForeground 
        : theme.colors.secondaryForeground
  };
`

export const SprintCardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SprintCardContent = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  
  > div {
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    &:last-child {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0;
    }
  }
`

export const SprintCardFooter = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
`

export const SprintProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export const SprintProgressLabel = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
`

export const SprintProgressValue = styled.span`
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SprintMetrics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[3]};
`

export const SprintMetricsItem = styled.div`
  flex: 1;
  text-align: center;
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const SprintMetricsValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
`

export const SprintMetricsLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

// 유틸리티 훅
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