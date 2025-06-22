import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  FormGrid,
  FormGroup,
  FormRow,
  Label,
  Textarea,
} from "../../components/ui";
import {
  PageContainer,
  MainContent,
  Header,
  Main,
  ContentContainer,
  PageHeader,
  PageTitle,
  ActionButtons,
  ProjectSelectArea,
} from "./sprintStyled"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import BurndownChart from "./BurndownChart"
import React from "react"
import Modal from "../../components/modal/modal"
import { CommentBox, CommentType } from "../../components/ui"
import SprintWideModal from "./SprintWideModal";
import {
  SprintModalContent,
  SprintModalLeft,
  SprintModalRight,
  SprintModalInfoList,
  SprintModalCloseWrapper,
} from "./sprintStyled"

//import api
import { getSprintsByProject } from "../../hooks/sprint/getSprintsByProject";
import { useGetMyProjects } from "../../hooks/project/getProjectData";

export default function SprintsPage() {
  const [activeProjectId, setActiveProjectId] = useState(1);
  const [activeTab, setActiveTab] = useState("board");
  const [isProjectSelectOpen, setIsProjectSelectOpen] = useState(false);
  const [showNewSprintDialog, setShowNewSprintDialog] = useState(false);
  const [currentSprintIndex, setCurrentSprintIndex] = useState(0); // 추가: 현재 sprint 인덱스

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { projects: apiProjects } = useGetMyProjects(refreshTrigger);
  const projects = [
    { id: 0, name: "All" },
    ...apiProjects.map((p, index) => ({
      id: index + 1,
      name: p.P_NAME,
    })),
  ];

  // Replace react-query useQuery with manual fetch using useEffect/useState
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [sprintsLoading, setSprintsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSprints = async () => {
      setSprintsLoading(true);
      try {
        const data = await getSprintsByProject(Number(activeProjectId));
        // Map issues into columns by STAT
        const issues = data.reduce(
          (acc: any, issue: any) => {
            const status = issue.STAT;
            const newIssue = {
              id: issue.S_ID,
              title: issue.TITLE,
              assignee: issue.ASSIGNEE || "NY", // 기본값 설정 (걸려있는 사람)
              priority: issue.PRIORITY || "Medium",
              stat: issue.STAT,
            };
            if (!acc[status]) acc[status] = [];
            acc[status].push(newIssue);
            return acc;
          },
          {
            TODO: [],
            PROCESSING: [],
            REVIEW: [],
            DONE: [],
          }
        );
        setSprints([
          {
            id: 1,
            projectId: Number(activeProjectId),
            name: "Sample Sprint",
            startDate: "2025-06-22",
            endDate: "",
            status: "PROCESSING",
            progress: 0,
            issues,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch sprints", error);
      } finally {
        setSprintsLoading(false);
      }
    };

    fetchSprints();
  }, [activeProjectId]);

  // Sprint 타입 정의
  type Sprint = {
    id: number;
    projectId: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    progress: number;
    issues: {
      TODO: any[];
      PROCESSING: any[];
      REVIEW: any[];
      DONE: any[];
    };
  };

  // Filter sprints by active project
  const filteredSprints = sprints.filter(
    (sprint: Sprint) => sprint.projectId === activeProjectId
  );

  // 현재 보고 있는 sprint 인덱스가 범위를 벗어나면 0으로 리셋
  const safeSprintIndex = Math.min(
    currentSprintIndex,
    Math.max(filteredSprints.length - 1, 0)
  );

  // Current active sprint (이제 인덱스로 관리)
  const activeSprint = filteredSprints[safeSprintIndex] || undefined;

  // Get sprint column counts
  const getColumnCounts = (sprint: Sprint | undefined) => {
    if (!sprint || !sprint.issues) {
      return {
        todo: 0,
        inProgress: 0,
        review: 0,
        done: 0,
      };
    }

    return {
      todo: sprint.issues.TODO?.length || 0,
      inProgress: sprint.issues.PROCESSING?.length || 0,
      review: sprint.issues.REVIEW?.length || 0,
      done: sprint.issues.DONE?.length || 0,
    };
  };

  const columnCounts = getColumnCounts(activeSprint);

  // 새 스프린트 생성 핸들러 (실제 데이터 추가는 필요에 따라 구현)
  const handleCreateSprint = (data: {
    name: string;
    startDate: string;
    endDate: string;
    goal: string;
  }) => {
    // 예시: alert(JSON.stringify(data))
    // 실제로는 setSprints([...sprints, ...]) 등으로 추가
    alert(`Sprint created: ${JSON.stringify(data)}`);
  };

  // 프로젝트 변경 시 인덱스 초기화
  const handleProjectChange = (projectId: number) => {
    setActiveProjectId(projectId);
    setCurrentSprintIndex(0);
  };

  // Burndown chart용 예시 데이터 생성 (실제 서비스에서는 백엔드에서 받아오거나 이슈 완료일로 계산)
  const getBurndownData = () => {
    if (!activeSprint) return [];
    const start = new Date(activeSprint.startDate);
    const end = new Date(activeSprint.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return [];

    const days = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const total = activeSprint.issues
      ? (Object.values(activeSprint.issues) as any[]).reduce(
          (sum: number, arr) => {
            if (Array.isArray(arr)) {
              return sum + arr.length;
            }
            return sum;
          },
          0
        )
      : 0;
    // 예시: 매일 1개씩 완료된다고 가정
    return Array.from({ length: days + 1 }, (_, i) => ({
      date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      remaining: Math.max(total - i, 0),
    }));
  };

  // 칸반 이슈 상태 관리
  const [boardIssues, setBoardIssues] = useState(() =>
    activeSprint
      ? {
          todo: [...activeSprint.issues.TODO],
          inProgress: [...activeSprint.issues.PROCESSING],
          review: [...activeSprint.issues.REVIEW],
          done: [...activeSprint.issues.DONE],
        }
      : { todo: [], inProgress: [], review: [], done: [] }
  );

  // activeSprint가 바뀌면 boardIssues도 동기화
  React.useEffect(() => {
    if (activeSprint) {
      setBoardIssues({
        todo: [...activeSprint.issues.TODO],
        inProgress: [...activeSprint.issues.PROCESSING],
        review: [...activeSprint.issues.REVIEW],
        done: [...activeSprint.issues.DONE],
      });
    }
  }, [activeSprint]);

  // 드래그 완료 시 이슈 상태 변경
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCol = source.droppableId as keyof typeof boardIssues;
    const destCol = destination.droppableId as keyof typeof boardIssues;

    const sourceList = Array.from(boardIssues[sourceCol]);
    const [removed] = sourceList.splice(source.index, 1);
    const destList = Array.from(boardIssues[destCol]);
    destList.splice(destination.index, 0, removed);

    setBoardIssues((prev) => ({
      ...prev,
      [sourceCol]: sourceList,
      [destCol]: destList,
    }));
  };

  // Add Todo Modal 상태
  const [showAddIssueModal, setShowAddIssueModal] = useState<
    null | keyof typeof boardIssues
  >(null);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueAssignee, setNewIssueAssignee] = useState("");
  const [newIssuePriority, setNewIssuePriority] = useState("Medium");

  // 이슈 추가 핸들러
  const handleAddIssue = () => {
    if (!showAddIssueModal || !newIssueTitle.trim()) return;
    setBoardIssues((prev) => {
      const newId =
        Math.max(
          ...Object.values(prev)
            .flat()
            .map((issue) => issue.id),
          0
        ) + 1;
      const newIssue = {
        id: newId,
        title: newIssueTitle,
        assignee: newIssueAssignee || "Unassigned",
        priority: newIssuePriority,
      };
      return {
        ...prev,
        [showAddIssueModal]: [...prev[showAddIssueModal], newIssue],
      };
    });
    setShowAddIssueModal(null);
    setNewIssueTitle("");
    setNewIssueAssignee("");
    setNewIssuePriority("Medium");
  };

  // View Details 모달 상태
  const [viewSprint, setViewSprint] = useState<Sprint | null>(null)

  // 이슈별 댓글 상태
  const [issueComments, setIssueComments] = useState<{ [issueId: number]: CommentType[] }>({})
  const [commentInputs, setCommentInputs] = useState<{ [issueId: number]: string }>({})
  const [openCommentIssueId, setOpenCommentIssueId] = useState<number | null>(null)

  // 이슈별 댓글 상태 추가
  const [modalIssueComments, setModalIssueComments] = useState<{ [issueId: number]: CommentType[] }>({})

  // 댓글 추가 함수
  const handleAddIssueComment = (issueId: number, content: string) => {
    if (!content.trim()) return
    setIssueComments(prev => ({
      ...prev,
      [issueId]: [
        ...(prev[issueId] || []),
        {
          id: Date.now(),
          author: "Me",
          content,
          createdAt: new Date().toLocaleString(),
        }
      ]
    }))
    setCommentInputs(prev => ({ ...prev, [issueId]: "" }))
  }

  function handleAddModalIssueComment(issueId: number, content: string) {
    if (!content.trim()) return
    setModalIssueComments(prev => ({
      ...prev,
      [issueId]: [
        ...(prev[issueId] || []),
        {
          id: Date.now(),
          author: "Me",
          content,
          createdAt: new Date().toLocaleString(),
        }
      ]
    }))
  }

  // 댓글 삭제 함수
  const handleDeleteIssueComment = (issueId: number, commentId: number) => {
    setIssueComments(prev => ({
      ...prev,
      [issueId]: (prev[issueId] || []).filter(c => c.id !== commentId)
    }))
  }
  function handleDeleteModalIssueComment(issueId: number, commentId: number) {
    setModalIssueComments(prev => ({
      ...prev,
      [issueId]: (prev[issueId] || []).filter(c => c.id !== commentId)
    }))
  }

  // 이슈 상세 모달 상태 추가 (여기에 선언!)
  const [viewIssue, setViewIssue] = useState<null | { issue: Issue; column: string }>(null);

  return (
    <PageContainer>
      <MainContent>
        <Header>
          <ProjectSelectArea style={{ width: "100%", maxWidth: 400 }}>
            <h4>Selected Project</h4>
            <Select>
              <SelectTrigger
                onClick={() => setIsProjectSelectOpen((open) => !open)}
                tabIndex={0}
              >
                <SelectValue>
                  {projects.find((p) => p.id === activeProjectId)?.name ||
                    "Select project"}
                </SelectValue>
              </SelectTrigger>
              {isProjectSelectOpen && (
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id}
                      onClick={() => {
                        handleProjectChange(project.id);
                        setIsProjectSelectOpen(false);
                      }}
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
          </ProjectSelectArea>
          {/* <div>
            <Button size="sm" onClick={() => setShowNewSprintDialog(true)}>
              <Plus size={16} style={{ marginRight: 6 }} />
              New Sprint
            </Button>
          </div> */}
        </Header>
        <Main>
          <ContentContainer>
            <PageHeader>
              <PageTitle>Sprints</PageTitle>
              {/* <ActionButtons>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentSprintIndex((idx) => Math.max(idx - 1, 0))
                  }
                  disabled={safeSprintIndex === 0}
                >
                  <ChevronLeft size={16} style={{ marginRight: 4 }} />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentSprintIndex((idx) =>
                      Math.min(idx + 1, filteredSprints.length - 1)
                    )
                  }
                  disabled={
                    safeSprintIndex === filteredSprints.length - 1 ||
                    filteredSprints.length === 0
                  }
                >
                  Next
                  <ChevronRight size={16} style={{ marginLeft: 4 }} />
                </Button>
              </ActionButtons> */}
            </PageHeader>

            {/* 카드 4분할 */}
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              <Card>
                <CardHeader style={{ paddingBottom: 8 }}>
                  <CardTitle style={{ fontSize: 14, fontWeight: 500 }}>
                    Current Sprint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>
                    {activeSprint?.name || "No active sprint"}
                  </div>
                  <p style={{ fontSize: 12, color: "#888" }}>
                    {activeSprint
                      ? `${activeSprint.startDate} - ${activeSprint.endDate}`
                      : "No dates available"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader style={{ paddingBottom: 8 }}>
                  <CardTitle style={{ fontSize: 14, fontWeight: 500 }}>
                    Sprint Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>
                    {(() => {
                      const doneCount = activeSprint?.issues?.DONE?.length || 0;
                      const totalCount = activeSprint?.issues
                        ? Object.values(activeSprint.issues).reduce(
                            (sum, arr) => sum + arr.length,
                            0
                          )
                        : 0;
                      const progress =
                        totalCount > 0
                          ? Math.round((doneCount / totalCount) * 100)
                          : 0;
                      return progress;
                    })()}
                    %
                  </div>
                  <Progress
                    value={(() => {
                      const doneCount = activeSprint?.issues?.DONE?.length || 0;
                      const totalCount = activeSprint?.issues
                        ? Object.values(activeSprint.issues).reduce(
                            (sum, arr) => sum + arr.length,
                            0
                          )
                        : 0;
                      const progress =
                        totalCount > 0
                          ? Math.round((doneCount / totalCount) * 100)
                          : 0;
                      return progress;
                    })()}
                    style={{ marginTop: 8, height: 8 }}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader style={{ paddingBottom: 8 }}>
                  <CardTitle style={{ fontSize: 14, fontWeight: 500 }}>
                    Total Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>
                    {Object.values(columnCounts).reduce((a, b) => a + b, 0)}
                  </div>
                  <p style={{ fontSize: 12, color: "#888" }}>
                    {columnCounts.done} completed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader style={{ paddingBottom: 8 }}>
                  <CardTitle style={{ fontSize: 14, fontWeight: 500 }}>
                    Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>24 points</div>
                  <p style={{ fontSize: 12, color: "#888" }}>
                    +3 from last sprint
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs>
              <TabsList>
                <TabsTrigger
                  active={activeTab === "board"}
                  onClick={() => setActiveTab("board")}
                >
                  Board
                </TabsTrigger>
                <TabsTrigger
                  active={activeTab === "list"}
                  onClick={() => setActiveTab("list")}
                >
                  List
                </TabsTrigger>
                <TabsTrigger
                  active={activeTab === "analytics"}
                  onClick={() => setActiveTab("analytics")}
                >
                  Analytics
                </TabsTrigger>
              </TabsList>
              <TabsContent
                style={{ display: activeTab === "board" ? "block" : "none" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeSprint?.name || "Sprint Board"}
                    </CardTitle>
                    <CardDescription>
                      Drag and drop issues between columns to update their
                      status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <div
                        style={{
                          display: "grid",
                          gap: 16,
                          gridTemplateColumns: "repeat(4, 1fr)",
                        }}
                      >
                        {Object.entries({
                          todo: "To Do",
                          inProgress: "In Progress",
                          review: "Review",
                          done: "Done",
                        }).map(([key, label]) => (
                          <Droppable droppableId={key} key={key}>
                            {(provided: any, snapshot: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 12,
                                  padding: 16,
                                  background: snapshot.isDraggingOver
                                    ? "#e0e7ff"
                                    : "#f9fafb",
                                  minHeight: 120,
                                  transition: "background 0.2s",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 16,
                                  }}
                                >
                                  <h3 style={{ fontWeight: 500, fontSize: 14 }}>
                                    {label}
                                  </h3>
                                  <Badge variant="outline">
                                    {
                                      boardIssues[
                                        key as keyof typeof boardIssues
                                      ].length
                                    }
                                  </Badge>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                  }}
                                >
                                  {boardIssues[
                                    key as keyof typeof boardIssues
                                  ].map((issue, idx) => (
                                    <Draggable
                                      draggableId={String(issue.id)}
                                      index={idx}
                                      key={issue.id}
                                    >
                                      {(provided: any, snapshot: any) => (
                                        <Card
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            padding: 12,
                                            marginBottom: 8,
                                            background: snapshot.isDragging
                                              ? "#dbeafe"
                                              : "#fff",
                                            ...provided.draggableProps.style,
                                            cursor: "pointer",
                                          }}
                                          onClick={() => setViewIssue({ issue, column: key })}
                                        >
                                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                              <div style={{ fontWeight: 500, fontSize: 14 }}>{issue.title}</div>
                                              <Badge
                                                variant={
                                                  issue.priority === "High"
                                                    ? "destructive"
                                                    : issue.priority ===
                                                      "Medium"
                                                    ? "default"
                                                    : "secondary"
                                                }
                                                style={{
                                                  marginLeft: 8,
                                                  fontSize: 12,
                                                }}
                                              >
                                                {issue.priority}
                                              </Badge>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  fontSize: 12,
                                                  color: "#888",
                                                }}
                                              >
                                                #{issue.id}
                                              </div>
                                              <Avatar
                                                style={{
                                                  width: 24,
                                                  height: 24,
                                                }}
                                              >
                                                <AvatarFallback
                                                  style={{ fontSize: 12 }}
                                                >
                                                  {issue.assignee}
                                                </AvatarFallback>
                                              </Avatar>
                                            </div>
                                            {/* 댓글 박스는 모달에서만 보여줌 */}
                                          </div>
                                        </Card>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                  {boardIssues[key as keyof typeof boardIssues]
                                    .length === 0 && (
                                    <div
                                      style={{
                                        fontSize: 12,
                                        color: "#888",
                                        textAlign: "center",
                                        padding: "16px 0",
                                      }}
                                    >
                                      No issues in {label}
                                    </div>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    style={{ width: "100%", marginTop: 8 }}
                                    onClick={() =>
                                      setShowAddIssueModal(
                                        key as keyof typeof boardIssues
                                      )
                                    }
                                  >
                                    <Plus
                                      size={16}
                                      style={{ marginRight: 4 }}
                                    />
                                    Add Todo
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Droppable>
                        ))}
                      </div>
                    </DragDropContext>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                style={{ display: activeTab === "list" ? "block" : "none" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeSprint?.name || "Sprint Issues"}
                    </CardTitle>
                    <CardDescription>
                      View and manage all issues in this sprint
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                      }}
                    >
                      {["To Do", "In Progress", "Review", "Done"].map(
                        (column, index) => {
                          const issueStatusMap = {
                            "To Do": "TODO",
                            "In Progress": "PROCESSING",
                            Review: "REVIEW",
                            Done: "DONE",
                          } as const;
                          const issueKey =
                            issueStatusMap[
                              column as keyof typeof issueStatusMap
                            ];
                          const issues = activeSprint?.issues?.[issueKey] || [];

                          return (
                            <div
                              key={column}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <h3 style={{ fontWeight: 500 }}>{column}</h3>
                                <Badge variant="outline">{issues.length}</Badge>
                              </div>
                              {issues.length > 0 ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                  }}
                                >
                                  {issues.map((issue) => (
                                    <Card
                                      key={issue.id}
                                      style={{ padding: 12 }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div>
                                          <div style={{ fontWeight: 500 }}>
                                            {issue.title}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: 12,
                                              color: "#888",
                                            }}
                                          >
                                            #{issue.id} • Assigned to{" "}
                                            {issue.assignee}
                                          </div>
                                        </div>
                                        <Badge
                                          variant={
                                            issue.priority === "High"
                                              ? "destructive"
                                              : issue.priority === "Medium"
                                              ? "default"
                                              : "secondary"
                                          }
                                        >
                                          {issue.priority}
                                        </Badge>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    fontSize: 14,
                                    color: "#888",
                                    padding: 8,
                                  }}
                                >
                                  No issues in {column.toLowerCase()}
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                style={{
                  display: activeTab === "analytics" ? "block" : "none",
                }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Sprint Analytics</CardTitle>
                    <CardDescription>
                      Track progress and performance metrics for this sprint
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Burndown Chart
                        </h3>
                        <div
                          style={{
                            height: 200,
                            width: "100%",
                            border: "1px solid #e5e7eb",
                            borderRadius: 12,
                            background: "#f9fafb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {activeSprint &&
                          !isNaN(new Date(activeSprint.startDate).getTime()) &&
                          !isNaN(new Date(activeSprint.endDate).getTime()) ? (
                            <BurndownChart
                              startDate={new Date(activeSprint.startDate)
                                .toISOString()
                                .slice(0, 10)}
                              endDate={new Date(activeSprint.endDate)
                                .toISOString()
                                .slice(0, 10)}
                              totalIssues={Object.values(
                                activeSprint.issues
                              ).reduce((sum, arr) => sum + arr.length, 0)}
                              dailyRemaining={getBurndownData()}
                            />
                          ) : (
                            <p style={{ color: "#888", fontSize: 14 }}>
                              No data
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Issue Distribution
                        </h3>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 8,
                          }}
                        >
                          {Object.entries({
                            "To Do": columnCounts.todo,
                            "In Progress": columnCounts.inProgress,
                            Review: columnCounts.review,
                            Done: columnCounts.done,
                          }).map(([status, count]) => (
                            <Card
                              key={status}
                              style={{ padding: 12, textAlign: "center" }}
                            >
                              <div style={{ fontSize: 22, fontWeight: 700 }}>
                                {count}
                              </div>
                              <div style={{ fontSize: 12, color: "#888" }}>
                                {status}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Team Performance
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}
                        >
                          {["AB", "CD", "EF", "GH"].map((member) => {
                            const assignedIssues = [
                              ...(activeSprint?.issues?.TODO || []),
                              ...(activeSprint?.issues?.PROCESSING || []),
                              ...(activeSprint?.issues?.REVIEW || []),
                              ...(activeSprint?.issues?.DONE || []),
                            ].filter((issue) => issue.assignee === member);

                            const completedIssues = (
                              activeSprint?.issues.DONE || []
                            ).filter((issue) => issue.assignee === member);

                            const completionRate =
                              assignedIssues.length > 0
                                ? Math.round(
                                    (completedIssues.length /
                                      assignedIssues.length) *
                                      100
                                  )
                                : 0;

                            return (
                              <div
                                key={member}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                }}
                              >
                                <Avatar style={{ width: 32, height: 32 }}>
                                  <AvatarFallback
                                    style={{
                                      background: "#6366f1",
                                      color: "#fff",
                                      fontSize: 12,
                                    }}
                                  >
                                    {member}
                                  </AvatarFallback>
                                </Avatar>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginBottom: 4,
                                    }}
                                  >
                                    <p style={{ fontSize: 14 }}>{member}</p>
                                    <p style={{ fontSize: 12, color: "#888" }}>
                                      {completedIssues.length}/
                                      {assignedIssues.length} issues
                                    </p>
                                  </div>
                                  <Progress
                                    value={completionRate}
                                    style={{ height: 8 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Project Sprints</CardTitle>
                <CardDescription>
                  All sprints for{" "}
                  {projects.find((p) => p.id === activeProjectId)?.name ||
                    "this project"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {filteredSprints.map((sprint: Sprint) => (
                    <Card key={sprint.id} style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          display: "flex",
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        <div
                          style={{
                            width: 4,
                            background:
                              sprint.status === "Completed"
                                ? "#22c55e"
                                : sprint.status === "In Progress"
                                ? "#3b82f6"
                                : "#d1d5db",
                          }}
                        ></div>
                        <CardHeader style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <CardTitle style={{ fontSize: 18 }}>
                              {sprint.name}
                            </CardTitle>
                            <Badge
                              variant={
                                sprint.status === "Completed"
                                  ? "success"
                                  : sprint.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {sprint.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {sprint.startDate} - {sprint.endDate}
                          </CardDescription>
                        </CardHeader>
                      </div>
                      <CardContent style={{ padding: 16 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 14,
                                marginBottom: 4,
                              }}
                            >
                              <span>Progress</span>
                              <span>{sprint.progress}%</span>
                            </div>
                            <Progress
                              value={sprint.progress}
                              style={{ height: 8 }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: 12 }}>
                            {["Todo", "In Progress", "Review", "Done"].map(
                              (status) => {
                                const key = status
                                  .toLowerCase()
                                  .replace(
                                    " ",
                                    ""
                                  ) as keyof typeof sprint.issues;
                                const count =
                                  sprint.issues && sprint.issues[key]
                                    ? sprint.issues[key].length
                                    : 0;

                                return (
                                  <div key={status} style={{ flex: 1 }}>
                                    <div
                                      style={{
                                        textAlign: "center",
                                        padding: 8,
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 8,
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {count}
                                      </div>
                                      <div
                                        style={{ fontSize: 12, color: "#888" }}
                                      >
                                        {status}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setViewSprint(sprint)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Modal isOpen={!!viewSprint} onClose={() => setViewSprint(null)}>
              {viewSprint && (
                <div>
                  <h2 style={{ marginBottom: 12 }}>
                    {viewSprint.name} Details
                  </h2>
                  <div style={{ marginBottom: 8 }}>
                    <b>Status:</b> {viewSprint.status}
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <b>Period:</b> {viewSprint.startDate} ~ {viewSprint.endDate}
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <b>Progress:</b> {viewSprint.progress}%
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <b>Issues:</b>
                    <ul style={{ margin: "8px 0 0 16px", fontSize: 14 }}>
                      <li>To Do: {viewSprint.issues.TODO.length}</li>
                      <li>
                        In Progress: {viewSprint.issues.PROCESSING.length}
                      </li>
                      <li>Review: {viewSprint.issues.REVIEW.length}</li>
                      <li>Done: {viewSprint.issues.DONE.length}</li>
                    </ul>
                  </div>
                  {/* 예시: 스프린트 상세 모달 내 이슈별 댓글 */}
                  {(["todo", "inProgress", "review", "done"] as const).map((col) =>
                    viewSprint.issues[col]?.map?.((issue: any) => (
                      <div key={issue.id} style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
                        <div style={{ fontWeight: 500 }}>{issue.title}</div>
                        <CommentBox
                          comments={modalIssueComments[issue.id] || []}
                          onAdd={content => handleAddModalIssueComment(issue.id, content)}
                          onDelete={commentId => handleDeleteModalIssueComment(issue.id, commentId)}
                        />
                      </div>
                    ))
                  )}
                  <div style={{ marginTop: 16, textAlign: "right" }}>
                    <Button
                      variant="outline"
                      onClick={() => setViewSprint(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </Modal>

            {/* 이슈 상세 모달 */}
            <SprintWideModal
              isOpen={!!viewIssue}
              onClose={() => setViewIssue(null)}
            >
              {viewIssue && (
                <SprintModalContent>
                  <SprintModalLeft>
                    <h3>댓글</h3>
                    <div className="comment-box-wrapper">
                      <CommentBox
                        comments={issueComments[viewIssue.issue.id] || []}
                        onAdd={content => handleAddIssueComment(viewIssue.issue.id, content)}
                        onDelete={commentId => handleDeleteIssueComment(viewIssue.issue.id, commentId)}
                        inputPlaceholder="이 이슈에 댓글을 남겨보세요!"
                        style={{
                          flex: 1,
                          minHeight: 0,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                        }}
                      />
                    </div>
                  </SprintModalLeft>
                  <SprintModalRight>
                    <h2 style={{ marginBottom: 8 }}>Issue Details</h2>
                    <SprintModalInfoList>
                      <div><b>Title:</b> {viewIssue.issue.title}</div>
                      <div><b>Assignee:</b> {viewIssue.issue.assignee}</div>
                      <div><b>Priority:</b> {viewIssue.issue.priority}</div>
                      <div><b>Column:</b> {viewIssue.column}</div>
                      <div><b>ID:</b> {viewIssue.issue.id}</div>
                    </SprintModalInfoList>
                    <SprintModalCloseWrapper>
                      <Button onClick={() => setViewIssue(null)}>Close</Button>
                    </SprintModalCloseWrapper>
                  </SprintModalRight>
                </SprintModalContent>
              )}
            </SprintWideModal>
          </ContentContainer>
        </Main>
        <NewSprintDialog
          open={showNewSprintDialog}
          onClose={() => setShowNewSprintDialog(false)}
          onSubmit={handleCreateSprint}
        />
        {/* Add Todo Modal */}
        <Modal
          isOpen={!!showAddIssueModal}
          onClose={() => setShowAddIssueModal(null)}
        >
          <div>
            <h2 style={{ marginBottom: 16 }}>Add Todo</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label>
                Title
                <input
                  style={{
                    width: "100%",
                    marginTop: 4,
                    marginBottom: 8,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                  }}
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  placeholder="Enter issue title"
                />
              </label>
              <label>
                Assignee
                <input
                  style={{
                    width: "100%",
                    marginTop: 4,
                    marginBottom: 8,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                  }}
                  value={newIssueAssignee}
                  onChange={(e) => setNewIssueAssignee(e.target.value)}
                  placeholder="Enter assignee (optional)"
                />
              </label>
              <label>
                Priority
                <select
                  style={{
                    width: "100%",
                    marginTop: 4,
                    marginBottom: 8,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                  }}
                  value={newIssuePriority}
                  onChange={(e) => setNewIssuePriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>
            </div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <Button
                variant="ghost"
                onClick={() => setShowAddIssueModal(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddIssue} disabled={!newIssueTitle.trim()}>
                Add
              </Button>
            </div>
          </div>
        </Modal>
      </MainContent>
    </PageContainer>
  );
}

// NewSprintDialog 로직 분리
function NewSprintDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    startDate: string;
    endDate: string;
    goal: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, startDate, endDate, goal });
    setName("");
    setStartDate("");
    setEndDate("");
    setGoal("");
    onClose();
  };

  if (!open) return null;

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new sprint</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new sprint.
            </DialogDescription>
          </DialogHeader>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="sprint-name">Sprint name</Label>
              <input
                id="sprint-name"
                placeholder="Enter sprint name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  minHeight: "2.5rem",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  padding: 8,
                  fontSize: 14,
                  background: "#fff",
                  color: "#222",
                }}
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label htmlFor="sprint-start-date">Start date</Label>
                <input
                  type="date"
                  id="sprint-start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    minHeight: "2.5rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    padding: 8,
                    fontSize: 14,
                    background: "#fff",
                    color: "#222",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="sprint-end-date">End date</Label>
                <input
                  type="date"
                  id="sprint-end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    minHeight: "2.5rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    padding: 8,
                    fontSize: 14,
                    background: "#fff",
                    color: "#222",
                  }}
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label htmlFor="sprint-goal">Sprint goal</Label>
              <Textarea
                id="sprint-goal"
                placeholder="Describe the sprint goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  padding: 8,
                  fontSize: 14,
                }}
              />
            </FormGroup>
          </FormGrid>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button type="submit">Create Sprint</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogOverlay>
  );
}
