"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../public/icons/MainLogo.png";
import GithubLogo from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";

export default function Footer() {
  const navLinks = [
    { href: "/#home", label: "خانه" },
    { href: "/#about", label: "درباره من" },
    { href: "/#projects", label: "پروژه‌ها" },
    { href: "/#contact", label: "تماس" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer dir="rtl" className="relative mt-16">
      {/* subtle background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/50 to-white"
      />

      <div className="mx-auto max-w-6xl px-3 pb-6">
        <div
          className="
            relative overflow-hidden rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-[0_10px_30px_rgba(0,0,0,0.10)]
          "
        >
          {/* overlay like navbar */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/5" />

          <div className="relative p-5 md:p-6">
            {/* top */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* brand */}
              <div className="flex items-center justify-between md:justify-start gap-3">
                <div className="flex flex-col text-right font-semibold text-sm md:text-base leading-5 text-gray-900">
                  <span>مسعود جعفری</span>
                  <span className="text-gray-700 font-medium">برنامه نویس</span>
                </div>

                <Image
                  src={Logo}
                  width={120}
                  height={44}
                  alt="Site logo"
                  className="opacity-95"
                />
              </div>

              {/* links */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-900">لینک‌ها</span>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="
                        px-3 py-2 rounded-xl text-sm
                        text-gray-900
                        bg-white/10 hover:bg-white/20
                        border border-white/10 transition
                      "
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* socials + contact */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-900">شبکه‌های اجتماعی</span>

                <div className="flex gap-2">
                  <Link
                    href="https://github.com/USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition"
                    aria-label="GitHub"
                  >
                    <Image src={GithubLogo} alt="GitHub" width={22} height={22} />
                  </Link>

                  <Link
                    href="https://linkedin.com/in/USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition"
                    aria-label="LinkedIn"
                  >
                    <Image src={Linkedin} alt="LinkedIn" width={22} height={22} />
                  </Link>
                </div>

                <p className="text-sm text-gray-700 leading-7">
                  برای همکاری پیام بده یا از بخش تماس فرم رو پر کن.
                </p>
              </div>
            </div>

            {/* divider */}
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-gray-900/10 to-transparent" />

            {/* bottom */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-700">
                © {year} تمامی حقوق محفوظ است.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                  ساخته شده با Next.js
                </span>
                <span className="px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                  UI شیشه‌ای
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* small spacer to look like floating card */}
        <div className="h-6" />
      </div>
    </footer>
  );
}
