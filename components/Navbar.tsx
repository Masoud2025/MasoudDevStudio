"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "../public/icons/MainLogo.png";
import GithubLogo from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // hide/show on scroll
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const lastY = useRef(0);

  const navLinks = [
    { href: "/#home", label: "خانه" },
    { href: "/#about", label: "درباره من" },
    { href: "/#projects", label: "پروژه‌ها" },
    { href: "/#contact", label: "تماس" },
  ];

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  // Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Scroll lock when menu open
  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Focus management
  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      buttonRef.current?.focus();
    }
  }, [menuOpen]);

  // Hide on scroll down, show on scroll up (with threshold)
  useEffect(() => {
    lastY.current = window.scrollY;

    const THRESHOLD = 10; // جلوگیری از jitter [web:66]
    const TOP_SAFE = 12;  // نزدیک بالا همیشه نمایش

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (y < TOP_SAFE) {
        setHideOnScroll(false);
        lastY.current = y;
        return;
      }

      if (Math.abs(diff) < THRESHOLD) return;

      if (diff > 0) {
        // scrolling down => hide
        setHideOnScroll(true);
      } else {
        // scrolling up => show
        setHideOnScroll(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If mobile menu is open, keep navbar visible
  const shouldHide = hideOnScroll && !menuOpen;

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50"
      initial={false}
      animate={shouldHide ? { y: -90, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 320, damping: 34 }
      }
    >
      <div className="mx-auto max-w-6xl px-3">
        <nav className="relative flex items-center justify-between rounded-2xl px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-white/5" />

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
                className="relative px-2 py-1 rounded-lg hover:bg-white/20 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: name + logo + hamburger */}
          <div className="relative flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right font-semibold text-sm md:text-base leading-5 text-gray-900">
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
              ref={buttonRef}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition"
              onClick={toggleMenu}
              aria-label="Mobile menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
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

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                aria-label="Close menu backdrop"
                className="fixed inset-0 z-40 bg-black/30 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              <motion.aside
                id="mobile-drawer"
                className="fixed top-0 right-0 z-50 h-dvh w-[82vw] max-w-sm md:hidden
                           bg-white/95 backdrop-blur-xl border-l border-white/20
                           shadow-[-10px_0_30px_rgba(0,0,0,0.18)]"
                initial={{ x: shouldReduceMotion ? 0 : "110%" }}
                animate={{ x: 0 }}
                exit={{ x: shouldReduceMotion ? 0 : "110%" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 28 }
                }
                role="dialog"
                aria-modal="true"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <Image
                      src={Logo}
                      width={84}
                      height={36}
                      alt="Site logo"
                      className="opacity-95"
                    />
                    <button
                      className="h-10 px-3 rounded-xl bg-gray-900 text-white text-sm"
                      onClick={closeMenu}
                    >
                      بستن
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        ref={i === 0 ? firstLinkRef : undefined}
                        onClick={closeMenu}
                        className="text-right px-3 py-3 rounded-xl text-gray-900 bg-gray-900/5 hover:bg-gray-900/10 transition outline-none focus:ring-2 focus:ring-gray-900/30"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
