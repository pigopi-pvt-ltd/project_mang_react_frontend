import DashboardShell from "../../components/DashboardShell";
import { useGetMyProjectsQuery } from "../../features/projects/projectApi";

export default function Projects() {
  const { data: projects = [], isLoading } = useGetMyProjectsQuery();

  return (
    <DashboardShell
      eyebrow="WORKSPACE"
      title="Projects"
      description="Browse the workspaces connected to your account."
    >
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">PROJECT DIRECTORY</span>
            <h3>{isLoading ? "Loading projects..." : `${projects.length} projects`}</h3>
          </div>
          {/* <span className="panel-status">Search ready</span> */}
        </div>
        <div className="project-list">
          {projects.length > 0 ? (
            projects.map((project) => (
              <article className="project-row" key={project.id}>
                <span className="project-icon">▣</span>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.description || "No description provided"}</span>
                </div>
                <span className="project-arrow">→</span>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <span>▣</span>
              <strong>No projects available yet</strong>
              <p>Your assigned projects will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}