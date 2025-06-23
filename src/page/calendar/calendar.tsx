import { useEffect, useState, useMemo } from "react";
import { getSprintsByProject } from "../../hooks/sprint/getSprintsByProject";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  PageContainer,
  MainContent,
  Header,
  Main,
  ContentContainer,
  PageTitle,
  ActionButtons,
  Card,
  CardContent,
  Button,
  CalendarHeader,
  CalendarNavigation,
  MonthYearDisplay,
  CalendarGrid,
  CalendarHeaderCell,
  CalendarCell,
  CalendarCellDate,
  CalendarCellEvents,
  IssueItem,
  IssueId,
  IssueTitle,
  EventsOverflow,
  SprintTimeline,
  FilterBar,
  FilterGroup,
  FilterLabel,
  Select,
  Legend,
  LegendItem,
  LegendColor,
  LegendLabel,
  useCalendar,
  useIsMobile,
  theme,
} from "./calendarStyled";

interface Todo {
  id: number;
  title: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "inProgress" | "review" | "done";
  dueDate?: string;
  startDate?: string;
  description?: string;
  storyPoints?: number;
}

interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "planned";
  todos: Todo[];
}

export default function CalendarPage() {
  const isMobile = useIsMobile();
  const {
    currentDate,
    selectedDate,
    filters,
    setSelectedDate,
    setFilters,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  // 프로젝트 ID (임시, 실제로는 동적으로 받아야 함)
  const projectId = 1; // replace with dynamic project id if available

  // 스프린트 상태
  const [sprints, setSprints] = useState<Sprint[]>([]);

  // 스프린트 데이터 API에서 가져오기
  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const sprintData = await getSprintsByProject(projectId);
        const formattedSprints: Sprint[] = sprintData.map((s) => ({
          id: s.S_ID,
          name: s.TITLE,
          startDate: s.CREATE_DATE,
          endDate: s.CREATE_DATE, // placeholder if no end date is provided
          status:
            s.STAT === "COMPLETED"
              ? "completed"
              : s.STAT === "PLANNING"
              ? "planned"
              : "active",
          todos: [], // todos are not included yet
        }));
        setSprints(formattedSprints);
      } catch (error) {
        console.error("Error fetching sprints", error);
      }
    };
    fetchSprints();
  }, []);

  // 모든 투두들을 하나의 배열로 합치기
  const allTodos = useMemo(() => {
    return sprints.flatMap((sprint) => sprint.todos);
  }, [sprints]);

  // 필터링된 투두들
  const filteredTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (filters.assignee !== "all" && todo.assignee !== filters.assignee)
        return false;
      if (filters.status !== "all" && todo.status !== filters.status)
        return false;
      if (filters.priority !== "all" && todo.priority !== filters.priority)
        return false;
      return true;
    });
  }, [allTodos, filters]);

  // 고유한 담당자 목록
  const assignees = useMemo(() => {
    const uniqueAssignees = [...new Set(allTodos.map((todo) => todo.assignee))];
    return uniqueAssignees.sort();
  }, [allTodos]);

  // 특정 날짜의 투두들 가져오기
  const getTodosForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredTodos.filter((todo) => {
      return todo.dueDate === dateStr || todo.startDate === dateStr;
    });
  };

  // 달력 데이터 생성
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isOtherMonth = date.getMonth() !== month;
      const dayTodos = getTodosForDate(date);

      // 스프린트 기간 확인
      const activeSprint = sprints.find((sprint) => {
        const sprintStart = new Date(sprint.startDate);
        const sprintEnd = new Date(sprint.endDate);
        return (
          date >= sprintStart &&
          date <= sprintEnd &&
          (sprint.status === "active" || sprint.status === "planned")
        );
      });

      days.push({
        date,
        isToday,
        isSelected,
        isOtherMonth,
        todos: dayTodos,
        activeSprint,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTodoClick = (todo: Todo) => {
    // 투두 클릭 시 상세 정보를 콘솔에 출력 (실제로는 상세 페이지로 이동하거나 팝오버 표시)
    console.log("Todo clicked:", todo);
  };

  return (
    <PageContainer>
      <MainContent>
        <Header>
          <div>
            <PageTitle>Calendar</PageTitle>
          </div>
          <ActionButtons>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </ActionButtons>
        </Header>
        <Main>
          <ContentContainer>
            {/* 필터 컨트롤 */}
            <FilterBar>
              <FilterGroup>
                <FilterLabel>Assignee:</FilterLabel>
                <Select
                  value={filters.assignee}
                  onChange={(e) =>
                    setFilters({ ...filters, assignee: e.target.value })
                  }
                >
                  <option value="all">All Assignees</option>
                  {assignees.map((assignee) => (
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>
                  ))}
                </Select>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Status:</FilterLabel>
                <Select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="all">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Priority:</FilterLabel>
                <Select
                  value={filters.priority}
                  onChange={(e) =>
                    setFilters({ ...filters, priority: e.target.value })
                  }
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Select>
              </FilterGroup>
            </FilterBar>

            {/* 범례 */}
            <Legend>
              <LegendItem>
                <LegendColor color={theme.colors.todo} />
                <LegendLabel>To Do</LegendLabel>
              </LegendItem>
              <LegendItem>
                <LegendColor color={theme.colors.inProgress} />
                <LegendLabel>In Progress</LegendLabel>
              </LegendItem>
              <LegendItem>
                <LegendColor color={theme.colors.review} />
                <LegendLabel>Review</LegendLabel>
              </LegendItem>
              <LegendItem>
                <LegendColor color={theme.colors.done} />
                <LegendLabel>Done</LegendLabel>
              </LegendItem>
            </Legend>

            {/* 캘린더 */}
            <Card>
              <CalendarHeader>
                <CalendarNavigation>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <MonthYearDisplay>
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </MonthYearDisplay>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight size={16} />
                  </Button>
                </CalendarNavigation>
              </CalendarHeader>
              <CardContent>
                <CalendarGrid>
                  {dayNames.map((day) => (
                    <CalendarHeaderCell key={day}>{day}</CalendarHeaderCell>
                  ))}
                  {calendarDays.map((day, index) => (
                    <CalendarCell
                      key={index}
                      isToday={!!day.isToday}
                      isSelected={!!day.isSelected}
                      isOtherMonth={!!day.isOtherMonth}
                      hasEvents={day.todos.length > 0}
                      onClick={() => handleCellClick(day.date)}
                    >
                      {day.activeSprint && <SprintTimeline />}
                      <CalendarCellDate>{day.date.getDate()}</CalendarCellDate>
                      <CalendarCellEvents>
                        {day.todos.slice(0, 3).map((todo) => (
                          <IssueItem
                            key={todo.id}
                            status={todo.status}
                            priority={todo.priority}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTodoClick(todo);
                            }}
                          >
                            <IssueId>#{todo.id}</IssueId>
                            <IssueTitle>{todo.title}</IssueTitle>
                          </IssueItem>
                        ))}
                        {day.todos.length > 3 && (
                          <EventsOverflow
                            onClick={() => handleCellClick(day.date)}
                          >
                            +{day.todos.length - 3} more
                          </EventsOverflow>
                        )}
                      </CalendarCellEvents>
                    </CalendarCell>
                  ))}
                </CalendarGrid>
              </CardContent>
            </Card>

            {/* 선택된 날짜의 투두 목록 */}
            {selectedDate && (
              <Card>
                <CardContent>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                    }}
                  >
                    Todos for {selectedDate.toLocaleDateString()}
                  </h3>
                  {getTodosForDate(selectedDate).length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {getTodosForDate(selectedDate).map((todo) => (
                        <div
                          key={todo.id}
                          style={{
                            padding: "0.75rem",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleTodoClick(todo)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <strong>#{todo.id}</strong> {todo.title}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "0.25rem",
                                  fontSize: "0.75rem",
                                  backgroundColor:
                                    todo.status === "todo"
                                      ? theme.colors.todo
                                      : todo.status === "inProgress"
                                      ? theme.colors.inProgress
                                      : todo.status === "review"
                                      ? theme.colors.review
                                      : theme.colors.done,
                                  color:
                                    todo.status === "todo"
                                      ? theme.colors.todoForeground
                                      : todo.status === "inProgress"
                                      ? theme.colors.inProgressForeground
                                      : todo.status === "review"
                                      ? theme.colors.reviewForeground
                                      : theme.colors.doneForeground,
                                }}
                              >
                                {todo.status === "todo"
                                  ? "To Do"
                                  : todo.status === "inProgress"
                                  ? "In Progress"
                                  : todo.status === "review"
                                  ? "Review"
                                  : "Done"}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                              >
                                {todo.assignee}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      No todos for this date
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </ContentContainer>
        </Main>
      </MainContent>
    </PageContainer>
  );
}
