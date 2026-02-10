"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const row1Images = [
  { img: "/pjct1.png", link: "https://example1.com" },
  { img: "/pj2.png", link: "https://example2.com" },
  { img: "/pj3.png", link: "https://example3.com" },
  { img: "/pj4.png", link: "https://example4.com" },
  { img: "/pj5.png", link: "https://example5.com" },
];

const row2Images = [
  { img: "/pj6.png", link: "https://example6.com" },
  { img: "/pj7.png", link: "https://example7.com" },
  { img: "/pj8.png", link: "https://example8.com" },
  { img: "/pj9.png", link: "https://example9.com" },
  { img: "/pj10.png", link: "https://example10.com" },
  { img: "/pj11.png", link: "https://example11.com" },
];

export default function ProjectSlider() {
  const xRow1 = useMotionValue(0);
  const xRow2 = useMotionValue(0);

  const speedRow1 = -0.4;
  const speedRow2 = 0.35;

  const row1Paused = useRef(false);
  const row2Paused = useRef(false);

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [singleWidthRow1, setSingleWidthRow1] = useState(0);
  const [singleWidthRow2, setSingleWidthRow2] = useState(0);

  const repeatedRow1 = [...row1Images, ...row1Images];
  const repeatedRow2 = [...row2Images, ...row2Images];

  // SSR-safe: ذخیره وضعیت دسکتاپ
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // محاسبه عرض کارت‌ها
  useEffect(() => {
    const calcWidth = () => {
      if (row1Ref.current) {
        const items = Array.from(row1Ref.current.children).slice(0, row1Images.length);
        const total = items.reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);
        setSingleWidthRow1(total);
      }

      if (row2Ref.current) {
        const items = Array.from(row2Ref.current.children).slice(0, row2Images.length);
        const total = items.reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);
        setSingleWidthRow2(total);
      }
    };

    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, []);

  // برای ردیف دوم
  useEffect(() => {
    if (singleWidthRow2 > 0) {
      xRow2.set(-singleWidthRow2);
    }
  }, [singleWidthRow2]);

  // کنترل click/tap بیرون کارت برای موبایل
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setActiveCard(null);
        row1Paused.current = false;
        row2Paused.current = false;
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // انیمیشن اسلایدر
  useAnimationFrame(() => {
    if (singleWidthRow1 > 0 && !row1Paused.current) {
      let newX = xRow1.get() + speedRow1;
      if (Math.abs(newX) >= singleWidthRow1) newX += singleWidthRow1;
      xRow1.set(newX);
    }
    if (singleWidthRow2 > 0 && !row2Paused.current) {
      let newX = xRow2.get() + speedRow2;
      if (newX >= 0) newX -= singleWidthRow2;
      xRow2.set(newX);
    }
  });

  const handleMobileTap = (id: string, row: 1 | 2) => {
    setActiveCard(id);
    if (row === 1) row1Paused.current = true;
    if (row === 2) row2Paused.current = true;
  };

  const renderCard = (
    item: { img: string; link: string },
    i: number,
    row: 1 | 2
  ) => {
    const id = `${row}-${i}`;

    return (
      <motion.div
        key={id}
        className="min-w-[350px] sm:min-w-[450px] md:min-w-[550px] lg:min-w-[650px]
                   h-[250px] sm:h-[320px] md:h-[400px] lg:h-[480px]
                   rounded-3xl overflow-hidden flex-shrink-0 shadow-2xl relative cursor-pointer"
        whileHover={{ scale: isDesktop ? 1.05 : 1 }}
        onHoverStart={() => {
          if (isDesktop) {
            if (row === 1) row1Paused.current = true;
            if (row === 2) row2Paused.current = true;
          }
        }}
        onHoverEnd={() => {
          if (isDesktop) {
            if (row === 1) row1Paused.current = false;
            if (row === 2) row2Paused.current = false;
          }
        }}
        onClick={() => handleMobileTap(id, row)}
      >
        <img src={item.img} className="w-full h-full object-cover" draggable={false} />

        {/* Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center
                      bg-black/50 transition-opacity duration-300
                      ${
                        activeCard === id
                          ? "opacity-100"
                          : "opacity-0 md:hover:opacity-100"
                      }`}
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl
                       shadow-lg hover:scale-105 transition-transform"
          >
            مشاهده دمو
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full py-10 overflow-hidden">
      <div className="space-y-16">
        {/* Row 1 */}
        <div className="overflow-hidden">
          <motion.div ref={row1Ref} style={{ x: xRow1 }} className="flex gap-8">
            {repeatedRow1.map((item, i) => renderCard(item, i, 1))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden">
          <motion.div ref={row2Ref} style={{ x: xRow2 }} className="flex gap-8">
            {repeatedRow2.map((item, i) => renderCard(item, i, 2))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
