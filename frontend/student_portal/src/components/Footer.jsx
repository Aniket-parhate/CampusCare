import React from "react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-slate-950 px-6 pt-14 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-3">

        <div className="max-w-sm">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            ⚡ Campus<span className="text-blue-400">Care</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
            Making campuses smarter, cleaner and better through technology.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Platform
          </h4>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#features"
              className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
            >
              About
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h4>

          <div className="mt-4 flex flex-col gap-3">
            <p className="text-sm text-slate-400">
              📧 support@campuscare.com
            </p>

            <p className="text-sm text-slate-400">
              📍 Maharashtra, India
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 py-5 text-center">
        <p className="text-xs text-slate-500 sm:text-sm">
          © 2026 CampusCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;