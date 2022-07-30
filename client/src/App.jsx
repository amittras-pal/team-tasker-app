import { Outlet, Route, Routes } from "react-router-dom";
import Chat from "./modules/Chat/Chat";
import Home from "./modules/Home/Home";
import Login from "./modules/Login/Login";
import ProjectDetails from "./modules/Projects/ProjectDetails";
import ProjectMembers from "./modules/Projects/ProjectMembers";
import ProjectsList from "./modules/Projects/ProjectsList";
import Register from "./modules/Register/Register";
import ResetPassword from "./modules/ResetPassword/ResetPassword";
import TasksList from "./modules/Tasks/TasksList";
import UserAccount from "./modules/UserAccount/UserAccount";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />}>
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
    </QueryClientProvider>
  );
}

export default App;
