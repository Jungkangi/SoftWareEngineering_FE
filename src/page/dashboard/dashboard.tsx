import { useState, useEffect } from "react";
import ProjectDetail from "../project/projectDetail";
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
  DetailWrapper,
} from "./dashboardStyled";
import Modal from "../../components/modal/modal";
import { useGetMyProjects } from "../../hooks/project/getProjectData";
import useGetTeams from "../../hooks/team/getTeamData";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectStats, setProjectStats] = useState([
    { title: "Total Projects", value: "0", change: "" },
    { title: "Open Todos", value: "0", change: "" },
    { title: "Team Members", value: "0", change: "" },
    { title: "Average Completion", value: "0%", change: "" },
  ]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);

  const { projects, loading, error } = useGetMyProjects(0);
  const { teams } = useGetTeams(0);

  useEffect(() => {
    if (!loading && projects) {
      // const openIssues = projects
      //   .flatMap((p) => p.issues || [])
      //   .filter((issue) => issue.status !== "DONE");
      const avgProgress =
        projects.length > 0
          ? Math.round(
              projects.reduce(
                (acc, p) =>
                  acc +
                  (typeof (p as any).progress === "number"
                    ? (p as any).progress
                    : 0),
                0
              ) / projects.length
            )
          : 0;

      setProjectStats([
        {
          title: "Total Projects",
          value: projects.length.toString(),
          change: "",
        },
        // {
        //   title: "Open Issues",
        //   value: openIssues.length.toString(),
        //   change: "",
        // },
        {
          title: "Team Members",
          value: [...new Set(teams.map((t) => t.U_ID))].length.toString(),
          change: "",
        },
        {
          title: "Average Completion",
          value: `${avgProgress}%`,
          change: "",
        },
      ]);

      setActiveProjects(projects);
    }
  }, [projects, loading, teams]);

  const handleViewProjectClick = () => {
    setIsModalOpen(true);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <HeaderActions></HeaderActions>
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
          activeProjects.map((project, index) => {
            const teamMembersForProject = teams.filter(
              (t) => t.P_ID === project.P_ID
            );
            return (
              <ProjectCard key={index}>
                <div>
                  <ProjectTitle>
                    {project.P_NAME} <span>{project.priority || "N/A"}</span>
                  </ProjectTitle>
                  <ProjectMeta>Due {project.due || "Unknown"}</ProjectMeta>
                </div>
                <ProgressBarWrapper>
                  <ProgressBar
                    progress={
                      "progress" in project ? (project as any).progress ?? 0 : 0
                    }
                  />
                </ProgressBarWrapper>
                {/* <ProjectMeta>{project.issues?.length || 0} Issues</ProjectMeta> */}
                <TeamAvatars>
                  {[...new Set(teamMembersForProject.map((m) => m.U_ID))].map(
                    (uid, idx) => (
                      <div key={idx}>{uid}</div>
                    )
                  )}
                </TeamAvatars>
                <ViewButton onClick={handleViewProjectClick}>
                  View Project
                </ViewButton>
                {isModalOpen && (
                  <Modal
                    onClose={() => setIsModalOpen(false)}
                    isOpen={isModalOpen}
                  >
                    <DetailWrapper>
                      <ProjectDetail
                        projectId={project.P_ID}
                        projectData={{
                          P_NAME: project.P_NAME,
                          STAT: project.P_STATUS,
                          DUE_DATE: project.DUE_DATE,
                          DISCRIPTION: project.DISCRIPTION,
                          PRIORITY: project.priority || "",
                          CATEGORY: project.CATEGORY || "",
                        }}
                        onUpdate={() => {}}
                      />
                    </DetailWrapper>
                  </Modal>
                )}
              </ProjectCard>
            );
          })
        ) : (
          <p>No active projects available.</p>
        )}
      </ProjectsContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
