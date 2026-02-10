"use client";
import { useEffect, useState } from "react";

export default function TextCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Cursor متن */}
      <div
        style={{
          left: position.x,
          top: position.y,
        }}
        className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 text-lg text-[30px] font-bold text-gray-900 select-none"
      >
        ماوس شما
      </div>

      {/* مخفی کردن cursor اصلی */}
      <style>{`body { cursor: none; }`}</style>
    </>
  );
}
