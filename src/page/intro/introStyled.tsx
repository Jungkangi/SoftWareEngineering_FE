import styled from "styled-components";

// Header 스타일
export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;

  @media (min-width: 1024px) {
    padding: 0 1.5rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;

  svg {
    height: 1.5rem;
    width: 1.5rem;
    color: #3b82f6;
  }
`;

export const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  gap: 1rem;

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #3b82f6;
    }
  }
`;

// Hero Section 스타일
export const HeroSection = styled.section`
  width: 100%;
  padding: 3rem 1rem;
  background-color: #f9fafb;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 8rem 2rem;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  align-items: center; /* 수직 정렬 추가 */

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 1280px) {
    font-size: 3.75rem;
  }
`;

export const HeroDescription = styled.p`
  max-width: 600px;
  color: #6b7280;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

// 주요 기능 섹션 스타일
export const FeaturesSection = styled.section`
  width: 100%;
  padding: 3rem 1rem;
  background-color: #ffffff;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  text-align: center;

  svg {
    height: 2rem;
    width: 2rem;
    color: #3b82f6;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }

  p {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

// Dashboard Card 스타일
export const DashboardCard = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
  gap: 1rem; /* 내부 요소 간격 */
`;
export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

export const DashboardTitle = styled.div`
  font-weight: 500;
`;

export const DashboardContent = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Sprint Progress 위에 Tasks와 Team */
  grid-template-columns: 1fr 1fr; /* Tasks와 Team을 좌우로 배치 */
  gap: 1rem;
  margin-top: 0; /* 위쪽 여백 제거 */
`;


export const DashboardCardItem = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  margin-top: 0.25rem; /* 여백 최소화 */
  overflow: hidden;

  div {
    height: 100%;
    background-color: #3b82f6;
    border-radius: 9999px;
  }
`;
export const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem; /* 여백 최소화 */
`;

export const TaskList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
`;

export const TeamContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const TeamAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-right: -0.5rem;
  border: 2px solid white;
`;