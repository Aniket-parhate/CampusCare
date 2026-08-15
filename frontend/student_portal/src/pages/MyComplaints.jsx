
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyComplaints = () => {
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
        setLoading(true);
        setError("");

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

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">

      {/* Header */}

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-2.5"
          >
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

      {/* Main */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">

        {/* Heading */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <Link
              to="/dashboard"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Dashboard
            </Link>

            <p className="mt-5 text-sm font-semibold text-blue-600">
              Complaints
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Complaints
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View and track all the complaints you have submitted.
            </p>

          </div>

          <Link
            to="/complaints/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            + Report Complaint
          </Link>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex min-h-[350px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  📋
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Loading your complaints...
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Please wait a moment.
                </p>

              </div>

            </div>

          </div>

        ) : complaints.length === 0 ? (

          /* Empty State */

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-4xl">
                📋
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No complaints yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                You haven't submitted any campus complaints yet.
                If you are facing a problem on campus, report it
                and track its progress here.
              </p>

              <Link
                to="/complaints/create"
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Report Your First Complaint
              </Link>

            </div>

          </div>

        ) : (

          /* Complaints */

          <div className="space-y-4">

            {complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-100 hover:shadow-md sm:p-6"
              >

                <div className="flex flex-col gap-5">

                  {/* Top */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-lg font-bold text-slate-900">
                          {complaint.title}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-400">
                        {complaint.category} • {complaint.location}
                      </p>

                    </div>

                    <div className="shrink-0 sm:text-right">

                      <p
                        className={`text-sm font-bold ${getPriorityClass(
                          complaint.priority
                        )}`}
                      >
                        {complaint.priority} Priority
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* Description */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {complaint.description}
                    </p>

                  </div>

                  {/* Resolution */}

                  {complaint.resolution && (
                    <div className="rounded-xl border border-green-100 bg-green-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                        Resolution
                      </p>

                      <p className="mt-2 text-sm leading-6 text-green-700">
                        {complaint.resolution}
                      </p>

                    </div>
                  )}

                  {/* Bottom */}

                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="text-xs text-slate-400">

                      <span>
                        Complaint ID:
                      </span>

                      <span className="ml-1 font-mono text-slate-500">
                        {complaint._id}
                      </span>

                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      Submitted{" "}
                      {new Date(
                        complaint.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default MyComplaints;

