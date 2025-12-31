"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../public/icons/MainLogo.png";
import GithubLogo from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#home", label: "خانه" },
    { href: "/#about", label: "درباره من" },
    { href: "/#projects", label: "پروژه‌ها" },
    { href: "/#contact", label: "تماس" },
  ];

  return (
    <header className="bg-white shadow-2xl rounded-4xl py-1 px-4  fixed w-full z-50">
      <nav className="mx-auto max-w-6xl px-1 py-0.5  flex items-center justify-between">
        {/* چپ: شبکه‌های اجتماعی */}
        <div className="flex gap-3">
          <Link
            href="https://github.com/USERNAME"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="GitHub"
          >
            <Image src={GithubLogo} alt="GitHub" width={24} height={24} />
          </Link>
          <Link
            href="https://linkedin.com/in/USERNAME"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="LinkedIn"
          >
            <Image src={Linkedin} alt="LinkedIn" width={24} height={24} />
          </Link>
        </div>

        {/* وسط: لینک‌ها */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group px-1 py-1 hover:text-blue-600 transition"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right side  */}
        <div className="flex items-center gap-3" id="LOGO">
          <div className="flex flex-col text-right font-semibold text-sm md:text-base">
            <span>مسعود جعفری</span>
            <span>برنامه نویس</span>
          </div>

          <Image
            src={Logo}
            width={120}
            height={40}
            alt="لوگو سایت"
            className="hidden md:block"
          />

          {/* Mobile hamburger menu  */}
          <button
            className="md:hidden flex flex-col justify-between h-5 w-6 ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منوی موبایل"
          >
            <span
              className="block h-0.5 w-full bg-black rounded transition-transform"
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black rounded transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className="block h-0.5 w-full bg-black rounded transition-transform"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            ></span>
          </button>
        </div>
      </nav>
      <Image
        src={Logo}
        width={80}
        height={40}
        alt="لوگو سایت"
        className=" block mx-auto md:hidden mt-[-4rem] "
      />
      {/* Mobile menu open up Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-right text-gray-700 hover:bg-gray-100 rounded transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
