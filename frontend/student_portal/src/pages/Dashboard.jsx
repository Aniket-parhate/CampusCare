
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Student",
    email: "",
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/complaint/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch complaints"
          );
        }

        setComplaints(data.complaints || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "In Progress" ||
      complaint.status === "Assigned"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved" ||
      complaint.status === "Closed"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700";

      case "Assigned":
        return "bg-purple-50 text-purple-700";

      case "In Progress":
        return "bg-blue-50 text-blue-700";

      case "Resolved":
        return "bg-green-50 text-green-700";

      case "Closed":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-red-600";

      case "High":
        return "text-orange-600";

      case "Medium":
        return "text-yellow-600";

      case "Low":
        return "text-green-600";

      default:
        return "text-slate-500";
    }
  };

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm shadow-blue-600/20">
              C
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Campus<span className="text-blue-600">Care</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user.name}
              </p>

              <p className="text-xs text-slate-400">
                Student
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4 sm:text-sm"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              Student Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Welcome, {user.name?.split(" ")[0]} 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your campus complaints and track their progress.
            </p>
          </div>

          <Link
            to="/complaints/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            + Report Complaint
          </Link>

        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Complaints
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                📋
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              {loading ? "..." : totalComplaints}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              All submitted complaints
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-lg">
                ⏳
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              {loading ? "..." : pendingComplaints}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Waiting for action
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                In Progress
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                🔄
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              {loading ? "..." : inProgressComplaints}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Currently being handled
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Resolved
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                ✓
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-green-600">
              {loading ? "..." : resolvedComplaints}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Successfully resolved
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Complaints
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Your latest submitted complaints
                </p>
              </div>

              <Link
                to="/complaints"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View All
              </Link>

            </div>

            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center">
                <p className="text-sm font-medium text-slate-400">
                  Loading complaints...
                </p>
              </div>
            ) : recentComplaints.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
                  📋
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  No complaints yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  You haven't submitted any campus complaints yet.
                  Report an issue and track it from your dashboard.
                </p>

                <Link
                  to="/complaints/create"
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Report Your First Complaint
                </Link>

              </div>
            ) : (
              <div className="divide-y divide-slate-100">

                {recentComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="px-5 py-5 transition hover:bg-slate-50/70 sm:px-6"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                            {complaint.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${getStatusClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                          {complaint.category} • {complaint.location}
                        </p>

                        <p className="mt-2 line-clamp-1 text-xs text-slate-500">
                          {complaint.description}
                        </p>

                      </div>

                      <div className="shrink-0 sm:text-right">

                        <p
                          className={`text-xs font-bold ${getPriorityClass(
                            complaint.priority
                          )}`}
                        >
                          {complaint.priority} Priority
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {new Date(
                            complaint.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your CampusCare account
            </p>

            <div className="mt-6 space-y-3">

              <Link
                to="/complaints/create"
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
                  📝
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    New Complaint
                  </p>

                  <p className="text-xs text-slate-400">
                    Report a campus issue
                  </p>
                </div>
              </Link>

              <Link
                to="/complaints"
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">
                  📊
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    My Complaints
                  </p>

                  <p className="text-xs text-slate-400">
                    Track your complaints
                  </p>
                </div>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">
                  👤
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    My Profile
                  </p>

                  <p className="text-xs text-slate-400">
                    View your account
                  </p>
                </div>
              </Link>

            </div>

          </aside>

        </div>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Have a campus problem?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Report it and help make your campus better.
              </p>
            </div>

            <Link
              to="/complaints/create"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Complaint →
            </Link>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;

