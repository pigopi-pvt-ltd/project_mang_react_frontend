import { useEffect, useRef, useState } from "react";
import DashboardShell from "../../components/DashboardShell";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "../../features/projects/projectApi";
import { Link } from "react-router-dom";

export default function Projects() {
  const { data: projects = [], isLoading } = useGetAllProjectsQuery();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [projectId, setProjectId] = useState<number | null>(null);
  const projectActionsRef = useRef<HTMLDivElement | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<(typeof projects)[number] | null>(null);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(normalizedSearchTerm) ||
    String(project.id).includes(normalizedSearchTerm)
  );

  useEffect(() => {
    if (projectId === null) return;

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      if (!projectActionsRef.current?.contains(event.target as Node)) {
        setProjectId(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
  }, [projectId]);

  const startEditing = (project: (typeof projects)[number]) => {
    setForm({ name: project.name, description: project.description ?? "" });
    setEditProjectId(project.id);
    setProjectId(null);
    setError("");
  };

  const saveProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name || editProjectId === null) {
      setError("Project name is required.");
      return;
    }

    try {
      await updateProject({
        id: editProjectId,
        data: { name, description: form.description.trim() || undefined },
      }).unwrap();
      setEditProjectId(null);
      setError("");
    } catch (updateError: any) {
      setError(updateError?.data?.message || "Could not update the project.");
    }
  };

  const removeProject = async (id: number) => {
    try {
      await deleteProject(id).unwrap();
      setProjectId(null);
      setProjectToDelete(null);
      setError("");
    } catch (deleteError: any) {
      const responseMessage =
        (typeof deleteError?.data === "string" && deleteError.data) ||
        deleteError?.data?.message ||
        deleteError?.data?.error ||
        deleteError?.error;
      const statusMessage = typeof deleteError?.status === "number"
        ? `Delete failed with status ${deleteError.status}.`
        : "Could not delete the project.";
      setError(responseMessage || statusMessage);
      setProjectToDelete(null);
    }
  };

  useEffect(() => {
    if (!projectToDelete || isDeleting) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProjectToDelete(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [projectToDelete, isDeleting]);

  return (
    <>
      <DashboardShell
        eyebrow="WORKSPACE"
        title="Projects"
        description="Browse the workspaces connected to your account."
      >
        <Link to="/admin/projects/create" className="create-project-button">
          Create Project +
        </Link>

        <div className="project-search">
          <input
            type="text"
            aria-label="Search projects by name or ID"
            placeholder="Search by project name or ID..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">PROJECT DIRECTORY</span>
              <h3>
                {isLoading
                  ? "Loading projects..."
                  : normalizedSearchTerm
                    ? `${filteredProjects.length} of ${projects.length} projects`
                    : `${projects.length} projects`}
              </h3>
            </div>
          </div>
          {error ? <div className="auth-error" role="alert">{error}</div> : null}
          <div className="project-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <article className="project-row" key={project.id}>
                    <span className="project-icon">▣</span>
                  {editProjectId === project.id ? (
                    <form className="project-edit-form" onSubmit={saveProject}>
                      <input
                        aria-label="Project name"
                        value={form.name}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder="Project name"
                        disabled={isUpdating}
                      />
                      <textarea
                        aria-label="Project description"
                        value={form.description}
                        onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                        placeholder="Project description"
                        rows={2}
                        disabled={isUpdating}
                      />
                      <div className="project-edit-actions">
                        <button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={() => { setEditProjectId(null); setError(""); }}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="project-info">
                      <strong>{project.name}</strong>
                      <span>{project.description || "No description provided"}</span>
                    </div>
                  )}

                  {editProjectId !== project.id && (
                    <div
                      className="project-actions"
                      ref={projectId === project.id ? projectActionsRef : undefined}
                    >
                      <button
                        type="button"
                        aria-label={`Project actions for ${project.name}`}
                        aria-expanded={projectId === project.id}
                        onClick={() => setProjectId(project.id === projectId ? null : project.id)}
                        >
                        ⋮
                      </button>
                      {/* viewmore */}
                      {projectId === project.id && (
                        <div className="project-menu">
                          <button type="button" onClick={() => startEditing(project)}>
                            <svg
                              xmlns="http://w3.org"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProjectToDelete(project);
                              setProjectId(null);
                              setError("");
                            }}
                            disabled={isDeleting}
                          >
                            <svg xmlns="http://w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>

                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="empty-state">
                <span>▣</span>
                <strong>{normalizedSearchTerm ? "No matching projects" : "No projects available yet"}</strong>
                <p>{normalizedSearchTerm ? "Try another name or project ID." : "Your assigned projects will appear here."}</p>
              </div>
            )}
          </div>
        </section>
        {projectToDelete && (
          <div
            className="project-confirm-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isDeleting) setProjectToDelete(null);
            }}
          >
            <section
              className="project-confirm-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-project-title"
              aria-describedby="delete-project-description"
            >
              <h2 id="delete-project-title">Delete project?</h2>
              <p id="delete-project-description">
                Delete <strong>{projectToDelete.name}</strong>? This action cannot be undone.
              </p>
              <div className="project-confirm-actions">
                <button
                  type="button"
                  onClick={() => setProjectToDelete(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="project-confirm-delete"
                  onClick={() => removeProject(projectToDelete.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete project"}
                </button>
              </div>
            </section>
          </div>
        )}
      </DashboardShell>

    </>
  );
}