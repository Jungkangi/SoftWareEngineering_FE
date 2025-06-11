import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Intro,
  Layout,
  ProjectsPage,
  SprintsPage,
  AuthPage,
  Team,
} from "../page/index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="project" element={<ProjectsPage />} />
          <Route path="sprint" element={<SprintsPage />} />
          <Route path="team" element={<Team />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
