import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 24px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const NewProjectButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #1c1c1c;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const StatTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StatValue = styled.div`
  font-size: 24px;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#fff" : "#f1f1f1")};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
`;

export const ProjectsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ProjectCard = styled.div`
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ProjectTitle = styled.h3`
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  span {
    background: #eee;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

export const ProjectMeta = styled.div`
  font-size: 12px;
  color: #777;
`;

export const ProgressBarWrapper = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  height: 8px;
  margin: 12px 0;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  border-radius: 8px;
  background: #000;
  width: ${({ progress }) => progress}%;
`;

export const TeamAvatars = styled.div`
  display: flex;
  gap: 4px;
  margin: 8px 0;

  div {
    width: 28px;
    height: 28px;
    background: #000;
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ViewButton = styled.button`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
`;
