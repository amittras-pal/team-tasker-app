import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Chat from "../modules/Chat/Chat";
import Home from "../modules/Home/Home";
import Login from "../modules/Login/Login";
import ProjectDetails from "../modules/Projects/ProjectDetails";
import ProjectMembers from "../modules/Projects/ProjectMembers";
import ProjectsList from "../modules/Projects/ProjectsList";
import Register from "../modules/Register/Register";
import ResetPassword from "../modules/ResetPassword/ResetPassword";
import TasksList from "../modules/Tasks/TasksList";
import UserAccount from "../modules/UserAccount/UserAccount";
import { GuestGuard, AuthGuard } from "./RouteGuard";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />
      <Route
        path="register"
        element={
          <GuestGuard>
            <Register />
          </GuestGuard>
        }
      />
      <Route
        path="reset-password"
        element={
          <GuestGuard>
            <ResetPassword />
          </GuestGuard>
        }
      />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }>
        <Route index element={<ProjectsList />} />
        <Route path="my-account" element={<UserAccount />} />
        <Route path="project/:projectId" element={<Outlet />}>
          <Route index element={<ProjectDetails />} />
          <Route path="members" element={<ProjectMembers />} />
          <Route path="tasks" element={<TasksList />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
