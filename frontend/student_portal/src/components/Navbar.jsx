import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <div className="flex h-16 items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-6">

        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm shadow-blue-600/20">
            C
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Campus<span className="text-blue-600">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Features
          </Link>

          <Link
            to="/#about"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;