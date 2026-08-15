import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">

      <div className="flex min-h-screen">

        <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 lg:flex">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-blue-600 shadow-lg">
                C
              </div>

              <span className="text-xl font-extrabold tracking-tight text-white">
                Campus<span className="text-blue-200">Care</span>
              </span>
            </Link>

            <div className="max-w-lg">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-blue-50 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                CAMPUS CARE SOLUTION
              </div>

              <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-white xl:text-6xl">
                A better campus
                <br />
                starts with
                <br />
                <span className="text-blue-200">your voice.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100/80">
                Report campus issues, track complaints and stay connected
                with your administration — all from one place.
              </p>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-extrabold text-white">
                    24/7
                  </p>
                  <p className="mt-1 text-xs text-blue-100/70">
                    Access
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-extrabold text-white">
                    100%
                  </p>
                  <p className="mt-1 text-xs text-blue-100/70">
                    Digital
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-extrabold text-white">
                    Easy
                  </p>
                  <p className="mt-1 text-xs text-blue-100/70">
                    Tracking
                  </p>
                </div>

              </div>

            </div>

            <p className="text-xs text-blue-100/50">
              © 2026 CampusCare · Making campuses better together
            </p>

          </div>
        </div>

        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-5 py-10 lg:w-1/2">

          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

          <div className="relative z-10 w-full max-w-md">

            <div className="mb-8 text-center lg:text-left">

              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20 lg:mx-0">
                C
              </div>

              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Login to continue to your CampusCare account.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.18)] sm:p-9">

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-600">
                  <span className="mt-0.5">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email address
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      @
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-bold text-slate-700">
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      ●
                    </span>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {loading ? "Logging in..." : "Login to CampusCare →"}
                  </span>
                </button>

              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs font-medium text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Create one
                </Link>
              </p>

            </div>

            <Link
              to="/"
              className="mt-6 block text-center text-sm font-semibold text-slate-400 transition hover:text-slate-700"
            >
              ← Back to Home
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;