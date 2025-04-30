import styled from "styled-components";

// Styled components for the hero section
const HeroSection = styled.section`
  width: 100%;
  padding: 3rem 1.5rem;
  background-color: #f9fafb;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 8rem 2rem;
  }

  @media (min-width: 1280px) {
    padding: 12rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #111827;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 1280px) {
    font-size: 3.75rem;
  }
`;

const HeroDescription = styled.p`
  max-width: 600px;
  color: #6b7280;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

const DemoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DemoCard = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const DemoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const DemoTitle = styled.div`
  font-weight: 500;
`;

const DemoContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1rem;
  height: calc(100% - 2.5rem);
`;

const DemoCard1 = styled.div`
  grid-column: span 2;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
`;

const DemoCard2 = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
`;

const DemoProgressBar = styled.div`
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  margin-top: 0.5rem;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 66%;
    background-color: #3b82f6;
    border-radius: 9999px;
  }
`;

const DemoProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const DemoTaskList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DemoTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
`;

// const DemoTaskStatus = styled.div`
//   font-size: 0.75rem;
//   color: ${(props) => {
//     if (props.status === "In Progress") return "#3b82f6";
//     if (props.status === "Completed") return "#10b981";
//     return "#f59e0b";
//   }};
// `;

const DemoTeam = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const DemoAvatar = styled.div`
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

// Icon components
const LayoutDashboardIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#3b82f6" }}
  >
    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

// Main component
const HeroCover = () => {
  return (
    <HeroSection>
      <Container>
        <HeroGrid>
          <HeroContent>
            <HeroTitle>Project management simplified for your team</HeroTitle>
            <HeroDescription>
              TaskForge helps teams plan, track, and deliver their best work
              with our flexible project management platform.
            </HeroDescription>
            <ButtonGroup>
              {/* <Button variant="primary" size="lg">
                Try Demo Dashboard
                <ChevronRightIcon />
              </Button>
              <Button variant="outline" size="lg">
                View Pricing
              </Button> */}
            </ButtonGroup>
          </HeroContent>

          <DemoContainer>
            <DemoCard>
              <DemoHeader>
                <LayoutDashboardIcon />
                <DemoTitle>Project Dashboard</DemoTitle>
              </DemoHeader>
              <DemoContent>
                <DemoCard1>
                  <div>Current Sprint Progress</div>
                  <DemoProgressBar />
                  <DemoProgressText>
                    <div>67% Complete</div>
                    <div>5 days remaining</div>
                  </DemoProgressText>
                </DemoCard1>

                <DemoCard2>
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
                  <DemoTaskList>
                    {[
                      { title: "Update UI components", status: "In Progress" },
                      { title: "Fix login issue", status: "Pending" },
                      { title: "Add analytics", status: "Completed" },
                    ].map((task) => (
                      <DemoTask key={task.title}>
                        <div>{task.title}</div>
                        {/* <DemoTaskStatus status={task.status}>
                          {task.status}
                        </DemoTaskStatus> */}
                      </DemoTask>
                    ))}
                  </DemoTaskList>
                </DemoCard2>

                <DemoCard2>
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
                  <DemoTeam>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <DemoAvatar key={i}>
                        {String.fromCharCode(64 + i)}
                      </DemoAvatar>
                    ))}
                  </DemoTeam>
                </DemoCard2>
              </DemoContent>
            </DemoCard>
          </DemoContainer>
        </HeroGrid>
      </Container>
    </HeroSection>
  );
};

export default HeroCover;
