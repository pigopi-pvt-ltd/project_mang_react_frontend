import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import "../../App.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const tokenId = searchParams.get("tokenId");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !tokenId) {
      alert("Invalid or missing reset token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({
        token,
        tokenId,
        newPassword,
        confirmPassword,
      }).unwrap();

      alert("Password reset successfully.");

      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  if (!token || !tokenId) {
    return (
      <main className="auth-page">
        <div className="auth-shell auth-message">
          <h1 className="login-title">Invalid Reset Link</h1>

          <Link to="/forgot-password">Request a new reset link</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="login-brand-mark" aria-hidden="true">
          PV
        </div>
        <h1 className="login-title">Reset Password</h1>

        <p className="login-subtitle">Enter your new password.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="new-password">New Password</label>

            <div className="password-input-wrap">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword((visible) => !visible)}
                aria-label={
                  showNewPassword ? "Hide new password" : "Show new password"
                }
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="confirm-password">Confirm New Password</label>

            <div className="password-input-wrap">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmed password"
                    : "Show confirmed password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
