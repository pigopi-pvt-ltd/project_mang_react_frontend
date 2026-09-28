
// src/components/layout/DashboardShell.tsx

import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import RoleSidebar from "./RoleSidebar";
import "../App.css";

interface DashboardShellProps {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}

export default function DashboardShell({
  children,
  eyebrow,
  title,
  description,
}: DashboardShellProps) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* ================= SIDEBAR ================= */}
      <div className="dashboard-sidebar-wrapper">
        <RoleSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Mobile backdrop */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      {/* ================= MAIN ================= */}

      <div className="dashboard-main">

        {/* Common Navbar */}

        <Navbar
          eyebrow={eyebrow}
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}

        <main className="dashboard-content">

          <div className="page-intro">

            <div>
              <h2>{title}</h2>

              <p>
                {description}
              </p>
            </div>

          </div>

          {children}

        </main>

      </div>

    </div>
  );
}
;
