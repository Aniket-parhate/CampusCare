import React from "react";

const features = [
  {
    icon: "📝",
    title: "Easy Complaint Reporting",
    description:
      "Report campus problems quickly with a simple and user-friendly complaint form.",
  },
  {
    icon: "📸",
    title: "Photo Evidence",
    description:
      "Upload photos or videos to clearly explain the problem to administrators.",
  },
  {
    icon: "📊",
    title: "Real-Time Tracking",
    description:
      "Track your complaint from submission to resolution with live status updates.",
  },
  {
    icon: "🔔",
    title: "Instant Notifications",
    description:
      "Receive notifications whenever the status of your complaint changes.",
  },
  {
    icon: "👨‍💼",
    title: "Admin Management",
    description:
      "Administrators can manage, assign and resolve complaints efficiently.",
  },
  {
    icon: "🔒",
    title: "Secure Platform",
    description:
      "Student and administrator information is protected with secure authentication.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-50/60 px-6 py-20 sm:px-8 lg:px-12 xl:px-16 lg:py-24"
    >
    
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative w-full">

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold tracking-wide text-blue-600 sm:text-sm">
            FEATURES
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            Everything You Need to
            <br />
            <span className="text-blue-600">
              Fix Campus Problems
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            A centralized platform designed to make campus complaint
            management faster and easier.
          </p>

        </div>

      
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_-25px_rgba(15,23,42,0.25)] transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_40px_-25px_rgba(37,99,235,0.25)]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition-transform duration-200 group-hover:scale-105">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-6 text-slate-500 sm:text-base">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;