import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardShell from "../../components/DashboardShell";
import { useCreateUserMutation } from "../../features/users/userApi";
import type { Role } from "../../types/role";

const roles = ["Manager", "Employee"] as const;

type UserFormState = {
  username: string;
  email: string;
  password: string;
  role: Role;
  mobileNumber: string;
  github: string;
  officialEmail: string;
  address: string;
};

export default function CreateUser() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [form, setForm] = useState<UserFormState>({
    username: "",
    email: "",
    password: "",
    role: "Employee",
    mobileNumber: "",
    github: "",
    officialEmail: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!username || !email || !password) {
      setError("Username, email, and password are required.");
      return;
    }

    try {
      await createUser({
        username,
        email,
        password,
        role: form.role,
        mobilenumber: form.mobileNumber || undefined,
        github: form.github || undefined,
        officialEmail: form.officialEmail || undefined,
        address: form.address || undefined,
      }).unwrap();

      navigate("/admin/users", { replace: true });
    } catch (submitError: any) {
      setError(
        submitError?.data?.message ||
          "Something went wrong while creating the user."
      );
    }
  };

  return (
    <DashboardShell
      eyebrow="ADMIN"
      title="Create User"
      description="Add a manager or employee account for your PiVault workspace."
    >
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">NEW USER</span>
            <h3>User details</h3>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #c7d6d5",
                borderRadius: "9px",
                outline: "none",
                color: "#16383d",
                background: "#f8fbfa",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="login-field">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="text"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              placeholder="Optional"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="github">GitHub</label>
            <input
              id="github"
              type="text"
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="Optional"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="officialEmail">Official Email</label>
            <input
              id="officialEmail"
              type="email"
              name="officialEmail"
              value={form.officialEmail}
              onChange={handleChange}
              placeholder="Optional"
              disabled={isLoading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows={4}
              value={form.address}
              onChange={handleChange}
              placeholder="Optional"
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
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </section>
    </DashboardShell>
  );
}
