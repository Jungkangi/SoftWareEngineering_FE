import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Intro } from "../page";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/intro" element={<Intro />} />
    </Routes>
  );
};

export default AppRouter;
