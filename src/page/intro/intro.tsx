import React, { useState } from "react";
import {
  Header,
  Logo,
  Nav,
  HeroSection,
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroDescription,
  ButtonGroup,
  FeaturesSection,
  FeaturesContainer,
  FeatureCard,
  DashboardCard,
  DashboardHeader,
  DashboardTitle,
  DashboardContent,
  DashboardCardItem,
  ProgressBar,
  ProgressText,
  TaskList,
  TaskItem,
  TeamContainer,
  TeamAvatar,
} from "./introStyled";
import {
  ChevronRight,
  Clock,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Users,
} from "lucide-react";

interface SprintProgress {
  percentage: number;
  remainingDays: number;
}

interface Task {
  title: string;
  status: "진행중" | "보류중" | "완료";
}

interface DashboardData {
  sprintProgress: SprintProgress;
  tasks: Task[];
  team: string[];
}

export default function IntroPage(): JSX.Element {
  const [dashboardData] = useState<DashboardData>({
    sprintProgress: {
      percentage: 67,
      remainingDays: 5,
    },
    tasks: [
      { title: "Update UI components", status: "진행중" },
      { title: "Fix login issue", status: "보류중" },
      { title: "Add analytics", status: "완료" },
    ],
    team: ["A", "B", "C", "D", "E"],
  });

  return (
    <div>
      {/* Header */}
      <Header>
        <a href="/" style={{ textDecoration: "none" }}>
          <Logo>
            <ListChecks />
            <span>Main page</span>
          </Logo>
        </a>
        <Nav>
          <a href="/auth">Log In</a>
          <a href="/auth">Sign Up</a>
        </Nav>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          {/* Left: Hero Content */}
          <HeroContent>
            <HeroTitle>Project management simplified for your team</HeroTitle>
            <HeroDescription>
              TaskForge helps teams plan, track, and deliver their best work
              with our flexible project management platform.
            </HeroDescription>
            <ButtonGroup>
              <a href="/" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Try Demo Dashboard
                  <ChevronRight />
                </button>
              </a>
              <a href="/pricing" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "transparent",
                    color: "#3b82f6",
                    border: "2px solid #3b82f6",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  View Pricing
                </button>
              </a>
            </ButtonGroup>
          </HeroContent>

          {/* Right: Project Dashboard */}
          <DashboardCard>
            <DashboardHeader>
              <LayoutDashboard />
              <DashboardTitle>Project Dashboard</DashboardTitle>
            </DashboardHeader>

            {/* Sprint Progress */}
            <DashboardCardItem>
              <div>Current Sprint Progress</div>
              <ProgressBar>
                <div
                  style={{
                    width: `${dashboardData.sprintProgress.percentage}%`,
                    backgroundColor: "#3b82f6",
                    height: "100%",
                    borderRadius: "9999px",
                  }}
                />
              </ProgressBar>
              <ProgressText>
                <div>{dashboardData.sprintProgress.percentage}% Complete</div>
                <div>
                  {dashboardData.sprintProgress.remainingDays} days remaining
                </div>
              </ProgressText>
            </DashboardCardItem>

            {/* Tasks and Team */}
            <DashboardContent>
              {/* Tasks */}
              <DashboardCardItem>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Tasks
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    View all
                  </div>
                </div>
                <TaskList>
                  {dashboardData.tasks.map((task, index) => (
                    <TaskItem key={index}>
                      <div>{task.title}</div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color:
                            task.status === "진행중"
                              ? "#3b82f6"
                              : task.status === "완료"
                              ? "#10b981"
                              : "#f59e0b",
                        }}
                      >
                        {task.status}
                      </div>
                    </TaskItem>
                  ))}
                </TaskList>
              </DashboardCardItem>

              {/* Team */}
              <DashboardCardItem>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Team
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    All members
                  </div>
                </div>
                <TeamContainer>
                  {dashboardData.team.map((member, index) => (
                    <TeamAvatar key={index}>{member}</TeamAvatar>
                  ))}
                </TeamContainer>
              </DashboardCardItem>
            </DashboardContent>
          </DashboardCard>
        </HeroContainer>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <FeaturesContainer>
          {[
            {
              title: "Project Management",
              description:
                "Create and manage projects, assign team members, and track progress.",
              icon: LayoutDashboard,
            },
            {
              title: "Sprint Planning",
              description:
                "Create sprints, manage backlogs, and visualize sprint progress.",
              icon: Clock,
            },
            {
              title: "Issue Tracking",
              description:
                "Create, assign, and track issues with customizable workflows.",
              icon: ListChecks,
            },
            {
              title: "Team Collaboration",
              description:
                "Communicate with team members, mention others, and collaborate on issues.",
              icon: Users,
            },
            {
              title: "Reporting & Analytics",
              description:
                "Generate visual reports on project progress and team performance.",
              icon: LineChart,
            },
            {
              title: "Customizable Workflows",
              description:
                "Create custom workflows that match your team's unique processes.",
              icon: ChevronRight,
            },
          ].map((feature, index) => (
            <FeatureCard key={index}>
              <feature.icon />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </FeaturesSection>
    </div>
  );
}
