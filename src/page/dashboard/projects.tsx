import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  Label,
  Textarea,
} from "../../components/ui"
import { useIsMobile } from "../../hooks/use-mobile"

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Header = styled.header`
  display: flex;
  height: 4rem;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ theme }) => theme.space[6]};
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 20rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 24rem;
  }
`

const Main = styled.main`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.space[6]};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  letter-spacing: -0.025em;
`

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

interface TabProps {
  active?: boolean
}

const Tab = styled.button<TabProps>`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  border-bottom: 2px solid ${({ active, theme }) => (active ? theme.colors.primary : "transparent")};
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mutedForeground)};
  
  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`

const TabContent = styled.div`
  margin-top: ${({ theme }) => theme.space[4]};
`

const GridContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TeamMemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`

const TeamMemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TeamMemberName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TeamMemberRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

const AvatarGroup = styled.div`
  display: flex;
  margin-left: -0.5rem;
`

// Dialog Components
const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const DialogContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 32rem;
  max-height: 85vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 32.5rem;
  }
`

const DialogHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const DialogTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space[1]};
`

const DialogDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]} 0;
`

const FormGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[4]};
`

// Dropdown Components
const DropdownContainer = styled.div`
  position: relative;
`

const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  min-width: 8rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const DropdownLabel = styled.div`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

const DropdownSeparator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.space[1]} 0;
`

const DropdownItem = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`

const DropdownItemDestructive = styled(DropdownItem)`
  color: ${({ theme }) => theme.colors.destructive};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.destructive}10;
  }
`

// Select Components
const SelectContainer = styled.div`
  position: relative;
`

const SelectTriggerContainer = styled.button`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  padding: 0 ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`

const SelectValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: ${({ theme }) => theme.space[1]};
`

const SelectItem = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space[4]};
`


// 미디어 쿼리를 처리하는 TableHead 스타일
const ResponsiveTableHead = styled(TableHead)`
  display: none;

  @media (min-width: 768px) {
    display: table-cell;
  }
`;

const ResponsiveTableHeadLg = styled(TableHead)`
  display: none;

  @media (min-width: 1024px) {
    display: table-cell;
  }
`;

// 미디어 쿼리를 처리하는 TableCell 스타일
const ResponsiveTableCell = styled(TableCell)`
  display: none;

  @media (min-width: 768px) {
    display: table-cell;
  }
`;

const ResponsiveTableCellLg = styled(TableCell)`
  display: none;

  @media (min-width: 1024px) {
    display: table-cell;
  }
`;

// Main Component
export default function ProjectsPage() {
  const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState("all")
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(null)
  const [showPrioritySelect, setShowPrioritySelect] = useState(false)
  const [showCategorySelect, setShowCategorySelect] = useState(false)

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
    <SidebarProvider defaultOpen={!isMobile}>
      <PageContainer>
        <Sidebar>
          <SidebarHeader>
            <Link
              to="/dashboard"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", fontSize: "1.25rem" }}
            >
              <LayoutDashboard size={24} color="#111827" />
              <span>TaskForge</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={item.label === "Projects"}>
                    <Link to={item.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: "500" }}>John Doe</p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Admin</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <MainContent>
          <Header>
            <SidebarTrigger />
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
                                  onClick={() =>
                                    setShowActionDropdown(
                                      project.id === showActionDropdown ? null : project.id
                                    )
                                  }
                                >
                                  <ChevronDown size={16} />
                                </Button>
                                {showActionDropdown === project.id && (
                                  <DropdownContent>
                                    <DropdownItem>View Project</DropdownItem>
                                    <DropdownItem>Edit Project</DropdownItem>
                                    <DropdownItem>Manage Team</DropdownItem>
                                    <DropdownSeparator />
                                    <DropdownItemDestructive>Delete Project</DropdownItemDestructive>
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
                      {[
                        { name: "Alex Brown", initials: "AB", projects: 3, tasks: 12 },
                        { name: "Chris Davis", initials: "CD", projects: 3, tasks: 8 },
                        { name: "Emma Ford", initials: "EF", projects: 2, tasks: 6 },
                        { name: "Grace Hill", initials: "GH", projects: 1, tasks: 4 },
                        { name: "Ivan Jones", initials: "IJ", projects: 2, tasks: 7 },
                      ].map((member) => (
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
                    <Button variant="ghost" size="sm" style={{ width: "100%" }}>
                      View All Team Members
                    </Button>
                  </CardFooter>
                </Card>
              </GridContainer>
            </ContentContainer>
          </Main>
        </MainContent>
      </PageContainer>

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
    </SidebarProvider>
  )
}
