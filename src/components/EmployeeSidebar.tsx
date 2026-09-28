
// src/components/layout/EmployeeSidebar.tsx

import { NavLink } from "react-router-dom";

interface EmployeeSidebarProps {
  onClose: () => void;
  onLogout: () => void;
  isLoggingOut?: boolean;
}

export default function EmployeeSidebar({
  onClose,
  onLogout,
  isLoggingOut = false,
}: EmployeeSidebarProps) {
  return (
    <>
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="sidebar-mark">PV</span>
        <span>PiVault</span>
      </div>

      {/* Employee Label */}
      <div className="sidebar-role">
        <span>EMPLOYEE PANEL</span>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/employee" end onClick={onClose}>
          <span>⌂</span>
          Home
        </NavLink>

        <NavLink to="/projects" end onClick={onClose}>
          <span>▣</span>
          My Projects
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
