"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "ABOUT", href: "#About" },
  { label: "BLOG", href: "#Blogs" },
  { label: "PROJECTS", href: "#Projects" },
  { label: "CONTACT", href: "#Contact" },
];

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, show: false });

  const moveTo = (el: HTMLElement) => {
    const parentLeft = containerRef.current?.getBoundingClientRect().left ?? 0;
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - parentLeft, width: r.width, show: true });
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-8 flex flex-row gap-96 text-2xl"
      onMouseLeave={() => setIndicator((s) => ({ ...s, show: false }))}
    >
      <motion.div
        className="absolute -bottom-2 h-[3px] rounded-full bg-yellow-500"
        animate={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.show ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />

      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onMouseEnter={(e) => moveTo(e.currentTarget)}
          className="relative px-2 py-1 text-amber-50 transition-colors hover:text-white/35"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
