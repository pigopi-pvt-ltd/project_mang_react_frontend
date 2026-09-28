// src/components/layout/RoleSidebar.tsx

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../features/auth/authApi";
import { clearUser } from "../features/auth/authSlice";
import type { RootState, AppDispatch } from "../app/store";

import AdminSidebar from "./AdminSidebar";
import ManagerSidebar from "./ManagerSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

interface RoleSidebarProps {
  onClose: () => void;
  isOpen?: boolean;
}

export default function RoleSidebar({
  onClose,
  isOpen ,
}: RoleSidebarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // Server session may already be expired.
    } finally {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  };

  if (!user) {
    return null;
  }

  const content = (() => {
    switch (user.role) {
      case "SuperAdmin":
        return (
          <AdminSidebar
            onClose={onClose}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        );
      case "Manager":
        return (
          <ManagerSidebar
            onClose={onClose}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        );
      case "Employee":
        return (
          <EmployeeSidebar
            onClose={onClose}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        );
      default:
        return null;
    }
  })();

  if (!content) {
    return null;
  }

  return (
    <aside
      className={isOpen ? "dashboard-sidebar is-open" : "dashboard-sidebar"}
    >
      {content}
    </aside>
  );
}
