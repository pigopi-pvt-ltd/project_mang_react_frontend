import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import { useGetMyProjectsQuery } from "../../features/projects/projectApi";

export default function EmployeeHome() {
  const projects = useGetMyProjectsQuery();

  return (
    <DashboardShell
      eyebrow="PERSONAL SPACE"
      title="Your workspace"
      description="Everything you need for the projects you are working on."
    >
      <section className="welcome-banner employee-banner">
        <div>
          <span className="panel-kicker">WELCOME BACK</span>
          <h3>Make progress that matters.</h3>
          <p>Open a project, find your next task, and keep your work moving forward.</p>
        </div>
        <span className="banner-mark">E</span>
      </section>

      <section className="metric-grid metric-grid-two">
        <article className="metric-card">
          <span className="metric-icon">▣</span>
          <div>
            <span>My projects</span>
            <strong>{projects.data?.length ?? "--"}</strong>
          </div>
          <small>Your current project assignments</small>
        </article>
        <article className="metric-card metric-card-accent">
          <span className="metric-icon">✓</span>
          <div>
            <span>Workspace status</span>
            <strong>Ready</strong>
          </div>
          <small>Your tools are ready to use</small>
        </article>
      </section>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">YOUR NEXT STEP</span>
            <h3>Jump into your work</h3>
          </div>
        </div>
        <div className="quick-action-grid quick-action-grid-single">
          <Link className="quick-action" to="/projects">
            <span>→</span>
            <strong>Open my projects</strong>
            <small>See projects assigned to your account</small>
          </Link>
        </div>
      </section>
    </DashboardShell>
  );
}
