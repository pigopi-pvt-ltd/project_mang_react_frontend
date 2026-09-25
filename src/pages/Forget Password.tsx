import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/auth/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading, isSuccess }] =
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-center">Forgot Password</h1>

        <p className="mb-6 text-center text-gray-500">
          Enter your email to receive a password reset link.
        </p>

        {isSuccess && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            Reset password link has been sent to your email.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
