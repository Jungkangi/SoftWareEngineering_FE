import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authisLogin } from "../../props/authisLogin";
import * as S from "./authStyled";
import {
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
} from "../intro/introStyled";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { useLogin } from "../../hooks/login";
import { useCreateUser } from "../../hooks/createUser";
import { useNavigate } from "react-router-dom";

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

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useRecoilState(authisLogin);
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

  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isPasswordMismatch =
    authMode !== "login" && passwordCheck && password !== passwordCheck;

  const { login, loading, error } = useLogin();
  const { createUser } = useCreateUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "login") {
      console.log("start" + uid + password);
      const result = await login(uid, password);
      if (result) {
        alert(`반갑습니다 ${uid}님!`);
        localStorage.setItem("access_token", result.access_token);
        navigate("/");
      } else {
        alert(
          `로그인 실패:\n
          ${error}\n
          다시 시도해 주세요 문제가 계속될경우 관리자에게 문의해 주세요.`
        );
      }
    } else {
      const result = await createUser(uid, nickname, password, email, phone);
      if (result) {
        alert(`${uid}님의 회원가입이 완료되었습니다!`);
        setAuthMode("login");
      } else {
        alert(
          `회원가입 실패:\n
            ${error}\n
            다시 시도해 주세요 문제가 계속될경우 관리자에게 문의해 주세요.`
        );
      }
    }
  };

  return (
    <S.Wrapper>
      <S.LinkWraper to="/intro">
        <ArrowLeft />
      </S.LinkWraper>
      <S.Container>
        <S.ZeroLeft authMode={authMode}>
          <img src="/assets/5278.jpg" alt="Background"></img>
        </S.ZeroLeft>
        <S.Left authMode={authMode}>
          <S.Title>
            {authMode === "login" ? "Login Jungkang2" : "Signup Jungkang2"}
          </S.Title>
          <S.SocialButtons>
            <S.SocialButton provider="google">
              <img
                src="/assets/Google__G__logo.svg"
                alt="Google"
                style={{ width: 20, marginRight: 8 }}
              />
              {authMode === "login"
                ? "Login with Google"
                : "Signup with Google"}
            </S.SocialButton>
          </S.SocialButtons>
          <S.Separator>OR</S.Separator>
          <S.Form>
            {authMode === "login" ? (
              <>
                <S.Input
                  type="text"
                  name="UID"
                  placeholder="Enter ID"
                  onChange={(e) => setUid(e.target.value)}
                  required
                />
                <S.Input
                  type="password"
                  name="PASSWORD"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            ) : (
              <>
                <S.Input
                  type="text"
                  name="UID"
                  placeholder="Enter ID"
                  required
                  onChange={(e) => setUid(e.target.value)}
                />
                <S.Input
                  type="text"
                  name="NICKNAME"
                  placeholder="Enter Nickname"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <S.Input
                  type="password"
                  name="PASSWORD"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <S.Input
                  type="password"
                  name="PASSWORD_CHECK"
                  placeholder="Enter Password Check"
                  required
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  style={
                    isPasswordMismatch
                      ? { borderColor: "red", outlineColor: "red" }
                      : undefined
                  }
                />
                <S.Input
                  type="email"
                  name="EMAIL"
                  placeholder="Enter email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <S.Input
                  type="tel"
                  name="PHONE"
                  placeholder="Enter phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <S.ForgotPasswordWrapper>
              <S.ForgotLink>
                {authMode === "login" ? "Forgot password?" : ""}
              </S.ForgotLink>
              <S.ForgotLink
                onClick={() => {
                  if (authMode === "login") {
                    setAuthMode("Signup");
                  } else {
                    setAuthMode("login");
                  }
                }}
              >
                {authMode === "login"
                  ? "You don't have an account"
                  : "Already have an account?"}
              </S.ForgotLink>
            </S.ForgotPasswordWrapper>

            <S.SubmitButton type="submit" onClick={handleSubmit}>
              {authMode === "login" ? "Login" : "SignUp"}
            </S.SubmitButton>
          </S.Form>
        </S.Left>
        <S.Right authMode={authMode}>
          <DashboardCard>
            <DashboardHeader>
              <LayoutDashboard />
              <DashboardTitle>Project Dashboard</DashboardTitle>
            </DashboardHeader>
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

            <DashboardContent>
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
        </S.Right>
      </S.Container>
    </S.Wrapper>
  );
};

export default Auth;
