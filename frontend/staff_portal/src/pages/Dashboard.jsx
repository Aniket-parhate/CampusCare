import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("staffToken");
    const storedStaff = localStorage.getItem("staff");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/staff/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("staffToken");
          localStorage.removeItem("staff");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setDashboard(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staff");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm font-semibold text-slate-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">
              C
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-900">
                Campus<span className="text-blue-600">Care</span>
              </h1>

              <p className="text-xs text-slate-400">
                Staff Portal
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {staff?.name || "Staff"}
              </p>

              <p className="text-xs text-slate-400">
                {staff?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <div className="mb-8">

          <p className="text-sm font-semibold text-blue-600">
            Staff Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome, {staff?.name || "Staff"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor complaints from your college.
          </p>

        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-400">
              Total Complaints
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
              {dashboard?.totalComplaints ?? 0}
            </h3>
          </div>

          <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-yellow-600">
              Pending
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
              {dashboard?.pendingComplaints ?? 0}
            </h3>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-blue-600">
              In Progress
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
              {dashboard?.inProgressComplaints ?? 0}
            </h3>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-green-600">
              Resolved
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
              {dashboard?.resolvedComplaints ?? 0}
            </h3>
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Recent Complaints
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Latest complaints from your college
              </p>
            </div>

            <button
              onClick={() => navigate("/complaints")}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View All
            </button>

          </div>

          <div className="mt-6 overflow-x-auto">

            {dashboard?.recentComplaints?.length > 0 ? (
              <div className="min-w-[600px]">

                <div className="grid grid-cols-4 border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <span>Complaint</span>
                  <span>Category</span>
                  <span>Status</span>
                  <span>Created</span>
                </div>

                {dashboard.recentComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="grid grid-cols-4 items-center border-b border-slate-50 px-4 py-4 text-sm"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {complaint.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {complaint.location}
                      </p>
                    </div>

                    <span className="text-slate-500">
                      {complaint.category}
                    </span>

                    <span className="font-semibold text-blue-600">
                      {complaint.status}
                    </span>

                    <span className="text-slate-400">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>

                  </div>
                ))}

              </div>
            ) : (
              <div className="py-12 text-center">

                <div className="text-4xl">
                  📋
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No complaints yet
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Complaints from students will appear here.
                </p>

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;