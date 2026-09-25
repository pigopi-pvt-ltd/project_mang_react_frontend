import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../features/auth/authApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const tokenId = searchParams.get("tokenId");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">Invalid Reset Link</h1>

          <Link
            to="/forgot-password"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-center">Reset Password</h1>

        <p className="mb-6 text-center text-gray-500">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            />
          </div>

          {/* Reset */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
