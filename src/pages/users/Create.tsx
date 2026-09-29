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

type UserFieldErrors = Partial<Record<keyof UserFormState, string>>;

const apiFieldNames: Record<string, keyof UserFormState> = {
  username: "username",
  name: "username",
  email: "email",
  password: "password",
  role: "role",
  mobilenumber: "mobileNumber",
  mobile: "mobileNumber",
  phone: "mobileNumber",
  github: "github",
  officialemail: "officialEmail",
  address: "address",
};

function getFieldErrors(errorMessage: unknown): UserFieldErrors {
  if (typeof errorMessage !== "object" || errorMessage === null) return {};

  const fieldErrors: UserFieldErrors = {};
  for (const [apiFieldName, fieldMessage] of Object.entries(errorMessage)) {
    const fieldName =
      apiFieldNames[apiFieldName.toLowerCase().replace(/[^a-z]/g, "")];
    if (!fieldName) continue;

    const message = Array.isArray(fieldMessage)
      ? fieldMessage
          .filter((item): item is string => typeof item === "string")
          .join(" ")
      : typeof fieldMessage === "string"
        ? fieldMessage
        : undefined;

    if (message) fieldErrors[fieldName] = message;
  }

  return fieldErrors;
}

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
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name as keyof UserFormState];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!username || !email || !password) {
      setError("Username, email, and password are required.");
      return;
    }

    try {
      const createdUser = await createUser({
        username,
        email,
        password,
        role: form.role,
        mobilenumber: form.mobileNumber || undefined,
        github: form.github || undefined,
        officialEmail: form.officialEmail || undefined,
        address: form.address || undefined,
      }).unwrap();
      console.log(createdUser);
      navigate(`/profile/${createdUser.id}`, { replace: true });
    } catch (submitError: unknown) {
      const errorRecord =
        typeof submitError === "object" && submitError !== null
          ? (submitError as Record<string, unknown>)
          : {};
      const response =
        typeof errorRecord.data === "object" && errorRecord.data !== null
          ? (errorRecord.data as Record<string, unknown>)
          : {};
      const backendFieldErrors = getFieldErrors(response.errorMessage);

      if (Object.keys(backendFieldErrors).length > 0) {
        setFieldErrors(backendFieldErrors);
      } else {
        const backendMessage =
          typeof response.errorMessage === "string"
            ? response.errorMessage
            : typeof response.message === "string"
              ? response.message
              : typeof errorRecord.error === "string"
                ? errorRecord.error
                : "Something went wrong while creating the user.";
        setError(backendMessage);
      }
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
              aria-invalid={Boolean(fieldErrors.username)}
            />
            {fieldErrors.username && (
              <small className="field-error">{fieldErrors.username}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email && (
              <small className="field-error">{fieldErrors.email}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.password)}
            />
            {fieldErrors.password && (
              <small className="field-error">{fieldErrors.password}</small>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.role)}
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
            {fieldErrors.role && (
              <small className="field-error">{fieldErrors.role}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.mobileNumber)}
            />
            {fieldErrors.mobileNumber && (
              <small className="field-error">{fieldErrors.mobileNumber}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.github)}
            />
            {fieldErrors.github && (
              <small className="field-error">{fieldErrors.github}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.officialEmail)}
            />
            {fieldErrors.officialEmail && (
              <small className="field-error">{fieldErrors.officialEmail}</small>
            )}
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
              aria-invalid={Boolean(fieldErrors.address)}
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
            {fieldErrors.address && (
              <small className="field-error">{fieldErrors.address}</small>
            )}
          </div>

          {error ? <div className="auth-error">{error}</div> : null}

          <div
            className="login-actions"
            style={{ justifyContent: "flex-start" }}
          >
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </section>
    </DashboardShell>
  );
}
