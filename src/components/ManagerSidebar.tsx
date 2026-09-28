
// src/components/layout/ManagerSidebar.tsx

import { NavLink } from "react-router-dom";

interface ManagerSidebarProps {
  onClose: () => void;
  onLogout: () => void;
  isLoggingOut?: boolean;
}

export default function ManagerSidebar({
  onClose,
  onLogout,
  isLoggingOut = false,
}: ManagerSidebarProps) {
  return (
    <>
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="sidebar-mark">PV</span>
        <span>PiVault</span>
      </div>

      {/* Manager Label */}
      <div className="sidebar-role">
        <span>MANAGER PANEL</span>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/manager" end onClick={onClose}>
          <span>⌂</span>
          Home
        </NavLink>

        <NavLink to="/projects" end onClick={onClose}>
          <span>▣</span>
          Projects
        </NavLink>

        <NavLink to="/manager/employees" end onClick={onClose}>
          <span>♙</span>
          Employees
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
