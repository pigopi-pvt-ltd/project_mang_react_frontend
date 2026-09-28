import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/Forget Password"; 
import ResetPassword from "../pages/auth/ResetPassword";
import AdminHome from "../pages/dashboard/AdminHome";
import EmployeeHome from "../pages/dashboard/EmployeeHome";
import ManagerHome from "../pages/dashboard/ManagerHome";
import Projects from "../pages/projects/Projects";
import CreateProject from "../pages/projects/Create.tsx";
import Users from "../pages/users/Users";
import CreateUser from "../pages/users/Create.tsx"
import Profile from "../pages/profiles/Profile.tsx";
import { ProtectedRoute, RoleHomeRedirect, RoleRoute } from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<RoleHomeRedirect />} />
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["SuperAdmin"]}>
                <AdminHome />
              </RoleRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <RoleRoute allowedRoles={["Manager"]}>
                <ManagerHome />
              </RoleRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <RoleRoute allowedRoles={["Employee"]}>
                <EmployeeHome />
              </RoleRoute>
            }
          />
          <Route path="/dashboard" element={<RoleHomeRedirect />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/admin/users"
            element={
              <RoleRoute allowedRoles={["SuperAdmin"]}>
                <Users />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/projects/create"
            element={
              <RoleRoute allowedRoles={["SuperAdmin"]}>
                <CreateProject />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/users/create"
            element={
              <RoleRoute allowedRoles={["SuperAdmin"]}>
                <CreateUser />
              </RoleRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
