import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-16 sm:px-8 lg:px-12 xl:px-16 lg:py-20">
      <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-white backdrop-blur-sm sm:text-sm">
          MAKE A DIFFERENCE
        </span>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Have a Campus Problem?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
          Don't wait. Report it and help make your campus better
        </p>

        <Link
          to="/register"
          className="mt-7 inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl sm:text-base"
        >
          Submit a Complaint →
        </Link>
      </div>
    </section>
  );
};

export default CTA;