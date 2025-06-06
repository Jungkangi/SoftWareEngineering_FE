import { useState, useRef } from "react"
import {
  Calendar,
  ChevronDown,
  Filter,
  Home,
  LayoutDashboard,
  LineChart,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
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
  // 아래는 스타일 컴포넌트 import
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
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  FormGrid,
  FormGroup,
  FormRow,
  DropdownContainer,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownItem,
  DropdownItemDestructive,
  SelectContainer,
  SelectTriggerContainer,
  SelectValue,
  SelectContent,
  SelectItem,
  DialogFooter,
  ResponsiveTableHead,
  ResponsiveTableHeadLg,
  ResponsiveTableCell,
  ResponsiveTableCellLg,
} from "./projectStyled"
import Modal from "../../components/modal/modal"

// Main Component
export default function ProjectsPage() {
  // const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState("all")
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(null)
  const [modalState, setModalState] = useState<{
    type: null | "view" | "edit" | "team" | "delete",
    project: any | null
  }>({ type: null, project: null })
  const [showPrioritySelect, setShowPrioritySelect] = useState(false)
  const [showCategorySelect, setShowCategorySelect] = useState(false)
  // 추가: 전체 팀원 모달 상태
  const [showAllTeamModal, setShowAllTeamModal] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null)
  const actionBtnRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({})

  // 팀원 데이터 분리
  const teamMembers = [
    { name: "Alex Brown", initials: "AB", projects: 3, tasks: 12 },
    { name: "Chris Davis", initials: "CD", projects: 3, tasks: 8 },
    { name: "Emma Ford", initials: "EF", projects: 2, tasks: 6 },
    { name: "Grace Hill", initials: "GH", projects: 1, tasks: 4 },
    { name: "Ivan Jones", initials: "IJ", projects: 2, tasks: 7 },
  ]

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: LayoutDashboard, label: "Projects", href: "/dashboard/projects" },
    { icon: Calendar, label: "Sprints", href: "/dashboard/sprints" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
    { icon: LineChart, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website with new branding.",
      progress: 75,
      team: ["AB", "CD", "EF"],
      issues: { total: 24, completed: 18 },
      priority: "High",
      dueDate: "Nov 15, 2023",
      status: "In Progress",
      category: "Web Development",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Build native mobile apps for iOS and Android.",
      progress: 45,
      team: ["AB", "CD", "GH"],
      issues: { total: 36, completed: 16 },
      priority: "Medium",
      dueDate: "Dec 10, 2023",
      status: "In Progress",
      category: "Mobile Development",
    },
    {
      id: 3,
      name: "API Integration",
      description: "Integrate third-party APIs for payment processing.",
      progress: 90,
      team: ["AB", "IJ"],
      issues: { total: 18, completed: 16 },
      priority: "Low",
      dueDate: "Oct 30, 2023",
      status: "In Progress",
      category: "Backend Development",
    },
    {
      id: 4,
      name: "User Research",
      description: "Conduct user research for the new product.",
      progress: 100,
      team: ["CD", "EF"],
      issues: { total: 12, completed: 12 },
      priority: "Medium",
      dueDate: "Oct 15, 2023",
      status: "Completed",
      category: "Research",
    },
    {
      id: 5,
      name: "Database Migration",
      description: "Migrate from MySQL to PostgreSQL.",
      progress: 10,
      team: ["AB", "IJ", "KL"],
      issues: { total: 20, completed: 2 },
      priority: "High",
      dueDate: "Dec 30, 2023",
      status: "Planning",
      category: "Infrastructure",
    },
  ]

  // Filter projects based on selected tab
  const filteredProjects = projects.filter((project) => {
    if (selectedTab === "all") return true
    if (selectedTab === "in-progress") return project.status === "In Progress"
    if (selectedTab === "completed") return project.status === "Completed"
    if (selectedTab === "planning") return project.status === "Planning"
    return true
  })

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
                  <Button variant="outline" size="sm" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
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
                <Tab active={selectedTab === "all"} onClick={() => setSelectedTab("all")}>
                  All Projects
                </Tab>
                <Tab active={selectedTab === "in-progress"} onClick={() => setSelectedTab("in-progress")}>
                  In Progress
                </Tab>
                <Tab active={selectedTab === "completed"} onClick={() => setSelectedTab("completed")}>
                  Completed
                </Tab>
                <Tab active={selectedTab === "planning"} onClick={() => setSelectedTab("planning")}>
                  Planning
                </Tab>
              </TabsList>
              <TabContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Projects ({filteredProjects.length})</CardTitle>
                    <CardDescription>Manage and monitor your team's projects</CardDescription>
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
                              <div style={{ fontWeight: "500" }}>{project.name}</div>
                              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                                {project.status} • Due {project.dueDate}
                              </div>
                            </TableCell>
                            <ResponsiveTableCell>
                              <Badge
                                variant={
                                  project.status === "Completed"
                                    ? "success"
                                    : project.status === "Planning"
                                    ? "secondary"
                                    : "default"
                                }
                              >
                                {project.status}
                              </Badge>
                            </ResponsiveTableCell>
                            <ResponsiveTableCell>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <Progress value={project.progress} />
                                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
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
                              <DropdownContainer>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  ref={el => (actionBtnRefs.current[project.id] = el)}
                                  onClick={() => {
                                    if (project.id === showActionDropdown) {
                                      setShowActionDropdown(null)
                                      setDropdownPosition(null)
                                    } else {
                                      // 위치 계산
                                      const btn = actionBtnRefs.current[project.id]
                                      if (btn) {
                                        const rect = btn.getBoundingClientRect()
                                        const dropdownHeight = 180 // 예상 드롭다운 높이(px)
                                        const spaceBelow = window.innerHeight - rect.bottom
                                        const spaceAbove = rect.top
                                        let top = rect.bottom
                                        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                                          // 위로 띄움
                                          top = rect.top - dropdownHeight
                                        }
                                        setDropdownPosition({
                                          top,
                                          left: rect.left,
                                          width: rect.width,
                                        })
                                      }
                                      setShowActionDropdown(project.id)
                                    }
                                  }}
                                >
                                  <ChevronDown size={16} />
                                </Button>
                                {showActionDropdown === project.id && (
                                  <DropdownContent
                                    $fixedTop={dropdownPosition?.top}
                                    $fixedLeft={dropdownPosition?.left}
                                    $fixedWidth={dropdownPosition?.width}
                                  >
                                    <DropdownItem onClick={() => {
                                      setModalState({ type: "view", project })
                                      setShowActionDropdown(null)
                                      setDropdownPosition(null)
                                    }}>View Project</DropdownItem>
                                    <DropdownItem onClick={() => {
                                      setModalState({ type: "edit", project })
                                      setShowActionDropdown(null)
                                      setDropdownPosition(null)
                                    }}>Edit Project</DropdownItem>
                                    <DropdownItem onClick={() => {
                                      setModalState({ type: "team", project })
                                      setShowActionDropdown(null)
                                      setDropdownPosition(null)
                                    }}>Manage Team</DropdownItem>
                                    <DropdownSeparator />
                                    <DropdownItemDestructive onClick={() => {
                                      setModalState({ type: "delete", project })
                                      setShowActionDropdown(null)
                                      setDropdownPosition(null)
                                    }}>Delete Project</DropdownItemDestructive>
                                  </DropdownContent>
                                )}
                              </DropdownContainer>
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
                  <CardTitle style={{ fontSize: "0.875rem" }}>Project Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { name: "Web Development", count: 2 },
                      { name: "Mobile Development", count: 1 },
                      { name: "Backend Development", count: 1 },
                      { name: "Research", count: 1 },
                      { name: "Infrastructure", count: 1 },
                    ].map((category) => (
                      <CategoryItem key={category.name}>
                        <span style={{ fontSize: "0.875rem" }}>{category.name}</span>
                        <Badge variant="outline">{category.count}</Badge>
                      </CategoryItem>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "0.875rem" }}>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { status: "Planning", count: 1, percentage: 20 },
                      { status: "In Progress", count: 3, percentage: 60 },
                      { status: "Completed", count: 1, percentage: 20 },
                    ].map((status) => (
                      <StatusItem key={status.status}>
                        <StatusHeader>
                          <span style={{ fontSize: "0.875rem" }}>{status.status}</span>
                          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{status.count}</span>
                        </StatusHeader>
                        <Progress value={status.percentage} />
                      </StatusItem>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: "0.875rem" }}>Team Workload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {teamMembers.slice(0, 5).map((member) => (
                      <TeamMemberItem key={member.initials}>
                        <Avatar style={{ height: "2rem", width: "2rem" }}>
                          <AvatarFallback
                            style={{ backgroundColor: "#111827", color: "#ffffff", fontSize: "0.75rem" }}
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
        <DialogOverlay onClick={() => setShowNewProjectDialog(false)}>
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Create new project</DialogTitle>
              <DialogDescription>Fill in the details below to create a new project for your team.</DialogDescription>
            </DialogHeader>
            <FormGrid>
              <FormGroup>
                <Label htmlFor="project-name">Project name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="Enter project description" />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="priority">Priority</Label>
                  <SelectContainer>
                    <SelectTriggerContainer onClick={() => setShowPrioritySelect(!showPrioritySelect)}>
                      <SelectValue>Medium</SelectValue>
                      <ChevronDown size={16} />
                    </SelectTriggerContainer>
                    {showPrioritySelect && (
                      <SelectContent>
                        <SelectItem>High</SelectItem>
                        <SelectItem>Medium</SelectItem>
                        <SelectItem>Low</SelectItem>
                      </SelectContent>
                    )}
                  </SelectContainer>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <SelectContainer>
                    <SelectTriggerContainer onClick={() => setShowCategorySelect(!showCategorySelect)}>
                      <SelectValue>Web Development</SelectValue>
                      <ChevronDown size={16} />
                    </SelectTriggerContainer>
                    {showCategorySelect && (
                      <SelectContent>
                        <SelectItem>Web Development</SelectItem>
                        <SelectItem>Mobile Development</SelectItem>
                        <SelectItem>Backend Development</SelectItem>
                        <SelectItem>Research</SelectItem>
                        <SelectItem>Infrastructure</SelectItem>
                      </SelectContent>
                    )}
                  </SelectContainer>
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label htmlFor="due-date">Due date</Label>
                <Input type="date" id="due-date" />
              </FormGroup>
            </FormGrid>
            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      )}

      {/* 모달 구현 */}
      <Modal
        isOpen={modalState.type !== null}
        onClose={() => setModalState({ type: null, project: null })}
      >
        {modalState.type === "view" && modalState.project && (
          <div>
            <h2 style={{ marginBottom: 8 }}>Project Details</h2>
            <div><b>Name:</b> {modalState.project.name}</div>
            <div><b>Description:</b> {modalState.project.description}</div>
            <div><b>Status:</b> {modalState.project.status}</div>
            <div><b>Progress:</b> {modalState.project.progress}%</div>
            <div><b>Due Date:</b> {modalState.project.dueDate}</div>
            <div><b>Priority:</b> {modalState.project.priority}</div>
            <div><b>Category:</b> {modalState.project.category}</div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={() => setModalState({ type: null, project: null })}>Close</Button>
            </div>
          </div>
        )}
        {modalState.type === "edit" && modalState.project && (
          <div>
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
              <Button variant="outline" onClick={() => setModalState({ type: null, project: null })}>Cancel</Button>
            </div>
          </div>
        )}
        {modalState.type === "team" && modalState.project && (
          <div>
            <h2 style={{ marginBottom: 8 }}>Manage Team</h2>
            <div>
              {modalState.project.team.map((member: string, idx: number) => (
                <div key={idx} style={{ marginBottom: 4 }}>
                  <Avatar style={{ height: "2rem", width: "2rem", display: "inline-flex", marginRight: 8 }}>
                    <AvatarFallback>{member}</AvatarFallback>
                  </Avatar>
                  <span>{member}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Button variant="outline" onClick={() => setModalState({ type: null, project: null })}>Close</Button>
            </div>
          </div>
        )}
        {modalState.type === "delete" && modalState.project && (
          <div>
            <h2 style={{ marginBottom: 8, color: "#ef4444" }}>Delete Project</h2>
            <div>정말로 <b>{modalState.project.name}</b> 프로젝트를 삭제하시겠습니까?</div>
            <div style={{ marginTop: 16 }}>
              <Button variant="destructive" style={{ marginRight: 8 }}>Delete</Button>
              <Button variant="outline" onClick={() => setModalState({ type: null, project: null })}>Cancel</Button>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {teamMembers.map((member) => (
              <TeamMemberItem key={member.initials}>
                <Avatar style={{ height: "2rem", width: "2rem" }}>
                  <AvatarFallback
                    style={{ backgroundColor: "#111827", color: "#ffffff", fontSize: "0.75rem" }}
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
            <Button variant="outline" onClick={() => setShowAllTeamModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}