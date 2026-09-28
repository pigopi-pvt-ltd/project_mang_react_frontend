
// src/components/common/StatCard.tsx
import type { ReactNode } from "react";


interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  variant = "default",
  onClick,
}: StatCardProps) {

  return (
    <div
      className={`stat-card stat-card-${variant}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >

      <div className="stat-card-header">

        <span className="stat-card-title">
          {title}
        </span>

        {icon && (
          <span className="stat-card-icon">
            {icon}
          </span>
        )}

      </div>

      <div className="stat-card-value">
        {value}
      </div>

      {description && (
        <div className="stat-card-description">
          {description}
        </div>
      )}

    </div>
  );
}

