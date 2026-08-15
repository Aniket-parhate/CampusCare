import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16 lg:py-24"
    >
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-indigo-100/25 blur-3xl" />

      <div className="relative grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* ================= LEFT CONTENT ================= */}
        <div className="max-w-2xl">

          {/* Label */}
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold tracking-wide text-blue-600 sm:text-sm">
            ABOUT CAMPUSCARE
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]">
            Building a Better
            <br />
            <span className="text-blue-600">
              Campus Experience
            </span>
          </h2>

          {/* Description */}
          <div className="mt-6 max-w-xl space-y-4">
            <p className="text-base leading-7 text-slate-500 sm:text-lg">
              CampusCare connects students and campus administration
              through a centralized complaint management platform.
            </p>

            <p className="text-base leading-7 text-slate-500 sm:text-lg">
              Instead of visiting different departments or waiting for
              updates, students can submit complaints online and track
              their progress from anywhere.
            </p>
          </div>

          {/* Points */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
                ✓
              </span>
              Faster complaint resolution
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
                ✓
              </span>
              Transparent status tracking
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
                ✓
              </span>
              Better communication
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
                ✓
              </span>
              Digital campus management
            </div>

          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Glow */}
          <div className="absolute inset-8 rounded-3xl bg-blue-200/30 blur-3xl" />

          <div className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.20)] backdrop-blur-xl sm:p-9">

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              🏫
            </div>

            {/* Title */}
            <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
              Smart Campus
            </h3>

            {/* Description */}
            <p className="mt-3 text-base leading-7 text-slate-500">
              Technology-driven campus management for students,
              faculty and administrators.
            </p>

            {/* Divider */}
            <div className="my-7 h-px bg-slate-100" />

            {/* Mini stats */}
            <div className="grid grid-cols-2 divide-x divide-slate-200">

              <div className="text-center">
                <strong className="block text-2xl font-extrabold text-blue-600">
                  24/7
                </strong>

                <span className="mt-1 block text-sm font-medium text-slate-400">
                  Access
                </span>
              </div>

              <div className="text-center">
                <strong className="block text-2xl font-extrabold text-slate-900">
                  100%
                </strong>

                <span className="mt-1 block text-sm font-medium text-slate-400">
                  Digital
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;