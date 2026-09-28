import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import "../../App.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [forgotPassword, { data,isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
       await forgotPassword({
        email,
      }).unwrap();
    } catch (error) {
      console.error("Failed to send reset link:", error);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="login-brand-mark" aria-hidden="true">
          PV
        </div>
        <h1 className="login-title">Forgot Password</h1>

        <p className="login-subtitle">
          Enter your email to receive a password reset link.
        </p>

        {isSuccess && (
          <div className="auth-success">
            {/* Reset password link has been sent to your email. */}
            {data}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="forgot-email">Email</label>

            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </main>
  );
}
