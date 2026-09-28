
// src/components/layout/Navbar.tsx

import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

interface NavbarProps {
  eyebrow: string;
  title: string;
  onMenuClick: () => void;
}

export default function Navbar({
  eyebrow,
  title,
  onMenuClick,
}: NavbarProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const userName = user?.name ?? user?.name ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="dashboard-header"> 

      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Open navigation"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <div>
        <span className="header-eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>
      </div>

      <div className="header-actions">

        <div className="header-profile">

          <span className="avatar avatar-small">
            {userInitial}
          </span>

          <span>
            {userName}
          </span>

        </div>


      </div>

    </header>
  );
}
;
