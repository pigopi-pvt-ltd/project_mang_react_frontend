import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import { useGetAllProjectsQuery } from "../../features/projects/projectApi";
import { useGetAllUsersQuery } from "../../features/users/userApi";


export default function AdminHome() {
  const users = useGetAllUsersQuery();
  const projects = useGetAllProjectsQuery();
 
  return (
    <DashboardShell
      eyebrow="TOP HEADER"
      title="Admin dashboard"
      description="A clear view of your PiVault workspace and team activity."
    >
      <section className="metric-grid" aria-label="Workspace summary">
        <article className="metric-card">
          <span className="metric-icon">♟</span>
          <div>
            <span>Users</span>
            <strong>{users.data?.length ?? "--"}</strong>
          </div>
          <small>Active team members</small>
        </article>
        
        <article className="metric-card">
          <span className="metric-icon">▣</span>
          <div>
            <span>Projects</span>
            <strong>{projects.data?.length ?? "--"}</strong>
          </div>
          <small>Tracked workspaces</small>
        </article>
        <article className="metric-card metric-card-accent">
          <span className="metric-icon">⌕</span>
          <div>
            <span>Workspace health</span>
            <strong>Good</strong>
          </div>
          <small>All systems ready</small>
        </article>
      </section>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">QUICK ACTIONS</span>
            <h3>Keep your workspace moving</h3>
          </div>
          <span className="panel-status">Live overview</span>
        </div>
        <div className="quick-action-grid">
          <Link className="quick-action" to="/projects">
            <span>＋</span>
            <strong>Create project</strong>
            <small>Organize new work in PiVault</small>
          </Link>
          <Link className="quick-action" to="/profile">
            <span>＋</span>
            <strong>Manage team</strong>
            <small>Review your administrator profile</small>
          </Link>
        </div>
      </section>

   
    </DashboardShell>
  );
}
