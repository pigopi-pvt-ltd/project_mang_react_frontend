import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../app/store";
import type { Role } from "../types/role";

interface RoleRouteProps {
  allowedRoles: Role[];
  children?: ReactNode;
}

export function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function RoleHomeRedirect() { 
  const role = useSelector((state: RootState) => state.auth.user?.role);

  if (role === "SuperAdmin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "Manager") {
    return <Navigate to="/manager" replace />;
  }

  return <Navigate to="/employee" replace />;
}
