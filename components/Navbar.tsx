"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "../public/icons/MainLogo.png";
import GithubLogo from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide/show on scroll
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const lastY = useRef(0);

  const navLinks = [
    { href: "/#home", label: "خانه" },
    { href: "/#about", label: "درباره من" },
    { href: "/#projects", label: "پروژه‌ها" },
    { href: "/#contact", label: "تماس" },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const THRESHOLD = 8; // prevents jitter

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      // Always show near top
      if (y < 10) {
        setHideOnScroll(false);
        lastY.current = y;
        return;
      }

      // Ignore tiny deltas
      if (Math.abs(diff) < THRESHOLD) return;

      if (diff > 0) {
        // scrolling down
        setHideOnScroll(true);
      } else {
        // scrolling up
        setHideOnScroll(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  // If mobile menu is open, keep navbar visible
  const shouldHide = hideOnScroll && !menuOpen;

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50"
      initial={false}
      animate={shouldHide ? { y: -90, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Glass container */}
      <div className="mx-auto max-w-6xl px-3">
        <nav
          className="
            relative flex items-center justify-between
            rounded-2xl px-4 py-2
            bg-white/20 backdrop-blur-xl
            border border-white/20
            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          "
        >
          {/* subtle gradient overlay to look premium */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl
            bg-gradient-to-b from-white/20 to-white/5 "
          />

          {/* Left: social */}
          <div className="relative flex gap-2">
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

          {/* Center: desktop links */}
          <div className="relative hidden md:flex md:flex-row-reverse gap-7 text-[15px] font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative px-2 py-1 rounded-lg
                  hover:bg-white/20 transition
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: name + logo + hamburger */}
          <div className="relative flex items-center gap-3 ">
            <div className="hidden sm:flex flex-col text-right font-semibold text-sm md:text-base leading-5 text-gray-900 ">
              <span className="MorabaFont">مسعود جعفری</span>
              <span className="text-gray-700 font-medium">برنامه نویس</span>
            </div>

            <Image
              src={Logo}
              width={110}
              height={40}
              alt="Site logo"
              className="hidden md:block"
              priority
            />

            <button
              className="
                md:hidden inline-flex items-center justify-center
                h-10 w-10 rounded-xl
                bg-white/10 hover:bg-white/20
                border border-white/15 transition
              "
              onClick={toggleMenu}
              aria-label="Mobile menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col justify-between h-4 w-5">
                <span
                  className="block h-0.5 w-full bg-gray-900 rounded transition-transform"
                  style={{
                    transform: menuOpen
                      ? "rotate(45deg) translateY(6px)"
                      : "none",
                  }}
                />
                <span
                  className={`block h-0.5 w-full bg-gray-900 rounded transition-opacity ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className="block h-0.5 w-full bg-gray-900 rounded transition-transform"
                  style={{
                    transform: menuOpen
                      ? "rotate(-45deg) translateY(-6px)"
                      : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu (glass + smooth) */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <>
              {/* backdrop click to close */}
              <motion.button
                aria-label="Close menu backdrop"
                className="fixed inset-0 top-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              <motion.div
                id="mobile-menu"
                className="
                  relative z-50 md:hidden mt-3
                  overflow-hidden rounded-2xl
                  bg-white backdrop-blur-xl
                  border border-white/20
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                "
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  opacity: { duration: 0.15 },
                }}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <Image
                      src={Logo}
                      width={84}
                      height={36}
                      alt="Site logo"
                      className="opacity-95"
                    />
                    <span className="text-sm text-gray-800 font-semibold">
                      منو
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="
                          text-right px-3 py-2 rounded-xl
                          text-gray-900
                          bg-white/10 hover:bg-white/20
                          border border-white/10 transition
                        "
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
