import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-20 sm:px-8 lg:px-12 xl:px-16 lg:py-24">

      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 animate-[aurora_8s_ease-in-out_infinite] rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute -right-32 top-1/3 h-[380px] w-[380px] animate-[aurora_10s_ease-in-out_infinite_reverse] rounded-full bg-indigo-500/25 blur-[100px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 animate-[pulseGlow_5s_ease-in-out_infinite] rounded-full bg-cyan-400/10 blur-[90px]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.45)_100%)]" />

      <div className="relative mx-auto max-w-4xl text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-blue-300 backdrop-blur-md sm:text-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
          MAKE A DIFFERENCE
        </div>

        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Have a Campus
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientMove_4s_linear_infinite]">
            {" "}Problem?
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
          Don't wait. Report it and help make your campus better.
        </p>

        <div className="mt-9">
          <Link
            to="/register"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-slate-900 shadow-[0_0_35px_rgba(96,165,250,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(96,165,250,0.35)] sm:text-base"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-blue-100 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

            <span className="relative">
              Submit a Complaint
            </span>

            <span className="relative text-blue-600 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-4 text-xs font-medium text-slate-500">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700" />
          <span>CampusCare</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700" />
        </div>

      </div>

      <style>{`
        @keyframes aurora {
          0%, 100% {
            transform: translate(0, -50%) scale(1);
          }
          50% {
            transform: translate(80px, -40%) scale(1.15);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: translateX(-50%) scale(0.9);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>

    </section>
  );
};

export default CTA;