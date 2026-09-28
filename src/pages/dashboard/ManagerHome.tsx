import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import { useGetMyProjectsQuery } from "../../features/projects/projectApi";

export default function ManagerHome() {
  const projects = useGetMyProjectsQuery();

  return (
    <DashboardShell
      eyebrow="TEAM SPACE"
      title="Manager workspace"
      description="Coordinate your projects and keep the team aligned."
    >
      <section className="welcome-banner">
        <div>
          <span className="panel-kicker">MANAGER VIEW</span>
          <h3>Lead with a clear view of the work.</h3>
          <p>Review assigned projects, monitor progress, and keep your team focused.</p>
        </div>
        <span className="banner-mark">M</span>
      </section>

      <section className="metric-grid metric-grid-two">
        <article className="metric-card">
          <span className="metric-icon">▣</span>
          <div>
            <span>My projects</span>
            <strong>{projects.data?.length ?? "--"}</strong>
          </div>
          <small>Projects assigned to you</small>
        </article>
        <article className="metric-card metric-card-accent">
          <span className="metric-icon">↗</span>
          <div>
            <span>Team focus</span>
            <strong>On track</strong>
          </div>
          <small>Keep momentum across your work</small>
        </article>
      </section>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">MANAGER TOOLS</span>
            <h3>What would you like to do?</h3>
          </div>
        </div>
        <div className="quick-action-grid">
          <Link className="quick-action" to="/projects">
            <span>▣</span>
            <strong>Open projects</strong>
            <small>Review your project workspace</small>
          </Link>
          <Link className="quick-action" to="/profile">
            <span>◉</span>
            <strong>View profile</strong>
            <small>Keep your contact details current</small>
          </Link>
        </div>
      </section>
    </DashboardShell>
  );
}
