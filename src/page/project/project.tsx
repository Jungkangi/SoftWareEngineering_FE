import { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Label,
  Textarea,
  PageContainer,
  MainContent,
  Header,
  SearchContainer,
  Main,
  ContentContainer,
  PageHeader,
  PageTitle,
  ActionButtons,
  TabsContainer,
  TabsList,
  Tab,
  TabContent,
  GridContainer,
  CategoryItem,
  StatusItem,
  StatusHeader,
  TeamMemberItem,
  TeamMemberInfo,
  TeamMemberName,
  TeamMemberRole,
  AvatarGroup,
  DropdownContainer,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownItem,
  DropdownItemDestructive,
  ResponsiveTableHead,
  ResponsiveTableHeadLg,
  ResponsiveTableCell,
  ResponsiveTableCellLg,
  EditModal,
} from "./projectStyled";
import * as S from "./projectStyled";
import Modal from "../../components/modal/modal";
import CreateProjectForm from "./createProject";
import ProjectDetail from "./projectDetail";

// api import
import { useGetMyProjects } from "../../hooks/project/getProjectData";
import { putProjectData } from "../../hooks/project/putProjectData";
import { deleteProjectData } from "../../hooks/project/DeleteProjectData";

// Main Component
export default function ProjectsPage() {
  // const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState("all");
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(
    null
  );
  const [modalState, setModalState] = useState<{
    type: null | "view" | "edit" | "team" | "delete";
    project: any | null;
  }>({ type: null, project: null });
  // 상태 드롭다운 오픈을 위한 상태
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // 삭제 확인 입력 상태 추가
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");

  // 추가: 전체 팀원 모달 상태
  const [showAllTeamModal, setShowAllTeamModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const actionBtnRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // 팀원 데이터 분리
  const teamMembers = [
    { name: "Alex Brown", initials: "AB", projects: 3, tasks: 12 },
    { name: "Chris Davis", initials: "CD", projects: 3, tasks: 8 },
    { name: "Emma Ford", initials: "EF", projects: 2, tasks: 6 },
    { name: "Grace Hill", initials: "GH", projects: 1, tasks: 4 },
    { name: "Ivan Jones", initials: "IJ", projects: 2, tasks: 7 },
  ];

  const {
    projects: apiProjects,
    loading,
    error,
  } = useGetMyProjects(refreshTrigger);

  useEffect(() => {
    if (!showNewProjectDialog) {
      setRefreshTrigger((prev) => prev + 1);
    }
  }, [showNewProjectDialog]);

  const projects = Array.isArray(apiProjects)
    ? apiProjects.map((p, index) => ({
        id: index,
        P_ID: p.P_ID,
        name: p.P_NAME,
        descript: p.DISCRIPTION || "",
        progress: 0,
        team: [],
        issues: { total: 0, completed: 0 },
        priority: "Medium",
        dueDate: new Date(p.P_CDATE).toLocaleDateString(),
        status:
          p.P_STATUS === "IN_PROGRESS"
            ? "In Progress"
            : p.P_STATUS === "COMPLETED"
            ? "Completed"
            : "Planning",
        category:
          p.CATEGORY && p.CATEGORY.trim() !== "" ? p.CATEGORY : "Uncategorized",
      }))
    : [];

  // Filter projects based on selected tab
  const filteredProjects = projects.filter((project) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "in-progress") return project.status === "In Progress";
    if (selectedTab === "completed") return project.status === "Completed";
    if (selectedTab === "planning") return project.status === "Planning";
    return true;
  });

  return (
    <PageContainer>
      <MainContent>
        <Header>
          <SearchContainer>
            <Search size={16} color="#6b7280" />
            <Input type="search" placeholder="Search projects..." />
          </SearchContainer>
        </Header>
        <Main>
          <ContentContainer>
            <PageHeader>
              <PageTitle>Projects</PageTitle>
              <ActionButtons>
                <DropdownContainer>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <Filter size={16} />
                    <span>Filter</span>
                    <ChevronDown size={16} />
                  </Button>
                  {showFilterDropdown && (
                    <DropdownContent>
                      <DropdownLabel>Filter by</DropdownLabel>
                      <DropdownSeparator />
                      <DropdownItem>Priority</DropdownItem>
                      <DropdownItem>Category</DropdownItem>
                      <DropdownItem>Team Member</DropdownItem>
                      <DropdownItem>Due Date</DropdownItem>
                    </DropdownContent>
                  )}
                </DropdownContainer>
                <Button size="sm" onClick={() => setShowNewProjectDialog(true)}>
                  <Plus size={16} />
                  <span>New Project</span>
                </Button>
              </ActionButtons>
            </PageHeader>

            <TabsContainer>
              <TabsList>
                <Tab
                  active={selectedTab === "all"}
                  onClick={() => setSelectedTab("all")}
                >
                  All Projects
                </Tab>
                <Tab
                  active={selectedTab === "in-progress"}
                  onClick={() => setSelectedTab("in-progress")}
                >
                  In Progress
                </Tab>
                <Tab
                  active={selectedTab === "completed"}
                  onClick={() => setSelectedTab("completed")}
                >
                  Completed
                </Tab>
                <Tab
                  active={selectedTab === "planning"}
                  onClick={() => setSelectedTab("planning")}
                >
                  Planning
                </Tab>
              </TabsList>
              <TabContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Projects ({filteredProjects.length})</CardTitle>
                    <CardDescription>
                      Manage and monitor your team's projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <ResponsiveTableHead>Status</ResponsiveTableHead>
                          <ResponsiveTableHead>Progress</ResponsiveTableHead>
                          <ResponsiveTableHead>Due Date</ResponsiveTableHead>
                          <ResponsiveTableHeadLg>Team</ResponsiveTableHeadLg>
                          <TableHead>Priority</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div
                                style={{ fontWeight: "500", cursor: "pointer" }}
                                onClick={() => {
                                  setModalState({ type: "view", project });
                                }}
                              >
                                {project.name}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#6b7280",
                                }}
                              >
                                {project.status} • Due {project.dueDate}
                              </div>
                            </TableCell>
                            <ResponsiveTableCell>
                              <DropdownContainer>
                                <Badge
                                  role="button"
                                  tabIndex={0}
                                  onClick={() =>
                                    setOpenDropdownId((prev) =>
                                      prev === project.P_ID
                                        ? null
                                        : project.P_ID
                                    )
                                  }
                                  variant={
                                    project.status === "Completed"
                                      ? "success"
                                      : project.status === "Planning"
                                      ? "secondary"
                                      : "default"
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {project.status}
                                </Badge>
                                {openDropdownId === project.P_ID && (
                                  <DropdownContent>
                                    {[
                                      "Planning",
                                      "In Progress",
                                      "Completed",
                                    ].map((option) => (
                                      <div
                                        key={option}
                                        onClick={async () => {
                                          if (option === project.status) {
                                            setOpenDropdownId(null);
                                            return;
                                          }

                                          try {
                                            await putProjectData(project.P_ID, {
                                              P_NAME: project.name,
                                              DISCRIPTION: project.descript,
                                              PRIORITY:
                                                project.priority.toUpperCase(),
                                              CATEGORY: project.category,
                                              P_STATUS:
                                                option === "In Progress"
                                                  ? "IN_PROGRESS"
                                                  : option.toUpperCase(),
                                            });
                                            setRefreshTrigger(
                                              (prev) => prev + 1
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          } finally {
                                            setOpenDropdownId(null);
                                          }
                                        }}
                                        style={{
                                          padding: "6px 12px",
                                          cursor: "pointer",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {option}
                                      </div>
                                    ))}
                                  </DropdownContent>
                                )}
                              </DropdownContainer>
                            </ResponsiveTableCell>
                            <ResponsiveTableCell>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                }}
                              >
                                <Progress value={project.progress} />
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                  }}
                                >
                                  {project.progress}%
                                </span>
                              </div>
                            </ResponsiveTableCell>
                            <ResponsiveTableCell>
                              {project.dueDate}
                            </ResponsiveTableCell>
                            <ResponsiveTableCellLg>
                              <AvatarGroup>
                                {project.team.map((member, i) => (
                                  <Avatar key={i}>
                                    <AvatarFallback>{member}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </AvatarGroup>
                            </ResponsiveTableCellLg>
                            <TableCell>
                              <Badge
                                variant={
                                  project.priority === "High"
                                    ? "destructive"
                                    : project.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {project.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <S.DeleteButton
                                onClick={() =>
                                  setModalState({ type: "delete", project })
                                }
                              >
                                Delete
                              </S.DeleteButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabContent>
            </TabsContainer>

            <GridContainer>
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "0.875rem" }}>
                    Project Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {(() => {
                      const categoryCountMap = new Map<string, number>();
                      projects.forEach((p) => {
                        const category = p.category || "Uncategorized";
                        categoryCountMap.set(
                          category,
                          (categoryCountMap.get(category) || 0) + 1
                        );
                      });
                      const categoryList = Array.from(
                        categoryCountMap.entries()
                      );

                      return categoryList.map(([name, count]) => (
                        <CategoryItem key={name}>
                          <span style={{ fontSize: "0.875rem" }}>{name}</span>
                          <Badge variant="outline">{count}</Badge>
                        </CategoryItem>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "0.875rem" }}>
                    Project Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {(() => {
                      const baseStatuses = [
                        "Planning",
                        "In Progress",
                        "Completed",
                      ];
                      const statusMap: Record<string, { count: number }> = {
                        Planning: { count: 0 },
                        "In Progress": { count: 0 },
                        Completed: { count: 0 },
                      };

                      projects.forEach((p) => {
                        if (statusMap[p.status]) {
                          statusMap[p.status].count += 1;
                        }
                      });

                      const total = projects.length;
                      return baseStatuses.map((status) => {
                        const count = statusMap[status].count;
                        const percentage =
                          total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <StatusItem key={status}>
                            <StatusHeader>
                              <span style={{ fontSize: "0.875rem" }}>
                                {status}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                              >
                                {count}
                              </span>
                            </StatusHeader>
                            <Progress value={percentage} />
                          </StatusItem>
                        );
                      });
                    })()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "0.875rem" }}>
                    Team Workload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {teamMembers.slice(0, 5).map((member) => (
                      <TeamMemberItem key={member.initials}>
                        <Avatar style={{ height: "2rem", width: "2rem" }}>
                          <AvatarFallback
                            style={{
                              backgroundColor: "#111827",
                              color: "#ffffff",
                              fontSize: "0.75rem",
                            }}
                          >
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <TeamMemberInfo>
                          <TeamMemberName>{member.name}</TeamMemberName>
                          <TeamMemberRole>
                            {member.projects} projects, {member.tasks} tasks
                          </TeamMemberRole>
                        </TeamMemberInfo>
                      </TeamMemberItem>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ width: "100%" }}
                    onClick={() => setShowAllTeamModal(true)}
                  >
                    View All Team Members
                  </Button>
                </CardFooter>
              </Card>
            </GridContainer>
          </ContentContainer>
        </Main>
      </MainContent>

      {/* New Project Dialog */}
      {showNewProjectDialog && (
        <Modal
          isOpen={showNewProjectDialog}
          onClose={() => setShowNewProjectDialog(false)}
        >
          <CreateProjectForm onClose={() => setShowNewProjectDialog(false)} />
        </Modal>
      )}

      {/* 모달 구현 */}
      <Modal
        isOpen={modalState.type !== null}
        onClose={() => {
          setModalState({ type: null, project: null });
          setDeleteConfirmInput("");
        }}
      >
        {modalState.type === "view" && modalState.project && (
          <ProjectDetail
            projectId={modalState.project.P_ID}
            projectData={{
              P_NAME: modalState.project.name,
              STAT: modalState.project.status,
              DUE_DATE: modalState.project.dueDate,
              DISCRIPTION: modalState.project.descript,
              PRIORITY: modalState.project.priority,
              CATEGORY: modalState.project.category,
            }}
            onUpdate={() => {
              setModalState({ type: null, project: null });
              setRefreshTrigger((prev) => prev + 1);
            }}
          />
        )}
        {modalState.type === "edit" && modalState.project && (
          <EditModal>
            <h2 style={{ marginBottom: 8 }}>Edit Project</h2>
            {/* 간단한 예시 폼, 실제로는 상태 관리 필요 */}
            <div style={{ marginBottom: 8 }}>
              <Label>Project Name</Label>
              <Input defaultValue={modalState.project.name} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <Label>Description</Label>
              <Textarea defaultValue={modalState.project.description} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Button style={{ marginRight: 8 }}>Save</Button>
              <Button
                variant="outline"
                onClick={() => setModalState({ type: null, project: null })}
              >
                Cancel
              </Button>
            </div>
          </EditModal>
        )}
        {modalState.type === "team" && modalState.project && (
          <div>
            <h2 style={{ marginBottom: 8 }}>Manage Team</h2>
            <div>
              {modalState.project.team.map((member: string, idx: number) => (
                <div key={idx} style={{ marginBottom: 4 }}>
                  <Avatar
                    style={{
                      height: "2rem",
                      width: "2rem",
                      display: "inline-flex",
                      marginRight: 8,
                    }}
                  >
                    <AvatarFallback>{member}</AvatarFallback>
                  </Avatar>
                  <span>{member}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Button
                variant="outline"
                onClick={() => setModalState({ type: null, project: null })}
              >
                Close
              </Button>
            </div>
          </div>
        )}
        {modalState.type === "delete" && modalState.project && (
          <div>
            <h2 style={{ marginBottom: 8, color: "#ef4444" }}>
              Delete Project
            </h2>
            <div style={{ marginBottom: 12 }}>
              정말로 <b>{modalState.project.name}</b> 프로젝트를
              삭제하시겠습니까?
            </div>
            <div style={{ marginBottom: 12 }}>
              <Input
                placeholder={`프로젝트 명을 입력하세요: ${modalState.project.name}`}
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <Button
                variant="destructive"
                onClick={async () => {
                  try {
                    await deleteProjectData(modalState.project.P_ID);
                    setModalState({ type: null, project: null });
                    setDeleteConfirmInput("");
                    setRefreshTrigger((prev) => prev + 1);
                  } catch (err) {
                    console.error("Failed to delete project", err);
                  }
                }}
                style={{
                  marginRight: 8,
                  opacity:
                    deleteConfirmInput === modalState.project.name ? 1 : 0.3,
                  pointerEvents:
                    deleteConfirmInput === modalState.project.name
                      ? "auto"
                      : "none",
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setModalState({ type: null, project: null })}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 전체 팀원 모달 */}
      <Modal
        isOpen={showAllTeamModal}
        onClose={() => setShowAllTeamModal(false)}
      >
        <div>
          <h2 style={{ marginBottom: 16 }}>All Team Members</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {teamMembers.map((member) => (
              <TeamMemberItem key={member.initials}>
                <Avatar style={{ height: "2rem", width: "2rem" }}>
                  <AvatarFallback
                    style={{
                      backgroundColor: "#111827",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                    }}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <TeamMemberInfo>
                  <TeamMemberName>{member.name}</TeamMemberName>
                  <TeamMemberRole>
                    {member.projects} projects, {member.tasks} tasks
                  </TeamMemberRole>
                </TeamMemberInfo>
              </TeamMemberItem>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "right" }}>
            <Button
              variant="outline"
              onClick={() => setShowAllTeamModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
