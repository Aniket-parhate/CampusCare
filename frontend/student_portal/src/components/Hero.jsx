import React from "react";

const complaints = [
  {
    icon: "💡",
    title: "Classroom Light Problem",
    location: "Room No. 204",
    status: "Pending",
    statusStyle: "bg-yellow-50 text-yellow-700",
  },
  {
    icon: "🚰",
    title: "Water Leakage",
    location: "Hostel Block A",
    status: "In Progress",
    statusStyle: "bg-blue-50 text-blue-700",
  },
  {
    icon: "🪑",
    title: "Broken Bench",
    location: "Classroom 302",
    status: "Resolved",
    statusStyle: "bg-green-50 text-green-700",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">

      <div className="absolute -left-24 top-24 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -right-20 top-32 h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative w-full px-6 pb-16 pt-40 sm:px-8 sm:pt-44 lg:px-12 lg:pt-44 xl:px-16">

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

          <div className="max-w-xl">

            <div className="animate-float-small mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span>🚀</span>
              <span>Smart Care Solution</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]">
              Report Campus
              <br />
              Issues.{" "}
              <span className="text-blue-600">
                Get Them
              </span>
              <br />
              <span className="text-blue-600">
                Fixed.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              A smart complaint management platform that helps students
              report campus problems, track complaints, and communicate
              with administrators easily.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">

              <button
                onClick={() =>
                  document
                    .getElementById("complaint-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
              >
                Report an Issue →
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-bold text-slate-700 backdrop-blur transition hover:border-blue-200 hover:bg-white hover:text-blue-600"
              >
                How It Works
              </button>

            </div>

            <div className="mt-7 flex gap-8">

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  500+
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  Issues Reported
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  95%
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  Resolution Rate
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  24/7
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  Support
                </p>
              </div>

            </div>

          </div>

          <div className="relative w-full">

            <div className="absolute inset-5 rounded-3xl bg-blue-200/30 blur-3xl" />

           <div className="animate-float relative rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.25)] sm:p-5">

              <div className="flex items-center justify-between">

                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Complaint Dashboard
                </h2>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Live
                </div>

              </div>

              <div className="my-4 h-px bg-slate-100" />

              <div className="space-y-2.5">

                {complaints.map((complaint, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg">
                      {complaint.icon}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                        {complaint.title}
                      </h3>

                      <p className="mt-0.5 truncate text-[11px] font-medium text-slate-400">
                        {complaint.location}
                      </p>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold sm:text-[10px] ${complaint.statusStyle}`}
                    >
                      {complaint.status}
                    </span>

                  </div>
                ))}

              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-slate-50 py-2.5">

                <div className="text-center">
                  <p className="text-[10px] font-medium text-slate-400">
                    Active
                  </p>
                  <p className="mt-0.5 text-base font-bold text-slate-900">
                    24
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-medium text-slate-400">
                    Resolved
                  </p>
                  <p className="mt-0.5 text-base font-bold text-green-600">
                    12
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-medium text-slate-400">
                    Response
                  </p>
                  <p className="mt-0.5 text-base font-bold text-blue-600">
                    2.4h
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-white to-transparent" />

    </section>
  );
};

export default Hero;