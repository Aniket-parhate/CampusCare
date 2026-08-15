
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [resolution, setResolution] = useState("");
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("staffToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaints();
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:3000/staff/complaints",
        {
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
        throw new Error(data.message || "Failed to fetch complaints");
      }

      setComplaints(data.complaints || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setStatus(complaint.status);
    setPriority(complaint.priority);
    setResolution(complaint.resolution || "");
  };

  const closeComplaint = () => {
    setSelectedComplaint(null);
    setStatus("");
    setPriority("");
    setResolution("");
  };

 const updateComplaint = async (e) => {
  e.preventDefault();

  if (!selectedComplaint) return;

  try {
    setUpdating(true);
    setError("");

    const response = await fetch(
      `http://localhost:3000/staff/complaints/${selectedComplaint._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          priority,
          resolution,
        }),
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
      throw new Error(data.message || "Failed to update complaint");
    }

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint._id === data.complaint._id
          ? data.complaint
          : complaint
      )
    );

    closeComplaint();

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    setError(error.message);
  } finally {
    setUpdating(false);
  }
};

  const getStatusStyle = (status) => {
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

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-50 text-red-700";

      case "High":
        return "bg-orange-50 text-orange-700";

      case "Medium":
        return "bg-yellow-50 text-yellow-700";

      case "Low":
        return "bg-green-50 text-green-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-500">
          Loading complaints...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">
              C
            </div>

            <div className="text-left">
              <h1 className="text-base font-bold text-slate-900">
                Campus<span className="text-blue-600">Care</span>
              </h1>

              <p className="text-xs text-slate-400">
                Staff Portal
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Dashboard
          </button>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <div className="mb-8">

          <p className="text-sm font-semibold text-blue-600">
            Staff Portal
          </p>

          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Complaints
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage complaints submitted by students from your college.
          </p>

        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-400">
              Total
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {complaints.length}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-yellow-600">
              Pending
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {
                complaints.filter(
                  (complaint) => complaint.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-green-600">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {
                complaints.filter(
                  (complaint) => complaint.status === "Resolved"
                ).length
              }
            </p>
          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

            <h3 className="text-lg font-bold text-slate-900">
              All Complaints
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Click on a complaint to view and update it.
            </p>

          </div>

          {complaints.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="text-5xl">
                📋
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No complaints yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Student complaints from your college will appear here.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {complaints.map((complaint) => (

                <button
                  key={complaint._id}
                  onClick={() => openComplaint(complaint)}
                  className="w-full px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h4 className="text-base font-bold text-slate-900">
                          {complaint.title}
                        </h4>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                            complaint.priority
                          )}`}
                        >
                          {complaint.priority}
                        </span>

                      </div>

                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {complaint.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">

                        <span>
                          📍 {complaint.location}
                        </span>

                        <span>
                          🏷️ {complaint.category}
                        </span>

                        <span>
                          👤 {complaint.createdBy?.name || "Student"}
                        </span>

                        <span>
                          {new Date(
                            complaint.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </div>

                    </div>

                    <div className="shrink-0">

                      <span className="text-sm font-semibold text-blue-600">
                        Manage →
                      </span>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          )}

        </div>

      </main>

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5 py-6 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Complaint Details
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                  {selectedComplaint.title}
                </h2>

              </div>

              <button
                onClick={closeComplaint}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={updateComplaint}
              className="space-y-6 px-6 py-6"
            >

              <div className="rounded-2xl bg-slate-50 p-5">

                <p className="text-sm font-semibold text-slate-700">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedComplaint.description}
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Student
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {selectedComplaint.createdBy?.name || "Unknown"}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {selectedComplaint.location}
                  </div>
                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Critical">
                      Critical
                    </option>

                  </select>

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Resolution
                </label>

                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows="4"
                  placeholder="Enter resolution details..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeComplaint}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Complaints;

