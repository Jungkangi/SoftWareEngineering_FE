import { useState } from "react";
import {
  DashboardContainer,
  StatsContainer,
  StatCard,
  StatTitle,
  StatValue,
  TabContainer,
  Tab,
  ProjectsContainer,
  ProjectCard,
  ProjectTitle,
  ProjectMeta,
  ProgressBarWrapper,
  ProgressBar,
  TeamAvatars,
  ViewButton,
  DashboardHeader,
  Title,
  HeaderActions,
  FilterButton,
  NewProjectButton,
} from "./dashboardStyled";

import { Funnel } from "lucide-react";
import Modal from "../../components/modal/modal"; // Assuming you have a Modal component

const projectStats = [
  { title: "Total Projects", value: "12", change: "+3 from last month" },
  { title: "Open Issues", value: "64", change: "–12 from last month" },
  { title: "Team Members", value: "24", change: "+2 from last month" },
  { title: "Average Completion", value: "82%", change: "+4% from last month" },
];

const activeProjects = [
  {
    title: "Website Redesign",
    due: "Nov 15, 2023",
    priority: "High",
    progress: 75,
    issues: "18/24 issues",
    members: ["AB", "CD", "EF"],
  },
  {
    title: "Mobile App Development",
    due: "Dec 10, 2023",
    priority: "Medium",
    progress: 45,
    issues: "16/36 issues",
    members: ["AB", "CD", "GH"],
  },
  {
    title: "API Integration",
    due: "Oct 30, 2023",
    priority: "Low",
    progress: 90,
    issues: "16/18 issues",
    members: ["AB", "IJ"],
  },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProjectClick = () => {
    setIsModalOpen(true);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <HeaderActions>
          {/* <FilterButton>
            <Funnel />
            Filter
          </FilterButton> */}
          {/* <NewProjectButton>+ New Project</NewProjectButton> */}
        </HeaderActions>
      </DashboardHeader>

      <StatsContainer>
        {projectStats.map((stat, index) => (
          <StatCard key={index}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <small>{stat.change}</small>
          </StatCard>
        ))}
      </StatsContainer>

      <TabContainer>
        <Tab active>Active Projects</Tab>
        <Tab>Recent Activity</Tab>
        <Tab>Upcoming Deadlines</Tab>
      </TabContainer>

      <ProjectsContainer>
        {activeProjects.length > 0 ? (
          activeProjects.map((project, index) => (
            <ProjectCard key={index}>
              <div>
                <ProjectTitle>
                  {project.title} <span>{project.priority}</span>
                </ProjectTitle>
                <ProjectMeta>Due {project.due}</ProjectMeta>
              </div>
              <ProgressBarWrapper>
                <ProgressBar progress={project.progress} />
              </ProgressBarWrapper>
              <ProjectMeta>{project.issues}</ProjectMeta>
              <TeamAvatars>
                {project.members.map((m, idx) => (
                  <div key={idx}>{m}</div>
                ))}
              </TeamAvatars>
              <ViewButton onClick={handleViewProjectClick}>
                View Project
              </ViewButton>
              {isModalOpen && (
                <Modal
                  onClose={() => setIsModalOpen(false)}
                  isOpen={isModalOpen}
                >
                  <h2>Project Details</h2>
                  <p>
                    Here you can display detailed information about the project.
                  </p>
                </Modal>
              )}
            </ProjectCard>
          ))
        ) : (
          <p>No active projects available.</p>
        )}
      </ProjectsContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
