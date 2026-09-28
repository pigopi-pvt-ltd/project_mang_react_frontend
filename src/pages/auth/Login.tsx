import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import type { AppDispatch } from "../../app/store";
import "../../App.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const user = await login({
        email,
        password,
      }).unwrap();

      dispatch(setUser(user));
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      const apiError = error as {
        data?: { errorMessage?: string };
        error?: string;
      };
      setLoginError(
        apiError.data?.errorMessage ||
          apiError.error ||
          "Unable to sign in. Please check your credentials and try again.",
      );
    }
  };

  return (
    <main className="login-page">
      <div className="login-shell">
        <div className="login-brand-mark" aria-hidden="true">
          PV
        </div>

        <h1 className="login-title">PiVault Login</h1>

        <p className="login-subtitle">Sign in to your account</p>

        {loginError && (
          <div className="auth-error" role="alert">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <div className="password-input-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-actions">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
