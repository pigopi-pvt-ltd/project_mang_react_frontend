
// src/components/layout/AdminSidebar.tsx

import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  onClose: () => void;
  onLogout: () => void;
  isLoggingOut?: boolean;
}

export default function AdminSidebar({
  onClose,
  onLogout,
  isLoggingOut = false,
}: AdminSidebarProps) {
  return (
    <>
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="sidebar-mark">PV</span>
        <span>PiVault</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink to="/admin" end onClick={onClose}>
          <span>⌂</span>
          Home
        </NavLink>

        <NavLink to="/projects" end onClick={onClose}>
          <span>▣</span>
          All Projects
        </NavLink>

        <NavLink to="/admin/users" end onClick={onClose}>
          <span>♙</span>
          All Users
        </NavLink>

        <NavLink to="/admin/projects/create" end onClick={onClose}>
          <span>＋</span>
          Create Project
        </NavLink>

        <NavLink to="/admin/users/create" end onClick={onClose}>
          <span>＋</span>
          Create User
        </NavLink>

        <NavLink to="/profile" end onClick={onClose}>
          <span>◉</span>
          Profile
        </NavLink>

        <button type="button" onClick={onLogout} disabled={isLoggingOut}>
          <span>⇠</span>
          {isLoggingOut ? "Signing out..." : "Logout"}
        </button>

      </nav>
    </>
  );
}
;
