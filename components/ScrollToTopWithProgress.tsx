"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTopWithProgress() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const calc = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;

      const pct =
        totalScrollable <= 0 ? 100 : (scrollTop / totalScrollable) * 100;

      const clamped = Math.min(100, Math.max(0, pct));

      setProgress(clamped);
      setShow(scrollTop > 350);
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle math
  const size = 72;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[80]"
        >
          <div className="relative h-[72px] w-[72px]">
            {/* Progress Ring */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0 -rotate-90"
            >
              {/* Background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={stroke}
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgb(37 99 235)" // blue-600
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-75"
              />
            </svg>

            {/* Button */}
            <motion.button
              type="button"
              onClick={goTop}
              aria-label="رفتن به بالای صفحه"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                absolute inset-2
                rounded-full
                bg-gray-900 text-white
                shadow-[0_12px_35px_rgba(0,0,0,0.35)]
                hover:bg-gray-800
                flex items-center justify-center
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
              >
                <path
                  d="M12 5l-7 7m7-7l7 7M12 5v14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
