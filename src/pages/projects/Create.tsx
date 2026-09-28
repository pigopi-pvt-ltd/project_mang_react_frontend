import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardShell from "../../components/DashboardShell";
import { useCreateProjectMutation } from "../../features/projects/projectApi";

export default function CreateProject() {
  const navigate = useNavigate();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Project name is required.");
      return;
    }

    try {
      await createProject({
        name,
        description: description || undefined,
      }).unwrap();

      navigate("/projects", { replace: true });
    } catch (submitError: any) {
      setError(
        submitError?.data?.message ||
          "Something went wrong while creating the project."
      );
    }
  };

  return (
    <DashboardShell
      eyebrow="ADMIN"
      title="Create Project"
      description="Add a project and share the purpose with your team."
    >
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">NEW PROJECT</span>
            <h3>Project details</h3>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="project-description">Project Description</label>
            <textarea
              id="project-description"
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the project"
              disabled={isLoading}
              style={{
                width: "100%",
                resize: "vertical",
                padding: "13px 14px",
                border: "1px solid #c7d6d5",
                borderRadius: "9px",
                outline: "none",
                color: "#16383d",
                background: "#f8fbfa",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error ? <div className="auth-error">{error}</div> : null}

          <div className="login-actions" style={{ justifyContent: "flex-start" }}>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </section>
    </DashboardShell>
  );
}
